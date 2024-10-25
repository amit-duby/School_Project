import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../constant/styles";

const CartBox = ({ item }) => {
    const [state, setState] = useState({
        isShowCalender: false,
    });
    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                marginHorizontal: 15,
                marginTop: 10,
                borderRadius: 20,
                elevation: 3,
                overflow: "hidden",
                paddingBottom: 20,
            }}
        >
            {headerBox()}
            {textBox("Author", item.author)}
            {textBox("Book No.", item.book_no)}
            {textBox("Issue Date", item.issue_date)}
            {textBox("Return Date", item.return_date)}
            {textBox("Due Return Date", item.duereturn_date)}
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
                        ...Fonts.whiteColor18Regular,
                        flex: 1,
                        lineHeight: 25,
                    }}
                >
                    {item.book_title}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        gap: 10,
                    }}
                >
                    {item?.is_returned == "0" && (
                        <Text
                            style={{
                                ...Fonts.whiteColor16Regular,
                                backgroundColor: Colors.redColor,
                                borderRadius: 5,
                                color: Colors.whiteColor,
                                padding: 5,
                                marginStart: 10,
                            }}
                        >
                            Not Returned
                        </Text>
                    )}
                </View>
            </View>
        );
    }
};
const styles = StyleSheet.create({});

export default CartBox;
