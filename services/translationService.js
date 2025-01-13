export async function translateText(text, sourceLanguage, targetLanguage) {
  if (!text.trim()) {
      return ''; // Stop translating if there's no text
  }

  const BASE_URL = "https://kapalinga-api-git-main-anderson895s-projects.vercel.app/translate";
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

  const words = text.split(' '); // Split the text into words
  const translatedWords = [];
  let index = 0;

  while (index < words.length) {
      // Check for phrases longer than two words, we try up to 3 words
      let phrase = words.slice(index, index + 3).join(' '); // Check for a 3-word phrase first
      let phraseUrl = `${BASE_URL}/${endpoint}?word=${encodeURIComponent(phrase)}`;

      try {
          const phraseResponse = await fetch(phraseUrl, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
          });

          if (phraseResponse.ok) {
              const phraseData = await phraseResponse.json();
              if (phraseData.translation) {
                  translatedWords.push(phraseData.translation); // Add the whole translated phrase
                  index += 3; // Skip the next 2 words (since we already translated the 3-word phrase)
                  continue; // Skip the individual word check
              }
          }

          // If 3-word phrase doesn't exist, check for 2-word phrase
          phrase = words.slice(index, index + 2).join(' '); // Check for 2-word phrase
          phraseUrl = `${BASE_URL}/${endpoint}?word=${encodeURIComponent(phrase)}`;

          const phraseResponse2 = await fetch(phraseUrl, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
          });

          if (phraseResponse2.ok) {
              const phraseData2 = await phraseResponse2.json();
              if (phraseData2.translation) {
                  translatedWords.push(phraseData2.translation); // Add the whole translated phrase
                  index += 2; // Skip the next word
                  continue; // Skip the individual word check
              }
          }

          // Finally, check for a single word
          const word = words[index];
          const wordUrl = `${BASE_URL}/${endpoint}?word=${encodeURIComponent(word)}`;
          const wordResponse = await fetch(wordUrl, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
          });

          if (wordResponse.ok) {
              const wordData = await wordResponse.json();
              translatedWords.push(wordData.translation || word); // Add translated word or the original word
          } else {
              translatedWords.push(word); // In case of failure, use the original word
          }
      } catch (error) {
          console.error(`Error translating word/phrase "${phrase}":`, error.message);
          translatedWords.push(words[index]); // If there is an error, use the original word
      }

      index++; // Move to the next word
  }

  return translatedWords.join(' '); // Join the translated words into a sentence
}
