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
import { Dimensions } from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import {addAllDayMonth, choseAllDate, choseWeekArr, choseWeekDay} from "../../actions/actions";
import TimeLine from "../dayCalendar/TimeLine";
import TimeLineWeek from "./TimeLineWeek";
let deviceWidth = Dimensions.get('window').width

const WeekComponent = (props) => {
    const dispatch = useDispatch()
    const Date = useSelector(state => state.calendar.choseDay)
    const allDayMonth = useSelector(state => state.calendar.allDayMonth)

    const [activeDay,setActiveDay] = useState('')
    const [activeWeek,setActiveWeek] = useState('')
    const [daysOfWeek,setDaysOfWeek] = useState(0)

    useEffect(() => {
        weeks_in_month()
        setActiveDay(moment().format('D'))
    },[])

    useEffect(() => {
        const allDays = getDaysArrayByMonth()
        dispatch(addAllDayMonth(allDays))

        for (let i = 0; i < allDays.reverse().length; i++) {
            if (activeDay == allDays[i].format('DD')) {
                dispatch(choseAllDate(allDays[i]))
            }
        }
    },[activeDay])

    const recreateMass = async (mass) => {

        let temp = []
        for (let i = 0; i < mass.length; i++) {
            temp.push([])
            for (let k = 0; k <= mass[i].length - 1; k++) {
                temp[i].push([])
                for (let j = allDayMonth.length; j--; j == 0 ) {
                    if (mass[i][k].toString().substring(8, 10) == allDayMonth[j].format('DD')) {
                        temp[i][k].push(allDayMonth[j])
                    }
                }
            }
        }

        dispatch(choseWeekArr(temp))
    }

    function getDaysArrayByMonth() {
        var daysInMonth = moment().daysInMonth();
        var arrDays = [];

        while(daysInMonth) {
            var current = moment().date(daysInMonth);
            arrDays.push(current);
            daysInMonth--;
        }

        return arrDays;
    }

    const setData = (item,index) => {
        setActiveWeek(`${item[0]} - ${item[1] === undefined ? item[0]: item[1]}`)
        setDaysOfWeek(index)
        dispatch(choseWeekDay(index))
    }


    const weeks_in_month = () => {
        let year = moment().format('yyyy');  // change year
        let month = moment().format('M'); // change month here
        let startDate = moment([year, month - 1])
        let endDate = moment(startDate).endOf('month');

        var dates = [];
        var weeks = [];

        var per_week = [];
        var difference = endDate.diff(startDate, 'days');

        per_week.push(startDate.toDate())
        let index = 0;
        let last_week = false;
        while (startDate.add(1, 'days').diff(endDate) < 0) {
            if (startDate.day() != 0) {
                per_week.push(startDate.toDate())
            }
            else {
                if ((startDate.clone().add(7, 'days').month() == (month - 1))) {
                    weeks.push(per_week)
                    per_week = []
                    per_week.push(startDate.toDate())
                }
                else if (Math.abs(index - difference) > 0) {
                    if (!last_week) {
                        weeks.push(per_week);
                        per_week = [];
                    }
                    last_week = true;
                    per_week.push(startDate.toDate());
                }
            }
            index += 1;
            if ((last_week == true && Math.abs(index - difference) == 0) ||
                (Math.abs(index - difference) == 0 && per_week.length == 1)) {
                weeks.push(per_week)
            }
            dates.push(startDate.clone().toDate());
        }
        recreateMass(weeks)
        return weeks
    }

    const weeksRender = () => {
        let weeks = weeks_in_month()
        let mass = []

        for (let i = 0; i < weeks.length;i++) {
            mass.push(weekRender(weeks[i],weeks))
        }
        const weekView = mass.map((item,index) => <TouchableOpacity
            onPress={() => setData(item,index)}
             style={{width: 100, height: 50,alignItems: 'center'}}>
            <View style={{borderRightWidth:1,borderColor: 'rgb(206,206,206)',justifyContent: 'center',height: '100%',width: '100%',backgroundColor: activeWeek == `${item[0]} - ${item[1] === undefined ? item[0]: item[1]}`? 'rgb(2, 122, 255)' : 'white'}}>
                <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                    <Text style={{color:activeWeek == `${item[0]} - ${item[1] === undefined ? item[0]: item[1]}`? 'white' : 'black'}}>{item[0]}</Text>
                    <Text style={{color:activeWeek == `${item[0]} - ${item[1] === undefined ? item[0]: item[1]}`? 'white' : 'black'}}>-</Text>
                    <Text style={{color:activeWeek == `${item[0]} - ${item[1] === undefined ? item[0]: item[1]}`? 'white' : 'black'}}>{item[1] === undefined ? item[0]: item[1]}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                    <Text style={{color:activeWeek == `${item[0]} - ${item[1] === undefined ? item[0]: item[1]}`? 'white' : 'black'}}>{moment().format("MMMM")}.,</Text>
                    <Text style={{color:activeWeek == `${item[0]} - ${item[1] === undefined ? item[0]: item[1]}`? 'white' : 'black'}}>{moment().format("YYYY")}</Text>
                </View>
            </View>
        </TouchableOpacity>)
        return weekView
    }
    const weekRender = (week,weeks) => {
        let length = []
        for (let i = 0; i <= week.length-1;i++) {
            if (i === 0) {
                length.push(week[i].toString().substring(8, 10))
            } else if (i+1 == week.length) {
                length.push(week[i].toString().substring(8, 10))
            }
        }
        return length
    }

    const renderDaysOfWeek = () => {
        let weeks = weeks_in_month()
        return weeks[daysOfWeek].map(item => <TouchableOpacity onPress={() => setActiveDay(item.toString().substring(8, 10))} style={{borderColor: 'rgb(206,206,206)',borderRightWidth: 1,width:widthItem() ,alignItems: 'center',justifyContent: 'center',backgroundColor: activeDay == item.toString().substring(8, 10)? 'rgb(2, 122, 255)' : 'white'}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: activeDay == item.toString().substring(8, 10)? 'white' : 'black'}}>{item.toString().substring(0, 3)}</Text>
                <Text style={{color: activeDay == item.toString().substring(8, 10)? 'white' : 'black'}}>{item.toString().substring(8, 10)}</Text>
            </View>
            <Text style={{color: activeDay == item.toString().substring(8, 10)? 'white' : 'black'}}>{item.toString().substring(4, 7)}</Text>
        </TouchableOpacity>)
    }

    const width = () => {
        return deviceWidth - 50
    }
    const widthItem = () => {
        return (deviceWidth - 50) / 7
    }
    return (
        <View>
            <View style={styles.wrapperTopSlider}>
                <FlatList
                    horizontal={true}
                    vertical={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={ weeksRender() }
                    renderItem={({item}) => <>{item}</>}
                />
            </View>
            <View style={styles.wrapperWeek}>
                <View style={styles.calendarIcon}>
                    <Image style={{width: 25,height: 25}} source={require('../../../assets/image/calendar.png')}/>
                </View>
                <View style={{flexDirection: 'row',justifyContent: 'flex-start',width: width()}}>
                    {renderDaysOfWeek()}
                </View>

            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <TimeLineWeek />
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
    wrapperWeek: {
        borderBottomWidth: 1,borderColor: 'rgb(206,206,206)',flexDirection: 'row',width: deviceWidth
    },
    wrapperTopSlider: {
        alignItems: 'flex-start',borderTopWidth: 1,borderBottomWidth: 1,borderColor: 'rgb(206,206,206)',backgroundColor: 'rgb(249, 249, 249)'
    },
    calendarIcon: {
        width: 50,height: 50,borderRightWidth: 1,justifyContent: 'center',flexDirection: 'row',alignItems:'center',borderColor: 'rgb(206,206,206)'
    },
    item: {width: 50,height: 50,borderRightWidth:1,borderColor: 'rgb(206,206,206)',justifyContent: 'center',backgroundColor: 'rgb(249, 249, 249)'},
    itemActive: {
        backgroundColor: 'rgb(2, 122, 255)'
    },
});

export default WeekComponent
