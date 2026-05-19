"use client"

import React, { useEffect, useState, useRef } from "react"
import { Globe, Settings2, Minus, Plus, RefreshCcw, Type, MonitorSmartphone, Sunrise, Moon, Sun, ShieldAlert } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTheme } from '@/components/providers/ThemeProvider'
import { toggleSeniorModeAction, updateA11yPreferencesAction } from '@/app/actions/clase'
import toast from 'react-hot-toast'

// Languages supported by Google Translate
const languages = [
  { code: "ro", name: "Română", romanianName: "Română" },
  { code: "en", name: "English", romanianName: "Romanian" },
  { code: "fr", name: "Français", romanianName: "Roumain" },
  { code: "de", name: "Deutsch", romanianName: "Rumänisch" },
  { code: "es", name: "Español", romanianName: "Rumano" },
  { code: "it", name: "Italiano", romanianName: "Rumeno" },
  { code: "ru", name: "Русский", romanianName: "Румынский" },
  { code: "uk", name: "Українська", romanianName: "Румунська" },
  { code: "hu", name: "Magyar", romanianName: "Román" },
  { code: "bg", name: "Български", romanianName: "Румънски" },
]

const clearGoogleTranslateCookies = () => {
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname + ";"
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname.split(".").slice(-2).join(".") + ";"
}

const DEFAULT_FONT_SIZE = 16

type A11yPrefs = {
  highContrast: boolean
  reduceMotion: boolean
  dyslexiaFont: boolean
  fontSize: number
}

const defaultPrefs: A11yPrefs = {
  highContrast: false,
  reduceMotion: false,
  dyslexiaFont: false,
  fontSize: DEFAULT_FONT_SIZE,
}

export function AccessibilityMenu() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSeniorLoading, setIsSeniorLoading] = useState(false)
  
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();
  
  // A11y State
  const [prefs, setPrefs] = useState<A11yPrefs>(defaultPrefs)
  const [seniorMode, setSeniorMode] = useState(false)

  // Language State
  const [currentLang, setCurrentLang] = useState("ro")
  const [pageLanguage, setPageLanguage] = useState("ro")
  const googleTranslateInitialized = useRef(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialization & Hydration
  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 0)
    
    // Hydrate A11y
    try {
      const stored = localStorage.getItem('a11y-prefs')
      if (stored) {
        const parsed = JSON.parse(stored) as A11yPrefs
        setTimeout(() => setPrefs({ ...defaultPrefs, ...parsed }), 0)
      }
      
      const storedSenior = localStorage.getItem('senior-mode')
      if (storedSenior) {
        setTimeout(() => setSeniorMode(storedSenior === 'true'), 0)
      }
    } catch (_) {}

    // Init Google Translate
    const addScript = () => {
      const script = document.createElement("script")
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      document.body.appendChild(script)

      const translateDiv = document.createElement("div")
      translateDiv.id = "google_translate_element"
      translateDiv.style.display = "none"
      document.body.appendChild(translateDiv)

       // @ts-ignore
      window.googleTranslateElementInit = () => {
         // @ts-ignore
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "ro",
            autoDisplay: false,
            includedLanguages: languages.map((lang) => lang.code).join(","),
          },
          "google_translate_element"
        )
        googleTranslateInitialized.current = true
      }
    }

    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript()
    }

    const style = document.createElement("style")
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      .goog-te-menu-value span { display: none !important; }
      .goog-te-menu-value span:first-child { display: inline !important; }
      .goog-te-gadget-icon { display: none !important; }
      body { top: 0 !important; }
      .VIpgJd-ZVi9od-l4eHX-hSRGPd, .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
      .language-dropdown-container { position: relative; z-index: 50; }
      .language-dropdown-container * { font-family: inherit !important; font-size: inherit !important; background-color: inherit; }
      .notranslate { translate: no !important; }
    `
    document.head.appendChild(style)

    return () => {
      if (style.parentNode) style.parentNode.removeChild(style)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Manage A11y DOM Side Effects
  useEffect(() => {
    if (!mounted) return

    localStorage.setItem('a11y-prefs', JSON.stringify(prefs))
    
    const root = document.documentElement
    
    if (prefs.highContrast) root.classList.add('theme-high-contrast')
    else root.classList.remove('theme-high-contrast')

    if (prefs.reduceMotion) root.classList.add('reduced-motion')
    else root.classList.remove('reduced-motion')

    if (prefs.dyslexiaFont) root.classList.add('dyslexia-font')
    else root.classList.remove('dyslexia-font')

    localStorage.setItem('senior-mode', String(seniorMode))
    if (seniorMode) {
      root.classList.add('senior-mode')
      root.style.fontSize = '20px' // base font size override
    } else {
      root.classList.remove('senior-mode')
      root.style.fontSize = `${prefs.fontSize}px`
    }

  }, [prefs, mounted, seniorMode])

  // Language Detection
  useEffect(() => {
    const detectPageLanguage = () => {
      const cookies = document.cookie.split(";")
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=")
        if (name === "googtrans") {
          const parts = value.split("/")
          if (parts.length >= 3) {
            const targetLang = parts[2]
            if (targetLang && targetLang !== "auto" && targetLang !== "ro") {
              setPageLanguage(targetLang)
              setCurrentLang(targetLang)
              return
            }
          }
        }
      }

      const frame = document.querySelector(".goog-te-menu-frame")
      if (frame) {
        const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement
        if (selectElement && selectElement.value && selectElement.value !== "ro") {
          setPageLanguage(selectElement.value)
          setCurrentLang(selectElement.value)
          return
        }
      }
      setPageLanguage("ro")
      setCurrentLang("ro")
    }

    if (mounted) {
      detectPageLanguage()
      const interval = setInterval(detectPageLanguage, 500)
      intervalRef.current = interval
      return () => clearInterval(interval)
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg border border-[#1a1a1a]/10 dark:border-white/10 text-[#1a1a1a] dark:text-white bg-white dark:bg-[#1a1a1a]">
        <Settings2 className="h-4 w-4" />
      </div>
    )
  }

  const getLanguageDisplayNames = () => {
    return languages.map((lang) => ({ ...lang, displayName: lang.name }))
  }

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode)
    
    if (langCode === "ro") {
      if (document.cookie.indexOf("googtrans") > -1) {
        clearGoogleTranslateCookies()
        window.location.reload()
      }
      return
    }

    const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement

    if (selectElement) {
      selectElement.value = langCode
      selectElement.dispatchEvent(new Event("change"))
      setPageLanguage(langCode)
    }
  }

  const syncToDB = async (updates: any) => {
    try {
      const result = await updateA11yPreferencesAction(updates);
      if (!result.success && result.error !== 'Unauthorized') {
        toast.error('Nu s-a putut salva preferința în profilul tău.', { id: 'a11y-error' });
      }
    } catch (e) {}
  };

  const updatePrefs = (updates: Partial<A11yPrefs>) => {
    setPrefs(prev => {
      const next = { ...prev, ...updates };
      syncToDB({
        a11y_high_contrast: next.highContrast,
        a11y_reduce_motion: next.reduceMotion,
        a11y_dyslexia_font: next.dyslexiaFont,
        a11y_font_size: next.fontSize
      });
      return next;
    });
  }

  const handleFontSize = (action: 'increase' | 'decrease' | 'reset') => {
    setPrefs(prev => {
      let newSize = prev.fontSize
      if (action === 'increase') newSize = Math.min(newSize + 2, 24)
      if (action === 'decrease') newSize = Math.max(newSize - 2, 12)
      if (action === 'reset') newSize = DEFAULT_FONT_SIZE
      const next = { ...prev, fontSize: newSize }
      syncToDB({ a11y_font_size: next.fontSize });
      return next;
    })
  }

  const handleSeniorModeToggle = async (checked: boolean) => {
    setSeniorMode(checked);
    setIsSeniorLoading(true);
    const result = await toggleSeniorModeAction(checked);
    setIsSeniorLoading(false);
    if (!result.success && result.error !== 'Unauthorized') {
      toast.error('Nu s-a putut salva preferința în profilul tău.');
    } else if (result.success) {
      toast.success(checked ? 'Modul Seniori Activat. Baza de date adaptată.' : 'Modul Seniori Dezactivat.');
    }
  }

  const handleThemeToggle = (checked: boolean) => {
    toggleTheme();
    syncToDB({ theme: checked ? 'dark' : 'light' });
  }

  const currentDisplayText = languages.find((lang) => lang.code === currentLang)?.name || "Română"
  const displayLanguages = getLanguageDisplayNames()

  return (
    <div className="notranslate">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="flex items-center gap-1.5 p-2 rounded-lg border bg-white dark:bg-[#1a1a1a] border-[#1a1a1a]/10 dark:border-white/10 text-[#1a1a1a] dark:text-white hover:bg-[#1a1a1a]/5 dark:hover:bg-white/5 transition-all shadow-sm outline-none" aria-label="Meniu de accesibilitate și traducere">
          <Settings2 className="h-4 w-4" />
        </PopoverTrigger>
        <PopoverContent 
          align="end" 
          sideOffset={8}
          className="notranslate w-84 p-5 bg-white dark:bg-[#1a1a1a] border border-[#1a1a1a]/10 dark:border-white/10 text-[#1a1a1a] dark:text-white shadow-xl rounded-xl space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-[#1a1a1a]/10 dark:border-white/10 pb-3">
            <Settings2 className="w-5 h-5 text-[#7c1f31] dark:text-[#ff4d6d]" />
            <h3 className="font-bold text-lg leading-none">Accesibilitate</h3>
          </div>

          {/* Settings Group: Font Size */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold opacity-80 flex items-center gap-2">
              <Type className="w-4 h-4" /> Dimensiune Text
            </Label>
            <div className="flex items-center gap-2 bg-[#1a1a1a]/5 dark:bg-white/5 p-1 rounded-lg">
              <button 
                onClick={() => handleFontSize('decrease')}
                className="notranslate flex-1 flex justify-center items-center py-2 px-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded-md transition-all shadow-sm disabled:opacity-50"
                disabled={prefs.fontSize <= 12}
                translate="no"
                aria-label="Micsorează textul"
              >
                <Minus className="w-4 h-4 pointer-events-none" />
              </button>
              <div className="w-px h-6 bg-[#1a1a1a]/10 dark:bg-white/10" />
              <button 
                onClick={() => handleFontSize('reset')}
                className="notranslate flex-1 flex justify-center items-center py-2 px-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded-md transition-all shadow-sm text-sm font-bold"
                translate="no"
                aria-label="Resetează textul"
              >
                100%
              </button>
              <div className="w-px h-6 bg-[#1a1a1a]/10 dark:bg-white/10" />
              <button 
                onClick={() => handleFontSize('increase')}
                className="notranslate flex-1 flex justify-center items-center py-2 px-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded-md transition-all shadow-sm disabled:opacity-50"
                disabled={prefs.fontSize >= 24}
                translate="no"
                aria-label="Mărește textul"
              >
                <Plus className="w-4 h-4 pointer-events-none" />
              </button>
            </div>
          </div>

          {/* Settings Group: Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="a11y-senior" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                <ShieldAlert className="w-4 h-4" /> Modul Seniori
              </Label>
              <Switch 
                id="a11y-senior" 
                checked={seniorMode} 
                onCheckedChange={handleSeniorModeToggle} 
                disabled={isSeniorLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="a11y-darkmode" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} Mod Întunecat
              </Label>
              <Switch 
                id="a11y-darkmode" 
                checked={theme === 'dark'} 
                onCheckedChange={handleThemeToggle} 
                disabled={!themeMounted}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="a11y-contrast" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                <Sunrise className="w-4 h-4" /> Contrast Ridicat
              </Label>
              <Switch 
                id="a11y-contrast" 
                checked={prefs.highContrast} 
                onCheckedChange={(c) => updatePrefs({ highContrast: c })} 
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="a11y-motion" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                <MonitorSmartphone className="w-4 h-4" /> Redu Animațiile
              </Label>
              <Switch 
                id="a11y-motion" 
                checked={prefs.reduceMotion} 
                onCheckedChange={(c) => updatePrefs({ reduceMotion: c })} 
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="a11y-dyslexia" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                <Type className="w-4 h-4" /> Font Dislexie
              </Label>
              <Switch 
                id="a11y-dyslexia" 
                checked={prefs.dyslexiaFont} 
                onCheckedChange={(c) => updatePrefs({ dyslexiaFont: c })} 
              />
            </div>
          </div>

          {/* Settings Group: Translate */}
          <div className="space-y-3 pt-3 border-t border-[#1a1a1a]/10 dark:border-white/10">
            <Label className="text-sm font-semibold opacity-80 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Traducere
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {displayLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`text-left px-3 py-2 text-sm font-medium transition-colors hover:bg-[#7c1f31]/10 dark:hover:bg-white/10 rounded-lg ${currentLang === lang.code ? "bg-[#1a1a1a]/5 dark:bg-white/5 text-[#7c1f31] dark:text-[#ff4d6d]" : ""}`}
                >
                  {lang.displayName}
                </button>
              ))}
            </div>
          </div>

        </PopoverContent>
      </Popover>
    </div>
  )
}
