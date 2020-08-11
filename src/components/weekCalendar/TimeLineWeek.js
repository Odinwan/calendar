import React, {useEffect, useState} from 'react';


import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {useSelector} from "react-redux";
import {deviceWidth} from "../../core/const";

const TimeLineWeek = (props) => {


    const choseWeekIndex = useSelector(state => state.calendar.choseWeekIndex)
    const choseAllDate = useSelector(state => state.calendar.choseAllDate)
    const choseWeekArr = useSelector(state => state.calendar.choseWeekArr)
    const data = useSelector(state => state.calendar.entryMass)
    const widthItem = () => {
        return (deviceWidth - 50) / 7
    }
    const widthItemMess = () => {
        return ((deviceWidth - 50) / 7) - 5
    }
    useEffect(()=> {

    },[choseAllDate])
    const timeline = () => {
        return <>
            {renderMainTable()}
            {renderArrMess()}
        </>
    }
    const renderMainTable = () => {
        const workHour = []
        for (let i = 0; i < 10;i++) {
            workHour.push(`${10+i}:00`)
            workHour.push(`${10+i}:30`)
        }

        const renderTable = () => {
            let temp = []
            for (let i = 0; i < 7;i++) { temp.push(i) }
            return temp
        }

        let mass = workHour.map((element,index) =>
                <View key={`${index}  renderMainTable`}  style={styles.wreapperItem}>
                    <View style={{width: 50,borderRightWidth: 1,borderColor:'rgb(206,206,206)'}}>
                        <Text style={{textAlign: 'center',marginTop: -10}}>{element == '10:00'?null:element}</Text>
                    </View>
                    <View style={{flexDirection: 'row',borderBottomColor: 'rgb(206,206,206)',borderBottomWidth:1}}>
                        {renderTable().map((item, index) => <View key={`${index}  renderTable`} style={{width: widthItem(),borderRightWidth:1,borderColor:'rgb(206,206,206)'}}></View>)}
                    </View>
                </View>
        )
        return mass
    }

    const renderArrMess = () => {
        var mass = []
        for (let i = 0;i < choseWeekArr[choseWeekIndex].length; i++) {
            for (let k = 0; k < Object.keys(data).length; k++) {
                if (choseWeekArr[choseWeekIndex][i].length != 0) {
                    const date = choseWeekArr[choseWeekIndex][i][0]
                    if (date.format('L') === Object.keys(data)[k]) {
                        mass.push(preRender(data[Object.keys(data)[k]],i,k))
                    }
                }
            }
        }
        return mass
    }
    const preRender = (element,index,k) => {
        let mass = []

        if (element.hasOwnProperty('third')) {
            mass.push(renderMess(element.third,element.day,index,element.third.entry,k))
        }
        if (element.hasOwnProperty('second')) {
            mass.push(renderMess(element.second,element.day,index,element.second.entry,k))
        }
        if (element.hasOwnProperty('first')) {
            mass.push(renderMess(element.first, element.day,index,element.first.entry,k))
        }

        return mass
    }
    const renderMess = (element,day,index,countMess,k) => {
        
            const timeOffset = (element) => {
                let procentPath = (element.startMinutes / 60) * 150
                let procent = (element.startHour - 10) * 150 + procentPath
                return procent + 2
            }

            const heightMess = (element) => {
                const check = () => {
                    return element.endMinutes - element.startMinutes
                }


                let minus = check()
                let umn = minus * 150
                let procent = umn / 60

                if (element.endHour == element.startHour) {
                    return procent - 5
                } else {
                    return ((procent) + (150 * (element.endHour - element.startHour)) - 5)
                }

            }

            const leftOffset =  () => {
                for (let i = 0; i < choseWeekArr[choseWeekIndex].length; i++) {
                    if (choseWeekArr[choseWeekIndex][i][0].format('L') == day) {
                        return (52 + (i * 50) + (i * 2))
                    }
                }
            }
            const onPress = (day,countMess) => {
                props.navigation.navigate('ReCreateEntry',{
                     day: day,
                     mess: countMess
                 }) 
             }

            return (
            <TouchableOpacity
                key={`${Math.floor(Math.random() * day)}`}
                onPress={() => onPress(day,countMess)}
                style={{
                    position: 'absolute',
                    zIndex:20,
                    left: leftOffset(),
                    top: timeOffset(element),
                    height: heightMess(element),
                    backgroundColor: 'rgb(93,217,114)',
                    borderRadius: 5,
                    width: widthItemMess()
                }}>
                <Text style={{textAlign: 'center',color: 'white'}}>{`${element.message.slice(0,4)}...`}</Text>
            </TouchableOpacity>)
    }

    return <View style={{position: 'relative',borderTopWidth: 1,borderColor:'rgb(206,206,206)',marginTop: -1}}>
                {timeline()}
            </View>
}

const styles = StyleSheet.create({
    wreapperItem: {height: 75,flexDirection: "row",zIndex: 1},
    entry: {width: '100%',paddingRight: 105,paddingVertical: 5,paddingLeft: 5,zIndex: 20},
    wrapperNumberDay: {width: 50,backgroundColor: 'rgb(249, 249, 249)'},
    themeMess: {padding: 5,borderRadius: 5,maxHeight: 175}
});

export default TimeLineWeek
