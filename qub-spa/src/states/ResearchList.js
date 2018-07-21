import { observable } from "mobx"

export default class ResearchList {
    @observable keys = []
    @observable researches;
    @observable addressToOrcid;
}