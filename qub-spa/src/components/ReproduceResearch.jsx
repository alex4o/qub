import React, { Component } from 'react'
import { Modal, Segment, Input, Button } from 'semantic-ui-react'


export default class ReproduceResearch extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            sure: false,
        }
    }

    handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

    Yes() {
        this.props.research.startReproduce()
    }

    No() {
    
    }


    submit() {
        console.log("submit")
        //this.state is the argument
    }

    render(){
        return(
            <Modal trigger={this.props.trigger} className="add-research-modal vote-modal" closeIcon>
                <Segment className="fundModal vote-segment" >
                    <h2 className="vote-title">Confirm your query for reproducing the research?</h2>
                    <p className="vote-title"> You will be obliged by the investors/backers to produce results or prove otherwise </p>         
                    <Button inverted color="green" className="submit" onClick={this.Yes.bind(this)}>Yes</Button>
                    <Button inverted color="red" className="submit" onClick={this.No}>No</Button>                  
                </Segment>
            </Modal>
        )
    }
}