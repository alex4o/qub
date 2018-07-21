import { observable, action, runInAction } from "mobx"
import axios from "axios"
import Chain from "../globals/chain"


async function getPersonalFromOrcID(id){
    let {data} = await axios.get(`https://pub.orcid.org/v2.1/${id}/personal-details`, { headers: { "Accept": "application/json" } })
    return data
}

export default class Research {
    @observable researcherID
    @observable researcher
    @observable paperURL
    @observable id
    @observable stakedAmount
    @observable stakers = []
    @observable votes = []
    @observable isLocked
    @observable reproducerID
    @observable reproducer
    @observable reproducedURL
    @observable state = 0
    @observable title = ""

    @observable loading = false
    @observable funding = false

    constructor(args) {
        let [researcherAddress, paperURL, title, id, stakedAmount, votesLength, isLocked, reproducerAddress, reproducedURL, state] = args
        this.reproducerAddress = reproducerAddress
        this.researcherAddress = researcherAddress

        this.paperURL = paperURL
        this.title = title
        this.id = id
        this.stakedAmount = stakedAmount.toFixed() / 1000000000000000000
        this.votesLength = +votesLength.toFixed()
        this.isLocked = isLocked

        this.reproducedURL = reproducedURL
        this.state = state.toFixed() | 0

        Chain.events.Staked({ id: this.id }, { fromBlock: "latest", toBlock: "latest" } ).watch((err,ev) => {
            // let stake = await Chain.methods.getStake(this.id)
            runInAction(() => {
                this.stakedAmount =  ev.args.fullAmount.toFixed() / 1000000000000000000
                this.funding = false
            })

            console.log("staked", ev.args.fullAmount.toFixed() / 1000000000000000000, err, ev)
        })

        setTimeout(() => {
            runInAction(async () => {
                let stakers = await Chain.methods.getResearchStakers(this.id);
                this.receiveStakers(stakers)
                            
            })            
        }, 0)
    }

    @action
    async receiveStakers(stakers)
    {
        this.stakers = stakers 
    }

    @action
    async stake(price) { // TODO: make it possible to stake more then 1 ether
        try{
            runInAction(() => {
                this.funding = true
            })

            await Chain.methods.stakeResearch(this.id, price)
        }catch(error){

        }
    }


    @action
    async startReproduce() {

    }

    @action
    async submitReproduction(url) {

    }

    @action
    async loadFromOrcID() {
        runInAction(() => {
            this.loading = true
        })

        let reproducer
        try {
            let reproducerID = await Chain.methods.addressToOrcid(this.reproducerAddress)
            console.log("Id:  ", reproducerID)
            reproducer = await getPersonalFromOrcID(reproducerID)
            runInAction(() => {
                this.reproducer = reproducer.name["given-names"].value + " " + reproducer.name["family-name"].value
            })
        } catch (err) {
            console.log("Еррор")
            runInAction(() => {
                this.reproducer = ""
                // this.loading = false
                
            })
        }
        let researcher
        try{
            let researcherID = await Chain.methods.addressToOrcid(this.researcherAddress)
            researcher = await getPersonalFromOrcID(researcherID)
            runInAction(() => {
                this.researcher = researcher.name["given-names"].value + " " + researcher.name["family-name"].value
            })
        } catch (err) {
            console.log("Еррор")
            runInAction(() => {
                this.researcher = ""
                // this.loading = false
            })
        }

        runInAction(() => {
            this.loading = false
        })
        
    }
    
}