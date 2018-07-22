import { observable, action, runInAction } from "mobx";
import chain from "../globals/chain";

export default class Events {
    @observable list = []

    @action
    async subscribe() {
        chain.events.allEvents({}, {fromBlock: "pending", toBlock: "pending"}).watch((error, event) => {
            if(!error){
                runInAction(() => {
                    this.list.push([ event.event, event.args ])
                });
            }
        })
    }
} 
