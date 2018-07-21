import { observable, action, runInAction } from "mobx"
import Chain from "../globals/chain"
import axios from "axios"

export default class ResearchList {
    @observable researches = [];
    @observable linked = false
    @observable error = false
    @action 
    async checkLinked() {
        try {
            let orcid = await Chain.getMyOrcid()

            if(orcid.length == 0){
                runInAction(() => {
                    this.linked = false
                })
            }else{
                runInAction(() => {
                    this.linked = true
                })
            }
        }catch (err) {
            runInAction(() => {
                this.linked = false
            })
        }
    }

    @action
    async postResearch(url, title) {
        
    }
    
// 0000-0001-9087-4008
    @action
    async register(id) {
        try{
            await axios.get(`https://pub.orcid.org/v2.1/${id}/personal-details`, { headers: { "Accept": "application/json" } })
            
            await Chain.register(id)
            
            runInAction(() => {
                this.linked = true 
                this.error = false
            })
        }catch(error) {
            runInAction(() => {
                console.log("???")
                this.linked = false
                this.error = true
            })
        }
    }


 }