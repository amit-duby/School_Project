import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const { width } = Dimensions.get('screen');

const EconomicsTest = () => {
    const questions = [
        {
            question: "On which base structure of economic problems has been installed?",
            answers: [
                "A. Unlimited Wants",
                "B. Limited Resources",
                "C. Both (a) and (b)",
                "D. None of the above",
            ],
            correctAnswer: "C",
        },
        {
            question: "What is the primary goal of economic systems?",
            answers: [
                "A. Maximize profits",
                "B. Ensure full employment",
                "C. Allocate resources efficiently",
                "D. All of the above",
            ],
            correctAnswer: "D",
        },
        {
            question: "Which of the following is a factor of production?",
            answers: [
                "A. Capital",
                "B. Labor",
                "C. Land",
                "D. All of the above",
            ],
            correctAnswer: "D",
        },
        {
            question: "What is the main cause of scarcity in economics?",
            answers: [
                "A. Unlimited wants",
                "B. Limited resources",
                "C. Inefficient production",
                "D. Government policies",
            ],
            correctAnswer: "B",
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [timer, setTimer] = useState(29 * 60); // 29 minutes and 24 seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleAnswerPress = (answer) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.correctAnswer) {
            setIsAnswerCorrect(true);
        } else {
            setIsAnswerCorrect(false);
        }
        setSelectedAnswer(answer);
    };

    // const handleNextQuestion = () => {
    //     if (currentQuestionIndex < questions.length - 1) {
    //         setCurrentQuestionIndex(currentQuestionIndex + 1);
    //         setSelectedAnswer(null);
    //         setIsAnswerCorrect(null);
    //     } else {
    //         // Navigates to the score screen or performs any other desired action
    //         console.log("Navigating to the score screen...");
    //     }
    // };
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
        } else {
            // Navigate to the score screen
            navigation.navigate('ScoreScreen', {
                correctAnswers,
                skippedAnswers,
                wrongAnswers,
            });
        }
    };
    const renderQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];

        return (
            <View>
                <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1} / {questions.length}</Text>
                <Text style={styles.question}>{currentQuestion.question}</Text>
                <View style={styles.answerOptions}>
                    {currentQuestion.answers.map((answer, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.answerOption,
                                selectedAnswer === answer.charAt(0) && styles.selectedAnswer,
                                isAnswerCorrect === false && selectedAnswer === answer.charAt(0) && styles.incorrectAnswer,
                            ]}
                            onPress={() => handleAnswerPress(answer.charAt(0))}
                        >
                            <Text style={styles.answerText}>{answer}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#0c4a6e" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Economics Test</Text>
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`}</Text>
                    <ProgressBar
                        progress={1 - timer / (29 * 60)}
                        color="#fbbf24"
                        style={styles.progressBar}
                    />
                </View>
            </View>
            {renderQuestion()}
            {isAnswerCorrect === false && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Incorrect answer. Please try again.</Text>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNextQuestion}
                    disabled={isAnswerCorrect === null}
                >
                    <Text style={styles.buttonText}>View Score</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c4a6e',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    timerContainer: {
        alignItems: 'center',
    },
    timerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressBar: {
        width: 100,
        height: 8,
        borderRadius: 4,
        marginTop: 4,
    },
    questionNumber: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginVertical: 12,
    },
    question: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginVertical: 12,
    },
    answerOptions: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 16,
    },
    answerOption: {
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginVertical: 8,
    },
    selectedAnswer: {
        borderColor: '#0c4a6e',
    },
    incorrectAnswer: {
        borderColor: '#e53e3e',
    },
    answerText: {
        fontSize: 14,
        color: '#333',
    },
    errorContainer: {
        backgroundColor: '#e53e3e',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginHorizontal: 16,
        marginVertical: 12,
    },
    errorText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonContainer: {
        alignItems: 'flex-end',
        marginTop: 'auto',
        marginBottom: 16,
        marginRight: 16,
    },
    button: {
        backgroundColor: '#fbbf24',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 4,
    },
    buttonText: {
        color: '#0c4a6e',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default EconomicsTest;