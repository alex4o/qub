import React, { Component } from 'react'
import { Segment, Button, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react'

import Chain from "../../globals/chain"

export default class VoteItem extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            //state here
            color: null
        }

        console.log(props)
        Chain.events.Voted({ voter: props.data[0] }, { toBlock: "pending", fromBlock: 0 }).watch((error, ev) => {


            if(!error){
                let {voter, voteFor} = ev.args
                console.log("Vote", error, ev, voteFor, voter)

                this.setState({color: voteFor ? "green" : "red" })
            }
        })
    }

    render(){
        return(
            <Button color={this.state.color} style={{  marginBottom: 5, width: 40, padding: 10 }}>{this.props.index + 1}</Button>
            // <span className="vote-item" style={{ margin: 10, backgroundColor: this.props.color, display: "inline-block",}}></span>
        );
    }
}