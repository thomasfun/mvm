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
    name: 'OVM_ChainStorageContainer-SCC-batches',
    contract: 'OVM_ChainStorageContainer',
    args: [Lib_AddressManager.address, 'OVM_StateCommitmentChain'],
=======
    name: 'ChainStorageContainer-SCC-batches',
    contract: 'ChainStorageContainer',
    args: [Lib_AddressManager.address, 'StateCommitmentChain'],
>>>>>>> 2c741af18943321173153180956f4bf84445a337
  })
}

deployFn.tags = ['ChainStorageContainer_scc_batches', 'upgrade']

export default deployFn
