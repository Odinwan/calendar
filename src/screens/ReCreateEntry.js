import * as React from 'react';
import {TextInput, ScrollView,TouchableOpacity, Text, View, StyleSheet ,Dimensions} from "react-native";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addEntry,deleteEntry} from "../actions/actions";
import { blue } from '../core/const';

let height = Dimensions.get('window').height

const ReCreateEntry = (props) => {
    const {day,mess} = props.route.params

    const data = useSelector(state => state.calendar.entryMass)
    const {navigate} = props.navigation
    const [startSelectedHour, setStartSelectedHour] = useState(0);
    const [startSelectedMinutes, setStartSelectedMinutes] = useState(0);
    const [endSelectedHour, setEndSelectedHour] = useState(0);
    const [endSelectedMinutes, setEndSelectedMinutes] = useState(0);
    const [valueMess, onChangeText] = React.useState('Useless Placeholder');
    const [entry, setEntry] = React.useState('');
    const [check, setCheck] = React.useState(true);
    const dispatch = useDispatch()


    useEffect(() => {
        let findElement = Object.values(data).find(data => data.day == day)
        for (let i = 1; i < Object.values(findElement).length ;i++) {
            Object.values(findElement)[i].entry
            if (Object.values(findElement)[i].entry === mess) {
                const element = Object.values(findElement)[i]
                setStartSelectedHour(Number(element.startHour))
                setStartSelectedMinutes(Number(element.startMinutes))
                setEndSelectedHour(Number(element.endHour))
                setEndSelectedMinutes(Number(element.endMinutes))
                onChangeText(element.message)
                setEntry(element.entry)
            }
        }
    },[])

    useEffect(() => {
        if (endSelectedHour <= startSelectedHour ) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    },[])

    useEffect(() => {
        if (endSelectedHour >= startSelectedHour ) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    },[startSelectedHour,endSelectedHour])

    const count = (mess) => {
        return {
            [`${day}`]: {
                day: `${day}`,
                [`${entry}`] : {
                    entry: `${entry}`,
                    startHour: startSelectedHour,
                    startMinutes: startSelectedMinutes,
                    endHour: endSelectedHour,
                    endMinutes: endSelectedMinutes,
                    message: valueMess,
                }
            }
        }
    }
    const setStartHour = (itemValue) => {
        setStartSelectedHour(itemValue)
    }

    const setEndHour = (itemValue) => {
        setEndSelectedHour(itemValue)
    }

    const setStartMinutes = (itemValue) => {
        setStartSelectedMinutes(itemValue)
    }

    const setEndMinutes = (itemValue) => {
        setEndSelectedMinutes(itemValue)
    }

    const help = (oldFirstStart,oldFirstEnd,oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement) => {
        if (oldSecondEnd > oldFirstEnd) {
            if (startDay <= newStartElement && newEndElement <= oldFirstStart ||
                oldFirstEnd <= newStartElement && newEndElement <= oldSecondStart ||
                oldSecondEnd <= newStartElement && newEndElement <= endDay) {
                alert('Запись Отредактирована')
                return true
            } else {
                // console.log(`${startDay} <= ${newStartElement} && ${newEndElement} <= ${oldFirstStart} ||
                // ${oldFirstEnd} <= ${newStartElement} && ${newEndElement} <= ${oldSecondStart} ||
                // ${oldSecondEnd} <= ${newStartElement} && ${newEndElement} <= ${endDay}`)
                alert(`Запись не может быть тут установленна first second`)
                return false
            }
        } else {
            if (startDay <= newStartElement && oldSecondEnd <= oldSecondStart ||
                oldSecondEnd <= newStartElement && newEndElement <= oldFirstStart
                || oldFirstEnd <= newStartElement && newEndElement <= endDay) {
                    alert('Запись Отредактирована')
                return true
            } else {
                alert('Запись не может быть тут установленна second first')
                return false
            }
        }
        }

    const oneElement = (oldElementStart,oldelementEnd,startDay,endDay,newStartElement,newEndElement) => {
        if ( startDay <= newStartElement && newEndElement <= oldElementStart || oldelementEnd <= newStartElement && newEndElement <= endDay) {
            alert('Запись Отредактирована')
            return true
        } else {
            alert('Запись не может быть тут установленна')
            return false
        }
    }

    const checkWithFirstEntry = () => {
        const startDay = 10 * 60
        const endDay = 20 * 60
        const findElement = Object.values(data).find(data => data.day == day)
        const newStartElement = ((Number(startSelectedHour)  * 60) + Number(startSelectedMinutes))
        const newEndElement = ((Number(endSelectedHour) * 60) + Number(endSelectedMinutes))



        if (findElement.third && findElement.second && findElement.first) {
            if (mess === 'first') {
                dispatch(deleteEntry(findElement.first))
                const oldFirstStart = ((Number(findElement.third.startHour) * 60) + Number(findElement.third.startMinutes))
                const oldFirstEnd = (Number(findElement.third.endHour) * 60) + Number(findElement.third.endMinutes)
                const oldSecondStart = ((Number(findElement.second.startHour) * 60) + Number(findElement.second.startMinutes))
                const oldSecondEnd = (Number(findElement.second.endHour) * 60) + Number(findElement.second.endMinutes)
                return help(oldFirstStart,oldFirstEnd,oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
            } else if (mess === 'second') {
                dispatch(deleteEntry(findElement.second))
                const oldFirstStart = ((Number(findElement.third.startHour) * 60) + Number(findElement.third.startMinutes))
                const oldFirstEnd = (Number(findElement.third.endHour) * 60) + Number(findElement.third.endMinutes)
                const oldSecondStart = ((Number(findElement.first.startHour) * 60) + Number(findElement.first.startMinutes))
                const oldSecondEnd = (Number(findElement.first.endHour) * 60) + Number(findElement.first.endMinutes)
                return help(oldFirstStart,oldFirstEnd,oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
            } else {
                dispatch(deleteEntry(findElement.third))
                const oldFirstStart = ((Number(findElement.first.startHour) * 60) + Number(findElement.first.startMinutes))
                const oldFirstEnd = (Number(findElement.first.endHour) * 60) + Number(findElement.first.endMinutes)
                const oldSecondStart = ((Number(findElement.second.startHour) * 60) + Number(findElement.second.startMinutes))
                const oldSecondEnd = (Number(findElement.second.endHour) * 60) + Number(findElement.second.endMinutes)
                return help(oldFirstStart,oldFirstEnd,oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
            }
        } else if (findElement.third == undefined && findElement.second && findElement.first || findElement.third && findElement.second == undefined && findElement.first || findElement.third && findElement.second && findElement.first == undefined) {
            if (mess === 'first') {
                dispatch(deleteEntry(findElement.first))
                if (findElement && findElement.third) {
                    const oldFirstStart = ((Number(findElement.third.startHour) * 60) + Number(findElement.third.startMinutes))
                    const oldFirstEnd = (Number(findElement.third.endHour) * 60) + Number(findElement.third.endMinutes)
                    return oneElement(oldFirstStart,oldFirstEnd,startDay,endDay,newStartElement,newEndElement)
                } else {
                    const oldSecondStart = ((Number(findElement.second.startHour) * 60) + Number(findElement.second.startMinutes))
                    const oldSecondEnd = (Number(findElement.second.endHour) * 60) + Number(findElement.second.endMinutes)
                    return oneElement(oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
                }
            } else if (mess === 'second') {
                dispatch(deleteEntry(findElement.second))
                if (findElement && findElement.third) {
                    const oldFirstStart = ((Number(findElement.third.startHour) * 60) + Number(findElement.third.startMinutes))
                    const oldFirstEnd = (Number(findElement.third.endHour) * 60) + Number(findElement.third.endMinutes)
                    return oneElement(oldFirstStart,oldFirstEnd,startDay,endDay,newStartElement,newEndElement)
                } else {
                    const oldSecondStart = ((Number(findElement.first.startHour) * 60) + Number(findElement.first.startMinutes))
                    const oldSecondEnd = (Number(findElement.first.endHour) * 60) + Number(findElement.first.endMinutes)
                    return oneElement(oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
                }
            } else {
                dispatch(deleteEntry(findElement.third))
                if (findElement && findElement.first) {
                    const oldFirstStart = ((Number(findElement.first.startHour) * 60) + Number(findElement.first.startMinutes))
                    const oldFirstEnd = (Number(findElement.first.endHour) * 60) + Number(findElement.first.endMinutes)
                    return oneElement(oldFirstStart,oldFirstEnd,startDay,endDay,newStartElement,newEndElement)
                } else {
                    const oldSecondStart = ((Number(findElement.second.startHour) * 60) + Number(findElement.second.startMinutes))
                    const oldSecondEnd = (Number(findElement.second.endHour) * 60) + Number(findElement.second.endMinutes)
                    return oneElement(oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
                }
            }
        } 

    }



    const saveEntry = (data) => {
        let findElement = Object.values(data).find(data => data.day == day)
        if (findElement) {
            if (findElement.day === day) {
                if (findElement.hasOwnProperty(mess)) {
                    if (checkWithFirstEntry()) {
                        let reEntry = count(mess)
                        dispatch(addEntry(reEntry))
                        navigate('Home')
                    }
                } 
            }
        }
    }

    return (
        <View style={styles.wrapperDetail}>
            <ScrollView style={{height: height}}>
            <View style={styles.mainWrapper}> 
            <Text>С какого времни начало записи :</Text> 
            <View style={[styles.wrapperInput]}>
                    <TextInput
                        placeholder={`${startSelectedHour}`}
                        placeholderTextColor="rgb(123,137,149)"
                        keyboardType={'numeric'}
                        style={[styles.input]}
                        value={startSelectedHour}
                        onChangeText={(text) => setStartHour(text)}
                    />
                    <Text style={styles.label}>Часы:</Text> 
                </View>
                <View style={[styles.wrapperInput]}>
                    <TextInput
                        placeholder={`${startSelectedMinutes}`}
                        placeholderTextColor="rgb(123,137,149)"
                        keyboardType={'numeric'}
                        style={styles.input}
                        value={startSelectedMinutes}
                        onChangeText={(text) => setStartMinutes(text)}
                    />
                    <Text style={styles.label}>Минуты :</Text>
                </View>
                    <Text>До какого времени конец запись :</Text> 
                <View style={[styles.wrapperInput]}>
                    <TextInput
                        placeholder={`${endSelectedHour}`}
                        placeholderTextColor="rgb(123,137,149)"
                        keyboardType={'numeric'}
                        style={[styles.input]}
                        value={endSelectedHour}
                        onChangeText={(text) => setEndHour(text)}
                    />
                    <Text style={styles.label}>Часы :</Text>
                </View>
                <View style={[styles.wrapperInput]}>
                    <TextInput
                        placeholder={`${endSelectedMinutes}`}
                        placeholderTextColor="rgb(123,137,149)"
                        keyboardType={'numeric'}
                        style={styles.input}
                        value={endSelectedMinutes}
                        onChangeText={(text) => setEndMinutes(text)}
                    />
                    <Text style={styles.label}>Минуты :</Text>
                </View>
    
                <Text>Сообщение</Text>
                <TextInput
                    placeholder={valueMess}
                    placeholderTextColor="rgb(123,137,149)"
                    style={styles.input}
                    onChangeText={text => onChangeText(text)}
                    value={valueMess}
                />
                           
            <TouchableOpacity style={styles.button} onPress={() => { saveEntry(data) }}>
                <Text style={styles.buttonText}>Запись</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
}
export default ReCreateEntry

const styles = StyleSheet.create({
    wrapperDetail: {backgroundColor: 'white',position: 'relative',flex: 1},
    mainWrapper: { alignItems: 'center', justifyContent: 'center' , paddingTop: 40},
    wrapperInput: {
        position: 'relative'
    },
    label: {
        position: 'absolute',
        top: 15,
        left: 10,
        fontSize: 16,
        color: 'rgb(113,126,139)',
        fontWeight: 'bold'
    },
    input: {
        backgroundColor:"white",
        borderRadius: 5,
        marginBottom: 20,
        borderColor: 'rgb(232,236,241)',
        borderWidth: 1,
        minWidth: '90%',
        paddingTop: 30,
        height: 90,
        fontSize: 22,
        paddingHorizontal: 10,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 25,
        paddingVertical: 20,
        width: '90%',
        backgroundColor: blue,
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    }
});

            // if (mess === 'first') {
            //     // dispatch(deleteEntry(findElement.first))
            //     // const oldFirstStart = ((Number(findElement.third.startHour) * 60) + Number(findElement.third.startMinutes))
            //     // const oldFirstEnd = (Number(findElement.third.endHour) * 60) + Number(findElement.third.endMinutes)
            //     // const oldSecondStart = ((Number(findElement.second.startHour) * 60) + Number(findElement.second.startMinutes))
            //     // const oldSecondEnd = (Number(findElement.second.endHour) * 60) + Number(findElement.second.endMinutes)
            //     // return help(oldFirstStart,oldFirstEnd,oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
            // } else if (mess === 'second') {
            //     // dispatch(deleteEntry(findElement.second))
            //     // const oldFirstStart = ((Number(findElement.third.startHour) * 60) + Number(findElement.third.startMinutes))
            //     // const oldFirstEnd = (Number(findElement.third.endHour) * 60) + Number(findElement.third.endMinutes)
            //     // const oldSecondStart = ((Number(findElement.first.startHour) * 60) + Number(findElement.first.startMinutes))
            //     // const oldSecondEnd = (Number(findElement.first.endHour) * 60) + Number(findElement.first.endMinutes)
            //     // return help(oldFirstStart,oldFirstEnd,oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
            // } else {
            //     // dispatch(deleteEntry(findElement.third))
            //     // const oldFirstStart = ((Number(findElement.first.startHour) * 60) + Number(findElement.first.startMinutes))
            //     // const oldFirstEnd = (Number(findElement.first.endHour) * 60) + Number(findElement.first.endMinutes)
            //     // const oldSecondStart = ((Number(findElement.second.startHour) * 60) + Number(findElement.second.startMinutes))
            //     // const oldSecondEnd = (Number(findElement.second.endHour) * 60) + Number(findElement.second.endMinutes)
            //     // return help(oldFirstStart,oldFirstEnd,oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
            // }