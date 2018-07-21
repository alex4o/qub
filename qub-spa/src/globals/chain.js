import {init, getSolidityCall} from "../contract_api"

let {contract, account} = init()
window.contract = contract


let methods = contract.abi.filter(element => element.type === "function").reduce((prev, curr) => ({...prev, [curr.name]: getSolidityCall(curr.name, curr.payable) }), {})
let events = contract.abi.filter(element => element.type === "event").reduce((prev, curr) => ({...prev, [curr.name]:  contract[curr.name] }), {})

methods.getOrcId = () => methods.addressToOrcid(account)

console.log(methods)
window.m = methods

export default {methods, events}