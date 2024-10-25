import React from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Colors, Fonts } from "../../constant/styles";

const CartBox = ({ item }) => {
    console.log(item, 'item')
    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                marginHorizontal: 5,
                marginTop: 10,
                borderRadius: 20,
                elevation: 3,
                overflow: "hidden",
            }}
        >
            {headerBox()}

            <FlatList
                data={item}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <>
                        {textBox(
                            `${item.examgroup} - ${item.exam}`,
                            item.exam,
                            item.subject,
                            item.filecount,
                            // item.files[0]
                        )}
                    </>
                )}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <>
                        {item.length == 0 && (
                            <Text
                                style={{
                                    textAlign: "center",
                                    marginTop: 20,
                                    ...Fonts.blackColor15Medium,
                                    color: Colors.redColor,
                                }}
                            >
                                No Time Table Available
                            </Text>
                        )}
                        <View style={{ height: 10 }} />
                    </>
                }
            />
        </View>
    );
    function headBox(text1, text2, text3, text4) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginTop: 5,
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        fontSize: 14,
                        width: "35%",
                    }}
                >
                    {text1}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        fontSize: 14,
                        // width: "30%",
                        width: "25%",
                    }}
                >
                    {text2}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        fontSize: 14,
                        width: "20.5%",
                        // height: "10.5%",
                        textAlign: "right",
                    }}
                >
                    {text3}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        fontSize: 14,
                        width: "19.5%",
                        textAlign: "right",
                    }}
                >
                    {text4}
                </Text>
            </View>
        );
    }
    function textBox(text1, text2, text3, text4) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 10,
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        fontSize: 14,
                        width: "35%",
                    }}
                >
                    {text1 || "-"}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        fontSize: 14,
                        width: "30%",
                    }}
                >
                    {text2 || "-"}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        fontSize: 14,
                        width: "17.5%",
                        textAlign: "center",
                    }}
                >
                    {text3 || "-"}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        fontSize: 14,
                        width: "17.5%",
                        textAlign: "right",
                        paddingEnd: 5,
                    }}
                >
                    {text4 || "-"}
                </Text>
            </View>
        );
    }

    function headerBox(params) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    height: 50,
                    backgroundColor: Colors.light,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {headBox("Time", "Subject", "Room No.", "Period")}
            </TouchableOpacity>
        );
    }
};
const styles = StyleSheet.create({});

export default CartBox;
