import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constant/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Mukta_Light: require("../assets/fonts/mukta/Mukta-Light.ttf"),
                Mukta_Medium: require("../assets/fonts/mukta/Mukta-Medium.ttf"),
                Mukta_Regular: require("../assets/fonts/mukta/Mukta-Regular.ttf"),
                Pacifico_Regular: require("../assets/fonts/pecifico/Pacifico-Regular.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;





