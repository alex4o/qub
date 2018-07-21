import { observable } from "mobx"

export default class ResearchList {
    @observable votedFor;
    @observable votedAgainst;
    @observable target;
    @observable result;
    @observable voters; 
}