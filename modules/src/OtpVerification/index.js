import React from "react";
import {
    Colors,
    Sizes,
    otpMainBoxDefaultStyle,
    otpContainerDefaultStyle,
    otpTitleDefaultStyle,
    otpSubButtonDefaultStyle,
    otpButtonDefaultStyle,
} from "../../style/defaultStyle";
import OTPTextView from "react-native-otp-textinput";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Wave } from "react-native-animated-spinkit";

const OtpVerification = ({
    isShow,
    onButtonClick,
    onSubButtonClick,
    onTextChange,
    onClose,
    autoSubmit,
    isShowClose,
    title,
    subButtonText,
    buttonText,
    value,
    valueKey,
    customTitleStyle,
    customSubButtonStyle,
    customButtonStyle,
    inputCount,
    isLoading,
}) => {
    return (
        isShow == true && (
            <View
                style={{
                    ...otpMainBoxDefaultStyle,
                }}
            >
                <View
                    style={{
                        ...otpContainerDefaultStyle,
                    }}
                >
                    {(isShowClose || isShowClose != false) && closeButton()}
                    {verifyTitle()}
                    {otpFields()}
                    {loader()}
                    {resendButton()}
                    {submitButton()}
                </View>
            </View>
        )
    );

    function loader(params) {
        return (
            isLoading && (
                <ActivityIndicator
                    size="large"
                    color={Colors.primaryColor}
                    style={{ marginTop: 20 }}
                />
            )
        );
    }

    function closeButton(params) {
        return (
            <TouchableOpacity
                style={{
                    alignSelf: "flex-end",
                    paddingTop: 15,
                    paddingEnd: 15,
                }}
                onPress={() => {
                    if (isLoading) return;
                    onClose();
                }}
                activeOpacity={0.8}
            >
                <MaterialIcons
                    name="close"
                    size={25}
                    color={Colors.primaryColor}
                />
            </TouchableOpacity>
        );
    }
    function submitButton(params) {
        return (
            <TouchableOpacity
                style={{}}
                activeOpacity={0.8}
                onPress={() => {
                    if (isLoading) return;
                    onButtonClick();
                }}
            >
                <Text
                    style={{
                        ...otpButtonDefaultStyle,
                        ...customButtonStyle,
                        opacity: isLoading ? 0.6 : 1,
                    }}
                >
                    {buttonText || "Submit"}
                </Text>
            </TouchableOpacity>
        );
    }
    function resendButton(params) {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (isLoading) return;
                    onSubButtonClick();
                }}
                activeOpacity={0.8}
            >
                <Text
                    style={{
                        ...otpSubButtonDefaultStyle,
                        ...customSubButtonStyle,
                        opacity: isLoading ? 0.6 : 1,
                    }}
                >
                    {subButtonText || "Resend"}
                </Text>
            </TouchableOpacity>
        );
    }

    function verifyTitle() {
        return (
            <Text
                style={{
                    ...otpTitleDefaultStyle,
                    ...customTitleStyle,
                }}
            >
                {title || "Verify it's you"}
            </Text>
        );
    }
    function otpFields() {
        return (
            <OTPTextView
                containerStyle={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
                handleTextChange={(text) => {
                    if (isLoading) return;
                    if (onTextChange) {
                        if (valueKey) {
                            onTextChange({ [valueKey]: text });
                        } else {
                            onTextChange(text);
                        }
                    }

                    if (autoSubmit) {
                        if (text.length == 4) {
                            if (valueKey) {
                                return autoSubmit({ [valueKey]: text });
                            }
                            autoSubmit(text);
                        }
                    }
                }}
                inputCount={inputCount || 4}
                keyboardType="numeric"
                tintColor={Colors.primaryColor}
                textInputStyle={{ ...styles.textFieldStyle }}
                textInputProps={{ editable: false }}
            />
        );
    }
};

const styles = StyleSheet.create({
    textFieldStyle: {
        borderBottomWidth: null,
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderColor: "#fff",
    },
});

export default OtpVerification;
