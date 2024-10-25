import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { Image } from "react-native";
import CartBox from "./CartBox";
import { __postApiData } from "../../utils/api";
import { useFocusEffect } from "@react-navigation/native";
import SelectForm from "../../modules/SelectForm";
const daysList = [
  {
    name: "Sunday",
    id: "0",
  },
  {
    name: "Monday",
    id: "1",
  },
  {
    name: "Tuesday",
    id: "2",
  },
  {
    name: "Wednesday",
    id: "3",
  },
  {
    name: "Thursday",
    id: "4",
  },
  {
    name: "Friday",
    id: "5",
  },
  {
    name: "Saturday",
    id: "6",
  },
];

const DayList = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
const ExamCopyScreen = ({ navigation, route }) => {
  const { student_id } = route.params;
  console.log(student_id, "student id");
  const [state, setState] = useState({
    list: [],
    isLoading: false,
    isShow: false,
    day: {
      id: new Date().getDay().toString(),
      name: DayList[new Date().getDay()],
    },
  });
  const result = [
    {
      examgroup: "Examgroup",
      exam: "EXAM",
      subject: "physics",
      filecount: "2",
      files: [
        "https://erp.techsallysolutions.com/exam/pankaj-public-school/2024/examgroup/exam/i/lotus/physics/6636249a73e49-img0019.jpg",
        "https://erp.techsallysolutions.com/exam/pankaj-public-school/2024/examgroup/exam/i/lotus/physics/6636249a743ce-img0020.jpg",
      ],
    },
    {
      examgroup: "Examgroup",
      exam: "EXAM",
      subject: "physics2",
      filecount: "2",
      files: [
        "https://erp.techsallysolutions.com/exam/pankaj-public-school/2024/examgroup/exam/i/lotus/physics/6636249a73e49-img0019.jpg",
        "https://erp.techsallysolutions.com/exam/pankaj-public-school/2024/examgroup/exam/i/lotus/physics/6636249a743ce-img0020.jpg",
      ],
    },
  ];
  const { list, isLoading, isShow, day } = state;
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  //   console.log(list, "list");
  const __handleGetData = () => {
    updateState({ isLoading: true });
    __postApiData("/webservice/getExamCopy", { student_id: student_id })
      .then((res) => {
        console.log(res, "res");
        if (res?.status == 400) {
          console.log(res.result, "res result");
          updateState({
            list: res?.result || [],
            isLoading: false,
          });
        } else {
          updateState({
            list: [],
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        updateState({ list: [], isLoading: false });
        console.log(error);
      });
  };
  useFocusEffect(
    useCallback(() => {
      __handleGetData();
      return () => {};
    }, [])
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
      <StatusBar
        backgroundColor={Colors.primaryColor}
        barStyle={"light-content"}
      />
      <SelectForm
        isShow={isShow}
        list={daysList}
        title={"Select day"}
        selected={day?.id || null}
        isSearchable
        onSelected={(value) => {
          updateState({ day: value, isShow: false });
        }}
        onBackdrop={() => {
          updateState({ isShow: false });
        }}
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
        <FlatList
          ListHeaderComponent={
            <>
              {/* <View
                                style={{
                                    alignItems: "flex-end",
                                    marginEnd: 20,
                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => {
                                        updateState({ isShow: true });
                                    }}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 5,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        padding: 5,
                                        paddingHorizontal: 10,
                                        backgroundColor: Colors.whiteColor,
                                        elevation: 1,
                                        borderColor: Colors.primaryColor,
                                    }}
                                >
                                    <Text
                                        style={{ ...Fonts.blackColor15Medium }}
                                    >
                                        {day?.name}
                                    </Text>
                                    <Entypo
                                        name="calendar"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                </TouchableOpacity>
                            </View> */}
            </>
          }
          // data={
          //     list
          //         ? [
          //             {
          //                 id: 1, name: day.name, list: list[day.name] || [],
          //             },
          //         ] : []
          // }
          data={list}
          // data={result}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CartBox item={item} />}
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
            Your Exam
          </Text>
          <Text
            style={{
              ...Fonts.blackColor22Medium,
              lineHeight: 30,
            }}
          >
            Copy is here!
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
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          color={Colors.whiteColor}
          onPress={() => navigation.goBack()}
          style={{
            paddingTop: 5,
          }}
        />
        <Text
          style={{
            ...Fonts.primaryColor19Medium,
            paddingHorizontal: Sizes.fixPadding * 2.0,
            color: Colors.whiteColor,
          }}
        >
          Exam Copy
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({});

export default ExamCopyScreen;
