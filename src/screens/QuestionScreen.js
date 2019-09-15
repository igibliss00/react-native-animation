import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'

const questions = [
    "Do you tend to follow directions when given?",
    "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
    "Would you enjoy making sure your customers leave happy?",
    "Are you willing to work nights and weekends (and possibly holidays)?",
]

export default Question = () => {
    const [animation] = useState(new Animated.Value(0))
    const [progress] = useState(new Animated.Value(0))
    const [index, setIndex] = useState(0)

    useEffect(() => {
        animation.setValue(0)
        console.log("i'm run")
    }, [index])
    
    const question = questions[index]
    if(index + 1 < questions.length) {
        nextQuestion = questions[index + 1]
    }

    const handleAnswer = () => {
        Animated.parallel([
            Animated.timing(progress, {
                toValue: index + 1,
                duration: 400,
            }),
            Animated.timing(animation, {
                toValue: 1,
                duration: 400,
            })
        ]).start(() => {
            setIndex(prev => prev + 1)
        })
    }

    const reset = () => {
        animation.setValue(0)
        progress.setValue(0)
        setIndex(0)
    }

    const { width } = Dimensions.get("window")
    const nextQuestionInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [width, 0]
    })

    const mainQuestionInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -width],
    })

    const progressInterpolate = progress.interpolate({
        inputRange: [0, questions.length],
        outputRange: ["0%", "100%"]
    })

    const mainQuestionStyle = {
        transform: [
            {
                translateX: mainQuestionInterpolate
            }
        ]
    }

    const nextQuestionStyle = {
        transform: [
            {
                translateX: nextQuestionInterpolate
            }
        ]
    }

    const progressStyle = {
        width: progressInterpolate
    }

    return (
        <View style={styles.container}>
            <View style={[styles.overlay, StyleSheet.absoluteFill]}>
                <Animated.View style={[styles.questionText, mainQuestionStyle]} >
                    <Text style={styles.optionText}>{question}</Text>
                </Animated.View>
                <Animated.View style={[styles.questionText, nextQuestionStyle]}>
                    <Text style={styles.optionText}>{nextQuestion}</Text>
                </Animated.View>
                <View style={styles.progress}>
                    <Animated.View style={[styles.bar, progressStyle]} />
                </View>
            </View>
            <TouchableOpacity 
                style={styles.option}
                onPress={handleAnswer}
                activeOpacity={0.7}                
            >
                <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.option, styles.yes]}
                onPress={handleAnswer}  
                activeOpacity={0.7}                
            >
                <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={reset}>
                <Text style={styles.close}>X</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E22D4B",
        flexDirection: 'row',
    },
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    option: {
        flex: 1, 
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    questionText: {
        fontSize: 30,
        color: "#FFF",
        textAlign: "center",
        position: "absolute",    
    },
    progress: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height: 10,
    },
    bar: {
        height: "100%",
        backgroundColor: "#FFF",
    },    
    optionText: {
        fontSize: 30,
        color: "#FFF",
        marginBottom: 50,
    },
    yes: {
        backgroundColor: "rgba(255,255,255,.1)",
    },
    close: {
        position: "absolute",
        top: 30,
        right: 30,
        backgroundColor: "transparent",
        color: 'white',
        fontSize: 20,
    },    
})