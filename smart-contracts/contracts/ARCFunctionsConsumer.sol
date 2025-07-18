// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "./chainlink/FunctionsClient.sol";
import "./chainlink/FunctionsRequest.sol";

contract ARCFunctionsConsumer is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    string public latestResponse;
    bytes public latestError;
    bytes32 public latestRequestId;

    uint64 public subscriptionId;
    uint32 public gasLimit = 300000;
    string public source;

    event OCRResponse(bytes result, bytes err);

    constructor() 
        FunctionsClient(payable(0x8c809B9Fc1d9ff36dF304f90CC06Aa94F5E47e54)) // Adresse router Chainlink Functions Sepolia
        ConfirmedOwner(msg.sender)
    {}

    function handleOracleFulfillment(
        bytes32 /* requestId */,
        bytes memory response,
        bytes memory err
    ) internal override {
        latestResponse = string(response);
        latestError = err;
        emit OCRResponse(response, err);
    }

    function setSource(string memory _source) public onlyOwner {
        source = _source;
    }

    function setSubscriptionId(uint64 _subscriptionId) public onlyOwner {
        subscriptionId = _subscriptionId;
    }

    function mockFulfill(string memory responseText) public onlyOwner {
    bytes32 mockRequestId = keccak256(abi.encodePacked("mock", block.timestamp));
    bytes memory response = bytes(responseText);
    bytes memory err = "";
    handleOracleFulfillment(mockRequestId, response, err);
}

}
