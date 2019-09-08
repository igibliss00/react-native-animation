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
        height: 50,
        margin: 5,
    }
})

export default Main
