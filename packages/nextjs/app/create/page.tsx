"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import type { NextPage } from "next";
import { useAccount, useSignMessage, useConnectors } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const CreateOrder: NextPage = () => {
  const connector = useConnectors();
  const { address: connectedAddress } = useAccount();
  const signMessage = useSignMessage();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [condition, setCondition] = useState("");
  const [conditionAmount, setConditionAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("multi-address-contract-execution");

  const handleSubmit = async () => {
    const order = {
      conditionAmount,
      selectedOption,
      address1,
      address2,
      contractAddress,
      amount: parseFloat(amount),
      do: "transfer",
    };

    try {
      const response = await axios.post("http://localhost:5000/api/orders", order);
      console.log("Order created:", response.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="w-full h-[calc(100vh-60px)] justify-center items-center flex">
        <div className="w-1/3 text-left flex flex-col justify-start items-center">
          <select
            className="bg-white text-black p-4 w-[500px] h-12 shadow-lg rounded-full"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option
              value="multi-address-contract-execution"
              className="bg-white text-black p-4 w-[500px] h-12 shadow-lg"
            >
              Multi-Address Contract Engagement
            </option>
            <option
              value="multi-address-contract-interaction"
              className="bg-white text-black p-4 w-[500px] h-12 shadow-lg"
            >
              Peg Loss Protection
            </option>
          </select>
          <p>
            {selectedOption === "multi-address-contract-interaction"
              ? `This order type initiates a specific on-chain action. When two or more predefined blockchain addresses
            interact with a common specified contract. When these addresses engage with the specified contract, the
            user’s wallet, utilizing our application, can execute a particular action. Examples of such actions include
            interacting with the same contract or transferring assets to another wallet.`
              : `This order type safeguards the user by automatically converting their holdings of a stablecoin to another secure 
stablecoin when the original stablecoin loses its peg (specified ratio). This ensures that if the peg of a stablecoin is disrupted, the user's assets are promptly switched to a more stable and secure option.`}
          </p>
        </div>
        {selectedOption === "multi-address-contract-execution" ? (
          <div className="max-w-md bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create New Order</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Addresses:</label>
              <input
                type="text"
                className="w-full px-4 py-2 mb-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
                placeholder="Address 1"
                value={address1}
                onChange={e => setAddress1(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-2 mb-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
                placeholder="Address 2"
                value={address2}
                onChange={e => setAddress2(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contract Address:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
                placeholder="Contract Address"
                value={contractAddress}
                onChange={e => setContractAddress(e.target.value)}
              />
            </div>
              <label className="block text-gray-700 mb-2">Condition:</label>
            <div className="mb-4 flex">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
                placeholder="Amount"
                value={conditionAmount}
                onChange={e => setConditionAmount(e.target.value)}
              />
              <select onChange={(e) => setCondition(e.currentTarget.value)} className="w-1/2 px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 bg-white text-black">
                <option value={"sell"}>Sell</option>
                <option value={"buy"}>Buy</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Action:</label>
              <div className="flex items-center">
                <select className="px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 text-gray-400 bg-white">
                  <option value="transfer">Transfer</option>
                  {/* Add more options as needed */}
                </select>
                <input
                  type="number"
                  className="ml-2 px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
                  placeholder="186.5"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <span className="ml-2">USDC</span>
              </div>
            </div>
            <button
              className="w-full bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
              onClick={async () => await handleSubmit()}
            >
              Approve
            </button>
          </div>
        ) : (
          // Stable coin peg loss protection

          <div className="max-w-md bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Auto Peg Protection Mode:</h2>
            <div className="mb-4">
              <button></button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Do:</label>
              <div className="flex items-center">
                <select className="px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 text-gray-400 bg-white">
                  <option value="swap">Swap</option>
                  {/* Add more options as needed */}
                </select>
                <input
                  type="number"
                  className="ml-2 px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
                  placeholder="186.5"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <span className="ml-2">USDC</span>
              </div>
            </div>
            <button
              className="w-full bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
              onClick={async () => await handleSubmit()}
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateOrder;
