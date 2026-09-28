import { useState } from 'react';
import { ODD_ONE_OUT_ROUNDS } from '../data/speechData';
import { OddOneOutItem } from '../types/game';
import { audioService } from '../services/audio';
import confetti from 'canvas-confetti';
import { Sparkles, HelpCircle, CheckCircle2, ChevronRight, ChevronLeft, Volume2 } from 'lucide-react';

interface OddOneOutGameProps {
  onStarEarned: () => void;
}

export function OddOneOutGame({ onStarEarned }: OddOneOutGameProps) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [completedRounds, setCompletedRounds] = useState<Set<string>>(new Set());

  const currentRound: OddOneOutItem = ODD_ONE_OUT_ROUNDS[roundIdx];

  const handleSelectItem = (item: { id: string; name: string; isOdd: boolean }) => {
    if (isAnswered) return;

    setSelectedItemId(item.id);
    setIsAnswered(true);

    if (item.isOdd) {
      audioService.playCorrect();
      audioService.speak(currentRound.explanation);
      
      const updated = new Set(completedRounds);
      if (!updated.has(currentRound.id)) {
        updated.add(currentRound.id);
        setCompletedRounds(updated);
        onStarEarned();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 }
        });
      }
    } else {
      audioService.playPop();
      audioService.speak(`«${item.name}» подходит к остальным предметам! Поищи предмет из другой группы!`);
      // Allow retry after short delay
      setTimeout(() => {
        setIsAnswered(false);
        setSelectedItemId(null);
      }, 1500);
    }
  };

  const handleSpeakQuestion = () => {
    audioService.playPop();
    audioService.speak(`${currentRound.question}. Посмотри внимательно на картинки!`);
  };

  const nextRound = () => {
    audioService.playPop();
    if (roundIdx < ODD_ONE_OUT_ROUNDS.length - 1) {
      setRoundIdx(roundIdx + 1);
      setSelectedItemId(null);
      setIsAnswered(false);
    }
  };

  const prevRound = () => {
    audioService.playPop();
    if (roundIdx > 0) {
      setRoundIdx(roundIdx - 1);
      setSelectedItemId(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-purple-100/70 border border-purple-200 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-purple-800">Словарный запас и логика</span>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-purple-950 mt-1">Четвёртый лишний</h2>
          <p className="text-slate-700 text-sm md:text-base mt-1 max-w-xl">
            Учись объединять предметы в группы: овощи, фрукты, животные или транспорт! Найди лишнюю картинку и объясни свой выбор.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-2xl shadow-sm border border-purple-200 text-purple-900 font-bold text-sm">
          <Sparkles className="w-5 h-5 text-purple-500 fill-purple-400" />
          <span>Раундов: {completedRounds.size} из {ODD_ONE_OUT_ROUNDS.length}</span>
        </div>
      </div>

      {/* Main Board */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-purple-200 p-6 md:p-8 shadow-sm space-y-6">
        {/* Top Info */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-purple-800 uppercase tracking-wider">
              Тема: {currentRound.categoryName}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Раунд {roundIdx + 1} из {ODD_ONE_OUT_ROUNDS.length}
          </span>
        </div>

        {/* Question with Speak button */}
        <div className="flex items-center justify-center gap-3 text-center">
          <h3 className="font-heading font-extrabold text-xl md:text-2xl text-slate-900">
            {currentRound.question}
          </h3>
          <button
            onClick={handleSpeakQuestion}
            className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 cursor-pointer transition-colors"
            title="Озвучить вопрос"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentRound.items.map(item => {
            const isSelected = selectedItemId === item.id;
            const isOddCorrect = isSelected && item.isOdd;
            const isWrong = isSelected && !item.isOdd;

            let cardStyle = 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/50';
            if (isOddCorrect) {
              cardStyle = 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-200 scale-105';
            } else if (isWrong) {
              cardStyle = 'border-rose-400 bg-rose-50 ring-4 ring-rose-200';
            }

            return (
              <button
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all cursor-pointer select-none active:scale-95 ${cardStyle}`}
              >
                <span className="text-5xl md:text-6xl mb-2 filter drop-shadow-sm">
                  {item.icon}
                </span>
                <span className="font-heading font-extrabold text-base md:text-lg text-slate-800">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation Card when Correct */}
        {selectedItemId && currentRound.items.find(i => i.id === selectedItemId)?.isOdd && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-start gap-3 text-emerald-950 animate-fade-in">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-sm block">В точку! Всё верно:</span>
              <p className="text-sm font-semibold mt-0.5">{currentRound.explanation}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={prevRound}
            disabled={roundIdx === 0}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Предыдущий раунд</span>
          </button>

          <button
            onClick={nextRound}
            disabled={roundIdx === ODD_ONE_OUT_ROUNDS.length - 1}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-purple-700 hover:text-purple-900 disabled:opacity-30 cursor-pointer"
          >
            <span>Следующий раунд</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
