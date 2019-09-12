import React, { useState } from 'react'
import {
    Animated,
    View,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'

export default Corner = () => {
    const [animation] = useState(new Animated.ValueXY())
    const [_width, setWidth] = useState()
    const [_height, setHeight] = useState()

    const startAnimation = () => {
        const { width, height } = Dimensions.get("window")
        Animated.sequence([
            Animated.spring(animation.y, {
                toValue: height - _height
            }),
            Animated.spring(animation.x, {
                toValue: width - _width
            }),
            Animated.spring(animation.y, {
                toValue: 0
            }),
            Animated.spring(animation.x, {
                toValue: 0
            })
        ]).start()
    }
    const saveDimensions = e => {
        setWidth(e.nativeEvent.layout.width)
        setHeight(e.nativeEvent.layout.height)
    }

    const animatedStyle = {
        transform: animation.getTranslateTransform()
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback 
                onPress={startAnimation}
                onLayout={saveDimensions}
            >
                <Animated.View style={[styles.box, animatedStyle]} />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        width: 150,
        height: 150,
        backgroundColor: 'tomato'
    }
})