import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { __getRole } from "../../utils/localization";
import HeaderBox from "./HeaderBox";

const DailyReport = ({ navigation }) => {
    const [state, setState] = useState({
        logoutDialog: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle={"light-content"}
            />
            <View style={{ flex: 1 }}>
                <HeaderBox navigation={navigation} name={"Daily Report"} />
            </View>
        </SafeAreaView>
    );
};

export default DailyReport;
