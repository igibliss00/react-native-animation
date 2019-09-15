import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet
} from 'react-native'

export default Progress = () => {
    const [animation] = useState(new Animated.Value(0))
    const [opacity] = useState(new Animated.Value(1))
    const progressInterpolate = animation.interpolate({
        inputRange: [0 , 1],
        outputRange: ['0%', '100%'],
        extrapolate: "clamp",
    })

    const colorInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(71,255,99)", "rgb(99,71,255)"]
    })

    const progressStyles = {
        width: progressInterpolate,
        backgroundColor: colorInterpolate,
        bottom: 0,
        opacity
    }

    const startProgress = () => {
        animation.setValue(0)
        opacity.setValue(1)
        Animated.timing(animation, {
            toValue: 1,
            duration: 1500,
        }).start(({ finished }) => {
            if(finished) {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200
                }).start()
            }
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={startProgress}>
                <View style={styles.button}>
                    <View style={StyleSheet.absoluteFill}>
                        <Animated.View style={[styles.progress, progressStyles]} />
                        <Text style={styles.buttonText}>Get it!</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#e6537d",
        height: 50,
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 60,
        paddingVertical: 10,
        overflow: "hidden"
    },
    buttonText: {
        color: "#FFF",
        fontSize: 24,
        backgroundColor: "transparent",
        textAlign: 'center'
    },
    progress: {
        position: "absolute",
        left: 0,
        top: 0,
    }
})