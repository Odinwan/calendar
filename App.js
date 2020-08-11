import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import ReCreateEntry from "./src/screens/ReCreateEntry";

import { HeaderNavigator } from './src/components/HeaderNavigator';
const Stack = createStackNavigator();

function App() {


    const getHeaderOptions = () => ({
        headerRight: () => (
            <HeaderNavigator/>
        ),
        headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            shadowColor: 'rgba(255,255,255,0)',
            shadowRadius: 0,
            height: 70,
        },
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
        headerRightContainerStyle: {
            paddingRight: 20
        },
        headerTitle: '',
    })

    const getHeaderBack = () => ({
        headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            shadowColor: 'rgba(255,255,255,0)',
            shadowRadius: 0,
            height: 70,
        },
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
        headerRightContainerStyle: {
            paddingRight: 20
        },
        headerTitle: 'Настройка записи',
        headerBackTitle: 'Назад'
    })

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{...getHeaderOptions()}} />
                <Stack.Screen name="Details" component={DetailsScreen} options={{...getHeaderBack()}} />
                <Stack.Screen name="ReCreateEntry" component={ReCreateEntry} options={{...getHeaderBack()}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
