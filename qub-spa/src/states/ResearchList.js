import { observable } from "mobx"

export default class ResearchList {
    @observable researches = [];
    @observable addressToOrcid;
}