#!/usr/bin/env node
/**
 * Patch App Store–live copy for zuli-collage, timesince, geo-calc locale overlays.
 * Also clears blank store URLs (merge inherits EN) and syncs trailing FAQ/screenshot gaps.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = ['ar', 'de', 'es', 'fr', 'he', 'it', 'ja', 'ko', 'pt', 'ru', 'zh'];

/** @type {Record<string, Record<string, { badge: string, metaDescription: string, structuredDataDescription?: string, downloadDescription: string, googlePlaySoon: string, statusTitle: string, statusDescription: string, statusValue: string, playLinkDescription: string, faqWhat?: string, faqDownloadQ?: string, faqDownloadA?: string }>>} */
const COPY = {
  'zuli-collage': {
    ar: {
      badge: 'مجاني على App Store · Android قريباً',
      metaDescription:
        'اجمع من 2 إلى 10 صور مع التخطيطات والمرشحات والملصقات. تحرير على الجهاز. مجاني على App Store؛ Android قريباً.',
      structuredDataDescription:
        'Zuli Collage — صانع كولاج للصور على iOS. أنشئ كولاجات جميلة من 2–10 صور في ثوانٍ. تخطيطات ومرشحات ونص و48 ملصق Zuli Monsters. مجاني على App Store؛ Android قريباً. بدون حساب. الحزمة com.zuki.apps.collagio.',
      downloadDescription:
        'أنشئ كولاجات جميلة مع التخطيطات والمرشحات وملصقات Zuli Monsters. مجاني على iOS اليوم؛ Android قريباً.',
      googlePlaySoon: 'قريباً على Google Play',
      statusTitle: 'متوفر الآن',
      statusDescription: 'Zuli Collage متوفر على App Store. Google Play قريباً.',
      statusValue: 'App Store (iOS) · Google Play قريباً',
      playLinkDescription: 'قريباً على Google Play لأجهزة Android',
      faqWhat:
        'Zuli Collage هو صانع كولاج للصور على iOS (Android قريباً). اختر من 2 إلى 10 صور، اختر تخطيطاً، زيّن بالمرشحات والملصقات، ثم احفظ أو شارك — عادة في أقل من 30 ثانية.',
      faqDownloadQ: 'من أين أحمل Zuli Collage؟',
      faqDownloadA:
        'Zuli Collage مجاني على App Store لـ iPhone و iPad. Google Play لأندرويد قريباً.',
    },
    de: {
      badge: 'Kostenlos im App Store · Android folgt',
      metaDescription:
        'Kombinieren Sie 2–10 Fotos mit Layouts, Filtern & Stickern. Bearbeitung auf dem Gerät. Kostenlos im App Store; Android folgt.',
      structuredDataDescription:
        'Zuli Collage — Foto-Collage-Maker für iOS. Schöne Collagen aus 2–10 Bildern in Sekunden. Layouts, Filter, Text und 48 Zuli-Monsters-Sticker. Kostenlos im App Store; Android folgt. Kein Konto nötig. Paket com.zuki.apps.collagio.',
      downloadDescription:
        'Erstellen Sie schöne Collagen mit Layouts, Filtern und Zuli-Monsters-Stickern. Heute kostenlos für iOS; Android folgt.',
      googlePlaySoon: 'Demnächst bei Google Play',
      statusTitle: 'Jetzt verfügbar',
      statusDescription: 'Zuli Collage ist im App Store erhältlich. Google Play folgt in Kürze.',
      statusValue: 'App Store (iOS) · Google Play folgt',
      playLinkDescription: 'Demnächst bei Google Play für Android',
      faqWhat:
        'Zuli Collage ist ein Foto-Collage-Maker für iOS (Android folgt). Wählen Sie 2–10 Fotos, Layout, Filter und Sticker, dann speichern oder teilen — meist unter 30 Sekunden.',
      faqDownloadQ: 'Wo kann ich Zuli Collage herunterladen?',
      faqDownloadA:
        'Zuli Collage ist kostenlos im App Store für iPhone und iPad. Google Play für Android folgt in Kürze.',
    },
    es: {
      badge: 'Gratis en App Store · Android pronto',
      metaDescription:
        'Combina de 2 a 10 fotos con diseños, filtros y pegatinas. Edición en el dispositivo. Gratis en App Store; Android pronto.',
      structuredDataDescription:
        'Zuli Collage — creador de collages para iOS. Crea collages bonitos con 2–10 fotos en segundos. Diseños, filtros, texto y 48 pegatinas Zuli Monsters. Gratis en App Store; Android pronto. Sin cuenta. Paquete com.zuki.apps.collagio.',
      downloadDescription:
        'Crea collages bonitos con diseños, filtros y pegatinas Zuli Monsters. Gratis en iOS hoy; Android pronto.',
      googlePlaySoon: 'Próximamente en Google Play',
      statusTitle: 'Disponible ahora',
      statusDescription: 'Zuli Collage ya está en el App Store. Google Play llegará pronto.',
      statusValue: 'App Store (iOS) · Google Play pronto',
      playLinkDescription: 'Próximamente en Google Play para Android',
      faqWhat:
        'Zuli Collage es un creador de collages para iOS (Android pronto). Elige 2–10 fotos, un diseño, filtros y pegatinas, luego guarda o comparte — suele tardar menos de 30 segundos.',
      faqDownloadQ: '¿Dónde puedo descargar Zuli Collage?',
      faqDownloadA:
        'Zuli Collage es gratis en el App Store para iPhone e iPad. Google Play para Android llegará pronto.',
    },
    fr: {
      badge: 'Gratuit sur l’App Store · Android bientôt',
      metaDescription:
        'Combinez 2 à 10 photos avec mises en page, filtres et stickers. Édition sur l’appareil. Gratuit sur l’App Store ; Android bientôt.',
      structuredDataDescription:
        'Zuli Collage — créateur de collages photo pour iOS. Créez de beaux collages avec 2–10 photos en quelques secondes. Mises en page, filtres, texte et 48 stickers Zuli Monsters. Gratuit sur l’App Store ; Android bientôt. Sans compte. Paquet com.zuki.apps.collagio.',
      downloadDescription:
        'Créez de beaux collages avec mises en page, filtres et stickers Zuli Monsters. Gratuit sur iOS dès aujourd’hui ; Android bientôt.',
      googlePlaySoon: 'Bientôt sur Google Play',
      statusTitle: 'Disponible maintenant',
      statusDescription: 'Zuli Collage est disponible sur l’App Store. Google Play arrive bientôt.',
      statusValue: 'App Store (iOS) · Google Play bientôt',
      playLinkDescription: 'Bientôt sur Google Play pour Android',
      faqWhat:
        'Zuli Collage est un créateur de collages photo pour iOS (Android bientôt). Choisissez 2–10 photos, une mise en page, filtres et stickers, puis enregistrez ou partagez — souvent en moins de 30 secondes.',
      faqDownloadQ: 'Où télécharger Zuli Collage ?',
      faqDownloadA:
        'Zuli Collage est gratuit sur l’App Store pour iPhone et iPad. Google Play pour Android arrive bientôt.',
    },
    he: {
      badge: 'בחינם ב‑App Store · Android בקרוב',
      metaDescription:
        'שלבו 2–10 תמונות עם פריסות, פילטרים ומדבקות. עריכה במכשיר. בחינם ב‑App Store; Android בקרוב.',
      structuredDataDescription:
        'Zuli Collage — יוצר קולאז׳ים ל‑iOS. יצירת קולאז׳ים יפים מ‑2–10 תמונות תוך שניות. פריסות, פילטרים, טקסט ו‑48 מדבקות Zuli Monsters. בחינם ב‑App Store; Android בקרוב. בלי חשבון. החבילה com.zuki.apps.collagio.',
      downloadDescription:
        'צרו קולאז׳ים יפים עם פריסות, פילטרים ומדבקות Zuli Monsters. בחינם ב‑iOS היום; Android בקרוב.',
      googlePlaySoon: 'בקרוב ב‑Google Play',
      statusTitle: 'זמין עכשיו',
      statusDescription: 'Zuli Collage זמין ב‑App Store. Google Play בקרוב.',
      statusValue: 'App Store (iOS) · Google Play בקרוב',
      playLinkDescription: 'בקרוב ב‑Google Play לאנדרואיד',
      faqWhat:
        'Zuli Collage הוא יוצר קולאז׳ים ל‑iOS (Android בקרוב). בחרו 2–10 תמונות, פריסה, פילטרים ומדבקות, ואז שמרו או שתפו — בדרך כלל בפחות מ‑30 שניות.',
      faqDownloadQ: 'איפה אפשר להוריד את Zuli Collage?',
      faqDownloadA:
        'Zuli Collage בחינם ב‑App Store ל‑iPhone ו‑iPad. Google Play לאנדרואיד בקרוב.',
    },
    it: {
      badge: 'Gratis sull’App Store · Android in arrivo',
      metaDescription:
        'Combina 2–10 foto con layout, filtri e adesivi. Modifica sul dispositivo. Gratis sull’App Store; Android in arrivo.',
      structuredDataDescription:
        'Zuli Collage — creatore di collage per iOS. Crea collage belli da 2–10 foto in pochi secondi. Layout, filtri, testo e 48 adesivi Zuli Monsters. Gratis sull’App Store; Android in arrivo. Nessun account. Pacchetto com.zuki.apps.collagio.',
      downloadDescription:
        'Crea collage belli con layout, filtri e adesivi Zuli Monsters. Gratis su iOS oggi; Android in arrivo.',
      googlePlaySoon: 'Presto su Google Play',
      statusTitle: 'Disponibile ora',
      statusDescription: 'Zuli Collage è disponibile sull’App Store. Google Play arriverà presto.',
      statusValue: 'App Store (iOS) · Google Play in arrivo',
      playLinkDescription: 'Presto su Google Play per Android',
      faqWhat:
        'Zuli Collage è un creatore di collage per iOS (Android in arrivo). Seleziona 2–10 foto, un layout, filtri e adesivi, poi salva o condividi — di solito in meno di 30 secondi.',
      faqDownloadQ: 'Dove posso scaricare Zuli Collage?',
      faqDownloadA:
        'Zuli Collage è gratis sull’App Store per iPhone e iPad. Google Play per Android arriverà presto.',
    },
    ja: {
      badge: 'App Storeで無料 · Androidはまもなく',
      metaDescription:
        '2〜10枚の写真をレイアウト・フィルター・ステッカーで組み合わせ。端末内編集。App Storeで無料、Androidはまもなく。',
      structuredDataDescription:
        'Zuli Collage — iOS向けフォトコラージュ作成アプリ。2〜10枚の写真から数秒で美しいコラージュを作成。レイアウト、フィルター、テキスト、48種のZuli Monstersステッカー。App Storeで無料、Androidはまもなく。アカウント不要。パッケージ com.zuki.apps.collagio。',
      downloadDescription:
        'レイアウト、フィルター、Zuli Monstersステッカーで美しいコラージュを作成。今日からiOSで無料、Androidはまもなく。',
      googlePlaySoon: 'Google Playまもなく公開',
      statusTitle: '配信中',
      statusDescription: 'Zuli CollageはApp Storeで配信中です。Google Playはまもなく公開予定です。',
      statusValue: 'App Store（iOS）· Google Playまもなく',
      playLinkDescription: 'Android向けGoogle Playはまもなく公開',
      faqWhat:
        'Zuli CollageはiOS向けフォトコラージュアプリです（Androidはまもなく）。2〜10枚の写真を選び、レイアウト・フィルター・ステッカーを加えて保存または共有 — 通常30秒以内。',
      faqDownloadQ: 'Zuli Collageはどこからダウンロードできますか？',
      faqDownloadA:
        'Zuli CollageはiPhone / iPad向けApp Storeで無料です。Android向けGoogle Playはまもなく公開予定です。',
    },
    ko: {
      badge: 'App Store에서 무료 · Android 곧 출시',
      metaDescription:
        '2~10장의 사진을 레이아웃, 필터, 스티커로 조합하세요. 기기 내 편집. App Store에서 무료, Android 곧 출시.',
      structuredDataDescription:
        'Zuli Collage — iOS용 포토 콜라주 메이커. 2~10장 사진으로 몇 초 만에 멋진 콜라주 제작. 레이아웃, 필터, 텍스트, Zuli Monsters 스티커 48종. App Store에서 무료, Android 곧 출시. 계정 불필요. 패키지 com.zuki.apps.collagio.',
      downloadDescription:
        '레이아웃, 필터, Zuli Monsters 스티커로 멋진 콜라주를 만드세요. 오늘 iOS에서 무료, Android 곧 출시.',
      googlePlaySoon: '곧 Google Play 출시',
      statusTitle: '지금 이용 가능',
      statusDescription: 'Zuli Collage는 App Store에서 이용할 수 있습니다. Google Play는 곧 출시됩니다.',
      statusValue: 'App Store (iOS) · Google Play 곧 출시',
      playLinkDescription: 'Android용 Google Play 곧 출시',
      faqWhat:
        'Zuli Collage는 iOS용 포토 콜라주 메이커입니다(Android 곧 출시). 사진 2~10장을 고르고 레이아웃·필터·스티커를 적용한 뒤 저장 또는 공유 — 보통 30초 이내.',
      faqDownloadQ: 'Zuli Collage는 어디서 다운로드하나요?',
      faqDownloadA:
        'Zuli Collage는 iPhone 및 iPad용 App Store에서 무료입니다. Android용 Google Play는 곧 출시됩니다.',
    },
    pt: {
      badge: 'Grátis na App Store · Android em breve',
      metaDescription:
        'Combine 2–10 fotos com layouts, filtros e adesivos. Edição no dispositivo. Grátis na App Store; Android em breve.',
      structuredDataDescription:
        'Zuli Collage — criador de colagens para iOS. Crie colagens bonitas com 2–10 fotos em segundos. Layouts, filtros, texto e 48 adesivos Zuli Monsters. Grátis na App Store; Android em breve. Sem conta. Pacote com.zuki.apps.collagio.',
      downloadDescription:
        'Crie colagens bonitas com layouts, filtros e adesivos Zuli Monsters. Grátis no iOS hoje; Android em breve.',
      googlePlaySoon: 'Em breve no Google Play',
      statusTitle: 'Disponível agora',
      statusDescription: 'Zuli Collage já está na App Store. O Google Play chega em breve.',
      statusValue: 'App Store (iOS) · Google Play em breve',
      playLinkDescription: 'Em breve no Google Play para Android',
      faqWhat:
        'Zuli Collage é um criador de colagens para iOS (Android em breve). Escolha 2–10 fotos, um layout, filtros e adesivos, depois guarde ou partilhe — normalmente em menos de 30 segundos.',
      faqDownloadQ: 'Onde posso descarregar o Zuli Collage?',
      faqDownloadA:
        'Zuli Collage é grátis na App Store para iPhone e iPad. O Google Play para Android chega em breve.',
    },
    ru: {
      badge: 'Бесплатно в App Store · Android скоро',
      metaDescription:
        'Объединяйте 2–10 фото с макетами, фильтрами и стикерами. Редактирование на устройстве. Бесплатно в App Store; Android скоро.',
      structuredDataDescription:
        'Zuli Collage — создатель фотоколлажей для iOS. Красивые коллажи из 2–10 фото за секунды. Макеты, фильтры, текст и 48 стикеров Zuli Monsters. Бесплатно в App Store; Android скоро. Без аккаунта. Пакет com.zuki.apps.collagio.',
      downloadDescription:
        'Создавайте красивые коллажи с макетами, фильтрами и стикерами Zuli Monsters. Бесплатно на iOS сегодня; Android скоро.',
      googlePlaySoon: 'Скоро в Google Play',
      statusTitle: 'Уже доступно',
      statusDescription: 'Zuli Collage уже в App Store. Google Play скоро.',
      statusValue: 'App Store (iOS) · Google Play скоро',
      playLinkDescription: 'Скоро в Google Play для Android',
      faqWhat:
        'Zuli Collage — создатель фотоколлажей для iOS (Android скоро). Выберите 2–10 фото, макет, фильтры и стикеры, затем сохраните или поделитесь — обычно менее чем за 30 секунд.',
      faqDownloadQ: 'Где скачать Zuli Collage?',
      faqDownloadA:
        'Zuli Collage бесплатно в App Store для iPhone и iPad. Google Play для Android скоро.',
    },
    zh: {
      badge: 'App Store 免费 · Android 即将推出',
      metaDescription:
        '将 2–10 张照片与布局、滤镜和贴纸组合。设备端编辑。App Store 免费；Android 即将推出。',
      structuredDataDescription:
        'Zuli Collage — iOS 照片拼贴应用。用 2–10 张照片几秒内创建精美拼贴。布局、滤镜、文字与 48 个 Zuli Monsters 贴纸。App Store 免费；Android 即将推出。无需账户。软件包 com.zuki.apps.collagio。',
      downloadDescription:
        '用布局、滤镜和 Zuli Monsters 贴纸创建精美拼贴。即日起 iOS 免费；Android 即将推出。',
      googlePlaySoon: '即将登陆 Google Play',
      statusTitle: '现已上线',
      statusDescription: 'Zuli Collage 已在 App Store 上线。Google Play 即将推出。',
      statusValue: 'App Store (iOS) · Google Play 即将推出',
      playLinkDescription: 'Android 版 Google Play 即将推出',
      faqWhat:
        'Zuli Collage 是面向 iOS 的照片拼贴应用（Android 即将推出）。选择 2–10 张照片、布局、滤镜和贴纸，然后保存或分享 — 通常不到 30 秒。',
      faqDownloadQ: '在哪里下载 Zuli Collage？',
      faqDownloadA:
        'Zuli Collage 在 iPhone 和 iPad 的 App Store 免费提供。Android 的 Google Play 即将推出。',
    },
  },
  timesince: {
    ar: {
      badge: 'متوفر على App Store · Android قريباً',
      metaDescription:
        'تتبّع سلاسل الإقلاع والبناء بعدّادات أيام مباشرة وحلقات أهداف وأدوات ومشاركة. مجاني على iOS؛ Android قريباً.',
      downloadDescription:
        'تتبّع سلاسل الإقلاع والبناء مع حلقات الأهداف والأدوات وبطاقات المشاركة. مجاني على iOS اليوم؛ Android قريباً.',
      googlePlaySoon: 'قريباً على Google Play',
      statusTitle: 'التوفّر',
      statusDescription: 'Time Since: Streak Tracker متوفر على App Store. Google Play لأندرويد قريباً.',
      statusValue: 'App Store (iOS) · Google Play قريباً',
      playLinkDescription: 'قريباً على Google Play لأجهزة Android',
    },
    de: {
      badge: 'Im App Store · Android folgt',
      metaDescription:
        'Quit- und Build-Streaks mit Live-Tageszählern, Zielringen, Widgets und Share-Cards. Kostenlos auf iOS; Android folgt.',
      downloadDescription:
        'Verfolgen Sie Quit- und Build-Streaks mit Zielringen, Widgets und Share-Cards. Heute kostenlos auf iOS; Android folgt.',
      googlePlaySoon: 'Demnächst bei Google Play',
      statusTitle: 'Verfügbarkeit',
      statusDescription:
        'Time Since: Streak Tracker ist im App Store erhältlich. Google Play für Android folgt in Kürze.',
      statusValue: 'App Store (iOS) · Google Play folgt',
      playLinkDescription: 'Demnächst bei Google Play für Android',
    },
    es: {
      badge: 'En App Store · Android pronto',
      metaDescription:
        'Sigue rachas de dejar y construir con contadores en vivo, anillos de meta, widgets y tarjetas. Gratis en iOS; Android pronto.',
      downloadDescription:
        'Sigue rachas de dejar y construir con anillos de meta, widgets y tarjetas para compartir. Gratis en iOS hoy; Android pronto.',
      googlePlaySoon: 'Próximamente en Google Play',
      statusTitle: 'Disponibilidad',
      statusDescription:
        'Time Since: Streak Tracker ya está en el App Store. Google Play para Android llegará pronto.',
      statusValue: 'App Store (iOS) · Google Play pronto',
      playLinkDescription: 'Próximamente en Google Play para Android',
    },
    fr: {
      badge: 'Sur l’App Store · Android bientôt',
      metaDescription:
        'Suivez vos séries abandon/construction avec compteurs live, anneaux d’objectif, widgets et cartes. Gratuit sur iOS ; Android bientôt.',
      downloadDescription:
        'Suivez vos séries avec anneaux d’objectif, widgets et cartes à partager. Gratuit sur iOS dès aujourd’hui ; Android bientôt.',
      googlePlaySoon: 'Bientôt sur Google Play',
      statusTitle: 'Disponibilité',
      statusDescription:
        'Time Since: Streak Tracker est disponible sur l’App Store. Google Play pour Android arrive bientôt.',
      statusValue: 'App Store (iOS) · Google Play bientôt',
      playLinkDescription: 'Bientôt sur Google Play pour Android',
    },
    he: {
      badge: 'ב‑App Store · Android בקרוב',
      metaDescription:
        'עקבו אחרי רצפי הפסקה ובנייה עם מונים חיים, טבעות יעד, ווידג׳טים וכרטיסי שיתוף. בחינם ב‑iOS; Android בקרוב.',
      downloadDescription:
        'עקבו אחרי רצפי הפסקה ובנייה עם טבעות יעד, ווידג׳טים וכרטיסי שיתוף. בחינם ב‑iOS היום; Android בקרוב.',
      googlePlaySoon: 'בקרוב ב‑Google Play',
      statusTitle: 'זמינות',
      statusDescription: 'Time Since: Streak Tracker זמין ב‑App Store. Google Play לאנדרואיד בקרוב.',
      statusValue: 'App Store (iOS) · Google Play בקרוב',
      playLinkDescription: 'בקרוב ב‑Google Play לאנדרואיד',
    },
    it: {
      badge: 'Su App Store · Android in arrivo',
      metaDescription:
        'Monitora streak di smettere e costruire con contatori live, anelli obiettivo, widget e card. Gratis su iOS; Android in arrivo.',
      downloadDescription:
        'Monitora streak con anelli obiettivo, widget e card da condividere. Gratis su iOS oggi; Android in arrivo.',
      googlePlaySoon: 'Presto su Google Play',
      statusTitle: 'Disponibilità',
      statusDescription:
        'Time Since: Streak Tracker è disponibile sull’App Store. Google Play per Android arriverà presto.',
      statusValue: 'App Store (iOS) · Google Play in arrivo',
      playLinkDescription: 'Presto su Google Play per Android',
    },
    ja: {
      badge: 'App Store配信中 · Androidはまもなく',
      metaDescription:
        'やめる／続けるストリークをライブ日数・目標リング・ウィジェット・共有カードで記録。iOS無料、Androidはまもなく。',
      downloadDescription:
        '目標リング、ウィジェット、共有カードでストリークを記録。今日からiOSで無料、Androidはまもなく。',
      googlePlaySoon: 'Google Playまもなく公開',
      statusTitle: '提供状況',
      statusDescription:
        'Time Since: Streak TrackerはApp Storeで配信中です。Android向けGoogle Playはまもなく公開予定です。',
      statusValue: 'App Store（iOS）· Google Playまもなく',
      playLinkDescription: 'Android向けGoogle Playはまもなく公開',
    },
    ko: {
      badge: 'App Store 출시 · Android 곧 출시',
      metaDescription:
        '끊기/쌓기 스트릭을 실시간 일수, 목표 링, 위젯, 공유 카드로 추적. iOS 무료, Android 곧 출시.',
      downloadDescription:
        '목표 링, 위젯, 공유 카드로 스트릭을 추적하세요. 오늘 iOS에서 무료, Android 곧 출시.',
      googlePlaySoon: '곧 Google Play 출시',
      statusTitle: '제공 현황',
      statusDescription:
        'Time Since: Streak Tracker는 App Store에서 이용할 수 있습니다. Android용 Google Play는 곧 출시됩니다.',
      statusValue: 'App Store (iOS) · Google Play 곧 출시',
      playLinkDescription: 'Android용 Google Play 곧 출시',
    },
    pt: {
      badge: 'Na App Store · Android em breve',
      metaDescription:
        'Acompanhe streaks de parar e construir com contadores ao vivo, anéis de meta, widgets e cartões. Grátis no iOS; Android em breve.',
      downloadDescription:
        'Acompanhe streaks com anéis de meta, widgets e cartões para partilhar. Grátis no iOS hoje; Android em breve.',
      googlePlaySoon: 'Em breve no Google Play',
      statusTitle: 'Disponibilidade',
      statusDescription:
        'Time Since: Streak Tracker já está na App Store. O Google Play para Android chega em breve.',
      statusValue: 'App Store (iOS) · Google Play em breve',
      playLinkDescription: 'Em breve no Google Play para Android',
    },
    ru: {
      badge: 'В App Store · Android скоро',
      metaDescription:
        'Отслеживайте серии отказа и роста с живыми счётчиками дней, кольцами целей, виджетами и карточками. Бесплатно на iOS; Android скоро.',
      downloadDescription:
        'Отслеживайте серии с кольцами целей, виджетами и карточками. Бесплатно на iOS сегодня; Android скоро.',
      googlePlaySoon: 'Скоро в Google Play',
      statusTitle: 'Доступность',
      statusDescription:
        'Time Since: Streak Tracker уже в App Store. Google Play для Android скоро.',
      statusValue: 'App Store (iOS) · Google Play скоро',
      playLinkDescription: 'Скоро в Google Play для Android',
    },
    zh: {
      badge: '已上架 App Store · Android 即将推出',
      metaDescription:
        '用实时天数、目标环、小组件和分享卡片追踪戒断与养成连续记录。iOS 免费；Android 即将推出。',
      downloadDescription:
        '用目标环、小组件和分享卡片追踪连续记录。即日起 iOS 免费；Android 即将推出。',
      googlePlaySoon: '即将登陆 Google Play',
      statusTitle: '上架情况',
      statusDescription: 'Time Since: Streak Tracker 已在 App Store 上线。Android 的 Google Play 即将推出。',
      statusValue: 'App Store (iOS) · Google Play 即将推出',
      playLinkDescription: 'Android 版 Google Play 即将推出',
    },
  },
  'geo-calc': {
    ar: {
      badge: 'متوفر على App Store · Android قريباً',
      metaDescription:
        'محوّل WGS84 دون اتصال، مسافة Vincenty، قياس على الخريطة وتصدير GPX للمحترفين. مجاني على iOS؛ Android قريباً.',
      downloadDescription:
        'محوّل إحداثيات WGS84 دون اتصال، مسافة Vincenty، قياس على الخريطة وتصدير GPX للعمل الميداني. مجاني على iOS اليوم؛ Android قريباً.',
      googlePlaySoon: 'قريباً على Google Play',
      statusTitle: 'التوفّر',
      statusDescription: 'GEO Calc : Coordinates متوفر على App Store. Google Play لأندرويد قريباً.',
      statusValue: 'App Store (iOS) · Google Play قريباً',
      playLinkDescription: 'قريباً على Google Play لأجهزة Android',
    },
    de: {
      badge: 'Im App Store · Android folgt',
      metaDescription:
        'Offline-WGS84-Konverter, Vincenty-Distanz, Kartenmessung und GPX-Export für Profis. Kostenlos auf iOS; Android folgt.',
      downloadDescription:
        'Offline-WGS84-Koordinatenkonverter, Vincenty-Distanz, Kartenmessung und GPX-Export fürs Feld. Heute kostenlos auf iOS; Android folgt.',
      googlePlaySoon: 'Demnächst bei Google Play',
      statusTitle: 'Verfügbarkeit',
      statusDescription:
        'GEO Calc : Coordinates ist im App Store erhältlich. Google Play für Android folgt in Kürze.',
      statusValue: 'App Store (iOS) · Google Play folgt',
      playLinkDescription: 'Demnächst bei Google Play für Android',
    },
    es: {
      badge: 'En App Store · Android pronto',
      metaDescription:
        'Conversor WGS84 sin conexión, distancia Vincenty, medición en mapa y exportación GPX. Gratis en iOS; Android pronto.',
      downloadDescription:
        'Conversor de coordenadas WGS84 sin conexión, distancia Vincenty, medición en mapa y GPX para trabajo de campo. Gratis en iOS hoy; Android pronto.',
      googlePlaySoon: 'Próximamente en Google Play',
      statusTitle: 'Disponibilidad',
      statusDescription:
        'GEO Calc : Coordinates ya está en el App Store. Google Play para Android llegará pronto.',
      statusValue: 'App Store (iOS) · Google Play pronto',
      playLinkDescription: 'Próximamente en Google Play para Android',
    },
    fr: {
      badge: 'Sur l’App Store · Android bientôt',
      metaDescription:
        'Convertisseur WGS84 hors ligne, distance Vincenty, mesure carte et export GPX. Gratuit sur iOS ; Android bientôt.',
      downloadDescription:
        'Convertisseur de coordonnées WGS84 hors ligne, distance Vincenty, mesure carte et GPX pour le terrain. Gratuit sur iOS dès aujourd’hui ; Android bientôt.',
      googlePlaySoon: 'Bientôt sur Google Play',
      statusTitle: 'Disponibilité',
      statusDescription:
        'GEO Calc : Coordinates est disponible sur l’App Store. Google Play pour Android arrive bientôt.',
      statusValue: 'App Store (iOS) · Google Play bientôt',
      playLinkDescription: 'Bientôt sur Google Play pour Android',
    },
    he: {
      badge: 'ב‑App Store · Android בקרוב',
      metaDescription:
        'ממיר WGS84 אופליין, מרחק Vincenty, מדידה במפה וייצוא GPX למקצוענים. בחינם ב‑iOS; Android בקרוב.',
      downloadDescription:
        'ממיר קואורדינטות WGS84 אופליין, מרחק Vincenty, מדידה במפה וייצוא GPX לעבודת שטח. בחינם ב‑iOS היום; Android בקרוב.',
      googlePlaySoon: 'בקרוב ב‑Google Play',
      statusTitle: 'זמינות',
      statusDescription: 'GEO Calc : Coordinates זמין ב‑App Store. Google Play לאנדרואיד בקרוב.',
      statusValue: 'App Store (iOS) · Google Play בקרוב',
      playLinkDescription: 'בקרוב ב‑Google Play לאנדרואיד',
    },
    it: {
      badge: 'Su App Store · Android in arrivo',
      metaDescription:
        'Convertitore WGS84 offline, distanza Vincenty, misura mappa ed export GPX. Gratis su iOS; Android in arrivo.',
      downloadDescription:
        'Convertitore coordinate WGS84 offline, distanza Vincenty, misura mappa e GPX per il campo. Gratis su iOS oggi; Android in arrivo.',
      googlePlaySoon: 'Presto su Google Play',
      statusTitle: 'Disponibilità',
      statusDescription:
        'GEO Calc : Coordinates è disponibile sull’App Store. Google Play per Android arriverà presto.',
      statusValue: 'App Store (iOS) · Google Play in arrivo',
      playLinkDescription: 'Presto su Google Play per Android',
    },
    ja: {
      badge: 'App Store配信中 · Androidはまもなく',
      metaDescription:
        'オフラインWGS84変換、Vincenty距離、地図計測、GPX書き出し。iOS無料、Androidはまもなく。',
      downloadDescription:
        'オフラインWGS84座標変換、Vincenty距離、地図計測、現場向けGPX書き出し。今日からiOSで無料、Androidはまもなく。',
      googlePlaySoon: 'Google Playまもなく公開',
      statusTitle: '提供状況',
      statusDescription:
        'GEO Calc : CoordinatesはApp Storeで配信中です。Android向けGoogle Playはまもなく公開予定です。',
      statusValue: 'App Store（iOS）· Google Playまもなく',
      playLinkDescription: 'Android向けGoogle Playはまもなく公開',
    },
    ko: {
      badge: 'App Store 출시 · Android 곧 출시',
      metaDescription:
        '오프라인 WGS84 변환, Vincenty 거리, 지도 측정, GPX 내보내기. iOS 무료, Android 곧 출시.',
      downloadDescription:
        '오프라인 WGS84 좌표 변환, Vincenty 거리, 지도 측정, 현장용 GPX 내보내기. 오늘 iOS에서 무료, Android 곧 출시.',
      googlePlaySoon: '곧 Google Play 출시',
      statusTitle: '제공 현황',
      statusDescription:
        'GEO Calc : Coordinates는 App Store에서 이용할 수 있습니다. Android용 Google Play는 곧 출시됩니다.',
      statusValue: 'App Store (iOS) · Google Play 곧 출시',
      playLinkDescription: 'Android용 Google Play 곧 출시',
    },
    pt: {
      badge: 'Na App Store · Android em breve',
      metaDescription:
        'Conversor WGS84 offline, distância Vincenty, medição no mapa e exportação GPX. Grátis no iOS; Android em breve.',
      downloadDescription:
        'Conversor de coordenadas WGS84 offline, distância Vincenty, medição no mapa e GPX para campo. Grátis no iOS hoje; Android em breve.',
      googlePlaySoon: 'Em breve no Google Play',
      statusTitle: 'Disponibilidade',
      statusDescription:
        'GEO Calc : Coordinates já está na App Store. O Google Play para Android chega em breve.',
      statusValue: 'App Store (iOS) · Google Play em breve',
      playLinkDescription: 'Em breve no Google Play para Android',
    },
    ru: {
      badge: 'В App Store · Android скоро',
      metaDescription:
        'Офлайн-конвертер WGS84, расстояние Vincenty, измерение на карте и экспорт GPX. Бесплатно на iOS; Android скоро.',
      downloadDescription:
        'Офлайн-конвертер координат WGS84, расстояние Vincenty, измерение на карте и GPX для полевых работ. Бесплатно на iOS сегодня; Android скоро.',
      googlePlaySoon: 'Скоро в Google Play',
      statusTitle: 'Доступность',
      statusDescription:
        'GEO Calc : Coordinates уже в App Store. Google Play для Android скоро.',
      statusValue: 'App Store (iOS) · Google Play скоро',
      playLinkDescription: 'Скоро в Google Play для Android',
    },
    zh: {
      badge: '已上架 App Store · Android 即将推出',
      metaDescription:
        '离线 WGS84 转换、Vincenty 距离、地图测量与 GPX 导出。iOS 免费；Android 即将推出。',
      downloadDescription:
        '离线 WGS84 坐标转换、Vincenty 距离、地图测量与野外 GPX 导出。即日起 iOS 免费；Android 即将推出。',
      googlePlaySoon: '即将登陆 Google Play',
      statusTitle: '上架情况',
      statusDescription: 'GEO Calc : Coordinates 已在 App Store 上线。Android 的 Google Play 即将推出。',
      statusValue: 'App Store (iOS) · Google Play 即将推出',
      playLinkDescription: 'Android 版 Google Play 即将推出',
    },
  },
};

const APP_NS = {
  'zuli-collage': 'zuliCollage',
  timesince: 'timeSince',
  'geo-calc': 'geoCalc',
};

function appendTrailingFromEn(localeArr, enArr) {
  if (!Array.isArray(localeArr) || !Array.isArray(enArr)) return localeArr;
  if (localeArr.length >= enArr.length) return localeArr;
  return [...localeArr, ...enArr.slice(localeArr.length)];
}

function patchApp(app) {
  const ns = APP_NS[app];
  const enPath = path.join(root, 'messages/apps', app, 'en.json');
  const enRoot = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const en = enRoot[ns];
  const appStoreUrl = en.download?.appStoreUrl || '';

  for (const loc of LOCALES) {
    const filePath = path.join(root, 'messages/apps', app, `${loc}.json`);
    if (!fs.existsSync(filePath)) continue;
    const rootObj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const data = rootObj[ns];
    if (!data) continue;
    const c = COPY[app][loc];
    if (!c) continue;

    data.hero = data.hero || {};
    data.hero.badge = c.badge;
    data.hero.metaDescription = c.metaDescription;
    if (c.structuredDataDescription) {
      data.hero.structuredDataDescription = c.structuredDataDescription;
    }

    data.download = data.download || {};
    data.download.description = c.downloadDescription;
    data.download.appStoreUrl = appStoreUrl;
    data.download.googlePlaySoon = c.googlePlaySoon;
    // keep intentional empty play URL — delete blank so merge inherits EN empty
    if (data.download.googlePlayUrl === '') delete data.download.googlePlayUrl;

    data.status = data.status || {};
    data.status.title = c.statusTitle;
    data.status.description = c.statusDescription;
    data.status.statusValue = c.statusValue;
    if (en.status?.versionValue) data.status.versionValue = en.status.versionValue;

    if (data.links?.googlePlay && c.playLinkDescription) {
      data.links.googlePlay.description = c.playLinkDescription;
    }

    if (Array.isArray(data.screenshots?.items) && Array.isArray(en.screenshots?.items)) {
      data.screenshots.items = appendTrailingFromEn(data.screenshots.items, en.screenshots.items);
    }

    if (app === 'zuli-collage' && Array.isArray(data.faq?.items) && c.faqWhat) {
      const items = data.faq.items;
      if (items[0]) items[0].answer = c.faqWhat;
      const hasDownload = items.some(
        (i) => i?.question === c.faqDownloadQ || /download|הוריד|télécharg|descarg|herunterladen|scaric|다운로드|ダウンロード|скачать|下载|أحمل/i.test(i?.question || ''),
      );
      if (!hasDownload && c.faqDownloadQ) {
        items.splice(1, 0, { question: c.faqDownloadQ, answer: c.faqDownloadA });
      }
    }

    if (app === 'timesince' && data.pageNav && en.pageNav?.modes && !data.pageNav.modes) {
      data.pageNav.modes = en.pageNav.modes; // temporary EN until translated — better than missing
    }

    fs.writeFileSync(filePath, `${JSON.stringify(rootObj, null, 2)}\n`);
    console.log(`patched ${app}/${loc}`);
  }
}

for (const app of Object.keys(APP_NS)) patchApp(app);
console.log('done');
