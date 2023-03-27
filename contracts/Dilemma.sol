// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './buyToken.sol';

contract Dilemma is ERC20 {

    address private deployer;
    address public players;
    address[] public allPlayers;
    uint public currentMax = 0;
    uint public currentMin = 99999999999999999999;
    address[] public currentHighestBidder;
    uint public Yes;
    uint public No;

    mapping(address => uint) public addressToAmount;
    mapping(address => bool) private addressToEnter;
    mapping(address => bool) private addressToVote;


    constructor() ERC20 ('DisneyLandToken', 'DLT') {
        deployer = msg.sender;
    }

    function enter(uint amount) public payable {
        require(addressToEnter[msg.sender] == false);
        require(amount > 0);
        players = msg.sender;
        require(players != deployer);
        addressToAmount[msg.sender] = amount;
        _transfer(players, address(this), amount);
        allPlayers.push(msg.sender);
        addressToEnter[msg.sender] = true;
    }

    
    function FindMax() public returns (uint) {
        for(uint n = 0; n < allPlayers.length; n++){
        if (addressToAmount[allPlayers[n]] > currentMax) {
            currentMax = addressToAmount[allPlayers[n]];
            delete currentHighestBidder;
            currentHighestBidder.push(allPlayers[n]);
            } else if (addressToAmount[allPlayers[n]] == currentMax) {
                currentHighestBidder.push(allPlayers[n]);
                currentMax = addressToAmount[allPlayers[n]];
            }
            }
        return currentMax;
    }

    function FindMin() public returns (uint) {
        for(uint n = 0; n < allPlayers.length; n++){
        if (addressToAmount[allPlayers[n]] <= currentMin) {
            currentMin = addressToAmount[allPlayers[n]];
        }
            }
        return currentMin;
    }

    function compare() public view returns(uint,uint) {
        return (currentMax, currentMin);
    }

    function voteYes() external {
        require (addressToVote[msg.sender] == false);
        addressToVote[msg.sender] = true;
        Yes++;
    }

    function voteNo() external {
        require (addressToVote[msg.sender] == false);
        addressToVote[msg.sender] = true;
        No++;
    }

    function chooseSend() external payable {
        if (Yes >= (Yes+No)*3/5) {
        for (uint i = 0; i < allPlayers.length; i++) {
        if (currentMax >= allPlayers.length*currentMin){
            _transfer(address(this), currentHighestBidder[i], balanceOf(address(this))/currentHighestBidder.length);
        }
        else {
            _transfer(address(this), allPlayers[i], balanceOf(address(this))/allPlayers.length);}
        }
    }
    else {revert();}
    }
}