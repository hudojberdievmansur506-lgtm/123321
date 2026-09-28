export type GameModule = 
  | 'sound-imitation'   // Кто как говорит? (Звукоподражание)
  | 'articulation'      // Весёлый язычок (Артикуляционная гимнастика)
  | 'chistogovorki'     // Чистоговорки и звуки (Р, Л, Ш, Ж, С, З, Ч)
  | 'syllables'         // Прохлопай слоги (Слоговая структура слова)
  | 'odd-one-out'       // Четвёртый лишний (Словарный запас и логика)
  | 'story-sequence'    // Что сначала, что потом? (Связная речь)
  | 'tongue-twisters';  // Скороговорки (Чёткая дикция)

export interface SoundImitationItem {
  id: string;
  category: 'animals' | 'transport' | 'nature_home';
  categoryTitle: string;
  name: string;
  sound: string; // e.g. "МУ-У-У!", "ТИК-ТАК"
  spokenPrompt: string; // "Как говорит коровка? Коровка говорит: му-у-у!"
  icon: string;
  color: string;
  bgGradient: string;
  description: string;
}

export interface ArticulationExercise {
  id: string;
  title: string;
  subtitle: string;
  targetMouthAction: 'clock' | 'pancake' | 'swing' | 'horse' | 'brush' | 'mushroom' | 'jam' | 'tube' | 'balloons';
  icon: string;
  durationSeconds: number; // e.g. 5 to 8 seconds hold
  parentInstruction: string;
  childPrompt: string;
  mascotPose: string;
}

export interface ChistogovorkaItem {
  id: string;
  soundKey: 'R' | 'L' | 'Sh' | 'Zh' | 'S' | 'Z' | 'Ch';
  soundLabel: string;
  syllablePrefix: string; // e.g. "Ра-ра-ра"
  phrase: string; // "во дворе гора"
  fullText: string; // "Ра-ра-ра — во дворе гора!"
  icon: string;
  color: string;
}

export interface SyllableItem {
  id: string;
  word: string;
  syllables: string[]; // ["МА", "ШИ", "НА"]
  count: number;
  icon: string;
  hint: string;
}

export interface OddOneOutItem {
  id: string;
  question: string;
  categoryName: string;
  items: {
    id: string;
    name: string;
    icon: string;
    isOdd: boolean;
  }[];
  explanation: string; // "Помидор — это овощ, а остальные — фрукты!"
}

export interface StoryCard {
  step: number;
  text: string;
  icon: string;
  imageAlt: string;
}

export interface StorySequenceItem {
  id: string;
  title: string;
  description: string;
  cards: StoryCard[];
  fullStoryNarrative: string;
}

export interface TongueTwisterItem {
  id: string;
  soundFocus: string;
  text: string;
  icon: string;
  level: 'easy' | 'medium' | 'hard';
}

export interface UserProgress {
  stars: number;
  completedExercises: Record<string, boolean>;
  unlockedStickers: string[];
}
