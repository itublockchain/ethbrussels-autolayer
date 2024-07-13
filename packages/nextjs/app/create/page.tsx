"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useState } from "react";
import axios from "axios";

const CreateOrder: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    const order = {
      address1,
      address2,
      contractAddress,
      amount: parseFloat(amount),
      do: 'transfer',
    };

    try {
      const response = await axios.post('http://localhost:5000/api/orders', order);
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <>
      <div className="w-full h-screen justify-center items-center">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create New Order</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Addresses:</label>
            <input
              type="text"
              className="w-full px-4 py-2 mb-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
              placeholder="Address 1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
            <input
              type="text"
              className="w-full px-4 py-2 mb-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
              placeholder="Address 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contract Address:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
              placeholder="Contract Address"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Do:</label>
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
                onChange={(e) => setAmount(e.target.value)}
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
      </div>
    </>
  );
};

export default CreateOrder;
