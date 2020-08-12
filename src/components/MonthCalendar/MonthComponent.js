import React, { useState,useEffect } from 'react';


import {
    Text,
    FlatList,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { choseAllDate, choseWeekDay, choseDay } from "../../actions/actions";
import { black, lightBlue, lightWhite, white, deviceWidth, screenHeight } from "../../core/const";

import 'moment/locale/ru'

const widthItem = () => {
    return (deviceWidth / 7) - 10
}

const width = () => {
    return deviceWidth - 40
}

const MonthComponent = (props) => {
    const { navigation } = props.props
    const dispatch = useDispatch()
    const weekIndex = useSelector(state => state.calendar.choseWeekIndex)
    const choseDate = useSelector(state => state.calendar.choseAllDate)
    const messArr = useSelector(state => state.calendar.entryMass)
    const day = useSelector(state => state.calendar.choseDay)

    moment.locale('ru')

    const getCalendar = (data) => {
        let calendar = []
        const startWeek = data.startOf('month').week();
        const endWeek = data.endOf('month').week();

        for (let week = startWeek; week <= endWeek; week++) {
            calendar.push({
                week: week,
                days: Array(7).fill(0).map((n, i) => data.week(week).startOf('week').clone().add(n + i, 'day'))
            })
        }
        return calendar
    }

    const getMount = (count) => {
        let temp = []
        for (let i = 0; i < count; i++) {
            if (i === 0) {
                temp.push(getCalendar(moment().date(0)))
            } else if (i === 1) {
                temp.push(getCalendar(moment()))
            } else if (i === 2) {
                temp.push(getCalendar(moment().add(2, 'months').date(0)))
            }
        }
        return temp
    }
    const [calendar, setCalendars] = useState(getMount(3))

    useEffect(() => {
        if (weekIndex === 0) {
            for (let i =0;i < calendar[1].length; i++) {
                let find = calendar[1][i].days.find(item => item.format("DD") === choseDate.format('DD'))
                if (find != undefined) {
                    dispatch(choseWeekDay(i))
                }
            }
        } 
    });

    const chooseDayColor = (item, index) => choseDate.format('MM') === item.days[0].format('MM')  && index === weekIndex ? 'rgb(228, 245, 254)' : null;

    const monthRender = (item, monthTitle) => item.map((item, index) => <View
        key={`${index} monthRender`}
        style={[styles.month, { backgroundColor: chooseDayColor(item, index) }]}>
        {renderWeekLine(item.days, index, monthTitle)}
    </View>)

    const pressDay = (item, indexWeek) => {
        dispatch(choseAllDate(item))
        dispatch(choseWeekDay(indexWeek))
        dispatch(choseDay(item.format('DD')))
        props.setTub('день')
    }

    const countMess = (item) => {

        let otv
        for (let i = 0; i < Object.values(messArr).length; i++) {
            if (item == Object.values(messArr)[i].day) {
                if (Object.values((messArr))[i].hasOwnProperty('third')) {
                    return otv = `x${3}`
                }
                if (Object.values((messArr))[i].hasOwnProperty('second')) {
                    return otv = `x${2}`
                }
                if (Object.values((messArr))[i].hasOwnProperty('first')) {
                    return otv = `x${1}`
                }
            }
        }
    }

    const wrapperColor = (item, monthTitle) => monthTitle === item.format('MMMM') && choseDate.format('DD') === item.format('DD') && choseDate.format('MM') === item.format('MM') ? 'rgb(2,122,255)' : 'transparent'
    const textColor = (item, monthTitle) => monthTitle === item.format('MMMM') && choseDate.format('DD') === item.format('DD') && choseDate.format('MM') === item.format('MM') ? white : monthTitle === item.format('MMMM') ? black : lightWhite
    const monthCount = (item, monthTitle) => monthTitle === item.format('MMMM') && choseDate.format('DD') === item.format('DD') && choseDate.format('MM') === item.format('MM')

    const renderWeekLine = (item, indexWeek, monthTitle) => item.map((item, index) => <TouchableOpacity
    key={`${index} renderWeekLine`}
    onPress={() => pressDay(item, indexWeek)}
    disabled={monthTitle !== item.format('MMMM')}
    style={styles.weekLineContainer}>
    <View style={[styles.weekLineWrapper, { backgroundColor: wrapperColor(item, monthTitle) }]}>
        <Text style={{ fontWeight: 'bold',fontSize: 16,color: textColor(item, monthTitle) }}>
            {item.format('D')}
        </Text>
        <View style={styles.weekLineTextWrapper}>
            <Text style={styles.weekLineTextStyle}>{countMess( item.format('L'),monthCount(item, monthTitle))}</Text>
        </View>
    </View>
</TouchableOpacity>)

    const renderItems = (item) => {
        const week = () => {
            return item[1][`days`].map((item, index) => <Text key={`${index} week`} style={styles.itemText}>
                {item.format('dd')}
            </Text>)
        }
        const monthTitle = item[1][`days`][0].format('MMMM')
        return (<>
            <Text style={styles.itemTitle}>{monthTitle}</Text>
            <View style={styles.itemWeekWrapper}>
                {week()}
            </View>
            <View style={styles.itemMonthWrapper}>
                {monthRender(item, monthTitle).map((item) => item)}
            </View>
        </>)
    }



    return <FlatList
        keyExtractor={(index) => index.toString()}
        data={calendar}
        renderItem={({ item }) => renderItems(item)}
        style={{ height: screenHeight - 200 }}
    />

}


export default MonthComponent

const styles = StyleSheet.create({
    month: {
        width: width(),
        marginBottom: 10,
        borderRadius: 25,
        marginHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    weekLineContainer: {
        height: widthItem(),
        width: widthItem(),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    weekLineWrapper: {
        height: '75%',
        width: '75%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    weekLineTextWrapper: {
        position: 'absolute',
        bottom: -10,
        right: -10
    },
    weekLineTextStyle: {
        color: lightBlue
    },
    itemText: {
        color: lightWhite,fontSize:13,
    },
    itemTitle: {
        marginLeft: 25, fontSize: 25, fontWeight: 'normal', marginBottom: 10,textTransform: 'capitalize',
    },
    itemWeekWrapper: {
        marginBottom: 10, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-around'
    },
    itemMonthWrapper: { justifyContent: 'center', alignItems: 'center', width: '100%' }
});


