import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebase from '@react-native-firebase/app';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyCQsnTTyKVX0iBI8hFFJCQS6YUIPsq5ZMo",
        authDomain: "hospitalfinderapp-5293b.firebaseapp.com",
        databaseURL: "https://hospitalfinderapp-5293b-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "hospitalfinderapp-5293b",
        storageBucket: "hospitalfinderapp-5293b.appspot.com",
        messagingSenderId: "260540963749",
        appId: "1:260540963749:web:9c177619fc90a485a9664c",
        measurementId: "G-9JWXG32E1D"
    });
}

AppRegistry.registerComponent(appName, () => App);
