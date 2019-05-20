import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
                    < Route exact path='/' component={AddPhoto} />
                </Switch>
            </Router>
        )
    }
}

export default App;