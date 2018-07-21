import { observable } from "mobx"

export default class Research {
    @observable researcher
    @observable paperURL
    @observable checksum
    @observable stakedAmount
    @observable stakers = []
    @observable votes = []
    @observable isLocked
    @observable reproducer
    @observable reproducedURL
    @observable state

    
}