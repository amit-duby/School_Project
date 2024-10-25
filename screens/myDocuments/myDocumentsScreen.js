import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    FlatList,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import CartBox from "./CartBox";
const { width } = Dimensions.get("screen");

const MyDocumentsScreen = ({ navigation }) => {
    const [state, setState] = useState({});

    const { } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.primaryColor }}
        >
            <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle={"light-content"}
            />
            {header()}
            <View
                style={{
                    flex: 1,
                    paddingTop: 10,
                    backgroundColor: Colors.whiteColor,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                }}
            >
                {titleBox()}
                <FlatList
                    data={
                        [
                            {
                                id: 1,
                                guardianName: "John Doe",
                                dateTime: "01/02/2001 10:30 AM",
                            },
                            {
                                id: 2,
                                guardianName: "Jane Smith",
                                dateTime: "01/02/2001 2:15 PM",
                            },
                            {
                                id: 3,
                                guardianName: "Michael Johnson",
                                dateTime: "02/15/2022 9:00 AM",
                            },
                            {
                                id: 4,
                                guardianName: "Emily Davis",
                                dateTime: "03/20/2023 11:45 AM",
                            },
                            {
                                id: 5,
                                guardianName: "David Lee",
                                dateTime: "04/05/2023 1:30 PM",
                            },
                            {
                                id: 6,
                                guardianName: "Sarah Wilson",
                                dateTime: "05/12/2023 3:00 PM",
                            },
                            {
                                id: 7,
                                guardianName: "Robert Thompson",
                                dateTime: "06/01/2023 10:00 AM",
                            },
                            {
                                id: 8,
                                guardianName: "Olivia Anderson",
                                dateTime: "07/08/2023 2:45 PM",
                            },
                        ]
                    }
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CartBox item={item} />}
                    contentContainerStyle={{
                        paddingBottom: 10,
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );

    function titleBox(params) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        paddingHorizontal: 20,
                        flex: 1,
                        paddingVertical: 10,
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        Visitors Book
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        List is here!
                    </Text>
                </View>

                <Image
                    source={require("../../assets/images/calender.png")}
                    style={{
                        width: 140,
                        resizeMode: "center",
                        height: 100,
                        alignSelf: "flex-end",
                        marginBottom: 10,
                    }}
                />
            </View>
        );
    }

    function header() {
        return (
            <View
                style={{
                    padding: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 15,
                }}
            >
                <MaterialIcons
                    name="arrow-back-ios"
                    size={20}
                    color={Colors.whiteColor}
                    onPress={() => navigation.goBack()}
                    style={{
                        paddingTop: 5,
                    }}
                />
                <Text
                    style={{
                        ...Fonts.primaryColor19Medium,
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                        color: Colors.whiteColor,
                    }}
                >
                    Visitor Book
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({});

export default MyDocumentsScreen;
