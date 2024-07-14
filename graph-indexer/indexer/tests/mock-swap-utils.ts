import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { BuyToken, Mint, SellToken } from "../generated/MockSwap/MockSwap"

export function createBuyTokenEvent(user: Address, amount: BigInt): BuyToken {
  let buyTokenEvent = changetype<BuyToken>(newMockEvent())

  buyTokenEvent.parameters = new Array()

  buyTokenEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  buyTokenEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return buyTokenEvent
}

export function createMintEvent(user: Address, amount: BigInt): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return mintEvent
}

export function createSellTokenEvent(user: Address, amount: BigInt): SellToken {
  let sellTokenEvent = changetype<SellToken>(newMockEvent())

  sellTokenEvent.parameters = new Array()

  sellTokenEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  sellTokenEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return sellTokenEvent
}
