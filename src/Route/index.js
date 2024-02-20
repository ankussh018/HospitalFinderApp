import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../Screens/Login';
import MapScreen from '../Screens/Map';

const Stack = createStackNavigator();

class Route {
    static render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                    <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Map' }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default Route;
