import React, { useCallback, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions,
    FlatList,
    RefreshControl,
    Alert,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { __getRole } from "../../utils/localization";
import HeaderBox from "./HeaderBox";
import SelectType from "./SelectType";
import ProfilePersionalCom from "../../components/ProfilePersionalCom";
import ProfileOtherCom from "../../components/ProfileOtherCom";
import ProfileparentsCom from "../../components/ProfileparentsCom";
import { __postApiData } from "../../utils/api";
const { width } = Dimensions.get("screen");
import { useFocusEffect } from "@react-navigation/native";
import { URL } from "../../utils/api/constant";

const ProfileBox = ({ navigation, user }) => {
    const [state, setState] = useState({
        tab: 0,
        logoutDialog: false,
        isLoading: false,
    });
    const { isLoading } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    // console.log(state, 'state')
    const __handleGetData = () => {
        updateState({ isLoading: true });

        __postApiData("/webservice/getStudentProfile", {
            student_id: user?.student_id,
            user_type: "student",
        })
            .then((res) => {
                console.log(res.student_result.image, 'res')
                // console.log(res?.student_result, 'student_result');
                if (res?.student_result) {
                    updateState({ ...res?.student_result, isLoading: false });
                } else {
                    updateState({ isLoading: false });
                    Alert.alert("", "Something went wrong");
                }
            })
            .catch((error) => {
                updateState({ isLoading: false });
                Alert.alert("", "Something went wrong");
            });
    };
    useFocusEffect(
        useCallback(() => {
            __handleGetData();
            return () => { };
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle={"light-content"}
            />
            <View style={{ flex: 1 }}>
                <HeaderBox navigation={navigation} name={"Profile"} />
                <FlatList
                    ListHeaderComponent={
                        <>
                            {userInfo()}
                            <SelectType
                                updateParentState={updateState}
                                tab={state.tab}
                            />
                            {state.tab == 0 ? (
                                <ProfilePersionalCom state={state} />
                            ) : state.tab == 1 ? (
                                <ProfileparentsCom state={state} />
                            ) : (
                                <ProfileOtherCom state={state} />
                            )}
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                __handleGetData();
                            }}
                            colors={[Colors.primaryColor]}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    );

    function userInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.userInfoWrapStyle}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flex: 1,
                    }}
                >
                    <View style={styles.userInfoStyle}>
                        <Text
                            style={{
                                ...Fonts.blackColor17Medium,
                                fontStyle: "bold",
                                fontSize: 25,
                            }}
                        >
                            {state?.firstname}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor16Regular,
                                fontSize: 14,
                            }}
                        >
                            Class: {state?.class} - Section: {state?.section}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor16Regular,
                                fontSize: 14,
                            }}
                        >
                            Admission No : {state?.admission_no}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor16Regular,
                                fontSize: 14,
                            }}
                        >
                            Roll Number : {state?.roll_no}
                        </Text>
                        {/* <View style={{ flexDirection: "row", gap: 20 }}>
                            <Text
                                style={{
                                    ...Fonts.blackColor16Regular,
                                    fontSize: 14,
                                }}
                            >
                                Roll No.
                            </Text>

                            <Image
                                source={
                                    {
                                        uri: `${URL}/${state?.image}`
                                    }
                                }
                                style={{
                                    width: 100.0,
                                    height: 40.0,
                                    borderRadius: Sizes.fixPadding - 5.0,
                                }}
                                resizeMode="cover"
                            />
                        </View> */}
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Image
                            // source={
                            //     { uri: `${URL}/${state?.image}` }
                            // }
                            source={
                                state?.image
                                    ? {
                                        uri: `${URL}/${state?.image}`
                                    }
                                    : require("../../assets/images/user.png")
                            }
                            style={{
                                width: 80.0,
                                height: 80.0,
                                borderRadius: 5.0,
                            }}
                            resizeMode="cover"
                        />
                        <Text
                            style={{
                                ...Fonts.blackColor16Regular,
                                fontSize: 14,
                                marginTop: 10,
                                lineHeight: 20,
                            }}
                        >
                            Behaviour Score:
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor16Regular,
                                fontSize: 20,
                            }}
                        >
                            {state.behaviou_score || 0}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    userInfoWrapStyle: {
        flexDirection: "row",
        marginHorizontal: Sizes.fixPadding * 0.5,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: Sizes.fixPadding * 0.5,
        padding: 10,
        backgroundColor: Colors.whiteColor,
        borderRadius: 20,
        // elevation: 0.5,
        elevation: 3
    },
    userInfoStyle: {
        justifyContent: "space-between",
        paddingVertical: Sizes.fixPadding,
        marginLeft: Sizes.fixPadding,
    },
});

export default ProfileBox;
