import React, {useEffect, useState} from 'react';


import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView, FlatList, Picker,
} from 'react-native';
import moment from "moment";
import {useSelector} from "react-redux";


const TimeLine = (props) => {

    const choseAllDate = useSelector(state => state.calendar.choseAllDate)
    const data = useSelector(state => state.calendar.entryMass)

    useEffect(()=> {

    },[choseAllDate])

    const timeline = () => {
        let test = Object.values(data).filter(data => data.day == choseAllDate.format('L'))
        if (test.length != 0) {
            return someFunc(test[0])
        } else {
            return clearElements()
        }
    }

    const someFunc = (test) => {
        const workHour = [10,11,12,13,14,15,16,17,18,19,20]
        let mass = workHour.map((element,index) =>
            <>
            <View key={element} style={styles.wreapperItem}>
                <View style={styles.wrapperNumberDay}>
                    <Text style={{textAlign: 'center'}}>{element}</Text>
                </View>

            </View>
                {test.hasOwnProperty('third') && element == test.third.startHour ?
                    renderMess(test.third)
                    : null }
                {test.hasOwnProperty('second') && element == test.second.startHour ?
                    renderMess(test.second)
                    : null }
                {test.hasOwnProperty('first') && element == test.first.startHour ?
                    renderMess(test.first)
                    : null }
                </>
        )
        return mass
    }

    const clearElements = () => {
        const workHour = [10,11,12,13,14,15,16,17,18,19,20]
        let mass = workHour.map((element,index) =>
            <View key={element+index} style={styles.wreapperItem}>
                <View style={styles.wrapperNumberDay}>
                    <Text style={{textAlign: 'center'}}>{element}</Text>
                </View>
            </View>
        )
        return mass
    }



    const renderMess = (element) => {

            const timeOffset = (element) => {
                let procentPath = (element.startMinutes / 100) * 150
                let procent = (element.startHour - 10) * 150 + procentPath
                return procent
            }

            const heightMess = (element) => {
                let minus = element.endMinutes - element.startMinutes
                let umn = minus * 150
                let procent = umn / 60

                if (element.endHour == element.startHour) {
                    return procent - 5
                } else {
                    return ((procent) + (150 * (element.endHour - element.startHour)) - 10)
                }

            }

            return <TouchableOpacity onPress={() => alert(`${element.message}`)} style={[{left: 50,position: 'absolute',zindex:20 ,marginTop: timeOffset(element),height: '100%'},styles.entry]}>
                <View style={[{zIndex: 200,backgroundColor: 'rgb(93,217,114)',minHeight: heightMess(element)},styles.themeMess]}>
                    <Text style={{color: 'white'}}>{element.message}</Text>
                </View>
            </TouchableOpacity>
    }
    return <View style={{position: 'relative'}}>
                {timeline()}
            </View>
}

const styles = StyleSheet.create({
    wreapperItem: {height: 150,flexDirection: "row",borderBottomWidth: 1,borderBottomColor: 'black',zIndex: 1},
    entry: {width: '100%',paddingRight: 105,paddingVertical: 5,paddingLeft: 5,zIndex: 20},
    wrapperNumberDay: {width: 50,backgroundColor: 'rgb(249, 249, 249)'},
    themeMess: {padding: 5,borderRadius: 5,maxHeight: 175}
});

export default TimeLine
