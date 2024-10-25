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
import Loader from "../../modules/src/Loader"

const ApplyLeaveScreen = ({ navigation, route }) => {

    const { student_id } = route.params;
    const [state, setState] = useState({
        isLoading: false,
        from_date: "",
        to_date: "",
        apply_date: new Date(),
        reason: ""
    });
    console.log(new Date())
    const { isLoading, name, from_date, to_date, apply_date, reason } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const __handlePostData = () => {
        // if (!student_id || !from_date || !to_date || !apply_date || !reason) {
        //     alert("All fields are required!");
        //     return;
        // }
        if (!student_id) {
            alert("Student ID is required!");
            return;
        }
        if (!from_date) {
            alert("From date is required!");
            return;
        }
        if (!to_date) {
            alert("To date is required!");
            return;
        }
        if (!apply_date) {
            alert("Apply date is required!");
            return;
        }
        if (!reason) {
            alert("Reason is required!");
            return;
        }
        updateState({ isLoading: true });
        __postApiData("/webservice/addLeave", {
            student_id: student_id,
            from_date: from_date,
            to_date: to_date,
            apply_date: apply_date,
            reason: reason,
        })
            .then((res) => {
                if (res?.response_code == 200) {
                    console.log(res, 'res')
                    updateState({
                        isLoading: false,
                    });
                    alert("Success");
                } else {
                    updateState({ isLoading: false });
                    console.log(res, 'res')
                }
            })
            .catch((error) => {
                updateState({ isLoading: false });
                console.log(error)
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
            <Loader isShow={state.isLoading} backgroundColor="rgba(0,0,0,0.2)" color={Colors.primaryColor} size={40} />
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
                            {ApplicationTitle()}
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


    function ApplicationTitle() {
        return (
            <View>
                <Text style={styles.textFieldTitle}
                >Leave Reason:</Text>
                <View
                    style={{
                        ...styles.textFieldWrapStyle,
                        marginBottom: Sizes.fixPadding * 2.0,
                    }}
                >
                    <TextInput
                        value={reason}
                        onChangeText={(value) => updateState({ reason: value })}
                        placeholder="Enter application title"
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
            </View>
        );
    }



    function DateRangeField() {
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const [showStartDatePicker, setShowStartDatePicker] = useState(false);
        const [showEndDatePicker, setShowEndDatePicker] = useState(false);

        const handleStartDateChange = (event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) {
                setStartDate(selectedDate);
                updateState({ from_date: selectedDate });
                if (selectedDate > endDate) {
                    setEndDate(selectedDate);
                }
                console.log('Start Date:', selectedDate);
            }
        };

        const handleEndDateChange = (event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) {
                if (selectedDate > startDate) {
                    setEndDate(selectedDate);
                    updateState({ to_date: selectedDate });
                    console.log('End Date:', selectedDate);
                } else {
                    // Show an error message or handle the validation as per your app's requirements
                    console.log('End Date should be greater than Start Date');
                }
            }
        };
        const endDateMinimumDate = startDate;
        return (
            <View>
                <Text style={styles.textFieldTitle}>From - To:</Text>
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
                    <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePickerButton}>
                        <Ionicons name="calendar" size={20} color={Colors.primaryColor} style={styles.icon} />
                        <Text style={styles.dateText}>{endDate.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showEndDatePicker && (
                        <DateTimePicker
                            value={endDate}
                            mode="date"
                            display="default"
                            minimumDate={endDateMinimumDate}
                            onChange={handleEndDateChange}
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
                    __handlePostData();
                }}
                style={{
                    backgroundColor: Colors.primaryColor,
                    ...styles.continueButtonStyle,
                }}
            >
                <Text style={{ ...Fonts.whiteColor19Regular }}>Apply</Text>
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
                        Apply For
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        Leave!
                    </Text>
                </View>

                <Image
                    source={require("../../assets/images/leave.jpg")}
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
                    Leave Application
                </Text>
                <Text
                    onPress={() => navigation.push("LeaveStatusScreen", { student_id: student_id })}
                    style={{
                        ...Fonts.primaryColor19Medium,
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                        color: Colors.whiteColor,
                    }}
                >
                    Status
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
        // marginTop: 100,
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

export default ApplyLeaveScreen;
