export async function translateText(text, sourceLanguage, targetLanguage) {
    // If the text is empty or consists only of spaces, return an empty string
    if (!text.trim()) {
        return ''; // Stop translating if there's no text
    }

    const BASE_URL = "https://kapalinga.onrender.com/translate";
    const endpointMap = {
      "English_Kapampangan": "english_kapampangan",
      "Kapampangan_English": "kapampangan_english",
      "Kapampangan_Tagalog": "kapampangan_tagalog",
      "Tagalog_Kapampangan": "tagalog_kapampangan",
    };
    const key = `${sourceLanguage}_${targetLanguage}`;
    const endpoint = endpointMap[key];
    if (!endpoint) {
      return text; // Return original text if translation is unavailable
    }
    const url = `${BASE_URL}/${endpoint}?word=${encodeURIComponent(text)}`;
    console.log("Requesting URL:", url);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.warn(`Failed to fetch translation. Status: ${response.status}`);
        return text; // Return original text if there is an issue fetching
      }

      const data = await response.json();
      console.log("API Response:", data);
      return data.translation || text; // Return original text if no translation found
    } catch (error) {
      console.error("Error in translateText:", error.message, error.stack);
      return text; // Return original text in case of any error
    }
}
