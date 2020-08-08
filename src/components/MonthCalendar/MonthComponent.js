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
import {choseAllDate, choseDay, choseWeekDay} from "../../actions/actions";
let deviceWidth = Dimensions.get('window').width


const MonthComponent = (props) => {
    const dispatch = useDispatch()
    const weekIndex = useSelector(state => state.calendar.choseWeekIndex)
    const choseDate = useSelector(state => state.calendar.choseAllDate)
    const messArr = useSelector(state => state.calendar.entryMass)
    const day = useSelector(state => state.calendar.choseDay)

    const getCalendar = (data) => {
        var date2 = moment().date(0)

        let calendar = []

        const startWeek = data.startOf('month').week();
        const endWeek = data.endOf('month').week();

        for(var week = startWeek; week<=endWeek;week++){
            calendar.push({
                week:week,
                days:Array(7).fill(0).map((n, i) => data.week(week).startOf('week').clone().add(n + i, 'day'))
            })
        }

        return  calendar
    }

    const getmount = (count) => {
        let temp = []
        for (let i = 0; i < count;i++) {
            if (i === 0) {
                temp.push(getCalendar(moment().date(0)))
            } else if ( i === 1 ) {
                temp.push(getCalendar(moment()))
            } else if ( i === 2 ) {
                temp.push(getCalendar(moment().add(2, 'months').date(0)))
            }
        }
        return temp
    }

    const [calendar,setCalendars] = useState(getmount(3))

    const widthItem = () => {
        return (deviceWidth / 7) - 10
    }

    const width = () => {
        return deviceWidth - 40
    }

    const monthRender = (item,MonthTitle) => {
        const month = item.map((item,index) => <View
            style={{ marginBottom: 15,borderRadius: 25,backgroundColor: choseDate.format('MM') === item.days[0].format('MM') && index === weekIndex ?'rgb(228, 245, 254)': null,marginHorizontal: 20, width: width(),height: 40,alignItems: 'center',flexDirection: 'row',justifyContent: 'space-around'}}>
            {renderWeekLine(item.days,index,MonthTitle)}
        </View>)
        return month
    }

    const pressDay = (item,indexWeek) => {
            dispatch(choseAllDate(item))
            dispatch(choseWeekDay(indexWeek))
    }
    const test = (check) => {
        if (check) {
            return 'black'
        } else {
            return 'rgb(192,192,195)'
        }
    }

    const countMess = (check,item) => {
        // console.log("item",item)
        // console.log("Object(messArr)",Object.values(messArr)[0].day)
            let otv
            for (let i = 0;i < messArr.length; i++) {
                if (item == Object.values(messArr)[i].day) {
                    console.log('item',item)
                    otv = `x${4}`
                }
            }

            return otv

    }
    const renderWeekLine = (item,indexWeek,MonthTitle) => {
        // const check = MonthTitle === item.format('MMMM') && choseDate.format('D') === item.format('D')&& choseDate.format('MM') === item.format('MM')
        const weekLine = item.map((item) => <TouchableOpacity
            onPress={() => pressDay(item,indexWeek)}
            disabled={MonthTitle === item.format('MMMM') ? false : true}
            style={{width: widthItem(),height:widthItem(), borderRadius: 50,alignItems: 'center',justifyContent:'center'}}>
            <View style={{
                backgroundColor: MonthTitle === item.format('MMMM') && choseDate.format('D') === item.format('D') && choseDate.format('MM') === item.format('MM')? 'rgb(2,122,255)': 'transparent',
                height: '70%',
                width: '70%',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent:'center',
                textAlign: 'center'}}>
                <Text style={{color: MonthTitle === item.format('MMMM') && choseDate.format('D') === item.format('D')&& choseDate.format('MM') === item.format('MM')? 'white': test(MonthTitle === item.format('MMMM'))}}>
                    {item.format('D')}
                </Text>
                <View style={{position:'absolute',bottom: -10,right: -10}}>
                    <Text style={{color: 'rgb(105,179,253)'}}>{countMess(MonthTitle === item.format('MMMM') && choseDate.format('D') === item.format('D')&& choseDate.format('MM') === item.format('MM'),item.format('L'))}</Text>
                </View>

            </View>
        </TouchableOpacity>)
        return weekLine
    }

    const renderItems = (item) => {
        const week = () => {
            return item[1][`days`].map((item,index) => <Text style={{color: 'rgb(192,192,195)'}}>{item.format('dd')}</Text>)
        }
        const MonthTitle = item[1][`days`][0].format('MMMM')
        return (<>
            <Text style={{marginLeft: 25,fontSize: 25,fontWeight: 'bold',marginBottom: 10}}>{MonthTitle}</Text>
            <View style={{marginBottom: 10,marginHorizontal: 20 ,flexDirection: 'row', justifyContent: 'space-around'}}>
                {week()}
            </View>
            <View style={{justifyContent: 'center',alignItems: 'center',width: '100%'}}>
                {monthRender(item,MonthTitle).map((item,index) => <>{item}</>)}
            </View>
        </>)
    }

    return <ScrollView style={{height: '100%',paddingBottom: 1000}}>
        {calendar.map((item) => renderItems(item))}

    </ScrollView>


}


export default MonthComponent
