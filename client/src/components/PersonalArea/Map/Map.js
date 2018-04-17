import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';


import './Map.css';

// export const Map = withScriptjs(withGoogleMap((props) =>
//     <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{lat: -34.397, lng: 150.644}}
//     >
//         <Marker position={{lat: -34.397, lng: 150.644}}/>
//     </GoogleMap>
// ));

class Map extends Component{
    render(){
        return(
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{lat: -34.397, lng: 150.644}}
            >
                <Marker position={{lat: -34.397, lng: 150.644}}/>
            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(Map));

