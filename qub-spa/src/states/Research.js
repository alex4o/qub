import { observable, action, runInAction, computed } from "mobx"
import axios from "axios"
import Chain from "../globals/chain"
import _ from "lodash"

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

    // @observable reproducerAddress
    // @observable researcherAddress
    @observable canVote

    constructor(args) {
        let [researcherAddress, paperURL, title, id, stakedAmount, votesLength, isLocked, reproducerAddress, reproducedURL, state] = args
        this.reproducerAddress = reproducerAddress
        this.researcherAddress = researcherAddress

        this.paperURL = paperURL
        this.title = title
        this.id = id
        this.stakedAmount = stakedAmount.toFixed() / 1000000000000000000
        this.votesLength = votesLength.toFixed() | 0
        this.isLocked = isLocked

        this.reproducedURL = reproducedURL
        this.state = state.toFixed() | 0

        Chain.events.Staked({ id: this.id }, { fromBlock: "latest", toBlock: "latest" } ).watch((err,ev) => {
            let {stakers, fullAmount} = ev.args
            runInAction(() => {
                this.stakedAmount = fullAmount.toFixed() / 1000000000000000000
                this.receiveStakers(stakers)
                this.funding = false
            })

            this.decideVote()
        })

        Chain.events.StartReproduce({ id: this.id }, "pending" ).watch((err,ev) => {
            let {reproducer} = ev.args
            runInAction(() => {
                this.reproducerAddress = reproducer
            })
            this.loadFromOrcID()
            this.state = 1
            this.decideVote()

        })

        Chain.events.SubmitReproduction({ id: this.id }, "pending" ).watch((err,ev) => {
            let {reproducedURL} = ev.args
            runInAction(() => {
                this.reproducedURL = reproducedURL
            })
            this.loadFromOrcID()
            this.decideVote()

        })

        setTimeout(() => {
            runInAction(async () => {
                let stakers = await Chain.methods.getResearchStakers(this.id);
                this.receiveStakers(stakers)
                this.loadFromOrcID()
                this.decideVote()   
            }) 
        }, 0)
    }

    @action
    async receiveStakers(stakers)
    {
        

        let stakersOrc = await Promise.all( stakers.map(async staker => await Chain.methods.addressToOrcid(staker)) )
        this.stakers = await Promise.all( stakersOrc.map(async orcid => await getPersonalFromOrcID(orcid) ) )
        this.stakers = _.zip(stakers, this.stakers.map(staker => staker.name["given-names"].value + " " + staker.name["family-name"].value), stakersOrc)
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
    async decideVote(){
        try {
            console.log(Chain.account)
            let stake = await Chain.methods.getStake(this.id, Chain.account)
            if(stake > 0){
                runInAction(() => {
                    this.canVote = true
                })
            }else{
                runInAction(() => {
                    this.canVote = false
                })
           }
        } catch (error) {
            runInAction(() => {
                console.error("canVote: ", error)
                this.canVote = false
            })
        }
    }

    @computed
    get canSubmit() {
        console.log(this.reproducerAddress, Chain.account)
        return this.reproducerAddress === Chain.account
    }


    @action
    async startReproduce() {
        try{
            await Chain.methods.startReproduce(this.id)

        }catch(error) {

        }
    }

    @action
    async submitReproduction(url) {
        try {
            await Chain.methods.submitReproduction(this.id, url)
            this.reproducedURL = url
            this.state = 2
        } catch (error) {
            
        }
    }

    @action
    async vote(YesNo) {
        try {
            await Chain.methods.vote(this.id, YesNo)
        } catch (error) {
            
        }
    }

    @action
    async loadFromOrcID() {
        runInAction(() => {
            this.loading = true
        })

        let reproducer
        try {
            let reproducerID = await Chain.methods.addressToOrcid(this.reproducerAddress)
            reproducer = await getPersonalFromOrcID(reproducerID)
            runInAction(() => {
                this.reproducerID = reproducerID
                this.reproducer = reproducer.name["given-names"].value + " " + reproducer.name["family-name"].value
            })
        } catch (err) {
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
                this.researcherID = researcherID
                this.researcher = researcher.name["given-names"].value + " " + researcher.name["family-name"].value
            })
        } catch (err) {
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