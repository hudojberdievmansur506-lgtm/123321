import { useState, useEffect } from 'react';
import { audioService } from '../services/audio';

interface MascotProps {
  pose?: string; // 'neutral' | 'happy' | 'talking' | 'tongue-left-right' | 'tongue-flat' | 'tongue-up-down' | 'tongue-click' | 'tongue-teeth' | 'tongue-suction' | 'tongue-lip' | 'lips-tube' | 'tongue-cheeks'
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  isListening?: boolean;
}

export function Mascot({ 
  pose = 'neutral', 
  speechText, 
  size = 'md',
  isListening = false
}: MascotProps) {
  const [blink, setBlink] = useState(false);
  const [internalPose, setInternalPose] = useState(pose);

  useEffect(() => {
    setInternalPose(pose);
  }, [pose]);

  // Periodic blinking
  useEffect(() => {
    const timer = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36 md:w-44 md:h-44',
    lg: 'w-48 h-48 md:w-56 md:h-56',
  }[size];

  const handleMascotClick = () => {
    audioService.playPop();
    const greetings = [
      'Привет, дружок! Давай красиво говорить!',
      'Ты отлично стараешься! Продолжай!',
      'Я твой друг Дракоша Гоша!',
      'У тебя язычок сильный и послушный!'
    ];
    const phrase = greetings[Math.floor(Math.random() * greetings.length)];
    audioService.speak(phrase);
  };

  return (
    <div className="flex flex-col items-center select-none relative">
      {/* Optional Speech Bubble */}
      {speechText && (
        <div className="mb-2 relative bg-white border-2 border-emerald-400 text-slate-800 font-bold px-4 py-2 rounded-2xl shadow-sm max-w-xs text-center text-sm md:text-base animate-bounce">
          <span>{speechText}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-emerald-400"></div>
        </div>
      )}

      {/* SVG Cartoon Mascot (Гоша - Зелёный Дракончик) */}
      <div 
        onClick={handleMascotClick}
        className={`${sizeClasses} cursor-pointer transition-transform hover:scale-105 active:scale-95 relative drop-shadow-md`}
        title="Нажми на меня, чтобы я поздоровался!"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          {/* Dragon horns / crest */}
          <polygon points="70,30 80,10 90,35" fill="#F59E0B" />
          <polygon points="95,25 105,5 115,30" fill="#FBBF24" />
          <polygon points="120,35 130,12 140,40" fill="#F59E0B" />

          {/* Cheerful dragon head */}
          <ellipse cx="100" cy="100" rx="65" ry="58" fill="#34D399" />
          <ellipse cx="100" cy="98" rx="60" ry="54" fill="#10B981" />

          {/* Rosy cheeks */}
          <ellipse cx="60" cy="115" rx="12" ry="8" fill="#F87171" opacity="0.6" />
          <ellipse cx="140" cy="115" rx="12" ry="8" fill="#F87171" opacity="0.6" />

          {/* Eyes */}
          {blink ? (
            <>
              {/* Blinking closed eyes */}
              <path d="M 68 85 Q 80 95 92 85" stroke="#064E3B" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 108 85 Q 120 95 132 85" stroke="#064E3B" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <ellipse cx="80" cy="80" rx="14" ry="17" fill="#FFFFFF" />
              <ellipse cx="82" cy="80" rx="8" ry="10" fill="#064E3B" />
              <circle cx="85" cy="76" r="3.5" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="120" cy="80" rx="14" ry="17" fill="#FFFFFF" />
              <ellipse cx="118" cy="80" rx="8" ry="10" fill="#064E3B" />
              <circle cx="121" cy="76" r="3.5" fill="#FFFFFF" />
            </>
          )}

          {/* Cute Nostrils */}
          <circle cx="94" cy="98" r="2.5" fill="#065F46" />
          <circle cx="106" cy="98" r="2.5" fill="#065F46" />

          {/* MOUTH & TONGUE DYNAMICS BASED ON POSE */}
          {/* Neutral smile */}
          {internalPose === 'neutral' && (
            <path d="M 82 120 Q 100 138 118 120" stroke="#064E3B" strokeWidth="4.5" strokeLinecap="round" fill="#D1FAE5" />
          )}

          {/* Listening mode */}
          {isListening && (
            <g>
              <ellipse cx="100" cy="125" rx="12" ry="12" fill="#064E3B" />
              <circle cx="100" cy="125" r="7" fill="#EF4444" className="animate-ping" />
            </g>
          )}

          {/* 1. Часики (влево - вправо) */}
          {internalPose === 'tongue-left-right' && (
            <g>
              <ellipse cx="100" cy="120" rx="26" ry="16" fill="#064E3B" />
              {/* Upper teeth */}
              <rect x="85" y="108" width="30" height="6" rx="2" fill="#FFFFFF" />
              {/* Tongue waving left & right */}
              <g className="animate-wiggle origin-top">
                <ellipse cx="100" cy="126" rx="18" ry="10" fill="#F43F5E" />
                <path d="M 96 122 L 104 122" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
              </g>
            </g>
          )}

          {/* 2. Блинчик (широкий язычок) */}
          {internalPose === 'tongue-flat' && (
            <g>
              <ellipse cx="100" cy="122" rx="26" ry="16" fill="#064E3B" />
              <rect x="84" y="110" width="32" height="6" rx="2" fill="#FFFFFF" />
              {/* Flat wide tongue on bottom lip */}
              <path d="M 76 124 Q 100 148 124 124 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="2" />
            </g>
          )}

          {/* 3. Качели (вверх - вниз) */}
          {internalPose === 'tongue-up-down' && (
            <g>
              <ellipse cx="100" cy="122" rx="24" ry="20" fill="#064E3B" />
              <rect x="85" y="106" width="30" height="6" rx="2" fill="#FFFFFF" />
              <rect x="88" y="132" width="24" height="5" rx="2" fill="#FFFFFF" />
              {/* Tongue pointing up */}
              <path d="M 90 128 Q 100 96 110 128 Z" fill="#F43F5E" className="animate-bounce" />
            </g>
          )}

          {/* 4. Лошадка (цоканье) */}
          {internalPose === 'tongue-click' && (
            <g>
              <ellipse cx="100" cy="122" rx="26" ry="18" fill="#064E3B" />
              <rect x="84" y="108" width="32" height="6" rx="2" fill="#FFFFFF" />
              <ellipse cx="100" cy="116" rx="16" ry="8" fill="#F43F5E" />
              {/* Little sound waves */}
              <path d="M 134 116 Q 140 122 134 128" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 66 116 Q 60 122 66 128" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* 5. Чистим зубки */}
          {internalPose === 'tongue-teeth' && (
            <g>
              <ellipse cx="100" cy="122" rx="28" ry="16" fill="#064E3B" />
              <rect x="82" y="112" width="36" height="7" rx="3" fill="#FFFFFF" />
              <rect x="85" y="125" width="30" height="6" rx="2" fill="#FFFFFF" />
              {/* Tongue brushing inner teeth */}
              <circle cx="94" cy="120" r="8" fill="#F43F5E" className="animate-pulse" />
            </g>
          )}

          {/* 6. Грибок (присоска) */}
          {internalPose === 'tongue-suction' && (
            <g>
              <ellipse cx="100" cy="125" rx="26" ry="22" fill="#064E3B" />
              {/* Tongue stuck to palate with stem */}
              <path d="M 80 112 Q 100 106 120 112 L 110 135 L 90 135 Z" fill="#F43F5E" />
            </g>
          )}

          {/* 7. Вкусное варенье (облизываем губу) */}
          {internalPose === 'tongue-lip' && (
            <g>
              <ellipse cx="100" cy="122" rx="26" ry="16" fill="#064E3B" />
              {/* Tongue wrapping up onto lip */}
              <path d="M 84 120 Q 100 100 116 120 Q 100 132 84 120" fill="#E11D48" stroke="#BE123C" strokeWidth="2" />
              <circle cx="100" cy="108" r="3" fill="#DC2626" /> {/* Jam drop */}
            </g>
          )}

          {/* 8. Трубочка / Хоботок */}
          {internalPose === 'lips-tube' && (
            <g>
              <ellipse cx="100" cy="122" rx="14" ry="14" fill="#064E3B" />
              <circle cx="100" cy="122" r="11" fill="#F87171" stroke="#065F46" strokeWidth="3" />
              <circle cx="100" cy="122" r="5" fill="#BE123C" />
            </g>
          )}

          {/* 9. Шарик / щечки */}
          {internalPose === 'tongue-cheeks' && (
            <g>
              <ellipse cx="100" cy="122" rx="22" ry="10" fill="#064E3B" />
              {/* One cheek puffed out with ball */}
              <circle cx="56" cy="115" r="18" fill="#F87171" className="animate-pulse" />
            </g>
          )}
        </svg>

        {isListening && (
          <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1.5 shadow-md animate-bounce">
            <span className="text-xs font-bold px-1">Слушаю!</span>
          </div>
        )}
      </div>
    </div>
  );
}
