import React, {
	Component
} from 'react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

import { Button } from 'semantic-ui-react'

import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";

import MainFeed from './components/MainFeed';
import NavBar from './components/NavBar'

import AddResearch from './components/AddResearch'


class App extends Component {
	render() {
		return(
			<Router className="App">
				<div>
                	<NavBar/>
					<MainFeed/>
					<AddResearch trigger={<Button size="massive" color="green" className="add-research-button" circular icon="plus"/>}/>
				</div>				
			</Router>
		);
	}
}

export default App;