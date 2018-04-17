import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/personaAreaActions';
import Header from "../Main/Header/Header";
import Map from "./Map/Map";
import {keys} from '../../config/keys';


class PersonalArea extends Component{


    // componentDidMount(){
    //     this.props.fetchObjects();
    // }
    //
    // renderObjects(){
    //     if(this.props.objects){
    //         return this.props.objects.object;
    //     }
    //     return null;
    // }

    render(){
        const url = `https://maps.googleapis.com/maps/api/js?key=${keys.googleMapApiKey}&v=3.exp&libraries=geometry,drawing,places`;
        return(
            <div>
                <Header/>
                <h1>Personal Area</h1>
                <Map
                    googleMapURL={url}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                {/*{this.renderObjects()}*/}
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