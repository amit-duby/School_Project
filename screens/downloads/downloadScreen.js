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

const DownloadScreen = ({ navigation }) => {
    const [state, setState] = useState({
        book_list: [],
        isLoading: false,
    });

    const { book_list, isLoading } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const __handleGetData = () => {
        updateState({ isLoading: true });
        __postApiData("/webservice/getLibraryBooks")
            .then((res) => {
                console.log("first", res);
                if (res?.success == 1) {
                    updateState({
                        book_list: res?.data || [],
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

    const Data = [
        {
            "id": 1,
            "title": "Exam Answer Sheet",
            "date": "01/02/2024",
        },
        {
            "id": 2,
            "title": "Maths Book Pdf",
            "date": "01/02/2024",
        },
        {
            "id": 3,
            "title": "English Book",
            "date": "01/02/2024",
        },
        {
            "id": 4,
            "title": "English Book",
            "date": "01/02/2024",
        },
        {
            "id": 5,
            "title": "English Book",
            "date": "01/02/2024",
        },
        {
            "id": 6,
            "title": "English Book",
            "date": "01/02/2024",
        }
    ]


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
                }}
            >
                {titleBox()}

                <FlatList
                    // data={book_list}
                    data={Data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CartBox item={item} />}
                    contentContainerStyle={{
                        paddingBottom: 20,
                        marginHorizontal: 9,
                        // paddingHorizontal: 15,
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
                                    No Items
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
                        Download Section is
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        here!
                    </Text>
                </View>

                {/* <Image
                    source={require("../../assets/images/calender.png")}
                    style={{
                        width: 140,
                        resizeMode: "center",
                        height: 100,
                        alignSelf: "flex-end",
                        marginBottom: 10,
                    }}
                /> */}
                <View
                    style={{
                        borderWidth: 0.9, borderRadius: 50,
                        // width: 140,
                        // height: 100,
                        alignSelf: "flex-end",
                        marginBottom: 20,
                    }}
                >
                    <MaterialIcons name="file-download" size={60} color="#666" />
                </View>
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
                    Download Center
                </Text>
            </View>
        );
    }
};

export default DownloadScreen;
