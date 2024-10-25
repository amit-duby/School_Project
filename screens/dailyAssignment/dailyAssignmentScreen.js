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
import AssignmentBox from "./assignmentBox";
const { width } = Dimensions.get("screen");

const DailyAssignmentScreen = ({ navigation }) => {
    const [state, setState] = useState({});

    const {} = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.darkGrayColor }}
        >
            <StatusBar
                backgroundColor={Colors.darkGrayColor}
                barStyle={"light-content"}
            />
            {header()}
            {titleBox()}

            <View
                style={{
                    flex: 1,
                    paddingTop: 30,
                    backgroundColor: Colors.whiteColor,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                }}
            >
                <FlatList
                    data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <AssignmentBox />}
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
                    backgroundColor: Colors.whiteColor,
                    borderRadius: 30,
                    marginHorizontal: 10,
                    marginBottom: 10,
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
                        Your Daily
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        Assignment!
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
                    Daily Assignment
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({});

export default DailyAssignmentScreen;
