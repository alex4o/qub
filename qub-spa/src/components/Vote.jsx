import React, { Component } from 'react'
import { Segment, Button, Image, Modal, Popup } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import VoteItem from "./items/VoteItem"
import repo from "../globals/Repo"

@observer
export default class Vote extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            //state here
        }
    }
    
    voteYes() {
        console.log("Yes")
        this.props.research.vote(true)

    }

    voteNo() {
        console.log("No")
        this.props.research.vote(false)

    }

    voteItem(index, object) {
        return(
            <div>
                <VoteItem color={null} index={index} data={object}/>
            </div>
        )
    }

    render(){
        return(
            <Modal className="vote-modal" trigger={this.props.trigger} dimmer="blurring" closeIcon>
                <Segment className="vote-segment">
                    <h1 className="vote-title">Vote</h1>
                    <h3 className="vote-title">Participants</h3>                    
                    <div style={{ margin: "auto", maxWidth: 500, display: "flex", flexWrap: "wrap" }}>
                    { this.props.research.stakers.map((object, index) => {
                        return  <Popup key={index} trigger={this.voteItem(index, object)} content={"aasdasdasdasad"} />
                    })}
                    </div>
                    {
                        this.props.research.canVote ?
                        <div className="vote-buttons">
                            <Button size="massive" disabled={this.props.research.isLocked} icon="check" onClick={this.voteYes.bind(this)} color="green"/>
                            <Button size="massive" disabled={this.props.research.isLocked} icon="close" onClick={this.voteNo.bind(this)} color="red"/>
                        </div> : null
                    }

                </Segment>
            </Modal>
        );
    }
}