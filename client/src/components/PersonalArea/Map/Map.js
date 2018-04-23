import React from 'react';
import {keys} from "../../../config/keys";

import * as _ from "lodash";
import {compose, withProps, lifecycle} from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import {getId} from "../../../utils/utils";

import './Map.css';
import InfoPopup from "./InfoPopup/InfoPopup";


export const Map = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${keys.googleMapApiKey}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `600px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),

    lifecycle({
        componentWillMount() {
            const refs = {};

            this.setState({
                bounds: null,
                center: {
                    lat: 53.90446156201682, lng: 27.5601142277975
                },

                markers: [],
                popupIsOpen: false,

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
                    console.log("onDragEnd", e.latLng);
                },

                setMarker: (e) => {
                    this.setState((prevState) => {
                        return {
                            markers: [
                                ...prevState.markers,
                                {
                                    position: e.latLng,
                                    info: {
                                        title: 'Title',
                                        subscription: 'Some Subscription',
                                        imageUrls: [],
                                        registeredDate: ''
                                    },
                                    infoIsOpen: true
                                }
                            ],
                            popupIsOpen: true
                        }
                    });
                },

                onToggleOpen: (index) => {
                    console.log(this.state.markers);
                    let markers = [...this.state.markers];
                    markers[index].infoIsOpen = !markers[index].infoIsOpen;
                    this.setState({markers});
                },

                deleteMarker: (index) => {
                    let markers = [...this.state.markers];
                    markers.splice(index, 1);
                    this.setState({markers});
                },

                saveMarker: (index) => {
                    console.log("this", this.state.markers[index]);
                }
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)(props => {
        const {
            center, bounds, markers, onMapMounted, popupIsOpen,
            onBoundsChanged, setMarker, onSearchBoxMounted,
            onPlacesChanged, onToggleOpen, onDragEnd, deleteMarker,
            saveMarker
        } = props;
        return <GoogleMap
            ref={onMapMounted}
            defaultZoom={12}
            center={center}
            onBoundsChanged={onBoundsChanged}
            onClick={(e) => {
                setMarker(e)
            }}
        >
            <SearchBox
                ref={onSearchBoxMounted}
                bounds={bounds}
                controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                />
            </SearchBox>
            {markers.map((marker, index) => {
                const {info: {title, imageUrls, subscription}, position, infoIsOpen} = marker;
                const images = imageUrls.map((img) => <img key={getId()} src={img} alt=""/>);
                return <Marker
                    draggable
                    onClick={() => {
                        onToggleOpen(index)
                    }}
                    onDragEnd={(e) => {
                        onDragEnd(e)
                    }}
                    key={index * new Date() * Math.random() * Math.random()}
                    position={position}
                >
                    {infoIsOpen && <InfoWindow>
                        <div className="info-window">
                            <div>{title}</div>
                            <div className="images-wrapper">{images}</div>
                            {/*<div><input onChange={e => props.onChangeFile(e.target.files, index)} type="file" multiple /></div>*/}
                            <div>{subscription}</div>
                            <div>
                                <button onClick={() => deleteMarker(index)}>Delete</button>
                                <button onClick={() => saveMarker(index)}>Save</button>
                            </div>
                        </div>
                    </InfoWindow>}
                </Marker>
            })}
            {popupIsOpen && <InfoPopup emitToMap={(data) => {console.log(data)}} show={popupIsOpen}/>}
        </GoogleMap>
    }
);

