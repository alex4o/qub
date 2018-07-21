import { observable, action, runInAction } from "mobx"
import axios from "axios"

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
    @observable state
    @observable title = ""

    @observable loading = false

    @action
    async loadFromOrcID() {
        runInAction(() => {
            this.loading = true
        })
        
        const reproducer = await getPersonalFromOrcID(this.reproducerID)
        const researcher = await getPersonalFromOrcID(this.researcherID)
        console.log(reproducer)
        try {
            runInAction(() => {
                this.reproducer = reproducer.name["given-names"].value + " " + reproducer.name["family-name"].value
                this.researcher = researcher.name["given-names"].value + " " + researcher.name["family-name"].value
                this.loading = false
            })
        } catch (err) {
            runInAction(() => {
                console.log("Еррор")
            })
        }
    }
    
}