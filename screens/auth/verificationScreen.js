import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';
import OTPTextView from 'react-native-otp-textinput';

const { width } = Dimensions.get('screen');

const VerificationScreen = ({ navigation }) => {

    const [otpInput, setotpInput] = useState('');
    const [isLoading, setisLoading] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {backArrow()}
                {verificationInfo()}
                {otpFields()}
                {continueButton()}
            </View>
            {loading()}
        </SafeAreaView>
    )

    function loading() {
        return (
            <Dialog.Container
                visible={isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={40} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor16Medium,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Please wait..
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    function otpFields() {
        return (
            <OTPTextView
                containerStyle={{ marginTop: Sizes.fixPadding * 4.0, marginHorizontal: Sizes.fixPadding * 2.0, }}
                handleTextChange={(text) => {
                    setotpInput(text)
                    if (otpInput.length == 3) {
                        setisLoading(true)
                        setTimeout(() => {
                            setisLoading(false)
                            navigation.push('BottomTabBar')
                        }, 2000);
                    }
                }}
                inputCount={4}
                keyboardType="numeric"
                tintColor={Colors.primaryColor}
                offTintColor={'transparent'}
                textInputStyle={{ ...styles.textFieldStyle }}
            />
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    if (otpInput.length == 4) {
                        setisLoading(true)
                        setTimeout(() => {
                            setisLoading(false)
                            navigation.push('BottomTabBar')
                        }, 2000);
                    }
                }}
                style={{
                    backgroundColor: otpInput.length == 4 ? Colors.primaryColor : Colors.grayColor,
                    ...styles.continueButtonStyle,
                }}>
                <Text style={{ ...Fonts.whiteColor19Regular }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function verificationInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding,
                marginBottom: Sizes.fixPadding + 5.0,
            }}>
                <Text style={{ ...Fonts.blackColor22Medium }}>
                    Verification details
                </Text>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Enter the OTP sent to your mobile number
                </Text>
            </View>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons name="arrow-back" size={24} color="black"
                style={{ margin: Sizes.fixPadding * 2.0 }}
                onPress={() => navigation.goBack()}
            />
        )
    }
}

const styles = StyleSheet.create({
    continueButtonStyle: {
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding * 2.5,
        position: 'absolute',
        bottom: 20.0,
        left: 0.0,
        right: 0.0
    },
    textFieldStyle: {
        borderBottomWidth: null,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        ...Fonts.blackColor19Medium,
        elevation: 1.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 60,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
})

export default VerificationScreen;