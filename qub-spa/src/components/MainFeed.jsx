import React, { Component } from 'react'
import { Button, Modal, Segment, Input } from 'semantic-ui-react'

import Research from './items/ResearchItem'
import Vote from './Vote'
import NavBar from './NavBar'
import repo from '../globals/Repo'
import { observer } from 'mobx-react'

@observer
export default class MainFeed extends Component {
    
    handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
    }

    handleOpen() {
        this.setState({ openModal: true })
    }

    submit() {
        repo.postResearch(this.state.paperUrl, this.state.title)
        this.setState({ openModal: false })
        //this.state is the argument
    }

    state = {
        openModal: false,
        title: "",
        paperUrl: "",
    }

    render() {
        return(
            <div>
                <div className="main-container">
                    {repo.researches.map((data, i) => <Research key={i} {...data} research={data}/>)}
                </div>
                <Modal open={this.state.openModal} trigger={<Button size="massive" onClick={this.handleOpen.bind(this)} color="green" className="add-research-button" circular icon="plus"/>} className="add-research-modal vote-modal" closeIcon >
                    <Segment className="fundModal vote-segment" >
                        <h2 className="vote-title">Add a new research</h2>
                        <Input name="title" type="text" onChange={this.handleChange} placeholder="Enter your research title"/>
                        <Input name="paperUrl" type="text" onChange={this.handleChange} placeholder="Enter your paper url"/>                    
                        <Button inverted color="green" className="submit" onClick={this.submit.bind(this)}>Add</Button>
                    </Segment>
                </Modal>
            </div>
        )
    }
}