/* eslint-disable @typescript-eslint/no-var-requires */
import { predeploys as l2Addresses } from './predeploys'
import { Network } from './connect-contracts'

/**
 * This file is necessarily not DRY because it needs to be usable
 * in a browser context and can't take advantage of dynamic imports
 * (ie: the json needs to all be imported when transpiled)
 */

const Mainnet__Lib_AddressManager = require('../deployments/mainnet/Lib_AddressManager.json')
<<<<<<< HEAD
const Mainnet__OVM_CanonicalTransactionChain = require('../deployments/mainnet/OVM_CanonicalTransactionChain.json')
const Mainnet__OVM_ExecutionManager = require('../deployments/mainnet/OVM_ExecutionManager.json')
const Mainnet__OVM_FraudVerifier = require('../deployments/mainnet/OVM_FraudVerifier.json')
const Mainnet__OVM_L1CrossDomainMessenger = require('../deployments/mainnet/OVM_L1CrossDomainMessenger.json')
const Mainnet__OVM_L1MultiMessageRelayer = require('../deployments/mainnet/OVM_L1MultiMessageRelayer.json')
const Mainnet__OVM_SafetyChecker = require('../deployments/mainnet/OVM_SafetyChecker.json')
const Mainnet__OVM_StateCommitmentChain = require('../deployments/mainnet/OVM_StateCommitmentChain.json')
const Mainnet__OVM_StateManagerFactory = require('../deployments/mainnet/OVM_StateManagerFactory.json')
const Mainnet__OVM_StateTransitionerFactory = require('../deployments/mainnet/OVM_StateTransitionerFactory.json')
const Mainnet__Proxy__OVM_L1CrossDomainMessenger = require('../deployments/mainnet/Proxy__OVM_L1CrossDomainMessenger.json')
const Mainnet__mockOVM_BondManager = require('../deployments/mainnet/mockOVM_BondManager.json')

const Kovan__Lib_AddressManager = require('../deployments/kovan/Lib_AddressManager.json')
const Kovan__OVM_CanonicalTransactionChain = require('../deployments/kovan/OVM_CanonicalTransactionChain.json')
const Kovan__OVM_ExecutionManager = require('../deployments/kovan/OVM_ExecutionManager.json')
const Kovan__OVM_FraudVerifier = require('../deployments/kovan/OVM_FraudVerifier.json')
const Kovan__OVM_L1CrossDomainMessenger = require('../deployments/kovan/OVM_L1CrossDomainMessenger.json')
const Kovan__OVM_L1MultiMessageRelayer = require('../deployments/kovan/OVM_L1MultiMessageRelayer.json')
const Kovan__OVM_SafetyChecker = require('../deployments/kovan/OVM_SafetyChecker.json')
const Kovan__OVM_StateCommitmentChain = require('../deployments/kovan/OVM_StateCommitmentChain.json')
const Kovan__OVM_StateManagerFactory = require('../deployments/kovan/OVM_StateManagerFactory.json')
const Kovan__OVM_StateTransitionerFactory = require('../deployments/kovan/OVM_StateTransitionerFactory.json')
const Kovan__Proxy__OVM_L1CrossDomainMessenger = require('../deployments/kovan/Proxy__OVM_L1CrossDomainMessenger.json')
const Kovan__mockOVM_BondManager = require('../deployments/kovan/mockOVM_BondManager.json')

const Goerli__Lib_AddressManager = require('../deployments/goerli/Lib_AddressManager.json')
const Goerli__OVM_CanonicalTransactionChain = require('../deployments/goerli/OVM_CanonicalTransactionChain.json')
const Goerli__OVM_ExecutionManager = require('../deployments/goerli/OVM_ExecutionManager.json')
const Goerli__OVM_FraudVerifier = require('../deployments/goerli/OVM_FraudVerifier.json')
const Goerli__OVM_L1CrossDomainMessenger = require('../deployments/goerli/OVM_L1CrossDomainMessenger.json')
const Goerli__OVM_L1MultiMessageRelayer = require('../deployments/goerli/OVM_L1MultiMessageRelayer.json')
const Goerli__OVM_SafetyChecker = require('../deployments/goerli/OVM_SafetyChecker.json')
const Goerli__OVM_StateCommitmentChain = require('../deployments/goerli/OVM_StateCommitmentChain.json')
const Goerli__OVM_StateManagerFactory = require('../deployments/goerli/OVM_StateManagerFactory.json')
const Goerli__OVM_StateTransitionerFactory = require('../deployments/goerli/OVM_StateTransitionerFactory.json')
const Goerli__Proxy__OVM_L1CrossDomainMessenger = require('../deployments/goerli/Proxy__OVM_L1CrossDomainMessenger.json')
const Goerli__mockOVM_BondManager = require('../deployments/goerli/mockOVM_BondManager.json')
=======
const Mainnet__CanonicalTransactionChain = require('../deployments/mainnet/CanonicalTransactionChain.json')
const Mainnet__L1CrossDomainMessenger = require('../deployments/mainnet/L1CrossDomainMessenger.json')
const Mainnet__StateCommitmentChain = require('../deployments/mainnet/StateCommitmentChain.json')
const Mainnet__Proxy__L1CrossDomainMessenger = require('../deployments/mainnet/Proxy__L1CrossDomainMessenger.json')
const Mainnet__BondManager = require('../deployments/mainnet/mockBondManager.json')

const Kovan__Lib_AddressManager = require('../deployments/kovan/Lib_AddressManager.json')
const Kovan__CanonicalTransactionChain = require('../deployments/kovan/CanonicalTransactionChain.json')
const Kovan__L1CrossDomainMessenger = require('../deployments/kovan/L1CrossDomainMessenger.json')
const Kovan__StateCommitmentChain = require('../deployments/kovan/StateCommitmentChain.json')
const Kovan__Proxy__L1CrossDomainMessenger = require('../deployments/kovan/Proxy__L1CrossDomainMessenger.json')
const Kovan__BondManager = require('../deployments/kovan/mockBondManager.json')

const Goerli__Lib_AddressManager = require('../deployments/goerli/Lib_AddressManager.json')
const Goerli__CanonicalTransactionChain = require('../deployments/goerli/CanonicalTransactionChain.json')
const Goerli__L1CrossDomainMessenger = require('../deployments/goerli/L1CrossDomainMessenger.json')
const Goerli__StateCommitmentChain = require('../deployments/goerli/StateCommitmentChain.json')
const Goerli__Proxy__L1CrossDomainMessenger = require('../deployments/goerli/Proxy__L1CrossDomainMessenger.json')
const Goerli__BondManager = require('../deployments/goerli/mockBondManager.json')
>>>>>>> 2c741af18943321173153180956f4bf84445a337

export const getL1ContractData = (network: Network) => {
  return {
    Lib_AddressManager: {
      mainnet: Mainnet__Lib_AddressManager,
      kovan: Kovan__Lib_AddressManager,
      goerli: Goerli__Lib_AddressManager,
    }[network],
<<<<<<< HEAD
    OVM_CanonicalTransactionChain: {
      mainnet: Mainnet__OVM_CanonicalTransactionChain,
      kovan: Kovan__OVM_CanonicalTransactionChain,
      goerli: Goerli__OVM_CanonicalTransactionChain,
    }[network],
    OVM_ExecutionManager: {
      mainnet: Mainnet__OVM_ExecutionManager,
      kovan: Kovan__OVM_ExecutionManager,
      goerli: Goerli__OVM_ExecutionManager,
    }[network],
    OVM_FraudVerifier: {
      mainnet: Mainnet__OVM_FraudVerifier,
      kovan: Kovan__OVM_FraudVerifier,
      goerli: Goerli__OVM_FraudVerifier,
    }[network],
    OVM_L1CrossDomainMessenger: {
      mainnet: Mainnet__OVM_L1CrossDomainMessenger,
      kovan: Kovan__OVM_L1CrossDomainMessenger,
      goerli: Goerli__OVM_L1CrossDomainMessenger,
    }[network],
    OVM_L1MultiMessageRelayer: {
      mainnet: Mainnet__OVM_L1MultiMessageRelayer,
      kovan: Kovan__OVM_L1MultiMessageRelayer,
      goerli: Goerli__OVM_L1MultiMessageRelayer,
    }[network],
    OVM_SafetyChecker: {
      mainnet: Mainnet__OVM_SafetyChecker,
      kovan: Kovan__OVM_SafetyChecker,
      goerli: Goerli__OVM_SafetyChecker,
    }[network],
    OVM_StateCommitmentChain: {
      mainnet: Mainnet__OVM_StateCommitmentChain,
      kovan: Kovan__OVM_StateCommitmentChain,
      goerli: Goerli__OVM_StateCommitmentChain,
    }[network],
    OVM_StateManagerFactory: {
      mainnet: Mainnet__OVM_StateManagerFactory,
      kovan: Kovan__OVM_StateManagerFactory,
      goerli: Goerli__OVM_StateManagerFactory,
    }[network],
    OVM_StateTransitionerFactory: {
      mainnet: Mainnet__OVM_StateTransitionerFactory,
      kovan: Kovan__OVM_StateTransitionerFactory,
      goerli: Goerli__OVM_StateTransitionerFactory,
    }[network],
    Proxy__OVM_L1CrossDomainMessenger: {
      mainnet: Mainnet__Proxy__OVM_L1CrossDomainMessenger,
      kovan: Kovan__Proxy__OVM_L1CrossDomainMessenger,
      goerli: Goerli__Proxy__OVM_L1CrossDomainMessenger,
    }[network],
    mockOVM_BondManager: {
      mainnet: Mainnet__mockOVM_BondManager,
      kovan: Kovan__mockOVM_BondManager,
      goerli: Goerli__mockOVM_BondManager,
=======
    CanonicalTransactionChain: {
      mainnet: Mainnet__CanonicalTransactionChain,
      kovan: Kovan__CanonicalTransactionChain,
      goerli: Goerli__CanonicalTransactionChain,
    }[network],
    L1CrossDomainMessenger: {
      mainnet: Mainnet__L1CrossDomainMessenger,
      kovan: Kovan__L1CrossDomainMessenger,
      goerli: Goerli__L1CrossDomainMessenger,
    }[network],
    StateCommitmentChain: {
      mainnet: Mainnet__StateCommitmentChain,
      kovan: Kovan__StateCommitmentChain,
      goerli: Goerli__StateCommitmentChain,
    }[network],
    Proxy__L1CrossDomainMessenger: {
      mainnet: Mainnet__Proxy__L1CrossDomainMessenger,
      kovan: Kovan__Proxy__L1CrossDomainMessenger,
      goerli: Goerli__Proxy__L1CrossDomainMessenger,
    }[network],
    BondManager: {
      mainnet: Mainnet__BondManager,
      kovan: Kovan__BondManager,
      goerli: Goerli__BondManager,
>>>>>>> 2c741af18943321173153180956f4bf84445a337
    }[network],
  }
}

<<<<<<< HEAD
const OVM_ETH = require('../artifacts-ovm/contracts/optimistic-ethereum/OVM/predeploys/OVM_ETH.sol/OVM_ETH.json')
const OVM_L2CrossDomainMessenger = require('../artifacts-ovm/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L2CrossDomainMessenger.sol/OVM_L2CrossDomainMessenger.json')
const OVM_L2ToL1MessagePasser = require('../artifacts-ovm/contracts/optimistic-ethereum/OVM/predeploys/OVM_L2ToL1MessagePasser.sol/OVM_L2ToL1MessagePasser.json')
const OVM_L1MessageSender = require('../artifacts-ovm/contracts/optimistic-ethereum/OVM/predeploys/OVM_L1MessageSender.sol/OVM_L1MessageSender.json')
const OVM_DeployerWhitelist = require('../artifacts-ovm/contracts/optimistic-ethereum/OVM/predeploys/OVM_DeployerWhitelist.sol/OVM_DeployerWhitelist.json')
const OVM_ECDSAContractAccount = require('../artifacts-ovm/contracts/optimistic-ethereum/OVM/predeploys/OVM_ECDSAContractAccount.sol/OVM_ECDSAContractAccount.json')
const OVM_SequencerEntrypoint = require('../artifacts-ovm/contracts/optimistic-ethereum/OVM/predeploys/OVM_SequencerEntrypoint.sol/OVM_SequencerEntrypoint.json')
const ERC1820Registry = require('../artifacts-ovm/contracts/optimistic-ethereum/OVM/predeploys/ERC1820Registry.sol/ERC1820Registry.json')
const Lib_AddressManager = require('../artifacts-ovm/contracts/optimistic-ethereum/libraries/resolver/Lib_AddressManager.sol/Lib_AddressManager.json')
=======
const OVM_ETH = require('../artifacts/contracts/L2/predeploys/OVM_ETH.sol/OVM_ETH.json')
const L2CrossDomainMessenger = require('../artifacts/contracts/L2/messaging/L2CrossDomainMessenger.sol/L2CrossDomainMessenger.json')
const OVM_L2ToL1MessagePasser = require('../artifacts/contracts/L2/predeploys/OVM_L2ToL1MessagePasser.sol/OVM_L2ToL1MessagePasser.json')
const OVM_DeployerWhitelist = require('../artifacts/contracts/L2/predeploys/OVM_DeployerWhitelist.sol/OVM_DeployerWhitelist.json')
>>>>>>> 2c741af18943321173153180956f4bf84445a337

export const getL2ContractData = () => {
  return {
    OVM_ETH: {
      abi: OVM_ETH.abi,
      address: l2Addresses.OVM_ETH,
    },
<<<<<<< HEAD
    OVM_L2CrossDomainMessenger: {
      abi: OVM_L2CrossDomainMessenger.abi,
      address: l2Addresses.OVM_L2CrossDomainMessenger,
=======
    L2CrossDomainMessenger: {
      abi: L2CrossDomainMessenger.abi,
      address: l2Addresses.L2CrossDomainMessenger,
>>>>>>> 2c741af18943321173153180956f4bf84445a337
    },
    OVM_L2ToL1MessagePasser: {
      abi: OVM_L2ToL1MessagePasser.abi,
      address: l2Addresses.OVM_L2ToL1MessagePasser,
    },
<<<<<<< HEAD
    OVM_L1MessageSender: {
      abi: OVM_L1MessageSender.abi,
      address: l2Addresses.OVM_L1MessageSender,
    },
=======
>>>>>>> 2c741af18943321173153180956f4bf84445a337
    OVM_DeployerWhitelist: {
      abi: OVM_DeployerWhitelist.abi,
      address: l2Addresses.OVM_DeployerWhitelist,
    },
<<<<<<< HEAD
    OVM_ECDSAContractAccount: {
      abi: OVM_ECDSAContractAccount.abi,
      address: l2Addresses.OVM_ECDSAContractAccount,
    },
    OVM_SequencerEntrypoint: {
      abi: OVM_SequencerEntrypoint.abi,
      address: l2Addresses.OVM_SequencerEntrypoint,
    },
    ERC1820Registry: {
      abi: ERC1820Registry.abi,
      address: l2Addresses.ERC1820Registry,
    },
    Lib_AddressManager: {
      abi: Lib_AddressManager.abi,
      address: l2Addresses.Lib_AddressManager,
    },
=======
>>>>>>> 2c741af18943321173153180956f4bf84445a337
  }
}
