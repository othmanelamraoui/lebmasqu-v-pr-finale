import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products, Product } from '../data/products';
import { recommendations, Recommendation } from '../data/recommendations';
import { Check, ChevronRight, RefreshCcw, Search } from 'lucide-react';

// --- Types ---

type Language = 'fr' | 'en' | 'ar';
type Gender = 'male' | 'female';

interface Question {
  id: number;
  text: { [key in Language]: string };
  options: {
    id: string;
    text: { [key in Language]: string };
    value: string; // Used for simple scoring logic
  }[];
}

// --- Data ---

const questions: Question[] = [
  {
    id: 1,
    text: {
      fr: "Quelle est votre saison préférée ?",
      en: "What is your favorite season?",
      ar: "ما هو فصلك المفضل؟"
    },
    options: [
      { id: 'summer', text: { fr: "L'été ensoleillé", en: "Sunny Summer", ar: "الصيف المشمس" }, value: 'fresh' },
      { id: 'winter', text: { fr: "L'hiver cocooning", en: "Cozy Winter", ar: "الشتاء الدافئ" }, value: 'oriental' },
      { id: 'spring', text: { fr: "Le printemps fleuri", en: "Blooming Spring", ar: "الربيع المزهر" }, value: 'floral' },
      { id: 'autumn', text: { fr: "L'automne boisé", en: "Woody Autumn", ar: "الخريف الخشبي" }, value: 'woody' },
    ]
  },
  {
    id: 2,
    text: {
      fr: "Quel endroit vous apaise le plus ?",
      en: "Which place soothes you the most?",
      ar: "أي مكان يريحك أكثر؟"
    },
    options: [
      { id: 'garden', text: { fr: "Un jardin fleuri", en: "A flower garden", ar: "حديقة مزهرة" }, value: 'floral' },
      { id: 'forest', text: { fr: "Une forêt dense", en: "A dense forest", ar: "غابة كثيفة" }, value: 'woody' },
      { id: 'sea', text: { fr: "Le bord de mer", en: "The seaside", ar: "شاطئ البحر" }, value: 'fresh' },
      { id: 'market', text: { fr: "Un marché aux épices", en: "A spice market", ar: "سوق التوابل" }, value: 'oriental' },
    ]
  },
  {
    id: 3,
    text: {
      fr: "Quelle matière préférez-vous porter ?",
      en: "Which fabric do you prefer to wear?",
      ar: "أي قماش تفضل ارتداءه؟"
    },
    options: [
      { id: 'cotton', text: { fr: "Coton frais", en: "Fresh Cotton", ar: "قطن ناعم" }, value: 'fresh' },
      { id: 'silk', text: { fr: "Soie élégante", en: "Elegant Silk", ar: "حرير أنيق" }, value: 'floral' },
      { id: 'velvet', text: { fr: "Velours riche", en: "Rich Velvet", ar: "مخمل فاخر" }, value: 'oriental' },
      { id: 'linen', text: { fr: "Lin naturel", en: "Natural Linen", ar: "كتان طبيعي" }, value: 'woody' },
    ]
  },
  {
    id: 4,
    text: {
      fr: "Quel type de saveurs préférez-vous ?",
      en: "What flavors do you prefer?",
      ar: "ما هي النكهات التي تفضلها؟"
    },
    options: [
      { id: 'fruit', text: { fr: "Fruits frais", en: "Fresh Fruits", ar: "فواكه طازجة" }, value: 'fresh' },
      { id: 'spice', text: { fr: "Épices chaudes", en: "Warm Spices", ar: "توابل دافئة" }, value: 'oriental' },
      { id: 'sweet', text: { fr: "Douceurs sucrées", en: "Sweet Treats", ar: "حلويات" }, value: 'floral' },
      { id: 'herbs', text: { fr: "Herbes aromatiques", en: "Aromatic Herbs", ar: "أعشاب عطرية" }, value: 'woody' },
    ]
  },
  {
    id: 5,
    text: {
      fr: "Comment décririez-vous votre style ?",
      en: "How would you describe your style?",
      ar: "كيف تصف أسلوبك؟"
    },
    options: [
      { id: 'casual', text: { fr: "Décontracté", en: "Casual", ar: "عفوي" }, value: 'fresh' },
      { id: 'chic', text: { fr: "Classique & Chic", en: "Classic & Chic", ar: "كلاسيكي وأنيق" }, value: 'floral' },
      { id: 'bold', text: { fr: "Audacieux", en: "Bold", ar: "جريء" }, value: 'oriental' },
      { id: 'minimal', text: { fr: "Minimaliste", en: "Minimalist", ar: "بسيط" }, value: 'woody' },
    ]
  },
  {
    id: 6,
    text: {
      fr: "Quelle ambiance recherchez-vous dans un parfum ?",
      en: "What vibe are you looking for in a perfume?",
      ar: "ما هو الجو الذي تبحث عنه في العطر؟"
    },
    options: [
      { id: 'clean', text: { fr: "Fraîcheur et propreté", en: "Freshness & Cleanliness", ar: "انتعاش ونظافة" }, value: 'fresh' },
      { id: 'warm', text: { fr: "Chaleur et confort", en: "Warmth & Comfort", ar: "دفء وراحة" }, value: 'oriental' },
      { id: 'deep', text: { fr: "Profondeur et caractère", en: "Depth & Character", ar: "عمق وشخصية" }, value: 'woody' },
      { id: 'soft', text: { fr: "Douceur et élégance", en: "Softness & Elegance", ar: "نظافة وأناقة" }, value: 'floral' },
    ]
  },
  {
    id: 7,
    text: {
      fr: "Quelle est votre note olfactive favorite ?",
      en: "What is your favorite olfactory note?",
      ar: "ما هي نوتتك العطرية المفضلة؟"
    },
    options: [
      { id: 'flowers', text: { fr: "Fleurs (Rose, Jasmin)", en: "Flowers (Rose, Jasmine)", ar: "زهور (ورد، ياسمين)" }, value: 'floral' },
      { id: 'woods', text: { fr: "Bois (Santal, Cèdre)", en: "Woods (Sandalwood, Cedar)", ar: "أخشاب (صندل، أرز)" }, value: 'woody' },
      { id: 'citrus', text: { fr: "Agrumes (Citron, Bergamote)", en: "Citrus (Lemon, Bergamot)", ar: "حمضيات (ليمون، برغموت)" }, value: 'fresh' },
      { id: 'amber', text: { fr: "Ambre & Musc", en: "Amber & Musk", ar: "عنبر ومسك" }, value: 'oriental' },
    ]
  },
  {
    id: 8,
    text: {
      fr: "À quel moment préférez-vous vous parfumer ?",
      en: "When do you prefer to wear perfume?",
      ar: "متى تفضل وضع العطر؟"
    },
    options: [
      { id: 'morning', text: { fr: "Le matin pour l'énergie", en: "Morning for energy", ar: "في الصباح للطاقة" }, value: 'fresh' },
      { id: 'evening', text: { fr: "Le soir pour l'élégance", en: "Evening for elegance", ar: "في المساء للأناقة" }, value: 'oriental' },
      { id: 'always', text: { fr: "Tout le temps", en: "All the time", ar: "طوال الوقت" }, value: 'floral' },
      { id: 'occasions', text: { fr: "Grandes occasions", en: "Special occasions", ar: "المناسبات الخاصة" }, value: 'woody' },
    ]
  },
  {
    id: 9,
    text: {
      fr: "Quelle intensité recherchez-vous ?",
      en: "What intensity are you looking for?",
      ar: "ما هي الكثافة التي تبحث عنها؟"
    },
    options: [
      { id: 'light', text: { fr: "Léger et discret", en: "Light & Discreet", ar: "خفيف وهادئ" }, value: 'fresh' },
      { id: 'moderate', text: { fr: "Modéré", en: "Moderate", ar: "متوسط" }, value: 'floral' },
      { id: 'intense', text: { fr: "Intense", en: "Intense", ar: "قوي" }, value: 'woody' },
      { id: 'powerful', text: { fr: "Sillage puissant", en: "Powerful Trail", ar: "فواح جداً" }, value: 'oriental' },
    ]
  },
  {
    id: 10,
    text: {
      fr: "Si vous étiez une couleur ?",
      en: "If you were a color?",
      ar: "لو كنت لوناً؟"
    },
    options: [
      { id: 'blue', text: { fr: "Bleu Océan", en: "Ocean Blue", ar: "أزرق المحيط" }, value: 'fresh' },
      { id: 'gold', text: { fr: "Or / Ambre", en: "Gold / Amber", ar: "ذهبي / عنبر" }, value: 'oriental' },
      { id: 'green', text: { fr: "Vert Nature", en: "Nature Green", ar: "أخضر الطبيعة" }, value: 'woody' },
      { id: 'pink', text: { fr: "Rose Poudré", en: "Powder Pink", ar: "وردي ناعم" }, value: 'floral' },
    ]
  },
];

const translations = {
  selectLanguage: {
    fr: "Choisissez votre langue",
    en: "Select your language",
    ar: "اختر لغتك"
  },
  selectGender: {
    fr: "Vous êtes ?",
    en: "You are?",
    ar: "أنت؟"
  },
  male: {
    fr: "Un Homme",
    en: "Male",
    ar: "رجل"
  },
  female: {
    fr: "Une Femme",
    en: "Female",
    ar: "امرأة"
  },
  next: {
    fr: "Suivant",
    en: "Next",
    ar: "التالي"
  },
  analyzing: {
    fr: "Analyse de votre profil...",
    en: "Analyzing your profile...",
    ar: "جاري تحليل ملفك..."
  },
  yourProfile: {
    fr: "Votre Profil Olfactif",
    en: "Your Olfactory Profile",
    ar: "ملفك العطري"
  },
  recommendations: {
    fr: "Nos Recommandations",
    en: "Our Recommendations",
    ar: "توصياتنا"
  },
  buy: {
    fr: "Voir le produit",
    en: "View Product",
    ar: "عرض المنتج"
  },
  restart: {
    fr: "Recommencer le quiz",
    en: "Restart Quiz",
    ar: "إعادة الاختبار"
  }
};

export default function QuizStartPage() {
  const [step, setStep] = useState<'lang' | 'gender' | 'quiz' | 'loading' | 'results'>('lang');
  const [language, setLanguage] = useState<Language>('fr');
  const [gender, setGender] = useState<Gender>('female');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultProfile, setResultProfile] = useState<string>('');
  const [resultDescription, setResultDescription] = useState<string>('');
  const [recommendedProducts, setRecommendedProducts] = useState<Recommendation[]>([]);

  // Handle Language Selection
  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setStep('gender');
  };

  // Handle Gender Selection
  const handleGenderSelect = (g: Gender) => {
    setGender(g);
    setStep('quiz');
  };

  // Handle Quiz Answer
  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('loading');
      calculateResults(newAnswers);
    }
  };

  // Calculate Results
  const calculateResults = (finalAnswers: string[]) => {
    // Simple logic: count occurrences of each value type
    const counts: { [key: string]: number } = { fresh: 0, floral: 0, oriental: 0, woody: 0 };
    
    finalAnswers.forEach(ans => {
      if (counts[ans] !== undefined) counts[ans]++;
    });

    // Find max
    let maxType = 'oriental';
    let maxCount = 0;
    for (const [type, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        maxType = type;
      }
    }

    // Map type to profile name
    const profileNames: { [key: string]: { [key in Language]: string } } = {
      fresh: { fr: "L'Esprit Frais & Dynamique", en: "The Fresh & Dynamic Spirit", ar: "الروح المنعشة والحيوية" },
      floral: { fr: "L'Âme Romantique & Élégante", en: "The Romantic & Elegant Soul", ar: "الروح الرومانسية والأنيقة" },
      oriental: { fr: "Le Caractère Mystérieux & Envoûtant", en: "The Mysterious & Captivating Character", ar: "الشخصية الغامضة والساحرة" },
      woody: { fr: "La Force Naturelle & Sophistiquée", en: "The Natural & Sophisticated Force", ar: "القوة الطبيعية والمتطورة" },
    };

    const profileDescriptions: { [key: string]: { [key in Language]: string } } = {
      fresh: { 
        fr: "Vous êtes attiré par la clarté, l'énergie et la simplicité. Votre parfum idéal est comme une bouffée d'air pur : vivifiant, pétillant et lumineux. Vous privilégiez les notes d'agrumes, les accords marins et les touches vertes qui évoquent la nature et la liberté.", 
        en: "You are drawn to clarity, energy, and simplicity. Your ideal perfume is like a breath of fresh air: invigorating, sparkling, and luminous. You favor citrus notes, marine accords, and green touches that evoke nature and freedom.", 
        ar: "تنجذب إلى الوضوح والطاقة والبساطة. عطرك المثالي يشبه نسمة من الهواء النقي: منعش ومتألق ومضيء. تفضل نوتات الحمضيات والاتفاقات البحرية واللمسات الخضراء التي تثير الطبيعة والحرية." 
      },
      floral: { 
        fr: "Sensible et raffiné(e), vous aimez la beauté intemporelle des fleurs. Votre sillage est une caresse, mêlant douceur et séduction subtile. Vous appréciez la rose, le jasmin ou la fleur d'oranger pour leur élégance naturelle et leur poésie.", 
        en: "Sensitive and refined, you love the timeless beauty of flowers. Your trail is a caress, mixing softness and subtle seduction. You appreciate rose, jasmine, or orange blossom for their natural elegance and poetry.", 
        ar: "حساس وراقي، تحب الجمال الخالد للزهور. أثر عطرك هو لمسة، تمزج بين النعومة والإغراء الخفي. تقدر الورد والياسمين أو زهر البرتقال لأناقتها الطبيعية وشعريتها." 
      },
      oriental: { 
        fr: "Vous possédez une personnalité magnétique et chaleureuse. Vous aimez les parfums qui racontent une histoire, riches en épices, en ambres et en résines précieuses. Votre signature est intense, enveloppante et laisse un souvenir inoubliable.", 
        en: "You possess a magnetic and warm personality. You love perfumes that tell a story, rich in spices, ambers, and precious resins. Your signature is intense, enveloping, and leaves an unforgettable memory.", 
        ar: "تمتلك شخصية مغناطيسية ودافئة. تحب العطور التي تروي قصة، غنية بالتوابل والعنبر والراتنجات الثمينة. توقيعك مكثف ومغلف ويترك ذكرى لا تنسى." 
      },
      woody: { 
        fr: "Ancré(e) et confiant(e), vous recherchez l'authenticité et la force tranquille. Les notes boisées comme le cèdre, le santal ou le vétiver vous correspondent parfaitement. Elles expriment une élégance structurée, intemporelle et rassurante.", 
        en: "Grounded and confident, you seek authenticity and quiet strength. Woody notes like cedar, sandalwood, or vetiver suit you perfectly. They express a structured, timeless, and reassuring elegance.", 
        ar: "راسخ وواثق، تبحث عن الأصالة والقوة الهادئة. النوتات الخشبية مثل الأرز والصندل أو نجيل الهند تناسبك تمامًا. إنها تعبر عن أناقة منظمة وخالدة ومطمئنة." 
      },
    };

    setResultProfile(profileNames[maxType][language]);
    setResultDescription(profileDescriptions[maxType][language]);

    // Filter recommendations based on gender strictly first
    const genderFiltered = recommendations.filter(p => p.gender === gender || p.gender === 'unisex');

    // Then filter by profile
    const profileMatches = genderFiltered.filter(p => p.profile === maxType);
    
    // If we need more to reach 10, take from other profiles but same gender
    const otherMatches = genderFiltered.filter(p => p.profile !== maxType);
    
    // Combine: profile matches first, then others
    let finalRecommendations = [...profileMatches, ...otherMatches];
    
    // Limit to 10
    setRecommendedProducts(finalRecommendations.slice(0, 10));

    setTimeout(() => {
      setStep('results');
    }, 2000);
  };

  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-white text-black pt-24 pb-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 min-h-[60vh] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: LANGUAGE */}
          {step === 'lang' && (
            <motion.div 
              key="lang"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full text-center"
            >
              <h1 className="text-3xl font-serif italic mb-12">{translations.selectLanguage[language]}</h1>
              <div className="flex flex-col gap-4 max-w-xs mx-auto">
                <button onClick={() => handleLanguageSelect('fr')} className="py-4 border border-black hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">Français</button>
                <button onClick={() => handleLanguageSelect('en')} className="py-4 border border-black hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">English</button>
                <button onClick={() => handleLanguageSelect('ar')} className="py-4 border border-black hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-sm font-bold font-serif">العربية</button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: GENDER */}
          {step === 'gender' && (
            <motion.div 
              key="gender"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full text-center"
            >
              <h1 className="text-3xl font-serif italic mb-12">{translations.selectGender[language]}</h1>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button onClick={() => handleGenderSelect('female')} className="w-full sm:w-48 py-6 border border-black hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                  {translations.female[language]}
                </button>
                <button onClick={() => handleGenderSelect('male')} className="w-full sm:w-48 py-6 border border-black hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                  {translations.male[language]}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: QUIZ */}
          {step === 'quiz' && (
            <motion.div 
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-xl"
            >
              <div className="mb-8 flex justify-between items-end border-b border-gray-200 pb-4">
                <span className="text-xs font-bold tracking-widest text-gray-400">QUESTION {currentQuestionIndex + 1} / {questions.length}</span>
                <span className="text-xs font-bold tracking-widest text-black">{(currentQuestionIndex / questions.length * 100).toFixed(0)}%</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-serif mb-10 leading-relaxed">
                {questions[currentQuestionIndex].text[language]}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.value)}
                    className="text-left p-5 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300 flex items-center justify-between group"
                  >
                    <span className="text-sm tracking-wide group-hover:font-medium">{option.text[language]}</span>
                    <ChevronRight className={`w-4 h-4 text-gray-300 group-hover:text-black ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: LOADING */}
          {step === 'loading' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-8"></div>
              <h2 className="text-xl font-serif italic">{translations.analyzing[language]}</h2>
            </motion.div>
          )}

          {/* STEP 5: RESULTS */}
          {step === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="text-center mb-16">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-4 block">{translations.yourProfile[language]}</span>
                <h1 className="text-3xl md:text-5xl font-serif italic mb-6">{resultProfile}</h1>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 px-4">
                  {resultDescription}
                </p>
                <div className="w-24 h-[1px] bg-black mx-auto"></div>
              </div>

              <div className="mb-12">
                <h3 className="text-center text-xl font-bold uppercase tracking-widest mb-8">{translations.recommendations[language]}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className="flex flex-col group">
                      <div className="relative aspect-[3/4] bg-[#F9F9F9] mb-4 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        {!product.siteProductId && (
                          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 text-[10px] uppercase tracking-widest font-bold">
                            Référence
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-1">{product.brand}</h4>
                      <h5 className="text-xs font-medium uppercase tracking-widest mb-2 text-gray-600">{product.name}</h5>
                      <p className="text-xs text-gray-500 mb-4">{product.notes.join(', ')}</p>
                      
                      {product.siteProductId ? (
                        <Link to={`/parfums/${product.siteProductId}`} className="mt-auto w-full">
                          <button className="w-full py-3 border border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                            {translations.buy[language]}
                          </button>
                        </Link>
                      ) : (
                        <a 
                          href={`https://www.google.com/search?q=parfum+${product.brand}+${product.name}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-auto w-full"
                        >
                          <button className="w-full py-3 border border-gray-300 text-xs font-bold uppercase tracking-widest text-gray-400 hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2">
                            <Search className="w-3 h-3" />
                            Découvrir
                          </button>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-16">
                <button 
                  onClick={() => {
                    setStep('lang');
                    setCurrentQuestionIndex(0);
                    setAnswers([]);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  {translations.restart[language]}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      {step !== 'quiz' && <Footer />}
    </div>
  );
}
