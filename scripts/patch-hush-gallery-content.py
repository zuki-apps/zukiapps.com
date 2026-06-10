#!/usr/bin/env python3
"""Patch messages/en.json hushGallery namespace from HushGallery docs."""
import json
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "messages/en.json"
data = json.loads(path.read_text())
h = data["hushGallery"]

h["hero"]["structuredDataDescription"] = (
    "Hush Gallery — private photo and video vault for iOS and Android. "
    "Hide media from WhatsApp and Photos via Share, organize with tags, "
    "PIN/biometric App Lock (Premium), optional iCloud/Google Drive backup. "
    "Package com.zuki.apps.hushGallery by Zuki Apps."
)
h["hero"]["description"] = (
    "Hide and protect photos and videos on your device. Share from WhatsApp or Photos into a "
    "private vault, organize with tags, lock with PIN or biometrics (Premium), and optionally "
    "back up to iCloud or Google Drive. No account required for local use."
)

h["screenshots"] = {
    "title": "Screenshots & Guides",
    "subtitle": "Real app screens from Hush Gallery — gallery, tags, security, backup, and onboarding.",
    "featuresTitle": "App screens",
    "howToTitle": "How to hide photos",
    "onboardingTitle": "First launch tour",
    "onboardingSubtitle": "Privacy, tags, and optional cloud backup explained before you import.",
    "items": [
        {
            "id": "gallery",
            "title": "Private gallery grid",
            "description": "Browse photos and videos in a secure grid. Filter by All, Untagged, or custom tags. Swipe to delete with undo.",
            "image": "/images/hush-gallery/screenshot-gallery.png",
            "alt": "Hush Gallery main photo grid with thumbnails",
            "category": "features",
        },
        {
            "id": "sort",
            "title": "Sort your library",
            "description": "Tap the sort icon to order by date, size, import date, name, or media type.",
            "image": "/images/hush-gallery/screenshot-sort.png",
            "alt": "Hush Gallery sort menu with date and size options",
            "category": "features",
        },
        {
            "id": "tags",
            "title": "Filter by tags",
            "description": "Create tags like Vacation or Family. Tap a chip to filter; long-press to rename or reorder.",
            "image": "/images/hush-gallery/screenshot-tags.png",
            "alt": "Hush Gallery tag filter bar",
            "category": "features",
        },
        {
            "id": "lock",
            "title": "App Lock",
            "description": "PIN (4 or 6 digits) plus Face ID or Touch ID. Auto-lock after inactivity (Premium).",
            "image": "/images/hush-gallery/screenshot-lock.png",
            "alt": "Hush Gallery PIN lock screen",
            "category": "features",
        },
        {
            "id": "backup",
            "title": "Cloud backup",
            "description": "Optional backup to iCloud (iOS) or Google Drive (Android). Manual backup, restore, and reminders (Premium).",
            "image": "/images/hush-gallery/screenshot-backup.png",
            "alt": "Hush Gallery onboarding cloud backup screen",
            "category": "features",
        },
        {
            "id": "premium",
            "title": "Premium",
            "description": "One-time purchase: remove ads, unlimited tags, App Lock, and cloud backup access.",
            "image": "/images/hush-gallery/screenshot-premium.png",
            "alt": "Hush Gallery Premium upgrade screen",
            "category": "features",
        },
        {
            "id": "settings",
            "title": "Settings",
            "description": "Security, encryption, backup, Premium, language, theme, account, and About in one hub.",
            "image": "/images/hush-gallery/screenshot-settings.png",
            "alt": "Hush Gallery settings screen",
            "category": "features",
        },
        {
            "id": "onboarding-private",
            "title": "Private & secure",
            "description": "First-launch onboarding: your media stays on your device unless you enable backup.",
            "image": "/images/hush-gallery/onboarding-private.png",
            "alt": "Hush Gallery onboarding private storage",
            "category": "onboarding",
        },
        {
            "id": "onboarding-tags",
            "title": "Organize with tags",
            "description": "Onboarding explains custom tags to filter and group photos and videos.",
            "image": "/images/hush-gallery/onboarding-tags.png",
            "alt": "Hush Gallery onboarding tags",
            "category": "onboarding",
        },
    ],
}

h["manual"] = {
    "title": "User manual",
    "subtitle": "Step-by-step guide for import, tags, security, backup, and sharing.",
    "sections": [
        {
            "title": "1. Getting started",
            "steps": [
                "Install Hush Gallery from the App Store or Google Play.",
                "Accept the first-launch privacy notice — media stays on your device by default.",
                "Complete or skip the onboarding tour (private storage, tags, optional backup).",
                "Tap + in the gallery to import your first photos or videos.",
            ],
        },
        {
            "title": "2. Gallery & filters",
            "steps": [
                "Open the gallery grid to browse thumbnails.",
                "Use All, Untagged, or custom tag chips to filter.",
                "Tap ⇅ (sort) for date, size, import date, name, or type.",
                "Swipe a row left to delete; undo appears before permanent removal.",
            ],
        },
        {
            "title": "3. Import media",
            "steps": [
                "Tap + → choose Photo library or Camera.",
                "Files are copied into Hush Gallery private storage.",
                "Optionally delete originals when the import flow offers it.",
                "From other apps: Share → Hush Gallery, then open Hush Gallery to complete.",
            ],
        },
        {
            "title": "4. Viewer & selection",
            "steps": [
                "Tap a thumbnail for full-screen view; pinch to zoom.",
                "Long-press a thumbnail for selection mode.",
                "Select multiple items to export, share, tag, or delete.",
                "Export to Gallery copies items back to the system Photos app.",
            ],
        },
        {
            "title": "5. Tags",
            "steps": [
                "Create tags from the tag bar menu or during import.",
                "Assign multiple tags per item.",
                "Long-press a tag chip to rename, reorder, or delete.",
                "Free tier: up to 5 tags; Premium: unlimited.",
            ],
        },
        {
            "title": "6. App Lock (Premium)",
            "steps": [
                "Settings → Security → App Lock.",
                "Set a 4- or 6-digit PIN; enable Face ID / Touch ID if available.",
                "Choose auto-lock: Immediately, 1, 5, or 15 minutes.",
                "Forgot PIN? Use Restore PIN if you backed up PIN while signed in.",
            ],
        },
        {
            "title": "7. Encryption",
            "steps": [
                "Settings → Encryption to enable optional on-disk encryption.",
                "Encryption key is stored in the device secure enclave / keystore.",
                "When enabled, media files are encrypted before being written locally.",
            ],
        },
        {
            "title": "8. Cloud backup (Premium)",
            "steps": [
                "Sign in under Settings → Account when prompted.",
                "Settings → Backup → Backup Now for manual sync.",
                "Enable Auto Backup and reminder frequency if offered.",
                "New device: sign in and tap Restore from Settings or the first-run prompt.",
            ],
        },
        {
            "title": "9. Premium & ads",
            "steps": [
                "Open Premium from Settings or the gallery banner.",
                "One-time purchase removes ads and unlocks Premium features.",
                "Restore purchases with the same Apple ID or Google account.",
                "Free tier: watch a rewarded ad for temporary ad-free time (when offered).",
            ],
        },
        {
            "title": "10. Share Extension (iOS)",
            "steps": [
                "In Photos, select items → Share → Hush Gallery.",
                "The extension stages files; open Hush Gallery to import.",
                "If import does not appear, open the app manually — import runs on launch.",
            ],
        },
    ],
}

h["tips"] = {
    "title": "Tips & tricks",
    "subtitle": "Get the most from your private gallery.",
    "items": [
        {
            "title": "Hide from WhatsApp fast",
            "description": "Long-press a photo in WhatsApp → Share → Hush Gallery. Faster than saving to Camera Roll first.",
        },
        {
            "title": "Use tags early",
            "description": "Create tags when you import so filtering stays easy as your vault grows.",
        },
        {
            "title": "Short auto-lock",
            "description": "Set App Lock to Immediately or 1 minute if you hand your phone to others often.",
        },
        {
            "title": "Backup before a new phone",
            "description": "Run Backup Now before replacing your device; restore after signing in on the new install.",
        },
        {
            "title": "Export without losing vault copy",
            "description": "Export to Gallery copies files out; originals remain in Hush Gallery until you delete them.",
        },
        {
            "title": "Restore purchases",
            "description": "Reinstalled? Premium → Restore purchases with the same store account.",
        },
        {
            "title": "12 languages + RTL",
            "description": "Settings → Language includes Hebrew and Arabic with full RTL layout support.",
        },
        {
            "title": "Send feedback in-app",
            "description": "Settings → About → Send feedback, or email zuki.apps.dev@gmail.com before leaving a store review.",
        },
    ],
}

h["pageNav"] = {
    "features": "Features",
    "screenshots": "Screenshots",
    "howTo": "How to",
    "manual": "Manual",
    "tips": "Tips",
    "faq": "FAQ",
    "download": "Download",
}

extra_faq = [
    {
        "question": "Does Zuki Apps have access to my photos?",
        "answer": "No. Hush Gallery stores media locally on your device in private app storage. We do not upload or access your files unless you explicitly enable cloud backup to your own iCloud or Google Drive account.",
    },
    {
        "question": "Can I use Hush Gallery without signing in?",
        "answer": "Yes. The gallery, import, tags, and export work offline without an account. Sign-in is only needed for cloud backup and PIN restore via backup.",
    },
    {
        "question": "What are All and Untagged filters?",
        "answer": "All shows every item in your vault. Untagged shows only items with no custom tags assigned. Custom tag chips filter to one label at a time.",
    },
    {
        "question": "How do I sort the gallery?",
        "answer": "Tap the sort icon (⇅) in the gallery app bar. Choose date, file size, import date, name, or media type (photos vs videos first).",
    },
    {
        "question": "Does import remove photos from my camera roll?",
        "answer": "By default, import copies files into Hush Gallery; originals stay in Photos unless you choose delete-original when offered or remove them yourself.",
    },
    {
        "question": "Is cloud backup required?",
        "answer": "No. Backup is optional. Your vault works entirely on-device without backup or an account.",
    },
    {
        "question": "What is included in a backup?",
        "answer": "Backup includes media files and metadata such as tags. Platform behavior depends on iCloud (iOS) or Google Drive (Android) and your signed-in account.",
    },
    {
        "question": "How do I restore a Premium purchase?",
        "answer": "Open Premium → Restore purchases. Use the same Apple ID or Google Play account used for the original purchase.",
    },
    {
        "question": "Why does the app ask for my PIN when I return?",
        "answer": "App Lock re-locks when you background the app or after your chosen auto-lock timeout. This prevents unauthorized access to your vault.",
    },
    {
        "question": "Thumbnails look empty or broken — what should I do?",
        "answer": "Force-quit and reopen Hush Gallery. If files were moved outside the app, metadata may be stale — re-import the media if needed.",
    },
    {
        "question": "Backup failed — how do I fix it?",
        "answer": "Check Wi‑Fi or cellular data, confirm you are signed in, verify cloud storage space, and ensure Premium/backup eligibility for your account.",
    },
    {
        "question": "Share Extension import did not show up",
        "answer": "Open Hush Gallery manually; pending share imports run on launch. Retry sharing from Photos if the share sheet reported an error.",
    },
]

existing_q = {item["question"] for item in h["faq"]["items"]}
for item in extra_faq:
    if item["question"] not in existing_q:
        h["faq"]["items"].append(item)
        existing_q.add(item["question"])

h["faq"]["subtitle"] = (
    "Answers about privacy, import, Share extension, tags, App Lock, backup, Premium, and troubleshooting. "
    "Full list also on Support."
)
h["faq"]["viewAllSupport"] = "View all FAQ on Support"

data["hushGallery"] = h
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print("patched hushGallery: faq", len(h["faq"]["items"]), "manual", len(h["manual"]["sections"]), "screenshots", len(h["screenshots"]["items"]))
