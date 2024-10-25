import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectForm from "../SelectForm/index.js";
import SelectListBox from "../SelectListBox/index.js.js";
import {
    Sizes,
    Colors,
    inputTitleDefaultStyle,
    inputBoxDefaultStyle,
    dropDownTextDefaultStyle,
} from "../../style/defaultStyle.js";

import {
    dropDownTextDynamicStyle,
    inputBoxDynamicStyle,
} from "../../style/customeStyle.js";

function __getTimeInfo(timeString) {
    const date = new Date(timeString);
    if (!(date instanceof Date)) {
        throw new Error("Input must be a valid Date object");
    }
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const amOrPm = hour >= 12 ? "PM" : "AM";
    const hourIn12HourFormat = hour % 12 || 12;
    return `${hourIn12HourFormat}:${minute} ${amOrPm}`;
}

const DropDownTextAreaBox = React.memo(
    ({
        title,
        placeholder,
        value,
        required,
        customStyle,
        list,
        onSelected,
        type,
        isSearchable,
        titleCustomStyle,
    }) => {
        const [state, setState] = useState({
            showModel: false,
            date: new Date(),
        });

        const updateOwnState = (data) =>
            setState((state) => ({ ...state, ...data }));

        const { showModel, date } = state;

        return (
            <>
                {title ? (
                    <Text
                        style={{
                            ...inputTitleDefaultStyle,
                            ...titleCustomStyle,
                        }}
                    >
                        {title}{" "}
                        {required ? (
                            <Text style={{ color: Colors.redColor }}>*</Text>
                        ) : null}
                    </Text>
                ) : null}

                {type == "select" || type == "date" || type == "time" ? (
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={(text) => {
                            updateOwnState({ showModel: true });
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                ...inputBoxDefaultStyle,
                                ...inputBoxDynamicStyle,
                                ...customStyle,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <TextInput
                                    placeholder={placeholder}
                                    placeholderTextColor={Colors.grayColor}
                                    value={
                                        type == "select"
                                            ? value?.name
                                            : value || ""
                                    }
                                    style={{
                                        ...dropDownTextDefaultStyle,
                                        ...dropDownTextDynamicStyle,
                                    }}
                                    selectionColor={Colors.primaryColor}
                                    editable={false}
                                />
                            </View>
                            <AntDesign
                                name="down"
                                size={16}
                                color={Colors.grayColor}
                            />
                        </View>
                    </TouchableOpacity>
                ) : null}

                {type == "select_one"
                    ? list?.map((item, i) => (
                          <SelectListBox
                              key={i}
                              item={item}
                              onSelected={(value) => onSelected(value)}
                              selected={value?.id}
                              listItemCustomStyle={{
                                  marginHorizontal: Sizes.fixPadding * 2.0,
                                  ...customStyle,
                              }}
                          />
                      ))
                    : null}

                {type == "select_multi"
                    ? list?.map((item, i) => (
                          <SelectListBox
                              key={i}
                              item={item}
                              onSelected={(newValue) => {
                                  const oldValue = JSON.parse(
                                      JSON.stringify(value || [])
                                  );

                                  const find = oldValue.find(
                                      (item) => item.id === newValue.id
                                  );

                                  if (find) {
                                      onSelected(
                                          oldValue.filter(
                                              (item) => item.id != newValue.id
                                          )
                                      );
                                  } else {
                                      oldValue.push(newValue);
                                      onSelected(oldValue);
                                  }
                              }}
                              selected={value?.map((item) => item.id)}
                              listItemCustomStyle={{
                                  marginHorizontal: Sizes.fixPadding * 2.0,
                                  ...customStyle,
                              }}
                              multi={true}
                          />
                      ))
                    : null}

                {type == "select" ? (
                    <SelectForm
                        isShow={showModel}
                        onBackdrop={() => updateOwnState({ showModel: false })}
                        list={list || []}
                        selected={value?.id || ""}
                        title={placeholder}
                        onSelected={(value) => {
                            onSelected(value);
                            updateOwnState({ showModel: false });
                        }}
                        isSearchable={isSearchable}
                        
                    />
                ) : null}
                {showModel && type == "date" ? (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="datetime"
                        is24Hour={false}
                        display="inline"
                        onChange={(event, selectedDate) => {
                            updateOwnState({
                                showModel: false,
                                date: selectedDate,
                            });
                            if (event.type == "set") {
                                onSelected(`${selectedDate.toDateString()}`);
                            }
                        }}
                    />
                ) : null}

                {showModel && type == "time" ? (
                    <DateTimePicker
                        testID="dateTimePicker1"
                        value={date}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={(event, selectedDate) => {
                            updateOwnState({ showModel: false });
                            if (event.type == "set") {
                                onSelected(
                                    __getTimeInfo(new Date(selectedDate))
                                );
                            }
                        }}
                    />
                ) : null}
            </>
        );
    }
);

export default DropDownTextAreaBox;
