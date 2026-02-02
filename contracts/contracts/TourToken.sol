// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TourToken is ERC20, Ownable {
    mapping(address => bool) public minters;

    constructor() ERC20("TourToken", "TOUR") Ownable(msg.sender) {}

    function setMinter(address minter, bool status) public onlyOwner {
        minters[minter] = status;
    }

    function mint(address to, uint256 amount) public {
        require(owner() == msg.sender || minters[msg.sender], "Not authorized to mint");
        _mint(to, amount);
    }
}
