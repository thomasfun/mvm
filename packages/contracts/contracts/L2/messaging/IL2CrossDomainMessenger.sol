// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
<<<<<<< HEAD:packages/contracts/contracts/optimistic-ethereum/iOVM/bridge/messaging/iOVM_L2CrossDomainMessenger.sol
import { iOVM_CrossDomainMessenger } from "./iOVM_CrossDomainMessenger.sol";
=======
import { ICrossDomainMessenger } from "../../libraries/bridge/ICrossDomainMessenger.sol";
>>>>>>> 2c741af18943321173153180956f4bf84445a337:packages/contracts/contracts/L2/messaging/IL2CrossDomainMessenger.sol

/**
 * @title IL2CrossDomainMessenger
 */
<<<<<<< HEAD:packages/contracts/contracts/optimistic-ethereum/iOVM/bridge/messaging/iOVM_L2CrossDomainMessenger.sol
interface iOVM_L2CrossDomainMessenger is iOVM_CrossDomainMessenger {

=======
interface IL2CrossDomainMessenger is ICrossDomainMessenger {
>>>>>>> 2c741af18943321173153180956f4bf84445a337:packages/contracts/contracts/L2/messaging/IL2CrossDomainMessenger.sol
    /********************
     * Public Functions *
     ********************/

    /**
     * Relays a cross domain message to a contract.
     * @param _target Target contract address.
     * @param _sender Message sender address.
     * @param _message Message to send to the target.
     * @param _messageNonce Nonce for the provided message.
     */
    function relayMessage(
        address _target,
        address _sender,
        bytes memory _message,
        uint256 _messageNonce
    ) external;
    
}
