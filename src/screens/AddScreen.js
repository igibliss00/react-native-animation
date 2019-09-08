import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    TouchableWithoutFeedBack,
    Animated,
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native';

export default Add = () => {
    const [animation] = useState(new Animated.Value(0))
    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: 300,
            duration: 1500
        }).start(() => {
            Animated.timing(animation, {
                toValue: 0,
                duration: 200,
            })
        }
    )}
    const randomValue = new Animated.Value(50)
    const newAnimation = Animated.add(animation, randomValue)
    const animatedStyles = {
        transform: [
            {
                translateY: newAnimation
            }
        ]
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={startAnimation}    
            >
                <Animated.View style={[styles.box, animatedStyles]}/>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: 150,
        height: 150,
        backgroundColor: 'tomato'
    }
})