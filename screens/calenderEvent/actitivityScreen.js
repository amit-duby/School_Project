import React, { useCallback, useState } from "react";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { __postApiData } from "../../utils/api";
import { __ROLE } from "../../utils/localization";
import Loader from "../../modules/src/Loader";

const ActivityScreen = ({ navigation, route }) => {
  const { student_id } = route.params;

  const [state, setState] = useState({
    isLoading: false,
  });
  const { isLoading } = state;
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const [notification, setNotification] = useState([]);

  const __handleGetNotification = () => {
    updateState({ isLoading: true });
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so add 1 to get the current month
    __postApiData("/webservice/getActivitys", {
      student_id: student_id,
      //   type: __ROLE,
      year: currentYear,
      month: currentMonth,
    })
      .then((res) => {
        console.log(res, "res");
        const list = res?.data?.map((item) => ({
          title: item.title,
          id: item.to_time,
          date: item.m_date,
          to_time: item.to_time,
          message: item.message,
          incharge: item.incharge,
        }));
        updateState({ isLoading: false });

        console.log(list, "list");
        // updateState({ notification: list });
        setNotification(list);
      })
      .catch((error) => {
        updateState({ isLoading: false });
        console.log(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      __handleGetNotification();
      return () => {};
    }, [])
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Colors.primaryColor}
        barStyle={"light-content"}
      />
      <Loader
        isShow={state.isLoading}
        backgroundColor="rgba(0,0,0,0.2)"
        color={Colors.primaryColor}
        size={40}
      />
      {backArrow()}
      {titleBox()}
      <NoticeBox
        notification={notification}
        setNotification={setNotification}
      />
    </SafeAreaView>
  );

  function titleBox(params) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              ...Fonts.blackColor22Medium,
              lineHeight: 30,
            }}
          >
            School
          </Text>
          <Text
            style={{
              ...Fonts.blackColor22Medium,
              lineHeight: 30,
            }}
          >
            Activities
          </Text>
        </View>

        <Image
          source={require("../../assets/images/calender.png")}
          style={{
            width: 140,
            resizeMode: "center",
            height: 100,
            alignSelf: "flex-end",
            marginBottom: 10,
          }}
        />
      </View>
    );
  }

  function backArrow() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.primaryColor,
          elevation: 2,
        }}
      >
        <View style={{ ...styles.backArrowWrapStyle }}>
          <MaterialIcons
            name="chevron-left"
            color={Colors.whiteColor}
            size={26}
            onPress={() => navigation.pop()}
          />
        </View>
        <Text style={{ ...Fonts.whiteColor20Regular }}>School Activities</Text>
      </View>
    );
  }
};

const NoticeBox = ({ notification, setNotification }) => {
  const [showNotice, setShowNotice] = useState(false);

  // const toggleNotice = () => {
  //     setShowNotice(!showNotice);
  // };
  const toggleNotice = (id) => {
    setNotification((prevNotices) => {
      return prevNotices.map((data) => {
        if (data.id === id) {
          return { ...data, showNotice: !data.showNotice };
        } else {
          return data;
        }
      });
    });
  };

  const renderNoticeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.noticeItem}
      onPress={() => toggleNotice(item.id)}
    >
      <Text style={styles.noticeTitle}>{item.title}</Text>
      {item.showNotice && (
        <View style={styles.noticeDetails}>
          <Text style={styles.noticeText}>Message: {item.message}</Text>
          <Text style={styles.noticeDate}> Date: {item.date}</Text>
          <Text style={styles.noticeDate}>Time: {item.to_time}</Text>
          <Text style={styles.noticeDate}>Incharge: {item.incharge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notification}
        renderItem={renderNoticeItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backArrowWrapStyle: {
    width: 40.0,
    height: 40.0,
    // borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 1.0,
    marginHorizontal: Sizes.fixPadding * 1.0,
    // borderWidth: 0.3,
    // borderColor: Colors.grayColor,
    marginBottom: 10,
  },

  // notice box style
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: Colors.bodyColor,
  },
  noticeItem: {
    // padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    margin: 5,
    padding: 25,
    borderRadius: 25,
    backgroundColor: Colors.whiteColor,
    elevation: 3,
  },
  noticeTitle: {
    ...Fonts.blackColor16Medium,
  },
  noticeDetails: {
    marginTop: 8,
  },
  noticeText: {
    ...Fonts.grayColor16Medium,
    fontSize: 14,
    margin: 2,
    padding: 2,
  },
  noticeDate: {
    fontSize: 12,
    color: "#888",
    margin: 2,
    padding: 2,
  },
});

export default ActivityScreen;
