import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";

const CartBox = ({ item }) => {
    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                elevation: 1,
                overflow: "hidden",
                paddingBottom: 20,
            }}
        >
            {headerBox()}
            {textBox("Fee Amount", item.feeamount)}
            {textBox("Given Discount", item.given_discount)}
            {/* {textBox("Due Date", item.due_date)} */}
            {textBox("Paid Amount", item.paid_amount)}
            {textBox("Paid Discount", item.paid_discount)}
            {textBox("Ballance", item.balance)}
            {/* {continueButton()} */}


        </View>
    );
    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    // __handlePostData();
                }}
                style={{
                    backgroundColor: Colors.orangeColor,
                    ...styles.continueButtonStyle,
                }}
            >
                <Text style={{ ...Fonts.whiteColor19Regular }}>Download</Text>
            </TouchableOpacity>
        );
    }
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
                <Text
                    style={{
                        ...Fonts.blackColor16Regular,
                        fontSize: 14,
                        width: "35%",
                    }}
                >
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
                    backgroundColor: Colors.primaryColor,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 15,
                    justifyContent: "space-between",
                    marginBottom: 10,
                    paddingVertical: 10,
                }}
            >
                <Text
                    style={{
                        ...Fonts.whiteColor20Regular,
                        flex: 1,
                        lineHeight: 25,
                    }}
                >
                    {item.feehead}
                </Text>
            </View>
        );
    }

};
const styles = StyleSheet.create({
    continueButtonStyle: {
        height: 40.0,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: Sizes.fixPadding * 10.0,
        borderRadius: Sizes.fixPadding * 2.0,
        // marginTop: 100,
        marginTop: 20,
    },
});

export default CartBox;
