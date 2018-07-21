import React, { Component } from 'react'
import Research from './items/ResearchItem'
import Vote from './Vote'
import NavBar from './NavBar'
import repo from '../globals/Repo'

export default class MainFeed extends Component {
    render() {
        return(
            <div className="main-container">
                {/* {repo.researches.map((data, i) => <Research key={i} data={data}/>)} */}
                <Research/>
                <Vote/>
            </div>
        )
    }
}