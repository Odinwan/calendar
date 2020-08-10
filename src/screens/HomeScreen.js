import * as React from 'react';
import { Text, SafeAreaView, View} from "react-native";
import Header from "../components/Header";
import Tubs from "../components/Tubs";
import {useState} from "react";
import ContentAnimate from "../components/ContentAnimate";
import DayComponent from "../components/dayCalendar/DayComponent";
import WeekComponent from "../components/weekCalendar/WeekComponent";
import MonthComponent from "../components/MonthCalendar/MonthComponent";


const HomeScreen = (props) => {

    const [tub, setTub] = useState('день')

    const onPress = (choseTub) => {
        setTub(choseTub)
    }

    return (
        <SafeAreaView>
            <View style={{backgroundColor: 'white'}}>
                <Header props={props} />
                <Tubs tub={tub} onPress={onPress}/>
                <View style={{flexDirection: 'row' }}>
                    <ContentAnimate tub={tub} type={'день'}>
                        <View style={{width: tub === 'день' ? '100%' : 0}}>
                        {tub === 'день'?<DayComponent props={props} />:null}
                        </View>
                    </ContentAnimate>
                    <ContentAnimate tub={tub} type={'неделя'}>
                        <View style={{width: tub === 'неделя' ? '100%' : 0}}>
                        {tub === 'неделя'?<WeekComponent props={props} />:null}
                        </View>
                    </ContentAnimate>
                    <ContentAnimate tub={tub} type={'месяц'}>
                        <View style={{width: tub === 'месяц' ? '100%' : 0}}>
                        {tub === 'месяц'?<MonthComponent props={props} setTub={setTub} />:null}
                        </View>
                    </ContentAnimate>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default HomeScreen

