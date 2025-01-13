import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LanguagePicker from "../components/LanguagePicker";
import SwapButton from "../components/SwapButton";

export default function HomeScreen() {
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("Kapampangan");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleSourceLanguageChange = (newSourceLanguage) => {
    // Set the new source language
    setSourceLanguage(newSourceLanguage);

    // Automatically adjust the target language if Kapampangan is selected as source
    if (newSourceLanguage === "Kapampangan") {
      setTargetLanguage("English"); // Default to English if source is Kapampangan
    } else {
      // If Kapampangan is not the source, we set the target language to Kapampangan
      setTargetLanguage("Kapampangan");
    }
  };

  const handleTargetLanguageChange = (newTargetLanguage) => {
    // Ensure that Kapampangan cannot be set as both source and target
    if (newTargetLanguage === "Kapampangan") {
      setTargetLanguage("English"); // Default to English if target is Kapampangan
    } else {
      setTargetLanguage(newTargetLanguage);
    }
  };

  const handleSwap = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kapalinga</Text>
      <View style={styles.languageRow}>
        <LanguagePicker
          selectedLanguage={sourceLanguage}
          onLanguageChange={handleSourceLanguageChange}
        />
        <SwapButton onPress={handleSwap} />
        <LanguagePicker
          selectedLanguage={targetLanguage}
          onLanguageChange={handleTargetLanguageChange}
        />
      </View>
      <Text style={styles.label}>{sourceLanguage}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Text Here..."
        value={text}
        onChangeText={setText}
        multiline
      />
      <Text style={styles.label}>{targetLanguage}</Text>
      <View style={styles.output}>
        <Text>{translatedText || " "}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  output: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 10,
    textAlignVertical: "top",
  },
});
