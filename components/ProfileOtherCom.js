import React from "react";
import { Text, View } from "react-native";
import { Colors, Fonts } from "../constant/styles";

const ProfileOtherCom = ({ state }) => {
    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                marginHorizontal: 5,
                borderRadius: 20,
                marginTop: 5,
                marginBottom: 5,
                elevation: 3,
                padding: 10,
                paddingVertical: 10,
            }}
        >
            {textBox("Previous School", state?.previous_school)}
            {textBox("National ID Number", "-")}
            {textBox("Local ID Number", "-")}
            {textBox("Back Account No.", state?.bank_account_no)}
            {textBox("Bank Name", state?.bank_name)}
            {textBox("IFSC Code", state?.ifsc_code)}
            {textBox("RTE", state?.rte)}
            {textBox("Pickup Point", state?.pickup_point_name)}
            {textBox("Vehicle Route", state?.route_title)}
            {textBox("Vehicle Number", state?.vehicle_no)}
            {textBox("Driver Name", state?.driver_name)}
            {textBox("Driver Contact", state?.driver_contact)}
            {textBox("Hostel Rooms", state?.hostel_name)}
            {textBox("Rooms No.", state?.room_no)}
            {textBox("Rooms Type", state?.room_type)}
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

export default ProfileOtherCom;
