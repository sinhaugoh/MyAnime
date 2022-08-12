import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function DropDownPickerField({
  onChangeCallback,
  value,
  choices,
}) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState(value ?? "-");
  const [items, setItems] = useState([
    {
      label: "-",
      value: "-",
    },
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
  ]);

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={val}
      items={items}
      setOpen={setOpen}
      setValue={setVal}
      setItems={setItems}
      onChangeValue={onChangeCallback}
      style={themedStyles.picker}
      textStyle={themedStyles.text}
      labelStyle={themedStyles.label}
      dropDownContainerStyle={themedStyles.dropDownContainer}
      arrowIconStyle={themedStyles.icon}
      closeIconStyle={themedStyles.icon}
      tickIconStyle={themedStyles.icon}
    />
  );
}

const styles = (theme) =>
  StyleSheet.create({
    picker: {
      backgroundColor: "transparent",
      borderColor: theme.borderOutline,
    },
    dropDownContainer: {
      backgroundColor: "transparent",
      borderColor: theme.borderOutline,
    },
    text: {
      color: theme.primaryTextColor,
    },
    label: {
      color: theme.primaryTextColor,
    },
    icon: {
      tintColor: theme.borderOutline,
    },
  });
