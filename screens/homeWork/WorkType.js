import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { Entypo } from "@expo/vector-icons";
import SelectForm from "../../modules/SelectForm";
const { width } = Dimensions.get("screen");
import DateTimePicker from "@react-native-community/datetimepicker";

const WorkType = ({ updateParentState, state }) => {
    const { isShowSubject, tab, subject, subject_list, date, isShowDate } = state;

    return (
        <>
            {isShowDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="date"
                    is24Hour={false}
                    display="inline"
                    onChange={(event, selectedDate) => {
                        console.log(selectedDate.toLocaleDateString());

                        updateParentState({ isShowDate: false });
                        if (event.type == "set") {
                            updateParentState({
                                date: selectedDate.toLocaleDateString(),
                            });
                        }
                    }}
                // onClose={() => {
                //     updateParentState({ isShowDate: false });
                // }}
                />
            )}
            <SelectForm
                isShow={isShowSubject}
                list={[{ id: "0", name: "All" }].concat(subject_list)}
                title={"Select subject"}
                selected={subject.id}
                isSearchable
                onSelected={(value) => {
                    console.log(value);
                    updateParentState({ subject: value, isShowSubject: false });
                }}
                onBackdrop={() => {
                    updateParentState({ isShowSubject: false });
                }}
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: width / 2 - 20,
                }}
            >
                <TouchableOpacity
                    style={{
                        ...styles.textFieldWrapStyle,
                        width: "45%",
                        marginHorizontal: 0,
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 0,
                        borderEndWidth: 0,
                    }}
                    onPress={() => {
                        updateParentState({ tab: 0 });
                    }}
                    activeOpacity={0.8}
                >
                    <View
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor:
                                tab == 0
                                    ? Colors.whiteColor
                                    : Colors.lightGrayColor,
                            marginEnd: 5,
                            backgroundColor:
                                tab == 0
                                    ? Colors.primaryColor
                                    : Colors.whiteColor,
                            elevation: tab == 0 ? 2 : 0,
                        }}
                    />
                    <View style={{}}>
                        <Text
                            style={{
                                ...Fonts.blackColor16Medium,
                                fontSize: 11,
                            }}
                        >
                            Pending
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.textFieldWrapStyle,
                        width: "55%",
                        marginHorizontal: 0,
                        borderBottomLeftRadius: 0,
                        borderTopLeftRadius: 0,
                    }}
                    onPress={() => {
                        updateParentState({ tab: 1 });
                    }}
                    activeOpacity={0.8}
                >
                    <View
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor:
                                tab == 1
                                    ? Colors.whiteColor
                                    : Colors.lightGrayColor,
                            marginEnd: 5,
                            backgroundColor:
                                tab == 1
                                    ? Colors.primaryColor
                                    : Colors.whiteColor,
                            elevation: tab == 1 ? 2 : 0,
                        }}
                    />
                    <View style={{}}>
                        <Text
                            style={{
                                ...Fonts.blackColor16Medium,
                                fontSize: 11,
                            }}
                        >
                            Submitted
                        </Text>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={{
                        ...styles.textFieldWrapStyle,
                        width: "33.3%",
                        marginHorizontal: 0,
                        borderBottomLeftRadius: 0,
                        borderTopLeftRadius: 0,
                    }}
                    onPress={() => {
                        updateParentState({ tab: 2 });
                    }}
                    activeOpacity={0.8}
                >
                    <View
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor:
                                tab == 2
                                    ? Colors.whiteColor
                                    : Colors.lightGrayColor,
                            marginEnd: 5,
                            backgroundColor:
                                tab == 2
                                    ? Colors.primaryColor
                                    : Colors.whiteColor,
                            elevation: tab == 2 ? 2 : 0,
                        }}
                    />

                    <View style={{}}>
                        <Text
                            style={{
                                ...Fonts.blackColor16Medium,
                                fontSize: 11,
                            }}
                        >
                            Evaluated
                        </Text>
                    </View>
                </TouchableOpacity> */}
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: width / 2,
                }}
            >
                <TouchableOpacity
                    style={{
                        ...styles.textFieldWrapStyle,
                        marginHorizontal: 0,
                        width: width / 4 - 10,
                        justifyContent: "space-between",
                    }}
                    onPress={() => {
                        updateParentState({ isShowSubject: true });
                    }}
                    activeOpacity={0.8}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor16Medium,
                            fontSize: 11,
                            marginStart: 5,
                            flex: 1,
                        }}
                        numberOfLines={1}
                    >
                        {subject?.name}
                    </Text>
                    <Entypo
                        name="chevron-down"
                        color={Colors.blackColor}
                        size={20}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.textFieldWrapStyle,
                        marginHorizontal: 0,
                        width: width / 4 + 10,
                        justifyContent: "space-between",
                    }}
                    onPress={() => {
                        updateParentState({ isShowDate: true });
                    }}
                    activeOpacity={0.8}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor16Medium,
                            fontSize: 11,
                            marginStart: 5,
                            flex: 1,
                        }}
                        numberOfLines={1}
                    >
                        {date}
                    </Text>
                    <Entypo
                        name="calendar"
                        color={Colors.blackColor}
                        size={15}
                    />
                </TouchableOpacity>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    textFieldWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.bodyColor,
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding - 3.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        borderWidth: 1,
        borderColor: Colors.whiteColor,
    },
});

export default WorkType;
