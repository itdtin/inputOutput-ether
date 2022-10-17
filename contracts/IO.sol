// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract IO {
    address owner;
    mapping (address => uint) public values;

    modifier onlyOwner() {
        require(msg.sender == owner, "Restrict to owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        values[msg.sender] = msg.value;

    }

    function withdraw(address payable receiver, uint256 amount) external onlyOwner {
        if(address(this).balance < amount) {
            receiver.transfer(amount);
        }
    }

    function withDrawAll() public {
        address payable _to = payable(owner);
        _to.transfer(address(this).balance);
    }
}
