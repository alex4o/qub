import React, { Component } from 'react'
import { Modal, Segment } from 'semantic-ui-react'

export default class AddResearch extends Component {
    render(){
        return(
            <Modal trigger={this.props.trigger} className="add-research-modal" closeIcon>
                <Segment>

                </Segment>
            </Modal>
        )
    }
}