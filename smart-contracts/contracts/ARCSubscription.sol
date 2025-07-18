// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ARCSubscription is Ownable, Pausable, ReentrancyGuard {
    struct Subscription {
        address user;
        address token;
        string cropType;
        uint256 hectares;
        uint256 pricePerKg;
        uint256 riskIndex;
        uint256 premium;
        uint256 payout;
        bool paidInETH;
        bool active;
    }

    mapping(address => Subscription[]) public subscriptions;

    event Subscribed(
        address indexed user,
        string cropType,
        uint256 hectares,
        uint256 premium,
        uint256 payout,
        string paymentMethod
    );

    constructor() {}

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function subscribeUSDC(
        address token,
        string memory cropType,
        uint256 hectares,
        uint256 pricePerKg,
        uint256 riskIndex
    ) external whenNotPaused nonReentrant {
        uint256 premium = hectares * 10 * (riskIndex + 1);
        uint256 payout = hectares * pricePerKg * 100;

        IERC20(token).transferFrom(msg.sender, address(this), premium);

        subscriptions[msg.sender].push(Subscription({
            user: msg.sender,
            token: token,
            cropType: cropType,
            hectares: hectares,
            pricePerKg: pricePerKg,
            riskIndex: riskIndex,
            premium: premium,
            payout: payout,
            paidInETH: false,
            active: true
        }));

        emit Subscribed(msg.sender, cropType, hectares, premium, payout, "USDC");
    }

    function subscribeUSDT(
        address token,
        string memory cropType,
        uint256 hectares,
        uint256 pricePerKg,
        uint256 riskIndex
    ) external whenNotPaused nonReentrant {
        uint256 premium = hectares * 10 * (riskIndex + 1);
        uint256 payout = hectares * pricePerKg * 100;

        IERC20(token).transferFrom(msg.sender, address(this), premium);

        subscriptions[msg.sender].push(Subscription({
            user: msg.sender,
            token: token,
            cropType: cropType,
            hectares: hectares,
            pricePerKg: pricePerKg,
            riskIndex: riskIndex,
            premium: premium,
            payout: payout,
            paidInETH: false,
            active: true
        }));

        emit Subscribed(msg.sender, cropType, hectares, premium, payout, "USDT");
    }

    function subscribeETH(
        string memory cropType,
        uint256 hectares,
        uint256 pricePerKg,
        uint256 riskIndex
    ) external payable whenNotPaused nonReentrant {
        uint256 premium = hectares * 10 * (riskIndex + 1);
        uint256 payout = hectares * pricePerKg * 100;

        require(msg.value >= premium, "Montant ETH insuffisant");

        subscriptions[msg.sender].push(Subscription({
            user: msg.sender,
            token: address(0),
            cropType: cropType,
            hectares: hectares,
            pricePerKg: pricePerKg,
            riskIndex: riskIndex,
            premium: premium,
            payout: payout,
            paidInETH: true,
            active: true
        }));

        emit Subscribed(msg.sender, cropType, hectares, premium, payout, "ETH");
    }

    function getSubscriptions(address user) external view returns (Subscription[] memory) {
        return subscriptions[user];
    }
}
