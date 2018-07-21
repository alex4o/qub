import React, { Component } from 'react'
import Research from './items/ResearchItem'
import NavBar from './NavBar'

export default class MainFeed extends Component {
    render() {
        return(
            <div class="main-container">
                <Research/>
            </div>
        )
    }
}