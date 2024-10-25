import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";

const WorkList = ({ item, navigation, student_id }) => {
    console.log(item, "item homework")
    // const { student_id, homework_id } = route.params;
    console.log(student_id, 'student_id')
    const source = {
        html: item.description,
    };
    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                marginHorizontal: 5,
                marginTop: 10,
                borderRadius: 20,
                elevation: 4.5,
                overflow: "hidden",
                paddingBottom: 20,
                marginHorizontal: 12
            }}
        >
            {headerBox()}

            <View
                style={{
                    marginHorizontal: 10,
                }}
            >
                {/* <Text
                    style={{
                        // fontSize: 13,
                        // fontFamily: "Mukta_Regular",
                        // color: Colors.grayColor,
                        ...Fonts.blackColor16Regular
                    }} 
                >
                    {item.description}
                </Text> */}
                <RenderHtml
                    contentWidth={Sizes.width - 24}
                    source={source}
                />
            </View>
        </View>
    );

    function headerBox(params) {
        return (
            <View
                style={{
                    height: 50,
                    backgroundColor: Colors.light,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 15,
                    justifyContent: "space-between",
                    marginBottom: 10,
                    // borderBottomWidth: 0.2,
                }}
            >
                <Text style={{ ...Fonts.blackColor20Medium }}>
                    {item.subject_name}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        gap: 10,
                    }}
                >
                    {item.status == 'submitted' ? null
                        :
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate('SubmitWorkScreen', { student_id: student_id, homework_id: item.id })}>
                                <FontAwesome5
                                    name="file-upload"
                                    size={20}
                                    color={Colors.blackColor}
                                />
                            </TouchableOpacity>
                        </>
                    }
                </View>
            </View>
        );
    }
};

export default WorkList;
