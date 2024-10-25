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

const BooksScreen = ({ navigation, route }) => {
    const { student_id } = route.params;
    console.log(student_id, 'student_id')
    const [state, setState] = useState({
        book_list: [],
        isLoading: false,
    });

    const { book_list, isLoading } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const __handleGetData = () => {
        updateState({ isLoading: true });
        __postApiData("/webservice/getLibraryBooks", {
            student_id: student_id,
        })
            .then((res) => {
                if (res?.status == 200) {
                    console.log("first", res?.data);
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
            "book_title": "Book Title 1",
            "author": "Author 1",
            "subject": "Subject 1",
            "publisher": "Publisher 1",
            "rack_no": "Rack No. 1",
            "quantity": 10,
            "price": 25.99,
            "post_date": "2024-05-11T12:30:45Z"
        },
        {
            "id": 2,
            "book_title": "Book Title 2",
            "author": "Author 2",
            "subject": "Subject 2",
            "publisher": "Publisher 2",
            "rack_no": "Rack No. 2",
            "quantity": 5,
            "price": 19.99,
            "post_date": "2024-05-10T10:15:30Z"
        },
        {
            "id": 3,
            "book_title": "Book Title 3",
            "author": "Author 3",
            "subject": "Subject 3",
            "publisher": "Publisher 3",
            "rack_no": "Rack No. 3",
            "quantity": 15,
            "price": 32.50,
            "post_date": "2024-05-09T14:20:00Z"
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
                    paddingTop: 30,
                    backgroundColor: Colors.whiteColor,
                }}
            >
                {titleBox()}
                <FlatList
                    // data={book_list}
                    data={book_list}
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
                                    No Books in Library
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
                        Your Books is
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
                    Library Books
                </Text>
            </View>
        );
    }
};

export default BooksScreen;
