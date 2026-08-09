# THINKART — Project Context (Handoff Doc)

מסמך זה נכתב כדי להעביר את כל ההקשר מהעבודה שנעשתה עם Claude ב-Cowork, כך שתוכל להמשיך לעבוד על הפרויקט מ-Claude Code בלי לאבד רקע.

## מה זה הפרויקט

**THINKART** — חברת אוצרות אמנות אישית לבתים ומשרדים. הפרויקט כולל:

1. **אתר תדמית רב-לשוני** בתיקיית `website/` — HTML/CSS/JS סטטי טהור, בלי build tooling ובלי backend.
2. **כלי המרת מקלדת עברית↔אנגלית** — `keyboard-converter.html` בשורש התיקייה. כלי עצמאי, **לא** מקושר לאתר THINKART בשום מקום (זו הייתה דרישה מפורשת).
3. **חוברות PDF** (עברית + אנגלית) שנוצרו מתוכן האתר — `THINKART-brochure-HE.pdf` / `THINKART-brochure-EN.pdf`.

## מבנה תיקיית website/

```
website/
├── index.html / index-en.html          ← דף הבית (עברית/אנגלית)
├── about.html / about-en.html          ← אודות
├── services.html / services-en.html    ← שירותים
├── gallery.html / gallery-en.html      ← גלריה
├── contact.html / contact-en.html      ← צור קשר
├── style.css                           ← עברית/RTL
├── style-en.css                        ← אנגלית/LTR (מראה מלא עם היפוכים פיזיים ל-left/right)
├── script.js                           ← ניווט מובייל, פילטר גלריה, scroll-reveal
├── images/                             ← 13 תמונות אמיתיות של הלקוח (לא stock)
└── thinkart-landing.html               ← גרסה ישנה חד-עמודית, לא בשימוש, נשארה בגיט
```

**כל 10 הדפים קיימים כרגע בשתי שפות** (עברית + אנגלית), עם ניווט עקבי בתוך כל שפה — כלומר בעברית כל הקישורים מובילים לדפי עברית, ובאנגלית כל הקישורים מובילים לדפי -en. כפתור השפה (EN/עב) בכל דף מוביל לגרסה המקבילה **של אותו עמוד** בשפה השנייה (לא תמיד לדף הבית).

## החלטות עיצוב חשובות (רקע היסטורי)

- **מינימליזם בהשראת akicreate.com**: בהתחלה נבנה עיצוב עם מרקיזות (marquee tickers) ומילים מפוזרות ברקע ה-hero, אבל אחרי שהמשתמש שלח screenshot אמיתי של akicreate.com התברר שהעיצוב שם הרבה יותר מינימלי. תוקן: hero הבית עבר לגרסה נקייה — לוגו גדול ממורכז, תגית קטנה, טאגליין, וכפתור CTA יחיד. כל המילים המפוזרות והעמודות הצדדיות הוסרו.
- **המרקיזה (marquee) הוסרה** גם מהדפים הפנימיים (about/services/gallery/contact) בהתאם לכיוון המינימלי — ה-CSS `.marquee-wrap` עדיין קיים ב-style.css/style-en.css אך לא בשימוש באף דף יותר.
- **באג קריטי שחזר פעמיים**: אלמנטים עם קלאס `.reveal` הוסתרו לגמרי (`opacity:0`) אם JavaScript לא רץ בדפדפן. **התיקון**: `.reveal` חייב תמיד להיות גלוי כברירת מחדל ב-CSS; JS מוסיף קלאס `pre-hide` רק לאלמנטים מתחת לקפל (below the fold), ורק דרך IntersectionObserver עם feature detection ו-try/catch שמחזיר הכל לגלוי אם יש שגיאה. **אם מוסיפים אנימציית reveal חדשה — לשמור על הכלל הזה בקפדנות**, אחרת התוכן ייעלם למשתמשים.
- **צבעים**: `--black`, `--white`, `--grey`, `--light-grey`, `--line`, `--accent` (זהב `#b08d57`).
- **פונטים**: Google Fonts — `Assistant` (sans, לגוף) ו-`Frank Ruhl Libre` (serif, לכותרות).

## הוראת עבודה קבועה מהמשתמש

> "שאתה עושה שינויים תעשה אותם בכול השפות באתר"

כל שינוי תוכן/עיצוב חייב להתבצע בגרסה העברית **וגם** באנגלית של אותו דף.

## סטטוס Git ו-Deploy

- Git repo מאותחל ב-`website/.git`, branch `main`.
- קומיטים עד כה (מהישן לחדש):
  1. Initial commit — כל האתר.
  2. הסרת המרקיזה מהדפים הפנימיים.
  3. הוספת קישור EN בדפים הפנימיים.
  4. הוספת גרסאות אנגלית ל-about/services/gallery/contact + תיקון ניווט.
  5. תיקון קישור שגוי ב-hero של index-en.html.
- **טרם נעשה**: push ל-GitHub, יצירת פרויקט ב-Vercel, וחיבור הדומיין שהמשתמש קנה — **www.wethinkart.com**.
- ההוראות המלאות ל-deploy (GitHub → Vercel → DNS) כבר נמסרו למשתמש בשיחה הקודמת וניתן לבקש ממנו לשחזר אותן אם צריך, או שאני (Claude Code) יכול לספק אותן מחדש: יצירת repo ב-GitHub, `git remote add origin` + `git push`, ייבוא הפרויקט ב-Vercel (Framework: Other, Root: `.`), הוספת דומיין ב-Vercel Settings → Domains, והגדרת רשומות DNS (A record `76.76.21.21` לדומיין הראשי, CNAME `cname.vercel-dns.com` ל-www — אך יש לוודא מול הערכים המדויקים שVercel מציג בפועל).

⚠️ **הערת סביבה**: בתוך ה-`.git` בתיקייה הזו נוצרים לפעמים קובצי lock ישנים (`index.lock`, `HEAD.lock`) שלא ניתן למחוק אותם ישירות — אם נתקלים ב"Unable to create index.lock: File exists", פשוט למחוק את הקובץ (`rm .git/index.lock`) ולנסות שוב.

## נושאים פתוחים / לא הושלמו

1. **Deploy בפועל** — טרם בוצע push ל-GitHub ו-deploy ב-Vercel עם הדומיין.
2. קובץ `thinkart-landing.html` הישן עדיין קיים בתיקייה ובגיט (גרסה חד-עמודית לא בשימוש) — לא הוסר, ניתן לשקול ניקוי.
3. חוברות ה-PDF (HE/EN) נוצרו עם פונטים חלופיים (DejaVu Serif/Sans) כי Google Fonts חסום ברשת של סביבת ה-sandbox — אם רוצים פונטים מדויקים (Assistant/Frank Ruhl Libre) יש להוריד את קובצי ה-TTF ולהטמיע אותם ידנית.

## כלים נלווים (לא חלק מהאתר)

- `keyboard-converter.html` — ממיר מקלדת עברית↔אנגלית (SI-1452), עצמאי לגמרי, לא מקושר לאתר.
