import { supabase } from '@/lib/supabase';
import { LESSONS, TOPICS } from '@/lib/data';
// For mapping string names to icons if needed, we might have to map them in the UI. 
// Or we can return the local data directly for now if DB fails.

// The local Swipe Game data was hardcoded in SwipeGameView, but we can have it fallback here.
import { AlertTriangle, Fingerprint, MessageSquareWarning, Video, Filter, Search, ShieldAlert, BookOpen } from 'lucide-react';

const HEADLINES_FALLBACK = [
  { id: 1, text: "DEZASTRU TOTAL: Guvernul a decis să interzică complet mașinile pe benzină de mâine!", isFake: true, explanation: "Hiperbolă ('DEZASTRU TOTAL') și informație falsă (interzicerea nu se întâmplă 'de mâine')." },
  { id: 2, text: "Banca Națională a menținut dobânda cheie la 7% pentru al treilea trimestru consecutiv.", isFake: false, explanation: "Limbaj neutru, factual, raportând o decizie economică standard." },
  { id: 3, text: "ȘOCANT! Ce au găsit medicii în corpul acestui bărbat te va lăsa fără cuvinte. Click aici!", isFake: true, explanation: "Sintaxă clasică de clickbait ('ȘOCANT!', 'te va lăsa fără cuvinte') pentru a genera curiozitate artificială." },
  { id: 4, text: "Ministerul Educației anunță modificări ale calendarului examenelor de Bacalaureat pentru anul viitor.", isFake: false, explanation: "Informație clară, lipsită de încărcătură emoțională, citând o instituție oficială." },
  { id: 5, text: "Oculta mondială lovește din nou: Cum ne otrăvesc intenționat apa de la robinet!", isFake: true, explanation: "Teorie a conspirației ('Oculta mondială') și apel la frică ('ne otrăvesc intenționat')." },
  { id: 6, text: "Un nou studiu publicat în revista Nature arată o creștere a temperaturilor medii globale.", isFake: false, explanation: "Raportare obiectivă a unui studiu științific dintr-o sursă recunoscută." },
  { id: 7, text: "Nu o să-ți vină să crezi ce a spus acest politician în direct la TV! A distrus complet opoziția!", isFake: true, explanation: "Limbaj senzaționalist ('Nu o să-ți vină să crezi', 'A distrus complet') menit să polarizeze." },
  { id: 8, text: "Echipa națională de fotbal a obținut o remiză, 1-1, în meciul de calificare de aseară.", isFake: false, explanation: "Prezentare simplă și directă a unui rezultat sportiv." },
  { id: 9, text: "TRĂDARE NAȚIONALĂ! Ne-au vândut țara străinilor pentru doi bani! Ieșiți în stradă ACUM!", isFake: true, explanation: "Apel direct la acțiune ('Ieșiți în stradă ACUM!') bazat pe furie și acuzații extreme ('TRĂDARE NAȚIONALĂ')." },
  { id: 10, text: "Compania locală de transport public anunță introducerea a 20 de noi autobuze electrice.", isFake: false, explanation: "Știre locală utilitară, fără elemente de manipulare emoțională." },
  { id: 11, text: "Cercetătorii au descoperit că lămâia vindecă cancerul în 24 de ore, dar marile companii farmaceutice ascund adevărul!", isFake: true, explanation: "Promisiuni de vindecări miraculoase și teorii ale conspirației împotriva 'Big Pharma'." },
  { id: 12, text: "Organizația Mondială a Sănătății a publicat un nou ghid privind consumul de zahăr la copii.", isFake: false, explanation: "Știre de sănătate publică, citând o organizație internațională recunoscută." },
  { id: 13, text: "BREAKING: NASA a confirmat că un asteroid uriaș va lovi Pământul săptămâna viitoare. Autoritățile păstrează tăcerea!", isFake: true, explanation: "Apel la panică ('BREAKING', 'asteroid uriaș') și acuzații de mușamalizare." },
  { id: 14, text: "Sonda spațială Voyager 1 a reluat trimiterea datelor științifice către Pământ după o pauză de câteva luni.", isFake: false, explanation: "Informație tehnică despre o misiune spațială reală, raportată neutru." },
  { id: 15, text: "O celebră actriță de la Hollywood a fost arestată în secret pentru participarea la ritualuri oculte!", isFake: true, explanation: "Zvonuri nefondate despre celebrități și elemente de senzaționalism ocult." },
  { id: 16, text: "Festivalul Internațional de Film de la Cannes și-a anunțat selecția oficială pentru ediția din acest an.", isFake: false, explanation: "Știre culturală standard despre un eveniment internațional major." },
  { id: 17, text: "Banii cash vor fi interziși complet în România de la 1 iulie! Totul va fi controlat digital!", isFake: true, explanation: "Dezinformare economică menită să genereze panică și rezistență față de digitalizare." },
  { id: 18, text: "Parlamentul a adoptat o nouă lege care simplifică procedurile de înmatriculare a vehiculelor.", isFake: false, explanation: "Raportare administrativă despre o schimbare legislativă concretă." },
  { id: 19, text: "Experiment secret în Munții Bucegi: S-a deschis o poartă energetică spre o altă dimensiune!", isFake: true, explanation: "Pseudostiință și mituri locale folosite pentru a genera trafic pe site-uri obscure." },
  { id: 20, text: "O echipă de arheologi a descoperit vestigii dacice inedite în timpul lucrărilor la noua autostradă.", isFake: false, explanation: "Știre arheologică legată de proiecte de infrastructură reale." }
];

const iconMap: Record<string, any> = {
  AlertTriangle,
  MessageSquareWarning,
  Fingerprint,
  Video,
  Filter,
  Search,
  ShieldAlert
};

export async function getLessons() {
  try {
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('*')
      .order('id');

    if (error) throw error;
    
    if (!lessons || lessons.length === 0) {
      return LESSONS;
    }

    return lessons;
  } catch (error) {
    console.error('Error fetching lessons from Supabase, falling back to local data.', error);
    return LESSONS;
  }
}

export async function getLessonBySlug(slug: string) {
  try {
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !lesson) throw error || new Error('Not found in DB');

    return lesson;
  } catch (error) {
    console.error(`Error fetching lesson ${slug} from Supabase, falling back to local data.`, error);
    const localLesson = LESSONS.find(l => l.slug === slug);
    return localLesson || null;
  }
}

export async function getSwipeCards() {
  try {
    const { data: cards, error } = await supabase
      .from('swipe_cards')
      .select('*')
      .order('id');

    if (error) throw error;

    if (!cards || cards.length === 0) {
      return HEADLINES_FALLBACK;
    }

    // Adapt database snake_case "is_fake" to camelCase "isFake" expected by components
    return cards.map(card => ({
      id: card.id,
      text: card.text,
      isFake: card.is_fake,
      explanation: card.explanation
    }));

  } catch (error) {
    console.error('Error fetching swipe cards from Supabase, falling back to local data.', error);
    return HEADLINES_FALLBACK;
  }
}

export async function getTopics() {
  try {
    const { data: topics, error } = await supabase
      .from('topics')
      .select('*');

    if (error) throw error;

    if (!topics || topics.length === 0) {
      return TOPICS;
    }

    return topics;
  } catch (error) {
    console.error('Error fetching topics from Supabase, falling back to local data.', error);
    return TOPICS;
  }
}
