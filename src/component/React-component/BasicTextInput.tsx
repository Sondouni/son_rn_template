import React from "react";
import { StyleSheet, TextInput, View, I18nManager, Text } from "react-native";


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


export default function BasicTextInput(props) {
  const {
    style,
    onChangeText,
    onFocus,
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    onSubmitEditing,
    defaultValue,
    maxLength,
    selectTextOnFocus,
    editable,
    placeholderTextColor,
    returnKeyType,
    inputRef
  } = props;


  let textStyle = StyleSheet.flatten([
    {
      fontFamily: "NanumSquareRound",
      includeFontPadding: false
      // borderRadius: 5,
      // paddingHorizontal: 10,
      // width: '100%',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      // flexDirection: 'row',
    },
    //custom for color
    style && style
  ]);

  if (textStyle.fontFamily) {
    const fontStyle = textStyle.fontStyle == "italic" ? "Italic" : "";
    const fontWeight = textStyle.fontWeight ?? 400;
    switch (textStyle.fontFamily) {
      case "NanumSquareRound":
        textStyle.fontFamily = `${textStyle.fontFamily}-${
          NanumSquareRound[fontWeight] == "R"
            ? NanumSquareRound[fontWeight]
            : NanumSquareRound[fontWeight] + fontStyle
        }`;
        break;
    }
    delete textStyle.fontWeight;
  }
  return (
    <TextInput
      allowFontScaling={false}
      ref={c => (inputRef != null && inputRef != undefined ? inputRef.current = c : "")}
      style={textStyle}
      onChangeText={text => onChangeText(text)}
      onFocus={() => onFocus()}
      autoCorrect={false}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      value={value}
      underlineColorAndroid={"rgba(0,0,0,0)"}
      keyboardType={keyboardType}
      // multiline={multiline}
      // textAlignVertical={textAlignVertical}
      onSubmitEditing={() => onSubmitEditing()}
      // defaultValue= {defaultValue !== '' ? defaultValue : null}
      maxLength={maxLength !== null ? maxLength : null}
      // selectTextOnFocus={selectTextOnFocus}
      editable={editable}
      returnKeyType={returnKeyType}

    />
  );
}

BasicTextInput.defaultProps = {
  style: {},
  onChangeText: text => {
  },
  onFocus: () => {
  },
  placeholder: "Placeholder",
  value: "",
  success: true,
  secureTextEntry: false,
  keyboardType: "default",
  multiline: false,
  textAlignVertical: "center",
  icon: null,
  onSubmitEditing: () => {
  },
  defaultValue: "",
  maxLength: null,
  selectTextOnFocus: true,
  editable: true
};
