// Large word collection for text generation
export const WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their",
  "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him",
  "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only",
  "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want",
  "because", "any", "these", "give", "day", "most", "us", "is", "water", "long", "very", "before", "here", "through", "when", "much", "where",
  "your", "may", "say", "each", "which", "she", "do", "how", "their", "if", "will", "up", "other", "about", "out", "many", "then", "them",
  "these", "so", "some", "her", "would", "make", "like", "into", "him", "has", "two", "more", "very", "what", "know", "just", "first", "get",
  "over", "think", "also", "your", "work", "life", "only", "can", "still", "should", "after", "being", "now", "made", "before", "here", "through",
  "when", "much", "where", "well", "came", "show", "every", "good", "me", "give", "our", "under", "name", "very", "through", "just", "form",
  "sentence", "great", "think", "say", "help", "low", "line", "differ", "turn", "cause", "much", "mean", "before", "move", "right", "boy",
  "old", "too", "same", "tell", "does", "set", "three", "want", "air", "well", "also", "play", "small", "end", "put", "home", "read", "hand",
  "port", "large", "spell", "add", "even", "land", "here", "must", "big", "high", "such", "follow", "act", "why", "ask", "men", "change",
  "went", "light", "kind", "off", "need", "house", "picture", "try", "us", "again", "animal", "point", "mother", "world", "near", "build",
  "self", "earth", "father", "head", "stand", "own", "page", "should", "country", "found", "answer", "school", "grow", "study", "still",
  "learn", "plant", "cover", "food", "sun", "four", "between", "state", "keep", "eye", "never", "last", "let", "thought", "city", "tree",
  "cross", "farm", "hard", "start", "might", "story", "saw", "far", "sea", "draw", "left", "late", "run", "don't", "while", "press", "close",
  "night", "real", "life", "few", "north", "open", "seem", "together", "next", "white", "children", "begin", "got", "walk", "example",
  "ease", "paper", "group", "always", "music", "those", "both", "mark", "often", "letter", "until", "mile", "river", "car", "feet", "care",
  "second", "book", "carry", "took", "science", "eat", "room", "friend", "began", "idea", "fish", "mountain", "stop", "once", "base", "hear",
  "horse", "cut", "sure", "watch", "color", "face", "wood", "main", "enough", "plain", "girl", "usual", "young", "ready", "above", "ever",
  "red", "list", "though", "feel", "talk", "bird", "soon", "body", "dog", "family", "direct", "leave", "song", "measure", "door", "product",
  "black", "short", "numeral", "class", "wind", "question", "happen", "complete", "ship", "area", "half", "rock", "order", "fire", "south",
  "problem", "piece", "told", "knew", "pass", "since", "top", "whole", "king", "space", "heard", "best", "hour", "better", "during", "hundred",
  "five", "remember", "step", "early", "hold", "west", "ground", "interest", "reach", "fast", "verb", "sing", "listen", "six", "table",
  "travel", "less", "morning", "ten", "simple", "several", "vowel", "toward", "war", "lay", "against", "pattern", "slow", "center", "love",
  "person", "money", "serve", "appear", "road", "map", "rain", "rule", "govern", "pull", "cold", "notice", "voice", "unit", "power", "town",
  "fine", "certain", "fly", "fall", "lead", "cry", "dark", "machine", "note", "wait", "plan", "figure", "star", "box", "noun", "field",
  "rest", "correct", "able", "pound", "done", "beauty", "drive", "stood", "contain", "front", "teach", "week", "final", "gave", "green",
  "oh", "quick", "develop", "ocean", "warm", "free", "minute", "strong", "special", "mind", "behind", "clear", "tail", "produce", "fact",
  "street", "inch", "multiply", "nothing", "course", "stay", "wheel", "full", "force", "blue", "object", "decide", "surface", "deep",
  "moon", "island", "foot", "system", "busy", "test", "record", "boat", "common", "gold", "possible", "plane", "stead", "dry", "wonder",
  "laugh", "thousands", "ago", "ran", "check", "game", "shape", "equate", "hot", "miss", "brought", "heat", "snow", "tire", "bring", "yes",
  "distant", "fill", "east", "paint", "language", "among"
];

export const PUNCTUATION = [".", ",", "?", "!", ";"];

export type Difficulty = "easy" | "medium" | "hard";
export type TimeLimit = 30 | 60 | 120;

export interface TextGenerationOptions {
  difficulty: Difficulty;
  timeLimit: TimeLimit;
}

export function generateText(options: TextGenerationOptions): string {
  const { difficulty, timeLimit } = options;
  
  // Calculate approximate word count based on average typing speed and time
  const baseWordsPerMinute = 40;
  const estimatedWords = Math.round((timeLimit / 60) * baseWordsPerMinute * 1.2); // 20% buffer
  
  // Adjust word selection based on difficulty
  let wordPool: string[];
  switch (difficulty) {
    case "easy":
      // Use most common words (first 100)
      wordPool = WORDS.slice(0, 100);
      break;
    case "medium":
      // Use common to moderate words (first 200)
      wordPool = WORDS.slice(0, 200);
      break;
    case "hard":
      // Use all words including less common ones
      wordPool = WORDS;
      break;
  }
  
  const words: string[] = [];
  
  for (let i = 0; i < estimatedWords; i++) {
    // Add random word
    const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    words.push(randomWord);
    
    // Add punctuation occasionally (more frequent for harder difficulties)
    const punctuationChance = difficulty === "easy" ? 0.1 : difficulty === "medium" ? 0.15 : 0.2;
    if (Math.random() < punctuationChance && i > 0 && i < estimatedWords - 1) {
      const randomPunctuation = PUNCTUATION[Math.floor(Math.random() * PUNCTUATION.length)];
      words[words.length - 1] += randomPunctuation;
    }
  }
  
  return words.join(" ");
}