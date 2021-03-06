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
import { screenHeight } from '../../core/const';



const DayComponent = (props) => {
    const {navigation} = props.props
    const dispatch = useDispatch()
    const Date = useSelector(state => state.calendar.choseAllDate)
    const day = useSelector(state => state.calendar.choseDay)
    const [activeDay,setActiveDay] = useState(moment().format('DD'))

    if (Date === '') {
        dispatch(choseAllDate(moment()))
    }

    const clickDay = (item) => {
        
        dispatch(choseAllDate(item))
        dispatch(choseDay(item.format('DD')))
        setActiveDay(item.format('DD'))
    }

    function getDaysArrayByMonth(fromNow) {
        var daysInMonth = moment().daysInMonth();
        var arrDays = [];
        while(daysInMonth) {
            var current = moment().date(daysInMonth);
            arrDays.push(current);
            // if(fromNow){
            //     if(moment().isSameOrBefore(current)){
            //         arrDays.push(current);
            //     }
            // }else{
               
            // }
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
                    renderItem={({item,index}) => <View key={`${index}  getDaysArrayByMonth`} style={[styles.item,day === item.format('DD') ? styles.itemActive : null]}>
                        <TouchableOpacity onPress={() => clickDay(item)}>
                            <View style={{flexDirection: 'row',justifyContent: 'space-evenly'}}>
                                <Text style={{color: day === item.format('DD')? 'white' : 'black' }}>{item.format('D')}</Text>
                                <Text style={{color: day === item.format('DD')? 'white' : 'black' }}>{item.format('dd')}</Text>
                            </View>
                            <Text style={{textAlign: 'center',fontSize: 10,color: day === item.format('DD')? 'white' : 'rgb(195,195,195)' }}>{item.format('MMMM')}</Text>
                        </TouchableOpacity>
                    </View>}
                />
            </View>
            <View style={{height: screenHeight - 200}}>
                <ScrollView style={styles.scrollView}>
                    <TimeLine navigation={navigation} />
                </ScrollView>
            </View>
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
        flexDirection: 'row',alignItems: 'center',borderTopWidth: 1,borderBottomWidth: 1,borderColor: 'rgb(200,199,204)',height: 50,backgroundColor: 'rgb(249, 249, 249)'
    },
    calendarIcon: {
        width: 50,height: 50,borderRightWidth: 1,justifyContent: 'center',borderColor: 'rgb(206,206,206)',alignItems: 'center'
    },
    item: {width: 50,paddingVertical:9,borderRightWidth:1,borderColor: 'rgb(200,199,204)',justifyContent: 'center',backgroundColor: 'rgb(249, 249, 249)'},
    itemActive: {
        backgroundColor: 'rgb(2, 122, 255)'
    },
});

export default DayComponent
