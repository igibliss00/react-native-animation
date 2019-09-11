import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { Button } from 'react-native-elements'

const Main = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button 
                title="Scroll"
                onPress={() => navigation.navigate("Scroll")}
                style={styles.button}
            />   
            <Button 
                title="Decay"
                onPress={() => navigation.navigate("Decay")}
                style={styles.button}
            />   
            <Button 
                title="Add"
                onPress={() => navigation.navigate("Add")}
                style={styles.button}
            />   
            <Button 
                title="Parallel"
                onPress={() => navigation.navigate("Parallel")}
                style={styles.button}
            />   
            <Button 
                title="Sequence"
                onPress={() => navigation.navigate("Sequence")}
                style={styles.button}
            />   
            <Button 
                title="Interpolate"
                onPress={() => navigation.navigate("Interpolate")}
                style={styles.button}
            />   
            <Button 
                title="CreateAnimated"
                onPress={() => navigation.navigate("CreateAnimated")}
                style={styles.button}
            />   
            <Button 
                title="D3Number"
                onPress={() => navigation.navigate("D3Number")}
                style={styles.button}
            />   
            <Button 
                title="D3Path"
                onPress={() => navigation.navigate("D3Path")}
                style={styles.button}
            />   
            <Button 
                title="SVG"
                onPress={() => navigation.navigate("SVG")}
                style={styles.button}
            />   
            <Button 
                title="Flubber"
                onPress={() => navigation.navigate("Flubber")}
                style={styles.button}
            />   
            <Button 
                title="Cliff"
                onPress={() => navigation.navigate("Cliff")}
                style={styles.button}
            />   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 45,
        margin: 5,
    }
})

export default Main
