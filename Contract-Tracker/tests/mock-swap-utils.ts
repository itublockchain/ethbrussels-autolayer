import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Mint, ReverseSwap, Swap } from "../generated/MockSwap/MockSwap"

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

export function createReverseSwapEvent(
  user: Address,
  amount: BigInt
): ReverseSwap {
  let reverseSwapEvent = changetype<ReverseSwap>(newMockEvent())

  reverseSwapEvent.parameters = new Array()

  reverseSwapEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  reverseSwapEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return reverseSwapEvent
}

export function createSwapEvent(user: Address, amount: BigInt): Swap {
  let swapEvent = changetype<Swap>(newMockEvent())

  swapEvent.parameters = new Array()

  swapEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return swapEvent
}
