import { useState, useEffect, useRef } from 'react';
import { ARTICULATION_EXERCISES } from '../data/speechData';
import { ArticulationExercise } from '../types/game';
import { Mascot } from './Mascot';
import { audioService } from '../services/audio';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, Video, VideoOff, Info, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

interface ArticulationGameProps {
  onStarEarned: () => void;
}

export function ArticulationGame({ onStarEarned }: ArticulationGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(ARTICULATION_EXERCISES[0].durationSeconds);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [showParentTip, setShowParentTip] = useState(false);
  
  // Camera mirror state
  const [isMirrorActive, setIsMirrorActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const currentExercise: ArticulationExercise = ARTICULATION_EXERCISES[currentIndex];

  // Reset timer on exercise switch
  useEffect(() => {
    setIsTimerRunning(false);
    setSecondsLeft(currentExercise.durationSeconds);
  }, [currentIndex, currentExercise.durationSeconds]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval!);
            setIsTimerRunning(false);
            handleExerciseComplete();
            return 0;
          }
          audioService.playTick();
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, currentExercise]);

  const handleExerciseComplete = () => {
    audioService.playStarReward();
    audioService.speak('Отлично! Ты справился с этим упражнением! Твой язычок стал ещё сильнее!');
    
    const updated = new Set(completedExercises);
    if (!updated.has(currentExercise.id)) {
      updated.add(currentExercise.id);
      setCompletedExercises(updated);
      onStarEarned();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 }
      });
    }
  };

  // Toggle Camera Mirror
  const toggleMirror = async () => {
    if (isMirrorActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      setIsMirrorActive(false);
      setCameraError(null);
    } else {
      try {
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 480 }, height: { ideal: 480 } },
          audio: false
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsMirrorActive(true);
      } catch (err: any) {
        setCameraError('Не удалось включить камеру. Проверьте разрешение браузера.');
        setIsMirrorActive(false);
      }
    }
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const handleStartTimer = () => {
    audioService.playPop();
    if (secondsLeft === 0) {
      setSecondsLeft(currentExercise.durationSeconds);
    }
    setIsTimerRunning(true);
    audioService.speak(currentExercise.childPrompt);
  };

  const handlePauseTimer = () => {
    audioService.playPop();
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    audioService.playPop();
    setIsTimerRunning(false);
    setSecondsLeft(currentExercise.durationSeconds);
  };

  const handleNext = () => {
    audioService.playPop();
    if (currentIndex < ARTICULATION_EXERCISES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    audioService.playPop();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isDone = completedExercises.has(currentExercise.id);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-emerald-100/70 border border-emerald-200 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-800">Гимнастика для речи</span>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-emerald-950 mt-1">Весёлый язычок</h2>
          <p className="text-slate-700 text-sm md:text-base mt-1 max-w-xl">
            Зарядка для язычка и губок делает речь чёткой и понятной! Повторяй движения за Гошей перед зеркалом.
          </p>
        </div>

        {/* Mirror Button */}
        <button
          onClick={toggleMirror}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm shadow-sm transition-all cursor-pointer ${
            isMirrorActive 
              ? 'bg-rose-500 hover:bg-rose-600 text-white' 
              : 'bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300'
          }`}
        >
          {isMirrorActive ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          <span>{isMirrorActive ? 'Закрыть зеркальце' : 'Включить зеркальце (камера)'}</span>
        </button>
      </div>

      {cameraError && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold rounded-2xl">
          {cameraError}
        </div>
      )}

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Exercises List Navigation */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Упражнения</span>
            <span className="text-xs font-extrabold text-emerald-700">
              {completedExercises.size} / {ARTICULATION_EXERCISES.length} выполнено
            </span>
          </div>

          <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
            {ARTICULATION_EXERCISES.map((ex, idx) => {
              const active = idx === currentIndex;
              const finished = completedExercises.has(ex.id);

              return (
                <button
                  key={ex.id}
                  onClick={() => {
                    audioService.playPop();
                    setCurrentIndex(idx);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    active 
                      ? 'bg-emerald-50 border-2 border-emerald-500 shadow-sm' 
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ex.icon}</span>
                    <div>
                      <div className="font-heading font-extrabold text-sm text-slate-900">{ex.title}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[150px]">{ex.subtitle}</div>
                    </div>
                  </div>
                  {finished && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Workout Center */}
        <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-emerald-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
          {/* Top Title & Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{currentExercise.icon}</span>
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-slate-900">{currentExercise.title}</h3>
                <p className="text-sm font-semibold text-slate-500">{currentExercise.subtitle}</p>
              </div>
            </div>

            {isDone && (
              <span className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4" /> Выполнено!
              </span>
            )}
          </div>

          {/* Child Voice Prompt */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 font-bold text-center text-base md:text-lg">
            «{currentExercise.childPrompt}»
          </div>

          {/* Demonstration Zone: Mascot + Live Mirror */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center py-4 bg-slate-50/70 rounded-3xl border border-slate-200/60 p-4">
            {/* Mascot Demonstration */}
            <div className="flex flex-col items-center text-center">
              <span className="text-xs font-bold text-slate-500 mb-2">Как показывает Гоша:</span>
              <Mascot 
                pose={currentExercise.mascotPose} 
                size="md" 
              />
              <span className="text-xs text-emerald-700 font-bold mt-2">
                Смотри на язычок!
              </span>
            </div>

            {/* Mirror / Video feed or placeholder mirror */}
            <div className="flex flex-col items-center text-center">
              <span className="text-xs font-bold text-slate-500 mb-2">Твоё зеркальце:</span>
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-emerald-400 bg-emerald-50 shadow-inner flex items-center justify-center relative">
                {isMirrorActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-emerald-800">
                    <span className="text-3xl mb-1">🪞</span>
                    <span className="text-xs font-bold">Зеркало выключено</span>
                    <button
                      onClick={toggleMirror}
                      className="mt-1 text-[11px] underline font-extrabold text-emerald-600 hover:text-emerald-800 cursor-pointer"
                    >
                      Включить камеру
                    </button>
                  </div>
                )}
              </div>
              <span className="text-xs text-slate-500 mt-2">
                Смотри на свои зубки и язычок
              </span>
            </div>
          </div>

          {/* Holding Timer Section */}
          <div className="flex flex-col items-center justify-center space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-amber-950 font-heading font-black text-3xl flex items-center justify-center shadow-md">
                {secondsLeft}
              </div>
              <div className="text-left">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Удержание позы</span>
                <p className="text-sm font-extrabold text-slate-800">
                  {isTimerRunning ? 'Держи позу язычка!' : secondsLeft === 0 ? 'Упражнение завершено!' : `Удерживай ${currentExercise.durationSeconds} сек.`}
                </p>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-2">
              {!isTimerRunning ? (
                <button
                  onClick={handleStartTimer}
                  className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-md cursor-pointer transition-all"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>{secondsLeft === 0 ? 'Повторить упражнение' : 'Начать упражнение'}</span>
                </button>
              ) : (
                <button
                  onClick={handlePauseTimer}
                  className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-md cursor-pointer transition-all"
                >
                  <Pause className="w-5 h-5" />
                  <span>Пауза</span>
                </button>
              )}

              <button
                onClick={handleResetTimer}
                className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl cursor-pointer transition-all"
                title="Сбросить таймер"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Between Exercises */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Назад</span>
            </button>

            <button
              onClick={() => setShowParentTip(!showParentTip)}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>{showParentTip ? 'Скрыть совет логопеда' : 'Совет родителям'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === ARTICULATION_EXERCISES.length - 1}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 disabled:opacity-30 cursor-pointer"
            >
              <span>Вперёд</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Parent Instruction Drawer */}
          {showParentTip && (
            <div className="p-4 bg-amber-50 border border-amber-300/80 rounded-2xl text-amber-950 text-xs md:text-sm leading-relaxed space-y-1">
              <span className="font-extrabold text-amber-900 block">💡 Подсказка логопеда:</span>
              <p>{currentExercise.parentInstruction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
