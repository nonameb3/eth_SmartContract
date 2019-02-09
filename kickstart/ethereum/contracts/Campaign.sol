pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployCampaigns.push(newCampaign);
    }
    
    function getDeployCampaigns() public view returns(address[]) {
        return deployCampaigns;
    }
}

contract Campaign {
    struct Request {
        string decription;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    address public manager;
    uint public minimumContribution;
    Request[] public requests;
    mapping(address => bool) public approvers;
    uint public approvalCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address sender) public {
        manager = sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approvalCount++;
    }
    
    function createRequest(string decription, uint value, address recipient) public restricted {
        require(approvers[msg.sender]);
        Request memory newRequest = Request({
            decription: decription,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approvalRequest(uint index) public {
        Request storage request = requests[index]; // direct require to requests[index]
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public {
        Request storage request = requests[index];
        
        require(request.approvalCount > (approvalCount/2));
        require(!request.complete);
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}