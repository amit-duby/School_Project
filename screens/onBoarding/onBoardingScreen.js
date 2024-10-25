import React, { useRef, useState, useCallback } from 'react';
import {
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Animated,
    Text,
    View,
    Image,
    StyleSheet,
    BackHandler,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constant/styles';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

const quotes = [
    {
        image: require('../../assets/images/onboarding/1.jpg'),
        title: 'Welcome To School ERP',
        descriptions: 'All School Related Functions in One Place.',
    },
    {
        image: require('../../assets/images/onboarding/2.jpg'),
        title: 'Student Progress Tracking',
        descriptions: 'Track Your Children Progress Easily.',
    },
    {
        image: require('../../assets/images/onboarding/3.jpg'),
        title: 'Parent-Teacher Communication',
        descriptions: 'Stay Connected with Your Children Teacher.',
    }
];

const Circle = ({ navigation, onPress, index, quotes, animatedValue, animatedValue2 }) => {
    const { initialBgColor, nextBgColor, bgColor } = colors[index];
    const inputRange = [0, 0.001, 0.5, 0.501, 1];
    const backgroundColor = animatedValue2.interpolate({
        inputRange,
        outputRange: [
            initialBgColor,
            initialBgColor,
            initialBgColor,
            bgColor,
            bgColor,
        ],
    });
    const dotBgColor = animatedValue2.interpolate({
        inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
        outputRange: [
            bgColor,
            bgColor,
            bgColor,
            initialBgColor,
            initialBgColor,
            nextBgColor,
        ],
    });

    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFillObject,
                styles.container,
                { backgroundColor },
            ]}
        >
            {
                index == 2
                    ?
                    <Text
                        onPress={onPress}
                        style={styles.startAndSkipTextStyle}>
                        Start
                    </Text>
                    :
                    <Text
                        onPress={() => navigation.push('CreateAccount')}
                        style={styles.startAndSkipTextStyle}
                    >
                        Skip
                    </Text>
            }
            <Animated.View
                style={[
                    styles.circle,
                    {
                        backgroundColor: dotBgColor,
                        transform: [
                            { perspective: 200 },
                            {
                                rotateY: animatedValue2.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: ['0deg', '-90deg', '-180deg'],
                                }),
                            },
                            {
                                scale: animatedValue2.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [1, 6, 1],
                                }),
                            },
                            {
                                translateX: animatedValue2.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [1, 0.5, 1],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <TouchableOpacity
                    onPress={index == 2 ? () => navigation.push('CreateAccount') : onPress}
                >
                    <Animated.View
                        style={[
                            styles.button,
                            {
                                transform: [
                                    {
                                        scale: animatedValue.interpolate({
                                            inputRange: [0, 0.05, 0.5, 1],
                                            outputRange: [1, 0, 0, 1],
                                        }),
                                    },
                                    {
                                        rotateY: animatedValue.interpolate({
                                            inputRange: [0, 0.5, 0.9, 1],
                                            outputRange: ['0deg', '180deg', '180deg', '180deg'],
                                        }),
                                    },
                                ],
                                opacity: animatedValue.interpolate({
                                    inputRange: [0, 0.05, 0.9, 1],
                                    outputRange: [1, 0, 0, 1],
                                }),
                            },
                        ]}
                    >
                        <AnimatedAntDesign name='arrowright' size={28} color={'white'} />
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
};

const colors = [
    // {
    //     initialBgColor: Colors.skyBlueColor,
    //     bgColor: Colors.skyBlueColor,
    //     nextBgColor: '#9FC3EA',
    // },
    // {
    //     initialBgColor: Colors.primaryColor,
    //     bgColor: Colors.primaryColor,
    //     nextBgColor: Colors.primaryColor,
    // },
    // {
    //     initialBgColor: Colors.orangeColor,
    //     bgColor: Colors.purpleColor,
    //     nextBgColor: Colors.orangeColor,
    // },
    {
        initialBgColor: '#A36562',
        bgColor: '#E57373',
        nextBgColor: '#A36562',
    },
    {
        initialBgColor: '#E91E63',
        bgColor: '#E57373',
        nextBgColor: '#E91E63',
    },
    {
        initialBgColor: '#E57373',
        bgColor: '#E91E63',
        nextBgColor: '#E57373',
    },
];

const OnboardingScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedValue2 = useRef(new Animated.Value(0)).current;
    const sliderAnimatedValue = useRef(new Animated.Value(0)).current;
    const inputRange = [...Array(quotes.length).keys()];
    const [index, setIndex] = useState(0);
    const [onCirclePress, setOnCirclePress] = useState(false);

    setTimeout(function () {
        if (onCirclePress) {
            setTimeout(() => {
                setOnCirclePress(false);
            }, 2000);
        }
        else {
            onPress()
        }
    }, 5000);

    const animate = (i) =>
        Animated.parallel([
            Animated.timing(sliderAnimatedValue, {
                toValue: i,
                duration: TEXT_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue2, {
                toValue: 1,
                duration: DURATION,
                useNativeDriver: false,
            }),
        ]);

    const onPress = () => {
        animatedValue.setValue(0);
        animatedValue2.setValue(0);
        animate((index + 1) % colors.length).start();
        setIndex(index != 2 ? index + 1 : 0);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <Circle
                index={index}
                onPress={() => {
                    setOnCirclePress(true)
                    onPress()
                }}
                animatedValue={animatedValue}
                animatedValue2={animatedValue2}
                navigation={navigation}
            />
            <Animated.View
                style={{
                    flexDirection: 'row',
                    transform: [
                        {
                            translateX: sliderAnimatedValue.interpolate({
                                inputRange,
                                outputRange: quotes.map((_, i) => -i * width * 2),
                            }),
                        },
                    ],
                    opacity: sliderAnimatedValue.interpolate({
                        inputRange: [...Array(quotes.length * 2 + 1).keys()].map(
                            (i) => i / 2
                        ),
                        outputRange: [...Array(quotes.length * 2 + 1).keys()].map((i) =>
                            i % 2 === 0 ? 1 : 0
                        ),
                    }),
                }}
            >
                {quotes.map(({ title, descriptions, image }, i) => {
                    return (
                        <View style={{ paddingRight: width, width: width * 2, }} key={i}>
                            <Image
                                source={image}
                                style={{ alignSelf: 'center', width: 200.0, height: 200.0, }}
                                resizeMode="contain"
                            />
                            <Text style={{ marginVertical: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.whiteColor22Regular }}>
                                {title}
                            </Text>
                            <Text style={styles.descriptionTextStyle}>
                                {descriptions}
                            </Text>
                            <View style={styles.pageIndicatorWrapStyle}>
                                {indicator({ pageIndex: 0 })}
                                {indicator({ pageIndex: 1 })}
                                {indicator({ pageIndex: 2 })}

                            </View>
                        </View>
                    );
                })}
            </Animated.View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </View>
    );

    function indicator({ pageIndex }) {
        return (
            index == pageIndex
                ?
                <View style={styles.activeIndicatorStyle} />
                :
                <View style={styles.inactiveIndicatorStyle} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 8,
    },
    button: {
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        alignItems: 'flex-end',
        backgroundColor: 'turquoise',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    activeIndicatorStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderWidth: 2.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        borderColor: 'rgba(255,255,255,0.5)',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    inactiveIndicatorStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderWidth: 2.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    descriptionTextStyle: {
        fontSize: 16,
        color: "rgba(255,255,255,0.6)",
        textAlign: 'center',
        fontFamily: 'Mukta_Medium',
    },
    pageIndicatorWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 3.0,
    },
    startAndSkipTextStyle: {
        position: 'absolute',
        left: 20.0,
        bottom: 45.0,
        ...Fonts.whiteColor19Regular
    }
});

export default OnboardingScreen;