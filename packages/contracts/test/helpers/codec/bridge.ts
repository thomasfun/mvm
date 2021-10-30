/* Imports: Internal */
import { getContractInterface } from '../../../src/contract-defs'

export const encodeXDomainCalldata = (
  target: string,
  sender: string,
  message: string,
  messageNonce: number
): string => {
<<<<<<< HEAD
  return getContractInterface('OVM_L2CrossDomainMessenger').encodeFunctionData(
=======
  return getContractInterface('L2CrossDomainMessenger').encodeFunctionData(
>>>>>>> 2c741af18943321173153180956f4bf84445a337
    'relayMessage',
    [target, sender, message, messageNonce]
  )
}
