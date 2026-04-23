// Licensed under the GNU AGPL-3.0-only.
import React from 'react';
import { ShieldAlert, AlertTriangle, MessageSquareWarning, Fingerprint, Video, Filter, Search } from 'lucide-react';

export const TOPICS = [
  { id: 'ai-jobs', title: 'Inteligența Artificială ne fură joburile', icon_name: 'Fingerprint', description: 'Analizează un text despre impactul AI asupra pieței muncii.' },
  { id: 'crypto', title: 'Bani rapizi și siguri din Crypto', icon_name: 'MessageSquareWarning', description: 'Descoperă cum sunt promovate schemele de îmbogățire rapidă.' },
  { id: 'diets', title: 'Secretul din spatele dietelor minune', icon_name: 'AlertTriangle', description: 'Învață să recunoști manipularea în industria de wellness.' },
  { id: 'climate', title: 'Adevărul ascuns despre încălzirea globală', icon_name: 'ShieldAlert', description: 'Analizează discursul negaționist și teoriile conspirației.' },
  { id: 'tiktok', title: 'Cine controlează algoritmul TikTok?', icon_name: 'Video', description: 'Vezi cum este folosită frica legată de rețelele sociale.' },
  { id: 'economy', title: 'Dezastrul iminent al economiei globale', icon_name: 'Filter', description: 'Recunoaște panica indusă artificial despre prăbușiri financiare.' }
];

export const LESSONS = [
  {
    id: 1,
    slug: 'anatomia-limbajului-polarizant',
    level: "Nivelul 1",
    title: "Anatomia Limbajului Polarizant",
    icon_name: 'AlertTriangle',
    content: (
      <>
        <p>Limbajul polarizant este principala armă a dezinformării moderne. Scopul său nu este să informeze, ci să împartă lumea în două tabere ireconciliabile: &quot;Noi&quot; (cei buni, victimele) și &quot;Ei&quot; (cei răi, asupritorii).</p>

        <h3>Economia Indignării (Outrage Economy)</h3>
        <p>În mediul digital, atenția ta este moneda de schimb. Platformele și creatorii de conținut au descoperit că <strong>furia</strong> este cea mai &quot;lipicioasă&quot; emoție. Un titlu care te revoltă are șanse mult mai mari să fie distribuit decât unul echilibrat. Această &quot;economie a indignării&quot; prioritizează viralitatea în detrimentul adevărului.</p>

        <h3>Mecanismul Biologic: Deturnarea Amigdalei</h3>
        <p>Când simțim furie sau frică intensă, creierul nostru intră în modul &quot;luptă sau fugi&quot;. Amigdala preia controlul, iar <strong>cortexul prefrontal</strong> (centrul logicii și al analizei) este temporar dezactivat. Manipulatorii profită de această fereastră biologică pentru a insera idei false fără a fi filtrate de rațiune.</p>

        <h3>Sintaxa Manipulării</h3>
        <ul>
          <li><strong>Generalizări excesive:</strong> &quot;Toți [grupul X] sunt [epitet negativ].&quot; - elimină nuanțele și complexitatea realității.</li>
          <li><strong>Limbaj apocaliptic:</strong> &quot;Dezastru total&quot;, &quot;Sfârșitul democrației&quot;, &quot;Ultima șansă&quot; - creează un sentiment de urgență falsă.</li>
          <li><strong>Curiosity Gap (Clickbait):</strong> &quot;Nu o să-ți vină să crezi ce s-a întâmplat!&quot; - forțează un click prin exploatarea curiozității naturale, adesea livrând o informație banală.</li>
        </ul>

        <div className="bg-[#7c1f31]/5 dark:bg-[#7c1f31]/10 p-4 rounded-xl border-l-4 border-[#7c1f31] my-4">
          <p className="text-sm italic"><strong>Exemplu de contrast:</strong></p>
          <p className="text-sm"><em>Neutru:</em> &quot;Guvernul a propus o nouă taxă de 1% pentru companiile mari.&quot;</p>
          <p className="text-sm"><em>Polarizant:</em> &quot;JAF LA DRUMUL MARE! Guvernul ne FURĂ ultimii bani pentru a hrăni corporațiile străine! Ieșiți în stradă până nu e prea târziu!&quot;</p>
        </div>
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
    slug: 'fabricarea-consensului-ferma-de-troli',
    level: "Nivelul 2",
    title: "Fabricarea Consensului & Ferma de Troli",
    icon_name: 'MessageSquareWarning',
    content: (
      <>
        <p>Creierul uman este programat evolutiv să urmeze mulțimea (<strong>Social Proof</strong>). Într-o situație ambiguă, ne uităm la ce fac ceilalți pentru a decide cum să reacționăm. Manipulatorii digitali &quot;hackuiesc&quot; acest instinct prin tehnologii de automatizare.</p>
        <h3>Tehnici de manipulare a consensului</h3>
        <ul>
          <li>
            <strong>Astroturfing:</strong> Numele vine de la &quot;AstroTurf&quot; (gazon artificial). Este o campanie care mimează o mișcare civică spontană (&quot;grassroots&quot;), dar este de fapt orchestrată centralizat de grupuri de interese sau guverne.
          </li>
          <li>
            <strong>Fermele de Troli:</strong> Organizații unde angajați reali gestionează sute de identități false. Aceștia nu sunt doar roboți; ei poartă discuții, provoacă certuri și creează iluzia că o anumită opinie este majoritară prin volumul imens de comentarii.
          </li>
          <li>
            <strong>Efectul de Bandwagon:</strong> Oamenii reali încep să adopte opinia falsă doar pentru că pare a fi opinia majorității. Nimeni nu vrea să fie singurul care gândește diferit într-un spațiu digital care pare unanim.
          </li>
        </ul>

        <h3>Cum detectăm consensul fals?</h3>
        <p>Fii atent la <strong>unison</strong>. Dacă mii de oameni folosesc exact aceleași cuvinte, în același interval de timp, fără nicio variație personală sau greșeli de dactilografiere diferite, probabil privești o operațiune de influențare coordonată. De asemenea, verifică profilurile: au poze de stoc? Au fost create toate în aceeași lună?</p>
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
        explanation: "Astroturfing-ul este una dintre multele forme de propagandă care maschează sponsorii unei campanii pentru a o face să pară o mișcare civică autentică.",
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
    slug: 'amprenta-ai-perplexitate-burstiness',
    level: "Nivelul 3",
    title: "Amprenta AI: Perplexitate și Burstiness",
    icon_name: 'Fingerprint',
    content: (
      <>
        <p>Modelele de limbaj (LLM) pot genera texte perfecte gramatical, dar ele nu &quot;înțeleg&quot; realitatea; ele doar prezic următorul cuvânt. Această natură statistică lasă urme matematice specifice.</p>

        <h3>Cei doi piloni ai detecției</h3>
        <ul>
          <li>
            <strong>Perplexitatea (Perplexity):</strong> Măsoară cât de surprins este un model de un text. AI-ul tinde să aleagă cuvintele cele mai probabile statistic. Un text cu perplexitate scăzută este &quot;prea previzibil&quot; pentru a fi uman.
          </li>
          <li>
            <strong>Varianța (Burstiness):</strong> Oamenii scriu în &quot;explozii&quot;. Avem propoziții scurte, urmate de una foarte lungă și complexă, apoi poate un fragment. AI-ul tinde spre o lungime medie constantă, rezultând într-un ritm monoton, &quot;plat&quot;.
          </li>
        </ul>

        <h3>Problema Halucinațiilor</h3>
        <p>Deoarece AI-ul este un motor de probabilități, el poate genera fapte false cu o încredere totală. Aceasta se numește <strong>halucinație</strong>. Un text AI poate cita studii care nu există sau evenimente istorice inventate, păstrând un ton academic și autoritar.</p>

        <p className="text-sm bg-white/50 dark:bg-white/5 p-3 rounded-lg border border-[#7c1f31]/10 dark:border-white/10">
          <strong>Sfat:</strong> Dacă un text pare &quot;prea perfect&quot; și lipsit de orice eroare sau variație stilistică, trece-l prin filtrul de burstiness.
        </p>
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
    slug: 'deepfakes-manipularea-vizuala',
    level: "Nivelul 4",
    title: "Deepfakes și Manipularea Vizuală",
    icon_name: 'Video',
    content: (
      <>
        <p>Tehnologia a ajuns în punctul în care &quot;a vedea nu mai înseamnă a crede&quot;. Manipularea vizuală variază de la editări grosolane până la simulări digitale perfecte.</p>

        <h3>Spectrul Falsificării</h3>
        <ul>
          <li>
            <strong>Deepfakes:</strong> Folosesc rețele neuronale (GANs) pentru a mapa trăsăturile unei persoane pe corpul alteia sau pentru a clona vocea. Sunt greu de realizat perfect, dar tehnologia avansează rapid.
          </li>
          <li>
            <strong>Cheapfakes (sau Shallowfakes):</strong> Manipulări care nu folosesc AI, ci doar unelte de editare clasice.
            <br /><span className="text-sm opacity-70">Exemplu: Încetinirea unui video cu un politician pentru a-l face să pară sub influența alcoolului sau confuz.</span>
          </li>
          <li>
            <strong>Recontextualizarea:</strong> Folosirea unei imagini reale, dar cu o descriere falsă. O poză de la un protest din 2012 este prezentată ca fiind de ieri, dintr-o altă țară.
          </li>
        </ul>

        <h3>Semne de întrebare (Red Flags)</h3>
        <p>La deepfakes, caută erori în zonele complexe: reflexiile din ochi, modul în care părul atinge fața, clipitul neregulat sau umbrele care nu se potrivesc cu sursa de lumină.</p>
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
    slug: 'algoritmii-bula-de-ecou',
    level: "Nivelul 5",
    title: "Algoritmii și Bula de Ecou",
    icon_name: 'Filter',
    content: (
      <>
        <p>Algoritmii rețelelor sociale nu sunt arbitri ai adevărului; ei sunt agenți de vânzări ai atenției tale. Scopul lor unic este <strong>Watch Time</strong> (timpul petrecut pe platformă).</p>

        <h3>Anatomia Bulei de Ecou</h3>
        <ul>
          <li>
            <strong>Filtrarea Algoritmică:</strong> Algoritmul învață ce îți place și îți oferă mai mult din același lucru. Dacă dai click pe o teorie a conspirației, feed-ul tău va fi inundat de conținut similar.
          </li>
          <li>
            <strong>Biasul de Confirmare:</strong> Creierul nostru caută validare, nu provocare. Ne simțim bine când citim ceva care ne dă dreptate și ignorăm sau atacăm informațiile care ne contrazic.
          </li>
          <li>
            <strong>Rabbit Holes (Găurile de Iepure):</strong> Algoritmii tind să recomande conținut din ce în ce mai extrem pentru a menține nivelul de dopamină ridicat. Astfel, un utilizator poate trece de la &quot;rețete sănătoase&quot; la &quot;teorii radicale despre nutriție&quot; în doar câteva click-uri.
          </li>
        </ul>

        <p>Rezultatul? Trăim în realități paralele, unde fiecare tabără are propriul set de &quot;fapte&quot; și nicio punte de comunicare cu ceilalți.</p>
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
          "Tendința de a căura și accepta doar informații care ne dau dreptate",
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
    slug: 'igiena-informationala-citirea-laterala',
    level: "Nivelul 6",
    title: "Igiena Informațională: Citirea Laterală",
    icon_name: 'Search',
    content: (
      <>
        <p>În era dezinformării, nu mai este suficient să citești un articol. Trebuie să devii un detectiv al informației folosind tehnici de verificare rapidă.</p>

        <h3>Metoda SIFT (Stop, Investigate, Find, Trace)</h3>
        <ol className="space-y-4 my-4">
          <li>
            <strong>STOP:</strong> Când simți o emoție puternică (furia, surpriza), oprește-te. Nu distribui. Emoția este un semn că ești ținta unei manipulări.
          </li>
          <li>
            <strong>Investighează sursa:</strong> Nu te uita la design-ul site-ului. Caută pe Wikipedia sau pe Google ce spun alții despre această publicație. Cine o finanțează?
          </li>
          <li>
            <strong>Găsește o acoperire mai bună:</strong> Caută subiectul pe un motor de căutare. Dacă o știre &quot;bombă&quot; apare doar pe un site obscur și nu pe agențiile de presă majore (Reuters, AP, BBC), este probabil falsă.
          </li>
          <li>
            <strong>Urmează citatele la sursă:</strong> De unde provine imaginea sau citatul? Folosește <strong>Reverse Image Search</strong> pentru a vedea contextul original al unei fotografii.
          </li>
        </ol>

        <h3>Citirea Laterală</h3>
        <p>În loc să parcurgi pagina de sus în jos (citire verticală), deschide tab-uri noi în lateral. Verifică reputația autorului și a site-ului înainte de a acorda credit conținutului.</p>
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
