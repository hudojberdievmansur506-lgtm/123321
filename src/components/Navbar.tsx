import { useState } from 'react';
import { GameModule } from '../types/game';
import { audioService } from '../services/audio';
import { Volume2, VolumeX, Sparkles, BookOpen, Trophy } from 'lucide-react';

interface NavbarProps {
  currentModule: GameModule;
  onSelectModule: (module: GameModule) => void;
  stars: number;
  onOpenStickers: () => void;
  onOpenParentGuide: () => void;
}

export function Navbar({
  currentModule,
  onSelectModule,
  stars,
  onOpenStickers,
  onOpenParentGuide,
}: NavbarProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    audioService.setSoundEnabled(nextState);
    if (nextState) {
      audioService.playPop();
    }
  };

  const games: { id: GameModule; title: string; icon: string; color: string }[] = [
    { id: 'sound-imitation', title: 'Кто как говорит?', icon: '🐮', color: 'hover:bg-amber-100 text-amber-950' },
    { id: 'articulation', title: 'Весёлый язычок', icon: '👅', color: 'hover:bg-emerald-100 text-emerald-950' },
    { id: 'chistogovorki', title: 'Чистоговорки', icon: '🎤', color: 'hover:bg-rose-100 text-rose-950' },
    { id: 'syllables', title: 'Прохлопай слоги', icon: '🥁', color: 'hover:bg-sky-100 text-sky-950' },
    { id: 'odd-one-out', title: 'Четвёртый лишний', icon: '🔍', color: 'hover:bg-purple-100 text-purple-950' },
    { id: 'story-sequence', title: 'Что сначала?', icon: '📖', color: 'hover:bg-teal-100 text-teal-950' },
    { id: 'tongue-twisters', title: 'Скороговорки', icon: '⚡', color: 'hover:bg-orange-100 text-orange-950' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      {/* Top Utility Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectModule('sound-imitation')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-2xl shadow-sm group-hover:rotate-6 transition-transform">
            🐲
          </div>
          <div>
            <h1 className="font-heading font-black text-xl md:text-2xl text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Речевичок</span>
            </h1>
            <p className="text-[10px] font-bold text-emerald-700 tracking-wide uppercase">
              Развитие речи у детей
            </p>
          </div>
        </div>

        {/* Right side widgets: Stars, Stickers, Parents, Sound */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Star Counter */}
          <button
            onClick={onOpenStickers}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-2xl cursor-pointer shadow-xs transition-all active:scale-95"
            title="Нажми, чтобы открыть альбом наклеек!"
          >
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400 animate-bounce" />
            <span className="font-heading font-black text-sm md:text-base text-amber-950">{stars}</span>
          </button>

          {/* Stickers Album Button */}
          <button
            onClick={onOpenStickers}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 cursor-pointer shadow-xs transition-all"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Наклейки</span>
          </button>

          {/* Parents Guide */}
          <button
            onClick={onOpenParentGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-2xl text-xs font-bold text-indigo-900 cursor-pointer shadow-xs transition-all"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline">Родителям</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors"
            title={soundEnabled ? 'Выключить звук' : 'Включить звук'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-rose-500" />
            )}
          </button>
        </div>
      </div>

      {/* Game navigation tabs (scrollable horizontally on mobile) */}
      <div className="max-w-6xl mx-auto px-4 pb-2.5 overflow-x-auto scrollbar-none flex items-center gap-1.5 md:gap-2">
        {games.map(g => {
          const isActive = currentModule === g.id;
          return (
            <button
              key={g.id}
              onClick={() => {
                audioService.playPop();
                onSelectModule(g.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs md:text-sm font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                isActive
                  ? 'bg-amber-400 text-amber-950 shadow-sm scale-102 font-black'
                  : `bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 ${g.color}`
              }`}
            >
              <span className="text-base">{g.icon}</span>
              <span>{g.title}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
