import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterFormContainer from './users/register_form_container';
import LoginFormContainer from './users/login_form_container';
import AddPhoto from './add_photo';

class App extends Component {
    render() {

        // return (
        //     <div>
        //         < AddPhoto />
        //     </div>
        // )
        return (
            <Router>
                <Switch>
                    <Route exact path='/login' component={LoginFormContainer}/>
                    <Route exact path='/register' component={RegisterFormContainer}/>
                    < Route exact path='/' component={AddPhoto} />
                </Switch>
            </Router>
        )
    }
}

export default App;