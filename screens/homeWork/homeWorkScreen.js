import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import WorkType from "./WorkType";
import WorkList from "./WorkList";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "react-native";
import { __postApiData } from "../../utils/api";
const { width } = Dimensions.get("screen");
import { useFocusEffect } from "@react-navigation/native";
import {
  __convertDateFormat,
  __formatDate,
  convertDateFormat,
  formatDateToISO,
} from "../../utils/function";

const HomeWorkScreen = ({ navigation, route }) => {
  const { student_id } = route.params;
  const [state, setState] = useState({
    logoutDialog: false,
    tab: 0,
    subject: { id: "0", name: "All" },
    isShowSubject: false,
    subject_list: [],
    list: [],
    closedWorklist: [],
    isLoading: false,
    isShowDate: false,
    date: new Date().toLocaleDateString(),
  });

  const { subject, tab, list, closedWorklist, isLoading, date, isShowSubject } =
    state;
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const __handleGetSubject = () => {
    __postApiData("/webservice/getstudentsubject", {
      student_id: student_id,
    })
      .then((res) => {
        const list = res?.subjectlist?.map((item) => ({
          name: item.name + " " + item.code,
          id: item.subject_id,
        }));
        updateState({ subject_list: list });
      })
      .catch((error) => {});
  };

  const __handleGetData = () => {
    console.warn(date, "date");
    updateState({ isLoading: true });
    __postApiData("/webservice/getHomework", {
      student_id: student_id,
      homework_status: ["pending", "submitted", "evaluated"][tab],
      //   date: formatDateToISO(date),
      date: convertDateFormat(date),
    })
      .then((res) => {
        if (res?.status == 200) {
          console.log(res, "res homeworklist");
          updateState({
            list: res?.homeworklist,
            closedWorklist: res?.closedhomeworklist,
            isLoading: false,
          });
        } else {
          updateState({ list: [], closedWorklist: [], isLoading: false });
        }
      })
      .catch((error) => {
        updateState({ list: [], closedWorklist: [], isLoading: false });
      });
  };
  useFocusEffect(
    useCallback(() => {
      updateState({ list: [], closedWorklist: [] });
      __handleGetData();
      return () => {};
    }, [tab, date])
  );
  useFocusEffect(
    useCallback(() => {
      __handleGetSubject();
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
      <StatusBar
        backgroundColor={Colors.primaryColor}
        barStyle={"light-content"}
      />
      {header()}

      <View
        style={{
          flex: 1,
          paddingTop: 30,
          backgroundColor: Colors.whiteColor,
        }}
      >
        {titleBox()}
        <View
          style={{
            backgroundColor: Colors.whiteColor,
            padding: 5,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            elevation: 0.5,
          }}
        >
          <WorkType state={state} updateParentState={updateState} />
        </View>
        <FlatList
          data={
            tab === 0
              ? list.filter(
                  (item) =>
                    item?.subject_name
                      ?.toLocaleLowerCase()
                      .search(
                        subject.name == "All"
                          ? ""
                          : subject.name?.trim()?.toLocaleLowerCase()
                      ) >= 0
                )
              : closedWorklist.filter(
                  (item) =>
                    item?.subject_name
                      ?.toLocaleLowerCase()
                      .search(
                        subject.name == "All"
                          ? ""
                          : subject.name?.trim()?.toLocaleLowerCase()
                      ) >= 0
                )
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WorkList
              item={item}
              navigation={navigation}
              student_id={student_id}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                __handleGetData();
              }}
              colors={[Colors.primaryColor]}
            />
          }
          ListFooterComponent={
            <>
              {!isLoading &&
                (tab === 0
                  ? list.length === 0
                  : closedWorklist.length === 0) && (
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 50,
                      ...Fonts.blackColor15Medium,
                    }}
                  >
                    No Homework Available
                  </Text>
                )}
            </>
          }
        />
      </View>
    </SafeAreaView>
  );

  function titleBox(params) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: Colors.whiteColor,
          borderRadius: 30,
          marginHorizontal: 10,
          marginBottom: 10,
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
            Your Homework
          </Text>
          <Text
            style={{
              ...Fonts.blackColor22Medium,
              lineHeight: 30,
            }}
          >
            is here!
          </Text>
        </View>

        <Image
          source={require("../../assets/images/homework.png")}
          style={{
            width: 140,
            resizeMode: "center",
            height: 100,
            alignSelf: "flex-end",
          }}
        />
      </View>
    );
  }

  function header() {
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
        }}
      >
        <TouchableOpacity>
          <MaterialIcons
            name="arrow-back-ios"
            size={20}
            color={Colors.whiteColor}
            onPress={() => navigation.goBack()}
            style={{
              paddingTop: 5,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            ...Fonts.primaryColor19Medium,
            paddingHorizontal: Sizes.fixPadding * 2.0,
            color: Colors.whiteColor,
          }}
        >
          Homework
        </Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('SubmitWorkScreen')}>
                    <Text
                        style={{
                            ...Fonts.primaryColor19Medium,
                            paddingHorizontal: Sizes.fixPadding,
                            color: Colors.whiteColor,
                            marginLeft: Sizes.fixPadding + 60
                        }}
                    >
                        ADD
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SubmitWorkScreen')}>
                    <FontAwesome5
                        name="file-upload"
                        size={20}
                        color={Colors.whiteColor}
                    />
                </TouchableOpacity> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({});

export default HomeWorkScreen;
