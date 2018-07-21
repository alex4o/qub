import {init, getSolidityCall} from "../contract_api"

let {contract, account} = init()

let methods = contract.abi.filter(element => element.type === "function").reduce((prev, curr) => ({...prev, [curr.name]: getSolidityCall(curr.name, curr.payable, curr.inputs.length) }), {})
let events = contract.abi.filter(element => element.type === "event").reduce((prev, curr) => ({...prev, [curr.name]:  contract[curr.name] }), {})

// methods.getOrcId = () => methods.addressToOrcid(account)

console.log(methods)
window.m = methods
window.e = events

export default {methods, events}