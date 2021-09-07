import { expect } from 'chai'

/* Imports: External */
import { ethers } from 'hardhat'
import { injectL2Context } from '@eth-optimism/core-utils'

/* Imports: Internal */
import { l2Provider, l1Provider, IS_LIVE_NETWORK } from './shared/utils'
import { OptimismEnv } from './shared/env'
import { Contract, ContractFactory, Wallet, BigNumber } from 'ethers'
import { Direction } from './shared/watcher-utils'

/**
 * These tests cover the OVM execution contexts. In the OVM execution
 * of a L1 to L2 transaction, both `block.number` and `block.timestamp`
 * must be equal to the blocknumber/timestamp of the L1 transaction.
 */
describe('OVM Context: Layer 2 EVM Context', () => {
  const L2Provider = injectL2Context(l2Provider)
  let env: OptimismEnv
  before(async () => {
    env = await OptimismEnv.new()
  })

  let OVMMulticall: Contract
  let OVMContextStorage: Contract
  beforeEach(async () => {
    const OVMContextStorageFactory = await ethers.getContractFactory(
      'OVMContextStorage',
      env.l2Wallet
    )
    const OVMMulticallFactory = await ethers.getContractFactory(
      'OVMMulticall',
      env.l2Wallet
    )

    OVMContextStorage = await OVMContextStorageFactory.deploy()
    await OVMContextStorage.deployTransaction.wait()
    OVMMulticall = await OVMMulticallFactory.deploy()
    await OVMMulticall.deployTransaction.wait()
  })

  let numTxs = 5
  if (IS_LIVE_NETWORK) {
    // Tests take way too long if we don't reduce the number of txs here.
    numTxs = 1
  }

  it('enqueue: `block.number` and `block.timestamp` have L1 values', async () => {
    for (let i = 0; i < numTxs; i++) {
      const l2Tip = await L2Provider.getBlock('latest')
      const tx = await env.l1Messenger.sendMessage(
        OVMContextStorage.address,
        '0x',
        2_000_000
      )
      // Wait for the enqueue to be ingested
      while (true) {
        const tip = await L2Provider.getBlock('latest')
        if (tip.number === l2Tip.number + 1) {
          break
        }
        await sleep(500)
      }
      // Get the receipt
      // The transaction did not revert
      expect(receipt.status).to.equal(1)

      await env.waitForXDomainTransaction(tx, Direction.L1ToL2)

      // Get the L1 block that the enqueue transaction was in so that
      // the timestamp can be compared against the layer two contract
      console.log("test1")
      const block = await l1Provider.getBlock(receipt.blockNumber)
      console.log("test12")

      // The contact is a fallback function that keeps `block.number`
      // and `block.timestamp` in a mapping based on an index that
      // increments each time that there is a transaction.
      const blockNumber = await OVMContextStorage.blockNumbers(i)
      expect(receipt.blockNumber).to.deep.equal(blockNumber.toNumber())
      console.log("test13")
      const timestamp = await OVMContextStorage.timestamps(i)
      expect(block.timestamp).to.deep.equal(timestamp.toNumber())
      console.log("test14")
    }
  }).timeout(150000) // this specific test takes a while because it involves L1 to L2 txs

  it.skip('should set correct OVM Context for `eth_call`', async () => {
    const tip = await L2Provider.getBlockWithTransactions('latest')
    const start = Math.max(0, tip.number - 5)

    for (let i = start; i < tip.number; i++) {
      const block = await L2Provider.getBlockWithTransactions(i)
      const [, returnData] = await OVMMulticall.callStatic.aggregate(
        [
          [
            OVMMulticall.address,
            OVMMulticall.interface.encodeFunctionData(
              'getCurrentBlockTimestamp'
            ),
          ],
          [
            OVMMulticall.address,
            OVMMulticall.interface.encodeFunctionData('getCurrentBlockNumber'),
          ],
        ],
        { blockTag: block.number }
      )

      const timestamp = BigNumber.from(returnData[0])
      const blockNumber = BigNumber.from(returnData[1])
      const tx = block.transactions[0] as any

      expect(tx.l1BlockNumber).to.deep.equal(blockNumber.toNumber())
      expect(block.timestamp).to.deep.equal(timestamp.toNumber())
    }
  })

  /**
   * `rollup_getInfo` is a new RPC endpoint that is used to return the OVM
   * context. The data returned should match what is actually being used as the
   * OVM context.
   */

  it.skip('should return same timestamp and blocknumbers between `eth_call` and `rollup_getInfo`', async () => {
    // As atomically as possible, call `rollup_getInfo` and OVMMulticall for the
    // blocknumber and timestamp. If this is not atomic, then the sequencer can
    // happend to update the timestamp between the `eth_call` and the `rollup_getInfo`
    const [info, [, returnData]] = await Promise.all([
      L2Provider.send('rollup_getInfo', []),
      OVMMulticall.callStatic.aggregate([
        [
          OVMMulticall.address,
          OVMMulticall.interface.encodeFunctionData('getCurrentBlockTimestamp'),
        ],
        [
          OVMMulticall.address,
          OVMMulticall.interface.encodeFunctionData('getCurrentBlockNumber'),
        ],
      ]),
    ])

    const timestamp = BigNumber.from(returnData[0])
    const blockNumber = BigNumber.from(returnData[1])

    expect(info.ethContext.blockNumber).to.deep.equal(blockNumber.toNumber())
    expect(info.ethContext.timestamp).to.deep.equal(timestamp.toNumber())
  })
})
