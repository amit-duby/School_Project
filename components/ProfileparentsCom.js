import React from "react";
import { Image, Text, View } from "react-native";
import { Colors, Fonts } from "../constant/styles";
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";

const ProfileparentsCom = ({ state }) => {
    return (
        <>
            {userBox(
                "Father",
                state.father_pic,
                state.father_name,
                state.father_phone,
                state.father_occupation
            )}
            {userBox(
                "Mother",
                state.mother_pic,
                state.mother_name,
                state.mother_phone,
                state.mother_occupation
            )}
            {userBox(
                "Guardian",
                state.guardian_pic,
                state.guardian_name,
                state.guardian_phone,
                state.guardian_occupation,
                state.guardian_is,
                state.guardian_email,
                state.guardian_address
            )}
        </>
    );

    function userBox(type, image, name, phone, occupation, is, email, address) {
        return (
            <View
                style={{
                    backgroundColor: Colors.whiteColor,
                    marginHorizontal: 5,
                    borderRadius: 20,
                    marginTop: 5,
                    marginBottom: 5,
                    elevation: 3,
                    padding: 10,
                    paddingVertical: 10,
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <View
                        style={{
                            flex: 2,
                            alignItems: "center",
                            paddingVertical: 10,
                        }}
                    >
                        <Image
                            source={require("../assets/images/user.png")}
                            style={{
                                width: 70.0,
                                height: 70.0,
                                borderRadius: 5.0,
                            }}
                            resizeMode="cover"
                        />
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            {type}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 3,
                            paddingVertical: 5,
                            gap: 8,
                            justifyContent: "center",
                        }}
                    >
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Entypo
                                name="user"
                                size={20}
                                color={Colors.primaryColor}
                            />
                            <Text style={{ ...Fonts.blackColor15Medium }}>
                                {name}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <MaterialIcons
                                name="call"
                                size={20}
                                color={Colors.primaryColor}
                            />
                            <Text style={{ ...Fonts.blackColor15Medium }}>
                                {phone}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <FontAwesome
                                name="shopping-bag"
                                size={20}
                                color={Colors.primaryColor}
                            />
                            <Text style={{ ...Fonts.blackColor15Medium }}>
                                {occupation}
                            </Text>
                        </View>
                        {is && (
                            <>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <Entypo
                                        name="google-hangouts"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                    <Text
                                        style={{ ...Fonts.blackColor15Medium }}
                                    >
                                        {is}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <MaterialIcons
                                        name="email"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                    <Text
                                        style={{ ...Fonts.blackColor15Medium }}
                                    >
                                        {email}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <MaterialIcons
                                        name="location-on"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                    <Text
                                        style={{ ...Fonts.blackColor15Medium }}
                                    >
                                        {occupation}
                                    </Text>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </View>
        );
    }
};

export default ProfileparentsCom;
