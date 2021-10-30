/* External Imports */
import { defaultAccounts } from 'ethereum-waffle'

export const DEFAULT_ACCOUNTS = defaultAccounts
export const DEFAULT_ACCOUNTS_HARDHAT = defaultAccounts.map((account) => {
  return {
    balance: account.balance,
    privateKey: account.secretKey,
  }
})

export const RUN_OVM_TEST_GAS = 20_000_000
export const FORCE_INCLUSION_PERIOD_SECONDS = 600
export const L2_GAS_DISCOUNT_DIVISOR = 32
export const ENQUEUE_GAS_COST = 60_000
export const FORCE_INCLUSION_PERIOD_BLOCKS = 600 / 12

export const NON_NULL_BYTES32 =
  '0x1111111111111111111111111111111111111111111111111111111111111111'
export const NON_ZERO_ADDRESS = '0x1111111111111111111111111111111111111111'
<<<<<<< HEAD

export const VERIFIED_EMPTY_CONTRACT_HASH =
  '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

export const STORAGE_XOR_VALUE =
  '0xFEEDFACECAFEBEEFFEEDFACECAFEBEEFFEEDFACECAFEBEEFFEEDFACECAFEBEEF'

export const NUISANCE_GAS_COSTS = {
  NUISANCE_GAS_SLOAD: 20000,
  NUISANCE_GAS_SSTORE: 20000,
  MIN_NUISANCE_GAS_PER_CONTRACT: 30000,
  NUISANCE_GAS_PER_CONTRACT_BYTE: 100,
  MIN_GAS_FOR_INVALID_STATE_ACCESS: 30000,
}

let len
// This is hacky, but `hardhat compile` evaluates this file for some reason.
// Feels better to have something hacky then a constant we have to keep re-hardcoding.
try {
  len = fromHexString(
    getContractDefinition('Helper_TestRunner').deployedBytecode
  ).byteLength
  // eslint-disable-next-line no-empty
} catch {}

export const Helper_TestRunner_BYTELEN = len

export const STORAGE_XOR =
  '0xfeedfacecafebeeffeedfacecafebeeffeedfacecafebeeffeedfacecafebeef'
export const getStorageXOR = (key: string): string => {
  return toHexString(xor(fromHexString(key), fromHexString(STORAGE_XOR)))
}

export const EMPTY_ACCOUNT_CODE_HASH =
  '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
export const KECCAK_256_NULL =
  '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
=======
>>>>>>> 2c741af18943321173153180956f4bf84445a337
