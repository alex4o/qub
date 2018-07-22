import { observable } from "mobx"

export default class Vote {
    @observable votedFor;
    @observable votedAgainst;
    @observable target;
    @observable result;
    @observable voters; 
}