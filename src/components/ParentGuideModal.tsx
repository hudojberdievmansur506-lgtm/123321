import { audioService } from '../services/audio';
import { X, BookOpen, Check, Heart, AlertCircle, Smile } from 'lucide-react';

interface ParentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ParentGuideModal({ isOpen, onClose }: ParentGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border-2 border-indigo-200 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 rounded-2xl text-indigo-700">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-black text-indigo-950">Советы логопеда родителям</h2>
              <p className="text-xs text-slate-500 font-semibold">Как эффективно развивать речь ребенка дома</p>
            </div>
          </div>
          <button
            onClick={() => { audioService.playPop(); onClose(); }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 5 Golden Rules */}
        <div className="space-y-3">
          <h3 className="font-heading font-black text-slate-900 text-lg flex items-center gap-2">
            <Smile className="w-5 h-5 text-indigo-600" />
            <span>5 правил успешных занятий:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
            <div className="p-3.5 bg-indigo-50/60 border border-indigo-200/80 rounded-2xl space-y-1">
              <span className="font-black text-indigo-900">1. Коротко и регулярно</span>
              <p className="text-slate-600">Лучше заниматься по 10–15 минут каждый день в хорошем настроении, чем 1 час раз в неделю.</p>
            </div>
            <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl space-y-1">
              <span className="font-black text-emerald-900">2. Перед зеркалом</span>
              <p className="text-slate-600">Обязательно используйте зеркало или камеру в приложении — ребенку важно видеть положение своего языка и губ.</p>
            </div>
            <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-1">
              <span className="font-black text-amber-900">3. Только игра, без принуждения</span>
              <p className="text-slate-600">Никогда не заставляйте силой. Если малыш устал — переключитесь на свободную игру или сказку.</p>
            </div>
            <div className="p-3.5 bg-rose-50/60 border border-rose-200/80 rounded-2xl space-y-1">
              <span className="font-black text-rose-900">4. Чёткая речь взрослого</span>
              <p className="text-slate-600">Не «сюсюкайте» и не искажайте слова. Говорите спокойно, выразительно и глядя в глаза ребёнку.</p>
            </div>
          </div>
        </div>

        {/* Age Milestones */}
        <div className="space-y-3">
          <h3 className="font-heading font-black text-slate-900 text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <span>Возрастные ориентиры речи:</span>
          </h3>

          <div className="space-y-2 text-xs md:text-sm">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="font-black text-slate-900 block">2–3 года:</span>
              <p className="text-slate-600">
                Появляются фразы из 2–3 слов («Мама, дай сок»). Активное звукоподражание животным и транспорту. Доступны звуки: А, О, У, И, П, Б, М, Т, Д, Н, К, Г.
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="font-black text-slate-900 block">3–4 года:</span>
              <p className="text-slate-600">
                Развернутые предложения. Ребенок задает вопросы («Где?», «Куда?», «Почему?»). Формируются свистящие звуки: [С], [З], [Ц].
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="font-black text-slate-900 block">4–5 лет:</span>
              <p className="text-slate-600">
                Появляются шипящие звуки: [Ш], [Ж], [Ч], [Щ]. Ребенок умеет пересказывать короткие сказки и понимать обобщающие слова (овощи, посуда).
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="font-black text-slate-900 block">5–7 лет:</span>
              <p className="text-slate-600">
                Появление сонорных звуков: [Л] и [Р]. Четкая слоговая структура сложных слов. Готовность к обучению чтению и письму.
              </p>
            </div>
          </div>
        </div>

        {/* When to visit a doctor */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-950 text-xs md:text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Важно:</strong> Приложение является игровым развивающим тренажером. Если у ребенка к 3 годам нет фразовой речи или к 5 годам отсутствует четкое звукопроизношение большинства звуков — обязательно проконсультируйтесь с очным логопедом-дефектологом!
          </p>
        </div>
      </div>
    </div>
  );
}
