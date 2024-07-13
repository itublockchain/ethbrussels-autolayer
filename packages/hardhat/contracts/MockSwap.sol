// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract MockSwap {
    event Swap(address indexed user, uint256 amount);
    event Mint(address indexed user, uint256 amount);
    event ReverseSwap(address indexed user, uint256 amount);

    mapping(address => uint256) public balances;
    mapping(address => uint256) public tokenBalances;
    address[] public users;

    function deposit() external payable {
        if (balances[msg.sender] == 0 && tokenBalances[msg.sender] == 0) {
            users.push(msg.sender);
        }
        balances[msg.sender] += msg.value;
        tokenBalances[msg.sender] += msg.value; // 1:1 ratio for simplicity
        emit Mint(msg.sender, msg.value);
    }

    function swap(uint256 amount) external {
        require(tokenBalances[msg.sender] >= amount, "Insufficient token balance");
        tokenBalances[msg.sender] -= amount;
        emit Swap(msg.sender, amount);
    }

    function reverseSwap(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient ether balance");
        balances[msg.sender] -= amount;
        tokenBalances[msg.sender] += amount; // Mint back the tokens
        payable(msg.sender).transfer(amount);
        emit ReverseSwap(msg.sender, amount);
    }

    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }

    function getTokenBalance(address user) external view returns (uint256) {
        return tokenBalances[user];
    }

    function resetBalances() external {
        // Only for demonstration purposes; in a real scenario, proper access control is needed.
        for (uint256 i = 0; i < users.length; i++) {
            balances[users[i]] = 0;
            tokenBalances[users[i]] = 0;
        }
        delete users;
    }
}
