import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function LanguagePicker({ selectedLanguage, onLanguageChange }) {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={onLanguageChange}
        style={styles.picker}
      >
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Kapampangan" value="Kapampangan" />
        <Picker.Item label="Tagalog" value="Tagalog" />
        {/* Add more languages here */}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
  },
});
