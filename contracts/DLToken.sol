// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';

contract DLToken is ERC20Capped, ERC20Burnable {
	address payable public owner;
    constructor(uint256 cap) ERC20('DisneyLandToken', 'DLT') ERC20Capped(cap * (10 ** decimals())) {
		owner = payable(msg.sender);
        _mint(owner, 10000000 * (10 ** decimals()));
    }

	function _mint(address account, uint256 amount) internal virtual override(ERC20, ERC20Capped) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

	function destroy() public onlyOwner {
		selfdestruct(owner);
	}

	modifier onlyOwner {
		require(msg.sender == owner, 'Only owner can call this function');
		_;
	}
}