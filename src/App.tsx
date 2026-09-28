import { useState, useEffect } from 'react';
import { GameModule } from './types/game';
import { Navbar } from './components/Navbar';
import { Mascot } from './components/Mascot';
import { SoundImitationGame } from './components/SoundImitationGame';
import { ArticulationGame } from './components/ArticulationGame';
import { ChistogovorkiGame } from './components/ChistogovorkiGame';
import { SyllablesGame } from './components/SyllablesGame';
import { OddOneOutGame } from './components/OddOneOutGame';
import { StorySequenceGame } from './components/StorySequenceGame';
import { TongueTwistersGame } from './components/TongueTwistersGame';
import { StickerAlbumModal } from './components/StickerAlbumModal';
import { ParentGuideModal } from './components/ParentGuideModal';
import { audioService } from './services/audio';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [currentModule, setCurrentModule] = useState<GameModule>('sound-imitation');
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('rechevichok_stars');
      return saved ? parseInt(saved, 10) : 3; // start with 3 welcome stars!
    } catch {
      return 3;
    }
  });

  const [isStickersOpen, setIsStickersOpen] = useState(false);
  const [isParentGuideOpen, setIsParentGuideOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('rechevichok_stars', stars.toString());
    } catch {
      // ignore
    }
  }, [stars]);

  const handleStarEarned = () => {
    setStars(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-slate-800">
      {/* Top Navigation */}
      <Navbar
        currentModule={currentModule}
        onSelectModule={setCurrentModule}
        stars={stars}
        onOpenStickers={() => setIsStickersOpen(true)}
        onOpenParentGuide={() => setIsParentGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8">
        {currentModule === 'sound-imitation' && (
          <SoundImitationGame onStarEarned={handleStarEarned} />
        )}

        {currentModule === 'articulation' && (
          <ArticulationGame onStarEarned={handleStarEarned} />
        )}

        {currentModule === 'chistogovorki' && (
          <ChistogovorkiGame onStarEarned={handleStarEarned} />
        )}

        {currentModule === 'syllables' && (
          <SyllablesGame onStarEarned={handleStarEarned} />
        )}

        {currentModule === 'odd-one-out' && (
          <OddOneOutGame onStarEarned={handleStarEarned} />
        )}

        {currentModule === 'story-sequence' && (
          <StorySequenceGame onStarEarned={handleStarEarned} />
        )}

        {currentModule === 'tongue-twisters' && (
          <TongueTwistersGame onStarEarned={handleStarEarned} />
        )}
      </main>

      {/* Friendly Bottom Banner with Quick Overview */}
      <footer className="border-t border-amber-200/50 bg-white/70 py-6 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <span>🐲 Речевичок — развиваем красивую и чистую речь с ранних лет!</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsParentGuideOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer"
            >
              Советы логопеда
            </button>
            <span>•</span>
            <button
              onClick={() => setIsStickersOpen(true)}
              className="text-amber-700 hover:text-amber-900 font-bold hover:underline cursor-pointer"
            >
              Коллекция наклеек ({stars} ⭐)
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <StickerAlbumModal
        isOpen={isStickersOpen}
        onClose={() => setIsStickersOpen(false)}
        stars={stars}
      />

      <ParentGuideModal
        isOpen={isParentGuideOpen}
        onClose={() => setIsParentGuideOpen(false)}
      />
    </div>
  );
}
