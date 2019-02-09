pragma solidity ^0.4.17;

contract Ballot {
    struct Request {
        string decription;
        uint value;
        address recipients;
        bool complete;
    }
    
    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    Request[] public requests;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Ballot(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers.push(msg.sender);
    }
    
    function createRequest(string decription, uint value, address recipients) public restricted {
        Request memory newRequest = Request({
            decription : decription,
            value : value,
            recipients : recipients,
            complete :false
        });
        
        requests.push(newRequest);
    }
    
}