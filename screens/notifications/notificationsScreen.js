import React, { useState, useRef, useCallback } from 'react';
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Animated,
    Dimensions,
    BackHandler
} from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const rowTranslateAnimatedValues = {};

const NotificationScreen = ({ navigation, route }) => {

    const from = route ? route.params.from : 'bottom';

    const backAction = () => {
        from == 'profile'
            ?
            navigation.pop()
            :
            BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(
        [
            {
                key: '1',
                name: 'Order Placed',
                iconName: 'truck',
                description: 'Your order placed successfully.OrderId:OID1256789.',

            },
            {
                key: '2',
                name: '25% Off use code CourierPro25',
                iconName: 'tag',
                description: 'Use code CourierPro25 for your order between 20th sept to 25th sept and get 25% off.',
            },
            {
                key: '3',
                name: 'Flat $10 Off',
                iconName: 'tag',
                description: 'Use code CPro10 and get $10 off on your order.',
            },
        ],
    );

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if ((value < -width || value > width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setListData(newData);

                setShowSnackBar(true);

                setSnackBarMsg(`${removedItem.name} dismissed`);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 120],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={styles.notificationWrapStyle}>
                    <View style={styles.notificationIconWrapStyle}>
                        <FontAwesome5 name={data.item.iconName} size={25} color={Colors.whiteColor} />
                    </View>
                    <View style={styles.notificationDescriptionStyle}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor18Medium }}>
                            {data.item.name}
                        </Text>
                        <Text numberOfLines={3} style={{
                            ...Fonts.grayColor16Medium,
                            lineHeight: 20.0,
                            marginTop: Sizes.fixPadding - 5.0
                        }}>
                            {data.item.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                {from == 'profile' ?
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="black"
                        onPress={() => navigation.pop()}
                    /> :
                    null
                }
                <Text style={{ ...Fonts.blackColor19Medium, marginLeft: Sizes.fixPadding }}>
                    Notifications
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={styles.container}>
                {header()}
                {listData.length == 0 ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.whiteColor }}>
                        <Ionicons name="ios-notifications-off-outline" size={70} color="gray" />
                        <Text style={{ ...Fonts.grayColor18Medium, marginTop: Sizes.fixPadding - 5.0 }}>
                            No Notifications
                        </Text>
                    </View>
                    :
                    <SwipeListView
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-width}
                        leftOpenValue={width}
                        onSwipeValueChange={onSwipeValueChange}
                        useNativeDriver={false}
                    />
                }
                <Snackbar
                    style={{ bottom: from == 'profile' ? -10.0 : 50.0, ...styles.snackBarStyle }}
                    visible={showSnackBar}
                    onDismiss={() => setShowSnackBar(false)}
                >
                    {snackBarMsg}
                </Snackbar>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        marginBottom: Sizes.fixPadding,
    },
    notificationWrapStyle: {
        height: 105.0,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 2.0,
        paddingLeft: Sizes.fixPadding,
    },
    notificationIconWrapStyle: {
        height: 85.0,
        width: 85.0,
        backgroundColor: '#F57C00',
        borderRadius: 42.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: Colors.whiteColor,
        flex: 1,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        marginVertical: Sizes.fixPadding - 2.0,
    },
    notificationDescriptionStyle: {
        marginLeft: Sizes.fixPadding * 2.0,
        width: width - 170,
        justifyContent: 'center',
        height: 120.0,
        paddingVertical: Sizes.fixPadding + 3.0
    },
    snackBarStyle: {
        position: 'absolute',
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    }
});

export default NotificationScreen;