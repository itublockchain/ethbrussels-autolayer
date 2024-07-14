// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract MockSwap {
	event SellToken(address indexed user, uint256 amount);
	event Mint(address indexed user, uint256 amount);
	event BuyToken(address indexed user, uint256 amount);

	mapping(address => uint256) public ethBalances;
	mapping(address => uint256) public tokenBalances;
	address[] public users;

	function setEthBalance(address user, uint256 amount) external {
		ethBalances[user] = amount;
	}

	function setTokenBalance(address user, uint256 amount) external {
		tokenBalances[user] = amount;
	}

	function sellToken(address user, uint256 amount) external {
        require(tokenBalances[user] >= amount, "Insufficient token balance");
		tokenBalances[user] -= amount;
		ethBalances[user] += amount;

		emit SellToken(user, amount);
	}

	function buyToken(address user, uint256 amount) external {
		ethBalances[user] -= amount;
		tokenBalances[user] += amount; // Mint back the tokens
		emit BuyToken(user, amount);
	}

	function getBalance(address user) external view returns (uint256) {
		return ethBalances[user];
	}

	function getTokenBalance(address user) external view returns (uint256) {
		return tokenBalances[user];
	}

	// function resetBalances() external {
	// 	// Only for demonstration purposes; in a real scenario, proper access control is needed.
	// 	for (uint256 i = 0; i < users.length; i++) {
	// 		ethBalances[users[i]] = 0;
	// 		tokenBalances[users[i]] = 0;
	// 	}
	// 	delete users;
	// }
}
