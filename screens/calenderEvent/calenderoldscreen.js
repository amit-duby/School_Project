import React, { useCallback, useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    RefreshControl,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import WorkType from "./WorkType";
import WorkList from "./WorkList";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "react-native";
import { __postApiData } from "../../utils/api";
const { width } = Dimensions.get("screen");
import { useFocusEffect } from "@react-navigation/native";
import { __convertDateFormat } from "../../utils/function";
import { TabView, TabBar } from "react-native-tab-view";

const CalenderScreen = ({ navigation, route }) => {
    const { student_id } = route.params;
    const [state, setState] = useState({
        logoutDialog: false,
        tab: 0,
        subject: { id: "0", name: "All" },
        isShowSubject: false,
        subject_list: [],
        list: [],
        holidayList: [],
        activityList: [],
        PTMList: [],
        isLoading: false,
        isShowDate: false,
        date: new Date().toLocaleDateString(),
    });

    const data = [
        {
            id: 1,
            chapter: 1,
            chapterName: "Real Numbers",
            description:
                "This chapter covers the properties of real numbers, including rational and irrational numbers, and their applications in problem-solving.",
        },
        {
            id: 2,
            chapter: 2,
            chapterName: "Polynomials",
            description:
                "In this chapter, students will learn about the properties of polynomials, their operations, and their applications in various mathematical problems.",
        },
        {
            id: 3,
            chapter: 3,
            chapterName: "Pair of Linear Equations in Two Variables",
            description:
                "This chapter focuses on the concepts of linear equations in two variables, their graphical representation, and methods to solve them.",
        },
        {
            id: 4,
            chapter: 4,
            chapterName: "Quadratic Equations",
            description:
                "Students will explore the properties of quadratic equations, their solutions, and their applications in real-world scenarios.",
        },
        {
            id: 5,
            chapter: 5,
            chapterName: "Arithmetic Progressions",
            description:
                "This chapter introduces the concept of arithmetic progressions, their properties, and their use in problem-solving.",
        },
        {
            id: 6,
            chapter: 6,
            chapterName: "Triangles",
            description:
                "In this chapter, students will learn about the properties of triangles, congruence and similarity, and their applications in geometry.",
        },
        {
            id: 7,
            chapter: 7,
            chapterName: "Coordinate Geometry",
            description:
                "This chapter covers the concepts of coordinate geometry, including the distance formula, section formula, and their applications in solving geometric problems.",
        },
        {
            id: 8,
            chapter: 8,
            chapterName: "Introduction to Trigonometry",
            description:
                "Students will be introduced to the basic trigonometric ratios, their properties, and their use in solving right-angled triangle problems.",
        },
        {
            id: 9,
            chapter: 9,
            chapterName: "Some Applications of Trigonometry",
            description:
                "This chapter explores the applications of trigonometry in real-world scenarios, such as heights and distances, and problem-solving using trigonometric ratios.",
        },
        {
            id: 10,
            chapter: 10,
            chapterName: "Circles",
            description:
                "Students will learn about the properties of circles, their tangents and secants, and their applications in geometry.",
        },
        {
            id: 11,
            chapter: 11,
            chapterName: "Constructions",
            description:
                "This chapter focuses on the construction of various geometric shapes and figures using a ruler and a compass.",
        },
        {
            id: 12,
            chapter: 12,
            chapterName: "Areas Related to Circles",
            description:
                "Students will explore the concepts of area and perimeter related to circles, including the areas of sectors and segments.",
        },
        {
            id: 13,
            chapter: 13,
            chapterName: "Surface Areas and Volumes",
            description:
                "This chapter covers the formulas and calculations of surface areas and volumes of various three-dimensional shapes, such as cubes, cuboids, and spheres.",
        },
        {
            id: 14,
            chapter: 14,
            chapterName: "Statistics",
            description:
                "Students will learn about the basic concepts of statistics, including measures of central tendency, dispersion, and their applications in data analysis.",
        },
        {
            id: 15,
            chapter: 15,
            chapterName: "Probability",
            description:
                "This chapter introduces the fundamental concepts of probability, including the calculation of probability, and their applications in real-world scenarios.",
        },
    ];

    const { subject, tab, list, holidayList, activityList, PTMList, isLoading, date } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const __handleGetSubject = () => {
        __postApiData("/webservice/getActivitys", {
            student_id: student_id,
        })
            .then((res) => {
                const list = res?.subjectlist.map((item) => ({
                    name: item.name + " " + item.code,
                    id: item.subject_id,
                }));
                updateState({ subject_list: list });
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const __handleGetHolidayData = () => {
        updateState({ isLoading: true });
        __postApiData("/webservice/getHoliday", {
            student_id: student_id,
            year: "2024",
            month: "5"
        })
            .then((res) => {
                if (res?.response_code == 200) {
                    updateState({
                        holidayList: res?.data,
                        isLoading: false,
                    });
                } else {
                    updateState({ holidayList: [], isLoading: false });
                }
            })
            .catch((error) => {
                updateState({ holidayList: [], isLoading: false });
            });
    };
    const __handleGetActivityData = () => {
        updateState({ isLoading: true });
        __postApiData("/webservice/getActivitys", {
            student_id: student_id,
            year: "2024",
            month: "5"
        })
            .then((res) => {
                if (res?.response_code == 200) {
                    updateState({
                        activityList: res?.data,
                        isLoading: false,
                    });
                } else {
                    updateState({ activityList: [], isLoading: false });
                }
            })
            .catch((error) => {
                updateState({ activityList: [], isLoading: false });
            });
    };
    const __handleGetPTMData = () => {
        updateState({ isLoading: true });
        __postApiData("/webservice/getPtm", {
            student_id: student_id,
            year: "2024",
            month: "5"
        })
            .then((res) => {
                if (res?.response_code == 200) {
                    updateState({
                        PTMList: res?.data,
                        isLoading: false,
                    });
                } else {
                    updateState({ PTMList: [], isLoading: false });
                }
            })
            .catch((error) => {
                updateState({ PTMList: [], isLoading: false });
            });
    };

    useFocusEffect(
        useCallback(() => {
            updateState({ holidayList: [] });
            __handleGetHolidayData();
            return () => { };
        }, [tab, date])
    );
    useFocusEffect(
        useCallback(() => {
            __handleGetHolidayData();
            __handleGetPTMData()
            __handleGetActivityData()
            return () => { };
        }, [])
    );

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.primaryColor }}
        >
            <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle={"light-content"}
            />
            {header()}

            <View
                style={{
                    flex: 1,
                    paddingTop: 10,
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
                    {Subjects()}
                    {/* <WorkType state={state} updateParentState={updateState} /> */}
                </View>
                <FlatList
                    // data={list.filter(
                    //     (item) =>
                    //         item?.subject_name
                    //             ?.toLocaleLowerCase()
                    //             .search(
                    //                 subject.name == "All"
                    //                     ? ""
                    //                     : subject.name
                    //                         ?.trim()
                    //                         ?.toLocaleLowerCase()
                    //             ) >= 0
                    // )}
                    data={holidayList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <WorkList item={item} />}
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
                            {!isLoading && list?.length == 0 && (
                                <Text
                                    style={{
                                        textAlign: "center",
                                        marginTop: 50,
                                        ...Fonts.blackColor15Medium,
                                    }}
                                >
                                    No Data Available
                                </Text>
                            )}
                        </>
                    }
                />
            </View>
        </SafeAreaView>
    );


    function Subjects() {
        const [index, setIndex] = useState(0);
        const [routes] = useState([
            { key: "Holidays", title: "Holidays" },
            { key: "Activities", title: "Activities" },
            { key: "PTM", title: "Parents Teacher Meeting" },
        ]);
        // const [routes, setRoutes] = useState([]);

        // React.useEffect(() => {
        //     const fetchData = async () => {
        //         try {
        //             const response = await axios.get('YOUR_API_ENDPOINT');
        //             const data = response.data;
        //             setRoutes(data);
        //         } catch (error) {
        //             console.error('Error fetching data:', error);
        //         }
        //     };
        //     fetchData();
        // }, []); 

        const renderScene = ({ route, jumpTo }) => {
            // console.log(route, 'route')
            switch (route.key) {
                case "Holidays":
                    return <WorkList item={holidayList} />;
                case "Activities":
                    return null;
                case "PTM":
                    return null;
            }
        };

        // const [index, setIndex] = useState(0);

        // // Define tab data array
        // const tabData = [
        //     { key: "first", title: "School", component: MainList },
        //     { key: "second", title: "Colleges", component: CollegeList },
        //     { key: "third", title: "Training institutes", component: TrainingInstituteList },
        //     { key: "forth", title: "Coaching center", component: CoachingInstituteList },
        //     // { key: "fifth", title: "Coaching center 2", component: CoachingInstituteList }

        // ];

        // // Generate routes state from tab data array
        // const routes = tabData.map(tab => ({ key: tab.key, title: tab.title }));

        // // Function to render scene based on route
        // const renderScene = ({ route }) => {
        //     const TabComponent = tabData.find(tab => tab.key === route.key)?.component;
        //     return TabComponent ? <TabComponent /> : null;
        // };

        return (
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: Colors.primaryColor }}
                        tabStyle={{
                            width: "auto",
                        }}
                        scrollEnabled={true}
                        style={{ backgroundColor: "white" }}
                        renderLabel={({ route }) => (
                            <Text
                                style={{
                                    ...Fonts.blackColor16Regular,
                                    // color: Colors.orangeColor,
                                    textTransform: "uppercase",
                                }}
                            >
                                {route.title}
                            </Text>
                        )}
                    />
                )}
            />
        );
    }
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
                        Your School
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        Calender Events is here!
                    </Text>
                </View>

                <Image
                    source={require("../../assets/images/syllabus.png")}
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
                    Calender Events
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({});

export default CalenderScreen;
