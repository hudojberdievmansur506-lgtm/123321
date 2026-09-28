import { useState } from 'react';
import { CHISTOGOVORKI } from '../data/speechData';
import { ChistogovorkaItem } from '../types/game';
import { audioService } from '../services/audio';
import { speechService } from '../services/speechRecognition';
import confetti from 'canvas-confetti';
import { Volume2, Mic, MicOff, CheckCircle2, Music, Sparkles } from 'lucide-react';

interface ChistogovorkiGameProps {
  onStarEarned: () => void;
}

export function ChistogovorkiGame({ onStarEarned }: ChistogovorkiGameProps) {
  const [selectedSound, setSelectedSound] = useState<string>('R');
  const [activeItem, setActiveItem] = useState<ChistogovorkaItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const sounds = [
    { key: 'R', label: 'Звук [Р]', emoji: '🦁' },
    { key: 'L', label: 'Звук [Л]', emoji: '🐝' },
    { key: 'Sh', label: 'Звук [Ш]', emoji: '🚩' },
    { key: 'Zh', label: 'Звук [Ж]', emoji: '🦔' },
    { key: 'S', label: 'Звук [С]', emoji: '🦊' },
    { key: 'Z', label: 'Звук [З]', emoji: '🐐' },
    { key: 'Ch', label: 'Звук [Ч]', emoji: '🚀' },
  ];

  const itemsForSound = CHISTOGOVORKI.filter(item => item.soundKey === selectedSound);

  const handleSpeakPhrase = (item: ChistogovorkaItem) => {
    setActiveItem(item);
    setIsSpeaking(true);
    setFeedback(null);
    audioService.playPop();

    // Speak clearly with slightly slower pace for articulation
    audioService.speak(item.fullText, () => {
      setIsSpeaking(false);
    });
  };

  const handleChildPractice = (item: ChistogovorkaItem) => {
    setActiveItem(item);

    if (speechService.getSupported()) {
      setIsListening(true);
      setFeedback('Слушаю тебя... Повтори чистоговорку!');
      audioService.playPop();

      speechService.startListening(
        (transcript, _isMatch) => {
          setIsListening(false);
          setFeedback(`Умница! Ты сказал: «${transcript}»! ⭐`);
          audioService.playCorrect();
          audioService.speak('Браво! Какая чистая и красивая речь!');
          handleSuccess(item.id);
        },
        (_err) => {
          setIsListening(false);
          setFeedback('Очень хорошо! Ты стараешься говорить чисто!');
          audioService.playCorrect();
          audioService.speak('Молодец! Очень старательно!');
          handleSuccess(item.id);
        },
        item.phrase
      );
    } else {
      audioService.playCorrect();
      setFeedback('Браво! Прекрасно проговорили! ⭐');
      audioService.speak('Браво! Замечательно звучит!');
      handleSuccess(item.id);
    }
  };

  const handleSuccess = (id: string) => {
    const updated = new Set(completedIds);
    if (!updated.has(id)) {
      updated.add(id);
      setCompletedIds(updated);
      onStarEarned();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-rose-100/70 border border-rose-200 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-rose-800">Автоматизация звуков</span>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-rose-950 mt-1">Чистоговорки</h2>
          <p className="text-slate-700 text-sm md:text-base mt-1 max-w-xl">
            Слушай ритмичные стишки, четко произноси трудные звуки и повторяй за Гошей!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-2xl shadow-sm border border-rose-200 text-rose-900 font-bold text-sm">
          <Sparkles className="w-5 h-5 text-rose-500 fill-rose-400" />
          <span>Отработано: {completedIds.size} из {CHISTOGOVORKI.length}</span>
        </div>
      </div>

      {/* Sound Selection Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {sounds.map(s => {
          const isSelected = selectedSound === s.key;
          return (
            <button
              key={s.key}
              onClick={() => {
                audioService.playPop();
                setSelectedSound(s.key);
                setFeedback(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap shadow-sm ${
                isSelected 
                  ? 'bg-rose-500 text-white shadow-md scale-105' 
                  : 'bg-white hover:bg-rose-50 text-rose-900 border border-rose-200/80'
              }`}
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {itemsForSound.map(item => {
          const isDone = completedIds.has(item.id);
          const isCurrent = activeItem?.id === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-3xl border-2 p-6 flex flex-col justify-between transition-all bg-white relative overflow-hidden ${
                isCurrent 
                  ? 'border-rose-400 shadow-md ring-2 ring-rose-200' 
                  : 'border-slate-200 hover:border-rose-300 shadow-sm'
              }`}
            >
              {isDone && (
                <div className="absolute top-4 right-4 text-emerald-600 bg-emerald-100 rounded-full p-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="text-4xl p-2 rounded-2xl bg-rose-50 border border-rose-100 shrink-0">
                  {item.icon}
                </div>
                <div>
                  {/* Rhythm prefix */}
                  <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600 block">
                    Ритм слогов:
                  </span>
                  <div className="text-2xl font-black font-heading text-rose-950 mt-0.5">
                    {item.syllablePrefix}
                  </div>
                  <div className="text-lg font-bold text-slate-700 mt-1">
                    — {item.phrase}!
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleSpeakPhrase(item)}
                  disabled={isSpeaking}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-extrabold text-xs md:text-sm rounded-2xl shadow-sm cursor-pointer disabled:opacity-50 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Послушать</span>
                </button>

                <button
                  onClick={() => handleChildPractice(item)}
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
                      <span>Сказать</span>
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
            <Music className="w-5 h-5 text-emerald-600" />
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
