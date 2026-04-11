'use client';

import React, { useState } from 'react';
import { ShieldAlert, BookOpen, AlertTriangle, MessageSquareWarning, Fingerprint, Video, Filter, Search } from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import LandingView from '@/components/views/LandingView';
import AnalyzerView from '@/components/views/AnalyzerView';
import SwipeGameView from '@/components/views/SwipeGameView';
import LessonsView from '@/components/views/LessonsView';

import DocumentationView from '@/components/views/DocumentationView';

const TOPICS = [
  { id: 'ai-jobs', title: 'Inteligența Artificială ne fură joburile', icon: Fingerprint, description: 'Analizează un text despre impactul AI asupra pieței muncii.' },
  { id: 'crypto', title: 'Bani rapizi și siguri din Crypto', icon: MessageSquareWarning, description: 'Descoperă cum sunt promovate schemele de îmbogățire rapidă.' },
  { id: 'diets', title: 'Secretul din spatele dietelor minune', icon: AlertTriangle, description: 'Învață să recunoști manipularea în industria de wellness.' },
  { id: 'climate', title: 'Adevărul ascuns despre încălzirea globală', icon: ShieldAlert, description: 'Analizează discursul negaționist și teoriile conspirației.' },
  { id: 'tiktok', title: 'Cine controlează algoritmul TikTok?', icon: Video, description: 'Vezi cum este folosită frica legată de rețelele sociale.' },
  { id: 'economy', title: 'Dezastrul iminent al economiei globale', icon: Filter, description: 'Recunoaște panica indusă artificial despre prăbușiri financiare.' }
];

const LESSONS = [
  {
    id: 1,
    level: "Nivelul 1",
    title: "Anatomia Limbajului Polarizant",
    icon: AlertTriangle,
    content: (
      <>
        <p>Limbajul polarizant este principala armă a dezinformării moderne. Scopul său nu este să informeze, ci să împartă lumea în două tabere ireconciliabile: &quot;Noi&quot; (cei buni, victimele) și &quot;Ei&quot; (cei răi, asupritorii).</p>
        <h3>Cum funcționează?</h3>
        <ul>
          <li><strong>Declanșarea fricii și furiei:</strong> Emoțiile negative puternice scurtcircuitează cortexul prefrontal (partea creierului responsabilă cu gândirea logică). Când ești furios, ești mult mai predispus să dai &quot;Share&quot; fără să verifici sursa.</li>
          <li><strong>Adjective extreme:</strong> Cuvinte precum &quot;catastrofal&quot;, &quot;apocaliptic&quot;, &quot;trădare&quot;, &quot;șocant&quot; sunt folosite pentru a hiperboliza evenimente banale.</li>
          <li><strong>Sintaxa Clickbait:</strong> Titluri care ascund informația esențială (&quot;Nu o să-ți vină să crezi ce a făcut...&quot;) pentru a exploata curiozitatea naturală a creierului (curiosity gap).</li>
        </ul>
        <h3>Exemplu practic</h3>
        <p><em>Neutru:</em> &quot;Guvernul a propus o nouă taxă de 1% pentru companiile mari.&quot;</p>
        <p><em>Polarizant:</em> &quot;JAF LA DRUMUL MARE! Guvernul ne FURĂ ultimii bani pentru a hrăni corporațiile străine! Ieșiți în stradă!&quot;</p>
      </>
    ),
    quiz: [
      {
        question: "Care este scopul principal al limbajului polarizant?",
        options: [
          "Să ofere informații tehnice precise",
          "Să împartă publicul în tabere conflictuale prin emoții",
          "Să educe cetățenii despre economie",
          "Să promoveze dialogul constructiv"
        ],
        correctAnswer: 1,
        explanation: "Limbajul polarizant folosește dihotomia &apos;Noi vs Ei&apos; pentru a genera conflict și a bloca gândirea critică.",
        remediation: "Recitește secțiunea despre 'Noi vs Ei' și modul în care emoțiile sunt folosite ca armă."
      },
      {
        question: "Ce parte a creierului este &apos;scurtcircuitată&apos; de furie?",
        options: [
          "Cerebelul",
          "Trunchiul cerebral",
          "Cortexul prefrontal (logica)",
          "Bulbul rahidian"
        ],
        correctAnswer: 2,
        explanation: "Emoțiile intense precum furia reduc activitatea în cortexul prefrontal, zona responsabilă pentru analiza logică și decizii raționale.",
        remediation: "Amintește-ți că logica locuiește în cortexul prefrontal, care 'îngheață' sub asaltul furiei."
      },
      {
        question: "Care dintre următoarele este un exemplu de 'Sintaxă Clickbait'?",
        options: [
          "Raportul anual privind inflația a fost publicat.",
          "Nu o să-ți vină să crezi ce a descoperit acest cercetător!",
          "Prețul grâului a crescut cu 2% în ultima lună.",
          "Ministerul Sănătății recomandă vaccinarea anuală."
        ],
        correctAnswer: 1,
        explanation: "Clickbait-ul folosește 'curiosity gap' pentru a forța utilizatorul să dea click, ascunzând informația esențială.",
        remediation: "Caută titlurile care promit 'senzații' fără a spune clar despre ce este vorba."
      }
    ]
  },
  {
    id: 2,
    level: "Nivelul 2",
    title: "Fabricarea Consensului & Ferma de Troli",
    icon: MessageSquareWarning,
    content: (
      <>
        <p>Creierul uman este programat evolutiv să urmeze mulțimea (social proof). Dacă vedem că 10.000 de oameni susțin o idee, subconștientul nostru tinde să o valideze, chiar dacă ideea este falsă.</p>
        <h3>Tehnici de manipulare a consensului</h3>
        <ul>
          <li><strong>Astroturfing:</strong> Crearea iluziei unei mișcări &quot;de la firul ierbii&quot;. O campanie finanțată de un grup de interese folosește mii de conturi false pentru a face să pară că cetățenii obișnuiți protestează spontan.</li>
          <li><strong>Fermele de Troli și Boți:</strong> Rețele automatizate care dau like, share și comentează la comandă pentru a păcăli algoritmii de viralitate.</li>
          <li><strong>Efectul de Bandwagon:</strong> Oamenii reali încep să adopte opinia falsă doar pentru că pare a fi opinia majorității.</li>
        </ul>
      </>
    ),
    quiz: [
      {
        question: "Ce înseamnă &apos;Astroturfing&apos;?",
        options: [
          "O metodă de plantare a gazonului artificial",
          "O campanie de dezinformare care mimează o mișcare populară spontană",
          "O tehnică de editare video avansată",
          "Un algoritm de securitate cibernetică"
        ],
        correctAnswer: 1,
        explanation: "Astroturfing-ul este o formă de propagandă care maschează sponsorii unei campanii pentru a o face să pară o mișcare civică autentică.",
        remediation: "Gândește-te la 'gazon artificial' (AstroTurf) ca la o mișcare populară 'falsă'."
      },
      {
        question: "Care este rolul principal al unei 'Ferme de Troli'?",
        options: [
          "Să producă alimente bio pentru angajații IT",
          "Să creeze iluzia unui consens larg prin mii de comentarii și like-uri false",
          "Să testeze securitatea serverelor guvernamentale",
          "Să ofere suport tehnic utilizatorilor de rețele sociale"
        ],
        correctAnswer: 1,
        explanation: "Fermele de troli manipulează algoritmii și percepția publică prin volum, nu prin argumente.",
        remediation: "Amintește-ți că trolii lucrează în grupuri mari pentru a 'inunda' spațiul digital."
      },
      {
        question: "Ce este 'Social Proof' (Dovada Socială)?",
        options: [
          "Un document oficial eliberat de primărie",
          "Tendința oamenilor de a copia acțiunile celorlalți în situații ambigue",
          "O aplicație de verificare a identității pe Facebook",
          "O metodă de a demonstra că ești popular la școală"
        ],
        correctAnswer: 1,
        explanation: "Social proof este motivul pentru care boții sunt atât de eficienți: dacă mulți par să creadă ceva, tindem să credem și noi.",
        remediation: "Revedeți începutul lecției despre cum creierul urmează mulțimea."
      }
    ]
  },
  {
    id: 3,
    level: "Nivelul 3",
    title: "Amprenta AI: Perplexitate și Burstiness",
    icon: Fingerprint,
    content: (
      <>
        <p>Odată cu apariția modelelor de limbaj (LLM), generarea de Fake News a devenit gratuită și instantanee. Totuși, textele generate de AI au o &quot;amprentă&quot; matematică detectabilă.</p>
        <h3>Cei doi indicatori principali</h3>
        <ul>
          <li><strong>Perplexitatea (Perplexity):</strong> Măsoară cât de &quot;previzibil&quot; este un text. AI-ul alege adesea cel mai probabil următor cuvânt, rezultând într-o perplexitate scăzută.</li>
          <li><strong>Varianța (Burstiness):</strong> Se referă la variația lungimii și structurii propozițiilor. AI-ul tinde să scrie propoziții de lungimi similare, în timp ce oamenii alternează propoziții scurte cu cele lungi.</li>
        </ul>
      </>
    ),
    quiz: [
      {
        question: "Ce indică o &apos;Burstiness&apos; (varianță) scăzută într-un text?",
        options: [
          "Că autorul este foarte creativ",
          "Că textul a fost scris sub presiune",
          "Că propozițiile au lungimi foarte similare, sugerând un model AI",
          "Că textul conține multe greșeli gramaticale"
        ],
        correctAnswer: 2,
        explanation: "Modelele AI tind să genereze propoziții cu o structură și lungime uniformă, spre deosebire de ritmul variat al scriiturii umane.",
        remediation: "Gândește-te la 'burst' ca la o explozie de varietate; AI-ul este prea 'plat'."
      },
      {
        question: "Dacă un text are o 'Perplexitate' scăzută, înseamnă că:",
        options: [
          "Este foarte greu de înțeles",
          "Este foarte previzibil din punct de vedere statistic",
          "Conține multe metafore complexe",
          "A fost scris de un poet celebru"
        ],
        correctAnswer: 1,
        explanation: "AI-ul alege cuvintele cele mai probabile, făcând textul foarte previzibil pentru algoritmii de detecție.",
        remediation: "Amintește-ți: perplexitate scăzută = previzibilitate ridicată."
      },
      {
        question: "De ce este generarea de Fake News prin AI o problemă majoră?",
        options: [
          "Pentru că AI-ul face greșeli de ortografie",
          "Pentru că permite producția dezinformării la scară industrială, cu costuri zero",
          "Pentru că AI-ul refuză să scrie despre politică",
          "Pentru că textele AI sunt prea lungi"
        ],
        correctAnswer: 1,
        explanation: "Viteza și costul scăzut permit inundarea internetului cu minciuni perfect formulate gramatical.",
        remediation: "Recitește introducerea lecției despre impactul LLM-urilor."
      }
    ]
  },
  {
    id: 4,
    level: "Nivelul 4",
    title: "Deepfakes și Manipularea Vizuală",
    icon: Video,
    content: (
      <>
        <p>Dacă o imagine face cât o mie de cuvinte, un video fals face cât un milion de minciuni. Tehnologia Deepfake folosește rețele neuronale pentru a înlocui fața sau vocea unei persoane.</p>
        <h3>Tipuri de manipulare vizuală</h3>
        <ul>
          <li><strong>Deepfakes Audio-Video:</strong> Generarea unui discurs complet fals, clonând vocea și mișcările buzelor.</li>
          <li><strong>Cheapfakes:</strong> Manipulări simple, cum ar fi încetinirea unui video pentru a schimba percepția asupra stării unei persoane.</li>
          <li><strong>Imagini generate de AI:</strong> Crearea de imagini fotorealiste cu evenimente care nu au avut loc niciodată.</li>
        </ul>
      </>
    ),
    quiz: [
      {
        question: "Care este diferența dintre un Deepfake și un Cheapfake?",
        options: [
          "Deepfake-ul este mai ieftin de produs",
          "Cheapfake-ul folosește editări simple (viteză, tăieturi), în timp ce Deepfake-ul folosește AI",
          "Nu există nicio diferență",
          "Deepfake-ul se referă doar la text"
        ],
        correctAnswer: 1,
        explanation: "Cheapfakes sunt manipulări rudimentare care nu necesită inteligență artificială, dar pot fi la fel de eficiente în dezinformare.",
        remediation: "Reține că 'Cheap' vine de la simplitatea tehnică, nu neapărat de la cost."
      },
      {
        question: "Ce tehnologie stă la baza creării Deepfakes?",
        options: [
          "Photoshop clasic",
          "Rețele neuronale (Inteligență Artificială)",
          "Animarea prin stop-motion",
          "Desenul de mână"
        ],
        correctAnswer: 1,
        explanation: "Deepfakes folosesc algoritmi de 'deep learning' pentru a învăța trăsăturile unei persoane și a le replica.",
        remediation: "Cuvântul 'Deep' din Deepfake provine de la Deep Learning."
      },
      {
        question: "Cum poți detecta adesea un Deepfake video imperfect?",
        options: [
          "Persoana nu clipește natural sau marginile feței sunt încețoșate",
          "Video-ul este alb-negru",
          "Nu există sunet",
          "Persoana poartă mereu ochelari de soare"
        ],
        correctAnswer: 0,
        explanation: "Incoerențele vizuale, cum ar fi clipitul neregulat sau artefactele din jurul gurii, sunt semne comune.",
        remediation: "Fii atent la detaliile fine ale mișcărilor feței."
      }
    ]
  },
  {
    id: 5,
    level: "Nivelul 5",
    title: "Algoritmii și Bula de Ecou",
    icon: Filter,
    content: (
      <>
        <p>Platformele de social media sunt optimizate pentru <strong>Engagement</strong>. Algoritmii au descoperit că furia și indignarea țin oamenii lipiți de ecrane.</p>
        <h3>Cum se formează Bula de Ecou?</h3>
        <ul>
          <li><strong>Biasul de Confirmare:</strong> Algoritmul îți servește doar informații care îți confirmă credințele deja existente.</li>
          <li><strong>Izolarea Informațională:</strong> Treptat, algoritmul ascunde complet opiniile contrare.</li>
          <li><strong>Radicalizarea:</strong> Pentru a te menține interesat, algoritmul oferă conținut din ce în ce mai extrem.</li>
        </ul>
      </>
    ),
    quiz: [
      {
        question: "De ce algoritmii rețelelor sociale favorizează adesea conținutul negativ?",
        options: [
          "Pentru că vor să educe publicul",
          "Pentru că emoțiile negative generează mai mult &apos;engagement&apos; (timp petrecut pe platformă)",
          "Din greșeală tehnică",
          "Pentru a promova pacea globală"
        ],
        correctAnswer: 1,
        explanation: "Furia și indignarea sunt emoții care provoacă reacții rapide (like, share, comentariu), ceea ce este profitabil pentru platforme.",
        remediation: "Amintește-ți că scopul platformei este să te țină online cât mai mult timp."
      },
      {
        question: "Ce este 'Biasul de Confirmare'?",
        options: [
          "O eroare de programare a algoritmului",
          "Tendința de a căuta și accepta doar informații care ne dau dreptate",
          "O metodă de a șterge conturile false",
          "Un tip de reclamă personalizată"
        ],
        correctAnswer: 1,
        explanation: "Creierul nostru preferă să aibă dreptate decât să afle adevărul, iar algoritmii exploatează acest lucru.",
        remediation: "Gândește-te la bias ca la o 'lentilă' care filtrează realitatea."
      },
      {
        question: "Cum poți 'sparge' o Bulă de Ecou?",
        options: [
          "Ștergând aplicația de Facebook",
          "Urmărind intenționat surse de știri cu perspective diferite de ale tale",
          "Dând block tuturor celor care te contrazic",
          "Postând doar poze cu pisici"
        ],
        correctAnswer: 1,
        explanation: "Diversificarea surselor forțează algoritmul să îți arate și alte puncte de vedere.",
        remediation: "Ieșirea din zona de confort informațional este cheia."
      }
    ]
  },
  {
    id: 6,
    level: "Nivelul 6",
    title: "Igiena Informațională: Citirea Laterală",
    icon: Search,
    content: (
      <>
        <p>Cea mai mare greșeală este să &quot;citim vertical&quot; (să evaluăm un site doar după aspectul său). Site-urile de Fake News au adesea design-uri premium.</p>
        <h3>Regula de Aur: Citirea Laterală</h3>
        <ul>
          <li><strong>Pasul 1: Părăsește site-ul.</strong> Nu încerca să îți dai seama dacă e adevărat doar citind articolul.</li>
          <li><strong>Pasul 2: Caută sursa.</strong> Caută pe Google ce spun <em>alții</em> despre acea sursă.</li>
          <li><strong>Pasul 3: Verifică afirmația.</strong> Vezi dacă agențiile de presă majore au raportat același lucru.</li>
        </ul>
      </>
    ),
    quiz: [
      {
        question: "Ce presupune tehnica &apos;Citirii Laterale&apos;?",
        options: [
          "Să citești textul de la dreapta la stânga",
          "Să verifici informația deschizând tab-uri noi pentru a cerceta sursa și afirmația în alte locuri",
          "Să citești doar titlurile articolelor",
          "Să ignori complet textul și să te uiți doar la poze"
        ],
        correctAnswer: 1,
        explanation: "Citirea laterală este metoda prin care verifici credibilitatea unei surse căutând informații externe despre ea, in loc să te bazezi pe ce spune site-ul despre sine.",
        remediation: "Imaginează-ți că deschizi tab-uri în 'lateral' pentru a verifica sursa."
      },
      {
        question: "De ce design-ul profesional al unui site nu este o dovadă de credibilitate?",
        options: [
          "Pentru că design-ul este subiectiv",
          "Pentru că oricine poate cumpăra un template premium pentru a părea oficial",
          "Pentru că site-urile serioase arată mereu demodat",
          "Pentru că culorile frumoase distrag atenția"
        ],
        correctAnswer: 1,
        explanation: "Aspectul vizual este ușor de falsificat; conținutul și reputația sursei sunt cele care contează.",
        remediation: "Nu te lăsa păcălit de 'ambalaj'."
      },
      {
        question: "Care este primul pas recomandat când întâlnești o știre șocantă?",
        options: [
          "Să o distribui imediat prietenilor",
          "Să părăsești site-ul și să verifici informația din alte surse",
          "Să scrii un comentariu furios",
          "Să crezi tot ce scrie dacă are poze"
        ],
        correctAnswer: 1,
        explanation: "Pauza și verificarea externă sunt cele mai bune apărări împotriva manipulării.",
        remediation: "Amintește-ți regula: 'Stop, Gândește, Verifică'."
      }
    ]
  }
];

type AppState = 'landing' | 'analyzer' | 'swipegame' | 'lessons' | 'documentation';

export default function CtrlAltTruth() {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#e7edeb] font-sans selection:bg-[#7c1f31]/20">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <main className="max-w-6xl mx-auto px-6">
        {currentView === 'landing' && (
          <LandingView onNavigate={setCurrentView} />
        )}

        {currentView === 'analyzer' && (
          <div className="py-12 md:py-20">
            <AnalyzerView topics={TOPICS} />
          </div>
        )}

        {currentView === 'swipegame' && (
          <div className="py-12 md:py-20">
            <SwipeGameView />
          </div>
        )}

        {currentView === 'lessons' && (
          <LessonsView 
            lessons={LESSONS} 
            activeLesson={activeLesson} 
            setActiveLesson={setActiveLesson} 
          />
        )}
        {currentView === 'documentation' && (
          <DocumentationView />
        )}
      </main>
    </div>
  );
}
