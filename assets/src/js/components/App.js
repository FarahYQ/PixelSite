import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterFormContainer from './users/register_form_container';
import LoginFormContainer from './users/login_form_container';
import AddPhoto from './photos/add_photo';
import NavBar from './nav/navbar';
import PhotoGallery from './photos/photo_index';

class App extends Component {
    render() {
        return (
            <div> 
                <header>
                    <NavBar />
                </header>
                <Switch>
                    <Route exact path='/login/' component={LoginFormContainer}/>
                    <Route exact path='/register/' component={RegisterFormContainer}/>
                    <Route exact path='/' component={PhotoGallery} />
                    <Route exact path='/photos/add/' component ={AddPhoto} />
                </Switch>
            </div>
        )
    }
}

const Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
)

export default Root;