import React from 'react';
import {keys} from "../../../config/keys";

import * as _ from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

import './Map.css';

export const Map = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${keys.googleMapApiKey}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
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
                onBoundsChanged: () => {
                    // this.setState({
                    //     bounds: refs.map.getBounds(),
                    //     center: refs.map.getCenter(),
                    // })
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
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    refs.map.fitBounds(bounds);
                },
                onDragEnd: (pos) => {
                    console.log(pos);
                },
                setMarker: () => {

                }
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
        onClick={(e) => {props.setMarker({position: {lat: e.ra.x, lng: e.ra.y}})}}
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
        {console.log("this", props.markers)}
        {props.markers.map((marker, index) => {
                return <Marker
                    draggable
                    key={index} position={marker.position}
                />
            }
        )}
    </GoogleMap>
);

