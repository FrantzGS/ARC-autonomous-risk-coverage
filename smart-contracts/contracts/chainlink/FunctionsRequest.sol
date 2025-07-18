// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library FunctionsRequest {
    enum CodeLocation {
        Inline,
        Remote
    }

    enum CodeLanguage {
        JavaScript
    }

    struct Request {
        CodeLocation codeLocation;
        CodeLanguage language;
        string source;
        bytes[] args;
        bytes secrets;
        CodeLocation secretsLocation;
    }

    function initializeRequestForInlineJavaScript(Request memory req, string memory sourceCode)
        internal
        pure
        returns (Request memory)
    {
        req.codeLocation = CodeLocation.Inline;
        req.language = CodeLanguage.JavaScript;
        req.source = sourceCode;
        return req;
    }

    function encodeCBOR(Request memory req) internal pure returns (bytes memory) {
        // mock return for now
        return bytes(req.source);
    }
}
