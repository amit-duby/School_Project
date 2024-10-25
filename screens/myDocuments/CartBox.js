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
                marginHorizontal: 8,
                marginTop: 10,
                borderRadius: 20,
                elevation: 5,
                overflow: "hidden",
                paddingBottom: 10,
                paddingTop: 10
            }}
        >
            {/* {headerBox()} */}
            {headBox(item.dateTime, item.guardianName,)}
        </View>
    );
    function headBox(text1, text2, text3) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 20,
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        fontSize: 14,
                        width: "55%",
                    }}
                >
                    {text1}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        fontSize: 14,
                        width: "45%",
                    }}
                >
                    {text2}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        fontSize: 14,
                        width: "20%",
                        textAlign: "right",
                    }}
                >
                    {text3}
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
                <Text style={{ ...Fonts.blackColor20Medium }}>{item.name}</Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        gap: 10,
                    }}
                ></View>
            </View>
        );
    }
};
const styles = StyleSheet.create({});

export default CartBox;
