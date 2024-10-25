import React from "react";
import { Text, View } from "react-native";
import { Colors, Fonts } from "../constant/styles";

const ProfilePersionalCom = ({ state }) => {
    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                // minHeight: 300,
                marginHorizontal: 5,
                borderRadius: 20,
                marginTop: 5,
                marginBottom: 5,
                elevation: 3,
                padding: 10,
                paddingVertical: 10,
                // flex: 1,
            }}
        >
            {textBox("Admission Date", state?.admission_date)}
            {textBox("Date Of Birth", state?.dob)}
            {textBox("Gender", state?.gender)}
            {textBox("Category", state?.category)}
            {textBox("Mobile Number", state?.mobileno)}
            {textBox("Caste", state?.cast)}
            {textBox("Religion", state?.religion)}
            {textBox("Email", state?.email)}
            {textBox("Current Address", state?.current_address)}
            {textBox("Permanent Address", state?.permanent_address)}
            {textBox("Blood Group", state?.blood_group)}
            {textBox("Height", state?.height)}
            {textBox("Weight", state?.weight)}
            {textBox("Note", state?.note)}
        </View>
    );
    function textBox(text1, text2) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    gap: 5,
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor16Regular,
                        fontSize: 14,
                        flex: 1,
                        fontStyle: "italic"
                    }}
                >
                    {text1}
                </Text>
                <Text
                    style={{
                        ...Fonts.grayColor16Medium,
                        fontSize: 13,
                        flex: 2,
                    }}
                >
                    : {text2}
                </Text>
            </View>
        );
    }
};

export default ProfilePersionalCom;
