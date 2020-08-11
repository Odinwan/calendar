import * as React from 'react';
import { TextInput,  ScrollView,  Keyboard,TouchableOpacity, Text, View, StyleSheet} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEntry } from "../actions/actions";
import { blue, height } from '../core/const';

const DetailScreen = (props) => {
    const choseAllDate = useSelector(state => state.calendar.choseAllDate)
    const day = useSelector(state => state.calendar.choseDay)
    const data = useSelector(state => state.calendar.entryMass)
    const { navigate } = props.navigation
    const [startSelectedHour, setStartSelectedHour] = useState(10);
    const [startSelectedMinutes, setStartSelectedMinutes] = useState(0);
    const [endSelectedHour, setEndSelectedHour] = useState(10);
    const [endSelectedMinutes, setEndSelectedMinutes] = useState(30);
    const [valueMess, onChangeText] = React.useState('Useless Placeholder');
    const [check, setCheck] = React.useState(true);

    const [absoluteFirstInput, setAbsoluteFirstInput] = useState(false);
    const [absoluteSecondInput, setAbsoluteSecondInput] = useState(false);
    const [absoluteThirdInput, setAbsoluteThirdInput] = useState(false);
    const [absoluteFourInput, setAbsoluteFourInput] = useState(false);
    const [absoluteFiveInput, setAbsoluteFiveInput] = useState(false);

    const dispatch = useDispatch()
 
    useEffect(() => {
        if (endSelectedHour <= startSelectedHour) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [])

    useEffect(() => {
        if (endSelectedHour >= startSelectedHour) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [startSelectedHour, endSelectedHour])

    const count = (numb) => {
        return {
            [`${choseAllDate.format('L')}`]: {
                day: `${choseAllDate.format('L')}`,
                [`${numb}`]: {
                    entry: `${numb}`,
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

    const checkWithFirstEntry = (first, second) => {
        const startDay = 10 * 60
        const endDay = 20 * 60
        const newStartElement = ((Number(startSelectedHour) * 60) + Number(startSelectedMinutes))
        const newEndElement = ((Number(endSelectedHour) * 60) + Number(endSelectedMinutes))
        const oldFirstStart = ((Number(first.startHour) * 60) + Number(first.startMinutes))
        const oldFirstEnd = (Number(first.endHour) * 60) + Number(first.endMinutes)

        if (second) {
            const oldSecondStart = ((Number(second.startHour) * 60) + Number(second.startMinutes))
            const oldSecondEnd = (Number(second.endHour) * 60) + Number(second.endMinutes)
            if (oldSecondEnd > oldFirstEnd) {
                if (startDay <= newStartElement && newEndElement <= oldFirstStart ||
                    oldFirstEnd <= newStartElement && newEndElement <= oldSecondStart ||
                    oldSecondEnd <= newStartElement && newEndElement <= endDay) {
                    alert('Запись добавлена')
                    return true
                } else {
                    alert(`Запись не может быть тут установленна`)
                    return false
                }
            } else {
                if (startDay <= newStartElement && oldSecondEnd <= oldSecondStart ||
                    oldSecondEnd <= newStartElement && newEndElement <= oldFirstStart
                    || oldFirstEnd <= newStartElement && newEndElement <= endDay) {
                    alert('Запись добавлена')
                    return true
                } else {
                    alert('Запись не может быть тут установленна')
                    return false
                }
            }
        } else {
            if (newStartElement => oldFirstEnd || newEndElement <= oldFirstStart) {
                alert('Запись добавлена')
                return true
            } else {
                alert('Запись не может быть тут установленна')
                return false
            }
        }
    }
    const saveEntry = (data) => {
        let element = Object.values(data)
        let findElement = Object.values(data).find(data => data.day == choseAllDate.format('L'))

        if (check) {
            if (startSelectedHour == endSelectedHour && startSelectedMinutes == endSelectedMinutes) {
                alert('Запись должна различаться хотя бы на одну минуту')
            } else {
                for (let i = 0; i < element.length; i++) {
                    if (findElement) {
                        if (element[i].day === choseAllDate.format('L')) {
                            if (element[i].hasOwnProperty('third')) {
                                alert('максимальное количество записей на день')
                                navigate('Home')
                            } else if (element[i].hasOwnProperty('second')) {
                                if (checkWithFirstEntry(element[i].first, element[i].second)) {
                                    let third = count('third', element[i])
                                    dispatch(addEntry(third))
                                    navigate('Home')
                                }
                            } else if (element[i].hasOwnProperty('first')) {
                                if (checkWithFirstEntry(element[i].first)) {
                                    let second = count('second', element[i])
                                    dispatch(addEntry(second))
                                    navigate('Home')
                                }
                            }
                        }
                    } else {
                        let first = count('first', element[i])
                        dispatch(addEntry(first))
                        navigate('Home')
                    }
                }

            }
        } else {
            alert('Начальное время не может быть больше конечного')
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
export default DetailScreen

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

