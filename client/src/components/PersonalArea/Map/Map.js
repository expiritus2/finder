import React from 'react';
import {keys} from "../../../config/keys";

import * as _ from "lodash";
import {compose, withProps, lifecycle} from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import {getId} from "../../../utils/utils";

import './Map.css';


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
                            ]
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

                onChangeTitle: (title, index) => {
                    let markers = [...this.state.markers];
                    markers[index].info.title = title;
                    this.setState({markers});
                },

                onChangeSubscription: (subscription, index) => {
                    let markers = [...this.state.markers];
                    markers[index].info.subscription = subscription;
                    this.setState({markers});
                },

                onChangeFile: (files, index) => {
                    for(let i = 0; i < files.length; i++) {
                        const reader = new FileReader();

                        reader.onload = () => {
                            let markers = [...this.state.markers];
                            const dataUrl = reader.result;
                            markers[index].info.imageUrls.push(dataUrl);
                            this.setState({markers});
                        };

                        reader.readAsDataURL(files[i]);
                    }
                },

                saveMarker: (index) => {
                    console.log("this", this.state.markers[index]);
                }
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={12}
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
            const {info: {title, imageUrls, subscription}, position, infoIsOpen} = marker;
            const images = imageUrls.map((img) => <img key={getId()} src={img} alt=""/>);
            return <Marker
                draggable
                onClick={() => {
                    props.onToggleOpen(index)
                }}
                onDragEnd={(e) => {
                    props.onDragEnd(e)
                }}
                key={index * new Date() * Math.random() * Math.random()}
                position={position}
            >
                {infoIsOpen && <InfoWindow>
                    <div className="info-window">
                        <div><input onChange={e => props.onChangeTitle(e.target.value, index)} value={title} type="text" placeholder="Title"/></div>
                        <div className="images-wrapper">{images}</div>
                        <div><input onChange={e => props.onChangeFile(e.target.files, index)} type="file" multiple /></div>
                        <textarea onChange={e => props.onChangeSubscription(e.target.value, index)} value={subscription} placeholder="Subscription"/>
                        <div>
                            <button onClick={() => props.deleteMarker(index)}>Delete</button>
                            <button onClick={() => props.saveMarker(index)}>Save</button>
                        </div>
                    </div>
                </InfoWindow>}
            </Marker>
        })}
    </GoogleMap>
);

