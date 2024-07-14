"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [orders, setOrders] = useState([]);
  const { writeContractAsync: mockSwapCall } = useScaffoldWriteContract("Automation");
  const { writeContractAsync: mockSwapCall2 } = useScaffoldWriteContract("MockSwap");
  const { writeContractAsync: mockSwapCall3 } = useScaffoldWriteContract("MockSwap");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex justify-start items-center w-full flex-col gap-6 p-4 bg-gray-200">
      <div className="flex gap-4">
      <button
        className="w-32 h-16 bg-blue-500 rounded-2xl text-white shadow-xl hover:bg-blue-600"
        onClick={async () => await mockSwapCall2({ functionName: "sellToken", args: ["0x0177f3a60495B1c55fa0440929C458f5064886c7", BigInt(0.5 * 10 ** 18)] })}
      >Perform Simulation</button>
      <button
        className="w-32 h-16 bg-blue-500 rounded-2xl text-white shadow-xl hover:bg-blue-600"
        onClick={async () => await mockSwapCall3({ functionName: "sellToken", args: ["0x2Af3E6F7AdB774eEC4EAd62B29FEBAF2929504e2", BigInt(0.5 * 10 ** 18)] })}
      >Perform Simulation</button>
      </div>
      
      <div className="w-full max-w-6xl p-4 rounded flex gap-2">
        <div className="flex gap-4">
          <button className="text-gray-600">All</button>
          <button className="text-gray-600">In process</button>
          <button className="text-gray-600">Done</button>
          <button className="text-gray-600">Canceled</button>
        </div>
      </div>
      <div className="w-full max-w-6xl flex flex-col gap-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-3xl flex flex-col gap-4 justify-center pr-16">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full ${order.address1 === "done" ? "bg-green-200" : order.status === "canceled" ? "bg-red-200" : "bg-blue-200"}`}
                ></div>
                <div className="text-lg font-semibold">
                  {order.selectedOption === "multi-address-contract-execution"
                    ? "Multi-Address Contract Execution"
                    : "Peg Loss Protection"}
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div>
                <div className="flex flex-col gap-2">
                  <div className="text-gray-500">Addresses:</div>
                  <div className="bg-white p-2 rounded-full w-96 border-blue-400 border-2 text-black">
                    {order.address1}
                  </div>
                  <div className="bg-white p-2 rounded-full w-96 border-blue-400 border-2 text-black">
                    {order.address2}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-gray-500">Contract Address:</div>
                  <div className="bg-white p-2 rounded-full w-96 border-blue-400 border-2 text-black">
                    {order.contractAddress}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="text-gray-500">=</div>
                <div className="flex items-center gap-2">
                  <div className="text-gray-500">Transfer:</div>
                  <div className="text-blue-600 font-semibold">{order.amount} USDC</div>
                </div>
              </div>
            </div>
            <button
        className="w-32 h-16 bg-blue-500 rounded-2xl text-white shadow-xl hover:bg-blue-600"
        onClick={async () => await mockSwapCall({ functionName: "setCondition", args: [true] })}
      >Perform Simulation</button>
          </div>
          
        ))}
        
      </div>
    </div>
  );
};

export default Home;
