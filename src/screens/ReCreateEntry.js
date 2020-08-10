import * as React from 'react';
import {TextInput, ScrollView,TouchableOpacity, Text, View, StyleSheet ,Dimensions} from "react-native";
import { Picker } from '@react-native-community/picker'
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
            console.log('in')
            setCheck(true)
        } else {
            setCheck(false)
        }
    },[startSelectedHour,endSelectedHour])

    const count = () => {
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
                console.log(`${startDay} ${newStartElement} ${newEndElement} ${oldFirstStart}`)
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

    const checkWithFirstEntry = () => {
        const startDay = 10 * 60
        const endDay = 20 * 60
        const findElement = Object.values(data).find(data => data.day == day)
        const newStartElement = Number(startSelectedHour)  * 60
        const newEndElement = ((Number(endSelectedHour) * 60) + Number(endSelectedMinutes))

        if (findElement.third && findElement.second && findElement.first) {


            if (mess === 'first') {
                dispatch(deleteEntry(findElement.first))
                const oldFirstStart = Number(findElement.third.startHour) * 60
                const oldFirstEnd = (Number(findElement.third.endHour) * 60) + Number(findElement.third.endMinutes)
                const oldSecondStart = Number(findElement.second.startHour) * 60
                const oldSecondEnd = (Number(findElement.second.endHour) * 60) + Number(findElement.second.endMinutes)
                return help(oldFirstStart,oldFirstEnd,oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
            } else if (mess === 'second') {
                dispatch(deleteEntry(findElement.second))
                const oldFirstStart = Number(findElement.third.startHour) * 60
                const oldFirstEnd = (Number(findElement.third.endHour) * 60) + Number(findElement.third.endMinutes)
                const oldSecondStart = Number(findElement.first.startHour) * 60
                const oldSecondEnd = (Number(findElement.first.endHour) * 60) + Number(findElement.second.endMinutes)
                return help(oldFirstStart,oldFirstEnd,oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
            } else {
                dispatch(deleteEntry(findElement.third))
                const oldFirstStart = Number(findElement.first.startHour) * 60
                const oldFirstEnd = (Number(findElement.first.endHour) * 60) + Number(findElement.third.endMinutes)
                const oldSecondStart = Number(findElement.second.startHour) * 60
                const oldSecondEnd = (Number(findElement.second.endHour) * 60) + Number(findElement.second.endMinutes)
                return help(oldFirstStart,oldFirstEnd,oldSecondStart,oldSecondEnd,startDay,endDay,newStartElement,newEndElement)
            }

        } else if (findElement.third == undefined && findElement.second && findElement.first || findElement.third && findElement.second == undefined && findElement.first || findElement.third && findElement.second && findElement.first == undefined) {
            const oldFirstStart = Number(findElement.first.startHour) * 60
            const oldFirstEnd = (Number(findElement.first.endHour) * 60) + Number(findElement.first.endMinutes)
            const oldSecondStart = Number(findElement.second.startHour) * 60
            const oldSecondEnd = (Number(findElement.second.endHour) * 60) + Number(findElement.second.endMinutes)

            if (oldSecondEnd > oldFirstEnd) {
                if (startDay <= newStartElement && newEndElement <= oldFirstStart ||
                    oldFirstEnd <= newStartElement && newEndElement <= oldSecondStart ||
                    oldSecondEnd <= newStartElement && newEndElement <= endDay) {
                    alert('Запись Отредактирована')
                    return true
                } else {
                    console.log(`${startDay} ${newStartElement} ${newEndElement} ${oldFirstStart}`)
                    alert(`Запись не может быть тут установленна 12345`)
                    return false
                }
            } else {
                if (startDay <= newStartElement && oldSecondEnd <= oldSecondStart ||
                    oldSecondEnd <= newStartElement && newEndElement <= oldFirstStart
                    || oldFirstEnd <= newStartElement && newEndElement <= endDay) {
                        alert('Запись Отредактирована')
                    return true
                } else {
                    alert('Запись не может быть тут установленна 1234')
                    return false
                }
            }
        } else  {
            const oldFirstStart = Number(findElement.first.startHour) * 60
            const oldFirstEnd = (Number(findElement.first.endHour) * 60) + Number(findElement.first.endMinutes)
            if ( newStartElement => oldFirstEnd || newEndElement <= oldFirstStart) {
                alert('Запись Отредактирована')
                return true
            } else {
                alert('Запись не может быть тут установленна 123')
                return false
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
                        console.log(reEntry)
                        dispatch(addEntry(reEntry))
                        navigate('Home')
                    }
                } 
            }
        }
    }

    return (
        <View style={{backgroundColor: 'white',alignItems: 'center',position: 'relative'}}>
        <ScrollView >
            <View style={{ alignItems: 'center', justifyContent: 'center' ,height: height + 300}}>
            <Text>С какого времни начало записи :</Text> 
            <View style={styles.wrapperInput}>
                <TextInput
                    placeholder={`${startSelectedHour}`}
                    placeholderTextColor="blue"
                    keyboardType={'numeric'}
                    style={[styles.input]}
                    value={startSelectedHour}
                    onChangeText={(text) => setStartHour(text)}
                />
                <Text style={styles.label}>Часы:</Text> 
                </View>
                <View style={styles.wrapperInput}>
                <TextInput
                    placeholder={`${startSelectedMinutes}`}
                    placeholderTextColor="blue"
                    keyboardType={'numeric'}
                    style={styles.input}
                    value={startSelectedMinutes}
                    onChangeText={(text) => setStartMinutes(text)}
                />
                <Text style={styles.label}>Минуты :</Text>
                </View>

                <Text>До какого времени конец запись :</Text> 
                <View style={styles.wrapperInput}>
                <TextInput
                    placeholder={`${endSelectedHour}`}
                    placeholderTextColor="blue"
                    keyboardType={'numeric'}
                    style={[styles.input]}
                    value={endSelectedHour}
                    onChangeText={(text) => setEndHour(text)}
                />
                <Text style={styles.label}>Часы :</Text>
                </View>
                <View style={styles.wrapperInput}>
                <TextInput
                    placeholder={`${endSelectedMinutes}`}
                    placeholderTextColor="blue"
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
                    placeholderTextColor="blue"
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


        // <View style={{  alignItems: 'center', justifyContent: 'center' }}>
        //     <Text>Сообщение</Text>
        //     <TextInput
        //         style={styles.input}
        //         onChangeText={text => onChangeText(text)}
        //         value={valueMess}
        //     />
        //     <Text>C :</Text>
        //     <View style={{flexDirection: 'row'}}>
        //     <TextInput
        //         keyboardType={'numeric'}
        //         style={[styles.input,{marginRight: 20}]}
        //         value={startSelectedHour}
        //         onChangeText={(text) => setStartHour(text)}

        //     />
        //     <TextInput
        //         keyboardType={'numeric'}
        //         style={styles.input}
        //         value={startSelectedMinutes}
        //         onChangeText={(text) => setStartMinutes(text)}

                
        //     />
        //     </View>
        //     <Text>До :</Text>

        //     <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
        //         <TextInput
        //             keyboardType={'numeric'}
        //             style={[styles.input,{marginRight: 20}]}
        //             value={endSelectedHour}
        //             onChangeText={(text) => setEndHour(text)}
        //         />
        //         <TextInput
        //             keyboardType={'numeric'}
        //             style={styles.input}
        //             value={endSelectedMinutes}
        //             onChangeText={(text) => setEndMinutes(text)}

        //         />
        //     </View>
        //     <TouchableOpacity  onPress={() => {saveEntry(data)}}>
        //         <Text>Запись</Text>
        //     </TouchableOpacity>
        // </View>
    );
}
export default ReCreateEntry

const styles = StyleSheet.create({
    wrapperInput: {
        position: 'relative'
    },
    label: {
        position: 'absolute',top: 5,left: 10
    },
    input: {
        borderRadius: 5,
        marginBottom: 20,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        minWidth: '90%',
        paddingTop: 20,
        height: 80,
        paddingHorizontal: 10,
        textAlign: 'left',
    },
    button: {
        marginBottom: 300,
        borderRadius: 25,
        paddingVertical: 20,
        width: '100%',
        backgroundColor: blue,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    }
});
