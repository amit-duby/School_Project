import React, { useCallback, useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    RefreshControl,
    TouchableOpacity,
    FlatList
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import WorkList from "./WorkList";
import { Image } from "react-native";
import { __postApiData } from "../../utils/api";
import { useFocusEffect } from "@react-navigation/native";
import { TabView, TabBar } from "react-native-tab-view";

const { width } = Dimensions.get("screen");

const CalenderScreen = ({ navigation, route }) => {
    const { student_id } = route.params;
    const [state, setState] = useState({
        logoutDialog: false,
        tab: 0,
        subject: { id: "0", name: "All" },
        isShowSubject: false,
        subject_list: [],
        list: [],
        holidayList: [],
        activityList: [],
        PTMList: [],
        isLoading: false,
        isShowDate: false,
        date: new Date().toLocaleDateString(),
    });

    const { subject, tab, list, holidayList, activityList, PTMList, isLoading, date } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const __handleGetHolidayData = () => {
        updateState({ isLoading: true });
        __postApiData("/webservice/getHoliday", {
            student_id: student_id,
            year: "2024",
            month: "5"
        })
            .then((res) => {
                if (res?.response_code == 200) {
                    updateState({
                        holidayList: res?.data,
                        isLoading: false,
                    });
                } else {
                    updateState({ holidayList: [], isLoading: false });
                }
            })
            .catch((error) => {
                updateState({ holidayList: [], isLoading: false });
            });
    };

    const __handleGetActivityData = () => {
        updateState({ isLoading: true });
        __postApiData("/webservice/getActivitys", {
            student_id: student_id,
            year: "2024",
            month: "5"
        })
            .then((res) => {
                if (res?.response_code == 200) {
                    updateState({
                        activityList: res?.data,
                        isLoading: false,
                    });
                } else {
                    updateState({ activityList: [], isLoading: false });
                }
            })
            .catch((error) => {
                updateState({ activityList: [], isLoading: false });
            });
    };

    const __handleGetPTMData = () => {
        updateState({ isLoading: true });
        __postApiData("/webservice/getPtm", {
            student_id: student_id,
            year: "2024",
            month: "5"
        })
            .then((res) => {
                if (res?.response_code == 200) {
                    updateState({
                        PTMList: res?.data,
                        isLoading: false,
                    });
                } else {
                    updateState({ PTMList: [], isLoading: false });
                }
            })
            .catch((error) => {
                updateState({ PTMList: [], isLoading: false });
            });
    };

    useFocusEffect(
        useCallback(() => {
            updateState({ holidayList: [] });
            __handleGetHolidayData();
            return () => { };
        }, [tab, date])
    );

    useFocusEffect(
        useCallback(() => {
            __handleGetHolidayData();
            __handleGetPTMData();
            __handleGetActivityData();
            return () => { };
        }, [])
    );

    const data = [
        {
            "title": "Holi",
            "to_time": "03:03PM To 12:02PM",
            "m_date": "24/May/2024",
            "message": "Meesge for holi",
            "incharge": "Ajeet"
        },
        {
            "title": "gtrgvrtg",
            "to_time": "05:12AM To 05:12AM",
            "m_date": "24/May/2024",
            "message": "gtrgtvrgtrtt",
            "incharge": "tgtgtg"
        }
    ]
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle={"light-content"}
            />
            {header()}

            <View
                style={{
                    flex: 1,
                    paddingTop: 10,
                    backgroundColor: Colors.whiteColor,
                }}
            >
                {titleBox()}
                <View
                    style={{
                        backgroundColor: Colors.whiteColor,
                        padding: 5,
                        paddingVertical: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        elevation: 0.5,
                    }}
                >
                    {Subjects()}
                </View>
            </View>
        </SafeAreaView>
    );

    function Subjects() {
        const [index, setIndex] = useState(0);
        const [routes] = useState([
            { key: "Holidays", title: "Holidays" },
            { key: "Activities", title: "Activities" },
            { key: "PTM", title: "Parents Teacher Meeting" },
        ]);

        const renderScene = ({ route }) => {
            switch (route.key) {
                case "Holidays":
                    return (
                        <FlatList
                            data={holidayList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <WorkList item={item} />}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={__handleGetHolidayData}
                                    colors={[Colors.primaryColor]}
                                />
                            }
                            ListFooterComponent={
                                !isLoading && holidayList.length === 0 && (
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            marginTop: 50,
                                            ...Fonts.blackColor15Medium,
                                        }}
                                    >
                                        No Data Available
                                    </Text>
                                )
                            }
                        />
                    );
                case "Activities":
                    return (
                        <FlatList
                            data={activityList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <WorkList item={item} />}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={__handleGetActivityData}
                                    colors={[Colors.primaryColor]}
                                />
                            }
                            ListFooterComponent={
                                !isLoading && activityList.length === 0 && (
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            marginTop: 50,
                                            ...Fonts.blackColor15Medium,
                                        }}
                                    >
                                        No Data Available
                                    </Text>
                                )
                            }
                        />
                    );
                case "PTM":
                    return (
                        <FlatList
                            data={PTMList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <WorkList item={item} />}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={__handleGetPTMData}
                                    colors={[Colors.primaryColor]}
                                />
                            }
                            ListFooterComponent={
                                !isLoading && PTMList.length === 0 && (
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            marginTop: 50,
                                            ...Fonts.blackColor15Medium,
                                        }}
                                    >
                                        No Data Available
                                    </Text>
                                )
                            }
                        />
                    );
                default:
                    return null;
            }
        };

        return (
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: Colors.primaryColor }}
                        tabStyle={{ width: "auto" }}
                        scrollEnabled={true}
                        style={{ backgroundColor: "white" }}
                        renderLabel={({ route }) => (
                            <Text
                                style={{
                                    ...Fonts.blackColor16Regular,
                                    textTransform: "uppercase",
                                }}
                            >
                                {route.title}
                            </Text>
                        )}
                    />
                )}
            />
        );
    }

    function titleBox() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: Colors.whiteColor,
                    borderRadius: 30,
                    marginHorizontal: 10,
                    marginBottom: 10,
                }}
            >
                <View
                    style={{
                        paddingHorizontal: 20,
                        flex: 1,
                        paddingVertical: 10,
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        Your School
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        Calendar Events
                    </Text>
                </View>

                <Image
                    source={require("../../assets/images/syllabus.png")}
                    style={{
                        width: 140,
                        resizeMode: "center",
                        height: 100,
                        alignSelf: "flex-end",
                    }}
                />
            </View>
        );
    }

    function header() {
        return (
            <View
                style={{
                    padding: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 15,
                }}
            >
                <MaterialIcons
                    name="arrow-back-ios"
                    size={20}
                    color={Colors.whiteColor}
                    onPress={() => navigation.goBack()}
                    style={{ paddingTop: 5 }}
                />
                <Text
                    style={{
                        ...Fonts.primaryColor19Medium,
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                        color: Colors.whiteColor,
                    }}
                >
                    Calendar Events
                </Text>
                <TouchableOpacity
                    // onPress={() => navigation.navigate("SubmitWorkScreen")}
                    style={{ marginLeft: "auto", marginRight: 10 }}
                >
                    <FontAwesome5 name="calendar-check" size={24} color={Colors.whiteColor} />
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({});

export default CalenderScreen;
