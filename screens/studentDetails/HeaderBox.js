import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { __ROLE, __getRole } from "../../utils/localization";
import { Dialog } from "@rneui/themed";
import { StyleSheet } from "react-native";
const { width } = Dimensions.get("screen");

const HeaderBox = ({ navigation, name }) => {
    const [state, setState] = useState({ logoutDialog: false });
    const { logoutDialog } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    // console.log(__ROLE, '__ROLE')
    return (
        <>
            <View
                style={{
                    padding: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: Colors.whiteColor,
                    paddingVertical: 15,
                    marginBottom: 5,
                    justifyContent: "space-between",
                    elevation: 2
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {__getRole() == "student" ? (
                        <MaterialIcons
                            name="home"
                            size={25}
                            color={Colors.primaryColor}
                        />
                    ) : (
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={20}
                            color={Colors.primaryColor}
                            onPress={() => navigation.goBack()}
                        />
                    )}
                    <Text
                        style={{
                            ...Fonts.primaryColor19Medium,
                            paddingHorizontal: Sizes.fixPadding * 2.0,
                        }}
                    >
                        {name}
                    </Text>
                </View>
                {__getRole() == "student" && (
                    <AntDesign
                        onPress={() => {
                            updateState({ logoutDialog: true });
                        }}
                        name="logout"
                        size={24}
                        color={Colors.primaryColor}
                    />
                )}
            </View>
            {logoutDialogFun()}
        </>
    );
    function logoutDialogFun() {
        return (
            <Dialog
                visible={logoutDialog}
                overlayStyle={styles.dialogContainerStyle}
            >
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
                                navigation.navigate("CreateAccount");
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
};

export default HeaderBox;

const styles = StyleSheet.create({
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        alignSelf: "center",
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: 10,
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
