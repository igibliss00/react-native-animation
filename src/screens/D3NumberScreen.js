import 
    React, 
    { 
        useState, 
        useEffect,
        useRef
    } from 'react'
import {
    View,
    Animated,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'
import {
    interpolateNumber,
    interpolateRgb, 
} from 'd3-interpolate'

export default d3number = () => {
    const [animation] = useState(new Animated.Value(0))
    const [position, setPosition] = useState()
    const someRef = useRef(null)
    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1500,
        }).start()
    }

    const positionInterpolate = interpolateNumber(0, 300)
    useEffect(() => {
        if (!someRef.current) {
            return;
        }
        animation.addListener(({value}) => {
            const style = [
                styles.box, 
                {
                    transform: [
                        {
                            translateY: positionInterpolate(value)
                        }
                    ]
                }
            ]
            someRef.current.setNativeProps({ style })            
        })
 
        // console.log(someRef.setNativeProps)
    }, [someRef.current])

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={startAnimation}>
                <View 
                    style={styles.box}
                    ref={someRef}
                />
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
        height: 150,
        width: 150,
        backgroundColor: 'tomato'
    }
})