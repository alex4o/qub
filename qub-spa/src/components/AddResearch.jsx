import React, { Component } from 'react'
import { Modal, Segment, Input, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import repo from "../globals/Repo"

export default class AddResearch extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            title: "",
            paperUrl: "",
        }
    }

    handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

    submit() {
        console.log("submit")
        repo.postResearch(this.state.paperUrl, this.state.title)

        //this.state is the argument
    }

    render(){
        return(
            <Modal trigger={this.props.trigger} className="add-research-modal vote-modal" closeIcon>
                <Segment className="fundModal vote-segment" >
                    <h2 className="vote-title">Add a new research</h2>
                    <Input name="title" type="text" onChange={this.handleChange} placeholder="Enter your research title"/>
<<<<<<< HEAD
                    <Input name="paperUrl" type="text" onChange={this.handleChange} placeholder="Enter your paper url"/>
                    <Message info>NOTICE: Submitting a research paper requires a fee.</Message>                
                    <Button inverted color="green" className="submit" onClick={this.submit}>Add</Button>
=======
                    <Input name="paperUrl" type="text" onChange={this.handleChange} placeholder="Enter your paper url"/>                    
                    <Button inverted color="green" className="submit" onClick={this.submit.bind(this)}>Add</Button>
>>>>>>> 94a690de804da0e40b6f01a20fc03aac32afbd3a
                </Segment>
            </Modal>
        )
    }
}