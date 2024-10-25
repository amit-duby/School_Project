import { Dimensions } from "react-native";
import { dynamicColors } from "./customeStyle";
const { width } = Dimensions.get("window");

export const Fonts = {};

export const Colors = {
    blackColor: "#000000",
    redColor: "#FF0000",
    grayColor: "#B7B7B7",

    //not used

    whiteColor: "#FFFFFF",
    primaryColor: "#7C8B4B",
    lightWhiteColor: "#FAFAFA",
    lightPrimaryColor: "#DEEDA8",
    orangeColor: "#FFAC33",
    greenColor: "#008F11",
    purpleColor: "#757DE8",
    pinkColor: "#D05CE3",
    darkPinkColor: "#FF6090",
    bodyColor: "#f5f6fb",

    ...dynamicColors,
};

export const Sizes = {
    fixPadding: 10.0,
};

export const inputTitleDefaultStyle = {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding - 5.0,
    marginTop: Sizes.fixPadding * 2.0,
    color: Colors.blackColor,
};
export const inputBoxDefaultStyle = {
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    flexDirection: "row",
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.grayColor,
    borderWidth: 0.4,
    borderRadius: Sizes.fixPadding,
    fontSize: Sizes.fixPadding * 1.6,
    color: Colors.blackColor,
};

export const selectFormTitleDefaultStyle = {
    borderBottomWidth: 0.5,
    borderColor: Colors.grayColor,
    paddingBottom: 10,
    marginBottom: 15,
};
export const selectFormModelDefaultStyle = {
    width: width - 40,
    backgroundColor: Colors.whiteColor,

    alignSelf: "center",
    borderRadius: 20,
    elevation: 5,
    position: "relative",
    shadowColor: Colors.primaryColor,
    maxHeight: 400,
    minHeight: 250,
};
export const selectListItemDefaultStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.fixPadding,
    margin: Sizes.fixPadding,
    marginHorizontal: 0,
};
export const selectListItemTextDefaultStyle = {
    fontSize: 12.0,
    color: Colors.blackColor,
    flex: 1,
};
export const dropDownTextDefaultStyle = {
    fontSize: 14.0,
    color: Colors.blackColor,
    flex: 1,
};
export const searchBoxDefaultStyle = {};
