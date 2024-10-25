import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Dialog } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel-v4";
import { __getUser, __ROLE } from "../../utils/localization";
import { useFocusEffect } from "@react-navigation/native";
import { URL } from "../../utils/api/constant";
import {
  __cleanLocalStorageData,
  __removeLocalStorageData,
} from "../../utils/localStorage";
const { width } = Dimensions.get("screen");
const RenderItem = React.memo(({ item }) => {
  return (
    <TouchableOpacity activeOpacity={1} style={{ elevation: 0.5 }}>
      <Image
        // source={item}
        source={{ uri: item.bannerImage }}
        style={styles.bannerStyle}
        resizeMode="cover"
      ></Image>
    </TouchableOpacity>
  );
});

const HomeScreen = ({ navigation, route }) => {
  const { students } = route.params;
  // console.log(route, 'route')
  console.log(students, "students");

  console.warn(__ROLE, "role");

  const [state, setState] = useState({
    logoutDialog: false,
    bannerList: [
      // require("../../assets/images/coin.png"),
      // require("../../assets/images/banner.png"),
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
          "https://ideogram.ai/api/images/direct/qyaBT8uaRBOa4ekmLPrnIA.jpg",
      },
      {
        bannerImage:
          "https://ideogram.ai/api/images/direct/9X5bNkYVQaKj8UVGww512Q.png",
      },
    ],
    activeSlide: 0,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { logoutDialog, bannerList, activeSlide } = state;

  useEffect(() => {
    if (students?.length == 1) {
      navigation.push("BottomTabBar", {
        ...students[0],
      });
    }
  }, []);

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
      <StatusBar
        backgroundColor={Colors.primaryColor}
        barStyle={"light-content"}
      />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
        >
          {/* {bannerSlider()} */}
          <View
            style={{
              backgroundColor: Colors.whiteColor,
              paddingVertical: 10,
            }}
          >
            <FlatList
              data={students || []}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.push("BottomTabBar", {
                      ...item,
                    })
                  }
                >
                  {functionalities({
                    icon: item?.image
                      ? {
                          uri: `${URL}/${item?.image}`,
                        }
                      : require("../../assets/images/user.png"),
                    title: item?.name,
                    description: item?.class + " - " + item?.section,
                  })}
                </TouchableOpacity>
              )}
              contentContainerStyle={{
                paddingBottom: 10,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>

          {inviteFriendsInfo()}
          <View
            style={{
              backgroundColor: Colors.whiteColor,
              paddingVertical: 10,
              elevation: 0.5,
              paddingBottom: 60,
            }}
          >
            {/* <TouchableOpacity activeOpacity={0.9}>
                            {functionalities({
                                icon: require("../../assets/images/delivery_boy.jpg"),
                                title: "Saurabh 3",
                                description: "12th A",
                            })}
                        </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
      {logoutDialogFun()}
    </SafeAreaView>
  );
  function logoutDialogFun() {
    return (
      <Dialog visible={logoutDialog} style={styles.dialogContainerStyle}>
        <View style={{ backgroundColor: "white", alignItems: "center" }}>
          <Text
            style={{
              ...Fonts.blackColor19Medium,
              paddingBottom: Sizes.fixPadding - 5.0,
            }}
          >
            You sure want to logout?
          </Text>
          <View style={styles.cancelAndLogoutButtonWrapStyle}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => updateState({ logoutDialog: false })}
              style={styles.cancelButtonStyle}
            >
              <Text style={{ ...Fonts.blackColor19Regular }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                updateState({ logoutDialog: false });
                __removeLocalStorageData("token");
                __cleanLocalStorageData();
                navigation.navigate("CreateAccount");
              }}
              style={styles.logOutButtonStyle}
            >
              <Text style={{ ...Fonts.whiteColor19Regular }}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
    );
  }

  function functionalities({ icon, title, description }) {
    return (
      <View style={styles.functionalitiesWrapStyle}>
        <View style={styles.functionalitiesIconWrapStyle}>
          <Image
            source={icon}
            style={{ height: 50.0, width: 50.0, borderRadius: 50 }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            marginLeft: Sizes.fixPadding,
            marginRight: Sizes.fixPadding * 2.0,
          }}
        >
          <Text style={{ ...Fonts.primaryColor19Medium }}>{title}</Text>
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.grayColor16Medium,
              paddingRight: Sizes.fixPadding * 2.0,
              width: width / 1.9,
            }}
          >
            {description}
          </Text>
        </View>
      </View>
    );
  }

  function bannerSlider() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          paddingTop: 10,
          paddingBottom: 20,
          marginTop: 0.5,
          marginBottom: 0.5,
          elevation: 0.5,
        }}
      >
        <Carousel
          data={bannerList}
          sliderWidth={width}
          itemWidth={width}
          renderItem={({ item }) => <RenderItem item={item} />}
          showsHorizontalScrollIndicator={false}
          onSnapToItem={(index) => updateState({ activeSlide: index })}
          autoplay={true}
          loop={true}
          autoplayInterval={4000}
        />
        {pagination()}
      </View>
    );
  }

  function pagination() {
    return (
      <Pagination
        dotsLength={bannerList.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.sliderPaginationWrapStyle}
        dotStyle={styles.sliderActiveDotStyle}
        inactiveDotStyle={styles.sliderInactiveDotStyle}
      />
    );
  }

  function inviteFriendsInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        // onPress={() => navigation.push("InviteFriends")}
        style={styles.inviteFriendsInfoWrapStyle}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="cake" size={30} color={Colors.primaryColor} />

          <Text
            numberOfLines={2}
            style={{
              ...Fonts.primaryColor19Medium,
              marginLeft: Sizes.fixPadding + 5.0,
            }}
          >
            Today's Birthday
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={
              __getUser()?.image
                ? {
                    // uri: "https://erp.techsally.com/" + __getUser()?.image,
                    uri: `${URL}/` + __getUser()?.image,
                  }
                : require("../../assets/images/user.png")
            }
            style={{ width: 45, height: 45, resizeMode: "contain" }}
          />
          <Text
            style={{
              ...Fonts.primaryColor19Medium,
              marginLeft: Sizes.fixPadding - 5.0,
              fontSize: 16,
            }}
          >
            {__getUser()?.username}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.9}>
          <AntDesign
            onPress={() => {
              updateState({ logoutDialog: true });
            }}
            name="logout"
            size={24}
            color={Colors.primaryColor}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    elevation: 3.5,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  bannerStyle: {
    height: 190.0,
    width: width - 20.0,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding,
  },
  inviteFriendsInfoWrapStyle: {
    backgroundColor: "#F8F3EC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Sizes.fixPadding * 2.0,
    marginTop: 0.5,
    elevation: 0.5,
  },
  functionalitiesWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding + 10,
    borderColor: "rgba(185, 133, 73, 0.25)",
    // borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding * 1.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
    elevation: 4,
  },
  functionalitiesIconWrapStyle: {
    backgroundColor: "#F1E7DB",
    width: 70.0,
    height: 70.0,
    borderRadius: 35.0,
    alignItems: "center",
    justifyContent: "center",
  },

  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding + 10,
    width: width - 90,
    alignSelf: "center",
    paddingHorizontal: Sizes.fixPadding * 3.0,
    paddingBottom: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
  },
  cancelButtonStyle: {
    flex: 0.5,
    backgroundColor: "#E0E0E0",
    borderRadius: Sizes.fixPadding + 10.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
    marginRight: Sizes.fixPadding + 5.0,
  },
  logOutButtonStyle: {
    flex: 0.5,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding + 10.0,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Sizes.fixPadding + 5.0,
  },
  cancelAndLogoutButtonWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.0,
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
  bannerSliderInfoWrapStyle: {
    height: 170.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  bannerNewsViewsCommentsDateInfoWrapStyle: {
    marginVertical: Sizes.fixPadding - 5.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
