// SPDX-License-Identifier: MIT
<<<<<<< HEAD
pragma solidity >0.5.0 <0.8.0;
=======
pragma solidity ^0.8.9;
>>>>>>> 2c741af18943321173153180956f4bf84445a337

import { iL1ChugSplashDeployer } from "./interfaces/iL1ChugSplashDeployer.sol";

/**
 * @title L1ChugSplashProxy
 * @dev Basic ChugSplash proxy contract for L1. Very close to being a normal proxy but has added
 * functions `setCode` and `setStorage` for changing the code or storage of the contract. Nifty!
 *
 * Note for future developers: do NOT make anything in this contract 'public' unless you know what
 * you're doing. Anything public can potentially have a function signature that conflicts with a
 * signature attached to the implementation contract. Public functions SHOULD always have the
 * 'proxyCallIfNotOwner' modifier unless there's some *really* good reason not to have that
 * modifier. And there almost certainly is not a good reason to not have that modifier. Beware!
 */
contract L1ChugSplashProxy {
<<<<<<< HEAD

=======
>>>>>>> 2c741af18943321173153180956f4bf84445a337
    /*************
     * Constants *
     *************/

    // "Magic" prefix. When prepended to some arbitrary bytecode and used to create a contract, the
    // appended bytecode will be deployed as given.
<<<<<<< HEAD
    bytes13 constant internal DEPLOY_CODE_PREFIX = 0x600D380380600D6000396000f3;

    // bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)
    bytes32 constant internal IMPLEMENTATION_KEY = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    // bytes32(uint256(keccak256('eip1967.proxy.admin')) - 1)
    bytes32 constant internal OWNER_KEY = 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;

=======
    bytes13 internal constant DEPLOY_CODE_PREFIX = 0x600D380380600D6000396000f3;

    // bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)
    bytes32 internal constant IMPLEMENTATION_KEY =
        0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    // bytes32(uint256(keccak256('eip1967.proxy.admin')) - 1)
    bytes32 internal constant OWNER_KEY =
        0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;
>>>>>>> 2c741af18943321173153180956f4bf84445a337

    /***************
     * Constructor *
     ***************/
<<<<<<< HEAD
    
    /**
     * @param _owner Address of the initial contract owner.
     */
    constructor(
        address _owner
    ) {
        _setOwner(_owner);
    }


=======

    /**
     * @param _owner Address of the initial contract owner.
     */
    constructor(address _owner) {
        _setOwner(_owner);
    }

>>>>>>> 2c741af18943321173153180956f4bf84445a337
    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Blocks a function from being called when the parent signals that the system should be paused
     * via an isUpgrading function.
     */
    modifier onlyWhenNotPaused() {
        address owner = _getOwner();

        // We do a low-level call because there's no guarantee that the owner actually *is* an
        // L1ChugSplashDeployer contract and Solidity will throw errors if we do a normal call and
        // it turns out that it isn't the right type of contract.
        (bool success, bytes memory returndata) = owner.staticcall(
<<<<<<< HEAD
            abi.encodeWithSelector(
                iL1ChugSplashDeployer.isUpgrading.selector
            )
=======
            abi.encodeWithSelector(iL1ChugSplashDeployer.isUpgrading.selector)
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        );

        // If the call was unsuccessful then we assume that there's no "isUpgrading" method and we
        // can just continue as normal. We also expect that the return value is exactly 32 bytes
        // long. If this isn't the case then we can safely ignore the result.
        if (success && returndata.length == 32) {
            // Although the expected value is a *boolean*, it's safer to decode as a uint256 in the
            // case that the isUpgrading function returned something other than 0 or 1. But we only
            // really care about the case where this value is 0 (= false).
            uint256 ret = abi.decode(returndata, (uint256));
<<<<<<< HEAD
            require(
                ret == 0,
                "L1ChugSplashProxy: system is currently being upgraded"
            );
=======
            require(ret == 0, "L1ChugSplashProxy: system is currently being upgraded");
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        }

        _;
    }

    /**
     * Makes a proxy call instead of triggering the given function when the caller is either the
     * owner or the zero address. Caller can only ever be the zero address if this function is
     * being called off-chain via eth_call, which is totally fine and can be convenient for
     * client-side tooling. Avoids situations where the proxy and implementation share a sighash
     * and the proxy function ends up being called instead of the implementation one.
     *
     * Note: msg.sender == address(0) can ONLY be triggered off-chain via eth_call. If there's a
     * way for someone to send a transaction with msg.sender == address(0) in any real context then
     * we have much bigger problems. Primary reason to include this additional allowed sender is
     * because the owner address can be changed dynamically and we do not want clients to have to
     * keep track of the current owner in order to make an eth_call that doesn't trigger the
     * proxied contract.
     */
    modifier proxyCallIfNotOwner() {
        if (msg.sender == _getOwner() || msg.sender == address(0)) {
            _;
        } else {
            // This WILL halt the call frame on completion.
            _doProxyCall();
        }
    }

<<<<<<< HEAD

=======
>>>>>>> 2c741af18943321173153180956f4bf84445a337
    /*********************
     * Fallback Function *
     *********************/

<<<<<<< HEAD
    fallback()
        external
        payable
    {
=======
    fallback() external payable {
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        // Proxy call by default.
        _doProxyCall();
    }

<<<<<<< HEAD

=======
>>>>>>> 2c741af18943321173153180956f4bf84445a337
    /********************
     * Public Functions *
     ********************/

    /**
     * Sets the code that should be running behind this proxy. Note that this scheme is a bit
     * different from the standard proxy scheme where one would typically deploy the code
     * separately and then set the implementation address. We're doing it this way because it gives
     * us a lot more freedom on the client side. Can only be triggered by the contract owner.
     * @param _code New contract code to run inside this contract.
     */
<<<<<<< HEAD
    function setCode(
        bytes memory _code
    )
        proxyCallIfNotOwner
        public
    {
=======
    function setCode(bytes memory _code) public proxyCallIfNotOwner {
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        // Get the code hash of the current implementation.
        address implementation = _getImplementation();

        // If the code hash matches the new implementation then we return early.
        if (keccak256(_code) == _getAccountCodeHash(implementation)) {
            return;
        }

        // Create the deploycode by appending the magic prefix.
<<<<<<< HEAD
        bytes memory deploycode = abi.encodePacked(
            DEPLOY_CODE_PREFIX,
            _code
        );
=======
        bytes memory deploycode = abi.encodePacked(DEPLOY_CODE_PREFIX, _code);
>>>>>>> 2c741af18943321173153180956f4bf84445a337

        // Deploy the code and set the new implementation address.
        address newImplementation;
        assembly {
            newImplementation := create(0x0, add(deploycode, 0x20), mload(deploycode))
        }

        // Check that the code was actually deployed correctly. I'm not sure if you can ever
        // actually fail this check. Should only happen if the contract creation from above runs
        // out of gas but this parent execution thread does NOT run out of gas. Seems like we
        // should be doing this check anyway though.
        require(
            _getAccountCodeHash(newImplementation) == keccak256(_code),
            "L1ChugSplashProxy: code was not correctly deployed."
        );

        _setImplementation(newImplementation);
    }

    /**
     * Modifies some storage slot within the proxy contract. Gives us a lot of power to perform
     * upgrades in a more transparent way. Only callable by the owner.
     * @param _key Storage key to modify.
     * @param _value New value for the storage key.
     */
<<<<<<< HEAD
    function setStorage(
        bytes32 _key,
        bytes32 _value
    )
        proxyCallIfNotOwner
        public
    {
=======
    function setStorage(bytes32 _key, bytes32 _value) public proxyCallIfNotOwner {
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        assembly {
            sstore(_key, _value)
        }
    }

    /**
     * Changes the owner of the proxy contract. Only callable by the owner.
     * @param _owner New owner of the proxy contract.
     */
<<<<<<< HEAD
    function setOwner(
        address _owner
    )
        proxyCallIfNotOwner
        public
    {
=======
    function setOwner(address _owner) public proxyCallIfNotOwner {
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        _setOwner(_owner);
    }

    /**
     * Queries the owner of the proxy contract. Can only be called by the owner OR by making an
     * eth_call and setting the "from" address to address(0).
     * @return Owner address.
     */
<<<<<<< HEAD
    function getOwner()
        proxyCallIfNotOwner
        public
        returns (
            address
        )
    {
=======
    function getOwner() public proxyCallIfNotOwner returns (address) {
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        return _getOwner();
    }

    /**
     * Queries the implementation address. Can only be called by the owner OR by making an
     * eth_call and setting the "from" address to address(0).
     * @return Implementation address.
     */
<<<<<<< HEAD
    function getImplementation()
        proxyCallIfNotOwner
        public
        returns (
            address
        )
    {
        return _getImplementation();
    }


=======
    function getImplementation() public proxyCallIfNotOwner returns (address) {
        return _getImplementation();
    }

>>>>>>> 2c741af18943321173153180956f4bf84445a337
    /**********************
     * Internal Functions *
     **********************/

    /**
     * Sets the implementation address.
     * @param _implementation New implementation address.
     */
<<<<<<< HEAD
    function _setImplementation(
        address _implementation
    )
        internal
    {
=======
    function _setImplementation(address _implementation) internal {
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        assembly {
            sstore(IMPLEMENTATION_KEY, _implementation)
        }
    }

    /**
     * Queries the implementation address.
     * @return Implementation address.
     */
<<<<<<< HEAD
    function _getImplementation()
        internal
        view
        returns (
            address
        )
    {
=======
    function _getImplementation() internal view returns (address) {
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        address implementation;
        assembly {
            implementation := sload(IMPLEMENTATION_KEY)
        }
        return implementation;
    }

    /**
     * Changes the owner of the proxy contract.
     * @param _owner New owner of the proxy contract.
     */
<<<<<<< HEAD
    function _setOwner(
        address _owner
    )
        internal
    {
=======
    function _setOwner(address _owner) internal {
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        assembly {
            sstore(OWNER_KEY, _owner)
        }
    }

    /**
     * Queries the owner of the proxy contract.
     * @return Owner address.
     */
<<<<<<< HEAD
    function _getOwner()
        internal
        view 
        returns (
            address
        )
    {
=======
    function _getOwner() internal view returns (address) {
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        address owner;
        assembly {
            owner := sload(OWNER_KEY)
        }
        return owner;
    }

    /**
     * Gets the code hash for a given account.
     * @param _account Address of the account to get a code hash for.
     * @return Code hash for the account.
     */
<<<<<<< HEAD
    function _getAccountCodeHash(
        address _account
    )
        internal
        view
        returns (
            bytes32
        )
    {
=======
    function _getAccountCodeHash(address _account) internal view returns (bytes32) {
>>>>>>> 2c741af18943321173153180956f4bf84445a337
        bytes32 codeHash;
        assembly {
            codeHash := extcodehash(_account)
        }
        return codeHash;
    }

    /**
     * Performs the proxy call via a delegatecall.
     */
<<<<<<< HEAD
    function _doProxyCall()
        onlyWhenNotPaused
        internal
    {
        address implementation = _getImplementation();

        require(
            implementation != address(0),
            "L1ChugSplashProxy: implementation is not set yet"
        );
=======
    function _doProxyCall() internal onlyWhenNotPaused {
        address implementation = _getImplementation();

        require(implementation != address(0), "L1ChugSplashProxy: implementation is not set yet");
>>>>>>> 2c741af18943321173153180956f4bf84445a337

        assembly {
            // Copy calldata into memory at 0x0....calldatasize.
            calldatacopy(0x0, 0x0, calldatasize())

            // Perform the delegatecall, make sure to pass all available gas.
            let success := delegatecall(gas(), implementation, 0x0, calldatasize(), 0x0, 0x0)

            // Copy returndata into memory at 0x0....returndatasize. Note that this *will*
            // overwrite the calldata that we just copied into memory but that doesn't really
            // matter because we'll be returning in a second anyway.
            returndatacopy(0x0, 0x0, returndatasize())
<<<<<<< HEAD
            
=======

>>>>>>> 2c741af18943321173153180956f4bf84445a337
            // Success == 0 means a revert. We'll revert too and pass the data up.
            if iszero(success) {
                revert(0x0, returndatasize())
            }

            // Otherwise we'll just return and pass the data up.
            return(0x0, returndatasize())
        }
    }
}
