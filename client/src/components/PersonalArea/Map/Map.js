import React from 'react';
import {keys} from "../../../config/keys";

import * as _ from "lodash";
import {compose, withProps, lifecycle} from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import './Map.css';


export const Map = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${keys.googleMapApiKey}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),

    lifecycle({
        componentWillMount() {
            const refs = {};

            this.setState({
                bounds: null,
                center: {
                    lat: 41.9, lng: -87.624
                },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },

                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new window.google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });

                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter
                    });
                    refs.map.fitBounds(bounds);
                },
                onDragEnd: (e) => {
                    console.log(e);
                },
                setMarker: (e) => {
                    this.setState((prevState, props) => {
                        return {
                            markers: [
                                ...prevState.markers,
                                {
                                    position: e.latLng,
                                    info: 'Some Text',
                                    isOpen: false
                                }
                            ]
                        }
                    });
                },

                onToggleOpen: (index) => {
                    const newMarkers = [...this.state.markers];
                    newMarkers[index].isOpen = !newMarkers[index].isOpen;
                    this.setState({markers: newMarkers});
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
        onClick={(e) => {
            props.setMarker(e)
        }}
    >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Search..."
                className="search-input"
            />
        </SearchBox>
        {props.markers.map((marker, index) => {
            return <Marker
                draggable
                onClick={() => {props.onToggleOpen(index)}}
                onDragEnd={(e) => {props.onDragEnd(e)}}
                key={index}
                position={marker.position}
            >
                {marker.isOpen && <InfoWindow>
                    <div>
                        {marker.info}
                    </div>
                </InfoWindow>}
            </Marker>
        })}
    </GoogleMap>
);

