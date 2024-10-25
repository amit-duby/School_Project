import React, { useCallback } from "react";
import { View, SafeAreaView, StatusBar, Text, BackHandler } from "react-native";
import { Fonts } from "../constant/styles";
import { useFocusEffect } from "@react-navigation/native";
import { pathUrl } from "../utils/api/constant";
import { __getToken, __getRole, __getUser } from "../utils/localization";
import { __getLocalStorageData } from "../utils/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  // setTimeout(() => {
  //     navigation.push("CreateAccount");
  //     // navigation.navigate('OnBoarding');

  // }, 2000);

  setTimeout(async () => {
    try {
      //   const token = await AsyncStorage.getItem("authToken");
      const token = await __getLocalStorageData("token");
      const record = await __getLocalStorageData("user");
      //   const record = await AsyncStorage.getItem("user");

      //   const token = __getToken();
      const role = __getRole();
      const user = __getUser();
      // const localStorage = __getLocalStorageData()
      console.log(token, "token");
      console.log(role, "role");
      console.log(record, "record");

      if (!token) {
        await navigation.push("OnBoarding");
        console.log("Navigating to OnBoarding");
      } else {
        await navigation.push("CreateAccount");
        // await navigation.push("HomeScreen");
        // await navigation.navigate("HomeScreen", {
        //   //   students: user?.parent_childs,
        //   students: record?.parent_childs,
        // });
        console.log("Token present in local storage");
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }
  }, 2000);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#242E4D" }}>
      <StatusBar translucent={false} backgroundColor="#242E4D" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ ...Fonts.primaryColor40PacificoRegular }}>
          School ERP
        </Text>
        <Text style={{ ...Fonts.whiteColor19Regular }}></Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
