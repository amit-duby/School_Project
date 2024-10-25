import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../constant/styles";

const CartBox = ({ item }) => {
    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                marginHorizontal: 5,
                marginTop: 10,
                borderRadius: 20,
                elevation: 3,
                overflow: "hidden",
                paddingBottom: 20,
                // padding: 5,
            }}
        >
            {headerBox()}
            {textBox("Author", item.author)}
            {textBox("Subject", item.subject)}
            {textBox("Publisher", item.publish)}
            {textBox("Rack No.", item.rack_no)}
            {textBox("Quantity", item.qty)}
            {textBox("Price", item.perunitcost)}
            {textBox("Post Date", item.created_at)}
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
                    textAlign: "center",
                    paddingHorizontal: 15,
                    justifyContent: "space-between",
                    marginBottom: 5,
                    paddingVertical: 6,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e0e0e0',
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
            </View>
        );
    }
};
const styles = StyleSheet.create({});

export default CartBox;
