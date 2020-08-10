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
    const choseDay = useSelector(state => state.calendar.choseDay)
    const onPress = () => {
       navigation.navigate('Details',{
            day: choseDay
        }) 
    }

    return <View style={styles.container}>
        <View><Text style={styles.title}>Записи</Text></View>

        <View style={styles.containerBut}>
            <TouchableOpacity  style={styles.plus} onPress={() => onPress()} >
                    <Image style={{height: 25,width: 25}} source={require('../../assets/image/icons8-плюс-40.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPress()}>
                <Image style={{height: 25,width: 25}} source={require('../../assets/image/icons8-сервисы-40.png')}/>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 10
    },
    containerBut: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    plus: {
        marginRight: 20
    }
});

export default Header
