import React, { Component } from 'react'
import { Segment, Button, Image, Modal } from 'semantic-ui-react'
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
    }

    voteNo() {
        console.log("No")
    }

    render(){
        return(
            <Modal className="vote-modal" trigger={this.props.trigger} dimmer="blurring" closeIcon>
                <Segment className="vote-segment">
                    <h1 className="vote-title">Vote</h1>
                    <h3 className="vote-title">Participants</h3>                    
                    <div style={{ margin: "auto", maxWidth: 500, display: "flex", flexWrap: "wrap" }}>
                    { Array.from(Array(this.props.data.stakers).keys()).map(index => {
                        return <VoteItem color={null} key={index} index={index} />
                    })}
                    </div>
                    {
                        this.props.research.canVote ?
                        <div className="vote-buttons">
                            <Button size="massive" icon="check" onClick={this.voteYes} color="green"/>
                            <Button size="massive" icon="close" onClick={this.voteNo} color="red"/>
                        </div> : null
                    }

                </Segment>
            </Modal>
        );
    }
}