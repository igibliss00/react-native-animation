import 
    React, 
    { 
        useState,
        useEffect,
    } from 'react'
import {
    Animated,
    PanResponder,
    Dimensions,
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'

export default Cliff = () => {
    const [animation] = useState(new Animated.ValueXY())
    const [pan, setPanResponder] = useState({})
    useEffect(() => {
        const _panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                animation.extractOffset()
            },
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: animation.x,
                    dy: animation.y
                }
            ])
        })
        setPanResponder(_panResponder)
    }, [PanResponder, animation])

    const { height } = Dimensions.get("window")
    const inputRange = [0, height /2 - 50.01, height /2 - 50, height]
    const backgroundColorInterpolate = animation.y.interpolate({
        inputRange,
        outputRange: ["rgb(99,71,255)", "rgb(99,71,255)", "rgb(255,0,0)", "rgb(255,0,0)"],
    })
    const animatedStyles = {
        backgroundColor: backgroundColorInterpolate,
        transform: [...animation.getTranslateTransform()],
    }
    return (
        <View style={styles.container}>
            <View style={[styles.container, styles.top]} >
            </View>
            <View style={[styles.container]} >
            </View>
            <Animated.View 
                {...pan.panHandlers}
                style={[styles.box, animatedStyles]} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        height: 150,
        width: 150,
    },
    top: {
        borderBottomWidth: 1,
        borderBottomColor: "#AAA",           
    }
})