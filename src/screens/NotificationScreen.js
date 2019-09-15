import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    TextInput,
    Animated,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

export default Notification = () => {
    const [value, setValue] = useState('')
    const [notification, setNotification] = useState('')
    const [offset] = useState(new Animated.Value(0))
    const [opacity] = useState(new Animated.Value(0))
    const [height, setHeight] = useState('')
    const notificationRef = useRef(null)
    useEffect(() => {
        notificationRef.current.getNode().measure((x, y, width, height, pageX, pageY) => {
            offset.setValue(height * -1)
            setHeight(height)
        })
    }, [value])

    const handlePress = () => {
        setNotification(value)
        Animated.sequence([
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                }),
                Animated.timing(offset, {
                    toValue: 0,
                    duration: 500,
                })
            ]),
            Animated.delay(1500),
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 500,
                }),
                Animated.timing(offset, {
                    toValue: height * -1,
                    duration: 500
                })
            ])
        ]).start()
    }

    const notificationStyle = {
        opacity,
        transform: [
            {
                translateY: offset
            }
        ]
    }

    return(
        <View style= {styles.container} >
            <Animated.View
                style={[ styles.notification, notificationStyle ]}
                ref={notificationRef}
            >
                <Text style={styles.notificationText}>
                    {notification}
                </Text>
            </Animated.View>
            <View>
                <TextInput 
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
                />
                <TouchableOpacity onPress={handlePress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Show Notification </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notification: {
        position: "absolute",
        paddingHorizontal: 7,
        paddingVertical: 15,
        left: 0,
        top: 0,
        right: 0,
        backgroundColor: "tomato",
    },
    notificationText: {
        color: '#FFF',
    },
    button: {
        backgroundColor: 'tomato',
        padding: 15,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center'
    },
    input: {
        width: 250,
        height: 40,
        padding: 5,
        borderWidth: 1,
        borderColor: '#CCC',
    }
})