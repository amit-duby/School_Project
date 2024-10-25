import React, { useState } from 'react';
// import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, View, StatusBar, TextInput, TouchableOpacity, ScrollView, StyleSheet, Text, FlatList } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constant/styles";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Linking } from 'react-native';

// const Tab = createMaterialTopTabNavigator();

const NoticeBox = ({ enquiries, setEnquiries }) => {
    const [showNotice, setShowNotice] = useState(false);

    // const toggleNotice = () => {
    //     setShowNotice(!showNotice);
    // };
    const toggleNotice = (id) => {
        setEnquiries(prevNotices => {
            return prevNotices.map(notice => {
                if (notice.id === id) {
                    return { ...notice, showNotice: !notice.showNotice };
                } else {
                    return notice;
                }
            });
        });
    };


    const renderNoticeItem = ({ item }) => (
        <TouchableOpacity style={styles.noticeItem} onPress={() => toggleNotice(item.id)}>
            <Text style={styles.noticeTitle}>{item.routeName}</Text>
            {item?.showNotice && (
                <View style={styles.noticeDetails}>
                    <Text style={styles.noticeText}>{item.routeName}</Text>
                    {/* <Text style={styles.noticeDate}>{item.date}</Text> */}
                    <Text style={styles.noticeText}>Bus: {item.busName} ({item.busNumber})</Text>
                    <View style={styles.noticeDetails}>
                        {item?.stops?.map(stop => (
                            <View key={stop.id} style={styles.noticeText}>
                                <Text style={styles.noticeText}>{stop.name}</Text>
                                <Text style={styles.noticeTitle}>{stop.time}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            <FlatList
                data={enquiries}
                renderItem={renderNoticeItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const HostelRoomsScreen = ({ navigation }) => {
    const [enquiries, setEnquiries] = useState([
        {
            id: 1,
            busName: 'Blue Bus',
            busNumber: 'BUS-001',
            routeName: 'Route 1',
            stops: [
                {
                    id: 1,
                    name: 'School',
                    time: '7:30 AM'
                },
                {
                    id: 2,
                    name: 'Stop 1',
                    time: '7:45 AM'
                },
                {
                    id: 3,
                    name: 'Stop 2',
                    time: '8:00 AM'
                }
            ]
        },
        {
            id: 2,
            busName: 'Green Bus',
            busNumber: 'BUS-002',
            routeName: 'Route 2',
            stops: [
                {
                    id: 1,
                    name: 'School',
                    time: '7:15 AM'
                },
                {
                    id: 2,
                    name: 'Stop 1',
                    time: '7:30 AM'
                },
                {
                    id: 3,
                    name: 'Stop 2',
                    time: '7:45 AM'
                }
            ]
        },
    ]);

    return (
        <View style={{ flex: 1 }}>
            {backArrow()}
            <NoticeBox enquiries={enquiries} setEnquiries={setEnquiries} />
        </View>
    )

    function backArrow() {
        return (
            <View
                style={{
                    flexDirection: "row", alignItems: "center",
                    backgroundColor: Colors.primaryColor, elevation: 2
                }}
            >
                <View style={{ ...styles.backArrowWrapStyle }}>
                    <MaterialIcons
                        name="chevron-left"
                        color={Colors.whiteColor}
                        size={26}
                        onPress={() => navigation.pop()}
                    />
                </View>
                <Text style={{ ...Fonts.whiteColor20Regular }}>
                    Hostel Rooms
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    backArrowWrapStyle: {
        width: 40.0,
        height: 40.0,
        // borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: Sizes.fixPadding * 1.0,
        marginHorizontal: Sizes.fixPadding * 1.0,
        // borderWidth: 0.3,
        // borderColor: Colors.grayColor,
        marginBottom: 10,
    },

    // notice box style 
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    noticeItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    noticeTitle: {
        ...Fonts.blackColor16Medium,
    },
    noticeDetails: {
        marginTop: 8,
    },
    noticeText: {
        ...Fonts.grayColor16Medium,
        fontSize: 14,
        // margin: 2,
        // padding: 2
    },
    noticeDate: {
        fontSize: 12,
        color: '#888',
        margin: 2,
        padding: 2
    },
});

export default HostelRoomsScreen;