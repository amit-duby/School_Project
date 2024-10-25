import React, { useCallback, useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { Image, TextInput } from "react-native";
import { __postApiData } from "../../utils/api";
import { useFocusEffect } from "@react-navigation/native";
import { __convertDateFormat, __formatDate } from "../../utils/function";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import DropDownTextAreaBox from '../../modules/DropDownTextAreaBox'

const AppoinmentScreen = ({ navigation, route }) => {

    const { student_id } = route.params;
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        applicationTitle: "",
        selectedTeacher: "",
        date: "",
        time: "",
    });
    const { isLoading, name, applicationTitle, selectedTeacher, date, description } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const __handleGetSubject = () => {
        __postApiData("/webservice/getstudentsubject", {
            student_id: student_id,
        })
            .then((res) => {
                const list = res?.subjectlist.map((item) => ({
                    name: item.name + " " + item.code,
                    id: item.subject_id,
                }));
                updateState({ subject_list: list });
            })
            .catch((error) => { });
    };

    const __handleGetData = () => {
        updateState({ isLoading: true });
        __postApiData("/webservice/getHomework", {
            student_id: student_id,
            homework_status: ["pending", "submitted", "evaluated"][tab],
            date: __convertDateFormat(date),
        })
            .then((res) => {
                if (res?.status == 200) {
                    updateState({
                        list: res?.homeworklist,
                        isLoading: false,
                    });
                } else {
                    updateState({ list: [], isLoading: false });
                }
            })
            .catch((error) => {
                updateState({ list: [], isLoading: false });
            });
    };

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
                    paddingTop: 10,
                    backgroundColor: Colors.whiteColor,
                }}
            >
                {titleBox()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {nameTextField()}
                            {DateRangeField()}
                        </>
                    }
                    contentContainerStyle={{
                        paddingBottom: 10,
                    }}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <>
                            {continueButton()}
                        </>
                    }
                />
            </View>
        </SafeAreaView>
    );

    function nameTextField() {
        return (
            <View>
                <Text style={styles.textFieldTitle}>Appoinment Subject:</Text>
                <View
                    style={{
                        ...styles.textFieldWrapStyle,
                        marginBottom: Sizes.fixPadding * 2.0,
                    }}
                >
                    <TextInput
                        value={name}
                        onChangeText={(value) => updateState({ name: value })}
                        placeholder="Enter name of your class teacher"
                        placeholderTextColor={Colors.grayColor}
                        style={{
                            ...Fonts.blackColor16Regular,
                            fontSize: 14,
                            flex: 1,
                            marginLeft: Sizes.fixPadding + 2.0,
                        }}
                        selectionColor={Colors.primaryColor}
                        keyboardType="default"
                    />

                </View>
                <Text style={styles.textFieldTitle}>Select Teacher:</Text>
                <DropDownTextAreaBox
                    type="select"
                    list={[
                        { id: 1, name: "Sonu Patel Sir " },
                        { id: 2, name: "Mohan Singh Sir" },
                        { id: 3, name: "Shiphali Mam" },
                        { id: 4, name: "Priyanka Mam" },
                    ]}
                    // title="Select Teacher"
                    placeholder="Select Type"
                    value={selectedTeacher}
                    onSelected={(value) => {
                        updateState({ selectedTeacher: value });
                    }}
                    isSearchable
                    customStyle={{ marginBottom: 15 }}
                />
            </View>
        );
    }
    function DateRangeField() {

        const [startDate, setStartDate] = useState(new Date());
        const [startTime, setStartTime] = useState(new Date());
        const [showStartDatePicker, setShowStartDatePicker] = useState(false);
        const [showStartTimePicker, setShowStartTimePicker] = useState(false);

        const handleStartDateChange = (event, selectedDate) => {
            const currentDate = selectedDate || startDate;
            setShowStartDatePicker(false);
            setStartDate(currentDate);
        };

        const handleStartTimeChange = (event, selectedTime) => {
            const currentTime = selectedTime || startTime;
            setShowStartTimePicker(false);
            setStartTime(currentTime);
        };
        return (
            <View>
                <Text style={styles.textFieldTitle}>Select Date & Time:</Text>
                <View style={styles.datePickerContainer}>
                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePickerButton}>
                        <Ionicons name="calendar" size={20} color={Colors.primaryColor} style={styles.icon} />
                        <Text style={styles.dateText}>{startDate.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showStartDatePicker && (
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            display="default"
                            onChange={handleStartDateChange}
                        />
                    )}
                    <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.datePickerButton}>
                        <Ionicons name="time" size={20} color={Colors.primaryColor} style={styles.icon} />
                        <Text style={styles.dateText}>{startTime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {showStartTimePicker && (
                        <DateTimePicker
                            value={startTime}
                            mode="time"
                            display="default"
                            onChange={handleStartTimeChange}
                        />
                    )}
                </View>
            </View>
        );
    };

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    // __handleLogin();
                    // navigation.navigate("BottomTabBar")
                    // navigation.navigate("HomeScreen")
                }}
                style={{
                    backgroundColor: Colors.primaryColor,
                    ...styles.continueButtonStyle,
                }}
            >
                <Text style={{ ...Fonts.whiteColor19Regular }}>Post</Text>
            </TouchableOpacity>
        );
    }
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
                        Request For
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        Appoinment!
                    </Text>
                </View>
                <Image
                    source={require("../../assets/images/appoinment.jpg")}
                    style={{
                        width: 140,
                        resizeMode: "center",
                        height: 100,
                        alignSelf: "flex-end",
                        borderRadius: 30
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
                <TouchableOpacity
                    activeOpacity={0.9}
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
                </TouchableOpacity>
                <Text
                    style={{
                        ...Fonts.primaryColor19Medium,
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                        color: Colors.whiteColor,
                    }}
                >
                    Take Appoinment
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    textFieldTitle: {
        ...Fonts.grayColor16Medium,
        marginBottom: 2,
        marginLeft: Sizes.fixPadding + 15.0,
    },
    signinSignupInfoWrapStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        padding: Sizes.fixPadding * 2.0,
    },
    continueButtonStyle: {
        height: 55.0,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding * 2.0,
        marginTop: 40,
    },
    textFieldWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.02)",
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderWidth: 0.5,
        borderColor: Colors.lightGrayColor,
    },

    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 25
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        borderRadius: 5,
        padding: Sizes.fixPadding,
        marginRight: Sizes.fixPadding,
    },
    icon: {
        marginRight: Sizes.fixPadding,
    },
    dateText: {
        ...Fonts.blackColor16Regular,
    },

});

export default AppoinmentScreen;
