import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import {
  Foundation,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  Octicons,
} from "@expo/vector-icons";
import { Image } from "react-native";
import { __ROLE, __getRole } from "../../utils/localization";
import HeaderBox from "./HeaderBox";
import { useFocusEffect } from "@react-navigation/native";
import { baseUrl, URL } from "../../utils/api/constant";
import Carousel, { Pagination } from "react-native-snap-carousel-v4";

const StudentDetails = ({ navigation, user }) => {
  // console.log(user, 'user in studentdetails')
  const [state, setState] = useState({
    logoutDialog: false,
    activeSlide,
    CategoryActiveSlide,
  });
  const { activeSlide, CategoryActiveSlide } = state;
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const backAction = () => {
    return true;
  };

  const { width } = Dimensions.get("screen");
  const itemWidth = Math.round(width * 1.1);

  const [bannerSliderData, setBannerSliderData] = useState(bannerSliderList);

  const bannerSliderList = [
    // { bannerImage: require('../../assets/images/banner.png') },
    {
      bannerImage:
        "https://ideogram.ai/api/images/direct/-tp99k2lSWeJH46PahxCng.png",
    },
    {
      bannerImage:
        "https://ideogram.ai/api/images/direct/56bBybOxQJeArL6dml06PQ.png",
    },
    {
      bannerImage:
        "https://ideogram.ai/api/images/direct/sDkaTDCpSa2hiJhh2rAFaQ.png",
    },
    {
      bannerImage:
        "https://ideogram.ai/api/images/direct/qyaBT8uaRBOa4ekmLPrnIA.jpg",
    },
    {
      bannerImage:
        "https://ideogram.ai/api/images/direct/9X5bNkYVQaKj8UVGww512Q.png",
    },
  ];

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  const servicesData = [
    {
      id: "1",
      service: "Attendance",
      icon: <Octicons name="megaphone" color={Colors.whiteColor} size={30} />,
      path: "Attendance",
      // color: "#606C38",
      color: "#66BB6A",
      isActive: "",
    },
    {
      id: "2",
      service: "Homework",
      icon: <Feather name="phone-call" color={Colors.whiteColor} size={30} />,
      path: "HomeWork",
      // color: "#283618",
      color: "#EE534F",
    },
    {
      id: "3",
      service: "Class Timetable",
      icon: <FontAwesome5 name="tasks" color={Colors.whiteColor} size={30} />,
      // path: "StudentManagement",
      path: "TimeTable",
      // color: "#22B5D6",
      color: "#C0CA33",
    },
    {
      id: "4",
      service: "Library",
      icon: <Octicons name="log" color={Colors.whiteColor} size={30} />,
      // path: "StaffManagement",
      path: "Library",
      // color: "#2296D6",
      color: "#8BC24A",
    },
    {
      id: "5",
      service: "Fees",
      icon: (
        <MaterialCommunityIcons
          name="clipboard-list-outline"
          color={Colors.whiteColor}
          size={40}
        />
      ),
      path: "Fees",
      // color: "#2278D6",
      color: "#00828F",
    },
    {
      id: "6",
      service: "Online Exam",
      icon: <FontAwesome5 name="walking" color={Colors.whiteColor} size={30} />,
      path: "OnlineExamScreen",
      // color: "#2259D6",
      color: "#03A9F5",
    },
    {
      id: "7",
      service: "Lesson Plan",
      icon: <Octicons name="megaphone" color={Colors.whiteColor} size={30} />,
      path: "LessonPlan",
      // color: "#223AD6",
      color: "#7E57C2",
    },
    {
      id: "8",
      service: "Syllabus",
      icon: <Feather name="phone-call" color={Colors.whiteColor} size={30} />,
      path: "SyllabusScreen",
      // color: "#4822D6",
      color: "#EC407A",
    },
    {
      id: "9",
      service: "Apply Leave",
      icon: <FontAwesome5 name="tasks" color={Colors.whiteColor} size={30} />,
      path: "ApplyLeaveScreen",
      // color: "#6822D6",
      color: "#3F51B5",
    },
    {
      id: "10",
      service: "Visitor Book",
      icon: <Octicons name="log" color={Colors.whiteColor} size={30} />,
      path: "MyDocuments",
      // color: "#8622D6",
      color: "#009788",
    },
    {
      id: "11",
      service: "Download Center",
      icon: (
        <MaterialCommunityIcons
          name="clipboard-list-outline"
          color={Colors.whiteColor}
          size={40}
        />
      ),
      path: "DownloadScreen",
      // color: "#A522D6",
      color: "#795547",
    },
    // {
    //   id: "12",
    //   service: "Calender Events",
    //   icon: <FontAwesome5 name="walking" color={Colors.whiteColor} size={30} />,
    //   path: "CalenderScreen",
    //   // color: "#C422D6",
    //   color: "#607D8B",
    // },
    {
      id: "13",
      service: "Notice Board",
      icon: <Octicons name="megaphone" color={Colors.whiteColor} size={30} />,
      path: "NoticeBoardScreen",
      // color: "#D622CA",
      color: "#FE5722",
    },
    {
      id: "14",
      service: "Exam Copy",
      icon: <Feather name="file" color={Colors.whiteColor} size={30} />,
      path: "ExamCopyScreen",
      // color: "#D622AB",
      color: "#9E9E9E",
    },
    {
      id: "15",
      service: "Transport Routes",
      icon: <FontAwesome5 name="tasks" color={Colors.whiteColor} size={30} />,
      path: "TransportRoutes",
      // color: "#D6228C",
      color: "#FF9700",
    },
    {
      id: "16",
      service: "Appointment",
      icon: <Octicons name="log" color={Colors.whiteColor} size={30} />,
      path: "AppoinmentScreen",
      // color: "#D6226D",
      color: "#424242",
    },
    {
      id: "17",
      service: "Student Behavior",
      icon: (
        <MaterialCommunityIcons
          name="clipboard-list-outline"
          color={Colors.whiteColor}
          size={40}
        />
      ),
      path: "ViewProgressReport",
      // color: "#bf77db",
      color: "#AA47BC",
    },
  ];
  const filteredServicesData = servicesData.filter(
    (item) => item.isActive === "true"
  );

  const DashBoardSliderData = [
    {
      id: 1,
      // image: require("../../assets/images/user_profile/user_1.jpg"),
      icon: <Octicons name="megaphone" color={Colors.whiteColor} size={30} />,
      iconName: "Notices",
      color: "#66BB6A",
      path: "Attendance",
    },
    {
      id: 2,
      // image: require("../../assets/images/user_profile/user_3.jpg"),
      icon: <MaterialIcons name="book" size={30} color={Colors.whiteColor} />,
      iconName: "Exam Copy",
      color: "#EE534F",
      path: "ExamCopyScreen",
    },
    {
      id: 3,
      // image: require("../../assets/images/user_profile/user_4.jpg"),
      icon: (
        <MaterialIcons name="contacts" size={30} color={Colors.whiteColor} />
      ),
      iconName: "Contacts",
      color: "#C0CA33",
      path: "Attendance",
    },
    {
      id: 4,
      // image: require("../../assets/images/user_profile/user_5.jpg"),
      icon: (
        <MaterialIcons name="query-stats" size={30} color={Colors.whiteColor} />
      ),
      iconName: "Ask & Query",
      color: "#8BC24A",
      path: "Attendance",
    },
    {
      id: 5,
      // image: require("../../assets/images/user_profile/user_5.jpg"),
      icon: (
        <MaterialIcons
          name="not-interested"
          size={30}
          color={Colors.whiteColor}
        />
      ),
      iconName: "School Rules",
      color: "#00828F",
      path: "Attendance",
    },
  ];

  const CalenderEventsData = [
    {
      id: 1,
      // image: require("../../assets/images/user_profile/user_1.jpg"),
      icon: <Octicons name="megaphone" color={Colors.whiteColor} size={30} />,
      iconName: "Holidays",
      color: "#66BB6A",
      path: "HolidayScreen",
    },
    {
      id: 2,
      // image: require("../../assets/images/user_profile/user_3.jpg"),
      icon: <MaterialIcons name="book" size={30} color={Colors.whiteColor} />,
      iconName: "Activities",
      color: "#EE534F",
      path: "ActivityScreen",
    },
    {
      id: 3,
      // image: require("../../assets/images/user_profile/user_4.jpg"),
      icon: (
        <MaterialIcons name="contacts" size={30} color={Colors.whiteColor} />
      ),
      iconName: "Meeting",
      color: "#C0CA33",
      path: "MeetingScreen",
    },
  ];
  const HomeworksData = [
    {
      id: 1,
      icon: <MaterialIcons name="class" size={30} color={Colors.whiteColor} />,
      iconName: "HomeWork",
      color: "#66BB6A",
      path: "HomeWork",
    },
    {
      id: 2,
      icon: <MaterialIcons name="book" size={30} color={Colors.whiteColor} />,
      iconName: "ClassWork",
      color: "#EE534F",
      path: "HomeWork",
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <StatusBar
        backgroundColor={Colors.primaryColor}
        barStyle={"light-content"}
      />
      <HeaderBox navigation={navigation} name={"Dashboard"} />
      {/* <View style={{ flex: 1 }}>
                {bannerSlider()}
            </View> */}
      <FlatList
        ListHeaderComponent={
          <>
            {/* <View style={{ flex: 1 }}>{bannerSlider()}</View> */}
            {userInfo()}
            {CalenderEvents()}
            {homeWorks()}
            {services()}
            {/* <Dashboard
                            navigation={navigation}
                            student_id={user?.student_id}
                        /> */}
          </>
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );

  function bannerSlider() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        // onPress={() => navigation.push('Products')}
      >
        <Image
          // source={item.bannerImage}
          source={{ uri: item.bannerImage }}
          style={{
            width: itemWidth - 10,
            height: 150,
            // alignItems: "center",
            // justifyContent: 'center'
          }}
          borderRadius={Sizes.fixPadding - 3.0}
          // resizeMode="contain"
        />
      </TouchableOpacity>
    );

    return (
      <View style={{ backgroundColor: Colors.whiteColor }}>
        <Carousel
          data={bannerSliderList}
          sliderWidth={width}
          itemWidth={itemWidth}
          renderItem={renderItem}
          autoplay={true}
          loop={true}
          autoplayInterval={4000}
          showsHorizontalScrollIndicator={false}
          // onSnapToItem={(index) => { }}
          onSnapToItem={(index) => updateState({ activeSlide: index })}
        />
        {pagination()}
        {/* <Pagination
                    dotsLength={bannerSliderList?.length}
                    activeDotIndex={activeSlide}
                    // containerStyle={{ marginTop: 10 }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        // marginHorizontal: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                /> */}
      </View>
    );
  }
  function pagination() {
    return (
      <Pagination
        dotsLength={bannerSliderList.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.sliderPaginationWrapStyle}
        dotStyle={styles.sliderActiveDotStyle}
        inactiveDotStyle={styles.sliderInactiveDotStyle}
      />
    );
  }

  function userInfo() {
    return (
      <View style={styles.userInfoWrapStyle}>
        <View
          style={{
            alignItems: "center",
            // padding: 10,
            paddingTop: 10,
          }}
        >
          <Image
            source={
              user?.image
                ? {
                    uri: `${URL}/${user?.image}`,
                  }
                : require("../../assets/images/student.jpg")
            }
            // source={require("../../assets/images/student.jpg")}
            style={{
              width: 70.0,
              height: 70.0,
              borderRadius: 50,
            }}
            resizeMode="cover"
          />
          <View style={styles.userInfoStyle}>
            <Text
              style={{
                ...Fonts.blackColor17Medium,
                textAlign: "center",
              }}
            >
              {user?.username}
            </Text>
            <Text
              style={{
                ...Fonts.grayColor16Medium,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Admission No. {user?.admission_no} {user?.class} - {user?.section}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  function services() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={3}
        data={servicesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            navigation={navigation}
            student_id={user?.student_id}
          />
        )}
        style={{ marginBottom: 5 }}
      />
    );
  }

  function homeWorks() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push(item.path, { student_id: user.student_id });
        }}
        style={[
          // styles.schoolCategoryContainerStyle,
          {
            borderRadius: 30,
            marginRight: 8,
            marginLeft: 5,
            alignItems: "center",
            // marginBottom: 10,
            // backgroundColor: Colors.blackColor
          },
        ]}
      >
        <View
          style={{
            // justifyContent: 'space-between',
            // width: '100%',
            // margin: 3,
            // padding: 3,
            // marginBottom: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 55,
              height: 55,
              marginTop: 5,
              backgroundColor: item.color,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.icon}
          </View>
          <Text
            style={{
              ...Fonts.blackColor16Regular,
              marginTop: Sizes.fixPadding,
              // marginBottom: Sizes.fixPadding,
              // marginBottom: 2,
            }}
          >
            {item.iconName}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding,
          borderRadius: 20,
          // backgroundColor: Colors.whiteColor,
          // borderWidth: 0.2,
          // margin: 5,
          // elevation: 5,
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            ...Fonts.primaryColor40PacificoRegular,
            textAlign: "center",
            fontSize: 22.0,
            marginVertical: 6,
            paddingHorizontal: Sizes.fixPadding,
            borderRadius: 15,
            color: Colors.primaryColor,
            // backgroundColor: Colors.light,
            // borderWidth: 0.2,
            textDecorationLine: "underline",
          }}
        >
          Home Work
        </Text>
        <FlatList
          data={HomeworksData}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          // pagingEnabled={true}
          contentContainerStyle={
            {
              // alignItems: 'center',
              // paddingHorizontal: Sizes.fixPadding,
              // paddingTop: Sizes.fixPadding * 2.0,
              // paddingBottom: Sizes.fixPadding * 4.0,
              // backgroundColor: Colors.blackColor,
              // borderRadius: 65,
            }
          }
          style={{
            paddingHorizontal: Sizes.fixPadding + 70,
            borderRadius: 15,
            // backgroundColor: Colors.primary,
            marginBottom: 10,
            // borderWidth: 0.5
          }}
          onSnapToItem={(index) => updateState({ CategoryActiveSlide: index })}
        />
      </View>
    );
  }
  function CalenderEvents() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push(item.path, { student_id: user.student_id });
        }}
        style={{
          borderRadius: 30,
          marginRight: 8,
          marginLeft: 5,
          alignItems: "center",
          // marginBottom: 10,
          // backgroundColor: Colors.blackColor
        }}
      >
        <View
          style={{
            // justifyContent: 'space-between',
            // width: '100%',
            // margin: 3,
            // padding: 3,
            // marginBottom: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 55,
              height: 55,
              marginTop: 5,
              backgroundColor: item.color,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.icon}
          </View>
          <Text
            style={{
              ...Fonts.blackColor16Regular,
              marginTop: Sizes.fixPadding,
              // marginBottom: Sizes.fixPadding,
              // marginBottom: 2,
            }}
          >
            {item.iconName}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding,
          borderRadius: 20,
          // backgroundColor: Colors.whiteColor,
          // borderWidth: 0.2,
          // margin: 5,
          // elevation: 5,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            ...Fonts.primaryColor40PacificoRegular,
            textAlign: "center",
            fontSize: 22.0,
            marginVertical: 6,
            paddingHorizontal: Sizes.fixPadding,
            borderRadius: 15,
            color: Colors.primaryColor,
            // backgroundColor: Colors.light,
            // borderWidth: 0.2,
            textDecorationLine: "underline 6px solid",
          }}
        >
          Calender Events
        </Text>
        <FlatList
          data={CalenderEventsData}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={
            {
              // backgroundColor: Colors.primaryColor,
              // marginHorizontal: 50
            }
          }
          style={{
            paddingHorizontal: Sizes.fixPadding + 50,
            borderRadius: 15,
            // marginBottom: 10,
            // borderWidth: 0.5
            // backgroundColor: Colors.primaryColor,
          }}
        />
      </View>
    );
  }
};

const RenderItem = React.memo(({ item, navigation, student_id }) => {
  // console.log(item, 'item')
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      // onPress={() => {
      //     navigation.push(item.path);
      // }}
      onPress={() => {
        navigation.push(item.path, { student_id });
      }}
      style={[styles.servicesWrapStyle]}
    >
      <View
        // style={styles.servicesIconWrapStyle}
        style={{
          width: 55,
          height: 55,
          marginTop: 5,
          backgroundColor: item.color,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {item.icon}
      </View>
      <Text
        numberOfLines={2}
        style={{
          paddingHorizontal: Sizes.fixPadding - 5.0,
          textAlign: "center",
          marginBottom: Sizes.fixPadding - 2.0,
          ...Fonts.primaryColor12Medium,
          fontSize: 12.0,
          // color: Colors.whiteColor,
          color: Colors.blackColor,
        }}
      >
        {item.service}
      </Text>
    </TouchableOpacity>
  );
});

const RenderItem2 = React.memo(({ item, navigation, student_id }) => {
  // console.log(item, 'item')
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      // onPress={() => {
      //     navigation.push(item.path);
      // }}
      onPress={() => {
        navigation.push(item.path, { student_id });
      }}
      style={[styles.servicesWrapStyle, { backgroundColor: item.color }]}
    >
      <View style={styles.servicesIconWrapStyle}>{item.icon}</View>
      <Text
        numberOfLines={2}
        style={{
          paddingHorizontal: Sizes.fixPadding - 5.0,
          textAlign: "center",
          marginBottom: Sizes.fixPadding - 2.0,
          ...Fonts.primaryColor12Medium,
          fontSize: 12.0,
          color: Colors.whiteColor,
        }}
      >
        {item.service}
      </Text>
    </TouchableOpacity>
  );
});

const Dashboard = ({ navigation, student_id }) => {
  return (
    <View style={{ flex: 1, paddingBottom: 10 }}>
      <FlatList
        data={[
          {
            name: "Attendance",
            id: "1",
            icon: (
              <Foundation
                name="clipboard-notes"
                size={24}
                color={Colors.whiteColor}
                // color="#7692ff"
              />
            ),
            path: "Attendance",
          },
          {
            name: "Homework",
            id: "2",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "HomeWork",
          },
          {
            name: "Class Timetable",
            id: "4",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "TimeTable",
          },
          {
            name: "Library",
            id: "5",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Library",
          },
          {
            name: "Fees",
            id: "7",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Fees",
          },
          {
            name: "Online Exam",
            id: "8",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Online Exam",
          },
          {
            name: "Lesson Plan",
            id: "9",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Lesson Plan",
          },
          {
            name: "Syllabus Status",
            id: "10",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Syllabus",
          },
          {
            name: "Apply Leave",
            id: "11",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Apply Leave",
          },
          {
            name: "Visitor Book",
            id: "12",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "MyDocuments",
          },
          {
            name: "Download Center",
            id: "13",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Download Center",
          },
          {
            name: "Examination",
            id: "14",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Examinations",
          },
          {
            name: "Notice Board",
            id: "13",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Notice",
          },
          {
            name: "Teachers Reviews",
            id: "15",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Teachers ",
          },
          {
            name: "Library",
            id: "16",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Library",
          },
          {
            name: "Transport Routes",
            id: "17",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Transport ",
          },
          {
            name: "Hostels Rooms",
            id: "18",
            icon: (
              <FontAwesome
                name="calendar-check-o"
                size={24}
                color={Colors.whiteColor}
              />
            ),
            path: "Hostels",
          },
        ]}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 140,
              width: "33.3%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.push(item.path, { student_id });
              }}
              activeOpacity={1}
              style={{
                alignItems: "center",
                padding: 8,
                backgroundColor: Colors.whiteColor,
                elevation: 0.5,
                borderRadius: 20,
                width: "95%",
                height: "95%",
                paddingTop: 15,
                paddingBottom: 25,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: Colors.primaryColor,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </View>
              <Text
                style={{
                  ...Fonts.primaryColor16Medium,
                  fontSize: 14,
                  marginTop: 5,
                  textAlign: "center",
                  lineHeight: 14,
                  paddingVertical: 5,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={{ paddingHorizontal: 2.5 }}
      />
      {/* <Divider /> */}
    </View>
  );
};

const Divider = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.whiteColor,
        marginVertical: 5,
        height: 10,
        marginHorizontal: 5,
        elevation: 0.5,
        borderRadius: 5,
      }}
    ></View>
  );
};

export default StudentDetails;

const styles = StyleSheet.create({
  userInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Sizes.fixPadding * 1.0,
    // backgroundColor: Colors.bodyColor,
    backgroundColor: Colors.whiteColor,
    borderRadius: 15,
    elevation: 3.0,
    marginTop: 5,
  },
  userInfoStyle: {
    // paddingVertical: Sizes.fixPadding,
    marginLeft: Sizes.fixPadding,
  },
  servicesWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding + 5,
    flex: 1,
    // paddingVertical: Sizes.fixPadding - 5,
    // paddingVertical: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding - 1.0,
    // elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: Sizes.fixPadding,
    marginHorizontal: 5,
  },
  servicesIconWrapStyle: {
    width: 60.0,
    // height: 70.0,
    height: 50.0,
    borderRadius: 50.0,
    alignItems: "center",
    justifyContent: "center",
  },
  // slider
  schoolCategoryContainerStyle: {
    alignItems: "center",
    paddingTop: Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
    marginRight: Sizes.fixPadding * 2.0,
    // marginLeft: Sizes.fixPadding * 1.0
  },

  sliderActiveDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 6.0,
    backgroundColor: Colors.primaryColor,
    marginHorizontal: Sizes.fixPadding - 25.0,
  },
  sliderInactiveDotStyle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: Colors.grayColor,
  },
  sliderPaginationWrapStyle: {
    position: "absolute",
    bottom: -27.0,
    left: 0.0,
    right: 0.0,
  },
});
