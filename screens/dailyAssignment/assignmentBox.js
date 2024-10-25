import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../constant/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AssignmentBox = ({}) => {
    const [state, setState] = useState({
        isShowCalender: false,
    });
    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                marginHorizontal: 5,
                marginTop: 10,
                borderRadius: 10,
                elevation: 0.5,
                overflow: "hidden",
                paddingBottom: 20,
            }}
        >
            {headerBox()}
            {textBox("Title", "05/10/2024")}
            {textBox("Remark", "05/10/2024")}
            {textBox("Submission Date", "")}
            {textBox("Evaluated Date", "")}
            <View
                style={{
                    marginHorizontal: 10,
                    borderTopWidth: 0.5,
                    borderColor: Colors.lightGrayColor,
                    marginTop: 10,
                    paddingTop: 10,
                }}
            >
                <Text style={{ ...Fonts.blackColor18Medium }}>Description</Text>
                <Text style={{ ...Fonts.grayColor16Medium, fontSize: 13 }}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Adipisci quod neque
                </Text>
            </View>
        </View>
    );
    function textBox(text1, text2) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                    marginHorizontal: 10,
                }}
            >
                <Text style={{ ...Fonts.blackColor16Regular, fontSize: 14 }}>
                    {text1}
                </Text>
                <Text style={{ ...Fonts.grayColor16Medium, fontSize: 13 }}>
                    {text2}
                </Text>
            </View>
        );
    }

    function headerBox(params) {
        return (
            <View
                style={{
                    height: 50,
                    backgroundColor: Colors.lightGrayColor,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 15,
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}
            >
                <Text style={{ ...Fonts.blackColor20Medium }}>Science</Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        gap: 10,
                    }}
                >
                    <MaterialCommunityIcons
                        name="lead-pencil"
                        size={20}
                        color={Colors.blackColor}
                        style={{
                            paddingTop: 5,
                        }}
                    />
                    <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={20}
                        color={Colors.blackColor}
                        style={{
                            paddingTop: 5,
                        }}
                    />
                </View>
            </View>
        );
    }
};
const styles = StyleSheet.create({});

export default AssignmentBox;
