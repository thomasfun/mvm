/* Imports: External */
import { DeployFunction } from 'hardhat-deploy/dist/types'

<<<<<<< HEAD
/* Imports: Internal */
import { registerAddress,registerAddressToMvm } from '../src/hardhat-deploy-ethers'
import { predeploys } from '../src/predeploys'

=======
>>>>>>> 2c741af18943321173153180956f4bf84445a337
const deployFn: DeployFunction = async (hre) => {
  const { deploy } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()

  await deploy('Lib_AddressManager', {
    from: deployer,
    args: [],
    log: true,
<<<<<<< HEAD
  })

  await registerAddress({
    hre,
    name: 'OVM_L2CrossDomainMessenger',
    address: predeploys.OVM_L2CrossDomainMessenger,
  })

  await registerAddress({
    hre,
    name: 'OVM_DecompressionPrecompileAddress',
    address: predeploys.OVM_SequencerEntrypoint,
  })

  await registerAddress({
    hre,
    name: 'OVM_Sequencer',
    address: (hre as any).deployConfig.ovmSequencerAddress,
  })
  await registerAddress({
    hre,
    name: 'OVM_Proposer',
    address: (hre as any).deployConfig.ovmProposerAddress,
  })

  await registerAddress({
    hre,
    name: 'OVM_L2BatchMessageRelayer',
    address: (hre as any).deployConfig.ovmRelayerAddress,
=======
    waitConfirmations: (hre as any).deployConfig.numDeployConfirmations,
>>>>>>> 2c741af18943321173153180956f4bf84445a337
  })
  
  const result =  await deploy('MVM_AddressManager', {
    from: deployer,
    args: [],
    log: true,
  })

  await registerAddress({
    hre,
    name: 'MVM_AddressManager',
    address: result.address,
  })
  
  await registerAddressToMvm({
    hre,
    name: '666_MVM_Sequencer',
    address: (hre as any).deployConfig.ovmSequencerAddress,
  })
  await registerAddressToMvm({
    hre,
    name: '429_MVM_Proposer',
    address: (hre as any).deployConfig.ovmProposerAddress,
  })
  await registerAddressToMvm({
    hre,
    name: '488_MVM_Proposer',
    address: (hre as any).deployConfig.ovmProposerAddress,
  })
  await registerAddressToMvm({
    hre,
    name: '666_MVM_Proposer',
    address: (hre as any).deployConfig.ovmProposerAddress,
  })
  await registerAddressToMvm({
    hre,
    name: '666_MVM_RELAYER',
    address: (hre as any).deployConfig.ovmRelayerAddress,
  })
  
  
}

deployFn.tags = ['Lib_AddressManager']

export default deployFn
