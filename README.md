# Ctrl+Alt+Truth

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

<p align="center">
  <img src="./demo.gif" alt="CtrlAltTruth Demo" />
</p>

## Cuprins
- [Prezentare Generală](#prezentare-generală)
- [Funcționalități Principale](#funcționalități-principale)
- [Arhitectură Tehnică](#arhitectură-tehnică)
- [Cum Să Începi](#cum-să-începi)
  - [Cerințe Preliminare pentru a rula proiectul (sau pentru Self-Hosting)](#cerințe-preliminare-pentru-a-rula-proiectul-sau-pentru-self-hosting)
  - [Instalare](#instalare)
- [Licență](#licență)

## Prezentare Generală

Într-o eră în care inteligența artificială generativă poate crea mii de articole manipulatoare în câteva secunde, gândirea critică este singurul tău firewall. **Ctrl+Alt+Truth** este o platformă educațională interactivă creată pentru a democratiza adevărul și a proteja consumatorii de conținut digital de manipularea media, propagandă și dezinformare.

Misiunea noastră este să antrenăm utilizatorii să detecteze tiparele dezinformării înainte de a fi influențați, combătând răspândirea rapidă a știrilor false în feed-urile algoritmice ale rețelelor sociale.

## Funcționalități Principale

* **Laboratorul de Adevăr (Analizatorul)**
  Un mediu interactiv în care utilizatorii selectează subiecte actuale, iar AI-ul nostru generează pe loc un articol manipulator și subiectiv. Utilizatorii au la dispoziție un timp limitat pentru a identifica limbajul încărcat emoțional, exagerat sau toxic. Sistemul oferă feedback imediat, o analiză radar a emoțiilor și explicații detaliate ale tacticilor de manipulare folosite.

* **Swipe Game**
  Un joc rapid și intuitiv conceput pentru a-ți testa și îmbunătăți judecata la fracțiune de secundă. Glisează pentru a clasifica titlurile și afirmațiile, antrenându-ți creierul să distingă rapid informațiile credibile de clickbait-ul senzaționalist.

* **Monitorizarea Progresului și Profiluri**
  Susținut de Supabase, utilizatorii își pot crea conturi pentru a-și urmări progresul în învățare, a revedea analizele trecute și a observa cum li se îmbunătățesc abilitățile de gândire critică în timp. Platforma rămâne complet accesibilă și pentru utilizatorii vizitatori (guest) care doresc să învețe fără a se înregistra.

* **Accesibilitate Multilingvă**
  Instrumentele de traducere integrate asigură faptul că limba nu reprezintă o barieră în calea accesării unei educații media de înaltă calitate.

## Arhitectură Tehnică

Ctrl+Alt+Truth este construit folosind tehnologii web moderne pentru a asigura o experiență rapidă, receptivă și sigură:

* **Framework:** Next.js (App Router)
* **Stilizare:** Tailwind CSS cu animații dinamice personalizate și design responsiv
* **Autentificare și Bază de date:** Supabase
* **Integrare AI:** Google Gemini API pentru generarea și analiza articolelor în timp real
* **Iconițe:** Lucide React

## Cum Să Începi

Urmează acești pași pentru a configura și rula proiectul local.

### Cerințe Preliminare pentru a rula proiectul (sau pentru Self-Hosting):

* Node.js (v18 sau o versiune mai nouă este recomandată)
* O cheie API Gemini (gratuit la [Google AI Studio - API keys](https://aistudio.google.com/)) - obligatorie pentru generarea si analiza de articole manipulative si subjective (atat in modul de laborator cat si in modul de joc)
* Un proiect Supabase (pentru autentificare si baza de date)

### Instalare

1. **Clonează repozitoriul și instalează dependențele:**
   ```bash
   pnpm i
   ```

2. **Configurează Variabilele de Mediu:**
   Creează un fișier `.env.local` în directorul principal și adaugă cheile API necesare:
   ```env
   GEMINI_API_KEY_1=cheia_ta_api_gemini
   GEMINI_API_KEY_2=cheie_gemini_secundara_optionala
   NEXT_PUBLIC_SUPABASE_URL=url_proiect_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=cheie_anon_supabase
   ```

3. **Pornește Serverul de Dezvoltare:**
   ```bash
   pnpm run dev
   ```

4. **Explorează Aplicația:**
   Deschide `http://localhost:3000` în browser pentru a începe să folosești Ctrl+Alt+Truth.

## Licență

Acest proiect este licențiat sub GNU Affero General Public License v3.0 (AGPL-3.0). Consultă fișierul [LICENSE.md](LICENSE.md) pentru detalii.
