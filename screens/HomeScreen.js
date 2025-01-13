import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LanguagePicker from "../components/LanguagePicker";
import SwapButton from "../components/SwapButton";
import { translateText } from "../services/translationService";

export default function HomeScreen() {
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("Kapampangan");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSourceLanguageChange = (newSourceLanguage) => {
    setSourceLanguage(newSourceLanguage);
    if (newSourceLanguage === "Kapampangan") {
      setTargetLanguage("English");
    } else {
      setTargetLanguage("Kapampangan");
    }
  };

  const handleTargetLanguageChange = (newTargetLanguage) => {
    if (newTargetLanguage === "Kapampangan") {
      setTargetLanguage("English");
    } else {
      setTargetLanguage(newTargetLanguage);
    }
  };

  const handleSwap = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  const handleTranslation = async () => {
    if (!text.trim()) {
      setTranslatedText("");
      return;
    }
    setLoading(true);
    try {
      const result = await translateText(text, sourceLanguage, targetLanguage);
      setTranslatedText(result);
    } catch (error) {
      setTranslatedText("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleTranslation();
  }, [text, sourceLanguage, targetLanguage]);

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
        {loading ? (
          <Text style={styles.loadingText}>Translating...</Text>
        ) : (
          <Text>{translatedText || "Translation will appear here..."}</Text>
        )}
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
    justifyContent: "center",
  },
  loadingText: {
    color: "#888",
    fontStyle: "italic",
  },
});
