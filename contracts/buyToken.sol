// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import './DLToken.sol';

contract buyToken is ERC20 {
	address payable public owner;
	address public player;
	uint public _redeem = 10;
	uint public Eth = 10 ** 18;
	uint public tokenBought;
	// uint amount;
	// uint public requireFee = amount *Eth/100000;


	mapping(address => bool) private addressToRedeem;
	mapping(address => uint) private addressBalance;
	mapping(uint => uint) private ethToToken;
	mapping(uint => uint) private tokenToEth;

	constructor() ERC20('DisneyLandToken', 'DLT') {
		owner = payable(msg.sender);
		_mint(owner, 10000000* (10 ** decimals()));
    }

	function redeem() public {
		player = msg.sender;
		require (addressToRedeem[msg.sender] == false);
		require (msg.sender != owner);
		require (_redeem <= balanceOf(owner));
		_transfer(owner, player, _redeem);
		emit Transfer(owner, player, _redeem);
		addressToRedeem[msg.sender] = true;
	}
	

	function calculator(uint amount) public view returns(uint) {
		uint payByWei;
		payByWei = amount* Eth/100000;
		return payByWei;
	}

	function getToken(uint amount) external payable {
		player = msg.sender;
		_transfer(owner, player, amount);
		tokenBought += amount;
	}

	function sendEth() public payable {

	}

	function sellWithToken (uint amount) external payable {
		player = msg.sender;
		_transfer(player, owner, amount); 
		payable(player).transfer(msg.value); 
	}
	
}