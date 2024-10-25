import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constant/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LessonPlanScreen = ({ navigation }) => {
    // Sample lesson plan data
    const lessonPlanData = [
        {
            subject: 'Mathematics',
            topic: 'Algebra',
            date: '15 May 2024',
            exercises: 'Exercise 3.1 - 3.5',
            pageNumbers: '45 - 52',
        },
        {
            subject: 'Science',
            topic: 'Photosynthesis',
            date: '16 May 2024',
            exercises: 'Exercise 4.2, 4.4',
            pageNumbers: '68 - 72',
        },
        {
            subject: 'English',
            topic: 'Poetry Analysis',
            date: '17 May 2024',
            exercises: 'Analysis Questions 1 - 5',
            pageNumbers: '85 - 87',
        },
    ];

    return (
        <View style={styles.container}>
            {backArrow()}
            {titleBox()}
            <ScrollView>
                {lessonPlanData.map((lessonPlan, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.subject}>{lessonPlan.subject}</Text>
                        <Text style={styles.topic}>{lessonPlan.topic}</Text>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateLabel}>Date</Text>
                            <Text style={styles.dateValue}>{lessonPlan.date}</Text>
                        </View>
                        <View style={styles.exercisesContainer}>
                            <Text style={styles.exercisesLabel}>Exercises</Text>
                            <Text style={styles.exercisesValue}>{lessonPlan.exercises}</Text>
                        </View>
                        <View style={styles.pageNumbersContainer}>
                            <Text style={styles.pageNumbersLabel}>Page Numbers</Text>
                            <Text style={styles.pageNumbersValue}>{lessonPlan.pageNumbers}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
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
                        Your Lesson
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor22Medium,
                            lineHeight: 30,
                        }}
                    >
                        Plan is here!
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
                    flexDirection: "row", alignItems: "center",
                    backgroundColor: Colors.primaryColor, elevation: 2
                }}
            >
                <View style={{ ...styles.backArrowWrapStyle }}>
                    <TouchableOpacity>
                        <MaterialIcons
                            name="chevron-left"
                            color={Colors.whiteColor}
                            size={26}
                            onPress={() => navigation.pop()}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{ ...Fonts.whiteColor20Regular }}>
                    Lesson Plan
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    backArrowWrapStyle: {
        width: 40.0,
        height: 40.0,
        alignItems: "center",
        justifyContent: "center",
        marginTop: Sizes.fixPadding * 1.0,
        marginHorizontal: Sizes.fixPadding * 1.0,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    card: {
        margin: 15,
        padding: 25,
        borderRadius: 25,
        backgroundColor: Colors.whiteColor,
        elevation: 4,
    },
    subject: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        ...Fonts.blackColor16Regular
    },
    topic: {
        fontSize: 16,
        marginBottom: 16,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    exercisesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    pageNumbersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dateLabel: {
        fontSize: 14,
        ...Fonts.grayColor16Medium
    },
    exercisesLabel: {
        fontSize: 14,
        ...Fonts.grayColor16Medium
    },
    pageNumbersLabel: {
        fontSize: 14,
        ...Fonts.grayColor16Medium
    },
    dateValue: {
        fontSize: 14,
        ...Fonts.blackColor16Regular
    },
    exercisesValue: {
        fontSize: 14,
        ...Fonts.blackColor16Regular
    },
    pageNumbersValue: {
        fontSize: 14,
        ...Fonts.blackColor16Regular
    },
});

export default LessonPlanScreen;