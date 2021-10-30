/* External Imports */
import { Contract, ethers } from 'ethers'
import {
  TransactionResponse,
  TransactionRequest,
} from '@ethersproject/abstract-provider'
import { keccak256 } from 'ethers/lib/utils'
import { remove0x, encodeHex } from './utils'
import {
  //AppendSequencerBatchParams,
  BatchContext,
  encodeAppendSequencerBatch,
<<<<<<< HEAD
=======
  remove0x,
>>>>>>> 2c741af18943321173153180956f4bf84445a337
} from '@eth-optimism/core-utils'

interface AppendSequencerBatchParams {
    chainId: number;
    shouldStartAtElement: number;
    totalElementsToAppend: number;
    contexts: BatchContext[];
    transactions: string[];
}

export { encodeAppendSequencerBatch, BatchContext, AppendSequencerBatchParams }

/*
 * OVM_CanonicalTransactionChainContract is a wrapper around a normal Ethers contract
 * where the `appendSequencerBatchByChainId(...)` function uses a specialized encoding for improved efficiency.
 */
export class CanonicalTransactionChainContract extends Contract {
  public customPopulateTransaction = {
    appendSequencerBatch: async (
      batch: AppendSequencerBatchParams
    ): Promise<ethers.PopulatedTransaction> => {
      const nonce = await this.signer.getTransactionCount()
      const to = this.address
      const data = getEncodedCalldata(batch)
      const gasLimit = await this.signer.provider.estimateGas({
        to,
        from: await this.signer.getAddress(),
        data,
      })
<<<<<<< HEAD
=======

>>>>>>> 2c741af18943321173153180956f4bf84445a337
      return {
        nonce,
        to,
        data,
        gasLimit,
      }
    },
  }
  public async appendSequencerBatch(
    batch: AppendSequencerBatchParams,
    options?: TransactionRequest
  ): Promise<TransactionResponse> {
    return appendSequencerBatch(this, batch, options)
  }
}

/**********************
 * Internal Functions *
 *********************/

const APPEND_SEQUENCER_BATCH_METHOD_ID = keccak256(
<<<<<<< HEAD
  Buffer.from('appendSequencerBatchByChainId()')
=======
  Buffer.from('appendSequencerBatch()')
>>>>>>> 2c741af18943321173153180956f4bf84445a337
).slice(2, 10)

const appendSequencerBatch = async (
  OVM_CanonicalTransactionChain: Contract,
  batch: AppendSequencerBatchParams,
  options?: TransactionRequest
): Promise<TransactionResponse> => {
  return OVM_CanonicalTransactionChain.signer.sendTransaction({
    to: OVM_CanonicalTransactionChain.address,
    data: getEncodedCalldata(batch),
    ...options,
  })
}

const getEncodedCalldata = (batch: AppendSequencerBatchParams): string => {
  const methodId = APPEND_SEQUENCER_BATCH_METHOD_ID
  const calldata = encodeAppendSequencerBatch(batch)
<<<<<<< HEAD
  return '0x' + remove0x(methodId) + encodeHex(batch.chainId, 64) + remove0x(calldata)
=======
  return '0x' + remove0x(methodId) + remove0x(calldata)
>>>>>>> 2c741af18943321173153180956f4bf84445a337
}
