import React, {
	Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import MainFeed from './components/MainFeed';
import NavBar from './components/NavBar'

class App extends Component {
	render() {
		return(
			<Router className="App">
				<div>
                	<NavBar/>
					<MainFeed/>
				</div>				
			</Router>
		);
	}
}

export default App;