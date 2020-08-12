import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';


    export const HeaderNavigator = () => {

        
    const navigation = useNavigation();
    const choseDay = useSelector(state => state.calendar.choseDay)
    const onPress = () => {
       navigation.navigate('Details',{
            day: choseDay
        }) 
    }
        
     return <View style={styles.containerBut}>
            <TouchableOpacity  style={styles.plus} onPress={() => onPress()} >
                <Image style={{height: 25,width: 25}} source={require('../../assets/image/icons8-плюс-40.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('settings')}>
                <Image style={{height: 25,width: 25}} source={require('../../assets/image/icons8-сервисы-40.png')}/>
            </TouchableOpacity>
        </View>
    }

    export default HeaderNavigator
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