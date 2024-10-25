import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    TransitionPresets,
    createStackNavigator,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import LoadingScreen from "./components/loadingScreen";
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import ProfileScreen from "./screens/profile/profileScreen";
import NotificationsScreen from "./screens/notifications/notificationsScreen";
import CreateAccountScreen from "./screens/auth/createAccountScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import SplashScreen from "./screens/splashScreen";
import HomeScreen from "./screens/home/homeScreen";
import HomeWorkScreen from "./screens/homeWork/homeWorkScreen";
import AttendanceScreen from "./screens/attendance/attendanceScreen";
import DailyAssignmentScreen from "./screens/dailyAssignment/dailyAssignmentScreen";
import TimeTableScreen from "./screens/timeTable/timeTableScreen";
import MyDocumentsScreen from "./screens/myDocuments/myDocumentsScreen";
import LibraryScreen from "./screens/library/libraryScreen";
import BooksScreen from "./screens/books/booksScreen";
import FeesScreen from "./screens/fees/feesScreen";
import OnBoardingScreen from "./screens/onBoarding/onBoardingScreen";
import SyllabusScreen from "./screens/syllabusStatus/syllabusScreen";
import ApplyLeaveScreen from "./screens/applyLeave/applyLeaveScreen";
import NoticeBoardScreen from "./screens/noticeBoard/noticeBoardScreen";
import OnlineExamScreen from "./screens/Examination/onlineExam";
import ResultScoreScreen from "./screens/Examination/viewResult";
import AnswerSheet from "./screens/Examination/answerSheet";
import TransportRoutesScreen from "./screens/transportRoutes/transportRoutes";
import HostelRoomsScreen from "./screens/hostelRooms/hostelRooms";
import ViewProgressReport from "./screens/studentBehviour/ViewProgressReport";
import LessonPlanScreen from "./screens/lessonPlan/lessonPlan";
import AppoinmentScreen from "./screens/Appoinment/appoinmentScreen";
import DownloadScreen from "./screens/downloads/downloadScreen";
import CalenderScreen from "./screens/calenderEvent/calenderScreen";
import SubmitWorkScreen from "./screens/homeWork/submitHomework";
import ExamCopyScreen from "./screens/Examcopy/ExamCopy";
import LeaveStatusScreen from "./screens/applyLeave/leaveStatus";
import MeetingScreen from "./screens/calenderEvent/meetingScreen";
import HolidayScreen from "./screens/calenderEvent/holidayScreen";
import ActivityScreen from "./screens/calenderEvent/actitivityScreen";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ ...TransitionPresets.DefaultTransition }}
                />
                <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
                <Stack.Screen
                    name="CreateAccount"
                    component={CreateAccountScreen}
                />
                <Stack.Screen
                    name="Verification"
                    component={VerificationScreen}
                />
                <Stack.Screen
                    name="BottomTabBar"
                    component={BottomTabBarScreen}
                    options={{ ...TransitionPresets.DefaultTransition }}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ ...TransitionPresets.DefaultTransition }}
                />

                <Stack.Screen name="Profile" component={ProfileScreen} />

                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="HomeWork" component={HomeWorkScreen} />
                <Stack.Screen name="SubmitWorkScreen" component={SubmitWorkScreen} />
                <Stack.Screen name="Attendance" component={AttendanceScreen} />
                <Stack.Screen name="DailyAssignment" component={DailyAssignmentScreen} />
                <Stack.Screen name="TimeTable" component={TimeTableScreen} />
                <Stack.Screen name="MyDocuments" component={MyDocumentsScreen} />
                <Stack.Screen name="Library" component={LibraryScreen} />
                <Stack.Screen name="books" component={BooksScreen} />
                <Stack.Screen name="Fees" component={FeesScreen} />

                <Stack.Screen name="SyllabusScreen" component={SyllabusScreen} />
                <Stack.Screen name="ApplyLeaveScreen" component={ApplyLeaveScreen} />
                <Stack.Screen name="LeaveStatusScreen" component={LeaveStatusScreen} />

                <Stack.Screen name="NoticeBoardScreen" component={NoticeBoardScreen} />
                <Stack.Screen name="OnlineExamScreen" component={OnlineExamScreen} />
                <Stack.Screen name="ResultScoreScreen" component={ResultScoreScreen} />
                <Stack.Screen name="AnswerSheet" component={AnswerSheet} />
                <Stack.Screen name="TransportRoutes" component={TransportRoutesScreen} />
                <Stack.Screen name="ViewProgressReport" component={ViewProgressReport} />
                <Stack.Screen name="LessonPlan" component={LessonPlanScreen} />
                <Stack.Screen name="AppoinmentScreen" component={AppoinmentScreen} />
                <Stack.Screen name="DownloadScreen" component={DownloadScreen} />
                <Stack.Screen name="CalenderScreen" component={CalenderScreen} />
                <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
                <Stack.Screen name="HolidayScreen" component={HolidayScreen} />
                <Stack.Screen name="MeetingScreen" component={MeetingScreen} />
                <Stack.Screen name="ExamCopyScreen" component={ExamCopyScreen} />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
