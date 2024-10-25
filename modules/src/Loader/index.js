import React from "react";
import { Image, View } from "react-native";
// import { Wave, Bounce, Chase, Swing } from "react-native-animated-spinkit";
import { Wave } from "react-native-animated-spinkit";
import { Colors } from "../../style/defaultStyle";
import { Dialog } from "@rneui/themed";

const Loader = ({
    isShow,
    backgroundColor,
    color,
    size,
    position,
    changeLoader,
    customStyle,
}) => {
    return (
        <Dialog
            isVisible={[undefined, "", null].includes(isShow) ? true : isShow}
            animationType="fade"
            backdropStyle={{
                backgroundColor: backgroundColor || "rgba(0,0,0,0.2)",
            }}
            overlayStyle={{
                backgroundColor: "rgba(0,0,0,0)",
                elevation: 0,
                flex: 1,
                justifyContent: position || "center", // center,flex-end,flex-start
                alignItems: "center",
            }}
        >
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    ...customStyle,
                }}
            >
                {changeLoader || (
                    <Wave
                        size={size || 30}
                        color={color || Colors.primaryColor}
                    />
                )}
            </View>
        </Dialog>
    );
};

export default Loader;
