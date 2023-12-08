import React from "react";
import { Text, StyleSheet } from "react-native";
import { DEFAULT_BACKGROUND_COLOR } from "../../Utils";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

const NanumSquareRound = {
  100: "L",
  200: "L",
  300: "R",
  400: "R",
  500: "R",
  600: "B",
  700: "B",
  800: "EB",
  normal: "R",
  bold: "B"
};


export interface Props {
  style: StyleProp<TextStyle>;
  children?: any;
  numberOfLines?: any;
}

const BasicText = ({
                     style,
                     children,
                     numberOfLines
                   }: Props) => {

  Text.defaultProps = Text.defaultProps || {};
  // Text.defaultProps.style = {...Fonts.style.normalText};
  Text.defaultProps.allowFontScaling = false;


  let textStyle = StyleSheet.flatten([

    { fontFamily: "NanumSquareRound" },
    style && style

  ]);

  if (textStyle.fontFamily) {
    const fontStyle = textStyle.fontStyle == "italic" ? "Italic" : "";
    const fontWeight = textStyle.fontWeight ?? 400;
    switch (textStyle.fontFamily) {
      case "NanumSquareRound":
        textStyle.fontFamily = `NanumSquareRound${
          NanumSquareRound[fontWeight] == "R"
            ? NanumSquareRound[fontWeight]
            : NanumSquareRound[fontWeight] + fontStyle
        }`;
        break;
      default:
        break;
    }
  }
  delete textStyle.fontWeight;

  if (textStyle.textAlign === null || textStyle.textAlign === "" || textStyle.textAlign === undefined) {
    textStyle.textAlign = "left";
  }

  return (
    <Text style={[textStyle]} numberOfLines={numberOfLines === 0 ? null : numberOfLines}>
      {children ?? ""}
    </Text>
  );
};

export default BasicText;
