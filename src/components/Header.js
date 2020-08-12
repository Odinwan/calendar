import React from 'react';


import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import {useSelector} from "react-redux";


const Header = (props) => {
    const {navigation} = props.props
  

    return <View style={styles.container}>
        <View><Text style={styles.title}>Записи</Text></View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'ios' ? 10 : 8 
    },
    containerBut: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    plus: {
        marginRight: 20
    }
});

export default Header


