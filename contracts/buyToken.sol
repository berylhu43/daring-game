// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BuyToken is ERC20 {
    address payable public owner;
    uint public redeemAmount = 10;
    uint public tokenBought;
    uint public rate = 100000; // Number of tokens per Ether

    mapping(address => bool) private hasRedeemed;

    constructor() ERC20('DisneyLandToken', 'DLT') {
        owner = payable(msg.sender);
        _mint(owner, 10000000 * (10 ** decimals()));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyOnce() {
        require(!hasRedeemed[msg.sender], "Already redeemed");
        _;
    }

    function redeem() external onlyOnce {
        require(balanceOf(owner) >= redeemAmount, "Not enough tokens available to redeem");
        _transfer(owner, msg.sender, redeemAmount);
        hasRedeemed[msg.sender] = true;
    }

    function buyToken() external payable {
        uint amount = calculateTokens(msg.value);
        require(amount > 0, "Need to send more Ether to buy tokens");
        require(balanceOf(owner) >= amount, "Not enough tokens available for sale");
        _transfer(owner, msg.sender, amount);
        tokenBought += amount;
        owner.transfer(msg.value); // Transfer the received Ether to the owner
    }

    function calculateTokens(uint etherAmount) public view returns (uint) {
        return etherAmount * rate / (10 ** 18); // calculate number of tokens as per rate and considering 18 decimal places of Ether
    }

    // This function allows the owner to withdraw any Ether that was sent to the contract by mistake
    function withdrawEther() external onlyOwner {
        owner.transfer(address(this).balance);
    }
}
