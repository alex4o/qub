import React, { Component } from 'react' 
import { Menu, Dropdown, Container, Image, MenuHeader } from 'semantic-ui-react'
import repo from '../globals/Repo'

export default class NavBar extends Component { 

    render(){ 
        return(
            <Menu className="navbar" inverted>
                <Container>
                    <Menu.Item as='a' header>
                        <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> QuB
                    </Menu.Item>
                    <MenuHeader className="logged-user">
                        Your ORC-ID is {repo.myOrcID}
                    </MenuHeader>
                </Container>
            </Menu>
        )
    } 
}