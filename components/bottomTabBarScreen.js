import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Colors, Fonts } from "../constant/styles";
import StudentDetails from "../screens/studentDetails/studentDetails";
import ProfileBox from "../screens/studentDetails/ProfileBox";
import DailyReport from "../screens/studentDetails/DailyReport";
import { __getUser } from "../utils/localization";
const { width, height } = Dimensions.get("screen");

const BottomTabBarScreen = ({ navigation, route }) => {
  const [state, setState] = useState({
    currentIndex: 1,
  });
  console.log(__getUser().parent_childs.student_id, "getuser");

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { currentIndex } = state;
  // console.log(route.params, "route.params");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
        <View style={{ height: height - 80 }}>
          {currentIndex == 1 ? (
            <StudentDetails
              navigation={navigation}
              user={route?.params || {}}
            />
          ) : currentIndex == 2 ? (
            <DailyReport navigation={navigation} user={route?.params || {}} />
          ) : (
            <ProfileBox navigation={navigation} user={route?.params || {}} />
          )}
        </View>
        <View style={styles.bottomTabBarStyle}>
          {bottomTabBarItem({
            index: 1,
            title: "Dashboard",
          })}
          {bottomTabBarItem({
            index: 2,
            title: "Daily Report",
          })}
          {bottomTabBarItem({
            index: 3,
            title: "Profile",
          })}
        </View>
      </View>
    </SafeAreaView>
  );

  function bottomTabBarItem({ index, title }) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ alignItems: "center", width: "33%" }}
        onPress={() => updateState({ currentIndex: index })}
      >
        {index == 1 ? (
          <MaterialIcons
            name="dashboard"
            size={24}
            color={
              index == currentIndex ? Colors.primaryColor : Colors.grayColor
            }
          />
        ) : index == 2 ? (
          <AntDesign
            name="areachart"
            size={24}
            color={
              index == currentIndex ? Colors.primaryColor : Colors.grayColor
            }
          />
        ) : (
          <FontAwesome
            name="user-circle"
            size={24}
            color={
              index == currentIndex ? Colors.primaryColor : Colors.grayColor
            }
          />
        )}
        <Text
          style={
            index == currentIndex
              ? { ...Fonts.primaryColor12Medium }
              : { ...Fonts.grayColor12Medium }
          }
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default BottomTabBarScreen;

const styles = StyleSheet.create({
  bottomTabBarStyle: {
    position: "absolute",
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    height: 60.0,
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "rgba(128, 128, 128, 0.1)",
    borderTopWidth: 1.0,
    elevation: 2.0,
  },
});
