import React from 'react';
import { motion } from 'motion/react';
import { FileText, Code, Cpu, ShieldCheck, BookOpen } from 'lucide-react';

export default function DocumentationView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto py-10 px-4 md:px-0 flex flex-col md:flex-row gap-12"
    >
      {/* Sidebar Navigation */}
      <div className="w-full md:w-72 shrink-0">
        <div className="md:sticky md:top-28 space-y-2 bg-white dark:bg-[#1a1a1a] md:bg-transparent p-6 md:p-0 rounded-3xl md:rounded-none border md:border-none border-[#1a1a1a]/10 dark:border-white/10 shadow-sm md:shadow-none mb-8 md:mb-0">
          <h3 className="font-bold text-[#1a1a1a] dark:text-white mb-4 uppercase tracking-wider text-sm">Arhitectură & Documentație</h3>
          <a href="#arhitectura" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 text-[#1a1a1a]/80 dark:text-white/80 hover:text-[#7c1f31] dark:hover:text-[#ff4d6d] font-medium transition-colors">
            <Code className="w-5 h-5" /> Arhitectura Sistemului
          </a>
          <a href="#motorul-ai" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 text-[#1a1a1a]/80 dark:text-white/80 hover:text-[#7c1f31] dark:hover:text-[#ff4d6d] font-medium transition-colors">
            <Cpu className="w-5 h-5" /> Integrarea LLM & API
          </a>
          <a href="#algoritmi" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 text-[#1a1a1a]/80 dark:text-white/80 hover:text-[#7c1f31] dark:hover:text-[#ff4d6d] font-medium transition-colors">
            <FileText className="w-5 h-5" /> Algoritmică Client-Side
          </a>
          <a href="#securitate" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 text-[#1a1a1a]/80 dark:text-white/80 hover:text-[#7c1f31] dark:hover:text-[#ff4d6d] font-medium transition-colors">
            <ShieldCheck className="w-5 h-5" /> Securitate & Performanță
          </a>
          <a href="#ghid-profesor" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 text-[#1a1a1a]/80 dark:text-white/80 hover:text-[#7c1f31] dark:hover:text-[#ff4d6d] font-medium transition-colors">
            <BookOpen className="w-5 h-5" /> Ghidul Profesorului
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 prose prose-slate dark:prose-invert max-w-none prose-headings:text-[#1a1a1a] dark:prose-headings:text-white prose-a:text-[#7c1f31] dark:prose-a:text-[#ff4d6d] prose-strong:text-[#7c1f31] dark:prose-strong:text-[#ff4d6d]">
        <div className="mb-12 border-b border-[#1a1a1a]/10 dark:border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] dark:text-white mb-4 tracking-tight">Documentație Tehnică Oficială</h1>
          <p className="text-xl text-[#1a1a1a]/70 dark:text-white/70 font-medium">Specificații arhitecturale și decizii de inginerie pentru platforma Ctrl+Alt+Truth.</p>
        </div>

        <section id="arhitectura" className="mb-16 scroll-mt-28">
          <h2 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 flex items-center gap-3">
            <div className="bg-[#7c1f31]/10 p-2.5 rounded-xl"><Code className="w-6 h-6 text-[#7c1f31] dark:text-[#ff4d6d]" /></div>
            1. Arhitectura Sistemului și Stack-ul Tehnologic
          </h2>
          <p>
            Aplicația <strong>Ctrl+Alt+Truth</strong> este fundamentată pe o arhitectură modernă și scalabilă, utilizând <strong>React 18</strong> și <strong>Next.js (App Router)</strong>. Am adoptat o decuplare strictă între <em>Client Components</em> (marcate cu directiva <code>&apos;use client&apos;</code>, responsabile pentru interactivitatea UI și state management) și <em>Server Components / API Routes</em>, care gestionează comunicarea securizată cu backend-ul și ascunderea secretelor.
          </p>
          <p>
            Pentru a asigura o experiență nativă pe dispozitivele mobile și reziliență în condiții de conectivitate redusă, sistemul este configurat ca un <strong>Progressive Web App (PWA)</strong>. Am implementat Service Workers pentru capabilități de offline caching, un <code>manifest.json</code> riguros configurat și principii stricte de design mobile-first.
          </p>
          <p>
            La nivel de UI/UX, stack-ul se bazează pe <strong>Tailwind CSS</strong> pentru un styling utility-first, integrat cu <strong>Shadcn UI</strong> (construit peste primitivele Radix UI). Această decizie arhitecturală garantează componente complet accesibile (WAI-ARIA compliant), ne-stilizate implicit, oferind flexibilitate maximă în aplicarea design system-ului nostru personalizat (fundal <code>#e7edeb</code>, accent <code>#7c1f31</code>).
          </p>
        </section>

        <section id="motorul-ai" className="mb-16 scroll-mt-28">
          <h2 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 flex items-center gap-3">
            <div className="bg-[#7c1f31]/10 p-2.5 rounded-xl"><Cpu className="w-6 h-6 text-[#7c1f31] dark:text-[#ff4d6d]" /></div>
            2. Integrarea LLM și Arhitectura Backend (API)
          </h2>
          <p>
            Comunicarea cu motorul <strong>Google Gemini 2.5 Flash API</strong> este orchestrată exclusiv prin intermediul Next.js Serverless Functions (<code>app/api/generate/route.ts</code>), prevenind astfel expunerea cheilor API în mediul client.
          </p>
          <p>
            Pentru a garanta integritatea datelor consumate de frontend, am implementat un mecanism de <strong>Structured Outputs (JSON Schema)</strong>. Sistemul dictează strict tipul de răspuns MIME ca fiind <code>application/json</code> prin prompt engineering avansat, forțând modelul să returneze un payload cu o formă exactă (conținând <code>text</code>, <code>toxicWords</code>, <code>explanation</code> și <code>emotions</code>). Aceasta previne erorile de parsare la nivelul clientului și asigură un contract de date stabil.
          </p>
          <p>
            Pentru a asigura un uptime de 99.9% în scenarii de trafic intens (high-traffic demos), am dezvoltat o <strong>Strategie de Rotație a Cheilor API</strong>. Backend-ul dispune de un array de chei și interceptează erorile HTTP 429 (Too Many Requests). În cazul epuizării cotei unei chei, sistemul implementează o buclă recursivă de fallback, iterând prin cheile disponibile până la obținerea unui răspuns valid.
          </p>
          <p>
            În situația extremă a unui eșec total al rețelei sau epuizării tuturor cheilor, arhitectura folosește un pattern de <strong>Graceful Degradation</strong>: aplicația face fallback transparent către dataset-uri deterministe, hardcodate local, asigurând continuitatea experienței utilizatorului fără a genera excepții fatale în UI.
          </p>
        </section>

        <section id="algoritmi" className="mb-16 scroll-mt-28">
          <h2 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 flex items-center gap-3">
            <div className="bg-[#7c1f31]/10 p-2.5 rounded-xl"><FileText className="w-6 h-6 text-[#7c1f31] dark:text-[#ff4d6d]" /></div>
            3. Algoritmică Client-Side și Analiză NLP Locală
          </h2>
          <h3>Analiza Stilometrică (Local Stylometry)</h3>
          <p>
            Pentru a distinge între tiparele de generare mecanică (AI) și cele organice (umane), am implementat un model matematic care rulează integral în browser. Textul este parsat prin Expresii Regulate (Regex) complexe, capabile să gestioneze edge case-urile punctuației din limba română (ex: elipse, interogații retorice, abrevieri).
          </p>
          <p>
            Algoritmul calculează <strong>Deviația Standard a Lungimii Frazelor (Burstiness)</strong> utilizând formula exactă a varianței (suma diferențelor la pătrat față de medie, împărțită la N). O deviație scăzută indică uniformitate (specifică LLM-urilor), în timp ce o deviație ridicată indică variabilitatea naturală a scriiturii umane. Suplimentar, se calculează <em>Diversitatea Lexicală</em> ca raport procentual între cuvintele unice și totalul cuvintelor.
          </p>
          <h3>Motorul de Highlight (Parsing Interactiv)</h3>
          <p>
            Am dezvoltat un algoritm cu complexitate temporală <strong>$O(n)$</strong> pentru a mapa array-ul <code>toxicWords</code> peste elementele DOM interactive ale textului. Această abordare permite comutarea instantanee a stării (<code>onClick</code>) la nivel de cuvânt, fără a declanșa re-randări costisitoare ale întregului arbore de componente (component tree), menținând un framerate de 60fps în timpul interacțiunii.
          </p>
        </section>

        <section id="securitate" className="mb-16 scroll-mt-28">
          <h2 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 flex items-center gap-3">
            <div className="bg-[#7c1f31]/10 p-2.5 rounded-xl"><ShieldCheck className="w-6 h-6 text-[#7c1f31] dark:text-[#ff4d6d]" /></div>
            4. Backend, Securitate și Accesibilitate
          </h2>
          <h3>Arhitectura Backend și Baze de Date (Supabase)</h3>
          <p>
            Spre deosebire de o arhitectură tradițională monolit, platforma adoptă un model de <strong>Backend-as-a-Service (BaaS)</strong> utilizând <strong>Supabase</strong> (o alternativă open-source la Firebase, bazată pe PostgreSQL). Această tranziție arhitecturală permite sincronizarea multi-dispozitiv și persistența datelor în cloud.
          </p>
          <p>
            <strong>Autentificare și Roluri:</strong> Platforma include un modul robust de autentificare. Autorizarea se face pe bază de roluri, permițând acces la un Dashboard de <strong>Admin / CMS</strong> unde educatorii pot crea, edita și șterge lecții, insigne (badges) și conținut pentru mini-jocuri (swipe game), direct din interfața utilizatorului, având modificările reflectate în timp real în întreaga aplicație.
          </p>
          <p>
            <strong>Securitate și Integritate:</strong> Utilizăm <strong>Row Level Security (RLS)</strong> la nivelul bazei de date (PostgreSQL) pentru a asigura faptul că fiecare utilizator are acces exclusiv și irevocabil doar la propriile date (progres lecții, activitate analizator, insigne), blocând matematic orice încercare de accesare a datelor încrucișate. De asemenea, pentru a preveni atacurile de tip <strong>XSS (Cross-Site Scripting)</strong> la interpretarea textelor dinamice, rezultatele AI-ului sunt formatate prin rutine de sanitizare.
          </p>
          
          <h3>Gamificare Sistematică (Gamification Engine)</h3>
          <p>
            Pentru retenția utilizatorilor, am implementat un motor de gamificare determinist pe baza evenimentelor de interacțiune. Atunci când utilizatorii ating praguri critice (finalizarea unei lecții, obținerea unui scor perfect la quiz-uri sau la jocul de tip Tinder/Swipe), logica de backend evaluează automat acordarea unor <strong>Insigne (Badges)</strong>. Deblocarea insignei este comunicată interactiv în UI (Global Event Listener) și este sincronizată persistent.
          </p>

          <h3>Accesibilitate și Incluziune Digitală</h3>
          <p>
            Platforma aderă la standardele internaționale de accesibilitate web, integrând un modul dedicat, dezvoltat complet in-house. Această unealtă globală expune următoarele funcționalități critice:
          </p>
          <ul>
            <li><strong>Modificare Font Specifică:</strong> Suport nativ pentru fonturi dedicate persoanelor cu Dislexie (ex. <em>OpenDyslexic</em>, flexibil prin <em>Lexend</em>), crescând semnificativ lizibilitatea datorită caracterelor asimetrice (bottom-heavy characters).</li>
            <li><strong>Text-to-Speech (Sinteză Vocală):</strong> Pentru asistență auditivă completă a întregului conținut, folosind API-ul SpeechSynthesis din browser.</li>
            <li><strong>Managementul Animațiilor (Reduced Motion):</strong> O abordare etică pentru utilizatorii cu afecțiuni vestibulare sau sensibilitate la mișcare, prin suprimarea CSS/Framer Motion tuturor animațiilor și micro-interacțiunilor globale.</li>
            <li><strong>Tematizare Contrast / Dark Mode:</strong> Suport pentru modul luminos/întunecat și o schemă complet independentă de contrast maximizat pentru utilizatorii nevăzători parțial sau cu deficiențe cromatice.</li>
          </ul>
        </section>

        <section id="ghid-profesor" className="mb-16 scroll-mt-28">
          <h2 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 flex items-center gap-3">
            <div className="bg-[#7c1f31]/10 p-2.5 rounded-xl"><BookOpen className="w-6 h-6 text-[#7c1f31] dark:text-[#ff4d6d]" /></div>
            5. Ghidul Profesorului: Integrare la Clasă
          </h2>
          <p>
            Platforma <strong>Ctrl+Alt+Truth</strong> este concepută ca un instrument pedagogic interactiv pentru lecțiile de educație civică, TIC sau gândire critică. Iată cum poate fi integrată eficient în procesul de predare:
          </p>
          
          <h3>Obiective Pedagogice</h3>
          <ul>
            <li><strong>Dezvoltarea gândirii critice:</strong> Elevii învață să nu accepte informația ca fiind adevărată doar pe baza aspectului vizual al sursei.</li>
            <li><strong>Înțelegerea mecanismelor AI:</strong> Demistificarea modului în care textele sintetice sunt generate și cum pot fi detectate prin analiză stilometrică.</li>
            <li><strong>Recunoașterea tehnicilor de manipulare:</strong> Identificarea limbajului polarizant, a clickbait-ului și a manipulării consensului.</li>
          </ul>

          <h3>Strategii de Predare</h3>
          <ol>
            <li><strong>Sesiuni de Analiză în Grup:</strong> Profesorul poate proiecta <em>Laboratorul de Adevăr</em> și poate analiza împreună cu elevii un articol generat, dezbătând de ce anumite cuvinte sunt marcate ca fiind toxice.</li>
            <li><strong>Competiție de Verificare (Swipe Game):</strong> Elevii pot concura pentru cel mai mare scor în jocul de swipe, dezvoltând reflexe rapide de detectare a titlurilor suspecte.</li>
            <li><strong>Lecții Structurate cu Quiz:</strong> Academia oferă 6 module progresive. Fiecare modul se încheie cu un quiz de evaluare care oferă feedback instantaneu și explicații detaliate pentru fiecare răspuns.</li>
          </ol>

          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-[2rem] border border-[#7c1f31]/20 dark:border-white/10 shadow-sm">
            <h4 className="text-[#7c1f31] dark:text-[#ff4d6d] font-bold mb-2">Sfat pentru profesori:</h4>
            <p className="text-sm italic">
              Încurajați elevii să folosească tehnica &quot;Citirii Laterale&quot; (Nivelul 6) în timpul oricărei activități de cercetare online. Aceasta este cea mai eficientă metodă de fact-checking utilizată de profesioniști.
            </p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
