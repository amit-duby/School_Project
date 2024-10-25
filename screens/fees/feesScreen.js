import React, { useCallback, useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    FlatList,
    RefreshControl,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import CartBox from "./CartBox";
import { __postApiData } from "../../utils/api";
import { useFocusEffect } from "@react-navigation/native";

const FeesScreen = ({ navigation, route }) => {
    const { student_id } = route.params;

    const [state, setState] = useState({
        list: [],
        isLoading: false,
    });

    const { list, isLoading } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const __handleGetData = () => {
        updateState({ isLoading: true });
        __postApiData("/webservice/getFee", { student_id: student_id })
            .then((res) => {
                if (res?.status == 200) {
                    console.log(res);
                    updateState({
                        list: res?.result || [],
                        isLoading: false,
                    });
                } else {
                    updateState({ list: [], isLoading: false });
                }
            })
            .catch((error) => {
                updateState({ list: [], isLoading: false });
            });
    };
    useFocusEffect(
        useCallback(() => {
            __handleGetData();
            return () => { };
        }, [])
    );

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
                    paddingTop: 30,
                    backgroundColor: Colors.whiteColor,
                }}
            >
                {titleBox()}
                <FlatList
                    data={list}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CartBox item={item} />}
                    contentContainerStyle={{
                        paddingBottom: 10,
                    }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                __handleGetData();
                            }}
                            colors={[Colors.primaryColor]}
                        />
                    }
                    ListFooterComponent={
                        <>
                            {!isLoading && list.length == 0 && (
                                <Text
                                    style={{
                                        textAlign: "center",
                                        marginTop: 50,
                                        ...Fonts.blackColor15Medium,
                                    }}
                                >
                                    No Fees Assigned
                                </Text>
                            )}
                        </>
                    }
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
                        Your Fees
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        Details is here!
                    </Text>
                </View>

                <Image
                    source={require("../../assets/images/fees.png")}
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
                    Fees
                </Text>
            </View>
        );
    }
};

export default FeesScreen;
