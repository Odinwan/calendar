import React, { useRef, useEffect } from 'react';

import { Animated, Text, View } from 'react-native';

const ContentAnimate = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    const {tub,type} = props

    useEffect(()=> {
        if (tub === type) {
            animate()
        }
    },[tub])
    useEffect(() => {
        return ( ()=>{
            offAnimate()
        });
    })
    const animate = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 400,
                useNativeDriver: true
            }
        ).start();
    }
    const offAnimate = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }
        ).start();
    }

    return <Animated.View style={{opacity: fadeAnim, transform: [{scale: fadeAnim}]}}>
        {props.children}
        </Animated.View>
}

export default ContentAnimate
