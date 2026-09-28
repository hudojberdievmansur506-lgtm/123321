import { REWARD_STICKERS } from '../data/speechData';
import { audioService } from '../services/audio';
import { X, Trophy, Lock } from 'lucide-react';

interface StickerAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
}

export function StickerAlbumModal({ isOpen, onClose, stars }: StickerAlbumModalProps) {
  if (!isOpen) return null;

  // Each sticker unlocks at a certain star threshold (e.g., 2, 4, 7, 10, 14, 18, 22, 28)
  const thresholds = [1, 3, 6, 9, 12, 16, 20, 25];

  const handleStickerClick = (isUnlocked: boolean, name: string) => {
    audioService.playPop();
    if (isUnlocked) {
      audioService.playCorrect();
      audioService.speak(`Это твоя наклейка: ${name}! Ты настоящий молодец!`);
    } else {
      audioService.speak('Занимайся ещё и открой эту наклейку!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border-4 border-amber-300 max-h-[90vh] overflow-y-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 rounded-2xl text-amber-600">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-black text-amber-950">Звёздный альбом наклеек</h2>
              <p className="text-xs text-slate-500 font-semibold">У тебя накоплено: {stars} ⭐</p>
            </div>
          </div>
          <button
            onClick={() => { audioService.playPop(); onClose(); }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stickers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {REWARD_STICKERS.map((st, i) => {
            const req = thresholds[i];
            const isUnlocked = stars >= req;

            return (
              <div
                key={st.id}
                onClick={() => handleStickerClick(isUnlocked, st.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all cursor-pointer text-center relative select-none ${
                  isUnlocked
                    ? 'border-amber-300 bg-amber-50/70 hover:scale-105 shadow-sm'
                    : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute top-2 right-2 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                )}

                <div className={`text-5xl my-2 filter drop-shadow-sm ${!isUnlocked ? 'grayscale' : 'animate-wiggle'}`}>
                  {st.icon}
                </div>

                <div className="font-heading font-extrabold text-xs text-slate-900 mt-1">
                  {st.name}
                </div>

                <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                  {isUnlocked ? st.desc : `Нужно ${req} ⭐`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center text-xs font-bold text-amber-900">
          Выполняй упражнения, повторяй звуки и открывай новые наклейки в свою коллекцию! 🌟
        </div>
      </div>
    </div>
  );
}
