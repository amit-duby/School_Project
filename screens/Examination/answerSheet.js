import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constant/styles';

const AnswerSheet = () => {
    const questionData = [
        {
            question: '1. Which Economist divided Economics in two branches of micro and macro on the basis of economic activity?',
            options: [
                { option: 'A. Marshall', isCorrect: false },
                { option: 'B. Ricardo', isCorrect: true },
                { option: 'C. Ragnar Frish', isCorrect: false },
                { option: 'D. None of these', isCorrect: false },
            ],
        },
        {
            question: '2. Which of the following is studied under Micro Economics?',
            options: [
                { option: 'A. Individual unit', isCorrect: false },
                { option: 'B. Economic Aggregate', isCorrect: false },
                { option: 'C. National Income', isCorrect: false },
                { option: 'D. None of these', isCorrect: true },
            ],
        },
        {
            question: '3. Micros, which means Small belongs to:',
            options: [
                { option: 'A. Arabian word', isCorrect: false },
                { option: 'B. Greek word', isCorrect: true },
                { option: 'C. German word', isCorrect: false },
                { option: 'D. English word', isCorrect: false },
            ],
        },
        {
            question: '4. Which of the following statement is true?',
            options: [
                { option: 'A. Human wants are infinite', isCorrect: false },
                { option: 'B. Resources are limited', isCorrect: false },
                { option: 'C. Scarcity problem gives birth', isCorrect: true },
                { option: 'D. All of these', isCorrect: false },
            ],
        },
        {
            question: '5. Which is a central problem of an economy?',
            options: [
                { option: 'A. Allocation of Resources', isCorrect: false },
                { option: 'B. Optimum Utilisation of Resources', isCorrect: false },
                { option: 'C. Economic Development', isCorrect: false },
                { option: 'D. All of these', isCorrect: true },
            ],
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Answer Sheet</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {questionData?.map((question, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{`${index + 1}. ${question.question}`}</Text>
                        {question.options.map((option, optionIndex) => (
                            <View key={optionIndex} style={styles.optionContainer}>
                                <Text style={[styles.optionText, option.isCorrect ? styles.correctOption : null]}>
                                    {option.option}
                                </Text>
                                {option.isCorrect && <Text style={styles.correctIcon}>&#10004;</Text>}
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.primaryColor,
        backgroundColor: Colors.whiteColor,
    },
    header: {
        backgroundColor: Colors.primaryColor,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.whiteColor,
    },
    headerText: {
        color: Colors.whiteColor,
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingVertical: 16,
    },
    questionContainer: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    questionText: {
        color: Colors.blackColor,
        fontSize: 16,
        marginBottom: 8,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    optionText: {
        color: Colors.blackColor,
        fontSize: 14,
        flex: 1,
        marginRight: 8,
    },
    correctOption: {
        color: 'green',
    },
    correctIcon: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AnswerSheet;