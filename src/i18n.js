// ── Internationalisation ───────────────────────────────────────────────

const LANGS = {
    en: {
        name: 'English',
        hold: 'HOLD to climb  /  RELEASE to fall',
        tap: 'tap / click / space',
        musicOn: 'MUSIC ON',     musicOff: 'MUSIC OFF',
        fxOn: 'FX ON',           fxOff: 'FX OFF',
        today: 'TODAY',          allTime: 'ALL TIME',
        day: 'DAY STREAK',       ship: 'SHIP',
        best: 'BEST',
        dead: 'DEAD',
        newBest: 'new best!',    newDailyBest: 'new daily best!',
        top5: 'TOP 5',
        vsLast: 'vs last',
        coin: 'coin',            coins: 'coins',
        close: 'close',          combo: 'combo',
        unlocked: 'UNLOCKED!',
        home: 'HOME',            playAgain: 'PLAY AGAIN',
        language: 'LANGUAGE',
        toSkin: 'to',
        notifClose: '+CLOSE',
    },
    de: {
        name: 'Deutsch',
        hold: 'HALTEN = steigen  /  LOSLASSEN = fallen',
        tap: 'Tippen / Klicken / Leertaste',
        musicOn: 'MUSIK AN',     musicOff: 'MUSIK AUS',
        fxOn: 'TON AN',          fxOff: 'TON AUS',
        today: 'HEUTE',          allTime: 'GESAMT',
        day: 'TAGE SERIE',       ship: 'SCHIFF',
        best: 'BEST',
        dead: 'TOT',
        newBest: 'neuer Rekord!', newDailyBest: 'Tagesrekord!',
        top5: 'TOP 5',
        vsLast: 'vs letzter',
        coin: 'Coin',            coins: 'Coins',
        close: 'knapp',          combo: 'Kombo',
        unlocked: 'FREIGESCHALTET!',
        home: 'MENU',            playAgain: 'NOCHMAL',
        language: 'SPRACHE',
        toSkin: 'bis',
        notifClose: '+KNAPP',
    },
    fr: {
        name: 'Francais',
        hold: "MAINTENIR = monter  /  RELACHER = descendre",
        tap: 'Toucher / Cliquer / Espace',
        musicOn: 'MUSIQUE ON',   musicOff: 'MUSIQUE OFF',
        fxOn: 'SON ON',          fxOff: 'SON OFF',
        today: "AUJOURD'HUI",    allTime: 'RECORD',
        day: 'JOURS SERIE',      ship: 'VAISSEAU',
        best: 'BEST',
        dead: 'MORT',
        newBest: 'nouveau record!', newDailyBest: 'record du jour!',
        top5: 'TOP 5',
        vsLast: 'vs dernier',
        coin: 'gemme',           coins: 'gemmes',
        close: 'pres',           combo: 'combo',
        unlocked: 'DEBLOQUE!',
        home: 'ACCUEIL',         playAgain: 'REJOUER',
        language: 'LANGUE',
        toSkin: 'pour',
        notifClose: '+PRES',
    },
    it: {
        name: 'Italiano',
        hold: 'TIENI = sale  /  RILASCIA = scende',
        tap: 'Tocca / Clicca / Spazio',
        musicOn: 'MUSICA ON',    musicOff: 'MUSICA OFF',
        fxOn: 'SUONI ON',        fxOff: 'SUONI OFF',
        today: 'OGGI',           allTime: 'RECORD',
        day: 'GIORNI SERIE',     ship: 'NAVE',
        best: 'BEST',
        dead: 'MORTO',
        newBest: 'nuovo record!', newDailyBest: 'record del giorno!',
        top5: 'TOP 5',
        vsLast: 'vs ultimo',
        coin: 'gemma',           coins: 'gemme',
        close: 'vicino',         combo: 'combo',
        unlocked: 'SBLOCCATO!',
        home: 'HOME',            playAgain: 'RIPROVA',
        language: 'LINGUA',
        toSkin: 'a',
        notifClose: '+VICINO',
    },
    es: {
        name: 'Espanol',
        hold: 'MANTEN = sube  /  SUELTA = baja',
        tap: 'Toca / Haz clic / Espacio',
        musicOn: 'MUSICA ON',    musicOff: 'MUSICA OFF',
        fxOn: 'SONIDO ON',       fxOff: 'SONIDO OFF',
        today: 'HOY',            allTime: 'RECORD',
        day: 'DIAS RACHA',       ship: 'NAVE',
        best: 'BEST',
        dead: 'MUERTO',
        newBest: 'nuevo record!', newDailyBest: 'record del dia!',
        top5: 'TOP 5',
        vsLast: 'vs ultimo',
        coin: 'gema',            coins: 'gemas',
        close: 'cerca',          combo: 'combo',
        unlocked: 'DESBLOQUEADO!',
        home: 'INICIO',          playAgain: 'OTRA VEZ',
        language: 'IDIOMA',
        toSkin: 'para',
        notifClose: '+CERCA',
    },
};

const LANG_ORDER = ['en', 'de', 'fr', 'it', 'es'];

function detectLang() {
    const nav = ((navigator.language || navigator.userLanguage) || 'en').slice(0, 2).toLowerCase();
    return LANG_ORDER.includes(nav) ? nav : 'en';
}

let activeLang = localStorage.getItem('tunnel_lang') || detectLang();
let T = LANGS[activeLang] || LANGS.en;

function setLang(code) {
    activeLang = code;
    T = LANGS[code] || LANGS.en;
    localStorage.setItem('tunnel_lang', code);
}
