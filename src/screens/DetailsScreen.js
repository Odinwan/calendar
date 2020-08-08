import * as React from 'react';
import {TextInput,TouchableOpacity, Text, View} from "react-native";
import { Picker } from '@react-native-community/picker'
import {useState} from "react";
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
    const dispatch = useDispatch()


    const count = (numb) => {
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



    const saveEntry = (data) => {
        let test = Object.values(data)
        let findElement = Object.values(data).find(data => data.day == choseAllDate.format('L'))
        for (let i = 0; i < test.length;i++) {
            if (findElement) {
                if (test[i].day === choseAllDate.format('L')) {
                    if (test[i].hasOwnProperty('second')) {
                        let third = count('third')
                        dispatch(addEntry(third))
                    } else if (test[i].hasOwnProperty('first')) {
                        let second = count('second')
                        dispatch(addEntry(second))
                    }
                }
            } else {
                let first = count('first')
                dispatch(addEntry(first))
            }


        }
        navigate('Home')
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
                    onValueChange={(itemValue, itemIndex) => setStartSelectedHour(itemValue)}
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
                    onValueChange={(itemValue, itemIndex) => setStartSelectedMinutes(itemValue)}
                >
                    {minutes()}
                </Picker>
            </View>
            <Text>До :</Text>
            <View style={{flexDirection: 'row'}}>
                <Picker
                    selectedValue={endSelectedHour}
                    style={{ height: 20, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setEndSelectedHour(itemValue)}
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
                    onValueChange={(itemValue, itemIndex) => setEndSelectedMinutes(itemValue)}
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

