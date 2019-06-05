import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, UnauthRoute } from './authCheck';
import RegisterFormContainer from './users/register_form_container';
import LoginFormContainer from './users/login_form_container';
import AddPhoto from './photos/add_photo';
import NavBar from './nav/navbar';
import PhotoGallery from './photos/photo_index';
import Footer from './footer/footer';
import PhotoPage from './photos/photo';

class App extends Component {
    render() {
        return (
            <div> 
                <header>
                    <NavBar />
                </header>
                <Switch>
                    <UnauthRoute exact path='/login/' component={LoginFormContainer}/>
                    <UnauthRoute exact path='/register/' component={RegisterFormContainer}/>
                    <AuthRoute exact path='/' component={PhotoGallery} />
                    <AuthRoute exact path='/photos/add/' component ={AddPhoto} />
                    <AuthRoute exact path='/photos/:photoId' component={PhotoPage} />
                </Switch>
            </div>
        );
    };
};

const Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
)

export default Root;