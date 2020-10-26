import React, { Component } from 'react';
import { connect } from 'react-redux';
import {InfoWindow, Map, Marker, Polyline} from "google-maps-react";
import {createMarker, createPoint, START, STOP} from "../../Markers";
import {bindActionCreators} from "redux";
import { selectJourneyMarker} from "../../../../store/actions/journey";

export class JourneyMap extends Component {
    constructor(props) {
        super(props);
    }

    getMarkers() {
        if (!this.props.selectedJourney) {
            return null;
        }
        const { records, snappedPoints } = this.props.selectedJourney;
        return snappedPoints.map((point, i) => {
            let icon = createPoint();
            if (i === 0) icon = createMarker(START);
            if (i === snappedPoints.length - 1) icon = createMarker(STOP);
            return (<Marker
                key={i}
                onClick={this.onMarkerClick}
                icon={icon}
                info={records[point.originalIndex]}
                position={{lat: point.location.latitude, lng: point.location.longitude}} />)
        });
    }

    getPath() {
        return this.props.selectedJourney ? this.props.selectedJourney.interpolatedPoints : []
    }

    onMarkerClick = (props, marker, e) => {
        this.props.actions.selectJourneyMarker(marker);
    };

    render() {
        const marker = this.props.selectedJourneyMarker;
        console.log(marker)
       return (
           <div style={{height: '400px', width: '100%'}}>
               <Map
                   centerAroundCurrentLocation
                   className="map"
                   google={this.props.google}
                   initialCenter={{
                       lat: 48.866667,
                       lng: 2.333333
                   }}
                   center={this.props.center}
                   zoom={12}>
                   <Polyline
                       strokeColor="#3689FA"
                       strokeOpacity={0.8}
                       strokeWeight={4}
                       path={this.getPath()}/>
                   {this.getMarkers()}
                   <InfoWindow
                       visible={true}
                       marker={marker}>
                       <div>
                           <div>Vitesse: { marker ? marker.info.speed : 'unknown'}</div>
                           <div>Date: { marker ? marker.info.timestamp : 'unkonwn'}</div>
                       </div>
                   </InfoWindow>
               </Map>
           </div>)
    }
}

const mapStateToProps = state => ({
});

/**
 * Redux related method
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ selectJourneyMarker }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(JourneyMap);
