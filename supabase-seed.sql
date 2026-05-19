-- supabase-seed.sql
-- Run this script in the Supabase SQL Editor to populate the database tables with the default mock content.

-- 1. Insert Topics
INSERT INTO topics (id, title, icon_name, description) VALUES
('ai-jobs', 'Inteligența Artificială ne fură joburile', 'Fingerprint', 'Analizează un text despre impactul AI asupra pieței muncii.'),
('crypto', 'Bani rapizi și siguri din Crypto', 'MessageSquareWarning', 'Descoperă cum sunt promovate schemele de îmbogățire rapidă.'),
('diets', 'Secretul din spatele dietelor minune', 'AlertTriangle', 'Învață să recunoști manipularea în industria de wellness.'),
('climate', 'Adevărul ascuns despre încălzirea globală', 'ShieldAlert', 'Analizează discursul negaționist și teoriile conspirației.'),
('tiktok', 'Cine controlează algoritmul TikTok?', 'Video', 'Vezi cum este folosită frica legată de rețelele sociale.'),
('economy', 'Dezastrul iminent al economiei globale', 'Filter', 'Recunoaște panica indusă artificial despre prăbușiri financiare.')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Swipe Cards
INSERT INTO swipe_cards (text, is_fake, explanation) VALUES
($$DEZASTRU TOTAL: Guvernul a decis să interzică complet mașinile pe benzină de mâine!$$, true, $$Hiperbolă ('DEZASTRU TOTAL') și informație falsă (interzicerea nu se întâmplă 'de mâine').$$),
($$Banca Națională a menținut dobânda cheie la 7% pentru al treilea trimestru consecutiv.$$, false, $$Limbaj neutru, factual, raportând o decizie economică standard.$$),
($$ȘOCANT! Ce au găsit medicii în corpul acestui bărbat te va lăsa fără cuvinte. Click aici!$$, true, $$Sintaxă clasică de clickbait ('ȘOCANT!', 'te va lăsa fără cuvinte') pentru a genera curiozitate artificială.$$),
($$Ministerul Educației anunță modificări ale calendarului examenelor de Bacalaureat pentru anul viitor.$$, false, $$Informație clară, lipsită de încărcătură emoțională, citând o instituție oficială.$$),
($$Oculta mondială lovește din nou: Cum ne otrăvesc intenționat apa de la robinet!$$, true, $$Teorie a conspirației ('Oculta mondială') și apel la frică ('ne otrăvesc intenționat').$$),
($$Un nou studiu publicat în revista Nature arată o creștere a temperaturilor medii globale.$$, false, $$Raportare obiectivă a unui studiu științific dintr-o sursă recunoscută.$$),
($$Nu o să-ți vină să crezi ce a spus acest politician în direct la TV! A distrus complet opoziția!$$, true, $$Limbaj senzaționalist ('Nu o să-ți vină să crezi', 'A distrus complet') menit să polarizeze.$$),
($$Echipa națională de fotbal a obținut o remiză, 1-1, în meciul de calificare de aseară.$$, false, $$Prezentare simplă și directă a unui rezultat sportiv.$$),
($$TRĂDARE NAȚIONALĂ! Ne-au vândut țara străinilor pentru doi bani! Ieșiți în stradă ACUM!$$, true, $$Apel direct la acțiune ('Ieșiți în stradă ACUM!') bazat pe furie și acuzații extreme ('TRĂDARE NAȚIONALĂ').$$),
($$Compania locală de transport public anunță introducerea a 20 de noi autobuze electrice.$$, false, $$Știre locală utilitară, fără elemente de manipulare emoțională.$$),
($$Cercetătorii au descoperit că lămâia vindecă cancerul în 24 de ore, dar marile companii farmaceutice ascund adevărul!$$, true, $$Promisiuni de vindecări miraculoase și teorii ale conspirației împotriva 'Big Pharma'.$$),
($$Organizația Mondială a Sănătății a publicat un nou ghid privind consumul de zahăr la copii.$$, false, $$Știre de sănătate publică, citând o organizație internațională recunoscută.$$),
($$BREAKING: NASA a confirmat că un asteroid uriaș va lovi Pământul săptămâna viitoare. Autoritățile păstrează tăcerea!$$, true, $$Apel la panică ('BREAKING', 'asteroid uriaș') și acuzații de mușamalizare.$$),
($$Sonda spațială Voyager 1 a reluat trimiterea datelor științifice către Pământ după o pauză de câteva luni.$$, false, $$Informație tehnică despre o misiune spațială reală, raportată neutru.$$),
($$O celebră actriță de la Hollywood a fost arestată în secret pentru participarea la ritualuri oculte!$$, true, $$Zvonuri nefondate despre celebrități și elemente de senzaționalism ocult.$$),
($$Festivalul Internațional de Film de la Cannes și-a anunțat selecția oficială pentru ediția din acest an.$$, false, $$Știre culturală standard despre un eveniment internațional major.$$),
($$Banii cash vor fi interziși complet în România de la 1 iulie! Totul va fi controlat digital!$$, true, $$Dezinformare economică menită să genereze panică și rezistență față de digitalizare.$$),
($$Parlamentul a adoptat o nouă lege care simplifică procedurile de înmatriculare a vehiculelor.$$, false, $$Raportare administrativă despre o schimbare legislativă concretă.$$),
($$Experiment secret în Munții Bucegi: S-a deschis o poartă energetică spre o altă dimensiune!$$, true, $$Pseudostiință și mituri locale folosite pentru a genera trafic pe site-uri obscure.$$),
($$O echipă de arheologi a descoperit vestigii dacice inedite în timpul lucrărilor la noua autostradă.$$, false, $$Știre arheologică legată de proiecte de infrastructură reale.$$);

-- 3. Insert Lessons
INSERT INTO lessons (slug, level, title, icon_name, content, quiz) VALUES
(
  'anatomia-limbajului-polarizant',
  'Nivelul 1',
  'Anatomia Limbajului Polarizant',
  'AlertTriangle',
  $$<p>Limbajul polarizant este principala armă a dezinformării moderne. Scopul său nu este să informeze, ci să împartă lumea în două tabere ireconciliabile: &quot;Noi&quot; (cei buni, victimele) și &quot;Ei&quot; (cei răi, asupritorii).</p><h3>Economia Indignării (Outrage Economy)</h3><p>În mediul digital, atenția ta este moneda de schimb. Platformele și creatorii de conținut au descoperit că <strong>furia</strong> este cea mai &quot;lipicioasă&quot; emoție. Un titlu care te revoltă are șanse mult mai mari să fie distribuit decât unul echilibrat. Această &quot;economie a indignării&quot; prioritizează viralitatea în detrimentul adevărului.</p><h3>Mecanismul Biologic: Deturnarea Amigdalei</h3><p>Când simțim furie sau frică intensă, creierul nostru intră în modul &quot;luptă sau fugi&quot;. Amigdala preia controlul, iar <strong>cortexul prefrontal</strong> (centrul logicii și al analizei) este temporar dezactivat. Manipulatorii profită de această fereastră biologică pentru a insera idei false fără a fi filtrate de rațiune.</p><h3>Sintaxa Manipulării</h3><ul><li><strong>Generalizări excesive:</strong> &quot;Toți [grupul X] sunt [epitet negativ].&quot; - elimină nuanțele și complexitatea realității.</li><li><strong>Limbaj apocaliptic:</strong> &quot;Dezastru total&quot;, &quot;Sfârșitul democrației&quot;, &quot;Ultima șansă&quot; - creează un sentiment de urgență falsă.</li><li><strong>Curiosity Gap (Clickbait):</strong> &quot;Nu o să-ți vină să crezi ce s-a întâmplat!&quot; - forțează un click prin exploatarea curiozității naturale, adesea livrând o informație banală.</li></ul><div class="bg-[#7c1f31]/5 dark:bg-[#7c1f31]/10 p-4 rounded-xl border-l-4 border-[#7c1f31] my-4"><p class="text-sm italic"><strong>Exemplu de contrast:</strong></p><p class="text-sm"><em>Neutru:</em> &quot;Guvernul a propus o nouă taxă de 1% pentru companiile mari.&quot;</p><p class="text-sm"><em>Polarizant:</em> &quot;JAF LA DRUMUL MARE! Guvernul ne FURĂ ultimii bani pentru a hrăni corporațiile străine! Ieșiți în stradă până nu e prea târziu!&quot;</p></div>$$,
  $$[{"question": "Care este scopul principal al limbajului polarizant?", "options": ["Să ofere informații tehnice precise", "Să împartă publicul în tabere conflictuale prin emoții", "Să educe cetățenii despre economie", "Să promoveze dialogul constructiv"], "correctAnswer": 1, "explanation": "Limbajul polarizant folosește dihotomia 'Noi vs Ei' pentru a genera conflict și a bloca gândirea critică.", "remediation": "Recitește secțiunea despre 'Noi vs Ei' și modul în care emoțiile sunt folosite ca armă."}, {"question": "Ce parte a creierului este 'scurtcircuitată' de furie?", "options": ["Cerebelul", "Trunchiul cerebral", "Cortexul prefrontal (logica)", "Bulbul rahidian"], "correctAnswer": 2, "explanation": "Emoțiile intense precum furia reduc activitatea în cortexul prefrontal, zona responsabilă pentru analiza logică și decizii raționale.", "remediation": "Amintește-ți că logica locuiește în cortexul prefrontal, care 'îngheață' sub asaltul furiei."}, {"question": "Care dintre următoarele este un exemplu de 'Sintaxă Clickbait'?", "options": ["Raportul anual privind inflația a fost publicat.", "Nu o să-ți vină să crezi ce a descoperit acest cercetător!", "Prețul grâului a crescut cu 2% în ultima lună.", "Ministerul Sănătății recomandă vaccinarea anuală."], "correctAnswer": 1, "explanation": "Clickbait-ul folosește 'curiosity gap' pentru a forța utilizatorul să dea click, ascunzând informația esențială.", "remediation": "Caută titlurile care promit 'senzații' fără a spune clar despre ce este vorba."}]$$::jsonb
),
(
  'fabricarea-consensului-ferma-de-troli',
  'Nivelul 2',
  'Fabricarea Consensului & Ferma de Troli',
  'MessageSquareWarning',
  $$<p>Creierul uman este programat evolutiv să urmeze mulțimea (<strong>Social Proof</strong>). Într-o situație ambiguă, ne uităm la ce fac ceilalți pentru a decide cum să reacționăm. Manipulatorii digitali &quot;hackuiesc&quot; acest instinct prin tehnologii de automatizare.</p><h3>Tehnici de manipulare a consensului</h3><ul><li><strong>Astroturfing:</strong> Numele vine de la &quot;AstroTurf&quot; (gazon artificial). Este o campanie care mimează o mișcare civică spontană (&quot;grassroots&quot;), dar este de fapt orchestrată centralizat de grupuri de interese sau guverne.</li><li><strong>Fermele de Troli:</strong> Organizații unde angajați reali gestionează sute de identități false. Aceștia nu sunt doar roboți; ei poartă discuții, provoacă certuri și creează iluzia că o anumită opinie este majoritară prin volumul imens de comentarii.</li><li><strong>Efectul de Bandwagon:</strong> Oamenii reali încep să adopte opinia falsă doar pentru că pare a fi opinia majorității. Nimeni nu vrea să fie singurul care gândește diferit într-un spațiu digital care pare unanim.</li></ul><h3>Cum detectăm consensul fals?</h3><p>Fii atent la <strong>unison</strong>. Dacă mii de oameni folosesc exact aceleași cuvinte, în același interval de timp, fără nicio variație personală sau greșeli de dactilografiere diferite, probabil privești o operațiune de influențare coordonată. De asemenea, verifică profilurile: au poze de stoc? Au fost create toate în aceeași lună?</p>$$,
  $$[{"question": "Ce înseamnă 'Astroturfing'?", "options": ["O metodă de plantare a gazonului artificial", "O campanie de dezinformare care mimează o mișcare populară spontană", "O tehnică de editare video avansată", "Un algoritm de securitate cibernetică"], "correctAnswer": 1, "explanation": "Astroturfing-ul este una dintre multele forme de propagandă care maschează sponsorii unei campanii pentru a o face să pară o mișcare civică autentică.", "remediation": "Gândește-te la 'gazon artificial' (AstroTurf) ca la o mișcare populară 'falsă'."}, {"question": "Care este rolul principal al unei 'Ferme de Troli'?", "options": ["Să producă alimente bio pentru angajații IT", "Să creeze iluzia unui consens larg prin mii de comentarii și like-uri false", "Să testeze securitatea serverelor guvernamentale", "Să ofere suport tehnic utilizatorilor de rețele sociale"], "correctAnswer": 1, "explanation": "Fermele de troli manipulează algoritmii și percepția publică prin volum, nu prin argumente.", "remediation": "Amintește-ți că trolii lucrează în grupuri mari pentru a 'inunda' spațiul digital."}, {"question": "Ce este 'Social Proof' (Dovada Socială)?", "options": ["Un document oficial eliberat de primărie", "Tendința oamenilor de a copia acțiunile celorlalți în situații ambigue", "O aplicație de verificare a identității pe Facebook", "O metodă de a demonstra că ești popular la școală"], "correctAnswer": 1, "explanation": "Social proof este motivul pentru care boții sunt atât de eficienți: dacă mulți par să creadă ceva, tindem să credem și noi.", "remediation": "Revedeți începutul lecției despre cum creierul urmează mulțimea."}]$$::jsonb
),
(
  'amprenta-ai-perplexitate-burstiness',
  'Nivelul 3',
  'Amprenta AI: Perplexitate și Burstiness',
  'Fingerprint',
  $$<p>Modelele de limbaj (LLM) pot genera texte perfecte gramatical, dar ele nu &quot;înțeleg&quot; realitatea; ele doar prezic următorul cuvânt. Această natură statistică lasă urme matematice specifice.</p><h3>Cei doi piloni ai detecției</h3><ul><li><strong>Perplexitatea (Perplexity):</strong> Măsoară cât de surprins este un model de un text. AI-ul tinde să aleagă cuvintele cele mai probabile statistic. Un text cu perplexitate scăzută este &quot;prea previzibil&quot; pentru a fi uman.</li><li><strong>Varianța (Burstiness):</strong> Oamenii scriu în &quot;explozii&quot;. Avem propoziții scurte, urmate de una foarte lungă și complexă, apoi poate un fragment. AI-ul tinde spre o lungime medie constantă, rezultând într-un ritm monoton, &quot;plat&quot;.</li></ul><h3>Problema Halucinațiilor</h3><p>Deoarece AI-ul este un motor de probabilități, el poate genera fapte false cu o încredere totală. Aceasta se numește <strong>halucinație</strong>. Un text AI poate cita studii care nu există sau evenimente istorice inventate, păstrând un ton academic și autoritar.</p><p class="text-sm bg-white/50 dark:bg-white/5 p-3 rounded-lg border border-[#7c1f31]/10 dark:border-white/10"><strong>Sfat:</strong> Dacă un text pare &quot;prea perfect&quot; și lipsit de orice eroare sau variație stilistică, trece-l prin filtrul de burstiness.</p>$$,
  $$[{"question": "Ce indică o 'Burstiness' (varianță) scăzută într-un text?", "options": ["Că autorul este foarte creativ", "Că textul a fost scris sub presiune", "Că propozițiile au lungimi foarte similare, sugerând un model AI", "Că textul conține multe greșeli gramaticale"], "correctAnswer": 2, "explanation": "Modelele AI tind să genereze propoziții cu o structură și lungime uniformă, spre deosebire de ritmul variat al scriiturii umane.", "remediation": "Gândește-te la 'burst' ca la o explozie de varietate; AI-ul este prea 'plat'."}, {"question": "Dacă un text are o 'Perplexitate' scăzută, înseamnă că:", "options": ["Este foarte greu de înțeles", "Este foarte previzibil din punct de vedere statistic", "Conține multe metafore complexe", "A fost scris de un poet celebru"], "correctAnswer": 1, "explanation": "AI-ul alege cuvintele cele mai probabile, făcând textul foarte previzibil pentru алгоритmii de detecție.", "remediation": "Amintește-ți: perplexitate scăzută = previzibilitate ridicată."}, {"question": "De ce este generarea de Fake News prin AI o problemă majoră?", "options": ["Pentru că AI-ul face greșeli de ortografie", "Pentru că permite producția dezinformării la scară industrială, cu costuri zero", "Pentru că AI-ul refuză să scrie despre politică", "Pentru că textele AI sunt prea lungi"], "correctAnswer": 1, "explanation": "Viteza și costul scăzut permit inundarea internetului cu minciuni perfect formulate gramatical.", "remediation": "Recitește introducerea lecției despre impactul LLM-urilor."}]$$::jsonb
),
(
  'deepfakes-manipularea-vizuala',
  'Nivelul 4',
  'Deepfakes și Manipularea Vizuală',
  'Video',
  $$<p>Tehnologia a ajuns în punctul în care &quot;a vedea nu mai înseamnă a crede&quot;. Manipularea vizuală variază de la editări grosolane până la simulări digitale perfecte.</p><h3>Spectrul Falsificării</h3><ul><li><strong>Deepfakes:</strong> Folosesc rețele neuronale (GANs) pentru a mapa trăsăturile unei persoane pe corpul alteia sau pentru a clona vocea. Sunt greu de realizat perfect, dar tehnologia avansează rapid.</li><li><strong>Cheapfakes (sau Shallowfakes):</strong> Manipulări care nu folosesc AI, ci doar unelte de editare clasice.<br/><span class="text-sm opacity-70">Exemplu: Încetinirea unui video cu un politician pentru a-l face să pară sub influența alcoolului sau confuz.</span></li><li><strong>Recontextualizarea:</strong> Folosirea unei imagini reale, dar cu o descriere falsă. O poză de la un protest din 2012 este prezentată ca fiind de ieri, dintr-o altă țară.</li></ul><h3>Semne de întrebare (Red Flags)</h3><p>La deepfakes, caută erori în zonele complexe: reflexiile din ochi, modul în care părul atinge fața, clipitul neregulat sau umbrele care nu se potrivesc cu sursa de lumină.</p>$$,
  $$[{"question": "Care este diferența dintre un Deepfake și un Cheapfake?", "options": ["Deepfake-ul este mai ieftin de produs", "Cheapfake-ul folosește editări simple (viteză, tăieturi), în timp ce Deepfake-ul folosește AI", "Nu există nicio diferență", "Deepfake-ul se referă doar la text"], "correctAnswer": 1, "explanation": "Cheapfakes sunt manipulări rudimentare care nu necesită inteligență artificială, dar pot fi la fel de eficiente în dezinformare.", "remediation": "Reține că 'Cheap' vine de la simplitatea tehnică, nu neapărat de la cost."}, {"question": "Ce tehnologie stă la baza creării Deepfakes?", "options": ["Photoshop clasic", "Rețele neuronale (Inteligență Artificială)", "Animarea prin stop-motion", "Desenul de mână"], "correctAnswer": 1, "explanation": "Deepfakes folosesc algoritmi de 'deep learning' pentru a învăța trăsăturile unei persoane și a le replica.", "remediation": "Cuvântul 'Deep' din Deepfake provine de la Deep Learning."}, {"question": "Cum poți detecta adesea un Deepfake video imperfect?", "options": ["Persoana nu clipește natural sau marginile feței sunt încețoșate", "Video-ul este alb-negru", "Nu există sunet", "Persoana poartă mereu ochelari de soare"], "correctAnswer": 0, "explanation": "Incoerențele vizuale, cum ar fi clipitul neregulat sau artefactele din jurul gurii, sunt semne comune.", "remediation": "Fii atent la detaliile fine ale mișcărilor feței."}]$$::jsonb
),
(
  'algoritmii-bula-de-ecou',
  'Nivelul 5',
  'Algoritmii și Bula de Ecou',
  'Filter',
  $$<p>Algoritmii rețelelor sociale nu sunt arbitri ai adevărului; ei sunt agenți de vânzări ai atenției tale. Scopul lor unic este <strong>Watch Time</strong> (timpul petrecut pe platformă).</p><h3>Anatomia Bulei de Ecou</h3><ul><li><strong>Filtrarea Algoritmică:</strong> Algoritmul învață ce îți place și îți oferă mai mult din același lucru. Dacă dai click pe o teorie a conspirației, feed-ul tău va fi inundat de conținut similar.</li><li><strong>Biasul de Confirmare:</strong> Creierul nostru caută validare, nu provocare. Ne simțim bine când citim ceva care ne dă dreptate și ignorăm sau atacăm informațiile care ne contrazic.</li><li><strong>Rabbit Holes (Găurile de Iepure):</strong> Algoritmii tind să recomande conținut din ce în ce mai extrem pentru a menține nivelul de dopamină ridicat. Astfel, un utilizator poate trece de la &quot;rețete sănătoase&quot; la &quot;teorii radicale despre nutriție&quot; în doar câteva click-uri.</li></ul><p>Rezultatul? Trăim în realități paralele, unde fiecare tabără are propriul set de &quot;fapte&quot; și nicio punte de comunicare cu ceilalți.</p>$$,
  $$[{"question": "De ce algoritmii rețelelor sociale favorizează adesea conținutul negativ?", "options": ["Pentru că vor să educe publicul", "Pentru că emoțiile negative generează mai mult 'engagement' (timp petrecut pe platformă)", "Din greșeală tehnică", "Pentru a promova pacea globală"], "correctAnswer": 1, "explanation": "Furia și indignarea sunt emoții care provoacă reacții rapide (like, share, comentariu), ceea ce este profitabil pentru platforme.", "remediation": "Amintește-ți că scopul platformei este să te țină online cât mai mult timp."}, {"question": "Ce este 'Biasul de Confirmare'?", "options": ["O eroare de programare a algoritmului", "Tendința de a căura și accepta doar informații care ne dau dreptate", "O metodă de a șterge conturile false", "Un tip de reclamă personalizată"], "correctAnswer": 1, "explanation": "Creierul nostru preferă să aibă dreptate decât să afle adevărul, iar algoritmii exploatează acest lucru.", "remediation": "Gândește-te la bias ca la o 'lentilă' care filtrează realitatea."}, {"question": "Cum poți 'sparge' o Bulă de Ecou?", "options": ["Ștergând aplicația de Facebook", "Urmărind intenționat surse de știri cu perspective diferite de ale tale", "Dând block tuturor celor care te contrazic", "Postând doar poze cu pisici"], "correctAnswer": 1, "explanation": "Diversificarea surselor forțează algoritmul să îți arate și alte puncte de vedere.", "remediation": "Ieșirea din zona de confort informațional este cheia."}]$$::jsonb
),
(
  'igiena-informationala-citirea-laterala',
  'Nivelul 6',
  'Igiena Informațională: Citirea Laterală',
  'Search',
  $$<p>În era dezinformării, nu mai este suficient să citești un articol. Trebuie să devii un detectiv al informației folosind tehnici de verificare rapidă.</p><h3>Metoda SIFT (Stop, Investigate, Find, Trace)</h3><ol class="space-y-4 my-4"><li><strong>STOP:</strong> Când simți o emoție puternică (furia, surpriza), oprește-te. Nu distribui. Emoția este un semn că ești ținta unei manipulări.</li><li><strong>Investighează sursa:</strong> Nu te uita la design-ul site-ului. Caută pe Wikipedia sau pe Google ce spun alții despre această publicație. Cine o finanțează?</li><li><strong>Găsește o acoperire mai bună:</strong> Caută subiectul pe un motor de căutare. Dacă o știre &quot;bombă&quot; apare doar pe un site obscur și nu pe agențiile de presă majore (Reuters, AP, BBC), este probabil falsă.</li><li><strong>Urmează citatele la sursă:</strong> De unde provine imaginea sau citatul? Folosește <strong>Reverse Image Search</strong> pentru a vedea contextul original al unei fotografii.</li></ol><h3>Citirea Laterală</h3><p>În loc să parcurgi pagina de sus în jos (citire verticală), deschide tab-uri noi în lateral. Verifică reputația autorului și a site-ului înainte de a acorda credit conținutului.</p>$$,
  $$[{"question": "Ce presupune tehnica 'Citirii Laterale'?", "options": ["Să citești textul de la dreapta la stânga", "Să verifici informația deschizând tab-uri noi pentru a cerceta sursa și afirmația în alte locuri", "Să citești doar titlurile articolelor", "Să ignori complet textul și să te uiți doar la poze"], "correctAnswer": 1, "explanation": "Citirea laterală este metoda prin care verifici credibilitatea unei surse căutând informații externe despre ea, in loc să te bazezi pe ce spune site-ul despre sine.", "remediation": "Imaginează-ți că deschizi tab-uri în 'lateral' pentru a verifica sursa."}, {"question": "De ce design-ul profesional al unui site nu este o dovadă de credibilitate?", "options": ["Pentru că design-ul este subiectiv", "Pentru că oricine poate cumpăra un template premium pentru a părea oficial", "Pentru că site-urile serioase arată mereu demodat", "Pentru că culorile frumoase distrag atenția"], "correctAnswer": 1, "explanation": "Aspectul vizual este ușor de falsificat; conținutul și reputația sursei sunt cele care contează.", "remediation": "Nu te lăsa păcălit de 'ambalaj'."}, {"question": "Care este primul pas recomandat când întâlnești o știre șocantă?", "options": ["Să o distribui imediat prietenilor", "Să părăsești site-ul și să verifici informația din alte surse", "Să scrii un comentariu furios", "Să crezi tot ce scrie dacă are poze"], "correctAnswer": 1, "explanation": "Pauza și verificarea externă sunt cele mai bune apărări împotriva manipulării.", "remediation": "Amintește-ți regula: 'Stop, Gândește, Verifică'."}]$$::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  level = EXCLUDED.level,
  title = EXCLUDED.title,
  icon_name = EXCLUDED.icon_name,
  content = EXCLUDED.content,
  quiz = EXCLUDED.quiz;

-- 4. Gamification Seed Data
INSERT INTO badges (name, description, icon_name, criteria) VALUES
('Prima Lecție', 'Ai parcurs prima ta lecție.', 'BookOpen', 'first_lesson'),
('Analist Începător', 'Ai folosit analizatorul pentru prima dată.', 'Search', 'first_analysis'),
('100% Corect', 'Ai obținut scor perfect la Swipe Game.', 'ShieldAlert', 'perfect_swipe'),
('Adevăr Absolut', 'Ai finalizat toate lecțiile.', 'Trophy', 'all_lessons'),
('Consecvent', 'Ai fost activ astăzi în aplicație.', 'Flame', 'daily_activity')
ON CONFLICT DO NOTHING;

-- 5. Fallacies Sandbox
INSERT INTO fallacies_registry (id, name, definition, example) VALUES
(1, 'Atacul la Persoană (Ad Hominem)', 'Atacarea caracterului sau motivelor unei persoane în loc de argumentele sale.', 'Nu-l ascultați pe Popescu când vorbește despre economie, uită-te cum se îmbracă!'),
(2, 'Panta Alunecoasă (Slippery Slope)', 'Aserțiunea că un eveniment va duce la o reacție în lanț extremă, fără dovezi suficiente.', 'Dacă interzicem pungile de plastic, în curând vom interzice și mașinile, iar apoi ne vom întoarce în peșteri!'),
(3, 'Falsa Dilemă (False Dilemma)', 'Prezentarea a doar două opțiuni ca fiind singurele posibile, când de fapt există mai multe.', 'Fie ești cu noi, fie ești împotriva noastră.'),
(4, 'Omul de Paie (Straw Man)', 'Simplificarea, exagerarea sau denaturarea argumentului adversarului pentru a fi mai ușor de atacat.', 'Tu spui că ar trebui să investim mai mult în educație, deci vrei să lăsăm armata fără niciun ban și să fim cuceriți!'),
(5, 'Apelul la Autoritate (Appeal to Authority)', 'Invocarea opiniei unui expert (adesea fals sau dintr-un domeniu irelevant) ca argument suprem.', 'Acest șampon e grozav, chiar și actorul din acel film de acțiune a spus asta!'),
(6, 'Falsa Cauză (False Cause)', 'Presupunerea că dacă un eveniment urmează după altul, primul l-a cauzat pe al doilea (Corelația nu înseamnă cauzalitate).', 'Când a început să scadă numărul piratilor din lume, a început încălzirea globală. Deci lipsa piraților cauzează încălzirea.'),
(7, 'Generalizarea Pripită (Hasty Generalization)', 'Extragerea unei concluzii generale pe baza unui eșantion prea mic sau nereprezentativ.', 'Am întâlnit doi francezi nepoliticoși, clar toți francezii sunt nepoliticoși.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  definition = EXCLUDED.definition,
  example = EXCLUDED.example;

-- 7. Mock Users and Streaks (for demonstration)
DO $$
DECLARE
    dummy_teacher UUID := '00000000-0000-0000-0000-000000000001'::uuid;
    dummy_student1 UUID := '11111111-1111-1111-1111-111111111111'::uuid;
    dummy_student2 UUID := '22222222-2222-2222-2222-222222222222'::uuid;
    dummy_student3 UUID := '33333333-3333-3333-3333-333333333333'::uuid;
    new_class_id UUID;
BEGIN
    -- Insert dummy users into auth.users (local dev)
    INSERT INTO auth.users (id, instance_id, email) VALUES (dummy_teacher, '00000000-0000-0000-0000-000000000000', 'profesor@scoala.ro') ON CONFLICT (id) DO NOTHING;
    INSERT INTO auth.users (id, instance_id, email) VALUES (dummy_student1, '00000000-0000-0000-0000-000000000000', 'student1@scoala.ro') ON CONFLICT (id) DO NOTHING;
    INSERT INTO auth.users (id, instance_id, email) VALUES (dummy_student2, '00000000-0000-0000-0000-000000000000', 'student2@scoala.ro') ON CONFLICT (id) DO NOTHING;
    INSERT INTO auth.users (id, instance_id, email) VALUES (dummy_student3, '00000000-0000-0000-0000-000000000000', 'student3@scoala.ro') ON CONFLICT (id) DO NOTHING;

    -- Create Class
    INSERT INTO classes (name, code, teacher_id) 
    VALUES ('Clasa a 10-a B', 'RO-74X2', dummy_teacher)
    ON CONFLICT (code) DO NOTHING
    RETURNING id INTO new_class_id;

    IF new_class_id IS NULL THEN
        SELECT id INTO new_class_id FROM classes WHERE code = 'RO-74X2';
    END IF;

    -- Set roles
    INSERT INTO user_roles (user_id, role, class_id, is_senior_mode, initial_score) 
    VALUES (dummy_teacher, 'profesor', NULL, false, 0) ON CONFLICT (user_id) DO NOTHING;
    INSERT INTO user_roles (user_id, role, class_id, is_senior_mode, initial_score) 
    VALUES (dummy_student1, 'student', new_class_id, false, 30) ON CONFLICT (user_id) DO NOTHING;
    INSERT INTO user_roles (user_id, role, class_id, is_senior_mode, initial_score) 
    VALUES (dummy_student2, 'student', new_class_id, false, 40) ON CONFLICT (user_id) DO NOTHING;
    INSERT INTO user_roles (user_id, role, class_id, is_senior_mode, initial_score) 
    VALUES (dummy_student3, 'student', new_class_id, false, 50) ON CONFLICT (user_id) DO NOTHING;
    
    -- Displaying a user with an active streak (played today)
    INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_activity_date)
    VALUES (dummy_student1, 5, 12, CURRENT_DATE AT TIME ZONE 'UTC') ON CONFLICT (user_id) DO NOTHING;
    
    -- Displaying a user with a broken streak (played 2 days ago)
    INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_activity_date)
    VALUES (dummy_student2, 1, 14, (CURRENT_DATE AT TIME ZONE 'UTC') - INTEGER '2') ON CONFLICT (user_id) DO NOTHING;
    
    -- Historical Evolution Data (Swipe Game Scores over time for dummy_student1)
    INSERT INTO swipe_game_scores (user_id, score, created_at) VALUES 
    (dummy_student1, 40, (CURRENT_DATE AT TIME ZONE 'UTC') - INTERVAL '28 days'),
    (dummy_student1, 45, (CURRENT_DATE AT TIME ZONE 'UTC') - INTERVAL '21 days'),
    (dummy_student1, 55, (CURRENT_DATE AT TIME ZONE 'UTC') - INTERVAL '14 days'),
    (dummy_student1, 65, (CURRENT_DATE AT TIME ZONE 'UTC') - INTERVAL '7 days'),
    (dummy_student1, 80, (CURRENT_DATE AT TIME ZONE 'UTC'));

EXCEPTION
    WHEN OTHERS THEN
        -- Safely ignore if auth.users is restricted
END $$;

SELECT setval('fallacies_registry_id_seq', (SELECT MAX(id) FROM fallacies_registry));

INSERT INTO fallacy_challenges (text_content, correct_fallacy_id, explanation, hint) VALUES
('Cum poți să o crezi? Primarul propune un nou parc, dar știm cu toții că fratele ei a fost închis pentru corupție!', 1, 'Acesta este un atac la persoană (Ad Hominem). Argumentul ignoră propunerea (parcul) și se concentrează pe o problemă familială nerelevantă.', 'Argumentul se leagă de persoană sau de propunere?'),
('Dacă le dăm voie elevilor să folosească telefoanele în pauze, mâine vor copia la teze, iar poimâine vom avea o generație de analfabeți!', 2, 'Aceasta este Panta Alunecoasă. Se face un salt nejustificat de la folosirea telefoanelor în pauze la o generație de analfabeți.', 'Observă reacția în lanț extremă și nejustificată.'),
('În această campanie, avem de ales: fie votăm pentru candidatul X și salvăm țara, fie votăm cu Y și mergem spre prăbușire totală.', 3, 'Aceasta este Falsa Dilemă. Sunt prezentate doar două opțiuni extreme, ignorând orice altă nuanță sau candidat.', 'Sunt cu adevărat doar două opțiuni?'),
('Criticii spun că ar trebui să avem un control mai strict al deșeurilor. Evident, acești critici vor să distrugă complet economia locală!', 4, 'Acesta este Omul de Paie. Se denaturează argumentul inițial și este transformat într-o propunere extremă (distrugerea economiei).', 'A propus cineva cu adevărat asta?'),
('O persoană de la suport tehnic abia vorbea engleză, deci tot suportul tehnic de la compania aia e îngrozitor.', 7, 'Aceasta este o Generalizare Pripită. Se trage o concluzie despre întreaga companie pe baza unei singure interacțiuni.', 'E corect să judeci tot setul pe baza unui singur exemplu?'),
('Vărul meu mi-a spus că vaccinurile nu sunt sigure, și el e foarte deștept, e contabil.', 5, 'Acesta este un Apel la Autoritate fals. Faptul că cineva e contabil nu înseamnă că e un expert în imunologie.', 'Este persoana o autoritate în domeniul discutat?'),
('De când am cumpărat o amuletă norocoasă, n-am mai răcit deloc. Amuleta mă protejează de viruși!', 6, 'Aceasta este o Falsă Cauză. Doar pentru că ai rămas sănătos după ce ai luat amuleta, nu înseamnă că amuleta este motivul.', 'Faptul că s-au întâmplat în același timp înseamnă că una o cauzează pe cealaltă?'),
('Am băut ieri o sticlă de suc de portocale, iar azi nu mă mai doare capul. Sucul de portocale vindecă migrenele!', 6, 'Accident sau legătură falsă. Vindecarea capului putea avea loc oricum (Falsa Cauză).', 'Nu confunda succesiunea a două lucruri cu o relație de tip cauză-efect.'),
('Profesorul nostru de istorie a spus că ar trebui să citim mai mult acasă. Așa că el vrea practic să nu mai avem niciun moment liber, să nu mai ieșim cu prietenii și să fim sclavi ai cărților!', 4, 'Este un clasic Om de Paie. A exagerat declarația profesorului de istorie ("să citim mai mult") într-o cerință absurdă.', 'A spus persoana exact asta sau a fost modificat mesajul ei în mod ridicol?'),
('Candidatul nostru nu este vinovat pentru problemele economiei. Dar hei, ați văzut ce cravată groaznică a purtat contracandidatul aseară la dezbatere?', 1, 'Acesta este fix un Ad Hominem: deturnarea discuției serioase despre ceva către o trăsătură personală (cravata).', 'Trece discuția de la un subiect la atacuri / detalii personale?');

-- 6. Verification Scenarios
INSERT INTO verification_scenarios (title, author_name, author_metadata, publish_date, date_metadata, image_url, cross_check_metadata, domain_name, domain_metadata, content_excerpt, content_metadata, is_published) VALUES
(
  'Descoperire Șocantă: Apa este Toxică!',
  'Dr. Falsulescu',
  '{"bio": "Expert independent în toxicologie...", "followers": 150, "is_verified": false}'::jsonb,
  '5 Iunie 2021',
  '{"actual_date": "2021-06-05", "explanation": "Acest articol a apărut prima oară în 2021, dar este repostat frecvent ca fiind «de ultimă oră»", "is_recent": false}'::jsonb,
  'https://picsum.photos/seed/toxicwater/800/600',
  '{"source_found": "Site de Păcăleli / Satiră", "is_reliable": false}'::jsonb,
  'stirile-adevarate.xyz',
  '{"analysis": "Domeniul folosește o extensie exotică (.xyz) și are un nume menit să inspire încredere falsă.", "is_reliable": false}'::jsonb,
  'TOȚI MEDicii ne ASCUND adevărul! Consumul zilnic de apă potabilă duce la degradarea iremediabilă a organelor. Cercetătorii independenți...',
  '{"emotional_language": true, "capitalization_abuse": true, "analysis": "Textul folosește majuscule nejustificat și limbaj senzaționalist («ASCUND adevărul», «degradare iremediabilă») pentru a provoca panică."}'::jsonb,
  true
),
(
  'Conspirația din spatele monedelor virtuale!',
  'InvestitorSecret99',
  '{"bio": "Consultant blockchain anonim, cont creat acum 2 zile.", "followers": 32, "is_bot": true}'::jsonb,
  'Astăzi, 14:30',
  '{"actual_date": "Nu poate fi verificată", "explanation": "Publicațiile nesigure folosesc adesea date relative («Astăzi», «Acum 2 ore») care rămân așa ani la rând.", "is_recent": true}'::jsonb,
  'https://picsum.photos/seed/crypto/800/600',
  '{"source_found": "Grup de promovare a înșelătoriilor financiare (Scam)", "is_reliable": false}'::jsonb,
  'crypto-profit-garantat.net',
  '{"analysis": "Promite «profit garantat», ceea ce este o metodă clasică de inginerie socială pentru a atrage victime.", "is_reliable": false}'::jsonb,
  'Nu rata oportunitatea vieții tale! Guvernele ascund această monedă pentru că te-ar face MILIONAR peste noapte!!!',
  '{"emotional_language": true, "capitalization_abuse": true, "analysis": "Promisiuni imposibile și urgență falsă («Nu rata», «MILIONAR peste noapte») specifice escrocheriilor."}'::jsonb,
  true
);
