import * as React from 'react';
import {TextInput,TouchableOpacity, Text, View} from "react-native";
import { Picker } from '@react-native-community/picker'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addEntry} from "../actions/actions";


const DetailScreen = (props) => {
    const choseAllDate = useSelector(state => state.calendar.choseAllDate)
    const data = useSelector(state => state.calendar.entryMass)
    const {navigate} = props.navigation
    const [startSelectedHour, setStartSelectedHour] = useState(10);
    const [startSelectedMinutes, setStartSelectedMinutes] = useState(0);
    const [endSelectedHour, setEndSelectedHour] = useState(10);
    const [endSelectedMinutes, setEndSelectedMinutes] = useState(30);
    const [valueMess, onChangeText] = React.useState('Useless Placeholder');
    const [check, setCheck] = React.useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        if (endSelectedHour <= startSelectedHour ) {
            // console.log('check',check)
            setCheck(true)
            // console.log('check',check)
        } else {
            setCheck(false)
            // alert('Начальное время не может быть больше конечного')
        }
    },[])

    useEffect(() => {
        console.log('endSelectedHour',endSelectedHour)
        console.log('startSelectedHour',startSelectedHour)
        if (endSelectedHour >= startSelectedHour ) {
            console.log('in')
            // console.log('check',check)
            setCheck(true)
            // console.log('check',check)
        } else {
            setCheck(false)
        }
    },[startSelectedHour,endSelectedHour])

    const count = (prevNumb,numb, element) => {
        return {
            [`${choseAllDate.format('L')}`]: {
                day: `${choseAllDate.format('L')}`,
                [`${numb}`] : {
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
        if (startSelectedHour <= itemValue) {
            setEndSelectedHour(itemValue)
        } else {
            setEndSelectedHour(startSelectedHour)
        }
    }

    const setStartMinutes = (itemValue) => {
        setStartSelectedMinutes(itemValue)
    }

    const setEndMinutes = (itemValue) => {
        if (startSelectedHour == endSelectedHour) {
            if (startSelectedMinutes < endSelectedMinutes) {
                setEndSelectedMinutes(itemValue)
            } else {
                setEndSelectedMinutes(startSelectedMinutes + 1)
            }
        } else {
            setEndSelectedMinutes(itemValue)
        }
    }

    const checkTime = (element) => {
        const startDay = 10 * 60
        const readyStartElement = startSelectedHour * 60
        const readyEndElement = (endSelectedHour * 60) + endSelectedMinutes
        const startTimeElement = element.first.startHour * 60
        const endTimeElement = (element.first.endHour * 60) + element.first.endMinutes

        if (endTimeElement) {

        }
    }
    const saveEntry = (data) => {
        let element = Object.values(data)
        let findElement = Object.values(data).find(data => data.day == choseAllDate.format('L'))

        // console.log('check',check)

        if (check) {
            if (startSelectedHour === endSelectedHour && startSelectedMinutes === endSelectedMinutes) {
                alert('Запись должна различаться хотя бы на одну минуту')
            } else {
                for (let i = 0; i < element.length;i++) {
                    if (findElement) {



                        if (element[i].day === choseAllDate.format('L')) {
                            if (element[i].hasOwnProperty('second')) {
                                // console.log('element[i]',element[i])

                                // let third = count('second','third',element[i])
                                // dispatch(addEntry(third))
                            } else if (element[i].hasOwnProperty('first')) {

                                if (checkTime(element[i])) {

                                }

                                // let second = count('first','second',element[i])
                                // dispatch(addEntry(second))
                            }
                        }



                    } else {
                        // let first = count('first','first',element[i])
                        // dispatch(addEntry(first))
                    }
                }
                // navigate('Home')
            }

        } else {
            alert('Начальное время не может быть больше конечного')
        }

    }

    const minutes = () => {
        let arr = []
        for (let i = 0; i < 60;i++) {
            arr.push(i)
        }
         const doubled = arr.map((number,index) => <Picker.Item label={number.toString()} key={`${number}minutes`} value={number} />);
        return doubled
    }



    return (
        <View style={{  alignItems: 'center', justifyContent: 'center' }}>
            <Text>Сообщение</Text>
            <TextInput
                style={{marginBottom:20, height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={valueMess}
            />
            <Text>C :</Text>
            <View style={{flexDirection: 'row',marginBottom: 200}}>
                <Picker
                    selectedValue={startSelectedHour}
                    style={{ height: 20, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setStartHour(itemValue) }
                >
                    <Picker.Item key={'10hour'} label="10" value='10' />
                    <Picker.Item key={'11hour'} label="11" value="11" />
                    <Picker.Item key={'12hour'} label="12" value="12" />
                    <Picker.Item key={'13hour'} label="13" value="13" />
                    <Picker.Item key={'14hour'} label="14" value="14" />
                    <Picker.Item key={'15hour'} label="15" value="15" />
                    <Picker.Item key={'16hour'} label="16" value="16" />
                    <Picker.Item key={'17hour'} label="17" value="17" />
                    <Picker.Item key={'18hour'} label="18" value="18" />
                    <Picker.Item key={'19hour'} label="19" value="19" />
                    <Picker.Item key={'20hour'} label="20" value="20" />
                </Picker>
                <Picker
                    selectedValue={startSelectedMinutes}
                    style={{ height: 20, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setStartMinutes(itemValue)}
                >
                    {minutes()}
                </Picker>
            </View>
            <Text>До :</Text>
            <View style={{flexDirection: 'row'}}>
                <Picker
                    selectedValue={endSelectedHour}
                    style={{ height: 20, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setEndHour(itemValue)}
                >
                    <Picker.Item label="10" value='10' />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                    <Picker.Item label="13" value="13" />
                    <Picker.Item label="14" value="14" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="16" value="16" />
                    <Picker.Item label="17" value="17" />
                    <Picker.Item label="18" value="18" />
                    <Picker.Item label="19" value="19" />
                    <Picker.Item label="20" value="20" />
                </Picker>
                <Picker
                    selectedValue={endSelectedMinutes}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setEndMinutes(itemValue)}
                >
                    {minutes()}
                </Picker>
            </View>
            <TouchableOpacity style={{marginTop: 200}} onPress={() => {saveEntry(data)}}>
                <Text>123123123123</Text>
            </TouchableOpacity>

        </View>
    );
}
export default DetailScreen

