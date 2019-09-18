import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Animated,
    ScrollView,
    Dimensions,
    PixelRatio,
} from 'react-native'
import * as Images from "../images";

const getScreen1Styles = (animation, width) => {
    const image2TranslateX = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, -200],
        extrapolate: "clamp",
    })
    return {
        image2: {
            transform: [
                {
                    translateX: image2TranslateX
                }
            ]
        }
    }
}

const getScreen2Styles = (animation, width) => {
    const inputRange = [0, width, width * 2]
    const image2TranslateY = animation.interpolate({
        inputRange,
        outputRange: [200, 0, -200],
        extrapolate: "clamp",
    })
    const image2Opacity = animation.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
        extrapolate: "clamp"
    })

    return {
        image2: {
            opacity: image2Opacity,
            transform: [
                {
                    translateY: image2TranslateY
                }
            ]
        }
    }
}

const getScreen3Styles = (animation, width) => {
    const inputRange = [width, width * 2, width * 3]
    const image1Scale = animation.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
        exptrapolate: "clamp"
    })
    const image2Rotate = animation.interpolate({
        inputRange,
        outputRange: ["-360deg", "0deg", "360deg"],
        exptrapolate: "clamp",
    })

    return {
        image1: {
            transform: [
                {
                    scale: image1Scale,
                }
            ]
        },
        image2: {
            transform: [
                {
                    scale: image1Scale,
                },
                {
                    rotate: image2Rotate,
                }
            ]
        }
    }
}

export default Intro = () => {
    const [animation] = useState(new Animated.Value(0))
    const { width, height } = Dimensions.get("window")
    const screen1Styles = getScreen1Styles(animation, width)
    const screen2Styles = getScreen2Styles(animation, width)
    const screen3Styles = getScreen3Styles(animation, width)
    
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                pagingEnabled
                horizontal
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                x: animation,
                            }
                        }
                    }
                ])}
            >
                <View style={{ width, height, backgroundColor: "#F89E20" }}>
                    <View style={styles.screenHeader}>
                        <Animated.Image 
                            source={Images.Image1}
                            style={{
                                width: PixelRatio.getPixelSizeForLayoutSize(200),
                                height: PixelRatio.getPixelSizeForLayoutSize(150)
                            }}
                            resizeMode="contain"
                        />
                    
                        <Animated.Image 
                            source={Images.Image2}
                            style={[
                                {
                                    width: PixelRatio.getPixelSizeForLayoutSize(75),
                                    height: PixelRatio.getPixelSizeForLayoutSize(63),
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%"
                                },
                                screen1Styles.image2
                            ]}
                            resizeMode="contain"
                        />
                        <Animated.Image 
                            source={Images.Image3}
                            style={{
                                width: PixelRatio.getPixelSizeForLayoutSize(75),
                                height: PixelRatio.getPixelSizeForLayoutSize(63),
                                position: "absolute",
                                top: "30%",
                                left: "35%",
                            }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.screenText} >
                        <Text></Text>
                    </View>
                </View>

                <View style={{ width, height, backgroundColor: "#F89E20" }}>
                    <View style={styles.screenHeader}>
                        <Animated.Image 
                            source={Images.Image1}
                            style={{
                                width: PixelRatio.getPixelSizeForLayoutSize(200),
                                height: PixelRatio.getPixelSizeForLayoutSize(150)
                            }}
                            resizeMode="contain"
                        />
                        <Animated.Image
                            source={Images.Image2}
                            style={[
                                {
                                    width: PixelRatio.getPixelSizeForLayoutSize(75),
                                    height: PixelRatio.getPixelSizeForLayoutSize(63),
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%"
                                },
                                screen2Styles.image2,
                            ]}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.screenText}>
                        <Text></Text>
                    </View>
                </View>

                <View style={{ width, height, backgroundColor: "#F89E20" }}>
                    <View style={styles.screenHeader}>
                        <Animated.Image
                            source={Images.Image1}
                            style={[
                            {
                                width: PixelRatio.getPixelSizeForLayoutSize(200),
                                height: PixelRatio.getPixelSizeForLayoutSize(150),
                            },
                                screen3Styles.image1,
                            ]}
                            resizeMode="contain"
                        />

                        <Animated.Image
                            source={Images.Image2}
                            style={[
                                {
                                    width: PixelRatio.getPixelSizeForLayoutSize(75),
                                    height: PixelRatio.getPixelSizeForLayoutSize(63),
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                },
                                screen3Styles.image2,
                            ]}
                            resizeMode="contain"
                        />
                        <Animated.Image
                            source={Images.Image3}
                            style={{
                                width: PixelRatio.getPixelSizeForLayoutSize(75),
                                height: PixelRatio.getPixelSizeForLayoutSize(63),
                                position: "absolute",
                                top: "40%",
                                left: "40%",
                            }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.screenText}>
                        <Text></Text>
                    </View>
                </View>                    
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenText: {
        flex: 1,
    }
})

