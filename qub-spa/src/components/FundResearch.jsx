import React, { Component } from 'react'
import { Modal, Segment, Button, Input } from 'semantic-ui-react'

export default class Fund extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: 0,
            name: "",
        }
    }

    handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

    submit() {
        console.log(this.state, "Submitted")
    }

    render() {
        return(
            <Modal trigger={this.props.trigger} className="vote-modal" closeIcon>
                <Segment className="fundModal">
                    <h2>Interested in the reproducability of this project?</h2>
                    <Input name="name" type="text" onChange={this.handleChange} placeholder="What is your name?"/>
                    <Input name="amount" type="number" onChange={this.handleChange} placeholder="How much money do you want to stake?"/>
                    <Button className="submit" onClick={this.submit.bind(this)}>Submit</Button>
                </Segment>
            </Modal>
        )
    }
}