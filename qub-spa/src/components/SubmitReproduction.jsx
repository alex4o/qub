import React, { Component } from 'react'
import { Modal, Segment, Input, Button } from 'semantic-ui-react'


export default class SubmitReproduction extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            reproduceURL: "",
        }
    }

    handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

    submit() {
        this.props.research.submitReproduction(this.state.reproduceURL)
    }

    render(){
        console.log(this.state)
        return(
            <Modal trigger={this.props.trigger} className="add-research-modal vote-modal" closeIcon>
                <Segment className="fundModal vote-segment" >
                    <h2 className="vote-title"> Submit </h2>
                    <p className="vote-title"> Submit your contribution regarding the reproduction of this research </p>
                    <Input name="reproduceURL" type="text" onChange={this.handleChange} placeholder="Enter your paper url"/>                         
                    <Button inverted color="blue" className="submit" onClick={this.submit.bind(this)}>Submit</Button>
                </Segment>
            </Modal>
        )
    }
}