import React, { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { requestLocationPermission } from '../HelperFunction/requestLocationPermission';

const LoginScreen = ({ navigation }) => {

    GoogleSignin.configure({
        webClientId: '260540963749-mlnte74r146deq6f9sfg2p0cm12056fg.apps.googleusercontent.com', // Add your web client ID here
    });

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            navigation.navigate('Map');

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User cancelled the sign-in flow
                console.log('Cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Sign-in process is in progress already
                console.log('In progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // Play services not available or outdated
                console.log('Play services not available');
            } else {
                // Some other error occurred
                console.error(error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={onGoogleButtonPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleButton: {
        width: 192,
        height: 48,
    },
});
export default LoginScreen;

