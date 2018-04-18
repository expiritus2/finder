import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/personaAreaActions';
import Header from "../Main/Header/Header";
import {Map} from "./Map/Map";

class PersonalArea extends Component{


    render(){
        return(
            <div>
                <Header/>
                <h1>Personal Area</h1>
                <Map
                    isMarkerShown
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        objects: state.objects
    }
}

export default connect(mapStateToProps, actions)(PersonalArea);