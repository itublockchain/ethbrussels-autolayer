// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract Automation is AutomationCompatibleInterface {
    mapping(address => bool) public condition;
    mapping(address => uint256) public swapAmounts;
    address[] public users;

    address public swapContractAddress;

    event TokensSwapped(address user, uint256 amount);

    constructor(address _swapContractAddress) {
        swapContractAddress = _swapContractAddress;
    }

    function addUser(address user, uint256 swapAmount) external {
        if (swapAmounts[user] == 0) {
            users.push(user);
        }
        swapAmounts[user] = swapAmount;
    }

    function setCondition(address user, bool value) external {
        condition[user] = value;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    ) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        for (uint256 i = 0; i < users.length; i++) {
            if (condition[users[i]]) {
                upkeepNeeded = true;
                break;
            }
        }
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            if (condition[user]) {
                uint256 amount = swapAmounts[user];
                if (amount > 0) {
                    swapTokens(user, amount);
                }
                condition[user] = false;
            }
        }
    }

    function swapTokens(address user, uint256 amount) internal {
        (bool success, ) = swapContractAddress.call(
            abi.encodeWithSignature("swap(uint256)", amount)
        );
        require(success, "Swap failed");
        emit TokensSwapped(user, amount);
    }

    function reset() external {
        // Only for demonstration purposes; in a real scenario, proper access control is needed.
        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            condition[user] = false;
            swapAmounts[user] = 0;
        }
        delete users;
    }
}
