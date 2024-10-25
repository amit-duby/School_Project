import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ResultScoreScreen = ({ route, navigation }) => {
    const { correctAnswers, skippedAnswers, wrongAnswers } = route.params;

    const totalQuestions = correctAnswers + skippedAnswers + wrongAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Test Results</Text>
            <View style={styles.scoreContainer}>
                <Text style={styles.score}>{score}%</Text>
                <Text style={styles.grade}>Grade A</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Correct Answers: {correctAnswers}</Text>
                <Text style={styles.detailText}>Skipped Answers: {skippedAnswers}</Text>
                <Text style={styles.detailText}>Wrong Answers: {wrongAnswers}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OnlineExamScreen')}
            >
                <Text style={styles.buttonText}>Retake Test</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { marginTop: 5 }]}
                onPress={() => navigation.navigate('AnswerSheet')}
            >
                <Text style={styles.buttonText}>AnswerSheet</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c4a6e',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 30,
    },
    scoreContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    score: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#0c4a6e',
        textAlign: 'center',
    },
    grade: {
        fontSize: 20,
        color: '#0c4a6e',
        textAlign: 'center',
    },
    detailsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        color: '#0c4a6e',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#0c4a6e',
        textAlign: 'center',
    },
});

export default ResultScoreScreen;