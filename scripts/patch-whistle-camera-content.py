#!/usr/bin/env python3
"""Patch messages/en.json whistleCamera + home.whistleCamera from WhistleCamera marketing kit."""
import json
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "messages" / "en.json"
data = json.loads(path.read_text())
home = data["home"]["whistleCamera"]
home.update({
    "title": "Whistle Camera - Selfie & More",
    "subtitle": "Whistle to snap — hands-free photos & video",
    "description": "Just whistle and your phone takes the shot. Hands-free selfies, pet photos, and group shots — no remote, no timer sprint. iOS & Android, 40+ languages.",
    "features": {
        "handsFree": "Whistle to capture",
        "calibration": "Tuned to your whistle",
        "widgets": "Widgets & shortcuts",
    },
    "learnMore": "Learn more about Whistle Camera →",
})

wc = data["whistleCamera"]
wc["hero"] = {
    "badge": "Free on iOS & Android",
    "title": "Whistle Camera",
    "subtitle": "Just whistle — your phone takes the photo.",
    "description": "Hands-free capture for selfies, pets, and moments when your hands are full. Real-time whistle detection, Practice mode calibration, in-app gallery, countdown timer, and Pro video start/stop.",
    "structuredDataDescription": "Whistle Camera — hands-free photo and video app for iOS and Android. Whistle to snap selfies, pet shots, and group photos. Practice whistle calibration, widgets, Siri shortcuts. Android com.zuki.apps.whistlecamera; iOS App Store id1037716421 by Zuki Apps.",
    "socialProof": "Free download · 40+ languages · iOS & Android",
}
wc["features"] = {
    "title": "Why Whistle Camera?",
    "whistle": {
        "title": "Whistle to capture",
        "description": "The app listens in real time. When it hears your whistle in the band you set, it fires the shutter — no tapping, no remote.",
        "items": [
            "Real-time on-device detection",
            "Photo capture on whistle",
            "Video start/stop on whistle (Pro)",
            "Green ring when your whistle is heard",
        ],
    },
    "calibration": {
        "title": "Tuned to your whistle",
        "description": "Practice mode teaches the app your exact whistle. Adjust sensitivity (1–5) and the 0–100 frequency band for quiet rooms or noisy parks.",
        "items": [
            "Practice whistle in Settings",
            "Sensitivity presets (Quiet → Loud)",
            "Live debug overlay",
            "≈750–3000 Hz detection band",
        ],
    },
    "photoVideo": {
        "title": "Photo & video",
        "description": "Whistle for a still, or switch to video and whistle-start / whistle-stop recording. Countdown 0, 3, 5, or 10 seconds works with both.",
        "items": [
            "Front and rear camera",
            "Flash / torch",
            "Pinch or slider zoom",
            "Incognito mode for discreet capture",
        ],
    },
    "gallery": {
        "title": "Gallery & sharing",
        "description": "Browse captures in the built-in gallery. Full-screen preview, multi-select share or delete, optional save to a Photos album.",
        "items": [
            "In-app media grid",
            "Pinch-zoom preview",
            "Bulk share and delete",
            "Optional “Whistle Camera” album",
        ],
    },
    "shortcuts": {
        "title": "Widgets & Siri",
        "description": "Launch photo or video capture from Home Screen widgets. Siri shortcuts and Apple Watch remote shutter when the companion is installed.",
        "items": [
            "Home Screen widgets (iOS)",
            "Siri / Shortcuts intents",
            "Apple Watch shutter",
            "Lock Screen & Control Center (iOS)",
        ],
    },
}
wc["useCases"] = {
    "title": "Perfect for",
    "subtitle": "Real scenarios where your hands are busy or the phone is out of reach.",
    "items": [
        {
            "title": "Pet owners",
            "description": "Whistle for eye contact — the app captures in the same moment. Sharp front-facing pet shots without a helper.",
        },
        {
            "title": "Selfies & groups",
            "description": "Prop the phone, whistle from where you stand. No running to a 10-second timer.",
        },
        {
            "title": "Hands-busy moments",
            "description": "Cooking, crafts, biking — whistle when the shot is ready. No accessory remote.",
        },
        {
            "title": "Outdoor & sports",
            "description": "Tripod or ledge setup. Walk to your subject, whistle, capture — great for landscapes and action.",
        },
    ],
}
wc["howToUse"] = {
    "title": "How it works",
    "steps": [
        {"number": "1", "title": "Set up", "description": "Point the camera. Enable whistle detection. Calibrate in Settings if needed."},
        {"number": "2", "title": "Whistle", "description": "One short, clear whistle. The ring turns green when detected."},
        {"number": "3", "title": "Captured", "description": "Photo or video is taken — your hands never touched the phone."},
    ],
}
wc["screenshots"] = {
    "title": "Screenshots",
    "subtitle": "Real app screens — whistle detection, capture, calibration, gallery, video, and timer.",
    "featuresTitle": "App screens",
    "items": [
        {
            "id": "whistle",
            "title": "Hands-free whistle",
            "description": "Detection ring shows when your whistle is heard — then the shutter fires.",
            "image": "/images/whistle-camera/screenshot-whistle.png",
            "alt": "Whistle Camera hands-free whistle detection screen",
            "category": "features",
        },
        {
            "id": "capture",
            "title": "Photo capture",
            "description": "Front or rear camera with flash, zoom, and manual shutter when you want both options.",
            "image": "/images/whistle-camera/screenshot-capture.png",
            "alt": "Whistle Camera photo capture screen",
            "category": "features",
        },
        {
            "id": "settings",
            "title": "Calibrate your whistle",
            "description": "Practice mode, sensitivity, and frequency band — tuned to you, not a generic preset.",
            "image": "/images/whistle-camera/screenshot-settings.png",
            "alt": "Whistle Camera whistle calibration settings",
            "category": "features",
        },
        {
            "id": "gallery",
            "title": "In-app gallery",
            "description": "Browse, preview, share, and delete without leaving the app.",
            "image": "/images/whistle-camera/screenshot-gallery.png",
            "alt": "Whistle Camera in-app photo gallery",
            "category": "features",
        },
        {
            "id": "video",
            "title": "Video mode (Pro)",
            "description": "Whistle to start and stop recording — hands-free video workflow.",
            "image": "/images/whistle-camera/screenshot-video.png",
            "alt": "Whistle Camera video mode",
            "category": "features",
        },
        {
            "id": "timer",
            "title": "Timer controls",
            "description": "3, 5, or 10 second countdown — works with whistle or manual capture.",
            "image": "/images/whistle-camera/screenshot-timer.png",
            "alt": "Whistle Camera countdown timer",
            "category": "features",
        },
    ],
}
wc["manual"] = {
    "title": "User manual",
    "subtitle": "Camera controls, settings, gallery, and extensions.",
    "sections": [
        {
            "title": "1. Camera screen",
            "steps": [
                "Shutter / record — manual capture anytime.",
                "Whistle detector — enable hands-free trigger.",
                "Timer — delay after trigger (0/3/5/10 s).",
                "Flash, flip camera, zoom slider, gallery, settings.",
            ],
        },
        {
            "title": "2. Whistle settings",
            "steps": [
                "Sensitivity 1 (easiest) to 5 (strictest).",
                "Frequency band 0–100 in UI (~750–3000 Hz).",
                "Practice whistle — listen, whistle, tap Set to calibrate.",
                "Presets: Quiet, Default, Outside, Loud.",
            ],
        },
        {
            "title": "3. Gallery",
            "steps": [
                "Tap a thumbnail for full-screen preview.",
                "Select mode for bulk share or delete.",
                "Optional save to Photos album “Whistle Camera”.",
            ],
        },
        {
            "title": "4. Pro & extensions",
            "steps": [
                "Pro: whistle video start/stop, premium modes, no ads.",
                "Widgets — quick launch photo or video.",
                "Siri / Shortcuts and Apple Watch remote shutter.",
                "Restore purchases from Settings after reinstall.",
            ],
        },
    ],
}
wc["tips"] = {
    "title": "Tips & tricks",
    "subtitle": "Get reliable detection and better shots.",
    "items": [
        {"title": "Selfies without shake", "description": "Front camera + whistle — no jostling the phone tapping the shutter."},
        {"title": "Pet photos", "description": "Calibrate in Settings first, then whistle for eye contact and capture in one motion."},
        {"title": "Group shots", "description": "Set a 3 s timer, whistle — everyone settles before the shot fires."},
        {"title": "Noisy environments", "description": "Lower sensitivity to level 1 and widen the band; enable the debug overlay to see peaks."},
        {"title": "Tripod distance", "description": "Place the phone, walk into frame, whistle — great for landscapes and sports."},
        {"title": "Widgets", "description": "Add photo/video widgets for one-tap launch from the Home Screen."},
        {"title": "Timer fallback", "description": "Countdown works with or without whistle — use either trigger."},
        {"title": "Restore Pro", "description": "Reinstalled? Settings → restore purchases with the same store account."},
    ],
}
wc["faq"] = {
    "title": "Frequently asked questions",
    "subtitle": "Detection, privacy, storage, Pro, and troubleshooting.",
    "viewAllSupport": "Full FAQ on Support",
    "items": [
        {
            "question": "What is Whistle Camera?",
            "answer": "Whistle Camera is a hands-free camera app for iOS and Android. Whistle to take a photo or (with Pro) start and stop video. Package on Android: com.zuki.apps.whistlecamera. iOS App Store ID: 1037716421.",
        },
        {
            "question": "It doesn’t detect my whistle well. What can I do?",
            "answer": "Lower sensitivity (try level 1), widen the frequency range in Settings, enable the live debug overlay, and use Practice whistle to calibrate from your session peaks.",
        },
        {
            "question": "Do I need internet?",
            "answer": "Core whistle capture works offline. Ads, analytics, and purchase checks may need a network connection.",
        },
        {
            "question": "Why does the app need the microphone?",
            "answer": "The app listens for your whistle to trigger the camera. Audio is processed on-device for detection — it is not stored as recordings.",
        },
        {
            "question": "Where are photos stored?",
            "answer": "In the in-app gallery by default. You can optionally copy captures to a Photos album named Whistle Camera in Settings.",
        },
        {
            "question": "What is Pro?",
            "answer": "Pro unlocks whistle start/stop video, extra premium modes, and removes ads. One-time purchase; restore from Settings after reinstall.",
        },
        {
            "question": "Can I use a timer instead of whistling?",
            "answer": "Yes — countdown timer (3, 5, or 10 seconds) works with or without whistle detection enabled.",
        },
        {
            "question": "Is Whistle Camera on Android?",
            "answer": "Yes — https://play.google.com/store/apps/details?id=com.zuki.apps.whistlecamera",
        },
        {
            "question": "How do I get support?",
            "answer": "Email zuki.apps.dev@gmail.com or visit https://zukiapps.com/whistle-camera/support. Privacy: https://zukiapps.com/whistle-camera/privacy",
        },
    ],
}
wc["premium"] = {
    "title": "Whistle Camera Pro",
    "description": "One-time upgrade: whistle video start/stop, premium capture modes, ad-free gallery experience.",
    "items": [
        "Whistle to start and stop video recording",
        "Premium capture modes",
        "No ads in gallery",
        "Restore purchases anytime in Settings",
    ],
}
wc["languages"] = {
    "title": "40+ languages",
    "description": "In-app language picker including English, Hebrew (RTL), Arabic (RTL), and 37+ more locales.",
}
wc["pageNav"] = {
    "features": "Features",
    "screenshots": "Screenshots",
    "howTo": "How it works",
    "useCases": "Use cases",
    "manual": "Manual",
    "tips": "Tips",
    "faq": "FAQ",
    "download": "Download",
}
wc["status"] = {
    "title": "Available now",
    "description": "Whistle Camera is on the App Store and Google Play.",
    "version": "Latest release",
    "status": "Platforms",
    "versionValue": "1.3.8",
    "statusValue": "iOS & Android",
}
wc["download"] = {
    "title": "Download Whistle Camera",
    "description": "Free download with optional Pro upgrade. Whistle. Snap. Done.",
    "soon": "Coming soon",
    "appStoreUrl": "https://apps.apple.com/app/id1037716421",
    "googlePlayUrl": "https://play.google.com/store/apps/details?id=com.zuki.apps.whistlecamera",
    "appIconAlt": "Whistle Camera app icon",
    "appStoreAlt": "Download on the App Store",
    "googlePlayAlt": "Get it on Google Play",
}

# Expand support FAQ to match main page (support page can use faq.items via migration later)
support_faq = []
for i, item in enumerate(wc["faq"]["items"][:8], 1):
    support_faq.append({"question": item["question"], "answer": item["answer"]})
wc["support"]["faq"] = {"title": "Frequently Asked Questions", **{f"q{i}": support_faq[i-1] for i in range(1, len(support_faq)+1)}}

data["whistleCamera"] = wc
data["home"]["whistleCamera"] = home
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print("patched whistleCamera")
