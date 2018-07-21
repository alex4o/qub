import {init, getSolidityCall} from "../contract_api"

let {contract, account} = init()
window.contract = contract


let methods = contract.abi.reduce((prev, curr) => ({...prev, [curr.name]: getSolidityCall(curr.name, curr.payable) }), {})

methods.getOrcId = () => methods.addressToOrcid(account)

window.m = methods

export default methods