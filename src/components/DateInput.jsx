import { StyleSheet } from "react-native";
import React from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TextInput } from "@react-native-material/core";
import { useParse } from "../hooks/useParse";

const DateInput = ({label, value, changeDate }) => {
  const [date, setDate] = React.useState(new Date());

  const onChange = (event, currentDate) => {
    changeDate(useParse().parseDate({date: currentDate}));
    setDate(currentDate);
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };
  return (
    <TextInput
      variant="standard"
      style={styles.input}
      label={label}
      value={value}
      onPressIn={showMode}
    />
  );
};


const styles = StyleSheet.create({
    input: {
      padding: 5,
      width: "50%",
    }
  });

export default DateInput;
