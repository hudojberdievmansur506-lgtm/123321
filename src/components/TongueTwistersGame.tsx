import { useState } from 'react';
import { TONGUE_TWISTERS } from '../data/speechData';
import { TongueTwisterItem } from '../types/game';
import { audioService } from '../services/audio';
import { speechService } from '../services/speechRecognition';
import confetti from 'canvas-confetti';
import { Volume2, Mic, MicOff, CheckCircle2, Sparkles, FastForward } from 'lucide-react';

interface TongueTwistersGameProps {
  onStarEarned: () => void;
}

export function TongueTwistersGame({ onStarEarned }: TongueTwistersGameProps) {
  const [speedMode, setSpeedMode] = useState<'turtle' | 'rabbit' | 'rocket'>('rabbit');
  const [activeItem, setActiveItem] = useState<TongueTwisterItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completedTwisters, setCompletedTwisters] = useState<Set<string>>(new Set());

  const speeds = {
    turtle: { rate: 0.65, label: '🐢 Медленно (Черепашка)', desc: 'Четко проговариваем каждый звук' },
    rabbit: { rate: 0.95, label: '🐇 Обычно (Зайчик)', desc: 'Хороший бодрый темп' },
    rocket: { rate: 1.30, label: '🚀 Быстро (Ракета)', desc: 'Для настоящих чемпионов скороговорок!' }
  };

  const handleSpeakTwister = (item: TongueTwisterItem) => {
    setActiveItem(item);
    setIsSpeaking(true);
    setFeedback(null);
    audioService.playPop();

    const currentRate = speeds[speedMode].rate;
    audioService.speak(item.text, () => {
      setIsSpeaking(false);
    }, currentRate);
  };

  const handleChildTry = (item: TongueTwisterItem) => {
    setActiveItem(item);

    if (speechService.getSupported()) {
      setIsListening(true);
      setFeedback('Слушаю тебя... Попробуй сказать скороговорку!');
      audioService.playPop();

      speechService.startListening(
        (transcript, _isMatch) => {
          setIsListening(false);
          setFeedback(`Ух ты! Ты сказал: «${transcript}»! ⭐`);
          audioService.playCorrect();
          audioService.speak('Вот это дикция! Ни единой запинки! Браво!');
          handleSuccess(item.id);
        },
        (_err) => {
          setIsListening(false);
          setFeedback('Отличная попытка! Быстрый и ловкий язычок!');
          audioService.playCorrect();
          audioService.speak('Молодец! Очень быстрая и чистая речь!');
          handleSuccess(item.id);
        },
        item.text
      );
    } else {
      audioService.playCorrect();
      setFeedback('Супер-скороговорщик! Получилось без запинки! ⭐');
      audioService.speak('Вот это скорость! Ты чемпион!');
      handleSuccess(item.id);
    }
  };

  const handleSuccess = (id: string) => {
    const updated = new Set(completedTwisters);
    if (!updated.has(id)) {
      updated.add(id);
      setCompletedTwisters(updated);
      onStarEarned();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-orange-100/70 border border-orange-200 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-orange-800">Чёткая дикция</span>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-orange-950 mt-1">Скороговорки-спринт</h2>
          <p className="text-slate-700 text-sm md:text-base mt-1 max-w-xl">
            Тренируй скорость и чёткость речи! Сначала тренируйся в темпе черепашки, а потом переходи на космическую ракету.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-2xl shadow-sm border border-orange-200 text-orange-900 font-bold text-sm">
          <Sparkles className="w-5 h-5 text-orange-500 fill-orange-400" />
          <span>Освоено: {completedTwisters.size} из {TONGUE_TWISTERS.length}</span>
        </div>
      </div>

      {/* Speed Controls Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white rounded-3xl border border-orange-200 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
          <FastForward className="w-5 h-5 text-orange-500" />
          <span>Скорость произношения:</span>
        </div>

        <div className="flex items-center gap-2 bg-orange-50 p-1.5 rounded-2xl border border-orange-200">
          <button
            onClick={() => { audioService.playPop(); setSpeedMode('turtle'); }}
            className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              speedMode === 'turtle' ? 'bg-orange-500 text-white shadow-sm' : 'text-orange-900 hover:bg-orange-100'
            }`}
          >
            🐢 Черепашка
          </button>
          <button
            onClick={() => { audioService.playPop(); setSpeedMode('rabbit'); }}
            className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              speedMode === 'rabbit' ? 'bg-orange-500 text-white shadow-sm' : 'text-orange-900 hover:bg-orange-100'
            }`}
          >
            🐇 Зайчик
          </button>
          <button
            onClick={() => { audioService.playPop(); setSpeedMode('rocket'); }}
            className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              speedMode === 'rocket' ? 'bg-orange-500 text-white shadow-sm' : 'text-orange-900 hover:bg-orange-100'
            }`}
          >
            🚀 Ракета
          </button>
        </div>
      </div>

      {/* Twisters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TONGUE_TWISTERS.map(item => {
          const isDone = completedTwisters.has(item.id);
          const isCurrent = activeItem?.id === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-3xl border-2 p-6 flex flex-col justify-between transition-all bg-white relative overflow-hidden ${
                isCurrent 
                  ? 'border-orange-400 shadow-md ring-2 ring-orange-200' 
                  : 'border-slate-200 hover:border-orange-300 shadow-sm'
              }`}
            >
              {isDone && (
                <div className="absolute top-4 right-4 text-emerald-600 bg-emerald-100 rounded-full p-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl p-2 bg-orange-50 rounded-2xl border border-orange-100">{item.icon}</span>
                  <div>
                    <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider block">
                      {item.soundFocus}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Сложность: {item.level === 'easy' ? 'Начальная' : item.level === 'medium' ? 'Средняя' : 'Мастер'}
                    </span>
                  </div>
                </div>

                <div className="text-lg md:text-xl font-heading font-extrabold text-slate-800 leading-snug my-2">
                  «{item.text}»
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleSpeakTwister(item)}
                  disabled={isSpeaking}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-xs md:text-sm rounded-2xl shadow-sm cursor-pointer disabled:opacity-50 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Послушать</span>
                </button>

                <button
                  onClick={() => handleChildTry(item)}
                  disabled={isListening}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold text-xs md:text-sm rounded-2xl shadow-sm cursor-pointer transition-all"
                >
                  {isListening && activeItem?.id === item.id ? (
                    <>
                      <MicOff className="w-4 h-4 animate-spin" />
                      <span>Слушаю...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      <span>Сказать!</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold rounded-2xl flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span>{feedback}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
}
