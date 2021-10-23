// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.8.0;
/* Contract Imports */
/* External Imports */
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
contract MVM_DiscountOracle is Ownable{
    // Current l2 gas price
    uint256 public discount;
    uint256 public minL2Gas;

    constructor(
      uint256 _initialDiscount
    )
      Ownable() 
    {
      setDiscount(_initialDiscount);
      setMinL2Gas(1_000_000);
    }

    function setDiscount(
        uint256 _discount
    )
        public
        onlyOwner
    {
        discount = _discount;
    }
    
    function setMinL2Gas(
        uint256 _minL2Gas
    )
        public
        onlyOwner
    {
        minL2Gas = _minL2Gas;
    }

    function transferSetter(address newsetter) public onlyOwner{
       transferOwnership(newsetter);
    }
}
