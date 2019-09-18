import React, { useState, useRef } from 'react'
import {
    View,
    Text,
    Animated,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default ButtonScreen = () => {
    const [animation] = useState(new Animated.Value(0))
    const [open, setOpen] = useState(false)
    const { width, height } = Dimensions.get("window")
    const inputRef = useRef(null)

    const toggleTransform = () => {
        const toValue = open ? 0 : 1
        Animated.timing(animation, {
            toValue,
            duration: 550,
        }).start(() => {
            open ? inputRef.current.blur() : inputRef.current.focus()
            setOpen(!open)
        })
    }

    const widthInterpolate = animation.interpolate({
        inputRange: [0, 0.5],
        outputRange: [100, width - 40],
        extrapolate: "clamp",
    });
  
    const opacityToolbarInterpolate = animation.interpolate({
        inputRange: [0, 0.5],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });
  
    const toolbarStyles = {
        opacity: opacityToolbarInterpolate,
    };
  
    const editorHeightInputInterpolate = animation.interpolate({
        inputRange: [0.7, 1],
        outputRange: [0, 150],
        extrapolate: "clamp",
    });
  
    const editorStyle = {
        opacity: animation,
        height: editorHeightInputInterpolate,
    };
  
    const opacityButtonInterpolate = animation.interpolate({
        inputRange: [0, 0.5],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });
  
    const buttonStyles = {
        opacity: opacityButtonInterpolate,
    };
  
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.center} behavior="padding">
                <Animated.View style={[styles.editor, { width: widthInterpolate }]}>
                    <Animated.View style={styles.bar}>
                        <Animated.View style={[styles.toolbar, toolbarStyles]}>
                            <Icon name="format-bold" color="#FFF" size={20} />
                            <Icon name="format-italic" color="#FFF" size={20} />
                            <Icon name="format-underline" color="#FFF" size={20} />
                            <Icon name="format-list-bulleted" color="#FFF" size={20} />
                            <Icon name="format-list-numbered" color="#FFF" size={20} />
                            <View style={styles.rightInnerBar}>
                                <Icon name="link" color="#FFF" size={20} />
                                <Icon name="image" color="#FFF" size={20} />
                                <Icon name="arrow-down-bold-box" color="#FFF" size={20} />
                            </View>
                        </Animated.View>

                        <Animated.View
                            style={[StyleSheet.absoluteFill, styles.center, buttonStyles]}
                            pointerEvents={open ? "none" : "auto"}
                        >
                            <TouchableWithoutFeedback onPress={toggleTransform}>
                                <View>
                                    <Text style={styles.buttonText}>Write</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </Animated.View>
                    <Animated.View style={[styles.lowerView, editorStyle]}>
                        <TextInput
                            placeholder="Start writing..."
                            style={[StyleSheet.absoluteFill, styles.input]}
                            multiline
                            ref={inputRef}
                        />
                    </Animated.View>
                </Animated.View>
                <TouchableWithoutFeedback onPress={toggleTransform}>
                    <Animated.View style={toolbarStyles}>
                        <Text style={styles.close}>Close</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#FFF",
    },
    editor: {
        borderWidth: 1,
        borderColor: "rgba(0,0, 0, .1)",
    },
    bar: {
        backgroundColor: "#2979FF",
        height: 50,
        justifyContent: "center",
    },
    toolbar: {
        flexDirection: "row",
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
    },
    rightInnerBar: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end",
    },
    lowerView: {
        height: 150,
        overflow: "hidden",
    },
    input: {
        padding: 10,
        fontSize: 20,
    },
    close: {
        color: "#2979FF",
        marginTop: 10,
        marginBottom: 20
    },
    
})