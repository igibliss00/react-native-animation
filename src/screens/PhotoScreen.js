import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native'

const images = [
    'https://images.unsplash.com/photo-1568473648251-3a0c3aa56192?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1067&q=80',
    'https://images.unsplash.com/photo-1558980394-0a06c4631733?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1568442258448-3247f8a7d7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1063&q=80',
    'https://images.unsplash.com/photo-1568473404506-613059912446?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80',
    'https://images.unsplash.com/photo-1568417854236-4a8c5043d34e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
    'https://images.unsplash.com/photo-1548291617-04093af8d3ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80',
    'https://images.unsplash.com/flagged/photo-1568383966930-6dad5d261343?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1568383964644-63dfaf2e36e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1568467020752-b08fbd48e878?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1561932850-4b65ce092609?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1552954277-a32bc2de3c38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',    
]

export default Photo = () => {
    const [animation] = useState(new Animated.Value(0))
    const [position] = useState(new Animated.ValueXY())
    const [coords, setCoords] = useState({
        x: null,
        y: null,
        width: null,
        height: null,
    })
    const [size] = useState(new Animated.ValueXY())
    const [activeIndex, setActiveIndex] = useState()
    const [activeImage, setActiveImage] = useState(null)
    const gridImages = useRef(images.map(React.createRef))
    const viewImage = useRef(null)

    // useEffect(() => {
    //     viewImage.current.measure((tX, tY, tWidth, tHeight, tPageX, tPageY) => {
    //         Animated.parallel([
    //             Animated.spring(position.x, {
    //                 toValue: tPageX
    //             }),
    //             Animated.spring(position.y, {
    //                 toValue: tPageY
    //             }),
    //             Animated.spring(size.x, {
    //                 toValue: tWidth,
    //             }),
    //             Animated.spring(size.y, {
    //                 toValue: tHeight
    //             }),
    //             Animated.spring(animation, {
    //                 toValue: 1,
    //             })
    //         ]).start()
    //     })
    // }, [activeImage, activeIndex])

    const activeIndexStyle = {
        opacity: activeImage ? 0: 1
    }

    const handleOpenImage = index => {
        gridImages.current[index].current.getNode().measure((x, y, width, height, pageX, pageY) => {
            setCoords({ x, y, width, height })
            position.setValue({
                x: pageX,
                y: pageY,
            })

            size.setValue({
                x: width,
                y: height,
            })
            setActiveImage(images[index])
            setActiveIndex(index)
        })
        viewImage.current.measure((tX, tY, tWidth, tHeight, tPageX, tPageY) => {
            Animated.parallel([
                Animated.spring(position.x, {
                    toValue: tPageX,
                }),
                Animated.spring(position.y, {
                    toValue: tPageY - 68,
                }),
                Animated.spring(size.x, {
                    toValue: tWidth,
                }),
                Animated.spring(size.y, {
                    toValue: tHeight,
                }),
                Animated.spring(animation, {
                    toValue: 1,
                }),
            ]).start();
        })
    }
    const animatedContentTranslate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [300, 0]
    })

    const animatedContentStyle = {
        opacity: animation,
        transform: [
            {
                translateY: animatedContentTranslate
            }
        ]
    }

    const activeImageStyle = {
        width: size.x,
        height: size.y,
        top: position.y,
        left: position.x,
    }
  
    handleClose = () => {
        Animated.parallel([
            Animated.timing(position.x, {
                toValue: coords.x,
                duration: 250,
            }),
            Animated.timing(position.y, {
                toValue: coords.y,
                duration: 250,
            }),
            Animated.timing(size.x, {
                toValue: coords.width,
                duration: 250,
            }),
            Animated.timing(size.y, {
                toValue: coords.height,
                duration: 250,
            }),
            Animated.timing(animation, {
                toValue: 0,
                duration: 250,
            }),
            ]).start(() => {
            setActiveImage(null)
        });
    };
    

    const animatedClose = {
        opacity: animation
    }

    return (
        <View style={styles.container} >
            <ScrollView style={styles.container} >
                <View style={styles.grid}>
                    {images.map((src, index) => {
                        const style = index === activeIndex ? activeIndexStyle : undefined
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => handleOpenImage(index)}>
                                <Animated.Image 
                                    source={{ uri: src }}
                                    style={[ styles.gridImage, style ]}
                                    ref={gridImages.current[index]}
                                />
                            </TouchableWithoutFeedback>
                        )
                    })}
                </View>
            </ScrollView>
            <View 
                style={[StyleSheet.absoluteFill, styles.container]}
                pointerEvents={activeImage ? 'auto' : 'none'}
            >
                <View style={styles.topContent} ref={viewImage}>
                    <Animated.Image 
                        key={activeImage}
                        source={{ uri: activeImage }}
                        resizeMode='cover'
                        style={[styles.viewImage, activeImageStyle]}
                    />
                </View>
                <Animated.View
                    style={[styles.content, animatedContentStyle]}
                >
                    <Text style={styles.title}>Image Title</Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis interdum
                        porttitor. Nam lorem justo, aliquam id feugiat quis, malesuada sit amet massa. Sed
                        fringilla lorem sit amet metus convallis, et vulputate mauris convallis. Donec
                        venenatis tincidunt elit, sed molestie massa. Fusce scelerisque nulla vitae mollis
                        lobortis. Ut bibendum risus ac rutrum lacinia. Proin vel viverra tellus, et venenatis
                        massa. Maecenas ac gravida purus, in porttitor nulla. Integer vitae dui tincidunt,
                        blandit felis eu, fermentum lorem. Mauris condimentum, lorem id convallis fringilla,
                        purus orci viverra metus, eget finibus neque turpis sed turpis.
                    </Text>
                </Animated.View>
                <TouchableWithoutFeedback onPress={handleClose}>
                    <Animated.View style={[ styles.close, animatedClose ]}>
                        <Text style={styles.closeText}>X</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    gridImage: {
        width: "33%",
        height: 200,
    },
    viewImage: {
        width: null,
        height: null,
        position: "absolute",
        top: 0, 
        left: 0,
    },
    topContent: {
        flex: 2,
    },
    content: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    title: {
        fontSize: 28,
    },
    close: {
        position: "absolute",
        top: 20,
        right: 20,
    },
    closeText: {
        backgroundColor: "transparent",
        fontSize: 28,
        color: "#FFF",
    },
});
  
  