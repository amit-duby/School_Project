import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import {
    MaterialIcons,
    MaterialCommunityIcons,
    AntDesign,
} from "@expo/vector-icons";
import { Dialog } from "react-native-paper";

const { width } = Dimensions.get("screen");

const ProfileScreen = ({ navigation }) => {
    const [state, setState] = useState({
        logoutDialog: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { logoutDialog } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {userInfo()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, backgroundColor: "#F4F4F4" }}
                >
                    {settingsInfo()}
                    {logOutInfo()}
                </ScrollView>
            </View>
            {logoutDialogFun()}
        </SafeAreaView>
    );

    function logoutDialogFun() {
        return (
            <Dialog visible={logoutDialog} style={styles.dialogContainerStyle}>
                <View
                    style={{ backgroundColor: "white", alignItems: "center" }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor19Medium,
                            paddingBottom: Sizes.fixPadding - 5.0,
                        }}
                    >
                        You sure want to logout?
                    </Text>
                    <View style={styles.cancelAndLogoutButtonWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => updateState({ logoutDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor19Regular }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                                updateState({ logoutDialog: false });
                                navigation.navigate("Welcome");
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor19Regular }}>
                                Log out
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog>
        );
    }

    function logOutInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({ logoutDialog: true })}
                style={styles.logOutInfoWrapStyle}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons
                        name="login-variant"
                        size={24}
                        color={Colors.grayColor}
                    />
                    <Text
                        style={{
                            ...Fonts.blackColor17Regular,
                            marginLeft: Sizes.fixPadding,
                            width: width / 1.8,
                        }}
                    >
                        Logout
                    </Text>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={18}
                    color={Colors.grayColor}
                />
            </TouchableOpacity>
        );
    }

    function settingsInfo() {
        return (
            <View style={styles.settingInfoWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() =>
                        navigation.navigate("Notifications", {
                            from: "profile",
                        })
                    }
                >
                    {settings({
                        icon: (
                            <MaterialIcons
                                name="notifications"
                                size={22}
                                color={Colors.grayColor}
                            />
                        ),
                        setting: "Notifications",
                    })}
                </TouchableOpacity>
                {settings({
                    icon: (
                        <AntDesign
                            name="earth"
                            size={20}
                            color={Colors.grayColor}
                        />
                    ),
                    setting: "Language",
                })}
                {settings({
                    icon: (
                        <MaterialIcons
                            name="settings"
                            size={22}
                            color={Colors.grayColor}
                        />
                    ),
                    setting: "Settings",
                })}
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push("InviteFriends")}
                >
                    {settings({
                        icon: (
                            <MaterialIcons
                                name="group-add"
                                size={24}
                                color={Colors.grayColor}
                            />
                        ),
                        setting: "Invite Friends",
                    })}
                </TouchableOpacity>
                {settings({
                    icon: (
                        <MaterialIcons
                            name="headset-mic"
                            size={22}
                            color={Colors.grayColor}
                        />
                    ),
                    setting: "Support",
                })}
            </View>
        );
    }

    function settings({ icon, setting }) {
        return (
            <View style={styles.settingStyle}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {icon}
                    <Text
                        style={{
                            ...Fonts.blackColor17Regular,
                            marginLeft: Sizes.fixPadding,
                            width: width / 1.8,
                        }}
                    >
                        {setting}
                    </Text>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={18}
                    color={Colors.grayColor}
                />
            </View>
        );
    }

    function userInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push("EditProfile")}
                style={styles.userInfoWrapStyle}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={require("../../assets/images/user.png")}
                        // source={{ uri: item.bannerImage }}
                        style={{
                            width: 80.0,
                            height: 80.0,
                            borderRadius: Sizes.fixPadding - 5.0,
                        }}
                        resizeMode="cover"
                    />
                    <View style={styles.userInfoStyle}>
                        <Text
                            style={{
                                ...Fonts.blackColor17Medium,
                                width: width / 2.3,
                            }}
                        >
                            Ellison Perry
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Medium }}>
                            123456789
                        </Text>
                    </View>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={18}
                    color={Colors.grayColor}
                />
            </TouchableOpacity>
        );
    }

    function header() {
        return (
            <Text
                style={{
                    ...Fonts.blackColor20Medium,
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                    paddingVertical: Sizes.fixPadding * 2.0,
                }}
            >
                Profile
            </Text>
        );
    }
};

const styles = StyleSheet.create({
    userInfoWrapStyle: {
        flexDirection: "row",
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: Sizes.fixPadding * 2.0,
    },
    userInfoStyle: {
        height: 80.0,
        justifyContent: "space-between",
        paddingVertical: Sizes.fixPadding,
        marginLeft: Sizes.fixPadding,
    },
    logOutInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        flexDirection: "row",
        marginVertical: Sizes.fixPadding,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: "#F1F1F1",
        borderWidth: 2.0,
    },
    settingInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        margin: Sizes.fixPadding,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderColor: "#F1F1F1",
        borderWidth: 2.0,
    },
    settingStyle: {
        flexDirection: "row",
        marginVertical: Sizes.fixPadding - 1.0,
        alignItems: "center",
        justifyContent: "space-between",
    },

    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        alignSelf: "center",
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
    },
    cancelButtonStyle: {
        flex: 0.5,
        backgroundColor: "#E0E0E0",
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    logOutButtonStyle: {
        flex: 0.5,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: Sizes.fixPadding + 5.0,
    },
    cancelAndLogoutButtonWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: Sizes.fixPadding * 2.0,
    },
});

export default ProfileScreen;
