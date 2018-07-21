import { observable, action, runInAction } from "mobx"
import Chain from "../globals/chain"

export default class ResearchList {
    @observable researches = [];
    @observable linked = false

    @action 
    async checkLinked() {
        let orcid = await Chain.getOrcId()

        if(orcid.length == 0){
            runInAction(() => {
                this.linked = false
            })
        }else{
            runInAction(() => {
                this.linked = true
            })
        }
    }
 }