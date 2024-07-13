"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const orders = [
    {
      condition: "ETH",
      action: "Sell",
      actionTrigger: "NFTs",
    },
    {
      condition: "ETH",
      action: "Sell",
      actionTrigger: "NFTs",
    },
  ];
  return (
    <>
      <div className="flex justify-center items-center w-2/3 h-screen flex-col m-auto gap-12">
        {orders.map((order, index) => (
          <div className="text-black bg-white shadow-xl justify-around w-full h-32 gap-16 rounded-full flex flex-row items-center">
            <div>{order.condition}</div>{" "}
            <div>
              {order.action} {order.actionTrigger}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
