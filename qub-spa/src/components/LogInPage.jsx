import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import repo from "../globals/Repo"

export default class LogIn extends Component {

	constructor(props){
		super(props)
		this.state = {
            orcId: "",
			loggingIn: false,
			error: false,
		}

	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	handleSubmit = () => {
		const { orcId } = this.state
		this.setState({ loggingIn: true })
		this.setState({ orcId: orcId })

		repo.register(orcId)

        //link(orc-id)
        //set the linked variable to true
    }

	render() {
		return (
			<div className='login-form'>
				<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 450 }}>

						<Header as='h2' color='blue' textAlign='center'>
							<Image src='/logo.png'/>
							Log In
						</Header>

						<Form size='large' onSubmit={this.handleSubmit}>
							<Segment stacked>
								<Form.Input
									fluid
									icon='user'
									name="orcId"
									value={this.state.username}
									onChange={this.handleChange}
									iconPosition='left'
									placeholder="Type in your ORC-ID"
								/>	

								<Button 
									loading={this.state.loggingIn}
									type='submit' 
									color='blue' 
									fluid 
									size='large'>Submit</Button>
							</Segment>
						</Form>

                        <Message>
                            Don't have an orc-id? <a target="_blank" href="https://orgid.org"> Click here. </a>
                        </Message> 
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}