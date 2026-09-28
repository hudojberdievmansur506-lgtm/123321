import { 
  SoundImitationItem, 
  ArticulationExercise, 
  ChistogovorkaItem, 
  SyllableItem, 
  OddOneOutItem, 
  StorySequenceItem,
  TongueTwisterItem 
} from '../types/game';

// 1. ЗВУКОПОДРАЖАНИЕ ("Кто как говорит?")
export const SOUND_IMITATIONS: SoundImitationItem[] = [
  // Животные
  {
    id: 'cow',
    category: 'animals',
    categoryTitle: 'Животные',
    name: 'Коровка',
    sound: 'МУ-У-У!',
    spokenPrompt: 'Как говорит коровка? Коровка говорит: МУУУ!',
    icon: '🐮',
    color: 'from-amber-400 to-orange-400',
    bgGradient: 'bg-amber-50 border-amber-200 text-amber-900',
    description: 'Тянем губки вперед трубочкой: МУ-У-У!'
  },
  {
    id: 'cat',
    category: 'animals',
    categoryTitle: 'Животные',
    name: 'Кошечка',
    sound: 'МЯУ-МЯУ!',
    spokenPrompt: 'Как мурлычет кошечка? Мяу-мяу!',
    icon: '🐱',
    color: 'from-pink-400 to-rose-400',
    bgGradient: 'bg-rose-50 border-rose-200 text-rose-900',
    description: 'Мягкий голосок: Мяу, мяу!'
  },
  {
    id: 'dog',
    category: 'animals',
    categoryTitle: 'Животные',
    name: 'Собачка',
    sound: 'ГАВ-ГАВ!',
    spokenPrompt: 'Как лает добрая собачка? Гав-гав!',
    icon: '🐶',
    color: 'from-amber-500 to-amber-600',
    bgGradient: 'bg-amber-50 border-amber-300 text-amber-950',
    description: 'Чётко и весело: Гав! Гав!'
  },
  {
    id: 'mouse',
    category: 'animals',
    categoryTitle: 'Животные',
    name: 'Мышка',
    sound: 'ПИ-ПИ-ПИ!',
    spokenPrompt: 'Как пищит маленькая мышка? Пи-пи-пи!',
    icon: '🐭',
    color: 'from-slate-400 to-zinc-500',
    bgGradient: 'bg-slate-50 border-slate-200 text-slate-800',
    description: 'Тоненьким голоском: Пи-пи-пи!'
  },
  {
    id: 'frog',
    category: 'animals',
    categoryTitle: 'Животные',
    name: 'Лягушонок',
    sound: 'КВА-КВА!',
    spokenPrompt: 'Как квакает лягушка в пруду? Ква-ква!',
    icon: '🐸',
    color: 'from-emerald-400 to-green-500',
    bgGradient: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    description: 'Широко открываем рот: Ква-ква!'
  },
  {
    id: 'duck',
    category: 'animals',
    categoryTitle: 'Животные',
    name: 'Уточка',
    sound: 'КРЯ-КРЯ!',
    spokenPrompt: 'Как плавает уточка и зовет утят? Кря-кря!',
    icon: '🦆',
    color: 'from-yellow-400 to-amber-500',
    bgGradient: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    description: 'Звонко: Кря-кря-кря!'
  },
  {
    id: 'rooster',
    category: 'animals',
    categoryTitle: 'Животные',
    name: 'Петушок',
    sound: 'КУ-КА-РЕ-КУ!',
    spokenPrompt: 'Как петушок будит солнышко? Ку-ка-ре-ку!',
    icon: '🐓',
    color: 'from-red-400 to-orange-500',
    bgGradient: 'bg-red-50 border-red-200 text-red-900',
    description: 'Громко и протяжно: Ку-ка-ре-ку!'
  },
  {
    id: 'wolf',
    category: 'animals',
    categoryTitle: 'Животные',
    name: 'Волчонок',
    sound: 'У-У-У-У!',
    spokenPrompt: 'Как воет волчонок на луну? У-у-у!',
    icon: '🐺',
    color: 'from-indigo-400 to-blue-500',
    bgGradient: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    description: 'Тянем длинный звук: У-у-у!'
  },

  // Транспорт
  {
    id: 'car',
    category: 'transport',
    categoryTitle: 'Транспорт',
    name: 'Машинка',
    sound: 'БИ-БИ!',
    spokenPrompt: 'Как сигналит машинка? Би-би! Поехали!',
    icon: '🚗',
    color: 'from-red-400 to-rose-500',
    bgGradient: 'bg-red-50 border-red-200 text-red-900',
    description: 'Сжимаем губки и говорим: Би-би!'
  },
  {
    id: 'train',
    category: 'transport',
    categoryTitle: 'Транспорт',
    name: 'Паровозик',
    sound: 'ТУ-ТУ-У-У!',
    spokenPrompt: 'Как гудит весёлый поезд? Ту-ту-у-у!',
    icon: '🚂',
    color: 'from-sky-400 to-cyan-500',
    bgGradient: 'bg-sky-50 border-sky-200 text-sky-900',
    description: 'Вытягиваем губы вперёд: Ту-ту!'
  },
  {
    id: 'plane',
    category: 'transport',
    categoryTitle: 'Транспорт',
    name: 'Самолётик',
    sound: 'У-У-Ж-Ж-Ж!',
    spokenPrompt: 'Как летит большой самолёт высоко в небе? У-у-ж-ж-ж!',
    icon: '✈️',
    color: 'from-cyan-400 to-blue-500',
    bgGradient: 'bg-cyan-50 border-cyan-200 text-cyan-900',
    description: 'Гудим моторчиком: У-у-ж-ж!'
  },
  {
    id: 'ship',
    category: 'transport',
    categoryTitle: 'Транспорт',
    name: 'Теплоход',
    sound: 'ЛУ-У-У!',
    spokenPrompt: 'Как теплоход приветствует море? Лу-у-у!',
    icon: '🚢',
    color: 'from-blue-400 to-indigo-500',
    bgGradient: 'bg-blue-50 border-blue-200 text-blue-900',
    description: 'Низким басом: Лу-у-у!'
  },

  // Природа и быт
  {
    id: 'clock',
    category: 'nature_home',
    categoryTitle: 'Природа и звуки',
    name: 'Часики',
    sound: 'ТИК-ТАК!',
    spokenPrompt: 'Как тикают наши настенные часики? Тик-так, тик-так!',
    icon: '⏰',
    color: 'from-teal-400 to-emerald-500',
    bgGradient: 'bg-teal-50 border-teal-200 text-teal-900',
    description: 'Язычок стучит за верхними зубками: Тик-так!'
  },
  {
    id: 'rain',
    category: 'nature_home',
    categoryTitle: 'Природа и звуки',
    name: 'Капельки дождя',
    sound: 'КАП-КАП!',
    spokenPrompt: 'Как капает тёплый летний дождик? Кап-кап-кап!',
    icon: '💧',
    color: 'from-sky-400 to-blue-400',
    bgGradient: 'bg-sky-50 border-sky-200 text-sky-900',
    description: 'Быстро и звонко: Кап-кап!'
  },
  {
    id: 'wind',
    category: 'nature_home',
    categoryTitle: 'Природа и звуки',
    name: 'Осенний ветерок',
    sound: 'Ш-Ш-Ш-Ш!',
    spokenPrompt: 'Как шумит ветерок в ветвях деревьев? Ш-ш-ш!',
    icon: '🍃',
    color: 'from-emerald-400 to-teal-500',
    bgGradient: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    description: 'Плавный теплый выдох: Ш-ш-ш!'
  },
  {
    id: 'drum',
    category: 'nature_home',
    categoryTitle: 'Природа и звуки',
    name: 'Барабанчик',
    sound: 'БУМ-БУМ-БАХ!',
    spokenPrompt: 'Как бьёт весёлый барабанщик? Бум-бум-бах!',
    icon: '🥁',
    color: 'from-purple-400 to-fuchsia-500',
    bgGradient: 'bg-purple-50 border-purple-200 text-purple-900',
    description: 'Энергично и ритмично: Бум! Бум! Бах!'
  }
];

// 2. АРТИКУЛЯЦИОННАЯ ГИМНАСТИКА
export const ARTICULATION_EXERCISES: ArticulationExercise[] = [
  {
    id: 'clock',
    title: 'Часики',
    subtitle: 'Движение язычка влево и вправо',
    targetMouthAction: 'clock',
    icon: '⏱️',
    durationSeconds: 6,
    parentInstruction: 'Улыбнитесь, приоткройте рот. Кончик языка поочерёдно касается левого и правого уголков рта под счёт: «Тик-так». Нижняя челюсть неподвижна!',
    childPrompt: 'Наш язычок превратился в стрелочку часов! Тик — влево, так — вправо!',
    mascotPose: 'tongue-left-right'
  },
  {
    id: 'pancake',
    title: 'Блинчик (Лопатка)',
    subtitle: 'Широкий расслабленный язычок',
    targetMouthAction: 'pancake',
    icon: '🥞',
    durationSeconds: 7,
    parentInstruction: 'Улыбнитесь, приоткройте рот. Спокойно положите широкий передний край языка на нижнюю губу. Удерживайте под счёт до 5–7. Язык не должен дрожать.',
    childPrompt: 'Испекли вкусный блинчик! Положи язычок отдыхать на губку и не шевелись.',
    mascotPose: 'tongue-flat'
  },
  {
    id: 'swing',
    title: 'Качели',
    subtitle: 'Язычок вверх и вниз',
    targetMouthAction: 'swing',
    icon: '🎠',
    durationSeconds: 6,
    parentInstruction: 'Широко откройте рот. Острый кончик языка тянется сначала к носу (или к верхним зубкам), затем к подбородку (к нижним зубкам). Рот не закрывать!',
    childPrompt: 'Качаемся на качелях: вверх к носику — вниз к подбородку!',
    mascotPose: 'tongue-up-down'
  },
  {
    id: 'horse',
    title: 'Лошадка',
    subtitle: 'Цоканье кончиком языка',
    targetMouthAction: 'horse',
    icon: '🐴',
    durationSeconds: 6,
    parentInstruction: 'Улыбнитесь, приоткройте рот. Звонко щёлкайте (цокайте) язычком, как копытами лошадка. Нижняя челюсть должна оставаться почти неподвижной.',
    childPrompt: 'Лошадка скачет по дорожке: цок-цок-цок! Поцокай звонко-звонко!',
    mascotPose: 'tongue-click'
  },
  {
    id: 'brush',
    title: 'Чистим зубки',
    subtitle: 'Массаж зубок кончиком языка',
    targetMouthAction: 'brush',
    icon: '🪥',
    durationSeconds: 6,
    parentInstruction: 'Улыбнитесь, приоткройте рот. Кончиком языка изнутри «чистим» нижние, а затем верхние зубки движениями вправо-влево. Губы неподвижны.',
    childPrompt: 'Язычок стал зубной щёточкой! Почистим зубки изнутри чисто-чисто!',
    mascotPose: 'tongue-teeth'
  },
  {
    id: 'mushroom',
    title: 'Грибок',
    subtitle: 'Присасывание языка к нёбу',
    targetMouthAction: 'mushroom',
    icon: '🍄',
    durationSeconds: 5,
    parentInstruction: 'Улыбнитесь, присосите широкий язычок всей плоскостью к нёбу («шляпка»), широко откройте рот. Натягивается подъязычная связка («ножка»).',
    childPrompt: 'Приклей язычок к крышечке рта! Держи крепко, вырос красивый грибок!',
    mascotPose: 'tongue-suction'
  },
  {
    id: 'jam',
    title: 'Вкусное варенье',
    subtitle: 'Облизывание верхней губы',
    targetMouthAction: 'jam',
    icon: '🍓',
    durationSeconds: 6,
    parentInstruction: 'Слегка приоткройте рот и широким краем языка плавно оближите верхнюю губу движением сверху вниз (не из стороны в сторону).',
    childPrompt: 'Ах, какое сладкое клубничное варенье на верхней губке! Слижем его широким язычком.',
    mascotPose: 'tongue-lip'
  },
  {
    id: 'tube',
    title: 'Трубочка (Хоботок)',
    subtitle: 'Упражнение для губ',
    targetMouthAction: 'tube',
    icon: '🎺',
    durationSeconds: 5,
    parentInstruction: 'Сомкните зубки, сильно вытяните губы вперед круглой узкой трубочкой (как при звуке «У»). Удерживайте 5 секунд.',
    childPrompt: 'Слоник вытянул длинный хоботок! Тянем губки вперед трубочкой: У-у-у!',
    mascotPose: 'lips-tube'
  },
  {
    id: 'balloons',
    title: 'Шарик (Футбол за щекой)',
    subtitle: 'Укрепление щечек и языка',
    targetMouthAction: 'balloons',
    icon: '🎈',
    durationSeconds: 6,
    parentInstruction: 'Рот закрыт. Кончик языка с силой упирается то в правую, то в левую щёку изнутри, надувая «мячик» или пряча конфетку.',
    childPrompt: 'Спрячем конфетку за щёчку! В правую щёчку — толк! В левую щёчку — толк!',
    mascotPose: 'tongue-cheeks'
  }
];

// 3. ЧИСТОГОВОРКИ ПО ЗВУКАМ
export const CHISTOGOVORKI: ChistogovorkaItem[] = [
  // Звук [Р]
  {
    id: 'r1',
    soundKey: 'R',
    soundLabel: 'Звук [Р]',
    syllablePrefix: 'Ра-ра-ра',
    phrase: 'начинается игра',
    fullText: 'Ра-ра-ра — начинается игра!',
    icon: '🎮',
    color: 'border-rose-300 bg-rose-50 text-rose-900'
  },
  {
    id: 'r2',
    soundKey: 'R',
    soundLabel: 'Звук [Р]',
    syllablePrefix: 'Ро-ро-ро',
    phrase: 'у мальчишки есть ведро',
    fullText: 'Ро-ро-ро — у мальчишки есть ведро!',
    icon: '🪣',
    color: 'border-orange-300 bg-orange-50 text-orange-900'
  },
  {
    id: 'r3',
    soundKey: 'R',
    soundLabel: 'Звук [Р]',
    syllablePrefix: 'Ры-ры-ры',
    phrase: 'улетели комары',
    fullText: 'Ры-ры-ры — улетели комары!',
    icon: '🦟',
    color: 'border-amber-300 bg-amber-50 text-amber-900'
  },
  {
    id: 'r4',
    soundKey: 'R',
    soundLabel: 'Звук [Р]',
    syllablePrefix: 'Ру-ру-ру',
    phrase: 'скачет зайчик поутру',
    fullText: 'Ру-ру-ру — скачет зайчик поутру!',
    icon: '🐰',
    color: 'border-pink-300 bg-pink-50 text-pink-900'
  },

  // Звук [Л]
  {
    id: 'l1',
    soundKey: 'L',
    soundLabel: 'Звук [Л]',
    syllablePrefix: 'Ла-ла-ла',
    phrase: 'на цветке сидит пчела',
    fullText: 'Ла-ла-ла — на цветке сидит пчела!',
    icon: '🐝',
    color: 'border-yellow-300 bg-yellow-50 text-yellow-900'
  },
  {
    id: 'l2',
    soundKey: 'L',
    soundLabel: 'Звук [Л]',
    syllablePrefix: 'Ло-ло-ло',
    phrase: 'на дворе сейчас тепло',
    fullText: 'Ло-ло-ло — на дворе сейчас тепло!',
    icon: '☀️',
    color: 'border-amber-300 bg-amber-50 text-amber-900'
  },
  {
    id: 'l3',
    soundKey: 'L',
    soundLabel: 'Звук [Л]',
    syllablePrefix: 'Лу-лу-лу',
    phrase: 'сидит мишка на углу',
    fullText: 'Лу-лу-лу — сидит мишка на углу!',
    icon: '🧸',
    color: 'border-emerald-300 bg-emerald-50 text-emerald-900'
  },
  {
    id: 'l4',
    soundKey: 'L',
    soundLabel: 'Звук [Л]',
    syllablePrefix: 'Лы-лы-лы',
    phrase: 'мы помыли все полы',
    fullText: 'Лы-лы-лы — мы помыли все полы!',
    icon: '🧹',
    color: 'border-teal-300 bg-teal-50 text-teal-900'
  },

  // Звук [Ш]
  {
    id: 'sh1',
    soundKey: 'Sh',
    soundLabel: 'Звук [Ш]',
    syllablePrefix: 'Ша-ша-ша',
    phrase: 'наша каша хороша',
    fullText: 'Ша-ша-ша — наша каша хороша!',
    icon: '🥣',
    color: 'border-sky-300 bg-sky-50 text-sky-900'
  },
  {
    id: 'sh2',
    soundKey: 'Sh',
    soundLabel: 'Звук [Ш]',
    syllablePrefix: 'Шу-шу-шу',
    phrase: 'я флажком своим машу',
    fullText: 'Шу-шу-шу — я флажком своим машу!',
    icon: '🚩',
    color: 'border-blue-300 bg-blue-50 text-blue-900'
  },
  {
    id: 'sh3',
    soundKey: 'Sh',
    soundLabel: 'Звук [Ш]',
    syllablePrefix: 'Ши-ши-ши',
    phrase: 'пляшут наши малыши',
    fullText: 'Ши-ши-ши — пляшут наши малыши!',
    icon: '👶',
    color: 'border-indigo-300 bg-indigo-50 text-indigo-900'
  },
  {
    id: 'sh4',
    soundKey: 'Sh',
    soundLabel: 'Звук [Ш]',
    syllablePrefix: 'Шо-шо-шо',
    phrase: 'летом очень хорошо',
    fullText: 'Шо-шо-шо — летом очень хорошо!',
    icon: '🏖️',
    color: 'border-cyan-300 bg-cyan-50 text-cyan-900'
  },

  // Звук [Ж]
  {
    id: 'zh1',
    soundKey: 'Zh',
    soundLabel: 'Звук [Ж]',
    syllablePrefix: 'Жа-жа-жа',
    phrase: 'мы в лесу нашли ежа',
    fullText: 'Жа-жа-жа — мы в лесу нашли ежа!',
    icon: '🦔',
    color: 'border-amber-300 bg-amber-50 text-amber-900'
  },
  {
    id: 'zh2',
    soundKey: 'Zh',
    soundLabel: 'Звук [Ж]',
    syllablePrefix: 'Жу-жу-жу',
    phrase: 'я на солнышке лежу',
    fullText: 'Жу-жу-жу — я на солнышке лежу!',
    icon: '🦎',
    color: 'border-yellow-300 bg-yellow-50 text-yellow-900'
  },
  {
    id: 'zh3',
    soundKey: 'Zh',
    soundLabel: 'Звук [Ж]',
    syllablePrefix: 'Жи-жи-жи',
    phrase: 'над рекой летают стрижи',
    fullText: 'Жи-жи-жи — над рекой летают стрижи!',
    icon: '🐦',
    color: 'border-teal-300 bg-teal-50 text-teal-900'
  },

  // Звук [С] и [З]
  {
    id: 's1',
    soundKey: 'S',
    soundLabel: 'Звук [С]',
    syllablePrefix: 'Са-са-са',
    phrase: 'в лесу бегает лиса',
    fullText: 'Са-са-са — в лесу бегает лиса!',
    icon: '🦊',
    color: 'border-orange-300 bg-orange-50 text-orange-900'
  },
  {
    id: 's2',
    soundKey: 'S',
    soundLabel: 'Звук [С]',
    syllablePrefix: 'Су-су-су',
    phrase: 'было холодно в лесу',
    fullText: 'Су-су-су — было холодно в лесу!',
    icon: '🌲',
    color: 'border-emerald-300 bg-emerald-50 text-emerald-900'
  },
  {
    id: 'z1',
    soundKey: 'Z',
    soundLabel: 'Звук [З]',
    syllablePrefix: 'За-за-за',
    phrase: 'на лугу стоит коза',
    fullText: 'За-за-за — на лугу стоит коза!',
    icon: '🐐',
    color: 'border-lime-300 bg-lime-50 text-lime-900'
  },
  {
    id: 'z2',
    soundKey: 'Z',
    soundLabel: 'Звук [З]',
    syllablePrefix: 'Зу-зу-зу',
    phrase: 'мы покормим ту козу',
    fullText: 'Зу-зу-зу — мы покормим ту козу!',
    icon: '🌿',
    color: 'border-green-300 bg-green-50 text-green-900'
  },

  // Звук [Ч]
  {
    id: 'ch1',
    soundKey: 'Ch',
    soundLabel: 'Звук [Ч]',
    syllablePrefix: 'Ча-ча-ча',
    phrase: 'горит яркая свеча',
    fullText: 'Ча-ча-ча — горит яркая свеча!',
    icon: '🕯️',
    color: 'border-amber-300 bg-amber-50 text-amber-900'
  },
  {
    id: 'ch2',
    soundKey: 'Ch',
    soundLabel: 'Звук [Ч]',
    syllablePrefix: 'Чу-чу-чу',
    phrase: 'я на ракете полечу',
    fullText: 'Чу-чу-чу — я на ракете полечу!',
    icon: '🚀',
    color: 'border-purple-300 bg-purple-50 text-purple-900'
  }
];

// 4. СЛОГОВЫЕ СЛОВА ("Прохлопай слово по слогам")
export const SYLLABLE_WORDS: SyllableItem[] = [
  // 1 слог
  { id: 'cat', word: 'КОТ', syllables: ['КОТ'], count: 1, icon: '🐱', hint: 'Один хлопок в ладоши: КОТ!' },
  { id: 'ball', word: 'МЯЧ', syllables: ['МЯЧ'], count: 1, icon: '⚽', hint: 'Короткое слово: МЯЧ!' },
  { id: 'house', word: 'ДОМ', syllables: ['ДОМ'], count: 1, icon: '🏠', hint: 'Один гласный звук: ДОМ!' },
  { id: 'cheese', word: 'СЫР', syllables: ['СЫР'], count: 1, icon: '🧀', hint: 'Один хлопок: СЫР!' },
  
  // 2 слога
  { id: 'mama', word: 'МАМА', syllables: ['МА', 'МА'], count: 2, icon: '👩‍👧', hint: 'Два хлопка: МА — МА!' },
  { id: 'fish', word: 'РЫБА', syllables: ['РЫ', 'БА'], count: 2, icon: '🐟', hint: 'Два слога: РЫ — БА!' },
  { id: 'fox', word: 'ЛИСА', syllables: ['ЛИ', 'СА'], count: 2, icon: '🦊', hint: 'Два хлопка: ЛИ — СА!' },
  { id: 'sun', word: 'ТУЧА', syllables: ['ТУ', 'ЧА'], count: 2, icon: '☁️', hint: 'Два слога: ТУ — ЧА!' },
  
  // 3 слога
  { id: 'car_big', word: 'МАШИНА', syllables: ['МА', 'ШИ', 'НА'], count: 3, icon: '🚗', hint: 'Три хлопка: МА — ШИ — НА!' },
  { id: 'dog_dog', word: 'СОБАКА', syllables: ['СО', 'БА', 'КА'], count: 3, icon: '🐕', hint: 'Три хлопка: СО — БА — КА!' },
  { id: 'apple', word: 'ЯБЛОКО', syllables: ['ЯБ', 'ЛО', 'КО'], count: 3, icon: '🍎', hint: 'Три слога: ЯБ — ЛО — КО!' },
  { id: 'drum', word: 'БАРАБАН', syllables: ['БА', 'РА', 'БАН'], count: 3, icon: '🥁', hint: 'Три удара в барабан: БА — РА — БАН!' },
  
  // 4 слога
  { id: 'turtle', word: 'ЧЕРЕПАХА', syllables: ['ЧЕ', 'РЕ', 'ПА', 'ХА'], count: 4, icon: '🐢', hint: 'Длинное слово: ЧЕ — РЕ — ПА — ХА!' },
  { id: 'plane_big', word: 'САМОЛЕТЫ', syllables: ['СА', 'МО', 'ЛЕ', 'ТЫ'], count: 4, icon: '✈️', hint: 'Четыре хлопка: СА — МО — ЛЕ — ТЫ!' }
];

// 5. "ЧЕТВЁРТЫЙ ЛИШНИЙ" (Развитие понятий, словарного запаса и логики речи)
export const ODD_ONE_OUT_ROUNDS: OddOneOutItem[] = [
  {
    id: 'odd1',
    question: 'Какой предмет здесь лишний?',
    categoryName: 'Фрукты и Овощи',
    items: [
      { id: 'apple', name: 'Яблоко', icon: '🍎', isOdd: false },
      { id: 'banana', name: 'Банан', icon: '🍌', isOdd: false },
      { id: 'cucumber', name: 'Огурец', icon: '🥒', isOdd: true },
      { id: 'pear', name: 'Груша', icon: '🍐', isOdd: false },
    ],
    explanation: 'Огурец — это овощ! А яблоко, банан и груша — это сладкие фрукты.'
  },
  {
    id: 'odd2',
    question: 'Кто здесь лишний?',
    categoryName: 'Домашние и дикие животные',
    items: [
      { id: 'cat', name: 'Кошка', icon: '🐱', isOdd: false },
      { id: 'dog', name: 'Собака', icon: '🐶', isOdd: false },
      { id: 'cow', name: 'Корова', icon: '🐮', isOdd: false },
      { id: 'lion', name: 'Лев', icon: '🦁', isOdd: true },
    ],
    explanation: 'Лев — это дикий хищник, он живёт в саванне! А кошка, собака и корова — домашние животные.'
  },
  {
    id: 'odd3',
    question: 'Что здесь не транспорт?',
    categoryName: 'Транспорт и мебель',
    items: [
      { id: 'bus', name: 'Автобус', icon: '🚌', isOdd: false },
      { id: 'chair', name: 'Стул', icon: '🪑', isOdd: true },
      { id: 'car', name: 'Машина', icon: '🚗', isOdd: false },
      { id: 'plane', name: 'Самолёт', icon: '✈️', isOdd: false },
    ],
    explanation: 'Стул — это мебель! А автобус, машина и самолёт — это транспорт для путешествий.'
  },
  {
    id: 'odd4',
    question: 'Что здесь не надевают на себя?',
    categoryName: 'Одежда и посуда',
    items: [
      { id: 'shirt', name: 'Футболка', icon: '👕', isOdd: false },
      { id: 'pants', name: 'Штаны', icon: '👖', isOdd: false },
      { id: 'cup', name: 'Кружка', icon: '☕', isOdd: true },
      { id: 'dress', name: 'Платье', icon: '👗', isOdd: false },
    ],
    explanation: 'Кружка — это посуда, из неё пьют чай! А футболка, штаны и платье — это одежда.'
  },
  {
    id: 'odd5',
    question: 'Кто здесь не умеет летать?',
    categoryName: 'Птицы и рыбы',
    items: [
      { id: 'sparrow', name: 'Воробей', icon: '🐦', isOdd: false },
      { id: 'fish', name: 'Рыбка', icon: '🐠', isOdd: true },
      { id: 'eagle', name: 'Орёл', icon: '🦅', isOdd: false },
      { id: 'pigeon', name: 'Голубь', icon: '🕊️', isOdd: false },
    ],
    explanation: 'Рыбка плавает в воде и не умеет летать! А воробей, орёл и голубь — крылатые птицы.'
  },
  {
    id: 'odd6',
    question: 'Что здесь не относится к обуви?',
    categoryName: 'Обувь и головные уборы',
    items: [
      { id: 'boots', name: 'Сапоги', icon: '👢', isOdd: false },
      { id: 'sneakers', name: 'Кроссовки', icon: '👟', isOdd: false },
      { id: 'cap', name: 'Кепка', icon: '🧢', isOdd: true },
      { id: 'sandals', name: 'Сандалии', icon: '👡', isOdd: false },
    ],
    explanation: 'Кепка — это головной убор, её надевают на голову! А сапожки, кроссовки и сандалии — это обувь для ножек.'
  }
];

// 6. "ЧТО СНАЧАЛА, ЧТО ПОТОМ?" (Связная речь по картинкам)
export const STORY_SEQUENCES: StorySequenceItem[] = [
  {
    id: 'flower',
    title: 'Как растёт цветок',
    description: 'Расставь карточки по порядку, чтобы цветок расцвёл!',
    cards: [
      { step: 1, text: 'Сажаем семечко в землю и поливаем', icon: '🌱', imageAlt: 'Посадка семечка' },
      { step: 2, text: 'Появляется зелёный росток с листиками', icon: '🌿', imageAlt: 'Зеленый росток' },
      { step: 3, text: 'Появляется бутончик цветка', icon: '🌷', imageAlt: 'Бутон цветка' },
      { step: 4, text: 'Цветок распустился и пахнет мёдом!', icon: '🌸', imageAlt: 'Красивый распустившийся цветок' },
    ],
    fullStoryNarrative: 'Сначала садовник посадил маленькое семечко в тёплую землю и полил водой. Вскоре из земли пробился тоненький зелёный стебелёк. На стебельке появился круглый бутон. Солнышко согрело его, и распустился чудесный ароматный цветок!'
  },
  {
    id: 'snowman',
    title: 'Как лепили снеговика',
    description: 'Что нужно сделать сначала, а что потом?',
    cards: [
      { step: 1, text: 'Выпал пушистый белый снег', icon: '❄️', imageAlt: 'Снегопад' },
      { step: 2, text: 'Катаем большой и средний снежные шары', icon: '⚪', imageAlt: 'Снежные комочки' },
      { step: 3, text: 'Ставим нос-морковку и ведро на голову', icon: '🥕', imageAlt: 'Украшение снеговика' },
      { step: 4, text: 'Готов весёлый снеговик с метлой!', icon: '⛄', imageAlt: 'Готовый снеговик' },
    ],
    fullStoryNarrative: 'Зимой пошёл мягкий белый снежок. Ребята выбежали во двор и накатали три круглых снежных кома. Поставили их друг на друга, вместо носа воткнули оранжевую морковку, а на голову надели ведро. Получился славный добрый снеговик!'
  },
  {
    id: 'morning',
    title: 'Доброе утро малыша',
    description: 'Вспомни, как начинается правильное утро!',
    cards: [
      { step: 1, text: 'Просыпаемся в кроватке с улыбкой', icon: '🛌', imageAlt: 'Пробуждение' },
      { step: 2, text: 'Умываемся и чистим зубки', icon: '🪥', imageAlt: 'Умывание' },
      { step: 3, text: 'Кушаем вкусную полезную кашку', icon: '🥣', imageAlt: 'Завтрак' },
      { step: 4, text: 'Идём играть с любимыми игрушками!', icon: '🧸', imageAlt: 'Игры' },
    ],
    fullStoryNarrative: 'Утром солнышко заглянуло в окошко, и малыш сладко потянулся в кроватке. Затем он пошёл в ванную, умылся прохладной водичкой и почистил зубки щёткой. На кухне мама приготовила вкусную кашу. Набравшись сил, малыш побежал играть!'
  }
];

// 7. СКОРОГОВОРКИ
export const TONGUE_TWISTERS: TongueTwisterItem[] = [
  {
    id: 'sasha',
    soundFocus: 'Звуки [С] и [Ш]',
    text: 'Шла Саша по шоссе и сосала сушку.',
    icon: '🥨',
    level: 'easy'
  },
  {
    id: 'greka',
    soundFocus: 'Звук [Р]',
    text: 'Ехал Грека через реку, видит Грека — в реке рак.',
    icon: '🦞',
    level: 'medium'
  },
  {
    id: 'topot',
    soundFocus: 'Звуки [Т] и [П]',
    text: 'От топота копыт пыль по полю летит.',
    icon: '🐎',
    level: 'easy'
  },
  {
    id: 'shipuchki',
    soundFocus: 'Звуки [Щ] и [Ч]',
    text: 'Два щенка щека к щеке щиплют щётку в уголке.',
    icon: '🐶',
    level: 'hard'
  },
  {
    id: 'grass',
    soundFocus: 'Звук [Р]',
    text: 'На дворе трава, на траве дрова, не руби дрова на траве двора.',
    icon: '🪵',
    level: 'hard'
  },
  {
    id: 'bee',
    soundFocus: 'Звук [Ж]',
    text: 'Жук упал и встать не может, ждёт он, кто ему поможет.',
    icon: '🪲',
    level: 'easy'
  }
];

// 8. СТИКЕРЫ-НАГРАДЫ (Альбом достижений)
export const REWARD_STICKERS = [
  { id: 'st_dragon', name: 'Дракоша Гоша', icon: '🐲', desc: 'Первый шаг к правильной речи!' },
  { id: 'st_mic', name: 'Золотой Голосок', icon: '🎤', desc: 'За чёткое и звонкое произношение' },
  { id: 'st_tongue', name: 'Шустрый Язычок', icon: '👅', desc: 'Мастер артикуляционной гимнастики' },
  { id: 'st_drum', name: 'Ритмичный Барабанщик', icon: '🥁', desc: 'Умеет делить слова на слоги' },
  { id: 'st_detective', name: 'Умный Сыщик', icon: '🔍', desc: 'Нашёл все лишние предметы' },
  { id: 'st_teller', name: 'Сказочник', icon: '📖', desc: 'Собрал истории по порядку' },
  { id: 'st_speed', name: 'Реактивный Говорун', icon: '🚀', desc: 'Быстро и без запинки говорит скороговорки' },
  { id: 'st_crown', name: 'Король Чистой Речи', icon: '👑', desc: 'Супер-чемпион всех речевых игр!' }
];
