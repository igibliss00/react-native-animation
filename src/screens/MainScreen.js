import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Animated,
} from 'react-native'
import { Button } from 'react-native-elements'

const buttons = ["Scroll", "Decay", "Add", "Parallel", "Sequence", "Interpolate", "CreateAnimated", "D3Number", "D3Path", "SVG", 
    "Flubber", "Cliff", "Corner", "Card", "Stagger", "Progress", "Notification", "Question", "Photo", "Icon", "Intro", "Button",
]

const Main = ({ navigation }) => {
    const [animation] = useState(new Animated.Value(0))
    
    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 500,
        }).start()
    }, [])

    const AnimatedButton = Animated.createAnimatedComponent(Button)
    const translateYInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0]
    })

    const buttonStyle = {
        transform: [
            {
                scale: animation
            },
            // {
            //     translateY: translateYInterpolate
            // }
        ]
    }
    return (
        <View style={styles.container}>
            {buttons.map(button => {
                return(
                    <AnimatedButton
                        key={button}
                        title={button}
                        onPress={() => navigation.navigate(button)}
                        style={[styles.button, buttonStyle]}
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    button: {
        width: 300,
        margin: 5,
    }
})

export default Main


    // return (
    //     <View style={styles.container}>
    //         <Button 
    //             title="Scroll"
    //             onPress={() => navigation.navigate("Scroll")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Decay"
    //             onPress={() => navigation.navigate("Decay")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Add"
    //             onPress={() => navigation.navigate("Add")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Parallel"
    //             onPress={() => navigation.navigate("Parallel")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Sequence"
    //             onPress={() => navigation.navigate("Sequence")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Interpolate"
    //             onPress={() => navigation.navigate("Interpolate")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="CreateAnimated"
    //             onPress={() => navigation.navigate("CreateAnimated")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="D3Number"
    //             onPress={() => navigation.navigate("D3Number")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="D3Path"
    //             onPress={() => navigation.navigate("D3Path")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="SVG"
    //             onPress={() => navigation.navigate("SVG")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Flubber"
    //             onPress={() => navigation.navigate("Flubber")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Cliff"
    //             onPress={() => navigation.navigate("Cliff")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Corner"
    //             onPress={() => navigation.navigate("Corner")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Card"
    //             onPress={() => navigation.navigate("Card")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Stagger"
    //             onPress={() => navigation.navigate("Stagger")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Progress"
    //             onPress={() => navigation.navigate("Progress")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Notification"
    //             onPress={() => navigation.navigate("Notification")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Question"
    //             onPress={() => navigation.navigate("Question")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Photo"
    //             onPress={() => navigation.navigate("Photo")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Icon"
    //             onPress={() => navigation.navigate("Icon")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Intro"
    //             onPress={() => navigation.navigate("Intro")}
    //             style={styles.button}
    //         />   
    //         <Button 
    //             title="Button"
    //             onPress={() => navigation.navigate("Button")}
    //             style={styles.button}
    //         />   
    //     </View>
    // )