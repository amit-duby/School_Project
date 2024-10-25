import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { Colors } from "../../constant/styles";
import { __postApiData } from "../../utils/api";

const { width } = Dimensions.get("screen");

const OnlineExamScreen = ({ navigation, route }) => {
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [timer, setTimer] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [skippedAnswers, setSkippedAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const student_id = route.params?.student_id || "1825";
  const online_exam_id = route.params?.online_exam_id || "10";

  useEffect(() => {
    __handleGetExamData();
  }, []);

  const __handleGetExamData = () => {
    setIsLoading(true);
    __postApiData("/Webservice/getOnlineExamQuestion", {
      student_id: 1825,
      online_exam_id: online_exam_id,
    })
      .then((res) => {
        console.log(res, "res");
        if (res?.response_code == 200 && res?.exam) {
          const exam = res.exam;
          setExamData(exam);
          setQuestions(exam.questions || []);

          // Convert remaining_duration to seconds
          const [hours, minutes, seconds] = exam.remaining_duration
            .split(":")
            .map(Number);
          setTimer(hours * 3600 + minutes * 60 + seconds);
        } else {
          console.warn("No exam data available");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exam data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleAnswerPress = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct) {
      setIsAnswerCorrect(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIsAnswerCorrect(false);
      setWrongAnswers(wrongAnswers + 1);
    }
    setSelectedAnswer(answer);
  };

  const handleSkipQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setSkippedAnswers(skippedAnswers + 1);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    } else {
      // Navigate to the score screen
      navigation.navigate("ResultScoreScreen", {
        correctAnswers,
        skippedAnswers,
        wrongAnswers,
      });
    }
  };

  const renderQuestion = () => {
    if (!examData || questions.length === 0) return null;

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <View>
        <Text style={styles.questionNumber}>
          Question {currentQuestionIndex + 1} / {questions.length}
        </Text>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        <View style={styles.answerOptions}>
          {["a", "b", "c", "d", "e"].map((option) => {
            if (currentQuestion[`opt_${option}`]) {
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.answerOption,
                    selectedAnswer === `opt_${option}` && styles.selectedAnswer,
                    isAnswerCorrect === false &&
                      selectedAnswer === `opt_${option}` &&
                      styles.incorrectAnswer,
                  ]}
                  onPress={() => handleAnswerPress(`opt_${option}`)}
                >
                  <Text style={styles.answerText}>{`${option.toUpperCase()}. ${
                    currentQuestion[`opt_${option}`]
                  }`}</Text>
                </TouchableOpacity>
              );
            }
            return null;
          })}
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading exam data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0c4a6e" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>{examData?.exam || "Online Exam"}</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {`${Math.floor(timer / 3600)
              .toString()
              .padStart(2, "0")}:${Math.floor((timer % 3600) / 60)
              .toString()
              .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`}
          </Text>
          {/* <ProgressBar
            progress={
              1 -
              timer /
                (parseInt(examData?.duration.split(":")[0]) * 3600 +
                  parseInt(examData?.duration.split(":")[1]) * 60 +
                  parseInt(examData?.duration.split(":")[2]))
            }
            color="#fbbf24"
            style={styles.progressBar}
          /> */}
        </View>
      </View>
      <ScrollView>{renderQuestion()}</ScrollView>
      {isAnswerCorrect === false && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Incorrect answer. Please try again.
          </Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.skipButton]}
          onPress={handleSkipQuestion}
        >
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNextQuestion}
          disabled={isAnswerCorrect === null}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0c4a6e',
    backgroundColor: Colors.primaryColor,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  timerContainer: {
    alignItems: "center",
  },
  timerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    width: 100,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  questionNumber: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  question: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  answerOptions: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 16,
    elevation: 2,
  },
  answerOption: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginVertical: 8,
  },
  selectedAnswer: {
    // borderColor: '#0c4a6e',
    borderColor: "green",
    borderWidth: 2.5,
  },
  incorrectAnswer: {
    borderColor: "#e53e3e",
  },
  answerText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  errorContainer: {
    backgroundColor: "#e53e3e",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  errorText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "flex-end",
    // marginTop: 'auto',
    marginBottom: 16,
    marginRight: 16,
  },
  button: {
    backgroundColor: "#fbbf24",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 15,
  },
  skipButton: {
    // marginRight: 8,
    marginBottom: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "#0c4a6e",
    fontSize: 14,
    fontWeight: "bold",
  },
});
export default OnlineExamScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
// import { ProgressBar } from 'react-native-paper';
// import { Colors } from '../../constant/styles';

// const { width } = Dimensions.get('screen');

// const OnlineExamScreen = ({ navigation }) => {
//     const questions = [
//         {
//             question: "On which base structure of economic problems has been installed?",
//             answers: [
//                 "A. Unlimited Wants",
//                 "B. Limited Resources",
//                 "C. Both (a) and (b)",
//                 "D. None of the above",
//             ],
//             correctAnswer: "C",
//         },
//         {
//             question: "What is the primary goal of economic systems?",
//             answers: [
//                 "A. Maximize profits",
//                 "B. Ensure full employment",
//                 "C. Allocate resources efficiently",
//                 "D. All of the above",
//             ],
//             correctAnswer: "D",
//         },
//         {
//             question: "Which of the following is a factor of production?",
//             answers: [
//                 "A. Capital",
//                 "B. Labor",
//                 "C. Land",
//                 "D. All of the above",
//             ],
//             correctAnswer: "D",
//         },
//         {
//             question: "What is the main cause of scarcity in economics?",
//             answers: [
//                 "A. Unlimited wants",
//                 "B. Limited resources",
//                 "C. Inefficient production",
//                 "D. Government policies",
//             ],
//             correctAnswer: "B",
//         },
//     ];

//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedAnswer, setSelectedAnswer] = useState(null);
//     const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
//     const [timer, setTimer] = useState(29 * 60); // 29 minutes and 24 seconds
//     const [correctAnswers, setCorrectAnswers] = useState(0);
//     const [skippedAnswers, setSkippedAnswers] = useState(0);
//     const [wrongAnswers, setWrongAnswers] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setTimer((prevTimer) => prevTimer - 1);
//         }, 1000);

//         return () => clearInterval(interval);
//     }, []);

//     const handleAnswerPress = (answer) => {
//         const currentQuestion = questions[currentQuestionIndex];
//         if (answer === currentQuestion.correctAnswer) {
//             setIsAnswerCorrect(true);
//             setCorrectAnswers(correctAnswers + 1);
//         } else {
//             setIsAnswerCorrect(false);
//             setWrongAnswers(wrongAnswers + 1);
//         }
//         setSelectedAnswer(answer);
//     };

//     const handleSkipQuestion = () => {
//         setSelectedAnswer(null);
//         setIsAnswerCorrect(null);
//         setSkippedAnswers(skippedAnswers + 1);
//         handleNextQuestion();
//     };

//     const handleNextQuestion = () => {
//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//             setSelectedAnswer(null);
//             setIsAnswerCorrect(null);
//         } else {
//             // Navigate to the score screen
//             navigation.navigate('ResultScoreScreen', {
//                 correctAnswers,
//                 skippedAnswers,
//                 wrongAnswers,
//             });
//         }
//     };

//     const renderQuestion2 = () => {
//         const currentQuestion = questions[currentQuestionIndex];

//         return (
//             <View>
//                 <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1} / {questions.length}</Text>
//                 <Text style={styles.question}>{currentQuestion.question}</Text>
//                 <View style={styles.answerOptions}>
//                     {currentQuestion.answers.map((answer, index) => (
//                         <TouchableOpacity
//                             key={index}
//                             style={[
//                                 styles.answerOption,
//                                 selectedAnswer === answer.charAt(0) && styles.selectedAnswer,
//                                 isAnswerCorrect === false && selectedAnswer === answer.charAt(0) && styles.incorrectAnswer,
//                             ]}
//                             onPress={() => handleAnswerPress(answer.charAt(0))}
//                         >
//                             <Text style={styles.answerText}>{answer}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             </View>
//         );
//     };

//     const renderQuestion = () => {
//         const currentQuestion = questions[currentQuestionIndex];

//         return (
//             <View>
//                 <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1} / {questions.length}</Text>
//                 <Text style={styles.question}>{currentQuestion.question}</Text>
//                 <View style={styles.answerOptions}>
//                     {currentQuestion.answers.map((answer, index) => (
//                         <TouchableOpacity
//                             key={index}
//                             style={[
//                                 styles.answerOption,
//                                 selectedAnswer === answer.charAt(0) && styles.selectedAnswer,
//                                 isAnswerCorrect === false && selectedAnswer === answer.charAt(0) && styles.incorrectAnswer,
//                             ]}
//                             onPress={() => handleAnswerPress(answer.charAt(0))}
//                         >
//                             <Text style={styles.answerText}>{answer}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//                 {/* <View style={styles.buttonContainer}>
//                     <TouchableOpacity
//                         style={[styles.button, styles.skipButton]}
//                         onPress={handleSkipQuestion}
//                     >
//                         <Text style={styles.buttonText}>Skip</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={handleNextQuestion}
//                         disabled={isAnswerCorrect === null}
//                     >
//                         <Text style={styles.buttonText}>View Score</Text>
//                     </TouchableOpacity>
//                 </View> */}
//             </View>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor="#0c4a6e" barStyle="light-content" />
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Economics Test</Text>
//                 <View style={styles.timerContainer}>
//                     <Text style={styles.timerText}>{`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`}</Text>
//                     <ProgressBar
//                         progress={1 - timer / (29 * 60)}
//                         color="#fbbf24"
//                         style={styles.progressBar}
//                     />
//                 </View>
//             </View>
//             {renderQuestion()}
//             {isAnswerCorrect === false && (
//                 <View style={styles.errorContainer}>
//                     <Text style={styles.errorText}>Incorrect answer. Please try again.</Text>
//                 </View>
//             )}
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                     style={[styles.button, styles.skipButton]}
//                     onPress={handleSkipQuestion}
//                 >
//                     <Text style={styles.buttonText}>Skip</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={handleNextQuestion}
//                     disabled={isAnswerCorrect === null}
//                 >
//                     <Text style={styles.buttonText}>Next</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );

//     function header() {
//         return (
//             <View
//                 style={{
//                     padding: Sizes.fixPadding * 2.0,
//                     flexDirection: "row",
//                     alignItems: "center",
//                     paddingVertical: 15,
//                 }}
//             >
//                 <MaterialIcons
//                     name="arrow-back-ios"
//                     size={20}
//                     color={Colors.whiteColor}
//                     onPress={() => navigation.goBack()}
//                     style={{
//                         paddingTop: 5,
//                     }}
//                 />
//                 <Text
//                     style={{
//                         ...Fonts.primaryColor19Medium,
//                         paddingHorizontal: Sizes.fixPadding * 2.0,
//                         color: Colors.whiteColor,
//                     }}
//                 >
//                     Syllabus
//                 </Text>
//             </View>
//         );
//     }

// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // backgroundColor: '#0c4a6e',
//         backgroundColor: Colors.primaryColor
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//     },
//     headerText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     timerContainer: {
//         alignItems: 'center',
//     },
//     timerText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     progressBar: {
//         width: 100,
//         height: 8,
//         borderRadius: 4,
//         marginTop: 4,
//     },
//     questionNumber: {
//         color: '#fff',
//         fontSize: 14,
//         fontWeight: 'bold',
//         marginHorizontal: 16,
//         marginVertical: 12,
//     },
//     question: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginHorizontal: 16,
//         marginVertical: 12,
//     },
//     answerOptions: {
//         backgroundColor: '#fff',
//         borderRadius: 15,
//         padding: 16,
//         marginHorizontal: 16,
//         elevation: 2
//     },
//     answerOption: {
//         paddingVertical: 12,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 15,
//         marginVertical: 8,
//     },
//     selectedAnswer: {
//         // borderColor: '#0c4a6e',
//         borderColor: 'green',
//         borderWidth: 2.5
//     },
//     incorrectAnswer: {
//         borderColor: '#e53e3e',
//     },
//     answerText: {
//         fontSize: 14,
//         color: '#333',
//         marginLeft: 10,
//     },
//     errorContainer: {
//         backgroundColor: '#e53e3e',
//         paddingVertical: 12,
//         paddingHorizontal: 16,
//         borderRadius: 15,
//         marginHorizontal: 16,
//         marginVertical: 12,
//     },
//     errorText: {
//         color: '#fff',
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
//     buttonContainer: {
//         alignItems: 'flex-end',
//         // marginTop: 'auto',
//         marginBottom: 16,
//         marginRight: 16,
//     },
//     button: {
//         backgroundColor: '#fbbf24',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         borderRadius: 15,
//     },
//     skipButton: {
//         // marginRight: 8,
//         marginBottom: 5,
//         marginTop: 5,
//     },
//     buttonText: {
//         color: '#0c4a6e',
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
// });

// export default OnlineExamScreen;
