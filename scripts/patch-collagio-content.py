#!/usr/bin/env python3
"""Merge Collagio marketing copy into messages/en.json (preserves privacy/terms)."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN = ROOT / "messages" / "en.json"

MARKETING = {
    "back": "Back to Home",
    "hero": {
        "badge": "Free on Android · iOS coming soon",
        "title": "Collagio - Photo Collage Maker",
        "subtitle": "Turn 2–10 photos into a collage in seconds",
        "description": "Pick photos, choose a layout, add filters and Zuli Monsters stickers, then save or share. No account required — everything stays on your device.",
        "socialProof": "2–10 photos · Smart layouts · Filters · 48 Zuli Monsters · English & Hebrew",
        "structuredDataDescription": "Collagio — fast photo collage maker for iOS and Android. Layouts, canvas shapes, filters, text, Layout Studio, and Zuli Monsters stickers. On-device editing by Zuki Apps.",
    },
    "legalNav": {
        "privacy": "Privacy Policy",
        "terms": "Terms of Use",
        "contact": "Contact Support",
    },
    "pageNav": {
        "features": "Features",
        "screenshots": "Screenshots",
        "howTo": "How to use",
        "faq": "FAQ",
        "download": "Download",
    },
    "features": {
        "title": "Everything you need, nothing you don't",
        "layouts": {
            "title": "Smart layouts",
            "description": "Grids, featured cells, album styles, and shaped slots — filtered automatically for your photo count.",
            "items": [
                "2–10 photos per collage",
                "Reorder with long-press drag",
                "Per-photo pinch-zoom and pan",
                "Undo and draft resume",
            ],
        },
        "canvas": {
            "title": "Canvas shapes",
            "description": "Square, story, portrait, landscape, circle, rounded, heart, and classic 4:3 frames.",
            "items": [
                "Story 9:16 for social",
                "Gradient or photo backgrounds",
                "Spacing and corner radius",
                "Polaroid and gold frames",
            ],
        },
        "filters": {
            "title": "Filters & text",
            "description": "Warm, cool, B&W, fade, bold, vivid, and dim — plus draggable text with Hebrew RTL.",
            "items": [
                "One-tap filter presets",
                "Multiple text layers",
                "Font and color controls",
                "Transparent sticker export (Premium)",
            ],
        },
        "stickers": {
            "title": "Zuli Monsters",
            "description": "48 original characters created and owned by Zuki Apps — use them in collages, WhatsApp packs, and iMessage.",
            "items": [
                "Built-in sticker tray",
                "WhatsApp one-tap install",
                "iMessage extension",
                "Personal use inside Collagio only",
            ],
        },
        "layoutStudio": {
            "title": "Layout Studio",
            "description": "Draw, resize, and shape numbered slots — save custom layouts for every collage.",
            "items": [
                "Drag-and-resize slots",
                "Circle, heart, diamond cells",
                "Start from templates",
                "Named layouts in the picker",
            ],
        },
        "privacy": {
            "title": "Private by design",
            "description": "No sign-in, no cloud upload of your photos. Collages stay on your device until you export.",
            "items": [
                "On-device processing",
                "Local history (30 collages)",
                "English and Hebrew RTL UI",
                "Optional one-time Premium",
            ],
        },
    },
    "zuliMonsters": {
        "title": "Zuli Monsters",
        "subtitle": "Original characters by Zuki Apps",
        "description": "48 bundled sticker characters you can place on collages or install for WhatsApp and iMessage.",
        "rightsNotice": "Zuli Monsters™, including all character designs, names, likenesses, sticker artwork, icons, and related assets, are the exclusive intellectual property of Zuki Apps. All rights reserved.",
        "usageNotice": "You may use Zuli Monsters only as provided through Collagio for personal collages and messaging. You may not copy, redistribute, sell, sublicense, or create derivative works from these characters outside the app without prior written permission from Zuki Apps.",
    },
    "premium": {
        "title": "Collagio Premium",
        "subtitle": "One-time purchase — no subscription",
        "freeTitle": "Free",
        "premiumTitle": "Premium",
        "freeItems": [
            "Full collage editor",
            "All layouts & canvas shapes",
            "Filters, text, stickers, Layout Studio",
            "Ads and export watermark",
        ],
        "premiumItems": [
            "No ads",
            "No watermark on exports",
            "High-resolution export (6×)",
            "Transparent PNG sticker export",
            "Batch save from history",
        ],
    },
    "download": {
        "title": "Download Collagio",
        "description": "Free to download. Your first collage in under 30 seconds.",
        "appStoreUrl": "",
        "googlePlayUrl": "https://play.google.com/store/apps/details?id=com.zuki.apps.collagio",
        "appStoreAlt": "Download on the App Store",
        "googlePlayAlt": "Get it on Google Play",
        "appIconAlt": "Collagio app icon",
        "soon": "App Store link coming soon — available now on Google Play.",
    },
    "status": {
        "title": "Available on Google Play",
        "description": "Collagio is live on Android. iOS release is in progress.",
        "version": "Package",
        "status": "Stores",
        "versionValue": "com.zuki.apps.collagio",
        "statusValue": "Google Play live · App Store soon",
    },
    "links": {
        "title": "Help & legal",
        "support": {
            "title": "Support",
            "email": "zuki.apps.dev@gmail.com",
        },
        "googlePlay": {
            "title": "Google Play",
            "description": "Download Collagio for Android",
        },
    },
    "footer": {
        "copyright": "© 2026 Zuki Apps. Collagio and Zuli Monsters are copyrighted works and trademarks of Zuki Apps. All rights reserved.",
        "tagline": "Beautiful collages in seconds · Made with ❤️ in Israel",
    },
    "screenshots": {
        "title": "Screenshots",
        "subtitle": "App screens from the Collagio marketing kit (updated from the Collagio repo).",
        "featuresTitle": "App screens",
        "items": [
            {"id": "home", "title": "Home", "description": "Create a collage or open recent work.", "image": "/images/collagio/screenshot-home.png", "alt": "Collagio home screen", "category": "features"},
            {"id": "picker", "title": "Pick & layout", "description": "Select 2–10 photos and choose a layout.", "image": "/images/collagio/screenshot-picker.png", "alt": "Photo picker and layouts", "category": "features"},
            {"id": "editor", "title": "Editor", "description": "Style your collage on a live canvas.", "image": "/images/collagio/screenshot-editor.png", "alt": "Collage editor with filters", "category": "features"},
            {"id": "stickers", "title": "Zuli Monsters", "description": "48 original sticker characters built in.", "image": "/images/collagio/screenshot-stickers.png", "alt": "Zuli Monsters on canvas", "category": "features"},
            {"id": "stickers-share", "title": "Sticker packs", "description": "Install Zuli Monsters for WhatsApp and iMessage.", "image": "/images/collagio/screenshot-stickers-share.png", "alt": "Zuli Monsters share screen", "category": "features"},
            {"id": "export", "title": "Export & share", "description": "Save to Photos or share to social apps.", "image": "/images/collagio/screenshot-export.png", "alt": "Export and share", "category": "features"},
            {"id": "layout-studio", "title": "Layout Studio", "description": "Design custom grids with drag-and-resize slots.", "image": "/images/collagio/screenshot-layout-studio.png", "alt": "Layout Studio", "category": "features"},
        ],
    },
    "howToUse": {
        "title": "How to make a collage",
        "steps": [
            {
                "number": "1",
                "title": "Pick photos",
                "description": "Choose 2–10 images. Long-press and drag to reorder — slot numbers follow your order.",
            },
            {
                "number": "2",
                "title": "Style it",
                "description": "Swap layouts, pick a canvas shape, apply filters, add text, and drop in Zuli Monsters.",
            },
            {
                "number": "3",
                "title": "Save or share",
                "description": "Export to your gallery, Instagram, WhatsApp, or as a transparent sticker.",
            },
        ],
    },
    "faq": {
        "title": "Frequently asked questions",
        "subtitle": "Quick answers about Collagio features, privacy, and Premium.",
        "viewAllSupport": "View full support & FAQ",
        "items": [
            {
                "question": "What is Collagio?",
                "answer": "Collagio is a photo collage maker for iOS and Android. Select 2–10 photos, pick a layout, style with filters and stickers, then save or share — usually in under 30 seconds.",
            },
            {
                "question": "Do I need an account?",
                "answer": "No. Collagio works entirely on your device. There is no sign-up, login, or cloud storage of your photos.",
            },
            {
                "question": "How many photos can I use?",
                "answer": "Between 2 and 10 photos per collage. Layouts automatically match your photo count.",
            },
            {
                "question": "What are Zuli Monsters?",
                "answer": "48 original sticker characters created and owned by Zuki Apps. Use them in collages or install packs for WhatsApp and iMessage. Zuli Monsters™, including all character designs, names, and artwork, are the exclusive intellectual property of Zuki Apps. All rights reserved.",
            },
            {
                "question": "What is Layout Studio?",
                "answer": "A tool to design custom collage layouts: drag numbered slots, resize them, pick shapes, name the layout, and reuse it in future collages.",
            },
            {
                "question": "Are my photos uploaded to your servers?",
                "answer": "No. All image processing happens on your device. Photos are never uploaded to Zuki Apps servers.",
            },
            {
                "question": "What does Collagio Premium include?",
                "answer": "Premium is a one-time purchase: no ads, no watermark on exports, high-resolution export, transparent PNG sticker export, and batch save from history.",
            },
            {
                "question": "Which languages are supported?",
                "answer": "English and Hebrew, with full right-to-left (RTL) UI mirroring in Hebrew.",
            },
        ],
    },
    "support": {
        "title": "Support & Help",
        "subtitle": "Find answers or contact Zuki Apps about Collagio.",
        "contact": {
            "title": "Contact us",
            "description": "Email us and we will get back to you as soon as possible.",
            "email": "zuki.apps.dev@gmail.com",
        },
        "quickLinks": {
            "title": "Quick links",
            "privacy": {
                "title": "Privacy Policy",
                "description": "How Collagio handles your data",
            },
            "terms": {
                "title": "Terms of Use",
                "description": "Terms for using Collagio",
            },
        },
        "faq": {
            "title": "Frequently asked questions",
            "q1": {
                "question": "How do I reorder photos?",
                "answer": "On the picker screen, long-press a thumbnail and drag it to a new position. Layout slot numbers follow thumbnail order.",
            },
            "q2": {
                "question": "How do I zoom a photo inside its cell?",
                "answer": "In the editor, tap a photo cell to select it, then pinch to zoom or drag to pan inside that slot.",
            },
            "q3": {
                "question": "Why is there a watermark on exports?",
                "answer": "The free tier adds a small Collagio watermark. Collagio Premium removes it with a one-time purchase.",
            },
            "q4": {
                "question": "Premium didn't activate after purchase",
                "answer": "Open Settings → Restore purchases. Use the same Apple ID or Google account you used to buy.",
            },
            "q5": {
                "question": "How do I add Zuli Monsters to WhatsApp?",
                "answer": "From the app home, open Zuli Monsters → Add to WhatsApp → confirm in WhatsApp.",
            },
            "q6": {
                "question": "Where can I read the full FAQ?",
                "answer": "See the FAQ on the Collagio product page or read public/collagio/faq.md on zukiapps.com for answer-engine friendly copy.",
            },
        },
        "additionalHelp": {
            "title": "Need more help?",
            "description": "If you could not find an answer, email zuki.apps.dev@gmail.com. We typically respond within 24–48 hours.",
        },
    },
}


def main() -> None:
    data = json.loads(EN.read_text(encoding="utf-8"))
    collagio = data.get("collagio", {})
    privacy = collagio.get("privacy")
    terms = collagio.get("terms")
    merged = {**MARKETING, "privacy": privacy, "terms": terms}
    data["collagio"] = merged
    EN.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Updated messages/en.json collagio namespace")


if __name__ == "__main__":
    main()
