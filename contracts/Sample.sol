// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Sample {
    mapping(address => uint256) public values;

    function setValue(address _address, uint256 _value) public {
        values[_address] = _value;
    }
}
