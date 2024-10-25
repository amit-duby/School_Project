import React from "react";
import { Text, View } from "react-native";
import { Colors, Fonts } from "../../constant/styles";

const WorkList = ({ item }) => {
    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                marginHorizontal: 5,
                marginTop: 10,
                borderRadius: 15,
                elevation: 2,
                overflow: "hidden",
                paddingBottom: 20,
            }}
        >
            {headerBox()}

            <View
                style={{
                    marginHorizontal: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 13,
                        fontFamily: "Mukta_Regular",
                        color: Colors.grayColor,
                    }}
                >
                    {item.description}
                </Text>
            </View>
        </View>
    );

    function headerBox(params) {
        return (
            <View
                style={{
                    // height: 100,
                    // width: ,
                    // backgroundColor: Colors.lightGrayColor,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    justifyContent: "space-between",
                    marginBottom: 15,
                    borderBottomWidth: 1.0,
                    borderBottomColor: Colors.lightGrayColor,
                    padding: 5
                }}
            >
                <Text style={{ ...Fonts.blackColor18Medium }}>
                    Chapter: {item.chapter} {item.chapterName}
                </Text>

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

export default WorkList;
