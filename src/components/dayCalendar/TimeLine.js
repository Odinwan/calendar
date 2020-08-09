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


const TimeLine = () => {

    const choseAllDate = useSelector(state => state.calendar.choseAllDate)
    const data = useSelector(state => state.calendar.entryMass)

    const timeline = () => {
        let test = Object.values(data).filter(data => data.day == choseAllDate.format('L'))
        if (test.length != 0) {
            return renderLineElement(test[0])
        } else {
            return clearElements()
        }
    }

    const renderLineElement = (elementInner) => {
        const workHour = [10,11,12,13,14,15,16,17,18,19,20]
        let mass = workHour.map((element,index) =>
            <>
                <View key={element} style={styles.wreapperItem}>
                    <View style={styles.wrapperNumberDay}>
                        <Text style={{textAlign: 'center'}}>{element}</Text>
                    </View>
                </View>
                {elementInner.hasOwnProperty('third') && element == elementInner.third.startHour ?
                    renderMess(elementInner.third,index)
                    : null }
                {elementInner.hasOwnProperty('second') && element == elementInner.second.startHour ?
                    renderMess(elementInner.second,index)
                    : null }
                {elementInner.hasOwnProperty('first') && element == elementInner.first.startHour ?
                    renderMess(elementInner.first,index)
                    : null }
            </>
        )
        return mass
    }

    const clearElements = () => {
        const workHour = [10,11,12,13,14,15,16,17,18,19,20]
        let mass = workHour.map((element,index) =>
            <View key={`${index}  clearElements`} style={styles.wreapperItem}>
                <View style={styles.wrapperNumberDay}>
                    <Text style={{textAlign: 'center'}}>{element}</Text>
                </View>
            </View>
        )
        return mass
    }



    const renderMess = (element,index) => {
            const timeOffset = (element) => {
                let procentPath = (element.startMinutes / 60) * 150
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

            return <TouchableOpacity key={`${index}  getDaysArrayByMonth`} onPress={() => alert(`${element.message}`)} style={[{left: 50,zindex:20 ,position: 'absolute',top: timeOffset(element)},styles.entry]}>
                <View style={[{zIndex: 200,backgroundColor: 'rgb(93,217,114)',minHeight: heightMess(element)},styles.themeMess]}>
                    <Text style={{color: 'white'}}>{element.message}</Text>
                </View>
            </TouchableOpacity>
    }
    return <View >
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
