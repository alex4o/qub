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

import { observer } from 'mobx-react';
import repo from './globals/Repo'

import LogIn from './components/LogInPage'


@observer
class App extends Component {

	constructor(props){
		super(props)
	}

	routes = {
		Login: () => ( repo.linked ? <MainFeed/> : <LogIn/> ),
		Home: () => ( repo.linked ? <MainFeed/> : <LogIn/> ),
		Error404: () => <Redirect to="/"/>
	}

	render() {
		return(
			<Router className="App">
				<div>
                	{ repo.linked ? <NavBar/> : null }
					<Switch>
                        <Route exact path="/login" component={this.routes.Login} />
                        <Route exact path="/" component={this.routes.Home} />                                                          
                        <Route path='*' type={404} exact={true} component={this.routes.Error404} />          
                    </Switch>
				</div>				
			</Router>
		);
	}
}

export default App;