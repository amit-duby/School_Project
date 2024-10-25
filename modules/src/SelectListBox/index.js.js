import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
    Colors,
    selectListItemDefaultStyle,
    selectListItemTextDefaultStyle,
} from "../../style/defaultStyle";

import {
    selectListItemDynamicStyle,
    selectListItemTextDynamicStyle,
} from "../../style/customeStyle";

const SelectListBox = React.memo(
    ({
        item,
        selected,
        onSelected,
        listItemCustomStyle,
        multi,
        childFiled,
    }) => {
        const [isSelected, setSelected] = useState(false);

        useEffect(() => {
            setSelected(
                !multi
                    ? selected == item?.id
                        ? true
                        : false
                    : selected?.includes(item?.id)
                    ? true
                    : false
            );
        }, [selected]);

        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                        onSelected(item);
                    }}
                    style={{
                        ...selectListItemDefaultStyle,
                        ...selectListItemDynamicStyle,
                        ...listItemCustomStyle,
                    }}
                    activeOpacity={0.6}
                >
                    <MaterialIcons
                        name={
                            isSelected
                                ? "radio-button-checked"
                                : "radio-button-unchecked"
                        }
                        size={18}
                        color={
                            isSelected ? Colors.primaryColor : Colors.grayColor
                        }
                    />
                    <Text
                        style={{
                            ...selectListItemTextDefaultStyle,
                            ...selectListItemTextDynamicStyle,
                        }}
                    >
                        {item?.name}
                    </Text>
                </TouchableOpacity>
                {childFiled}
            </>
        );
    }
);

export default SelectListBox;
