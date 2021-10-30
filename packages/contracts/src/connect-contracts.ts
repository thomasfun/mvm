<<<<<<< HEAD
import { Signer, Contract, providers, ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { getL1ContractData, getL2ContractData } from './contract-data'
=======
import { Signer, Contract } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { getContractArtifact } from './contract-artifacts'
import { getDeployedContractArtifact } from './contract-deployed-artifacts'
import { predeploys } from './predeploys'
>>>>>>> 2c741af18943321173153180956f4bf84445a337

export type Network = 'goerli' | 'kovan' | 'mainnet'
interface L1Contracts {
  addressManager: Contract
  canonicalTransactionChain: Contract
<<<<<<< HEAD
  executionManager: Contract
  fraudVerifier: Contract
  multiMessageRelayer: Contract
=======
>>>>>>> 2c741af18943321173153180956f4bf84445a337
  stateCommitmentChain: Contract
  xDomainMessengerProxy: Contract
  bondManager: Contract
}

interface L2Contracts {
  eth: Contract
  xDomainMessenger: Contract
  messagePasser: Contract
<<<<<<< HEAD
  messageSender: Contract
  deployerWhiteList: Contract
  ecdsaContractAccount: Contract
  sequencerEntrypoint: Contract
  erc1820Registry: Contract
  addressManager: Contract
=======
  deployerWhiteList: Contract
>>>>>>> 2c741af18943321173153180956f4bf84445a337
}

/**
 * Validates user provided a singer or provider & throws error if not
 *
 * @param signerOrProvider
 */
const checkSignerType = (signerOrProvider: Signer | Provider) => {
  if (!signerOrProvider) {
    throw Error('signerOrProvider argument is undefined')
  }
  if (
    !Provider.isProvider(signerOrProvider) &&
    !Signer.isSigner(signerOrProvider)
  ) {
    throw Error('signerOrProvider argument is the wrong type')
  }
}

/**
 * Connects a signer/provider to layer 1 contracts on a given network
 *
 * @param signerOrProvider ethers signer or provider
 * @param network string denoting network
 * @returns l1 contracts connected to signer/provider
 */
export const connectL1Contracts = async (
  signerOrProvider: Signer | Provider,
  network: Network
): Promise<L1Contracts> => {
  checkSignerType(signerOrProvider)

  if (!['mainnet', 'kovan', 'goerli'].includes(network)) {
    throw Error('Must specify network: mainnet, kovan, or goerli.')
  }

<<<<<<< HEAD
  const l1ContractData = getL1ContractData(network)

  const toEthersContract = (data) =>
    new Contract(data.address, data.abi, signerOrProvider)

  return {
    addressManager: toEthersContract(l1ContractData.Lib_AddressManager),
    canonicalTransactionChain: toEthersContract(
      l1ContractData.OVM_CanonicalTransactionChain
    ),
    executionManager: toEthersContract(l1ContractData.OVM_ExecutionManager),
    fraudVerifier: toEthersContract(l1ContractData.OVM_FraudVerifier),
    multiMessageRelayer: toEthersContract(
      l1ContractData.OVM_L1MultiMessageRelayer
    ),
    stateCommitmentChain: toEthersContract(
      l1ContractData.OVM_StateCommitmentChain
    ),
    xDomainMessengerProxy: toEthersContract(
      l1ContractData.Proxy__OVM_L1CrossDomainMessenger
    ),
    // TODO: update this with actual bond manager when its ready
    bondManager: toEthersContract(l1ContractData.mockOVM_BondManager),
=======
  const getEthersContract = (name: string) => {
    const artifact = getDeployedContractArtifact(name, network)
    return new Contract(artifact.address, artifact.abi, signerOrProvider)
  }

  return {
    addressManager: getEthersContract('Lib_AddressManager'),
    canonicalTransactionChain: getEthersContract('CanonicalTransactionChain'),
    stateCommitmentChain: getEthersContract('StateCommitmentChain'),
    xDomainMessengerProxy: getEthersContract('Proxy__L1CrossDomainMessenger'),
    bondManager: getEthersContract('mockBondManager'),
>>>>>>> 2c741af18943321173153180956f4bf84445a337
  }
}

/**
 * Connects a signer/provider to layer 2 contracts (network agnostic)
 *
 * @param signerOrProvider ethers signer or provider
 * @returns l2 contracts connected to signer/provider
 */
export const connectL2Contracts = async (
<<<<<<< HEAD
  signerOrProvider
): Promise<L2Contracts> => {
  const l2ContractData = await getL2ContractData()
  checkSignerType(signerOrProvider)

  const toEthersContract = (data) =>
    new Contract(data.address, data.abi, signerOrProvider)

  return {
    eth: toEthersContract(l2ContractData.OVM_ETH),
    xDomainMessenger: toEthersContract(
      l2ContractData.OVM_L2CrossDomainMessenger
    ),
    messagePasser: toEthersContract(l2ContractData.OVM_L2ToL1MessagePasser),
    messageSender: toEthersContract(l2ContractData.OVM_L1MessageSender),
    deployerWhiteList: toEthersContract(l2ContractData.OVM_DeployerWhitelist),
    ecdsaContractAccount: toEthersContract(
      l2ContractData.OVM_ECDSAContractAccount
    ),
    sequencerEntrypoint: toEthersContract(
      l2ContractData.OVM_SequencerEntrypoint
    ),
    erc1820Registry: toEthersContract(l2ContractData.ERC1820Registry),
    addressManager: toEthersContract(l2ContractData.Lib_AddressManager),
=======
  signerOrProvider: any
): Promise<L2Contracts> => {
  checkSignerType(signerOrProvider)

  const getEthersContract = (name: string, iface?: string) => {
    const artifact = getContractArtifact(iface || name)
    const address = predeploys[name]
    return new Contract(address, artifact.abi, signerOrProvider)
  }

  return {
    eth: getEthersContract('OVM_ETH'),
    xDomainMessenger: getEthersContract('L2CrossDomainMessenger'),
    messagePasser: getEthersContract('OVM_L2ToL1MessagePasser'),
    deployerWhiteList: getEthersContract('OVM_DeployerWhitelist'),
>>>>>>> 2c741af18943321173153180956f4bf84445a337
  }
}
