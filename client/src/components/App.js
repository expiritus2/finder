import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Main from "./Main/Main";
import Admin from "./Admin/Admin";
import PersonalArea from "./PersonalArea/PersonalArea";

class App extends Component{

    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="/" exact component={Main} />
                        <Route path="/personal-area" exact component={PersonalArea} />
                        <Route path="/admin" exact component={Admin} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App);