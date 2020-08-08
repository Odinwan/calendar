import React, {useState} from 'react';


import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';


const Tubs = (props) => {
    const {tub, onPress} = props
    return <View style={styles.container}>
        <View style={styles.wrapperTubs}>
                <TouchableOpacity  onPress={() => onPress("день")}>
                    <View style={[styles.simpeTub,tub === "день" ? styles.activeTub : null]}><Text>День</Text></View>
                </TouchableOpacity>
                <View><Text style={styles.line}>|</Text></View>
                <TouchableOpacity onPress={() => onPress("неделя")}>
                    <View style={[styles.simpeTub,tub === "неделя" ? styles.activeTub : null]}><Text>Неделя</Text></View>
                </TouchableOpacity>
                <View><Text style={styles.line}>|</Text></View>
                <TouchableOpacity onPress={() => onPress("месяц")}>
                    <View style={[styles.simpeTub,tub === "месяц" ? styles.activeTub : null]}><Text style={{textAlign: 'center',}}>Месяц</Text></View>
                </TouchableOpacity>
        </View>
        {/*<Text>{tub}</Text>*/}
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 24,
        paddingVertical: 2,
        backgroundColor: '#eaeaea',
        borderRadius: 10,
    },
    wrapperTubs: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    simpeTub: {
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 33,
        paddingVertical: 10,
    },
    activeTub: {
        backgroundColor: 'white',
    },
    line: {
        color: '#d2d2d2',
        fontSize: 20
    }

});

export default Tubs
