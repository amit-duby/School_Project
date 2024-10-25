import React, { useCallback, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    FlatList,
    RefreshControl,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import CartBox from "./CartBox";
import { __postApiData } from "../../utils/api";
const { width } = Dimensions.get("screen");
import { useFocusEffect } from "@react-navigation/native";

const LibraryScreen = ({ navigation, route }) => {
    const { student_id } = route.params;
    const [state, setState] = useState({
        book_list: [],
        isLoading: false,
    });

    const { book_list, isLoading } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const __handleGetData = () => {
        updateState({ isLoading: true });
        __postApiData("/webservice/getLibraryBookIssued", {
            student_id: student_id,
        })
            .then((res) => {
                console.log("first", res);
                if (res?.status == 200) {
                    updateState({
                        book_list: res?.issue || [],
                        isLoading: false,
                    });
                } else {
                    updateState({ book_list: [], isLoading: false });
                }
            })
            .catch((error) => {
                updateState({ book_list: [], isLoading: false });
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
                    data={book_list}
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
                            {!isLoading && book_list.length == 0 && (
                                <Text
                                    style={{
                                        textAlign: "center",
                                        marginTop: 50,
                                        ...Fonts.blackColor15Medium,
                                    }}
                                >
                                    No Issued Books
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
                        Your Issued
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        Books is here!
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
                    Library
                </Text>
                <View
                    style={{
                        justifyContent: "flex-end",
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <MaterialIcons
                        name="book"
                        size={18}
                        color={Colors.whiteColor}
                        style={{
                            paddingEnd: 5,
                        }}
                        onPress={() => navigation.push("books", { student_id })}
                    />
                    <Text
                        onPress={() => navigation.push("books", { student_id })}
                        style={{
                            ...Fonts.primaryColor19Medium,
                            color: Colors.whiteColor,
                            fontSize: 15,
                        }}
                    >
                        Books
                    </Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({});

export default LibraryScreen;
