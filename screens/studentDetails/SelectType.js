import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
const { width } = Dimensions.get("screen");

const SelectType = ({ updateParentState, tab }) => {
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: width - 10,
                    marginHorizontal: 5,
                    elevation: 3,
                    marginBottom: 1,
                }}
            >
                <TouchableOpacity
                    style={{
                        ...styles.textFieldWrapStyle,
                        width: "33.3%",
                        marginHorizontal: 0,
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 0,
                        borderEndWidth: 0,
                        justifyContent: "center",
                    }}
                    onPress={() => {
                        updateParentState({ tab: 0 });
                    }}
                    activeOpacity={0.8}
                >
                    <View
                        style={{
                            width: 15,
                            height: 15,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor:
                                tab == 0
                                    ? Colors.whiteColor
                                    : Colors.lightGrayColor,
                            marginEnd: 5,
                            backgroundColor:
                                tab == 0
                                    ? Colors.primaryColor
                                    : Colors.whiteColor,
                            elevation: tab == 0 ? 2 : 0,
                        }}
                    />
                    <View style={{}}>
                        <Text
                            style={{
                                ...Fonts.blackColor16Medium,
                                fontSize: 14,
                            }}
                        >
                            PERSONAL
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.textFieldWrapStyle,
                        width: "33.3%",
                        marginHorizontal: 0,
                        borderRadius: 0,
                        borderEndWidth: 0,
                        justifyContent: "center",
                    }}
                    onPress={() => {
                        updateParentState({ tab: 1 });
                    }}
                    activeOpacity={0.8}
                >
                    <View
                        style={{
                            width: 15,
                            height: 15,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor:
                                tab == 1
                                    ? Colors.whiteColor
                                    : Colors.lightGrayColor,
                            marginEnd: 5,
                            backgroundColor:
                                tab == 1
                                    ? Colors.primaryColor
                                    : Colors.whiteColor,
                            elevation: tab == 1 ? 2 : 0,
                        }}
                    />
                    <View style={{}}>
                        <Text
                            style={{
                                ...Fonts.blackColor16Medium,
                                fontSize: 14,
                            }}
                        >
                            PARENTS
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.textFieldWrapStyle,
                        width: "33.3%",
                        marginHorizontal: 0,
                        borderBottomLeftRadius: 0,
                        borderTopLeftRadius: 0,
                        justifyContent: "center",
                    }}
                    onPress={() => {
                        updateParentState({ tab: 2 });
                    }}
                    activeOpacity={0.8}
                >
                    <View
                        style={{
                            width: 15,
                            height: 15,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor:
                                tab == 2
                                    ? Colors.whiteColor
                                    : Colors.lightGrayColor,
                            marginEnd: 5,
                            backgroundColor:
                                tab == 2
                                    ? Colors.primaryColor
                                    : Colors.whiteColor,
                            elevation: tab == 2 ? 2 : 0,
                        }}
                    />

                    <View style={{}}>
                        <Text
                            style={{
                                ...Fonts.blackColor16Medium,
                                fontSize: 14,
                            }}
                        >
                            OTHER
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    textFieldWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        borderRadius: 10.0,
        paddingHorizontal: Sizes.fixPadding - 3.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        borderWidth: 1,
        borderColor: Colors.whiteColor,
    },
});

export default SelectType;
