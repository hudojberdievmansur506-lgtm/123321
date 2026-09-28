import { useState } from 'react';
import { SYLLABLE_WORDS } from '../data/speechData';
import { SyllableItem } from '../types/game';
import { audioService } from '../services/audio';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface SyllablesGameProps {
  onStarEarned: () => void;
}

export function SyllablesGame({ onStarEarned }: SyllablesGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tappedCount, setTappedCount] = useState(0);
  const [highlightedSyllableIdx, setHighlightedSyllableIdx] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedWordIds, setCompletedWordIds] = useState<Set<string>>(new Set());

  const currentWord: SyllableItem = SYLLABLE_WORDS[currentIndex];

  const handleSyllableTap = (index: number) => {
    audioService.playDrum();
    setHighlightedSyllableIdx(index);
    const syllable = currentWord.syllables[index];
    audioService.speak(syllable, undefined, 0.75);

    setTimeout(() => {
      setHighlightedSyllableIdx(null);
    }, 450);
  };

  const handleDrumHit = () => {
    audioService.playDrum();
    const newCount = tappedCount + 1;
    setTappedCount(newCount);

    if (newCount <= currentWord.syllables.length) {
      const syl = currentWord.syllables[newCount - 1];
      audioService.speak(syl, undefined, 0.8);
      setHighlightedSyllableIdx(newCount - 1);
      setTimeout(() => setHighlightedSyllableIdx(null), 400);
    }

    if (newCount === currentWord.count) {
      handleWordMastered();
    }
  };

  const handleClap = () => {
    audioService.playClap();
    const newCount = tappedCount + 1;
    setTappedCount(newCount);

    if (newCount <= currentWord.syllables.length) {
      const syl = currentWord.syllables[newCount - 1];
      audioService.speak(syl, undefined, 0.8);
      setHighlightedSyllableIdx(newCount - 1);
      setTimeout(() => setHighlightedSyllableIdx(null), 400);
    }

    if (newCount === currentWord.count) {
      handleWordMastered();
    }
  };

  const handleWordMastered = () => {
    setIsCompleted(true);
    audioService.playCorrect();
    audioService.speak(`Правильно! В слове «${currentWord.word}» ровно ${currentWord.count} ${getSyllableWord(currentWord.count)}!`);
    
    const updated = new Set(completedWordIds);
    if (!updated.has(currentWord.id)) {
      updated.add(currentWord.id);
      setCompletedWordIds(updated);
      onStarEarned();
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const getSyllableWord = (count: number) => {
    if (count === 1) return 'слог';
    if (count >= 2 && count <= 4) return 'слога';
    return 'слогов';
  };

  const handleSpeakFullWord = () => {
    audioService.playPop();
    audioService.speak(`Слово ${currentWord.word}. Прохлопаем: ${currentWord.syllables.join(', ')}!`);
  };

  const nextWord = () => {
    audioService.playPop();
    if (currentIndex < SYLLABLE_WORDS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTappedCount(0);
      setIsCompleted(false);
    }
  };

  const prevWord = () => {
    audioService.playPop();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTappedCount(0);
      setIsCompleted(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-sky-100/70 border border-sky-200 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-sky-800">Ритм и слоги</span>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-sky-950 mt-1">Прохлопай слоги</h2>
          <p className="text-slate-700 text-sm md:text-base mt-1 max-w-xl">
            Каждое слово состоит из кусочков — слогов! Ударяй в барабанчик или хлопай в ладоши столько раз, сколько слогов в слове.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-2xl shadow-sm border border-sky-200 text-sky-900 font-bold text-sm">
          <Sparkles className="w-5 h-5 text-sky-500 fill-sky-400" />
          <span>Слов изучено: {completedWordIds.size} из {SYLLABLE_WORDS.length}</span>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-sky-200 p-6 md:p-8 shadow-sm flex flex-col items-center text-center space-y-6">
        {/* Progress & Item indicator */}
        <div className="w-full flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Слово {currentIndex + 1} из {SYLLABLE_WORDS.length}</span>
          <span className="text-sky-700 font-extrabold">{currentWord.count} {getSyllableWord(currentWord.count)}</span>
        </div>

        {/* Big Word Display with Syllables */}
        <div className="flex flex-col items-center">
          <div className="text-6xl md:text-7xl mb-3 drop-shadow-sm filter select-none">
            {currentWord.icon}
          </div>
          
          <button 
            onClick={handleSpeakFullWord}
            className="flex items-center gap-2 text-3xl md:text-4xl font-heading font-black text-slate-900 hover:text-sky-600 transition-colors cursor-pointer group"
          >
            <span>{currentWord.word}</span>
            <Volume2 className="w-6 h-6 text-sky-500 group-hover:scale-110 transition-transform" />
          </button>
          <span className="text-xs text-slate-500 mt-1">Нажми, чтобы послушать</span>
        </div>

        {/* Interactive Syllable Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {currentWord.syllables.map((syl, i) => {
            const isHighlighted = highlightedSyllableIdx === i || tappedCount > i;
            return (
              <button
                key={i}
                onClick={() => handleSyllableTap(i)}
                className={`text-2xl md:text-3xl font-black py-4 px-6 rounded-2xl border-2 transition-all cursor-pointer select-none active:scale-95 shadow-sm ${
                  isHighlighted 
                    ? 'bg-amber-400 border-amber-500 text-amber-950 scale-105 shadow-md ring-4 ring-amber-200' 
                    : 'bg-sky-50 border-sky-300 text-sky-900 hover:bg-sky-100'
                }`}
              >
                {syl}
              </button>
            );
          })}
        </div>

        {/* Child Instruction / Hint */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 text-xs md:text-sm font-semibold max-w-md">
          {currentWord.hint}
        </div>

        {/* Interactive Drum & Clap Hands Controls */}
        <div className="w-full pt-4 border-t border-slate-100 flex flex-col items-center space-y-4">
          <div className="text-xs font-bold text-slate-500">
            Сделай {currentWord.count} {getSyllableWord(currentWord.count)}:
          </div>

          <div className="flex items-center justify-center gap-6">
            {/* Clapping Hands Button */}
            <button
              onClick={handleClap}
              className="flex flex-col items-center gap-2 p-5 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-amber-950 rounded-3xl shadow-md cursor-pointer transition-all border border-amber-300 group"
            >
              <span className="text-5xl group-hover:rotate-12 transition-transform">👏</span>
              <span className="font-heading font-black text-sm text-white drop-shadow">Хлопнуть!</span>
            </button>

            {/* Drum Button */}
            <button
              onClick={handleDrumHit}
              className="flex flex-col items-center gap-2 p-5 bg-gradient-to-b from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 active:scale-95 text-rose-950 rounded-3xl shadow-md cursor-pointer transition-all border border-rose-300 group"
            >
              <span className="text-5xl group-hover:scale-110 transition-transform">🥁</span>
              <span className="font-heading font-black text-sm text-white drop-shadow">В барабан!</span>
            </button>
          </div>

          {/* Tap counter dots */}
          <div className="flex items-center gap-2 mt-2">
            {Array.from({ length: currentWord.count }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all ${
                  tappedCount > i ? 'bg-emerald-500 scale-125' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          {isCompleted && (
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-4 py-2 rounded-2xl font-black text-sm animate-bounce">
              <CheckCircle2 className="w-5 h-5" />
              <span>Здорово! Ты правильно прохлопал слоги!</span>
            </div>
          )}
        </div>

        {/* Prev / Next Word Navigation */}
        <div className="w-full flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={prevWord}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Предыдущее слово</span>
          </button>

          <button
            onClick={nextWord}
            disabled={currentIndex === SYLLABLE_WORDS.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-sky-700 hover:text-sky-900 disabled:opacity-30 cursor-pointer"
          >
            <span>Следующее слово</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
