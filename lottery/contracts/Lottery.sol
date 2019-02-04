pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .1 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns(uint){
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWiner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns(address[]){
        return players;
    }
}