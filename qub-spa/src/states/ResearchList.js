import { observable, action, runInAction } from "mobx"
import Chain from "../globals/chain"
import axios from "axios"
import Research from "./Research"

export default class ResearchList {
    @observable researches = [];
    @observable linked = false
    @observable error = false
    @observable myOrcID = ""


    constructor() {
        console.log(Chain)
        Chain.events.ResearchPublished({}, {fromBlock: 0}).watch(async (error, result) => {
            let {id, researcher} = result.args
            
            Chain.methods.researches(id).then(researchArray => {
                console.log(researchArray)
                let researchObject = new Research(researchArray) 
                
                this.researchCreated(researchObject)   
            })
            

        })
    }
    
    @action
    async researchCreated(research){
        research.loadFromOrcID()

        this.researches.push(research)
    }

    @action 
    async checkLinked() {
        try {
            let orcid = await Chain.methods.getMyOrcid()

            if(orcid.length == 0){
                runInAction(() => {
                    this.linked = false
                })
            }else{
                runInAction(() => {
                    this.linked = true
                    this.myOrcID = orcid
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
        try{
            await Chain.methods.publishResearch(url, title)
            
        }catch(error){

        }
    }
    
// 0000-0001-9087-4008
    @action
    async register(id) {
        try{
            await axios.get(`https://pub.orcid.org/v2.1/${id}/personal-details`, { headers: { "Accept": "application/json" } })
            
            let orcid = await Chain.methods.register(id)
            
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