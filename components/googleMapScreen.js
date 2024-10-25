import MapView, { Marker } from "react-native-maps";
import React, { Component } from "react";

class GoogleMap extends Component {
    render() {
        const {
            latitude,
            longitude,
            height,
            pinColor,
            width,

        } = this.props;
        return (
            <MapView
                style={{ height: height, width: width }}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.10,
                    longitudeDelta: 0.10,
                }}
            >
                {/* <Marker
                    coordinate={{ latitude: 37.33233141, longitude: -122.0312186 }}
                    pinColor={pinColor}
                /> */}
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    pinColor={pinColor}
                />
            </MapView>
        )
    }
}

export default GoogleMap;