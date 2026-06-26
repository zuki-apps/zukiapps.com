#!/usr/bin/env python3
"""Add hero.seoTitle + hero.metaDescription to app en.json files."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "messages" / "apps"

# (folder, namespace, seoTitle ≤58 chars, metaDescription ~140 chars with CTA)
SEO: list[tuple[str, str, str, str]] = [
    ("hush-gallery", "hushGallery",
     "Hush Gallery — Private Photo Vault | Zuki Apps",
     "Hide photos & videos in a private vault. PIN lock, tags, WhatsApp import. Free on iOS & Android — download now."),
    ("whistle-camera", "whistleCamera",
     "Whistle Camera — Hands-Free Selfies | Zuki Apps",
     "Whistle to snap photos & video — no timer sprint. Works offline. Free download on iOS & Android."),
    ("zulist", "zulist",
     "ZuList — Smart Shopping Lists | Zuki Apps",
     "Shared grocery lists with real-time sync & offline mode. Free for families on iOS & Android — try ZuList."),
    ("power-interval-timer", "powerIntervalTimer",
     "Power Interval Timer — HIIT & Tabata | Zuki Apps",
     "Fast offline Tabata & HIIT timer with custom workouts. Free on iOS & Android — start your next session."),
    ("bit-scope", "bitScope",
     "Bit Scope — Developer Number Tool | Zuki Apps",
     "Inspect bits, bases & binary math on device. Built for developers. Free on iOS & Android."),
    ("track-ledger", "trackLedger",
     "Track Ledger — GPS Track Logger | Zuki Apps",
     "Log GPS tracks offline, export GPX/CSV/GeoJSON. No account needed. Free on iOS & Android."),
    ("noise-meter-shusher", "noiseMeterShusher",
     "Noise Meter — Decibel & Shusher | Zuki Apps",
     "Measure noise levels anywhere with dB meter & history. No account. Free on iOS & Android."),
    ("paratrooper-blitz", "paratrooperBlitz",
     "Paratrooper Blitz — Arcade Action | Zuki Apps",
     "Classic paratrooper arcade with scores & leaderboards. Free on iOS & Android — play now."),
    ("sudoku-puzzle", "sudokuPuzzle",
     "Sudoku Fun Go — Classic 9×9 Puzzles | Zuki Apps",
     "Clean Sudoku with hints & stats. Works offline. Free on iOS & Android — download today."),
    ("tempo-lab-pro", "tempoLabPro",
     "TempoLab Pro — Metronome & Pitch | Zuki Apps",
     "Practice tempo, pitch & rhythm tools for musicians. Free on iOS & Android."),
    ("football-trivia", "footballTrivia",
     "Football Trivia — Soccer Quiz Game | Zuki Apps",
     "210+ football & World Cup quiz questions. Streaks & stats. Free on iOS & Android — test your knowledge."),
    ("fun-facts-trivia", "funFactsTrivia",
     "Fun Facts Trivia — Quiz Game | Zuki Apps",
     "Timed trivia across categories. Play offline. Free on iOS & Android — challenge yourself."),
    ("collagio", "collagio",
     "Collagio — Photo Collage Maker | Zuki Apps",
     "Combine 2–10 photos with layouts, filters & stickers. On-device. Free on iOS & Android."),
    ("toldya", "toldya",
     "ToldYa! — Social Predictions | Zuki Apps",
     "Make predictions with friends, track results & streaks. Free on iOS & Android."),
]


def main() -> None:
    for folder, ns, seo_title, meta_desc in SEO:
        path = ROOT / folder / "en.json"
        if not path.exists():
            print("skip missing", folder)
            continue
        data = json.loads(path.read_text(encoding="utf-8"))
        hero = data[ns].setdefault("hero", {})
        hero["seoTitle"] = seo_title
        hero["metaDescription"] = meta_desc
        if folder == "football-trivia" and "structuredDataDescription" not in hero:
            hero["structuredDataDescription"] = (
                "Football Trivia Master — soccer quiz for iOS and Android with 210+ questions across World Football, "
                "National Teams, World Cups, and 2026 World Cup. Package com.zuki.apps.footballtrivia by Zuki Apps."
            )
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("patched", folder, len(seo_title), len(meta_desc))


if __name__ == "__main__":
    main()
