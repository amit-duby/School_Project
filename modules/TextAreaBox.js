import React from "react";
import { View, Text, TextInput } from "react-native";
import {
    Colors,
    inputBoxDefaultStyle,
    inputTitleDefaultStyle,
} from "./style/defaultStyle";

import {
    inputBoxDynamicStyle,
    inputTitleDynamicStyle,
} from "./style/customeStyle";

const TextAreaBox = React.memo(
    ({
        title,
        placeholder,
        value,
        onChangeText,
        valuekey,
        required,
        customStyle,
        keyboardType,
        titleCustomStyle,
        inputCustomStyle,
        customInputProps,
        customTitleProps,
        leftIcon,
        rightIcon,
    }) => {
        return (
            <View
                style={{
                    ...customStyle,
                }}
            >
                {title ? (
                    <Text
                        style={{
                            ...inputTitleDefaultStyle,
                            ...inputTitleDynamicStyle,
                            ...titleCustomStyle,
                        }}
                        {...customTitleProps}
                    >
                        {title}{" "}
                        {required ? (
                            <Text style={{ color: Colors.redColor }}>*</Text>
                        ) : null}
                    </Text>
                ) : null}

                <View
                    style={{
                        alignItems: "center",
                        gap: 5,
                        ...inputBoxDefaultStyle,
                        ...inputBoxDynamicStyle,
                        ...inputCustomStyle,
                    }}
                >
                    {leftIcon}
                    <TextInput
                        value={value}
                        onChangeText={(text) => {
                            onChangeText({ [valuekey]: text });
                        }}
                        placeholder={placeholder}
                        placeholderTextColor={Colors.grayColor}
                        style={{
                            flex: 1,
                        }}
                        selectionColor={Colors.primaryColor}
                        keyboardType={keyboardType || "default"}
                        {...customInputProps}
                    />
                    {rightIcon}
                </View>
            </View>
        );
    }
);

export default TextAreaBox;
