import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../constant/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';

const CartBox = ({ item }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
        // onPress={}
        >
            <View
                style={{
                    backgroundColor: Colors.whiteColor,
                    marginHorizontal: 5,
                    marginTop: 10,
                    borderRadius: 20,
                    elevation: 2,
                    overflow: "hidden",
                    padding: 10,
                    // paddingBottom: 20,
                }}
            >
                {/* {headerBox()} */}
                {textBox(item.title, item.date)}
                {/* {textBox("Date", item.date)} */}
            </View>
        </TouchableOpacity>
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
                <View style={{ borderWidth: 0.9, borderRadius: 50, }}>
                    <MaterialIcons name="file-download" size={22} color="#666" />
                </View>
                <Text
                    style={{
                        ...Fonts.blackColor16Regular,
                        fontSize: 14,
                        // width: "35%",
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
                    // backgroundColor: Colors.lightGrayColor,
                    flexDirection: "row",
                    alignItems: "center",
                    textAlign: "center",
                    paddingHorizontal: 15,
                    justifyContent: "space-between",
                    marginBottom: 5,
                    paddingVertical: 6,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e0e0e0',
                }}
            >
                <View style={{ borderWidth: 1, borderRadius: 50, }}>
                    <MaterialIcons name="file-download" size={22} color="#666" />
                </View>
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        flex: 1,
                        lineHeight: 25,
                    }}
                >
                    {item.title}
                </Text>
            </View>
        );
    }
};
const styles = StyleSheet.create({});

export default CartBox;
