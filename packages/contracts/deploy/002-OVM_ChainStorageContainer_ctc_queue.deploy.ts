/* Imports: External */
import { DeployFunction } from 'hardhat-deploy/dist/types'

/* Imports: Internal */
import {
  deployAndRegister,
  getDeployedContract,
} from '../src/hardhat-deploy-ethers'

const deployFn: DeployFunction = async (hre) => {
  const Lib_AddressManager = await getDeployedContract(
    hre,
    'Lib_AddressManager'
  )

  await deployAndRegister({
    hre,
<<<<<<< HEAD
    name: 'OVM_ChainStorageContainer-CTC-queue',
    contract: 'OVM_ChainStorageContainer',
    args: [Lib_AddressManager.address, 'OVM_CanonicalTransactionChain'],
=======
    name: 'ChainStorageContainer-CTC-queue',
    contract: 'ChainStorageContainer',
    args: [Lib_AddressManager.address, 'CanonicalTransactionChain'],
>>>>>>> 2c741af18943321173153180956f4bf84445a337
  })
}

deployFn.tags = ['ChainStorageContainer_ctc_queue', 'upgrade']

export default deployFn
