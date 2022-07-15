// SPDX-License-Indentifier: MIT
pragma solidity ^0.8.9;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    uint requestCount;
    mapping(uint => Request) public requests;

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string calldata description,
        uint value,
        address recipient
    ) public restricted returns (uint requestId) {
        requestId = requestCount++;
        Request storage r = requests[requestId];
        r.description = description;
        r.value = value;
        r.recipient = payable(recipient);
        r.complete = false;
        r.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        require(approvers[msg.sender]);
        Request storage request = requests[index];
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));
        request.complete = true;
        request.recipient.transfer(request.value);
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            address(this).balance,
            requestCount,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requestCount;
    }
}
