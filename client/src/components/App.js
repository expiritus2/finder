import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Main from "./Main/Main";
import Admin from "./Admin/Admin";
import PersonalArea from "./PersonalArea/PersonalArea";

class App extends Component{

    componentWillMount(){
        this.props.fetchUser();
    }

    render(){
        const auth = this.props.auth;
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact render={() => (
                            auth
                                ? <Redirect to="/personal-area"/>
                                : <Main/>
                        )} />
                        <Route path="/personal-area" exact render={() => (
                            !auth
                                ? <Redirect to="/" />
                                : <PersonalArea/>
                        )} />
                        <Route path="/admin" exact component={Admin} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps, actions)(App);