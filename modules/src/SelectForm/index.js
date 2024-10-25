import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import {
    Sizes,
    selectFormTitleDefaultStyle,
    selectFormModelDefaultStyle,
    searchBoxDefaultStyle,
    Colors,
} from "../../style/defaultStyle.js";

import {
    selectFormTitleDynamicStyle,
    selectFormModelDynamicStyle,
} from "../../style/customeStyle.js";
import { MaterialIcons } from "@expo/vector-icons";
import { Dialog } from "@rneui/themed";
import TextAreaBox from "../TextAreaBox/index.js";
import SelectListBox from "../SelectListBox/index.js.js";

const SelectForm = ({
    isShow,
    onBackdrop,
    title,
    list,
    onSelected,
    selected,
    isSearchable,
    listItemCustomStyle,
    searchBoxCustomStyle,
}) => {
    const [state, setState] = useState({
        search: "",
    });
    const updateOwnState = (data) =>
        setState((state) => ({ ...state, ...data }));

    const { search } = state;
    return (
        <>
            <Dialog
                isVisible={isShow}
                onBackdropPress={() => {
                    onBackdrop();
                }}
                animationType="fade"
                backdropStyle={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                }}
                overlayStyle={{
                    ...selectFormModelDefaultStyle,
                    ...selectFormModelDynamicStyle,
                }}
            >
                {isSearchable ? searchBox() : titleBox()}
                <FlatList
                    data={list?.filter(
                        (item) =>
                            item?.name
                                ?.toLocaleLowerCase()
                                .search(search?.toLocaleLowerCase()) >= 0
                    )}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <SelectListBox
                            item={item}
                            onSelected={onSelected}
                            selected={selected}
                            listItemCustomStyle={listItemCustomStyle}
                        />
                    )}
                    contentContainerStyle={{}}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <View style={{}}>
                            {((list &&
                                list?.filter(
                                    (item) =>
                                        item?.name
                                            ?.toLocaleLowerCase()
                                            .search(
                                                search?.toLocaleLowerCase()
                                            ) >= 0
                                ) == 0) ||
                                !list) && (
                                <>
                                    <Image
                                        source={require("../../assets/404.png")}
                                        style={{
                                            resizeMode: "center",
                                            width: 150,
                                            height: 150,
                                            alignSelf: "center",
                                        }}
                                    />
                                </>
                            )}
                        </View>
                    }
                />
            </Dialog>
        </>
    );

    function searchBox(params) {
        return (
            <View style={{}}>
                <TextAreaBox
                    placeholder={"Search & " + title}
                    value={search}
                    onChangeText={updateOwnState}
                    valuekey={"search"}
                    inputCustomStyle={{
                        marginHorizontal: 0,
                        marginBottom: Sizes.fixPadding * 1.5,
                        ...searchBoxDefaultStyle,
                        ...searchBoxCustomStyle,
                    }}
                    leftIcon={
                        <MaterialIcons
                            name={"search"}
                            size={15}
                            color={Colors.grayColor}
                        />
                    }
                />
            </View>
        );
    }
    function titleBox() {
        return (
            <View>
                <Text
                    style={{
                        ...selectFormTitleDefaultStyle,
                        ...selectFormTitleDynamicStyle,
                    }}
                >
                    {title}
                </Text>
            </View>
        );
    }
};

export default SelectForm;
