// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { FunctionsRequest } from "./FunctionsRequest.sol";

abstract contract FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    address public functionsRouter;

    constructor(address _router) {
        functionsRouter = (_router);
    }

    modifier onlyRouter() {
        require(msg.sender == functionsRouter, "Only router can call");
        _;
    }

    function updateRouter(address _newRouter) external {
        require(msg.sender == functionsRouter, "Only router can update");
        functionsRouter = (_newRouter);
    }

    function handleOracleFulfillment(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal virtual;

    function sendRequest(
    bytes memory request,
    uint64,
    uint32
) internal virtual returns (bytes32) {
    bytes32 mockRequestId = keccak256(abi.encodePacked(request, block.timestamp));
    return mockRequestId;
}

}
