import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import Research from './items/ResearchItem'
import AddResearch from './AddResearch'
import Vote from './Vote'
import NavBar from './NavBar'
import repo from '../globals/Repo'
import { observer } from 'mobx-react'

@observer
export default class MainFeed extends Component {
    render() {
        return(
            <div>
                <div className="main-container">
                    {repo.researches.map((data, i) => <Research key={i} {...data}/>)}
                </div>
				<AddResearch trigger={<Button size="massive" color="green" className="add-research-button" circular icon="plus"/>}/>                
            </div>
        )
    }
}