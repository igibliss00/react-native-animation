import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Animated,
    StyleSheet,
    Dimensions,
    PanResponder
} from 'react-native'
import clamp from 'clamp'

const SWIPE_THRESHOLD = 120
const { height } = Dimensions.get("window")

export default Card = () => {
    const [animation] = useState(new Animated.ValueXY())
    const [opacity] = useState(new Animated.Value(1))
    const [next] = useState(new Animated.Value(0.9))
    const [items, setItems] = useState([
            {
                image: 'https://images.unsplash.com/photo-1568302621993-8700d490546a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                id: 1,
                text: 'Interior deco #1'
            },
            {
                image: 'https://images.unsplash.com/photo-1552074702-778d9f94af99?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                id: 2,
                text: 'Interior deco #2'
            },
            {
                image: 'https://images.unsplash.com/photo-1568302621993-8700d490546a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                id: 3,
                text: 'Interior deco #3'
            },
            {
                image: 'https://images.unsplash.com/photo-1545083036-b175dd155a1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                id: 4,
                text: 'Interior deco #4'
            }
    ])
    const [_panResponder, setPanResponder] = useState({})
    useEffect(() => {
        const pan = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: animation.x,
                    dy: animation.y,
                }
            ]),
            onPanResponderRelease: (e, { dx, vx, vy }) => {
                let velocity;
                if (vx >= 0) {
                    velocity = clamp(vx, 3, 5)
                } else if (vx < 0) {
                    velocity = clamp(Math.abs(vx), 3, 5) * -1
                }

                if(Math.abs(dx) > SWIPE_THRESHOLD) {
                    Animated.decay(animation, {
                        velocity: { x: velocity, y: vy },
                        deceleration: 0.98,
                    }).start(transitionNext)
                } else {
                    Animated.spring(animation, {
                        toValue: { x: 0, y: 0},
                        friction: 4,
                    }).start()
                }
            }
        })
        setPanResponder(pan)
    }, [animation, transitionNext, Animated, setPanResponder])

    const rotateInterpolate = animation.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['-30deg', '0deg', '30deg'],
        extrapolate: 'clamp'
    })

    const opacityInterpolate = animation.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: [0.5, 1, 0.5]
    })

    const animatedCardStyles = {
        transform: [
            { 
                rotate: rotateInterpolate
            }, 
            ...animation.getTranslateTransform()
        ],
        opacity: opacityInterpolate,
    }

    const animatedImageStyles = {
        opacity: opacityInterpolate,
    }

    const transitionNext = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
            }),
            Animated.spring(next, {
                toValue: 1,
                friction: 4,
            }).start(() => {
                setItems(prev => prev.slice(1))                
            }, 
            () => {
                next.setValue(0.9)
                opacity.setValue(1)
                animation.setValue({ x: 0, y: 0 })
            })
        ])
    }
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                {items.slice(0, 2).reverse().map(({ image, id, text }, index, items) => {
                    const isLastItem = index === items.length - 1
                    const isSecondToLast = index === items.length - 2
                    
                    const panHandlers = isLastItem ? _panResponder.panHandlers : {}
                    const cardStyle = isLastItem ? animatedCardStyles : undefined
                    const imageStyle = isLastItem ? animatedImageStyles : undefined
                    const nextStyle = isSecondToLast 
                        ? { transform: [{ scale: next }]}
                        : undefined
                    return (
                        <Animated.View {...panHandlers} style={[ styles.card, cardStyle, nextStyle ]} key={id} >
                            <Animated.Image
                                source={{ uri: image }} 
                                style={[styles.image]}
                                resizeMode='cover'
                            />
                            <View style={styles.lowerText}>
                                <Text>
                                    {text}
                                </Text>
                            </View>
                        </Animated.View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: 300,
        height: 300,
        position: "absolute",
        borderRadius: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { x: 0, y: 0 },
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: "#FFF",
    },
    lowerText: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 5,
    },
    image: {
        height: null,
        width: null,
        flex: 3,
        borderRadius: 2,
    }
    
})