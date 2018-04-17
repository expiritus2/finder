import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/personaAreaActions';
import Header from "../Main/Header/Header";


class PersonalArea extends Component{


    componentDidMount(){
        this.props.fetchObjects();
    }

    renderObjects(){
        console.log("this", this.props);
        if(this.props.objects){
            return this.props.objects.object;
        }
        return null;
    }

    render(){
        return(
            <div>
                <Header/>
                <h1>Personal Area</h1>
                {this.renderObjects()}
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