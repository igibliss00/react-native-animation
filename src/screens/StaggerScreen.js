import React, 
{ 
    useState, 
    useRef,
    useEffect
} from 'react'
import {
    View,
    ImageBackground,
    Text,
    TextInput,
    Animated,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export default Stagger = () => {
    const [email] = useState(new Animated.Value(0))
    const [password] = useState(new Animated.Value(0))
    const [button] = useState(new Animated.Value(0))
    const textRef = useRef(null)

    useEffect(() => {
        Animated.stagger(200, [
            Animated.timing(email, {
                toValue: 1,
                duration: 800,
            }),
            Animated.timing(password, {
                toValue: 1,
                duration: 800,
            }),
            Animated.timing(button, {
                toValue: 1,
                duration: 800,
            }),
        ]).start(() => {
            // textRef.current.getNode().focus()
        })
    }, [])
    const createAnimationStyle = animation => {
        const translateY = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [-5, 0],
        })
        return {
            opacity: animation,
            transform: [
                {
                    translateY,
                }
            ]
        }
    } 
    const emailStyle = createAnimationStyle(email)
    const passwordStyle = createAnimationStyle(password)
    const buttonStyle = createAnimationStyle(button)
    return (
        <View style={styles.container} >
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1471017851983-fc49d89c57c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}}
                resizeMode="cover"
                style={[ StyleSheet.absoluteFill, { width: null, height: null }]}
            >
                <View style={styles.container} />
                <KeyboardAvoidingView behavior="padding" style={styles.form}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Login </Text>
                        <AnimatedTextInput
                            ref={textRef}
                            style={[styles.input, emailStyle]}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                        <AnimatedTextInput
                            style={[styles.input, passwordStyle]}
                            placeholder="Password"
                            secureTextEntry
                        />
                        <TouchableOpacity>
                            <Animated.View style={[styles.button, buttonStyle]}>
                                <Text style={styles.buttonText}>Login</Text>
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView >
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        color: "#FFF",
        backgroundColor: "transparent",
        textAlign: "center",
        marginBottom: 10,
      },
    form: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,.25)",
        paddingVertical: 10,
    },
    input: {
        width: 250,
        height: 35,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#FFF",
        color: "#333",
        backgroundColor: "#FFF",
    },
    button: {
        marginTop: 10,
        backgroundColor: 'tomato',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
    }
})