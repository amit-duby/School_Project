import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { Colors } from "../../style/defaultStyle";

function __generateRandomString(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

const FlatListBox = ({
    data,
    renderComponent,
    uniqueKey,
    isLoading,
    initialLoading,
    autoCall,
    isHorizontalScroll,
    isVerticalScroll,
    customLoader,
}) => {
    const [state, setState] = useState({ isOnBottom: false, totalCount: null });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isOnBottom, totalCount } = state;
    const renderFooter = () => {
        return isLoading
            ? customLoader || (
                  <ActivityIndicator
                      size="small"
                      color={Colors.primaryColor}
                      style={{ marginVertical: 20 }}
                  />
              )
            : null;
    };

    useEffect(() => {
        data.length == totalCount
            ? updateState({ isOnBottom: true })
            : updateState({ totalCount: data.length });
    }, [data]);

    return (
        <FlatList
            data={data || []}
            keyExtractor={(item) =>
                item[uniqueKey] || __generateRandomString(10)
            }
            renderItem={renderComponent}
            onEndReached={() => !isOnBottom && !isLoading && autoCall()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
            showsHorizontalScrollIndicator={isHorizontalScroll}
            showsVerticalScrollIndicator={isVerticalScroll}
            windowSize={1}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={isLoading}
            //         onRefresh={() => {
            //             __handleGet();
            //         }}
            //     />
            // }
        />
    );
};

export default FlatListBox;
