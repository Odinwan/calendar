import React, {useEffect, useState} from 'react';


import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView, FlatList,
} from 'react-native';
import moment from "moment";
import TimeLine from "./TimeLine";
import {useDispatch, useSelector} from "react-redux";
import {choseAllDate, choseDay} from "../../actions/actions";


const DayComponent = (props) => {
    const dispatch = useDispatch()
    const Date = useSelector(state => state.calendar.choseAllDate)
    const [activeDay,setActiveDay] = useState('')

    if (Date === '') {
        dispatch(choseAllDate(moment()))
    }

    useEffect(()=> {
        setActiveDay(moment().format('D'))
    },[])

    const clickDay = (item) => {
        dispatch(choseAllDate(item))
        dispatch(choseDay(item.format('D')))
        setActiveDay(item.format('D'))
    }

    function getDaysArrayByMonth(fromNow) {
        var daysInMonth = moment().daysInMonth();
        var arrDays = [];
        while(daysInMonth) {
            var current = moment().date(daysInMonth);

            if(fromNow){
                if(moment().isSameOrBefore(current)){
                    arrDays.push(current);
                }
            }else{
                arrDays.push(current);
            }
            daysInMonth--;
        }
        return arrDays.reverse();
    }


    return (
        <View>
            <View style={styles.wrapperTopSlider}>
                <View style={styles.calendarIcon}>
                    <Image style={{width: 25,height: 25}} source={require('../../../assets/image/calendar.png')}/>
                </View>
                <FlatList
                    horizontal={true}
                    vertical={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={ getDaysArrayByMonth(true)}
                    renderItem={({item}) => <View  style={[styles.item,activeDay === item.format('D') ? styles.itemActive : null]}>
                        <TouchableOpacity onPress={() => clickDay(item)}>
                            <View style={{flexDirection: 'row',justifyContent: 'space-evenly'}}>
                                <Text style={{color: activeDay === item.format('D')? 'white' : 'black' }}>{item.format('D')}</Text>
                                <Text style={{color: activeDay === item.format('D')? 'white' : 'black' }}>{item.format('dd')}</Text>
                            </View>
                            <Text style={{textAlign: 'center',color: activeDay === item.format('D')? 'white' : 'black' }}>{item.format('MMM')}</Text>
                        </TouchableOpacity>
                    </View>}
                />
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <TimeLine state={'день'}/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#eee',
    },
    container: {
        marginBottom: '140%',
    },
    wrapperTopSlider: {
        flexDirection: 'row',alignItems: 'center',borderTopWidth: 1,borderBottomWidth: 1,borderColor: 'rgb(206,206,206)',height: 50,backgroundColor: 'rgb(249, 249, 249)'
    },
    calendarIcon: {
        width: 50,height: 50,borderRightWidth: 1,justifyContent: 'center',borderColor: 'rgb(206,206,206)',alignItems: 'center'
    },
    item: {width: 50,paddingVertical:7,borderRightWidth:1,borderColor: 'rgb(206,206,206)',justifyContent: 'center',backgroundColor: 'rgb(249, 249, 249)'},
    itemActive: {
        backgroundColor: 'rgb(2, 122, 255)'
    },
});

export default DayComponent
