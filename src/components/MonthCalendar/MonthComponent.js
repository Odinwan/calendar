import React, {useEffect, useState} from 'react';


import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView, FlatList, Dimensions,
} from 'react-native';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {choseAllDate, choseDay} from "../../actions/actions";
let deviceWidth = Dimensions.get('window').width


const MonthComponent = (props) => {
    const dispatch = useDispatch()
    const Date = useSelector(state => state.calendar.choseAllDate)

    const getCalendar  = async () => {
        let calendar = []
        const startWeek = moment().startOf('month').week();
        const endWeek = moment().endOf('month').week();
        for(var week = startWeek; week<endWeek;week++){
            console.log()
            await calendar.push({
                week:week,
                days:Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
            })
        }
        return  calendar
    }


    const [calendar,setCalendars] = useState([])

    useEffect(() => {
        const asd = getCalendar()
        setCalendars(asd)
        console.log('asd',asd)
        console.log('calendar',calendar)
    },[])

    const widthItem = () => {
        return (deviceWidth / 7) - 10
    }
    const width = () => {
        return deviceWidth - 40
    }
    const monthRender = () => {
        console.log('calendar',calendar)
        // const month = calendar.map((item,index) => <View
        //     style={{ marginBottom: 15,borderRadius: 25,backgroundColor: index === 1 ?'rgb(228, 245, 254)': null,marginHorizontal: 20, width: width(),height: 40,alignItems: 'center',flexDirection: 'row',justifyContent: 'space-around'}}>
        //     {renderWeekLine(item.days)}
        // </View>)
        // return month
    }
    const pressDay = (item) => {
       if (item.format('MM') === moment().format('MM')) {
           console.log(false)
       } else {
           console.log(true)
       }
    }
    const renderWeekLine = (item) => {

        const weekLine = item.map((item,index) => <TouchableOpacity
            onPress={() => pressDay(item)}
            disabled={item.format('MM') != moment().format('MM')? true: false}
            style={{width: widthItem(),height:widthItem(), borderRadius: 50,alignItems: 'center',justifyContent:'center'}}>
            <View style={{
                backgroundColor: moment().format('D') === item.format('D')? 'rgb(2,122,255)': 'transparent',
                height: '70%',
                width: '70%',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent:'center',
                textAlign: 'center'}}>
                <Text style={{color: moment().format('D') === item.format('D')? 'white': 'black'}}>
                    {item.format('MM') === moment().format('MM') ? item.format('D') : null}
                </Text>
            </View>
        </TouchableOpacity>)
        return weekLine
    }

    const renderItems = () => {
        const week = () => {
            return calendar[1][`days`].map((item,index) => <Text style={{color: 'rgb(192,192,195)'}}>{item.format('dd')}</Text>)
        }
        return (<>
            {/*<Text style={{marginLeft: 25,fontSize: 25,fontWeight: 'bold',marginBottom: 10}}>{calendar[1][`days`][0].format('MMMM')}</Text>*/}
            {/*<View style={{marginBottom: 10,marginHorizontal: 20 ,flexDirection: 'row', justifyContent: 'space-around'}}>*/}
            {/*    {week()}*/}
            {/*</View>*/}
            <View style={{justifyContent: 'center',alignItems: 'center',width: '100%'}}>
                <FlatList
                horizontal={false}
                vertical={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                data={ monthRender() }
                renderItem={({item}) => <>{item}</>}
                />
            </View>
        </>)
    }
    const preRenderMonthCalendar = () => {
        return (
            renderItems()
        )
    }
    if (calendar.length != 0) {
        return preRenderMonthCalendar()
    } else {
        return <View><Text>loading</Text></View>
    }

}


export default MonthComponent
