import { useState } from 'react';
import { STORY_SEQUENCES } from '../data/speechData';
import { StorySequenceItem, StoryCard } from '../types/game';
import { audioService } from '../services/audio';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, RotateCcw } from 'lucide-react';

interface StorySequenceGameProps {
  onStarEarned: () => void;
}

export function StorySequenceGame({ onStarEarned }: StorySequenceGameProps) {
  const [storyIdx, setStoryIdx] = useState(0);
  const currentStory: StorySequenceItem = STORY_SEQUENCES[storyIdx];

  // We shuffle the initial cards for the kid to put in order
  const [shuffledCards, setShuffledCards] = useState<StoryCard[]>(() => {
    return [...currentStory.cards].sort(() => Math.random() - 0.5);
  });
  
  // Placed cards in slots 1 to 4
  const [placedCards, setPlacedCards] = useState<(StoryCard | null)[]>([null, null, null, null]);
  const [isStoryComplete, setIsStoryComplete] = useState(false);
  const [completedStories, setCompletedStories] = useState<Set<string>>(new Set());

  const resetOrder = (story: StorySequenceItem) => {
    setShuffledCards([...story.cards].sort(() => Math.random() - 0.5));
    setPlacedCards([null, null, null, null]);
    setIsStoryComplete(false);
  };

  const handleCardClick = (card: StoryCard) => {
    audioService.playPop();
    // Find first empty slot
    const emptySlotIdx = placedCards.findIndex(slot => slot === null);
    if (emptySlotIdx === -1) return;

    const newPlaced = [...placedCards];
    newPlaced[emptySlotIdx] = card;
    setPlacedCards(newPlaced);

    // Remove from pool
    setShuffledCards(shuffledCards.filter(c => c.step !== card.step));

    // Check if full
    if (emptySlotIdx === 3) {
      checkCompletion(newPlaced as StoryCard[]);
    }
  };

  const handleRemovePlaced = (slotIdx: number) => {
    audioService.playPop();
    const card = placedCards[slotIdx];
    if (!card) return;

    const newPlaced = [...placedCards];
    newPlaced[slotIdx] = null;
    setPlacedCards(newPlaced);

    setShuffledCards([...shuffledCards, card]);
    setIsStoryComplete(false);
  };

  const checkCompletion = (placed: StoryCard[]) => {
    const isCorrect = placed.every((card, idx) => card.step === idx + 1);

    if (isCorrect) {
      setIsStoryComplete(true);
      audioService.playCorrect();
      audioService.speak(currentStory.fullStoryNarrative);

      const updated = new Set(completedStories);
      if (!updated.has(currentStory.id)) {
        updated.add(currentStory.id);
        setCompletedStories(updated);
        onStarEarned();
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.7 }
        });
      }
    } else {
      audioService.playPop();
      audioService.speak('Почти получилось! Но порядок карточек немного перепутался. Попробуй переставить!');
    }
  };

  const handleNarrateFullStory = () => {
    audioService.playPop();
    audioService.speak(currentStory.fullStoryNarrative);
  };

  const nextStory = () => {
    audioService.playPop();
    if (storyIdx < STORY_SEQUENCES.length - 1) {
      const next = storyIdx + 1;
      setStoryIdx(next);
      resetOrder(STORY_SEQUENCES[next]);
    }
  };

  const prevStory = () => {
    audioService.playPop();
    if (storyIdx > 0) {
      const prev = storyIdx - 1;
      setStoryIdx(prev);
      resetOrder(STORY_SEQUENCES[prev]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-teal-100/70 border border-teal-200 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-teal-800">Связная речь и логика</span>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-teal-950 mt-1">Что сначала, что потом?</h2>
          <p className="text-slate-700 text-sm md:text-base mt-1 max-w-xl">
            Расставь сюжетные картинки по порядку от 1 до 4, а затем послушай готовую сказку и перескажи её своими словами!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-2xl shadow-sm border border-teal-200 text-teal-900 font-bold text-sm">
          <Sparkles className="w-5 h-5 text-teal-500 fill-teal-400" />
          <span>Историй собрано: {completedStories.size} из {STORY_SEQUENCES.length}</span>
        </div>
      </div>

      {/* Main Board */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border-2 border-teal-200 p-6 md:p-8 shadow-sm space-y-6">
        {/* Title and Controls */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-black text-xl text-slate-900">{currentStory.title}</h3>
            <p className="text-xs font-semibold text-slate-500">{currentStory.description}</p>
          </div>
          <button
            onClick={() => resetOrder(currentStory)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-100 cursor-pointer"
            title="Перемешать заново"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Сбросить</span>
          </button>
        </div>

        {/* Story Slots 1 to 4 */}
        <div>
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
            Сюжетная дорожка (порядок событий):
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {placedCards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => card && handleRemovePlaced(idx)}
                className={`min-h-[160px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-between p-4 transition-all relative select-none ${
                  card 
                    ? 'border-teal-500 bg-teal-50/60 shadow-sm cursor-pointer hover:bg-rose-50 hover:border-rose-300' 
                    : 'border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-white border border-slate-300 text-xs font-black text-slate-600 flex items-center justify-center shadow-xs">
                  {idx + 1}
                </div>

                {card ? (
                  <>
                    <span className="text-5xl filter drop-shadow-xs my-1">{card.icon}</span>
                    <span className="text-xs font-bold text-slate-800 text-center leading-tight">
                      {card.text}
                    </span>
                    <span className="text-[10px] text-slate-400">Нажми, чтобы убрать</span>
                  </>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 text-center my-auto">
                    Выбери карточку внизу
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Cards Pool */}
        {shuffledCards.length > 0 && (
          <div>
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
              Карточки для выбора (нажми, чтобы поставить в цепочку):
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {shuffledCards.map(card => (
                <button
                  key={card.step}
                  onClick={() => handleCardClick(card)}
                  className="p-4 rounded-3xl border-2 border-slate-200 bg-white hover:border-teal-400 hover:bg-teal-50/50 flex flex-col items-center justify-between min-h-[140px] text-center shadow-sm cursor-pointer transition-all active:scale-95 group"
                >
                  <span className="text-5xl group-hover:scale-110 transition-transform">
                    {card.icon}
                  </span>
                  <span className="text-xs font-bold text-slate-800 leading-snug mt-2">
                    {card.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Narrative Box on Completion */}
        {isStoryComplete && (
          <div className="p-5 bg-teal-50 border-2 border-teal-300 rounded-3xl space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-900 font-extrabold">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span>Отличная история получилась!</span>
              </div>
              <button
                onClick={handleNarrateFullStory}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Слушать сказку</span>
              </button>
            </div>
            <p className="text-sm font-semibold text-teal-950 leading-relaxed bg-white/70 p-3 rounded-2xl border border-teal-200">
              «{currentStory.fullStoryNarrative}»
            </p>
            <span className="text-xs text-teal-800 font-bold block text-center">
              🗣️ А теперь попробуй пересказать эту историю своими словами!
            </span>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={prevStory}
            disabled={storyIdx === 0}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Предыдущая история</span>
          </button>

          <button
            onClick={nextStory}
            disabled={storyIdx === STORY_SEQUENCES.length - 1}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-teal-700 hover:text-teal-900 disabled:opacity-30 cursor-pointer"
          >
            <span>Следующая история</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
