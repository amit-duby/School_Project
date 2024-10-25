import React, { useCallback, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  Alert,
  BackHandler,
  ScrollView,
} from "react-native";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { __postApiData } from "../../utils/api";
import { pathUrl } from "../../utils/api/constant";
import { __setLocalization } from "../../utils/localization";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "../../modules/src/Loader";
import { __setLocalStorageData } from "../../utils/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
const CreateAccountScreen = ({ navigation }) => {
  const [state, setState] = useState({
    // email: "std2230",
    // password: "58be3s",
    email: "parent1826",
    password: "1234",
    tab: 1,
    isLoading: false,
  });
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { tab, email, password, stage } = state;

  const __handleLogin2 = () => {
    updateState({ isLoading: true });
    __postApiData(pathUrl.LOGIN_API_URL, {
      username: email,
      password: password,
      deviceToken: "deviceToken",
    })
      .then((res) => {
        // console.log(JSON.stringify(res));
        // console.log(res, 'res')
        if (res?.data?.users?.status == 1) {
          updateState({ isLoading: false });
          if (res?.data?.users?.role == "student") {
            console.log(res, "res");
            __setLocalization(res?.token, res?.record, res?.role);
            navigation.navigate("BottomTabBar", { ...res?.record });
          } else if (res?.data?.users?.role == "parent") {
            console.log(res, "res");
            __setLocalization(res?.token, res?.record, res?.role);
            navigation.navigate("HomeScreen", {
              students: res?.data?.users?.record?.parent_childs,
            });
          }
        } else {
          console.log(res, "else res");
          updateState({ isLoading: false });
          Alert.alert("Login failed", res?.message);
        }
      })
      .catch((error) => {
        updateState({ isLoading: false });
        // console.log(JSON.stringify(error))
        console.log(error);
      });
  };

  const __handleLogin = async () => {
    updateState({ isLoading: true });
    __postApiData(pathUrl.LOGIN_API_URL, {
      username: email,
      password: password,
      deviceToken: "deviceToken",
    })
      .then((res) => {
        // console.log(JSON.stringify(res));
        // console.log(res, 'res')
        if (res?.status == 1) {
          updateState({ isLoading: false });
          console.log(res.record?.parent_childs[0].school_id, "res school_id");
          //   __setLocalStorageData("token", res.authtoken);
          if (res?.role == "student") {
            console.log(res, "res student");
            // __setLocalization(res?.token, res?.record, res?.role);
            __setLocalStorageData("token", res.authtoken);
            __setLocalization(
              res?.authtoken,
              res?.record,
              res?.role,
              res?.record?.parent_childs[0].school_id
            );
            navigation.navigate("BottomTabBar", { ...res?.record });
          } else if (res?.role == "parent") {
            console.log(res, "res if parent");
            __setLocalStorageData("token", res.authtoken);
            // __setLocalStorageData("user", res?.record);
            const token = AsyncStorage.setItem("user", res?.record);
            // console.log(token, "token");
            __setLocalization(
              res?.authtoken,
              res?.record,
              res?.role,
              res?.record?.parent_childs[0].school_id
            );
            navigation.navigate("HomeScreen", {
              students: res?.record?.parent_childs,
            });
          }
        } else {
          console.log(res, "else res");
          updateState({ isLoading: false });
          Alert.alert("Login failed", res?.message);
        }
      })
      .catch((error) => {
        updateState({ isLoading: false });
        // console.log(JSON.stringify(error))
        console.log(error);
      });
  };

  const backAction = () => {
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ backgroundColor: Colors.primaryColor }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {signinSignupOptions()}
          {welcomeInfo()}
          <View style={styles.signinSignupInfoWrapStyle}>
            {/* {logo()} */}
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                // paddingBottom: 80,
                marginTop: 30,
              }}
            >
              {/* {loginType()} */}
              {nameTextField()}
              {mobileTextField()}
            </View>
            {continueButton()}
          </View>
          <Loader
            isShow={state.isLoading}
            backgroundColor="rgba(0,0,0,0.2)"
            color={Colors.primaryColor}
            size={40}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function nameTextField() {
    return (
      <View>
        <Text style={styles.textFieldTitle}>UserName:</Text>
        <View
          style={{
            ...styles.textFieldWrapStyle,
            marginBottom: Sizes.fixPadding * 2.0,
          }}
        >
          <TextInput
            value={email}
            onChangeText={(value) => updateState({ email: value })}
            placeholder="User Id"
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.blackColor16Regular,
              fontSize: 14,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
            }}
            selectionColor={Colors.primaryColor}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }

  function mobileTextField() {
    return (
      <View>
        <Text style={styles.textFieldTitle}>Password:</Text>
        <View
          style={{
            ...styles.textFieldWrapStyle,
            marginBottom: Sizes.fixPadding * 2.0,
          }}
        >
          <TextInput
            value={password}
            onChangeText={(value) => updateState({ password: value })}
            placeholder="Password"
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.blackColor16Regular,
              fontSize: 14,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
            }}
            selectionColor={Colors.primaryColor}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }
  function loginType(params) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          // marginTop: 80,
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.textFieldWrapStyle,
            marginBottom: Sizes.fixPadding * 2.0,
            width: "33.3%",
            marginHorizontal: 0,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            borderEndWidth: 0,
          }}
          onPress={() => {
            updateState({ tab: 1 });
          }}
          activeOpacity={0.8}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: tab == 1 ? Colors.whiteColor : Colors.lightGrayColor,
              marginEnd: 10,
              backgroundColor:
                tab == 1 ? Colors.primaryColor : Colors.whiteColor,
              elevation: tab == 1 ? 2 : 0,
            }}
          />
          <View style={{}}>
            <Text
              style={{
                ...Fonts.blackColor16Medium,
                fontSize: 13,
              }}
            >
              Parent
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.textFieldWrapStyle,
            marginBottom: Sizes.fixPadding * 2.0,
            width: "33.3%",
            marginHorizontal: 0,
            borderRadius: 0,
            borderEndWidth: 0,
          }}
          onPress={() => {
            updateState({ tab: 2 });
          }}
          activeOpacity={0.8}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: tab == 2 ? Colors.whiteColor : Colors.lightGrayColor,
              marginEnd: 10,
              backgroundColor:
                tab == 2 ? Colors.primaryColor : Colors.whiteColor,
              elevation: tab == 2 ? 2 : 0,
            }}
          />
          <View style={{}}>
            <Text
              style={{
                ...Fonts.blackColor16Medium,
                fontSize: 13,
              }}
            >
              Student
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.textFieldWrapStyle,
            marginBottom: Sizes.fixPadding * 2.0,
            width: "33.3%",
            marginHorizontal: 0,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
          }}
          onPress={() => {
            updateState({ tab: 3 });
          }}
          activeOpacity={0.8}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: tab == 3 ? Colors.whiteColor : Colors.lightGrayColor,
              marginEnd: 10,
              backgroundColor:
                tab == 3 ? Colors.primaryColor : Colors.whiteColor,
              elevation: tab == 3 ? 2 : 0,
            }}
          />

          <View style={{}}>
            <Text
              style={{
                ...Fonts.blackColor16Medium,
                fontSize: 13,
              }}
            >
              Staff
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          __handleLogin();
          // navigation.navigate("BottomTabBar")
          // navigation.navigate("HomeScreen")zz
        }}
        style={{
          backgroundColor: Colors.primaryColor,
          ...styles.continueButtonStyle,
        }}
      >
        <Text style={{ ...Fonts.whiteColor19Regular }}>Login</Text>
      </TouchableOpacity>
    );
  }
  function logo() {
    return (
      <View
        style={{
          alignSelf: "center",
          // marginTop: 20,
          marginTop: 100,
        }}
      >
        <Image
          source={require("../../assets/images/icon.png")}
          style={{
            resizeMode: "center",
            height: 100,
            width: 100,
            borderRadius: 50,
          }}
        />
      </View>
    );
  }
  function welcomeInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            ...Fonts.primaryColor22Medium,
            color: Colors.whiteColor,
          }}
        >
          Welcome back,
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...Fonts.whiteColor15Regular }}>
            Sign in to continue
          </Text>
          {/* <TouchableOpacity onPress={() => navigation.push("CreateAccount")}>
                        <Text style={{ ...Fonts.whiteColor15Regular, marginHorizontal: 5, textDecorationLine: 'underline' }}>
                            Or Signup
                        </Text>
                    </TouchableOpacity> */}
        </View>
      </View>
    );
  }
  function signinSignupOptions() {
    return (
      <View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginTop: Sizes.fixPadding * 4.0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              // backgroundColor: Colors.whiteColor,
              padding: 12,
              borderRadius: 20,
              // paddingHorizontal: 40,
            }}
          >
            <Image
              source={require("../../assets/erp.jpeg")}
              style={{
                resizeMode: "cover",
                // resizeMode: "center",
                width: 140,
                height: 100,
                borderRadius: 20,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  signinSignupInfoWrapStyle: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 3.0,
    borderTopRightRadius: Sizes.fixPadding * 3.0,
    padding: Sizes.fixPadding * 2.0,
  },
  mobileNumberWrapStyle: {
    height: 55.0,
    marginTop: Sizes.fixPadding,
  },
  continueButtonStyle: {
    height: 55.0,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding * 1.5,
    // marginTop: 100,
    marginTop: 50,
  },
  mobileNumberFieldStyle: {
    flex: 1,
    borderBottomWidth: 1.0,
    borderBottomColor: Colors.primaryColor,
    marginLeft: Sizes.fixPadding + 15.0,
    ...Fonts.blackColor17Medium,
  },
  textFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderWidth: 0.5,
    borderColor: Colors.lightGrayColor,
  },
  textFieldTitle: {
    ...Fonts.grayColor16Medium,
    marginBottom: 2,
    marginLeft: Sizes.fixPadding + 15.0,
  },
});

export default CreateAccountScreen;
