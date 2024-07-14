// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract Automation is AutomationCompatibleInterface {
    bool public condition;


    uint256 public swapAmount = 0.1 ether;  // buraya BAKSDLAKJSDLJKHASDHKLJASFKLHDLKAHSFLKASDGŞLHDSQGHKLHKLASDGKLHŞADSGLHKŞASDLHJGLHJŞKAS
    address public user;
    address public swapContractAddress;
    address public owner;

    event TokensSwapped(address user, uint256 amount);

    constructor(address _swapContractAddress) {
        swapContractAddress = _swapContractAddress;
        owner = msg.sender;
    }

    function setUser(address _user, uint256 _swapAmount) external {
        user = _user;
        swapAmount = _swapAmount;
    }

    function setCondition(bool value) external {
        condition = value;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    ) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = condition;
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        if (condition && swapAmount > 0) {
            swapTokens(owner, swapAmount);
            condition = false; // Reset condition after performing upkeep
        }
    }

    function swapTokens(address _user, uint256 amount) internal {
        (bool success, ) = swapContractAddress.call(
            abi.encodeWithSignature("sellToken(address,uint256)", _user, amount)
        );
        require(success, "Swap failed");
        emit TokensSwapped(_user, amount);
    }

    function reset() external {
        // Only for demonstration purposes; in a real scenario, proper access control is needed.
        condition = false;
        swapAmount = 0;
        user = address(0);
    }
}
