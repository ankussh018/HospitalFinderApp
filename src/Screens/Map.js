import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const MapScreen = () => {
    const [region, setRegion] = useState(null);
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        // Fetch user's location
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });

                fetchNearbyHospitals(latitude, longitude).then(data => setHospitals(data));
            },
            error => {
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, []);

    const fetchNearbyHospitals = async (latitude, longitude) => {
        const API_KEY = 'AIzaSyCAPnAj32dK1wK6InsS33qmBwoEQxpwV4U';  // handle API Key or any sensitive data with Backend.
        const radius = 5000; // 2km radius
        // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&types=hospital&key=${API_KEY}`; // It is paid service we just use unpaid service for demo.
        const url = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${latitude},${longitude})[amenity=hospital];out;`
        try {
            const response = await axios.get(url);
            return response.data.elements;
        } catch (error) {
            console.error('Error fetching nearby hospitals:', error);
            return [];
        }
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region} showsUserLocation={true}>
                {
                    hospitals.length != 0 && (
                        hospitals.map((hospital, index) =>
                        (
                            <Marker
                                key={hospital.id}
                                coordinate={{
                                    latitude: hospital.lat,
                                    longitude: hospital.lon,
                                }}
                                title={hospital.tags?.name || 'Hospital'}
                                description={hospital.tags?.name || 'Hospital'}
                            />
                        )
                        ))
                }
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default MapScreen;
