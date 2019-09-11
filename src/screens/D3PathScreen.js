import 
    React, 
    { 
        useState,
        useRef,
        useEffect,
    } from 'react'
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated
} from 'react-native'
import Svg, { Path } from "react-native-svg"
import { interpolatePath } from 'd3-interpolate-path'

const startPath = `M45,50a5,5 0 1,0 10,0a5,5 0 1,0 -10,0`
const endPath = `M20,50a30,30 0 1,0 60,0a30,30 0 1,0 -60,0`

export default D3Path = () => {
    const [animation] = useState(new Animated.Value(0))
    const pathRef = useRef(null)
    const pathInterpolate = interpolatePath(startPath, endPath)
    useEffect(() => {
        animation.addListener(({ value }) => {
            const path = pathInterpolate(value)
            pathRef.current.setNativeProps({
                d: path
            })
        })
    }, [pathRef.current, pathInterpolate])
    const pressHandler = () => {
        Animated.sequence([
            Animated.timing(animation, {
                toValue: 1,
                duration: 500,
            }),
            Animated.delay(1500),
            Animated.timing(animation, {
                toValue: 0,
                duration: 500
            }),
        ]).start();
    };
      
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={pressHandler}>
                <Svg width={150} height={150}>
                    <Path d={startPath} stroke="black" ref={pathRef} />
                </Svg>
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
})