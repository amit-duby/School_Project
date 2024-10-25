import React, { useCallback, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    RefreshControl,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { Calendar } from "react-native-calendars";
import { useFocusEffect } from "@react-navigation/native";
import { __postApiData } from "../../utils/api";

const AttendanceScreen = ({ navigation, route }) => {
    const { student_id } = route.params;

    const [state, setState] = useState({
        logoutDialog: false,
        tab: 1,
        subject: { id: 1, name: "all" },
        isShowSubject: false,

        listData: {},
        isLoading: false,
        half_day: 0,
        prasent: 0,
        absent: 0,
        late: 0,
        selectedMonth: new Date().getMonth() + 1,
        selectedYear: new Date().getFullYear(),
    });

    const { listData, isLoading, half_day, prasent, late, absent, selectedYear, selectedMonth } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const __handleGetData = (month, year) => {
        console.log(month, year);
        updateState({
            isLoading: true,
            half_day: 0,
            prasent: 0,
            absent: 0,
            late: 0,
            listData: {},
        });
        __postApiData("/webservice/getAttendenceRecords", {
            student_id: student_id,
            year: year,
            month: month,
        })
            .then((res) => {
                console.log("first", JSON.stringify(res));

                if (res?.status == 200) {
                    const updatedState = res?.data.reduce(
                        (state, status) => {
                            switch (status.type) {
                                case "Half Day":
                                    state.half_day++;
                                    break;
                                case "Present":
                                    state.prasent++;
                                    break;
                                case "Absent":
                                    state.absent++;
                                    break;
                                case "Late":
                                    state.late++;
                                    break;
                                default:
                                    break;
                            }
                            return state;
                        },
                        { half_day: 0, prasent: 0, absent: 0, late: 0 }
                    );
                    const newData = {};
                    res?.data?.map((item, i) => {
                        const colors = {
                            "Half Day": "orange",
                            Absent: "red",
                            Present: "green",
                            Late: "#50a5f1",
                        };

                        if (colors.hasOwnProperty(item.type)) {
                            newData[item.date] = {
                                selectedColor: colors[item.type],
                                selected: true,
                            };
                        }
                    });
                    updateState({
                        listData: newData,
                        isLoading: false,
                        ...updatedState,
                    });
                } else {
                    updateState({
                        isLoading: false,
                    });
                }
            })
            .catch((error) => {
                updateState({ book_list: [], isLoading: false });
                console.log(error)
            });
    };
    useFocusEffect(
        useCallback(() => {
            const newDate = new Date();
            __handleGetData(newDate.getMonth() + 1, newDate.getFullYear());
            return () => { };
        }, [])
    );

    // const handleRefresh = () => {
    //     const newDate = new Date();
    //     __handleGetData(newDate.getMonth() + 1, newDate.getFullYear());
    // };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.primaryColor }}
        >
            <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle={"light-content"}
            />
            {header()}

            <View
                style={{
                    flex: 1,
                    paddingTop: 30,
                    backgroundColor: Colors.whiteColor,
                }}
            >
                {titleBox()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View
                                style={{
                                    backgroundColor: Colors.whiteColor,
                                    marginHorizontal: 5,
                                    marginTop: 5,
                                    borderRadius: 10,
                                    elevation: 0.5,
                                    overflow: "hidden",
                                    paddingBottom: 20,
                                    borderWidth: 0.5,
                                    borderColor: Colors.lightGrayColor,
                                }}
                            >
                                <Calendar
                                    onMonthChange={(data) => {
                                        __handleGetData(data.month, data.year);
                                    }}
                                    markedDates={listData}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 10,
                                    paddingVertical: 20,
                                    paddingHorizontal: 60,
                                    flexWrap: "wrap",
                                }}
                            >
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <View
                                        style={{
                                            backgroundColor: "green",
                                            width: 25,
                                            height: 25,
                                            borderRadius: 50,
                                        }}
                                    />
                                    <Text
                                        style={{ ...Fonts.blackColor15Medium }}
                                    >
                                        Present({prasent})
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", gap: 5 }}>
                                    <View
                                        style={{
                                            backgroundColor: "red",
                                            width: 25,
                                            height: 25,
                                            borderRadius: 50,
                                        }}
                                    />
                                    <Text
                                        style={{ ...Fonts.blackColor15Medium }}
                                    >
                                        Absent ({absent})
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", gap: 5 }}>
                                    <View
                                        style={{
                                            backgroundColor: "orange",
                                            width: 25,
                                            height: 25,
                                            borderRadius: 50,
                                        }}
                                    />
                                    <Text
                                        style={{ ...Fonts.blackColor15Medium }}
                                    >
                                        Half Day({half_day})
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", gap: 5 }}>
                                    <View
                                        style={{
                                            backgroundColor: "#50a5f1",
                                            width: 25,
                                            height: 25,
                                            borderRadius: 50,
                                        }}
                                    />
                                    <Text
                                        style={{ ...Fonts.blackColor15Medium }}
                                    >
                                        Late({late})
                                    </Text>
                                </View>
                            </View>
                        </>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                __handleGetData(selectedMonth, selectedYear);
                            }}
                            colors={[Colors.primaryColor]}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    );

    function titleBox(params) {
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
                        Your Attendance
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        is here!
                    </Text>
                </View>

                <Image
                    source={require("../../assets/images/calender.png")}
                    style={{
                        width: 140,
                        resizeMode: "center",
                        height: 100,
                        alignSelf: "flex-end",
                        marginBottom: 10,
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
                    style={{
                        paddingTop: 5,
                    }}
                />
                <Text
                    style={{
                        ...Fonts.primaryColor19Medium,
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                        color: Colors.whiteColor,
                    }}
                >
                    Attendance
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({});

export default AttendanceScreen;
