import { useState } from 'react';
import { SOUND_IMITATIONS } from '../data/speechData';
import { SoundImitationItem } from '../types/game';
import { audioService } from '../services/audio';
import { speechService } from '../services/speechRecognition';
import confetti from 'canvas-confetti';
import { Volume2, Mic, MicOff, CheckCircle2, Sparkles } from 'lucide-react';

interface SoundImitationGameProps {
  onStarEarned: () => void;
}

export function SoundImitationGame({ onStarEarned }: SoundImitationGameProps) {
  const [filter, setFilter] = useState<'all' | 'animals' | 'transport' | 'nature_home'>('all');
  const [activeItem, setActiveItem] = useState<SoundImitationItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [spokenFeedback, setSpokenFeedback] = useState<string | null>(null);
  const [practicedIds, setPracticedIds] = useState<Set<string>>(new Set());

  const filteredItems = filter === 'all' 
    ? SOUND_IMITATIONS 
    : SOUND_IMITATIONS.filter(item => item.category === filter);

  const handlePlaySound = (item: SoundImitationItem) => {
    setActiveItem(item);
    setIsSpeaking(true);
    setSpokenFeedback(null);
    audioService.playPop();

    // Play lively spoken prompt
    audioService.speak(item.spokenPrompt, () => {
      setIsSpeaking(false);
    });
  };

  const handleChildRepeat = (item: SoundImitationItem) => {
    // If browser supports microphone speech recognition, listen!
    if (speechService.getSupported()) {
      setIsListening(true);
      setSpokenFeedback('Слушаю тебя... Говори!');
      audioService.playPop();

      speechService.startListening(
        (transcript, _isMatch) => {
          setIsListening(false);
          const praises = [
            'Ура! Молодец, отлично получилось!',
            'Умница! Здорово повторяешь!',
            'Замечательно! Настоящий говорун!'
          ];
          const praise = praises[Math.floor(Math.random() * praises.length)];
          setSpokenFeedback(`Ты сказал: «${transcript}»! ⭐`);
          
          audioService.playCorrect();
          audioService.speak(praise);
          handleSuccess(item.id);
        },
        (_errMsg) => {
          setIsListening(false);
          // Graceful encouragement fallback even if mic didn't catch clearly
          setSpokenFeedback('Я тебя слышу! Ты очень стараешься! Молодец!');
          audioService.playCorrect();
          audioService.speak('Отлично! Ты очень стараешься!');
          handleSuccess(item.id);
        },
        item.sound
      );
    } else {
      // Direct reward without mic requirement
      audioService.playCorrect();
      setSpokenFeedback('Молодец! Прекрасно повторяешь! ⭐');
      audioService.speak('Молодец! Как здорово у тебя получается!');
      handleSuccess(item.id);
    }
  };

  const handleSuccess = (id: string) => {
    const updated = new Set(practicedIds);
    if (!updated.has(id)) {
      updated.add(id);
      setPracticedIds(updated);
      onStarEarned();
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-amber-100/70 border border-amber-200 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-amber-700">Первые слова и звуки</span>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-amber-950 mt-1">Кто как говорит?</h2>
          <p className="text-slate-700 text-sm md:text-base mt-1 max-w-xl">
            Нажимай на карточки, слушай голоса животных, машин и природы, а потом повторяй за ними вслух!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-2xl shadow-sm border border-amber-200 text-amber-900 font-bold text-sm">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
          <span>Повторено: {practicedIds.size} из {SOUND_IMITATIONS.length}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-amber-50/80 rounded-2xl border border-amber-200/60 w-fit">
        <button
          onClick={() => { audioService.playPop(); setFilter('all'); }}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
            filter === 'all' 
              ? 'bg-amber-500 text-white shadow-sm' 
              : 'text-amber-900 hover:bg-amber-100'
          }`}
        >
          🌟 Все звуки
        </button>
        <button
          onClick={() => { audioService.playPop(); setFilter('animals'); }}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
            filter === 'animals' 
              ? 'bg-amber-500 text-white shadow-sm' 
              : 'text-amber-900 hover:bg-amber-100'
          }`}
        >
          🐮 Животные
        </button>
        <button
          onClick={() => { audioService.playPop(); setFilter('transport'); }}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
            filter === 'transport' 
              ? 'bg-amber-500 text-white shadow-sm' 
              : 'text-amber-900 hover:bg-amber-100'
          }`}
        >
          🚗 Транспорт
        </button>
        <button
          onClick={() => { audioService.playPop(); setFilter('nature_home'); }}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
            filter === 'nature_home' 
              ? 'bg-amber-500 text-white shadow-sm' 
              : 'text-amber-900 hover:bg-amber-100'
          }`}
        >
          ⏰ Природа и звуки
        </button>
      </div>

      {/* Interactive Sound Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => {
          const isDone = practicedIds.has(item.id);
          const isCurrent = activeItem?.id === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-3xl border-2 transition-all p-5 flex flex-col justify-between relative overflow-hidden bg-white ${
                isCurrent 
                  ? 'border-amber-500 shadow-md ring-2 ring-amber-200' 
                  : 'border-slate-200/80 hover:border-amber-300 shadow-sm hover:shadow'
              }`}
            >
              {/* Completed checkmark badge */}
              {isDone && (
                <div className="absolute top-3 right-3 text-emerald-600 bg-emerald-100 rounded-full p-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}

              {/* Big Emoji & Name */}
              <div className="flex items-center gap-3">
                <div className="text-4xl md:text-5xl filter drop-shadow-sm select-none">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-slate-900">{item.name}</h3>
                  <span className="text-xs font-semibold text-slate-500">{item.categoryTitle}</span>
                </div>
              </div>

              {/* The Sound itself */}
              <div className="my-4 py-2 px-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-center">
                <span className="text-xl md:text-2xl font-black text-amber-700 tracking-wider">
                  {item.sound}
                </span>
                <p className="text-xs text-slate-600 mt-0.5">{item.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <button
                  onClick={() => handlePlaySound(item)}
                  disabled={isSpeaking}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs md:text-sm rounded-2xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Послушать</span>
                </button>

                <button
                  onClick={() => handleChildRepeat(item)}
                  disabled={isListening}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs md:text-sm rounded-2xl transition-all shadow-sm cursor-pointer"
                >
                  {isListening && activeItem?.id === item.id ? (
                    <>
                      <MicOff className="w-4 h-4 animate-spin text-white" />
                      <span>Слушаю...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      <span>Повторить</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spoken Feedback Banner */}
      {spokenFeedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold rounded-2xl flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            <span>{spokenFeedback}</span>
          </div>
          <button
            onClick={() => setSpokenFeedback(null)}
            className="text-xs text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
}
