import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors, Fonts, Sizes } from '../../constant/styles';
import { MaterialIcons } from '@expo/vector-icons';

const ProgressCardScreen = () => {
    const rankToNumber = (rank) => {
        switch (rank) {
            case 'A':
                return 1;
            case 'B':
                return 5;
            case 'C':
                return 9;
            case 'D':
                return 12;
            case 'E':
                return 16;
            default:
                return 0;
        }
    };
    // Sample data
    const studentData = {
        name: 'Zafran Khan',
        comment: "You're good. Some more practice.",
        overallRank: 5,
        lastTestRank: 3,
        monthlyPerformance: [
            { date: '1-7', rank: 'A' },
            { date: '7-14', rank: 'B' },
            { date: '14-21', rank: 'C' },
            { date: '21-28', rank: 'D' },
            { date: '28-3', rank: 'E' },
        ],
        // subjectWiseProgress: [
        //     { subject: 'Mathematics', progress: 85.5 },
        //     { subject: 'Science', progress: 50.5 },
        //     { subject: 'English', progress: 89.5 },
        //     { subject: 'Economic', progress: 95.12 },
        //     { subject: 'Accounting', progress: 89.5 },
        //     { subject: 'Computer', progress: 96.25 },
        // ],
        subjectWiseProgress: [
            { subject: 'Mathematics', progress: 85.5, color: '#6a51a3' },
            { subject: 'Science', progress: 50.5, color: '#ffa726' },
            { subject: 'English', progress: 89.5, color: '#4caf50' },
            { subject: 'Economic', progress: 95.12, color: '#26c6da' },
            { subject: 'Accounting', progress: 89.5, color: '#9c27b0' },
            { subject: 'Computer', progress: 96.25, color: '#ff9800' },
        ],
    };

    const chartData = {
        labels: studentData.monthlyPerformance.map((data) => data.date),
        datasets: [
            {
                data: studentData.monthlyPerformance.map((data) => rankToNumber(data.rank)),
            },
        ],
    };



    return (
        <ScrollView style={styles.container}>
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Progress Card</Text>
            </View> */}
            {backArrow()}
            <View style={styles.card}>
                <Text style={styles.name}>{studentData.name}</Text>
                <Text style={styles.comment}>{studentData.comment}</Text>
                <View style={styles.rankContainer}>
                    <View style={styles.rankBox}>
                        <Text style={styles.rankLabel}>Overall Rank</Text>
                        <Text style={styles.rankValue}>{studentData.overallRank}</Text>
                    </View>
                    <View style={styles.rankBox}>
                        <Text style={styles.rankLabel}>Last Test Result</Text>
                        <Text style={styles.rankValue}>{studentData.lastTestRank}</Text>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>Monthly Performance</Text>
                <LineChart
                    data={chartData}
                    width={Dimensions.get('window').width - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        // backgroundGradientTo: '#ffa726',
                        declineColor: 'rgba(204, 204, 204, 0.8)',
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        propsForDots: {
                            r: '4',
                            strokeWidth: '2',
                            stroke: '#ffa726',
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        // marginRight: 5,
                        // marginHorizontal: 20,
                        borderRadius: 16,
                    }}
                />
                <Text style={styles.sectionTitle}>Subject Wise Progress</Text>
                {studentData?.subjectWiseProgress?.map((subject, index) => (
                    <View key={index} style={styles.progressBar}>
                        <Text style={styles.subject}>{subject.subject}</Text>
                        <View style={styles.barContainer}>
                            <View style={[styles.bar, { width: `${subject.progress}%`, backgroundColor: subject.color }]} />
                            {/* <View style={[styles.bar, { width: `${100 - subject.progress}%`, backgroundColor: '#bdc3c7' }]} /> */}
                        </View>
                        <Text style={styles.percentage}>{subject.progress}%</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
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
                    Progress Card
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
        // backgroundColor: '#1e2a36',
        backgroundColor: Colors.bodyColor,
    },
    header: {
        backgroundColor: '#2c3e50',
        padding: 16,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        // color: '#fff',
        color: Colors.blackColor,
    },
    card: {
        // backgroundColor: '#34495e',
        backgroundColor: Colors.whiteColor,
        padding: 16,
        margin: 5,
        borderRadius: 20,
        // marginHorizontal: 16,
        marginVertical: 15,
        elevation: 5
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        // color: '#fff',
        color: Colors.blackColor,
        marginBottom: 8,
    },
    comment: {
        fontSize: 16,
        color: '#bdc3c7',
        marginBottom: 16,
    },
    rankContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    rankBox: {
        // backgroundColor: '#2c3e50',
        backgroundColor: Colors.whiteColor,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
    },
    rankLabel: {
        fontSize: 14,
        color: '#bdc3c7',
    },
    rankValue: {
        fontSize: 24,
        fontWeight: 'bold',
        // color: '#fff',
        color: Colors.blackColor,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        // color: '#fff',
        color: Colors.blackColor,
        marginBottom: 8,
    },
    progressBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    subject: {
        fontSize: 14,
        // color: '#fff',
        color: Colors.blackColor,
        marginRight: 8,
        width: 100,
        ...Fonts.blackColor14Regular
    },
    barContainer: {
        flex: 1,
        height: 16,
        backgroundColor: '#bdc3c7',
        borderRadius: 8,
        marginRight: 8,
    },
    bar: {
        height: '100%',
        borderRadius: 8,
    },
    percentage: {
        fontSize: 16,
        // color: '#fff',
        color: Colors.blackColor,
    },
});

export default ProgressCardScreen;






// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native';
// // import axios from 'axios';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Colors, Fonts, Sizes } from "../../constant/styles";

// const ViewProgressReport = ({ navigation }) => {
//     const [studentData, setStudentData] = useState({
//         "name": "Rohan",
//         "className": "11th",
//         "section": "C",
//         "subjects": [
//             {
//                 "name": "Accountancy",
//                 "marks": 94.0,
//                 "outOf": 100.0
//             },
//             {
//                 "name": "Business Studies",
//                 "marks": 94.0,
//                 "outOf": 100.0
//             },
//             {
//                 "name": "Economics",
//                 "marks": 94.0,
//                 "outOf": 100.0
//             },
//             {
//                 "name": "English",
//                 "marks": 91.0,
//                 "outOf": 100.0
//             },
//             {
//                 "name": "Hindi",
//                 "marks": 97.0,
//                 "outOf": 100.0
//             }
//         ],
//         "totalMarks": 470.0,
//         "outOfTotal": 500.0
//     });

//     // useEffect(() => {
//     //     // Fetch student data from the API
//     //     const fetchStudentData = async () => {
//     //         try {
//     //             const response = await axios.get('/api/student/123');
//     //             setStudentData(response.data);
//     //         } catch (error) {
//     //             console.error('Error fetching student data:', error);
//     //         }
//     //     };

//     //     fetchStudentData();
//     // }, []);

//     if (!studentData) {
//         return <Text>Loading...</Text>;
//     }

//     const { name, className, section, subjects, totalMarks, outOfTotal } = studentData;
//     const percentage = (totalMarks / outOfTotal) * 100;

//     return (

//         <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
//             {/* <StatusBar translucent={false} backgroundColor={Colors.primary} /> */}
//             <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
//             {backArrow()}

//             <View style={styles.container}>
//                 <StudentDetails name={name} className={className} section={section} />
//                 <SubjectTable subjects={subjects} />
//                 <TotalMarks totalMarks={totalMarks} outOfTotal={outOfTotal} />
//                 <Percentage percentage={percentage} />
//             </View>
//         </View>
//     );

//     function backArrow() {
//         return (
//             <View
//                 style={{
//                     flexDirection: "row", alignItems: "center",
//                     backgroundColor: Colors.primaryColor, elevation: 2
//                 }}
//             >
//                 <View style={{ ...styles.backArrowWrapStyle }}>
//                     <TouchableOpacity>
//                         <MaterialIcons
//                             name="chevron-left"
//                             color={Colors.whiteColor}
//                             size={26}
//                             onPress={() => navigation.pop()}
//                         />
//                     </TouchableOpacity>
//                 </View>
//                 <Text style={{ ...Fonts.whiteColor20Regular }}>
//                     Progress Report
//                 </Text>
//             </View>
//         );
//     }

// };

// const StudentDetails = ({ name, className, section }) => (
//     <View style={styles.detailsContainer}>
//         <Image source={require('../../assets/erp.jpeg')} style={styles.avatar} />
//         <View style={styles.detailsText}>
//             <Text>Name: {name}</Text>
//             <Text>Class: {className}</Text>
//             <Text>Section: {section}</Text>
//         </View>
//     </View>
// );

// const SubjectTable = ({ subjects }) => (
//     <View style={styles.tableContainer}>
//         <View style={styles.tableHeader}>
//             <Text style={styles.headerText}>Subject</Text>
//             <Text style={styles.headerText}>Marks</Text>
//             <Text style={styles.headerText}>Out Of</Text>
//         </View>
//         {subjects.map((subject) => (
//             <View key={subject.name} style={styles.tableRow}>
//                 <Text style={styles.rowText}>{subject.name}</Text>
//                 <Text style={styles.rowText}>{subject.marks}</Text>
//                 <Text style={styles.rowText}>{subject.outOf}</Text>
//             </View>
//         ))}
//     </View>
// );

// const TotalMarks = ({ totalMarks, outOfTotal }) => (
//     <View style={styles.totalContainer}>
//         <Text style={styles.totalText}>Total Marks {totalMarks}</Text>
//         <Text style={styles.totalText}>Out Of {outOfTotal}</Text>
//     </View>
// );

// const Percentage = ({ percentage }) => (
//     <View style={styles.percentageContainer}>
//         <Text style={styles.percentageText}>Your percent is {percentage.toFixed(2)}%</Text>
//     </View>
// );

// const styles = StyleSheet.create({
//     backArrowWrapStyle: {
//         width: 40.0,
//         height: 40.0,
//         // borderRadius: 8,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: Sizes.fixPadding * 1.0,
//         marginHorizontal: Sizes.fixPadding * 1.0,
//         // borderWidth: 0.3,
//         // borderColor: Colors.grayColor,
//         marginBottom: 10,
//     },
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     detailsContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     avatar: {
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//     },
//     detailsText: {
//         marginLeft: 16,
//     },
//     tableContainer: {
//         marginBottom: 16,
//     },
//     tableHeader: {
//         flexDirection: 'row',
//         backgroundColor: '#f2f2f2',
//         paddingVertical: 8,
//     },
//     headerText: {
//         flex: 1,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     tableRow: {
//         flexDirection: 'row',
//         paddingVertical: 8,
//         borderBottomWidth: 1,
//         borderBottomColor: '#e0e0e0',
//     },
//     rowText: {
//         flex: 1,
//         textAlign: 'center',
//     },
//     totalContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginRight: 80,
//         marginLeft: 60,
//         marginBottom: 16,
//     },
//     totalText: {
//         fontWeight: 'bold',
//     },
//     percentageContainer: {
//         alignItems: 'center',
//     },
//     percentageText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default ViewProgressReport;