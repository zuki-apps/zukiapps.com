#!/usr/bin/env python3
"""Merge Football Trivia marketing/ into messages/apps/football-trivia/en.json."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN = ROOT / "messages" / "apps" / "football-trivia" / "en.json"
MARKETING = Path("/Users/zukman/GIT/FootballTrivia/marketing")
FAQ_YAML = MARKETING / "faq.yaml"


def load_yaml(path: Path) -> dict:
    try:
        import yaml
    except ImportError:
        raise SystemExit("pip install pyyaml required") from None
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def flatten_faq(faq_data: dict) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []
    for cat in faq_data.get("categories", []):
        for item in cat.get("items", []):
            q = (item.get("q") or "").strip()
            a = re.sub(r"\s+", " ", (item.get("a") or "").strip())
            if q and a:
                items.append({"question": q, "answer": a})
    return items


def main() -> None:
    data = json.loads(EN.read_text(encoding="utf-8"))
    ft = data["footballTrivia"]

    ft["hero"].update({
        "badge": "Free football quiz · iOS & Android",
        "subtitle": "450+ timed questions · 4 categories · 12 languages",
        "description": (
            "Know the game. Prove it. Fast-paced football quiz with streaks, timers, and global "
            "leaderboards — clubs, national teams, legendary finals, and major tournaments."
        ),
        "seoTitle": "Football Trivia — Soccer Quiz Game | Zuki Apps",
        "metaDescription": (
            "450+ timed football quiz questions, streaks & leaderboards. Free on iOS & Android — download now."
        ),
        "structuredDataDescription": (
            "Football Trivia Master — soccer quiz for iOS and Android with 450+ timed questions across "
            "World Football, National Teams, Global Finals, and Tournament Spotlight. "
            "Package com.zuki.apps.footballtrivia by Zuki Apps."
        ),
        "trustLine": (
            "Independent entertainment by Zuki Apps. Not affiliated with any league, federation, club, "
            "or tournament organizer."
        ),
    })

    ft["statsBar"] = {
        "items": [
            {"label": "Questions", "value": "450+"},
            {"label": "Categories", "value": "4"},
            {"label": "Languages", "value": "12"},
            {"label": "Per round", "value": "10"},
        ]
    }

    ft["pageNav"] = {
        "features": "Features",
        "screenshots": "Screenshots",
        "howTo": "How to play",
        "faq": "FAQ",
        "tips": "Pro tips",
        "download": "Download",
    }

    ft["features"] = {
        "title": "Key Features",
        "items": [
            {
                "title": "Four themed categories",
                "description": "World Football, National Teams, Global Finals, and Tournament Spotlight.",
            },
            {
                "title": "Race the clock",
                "description": "Timed questions with Easy (20s), Medium (15s), or Hard (12s). Enable Hard Mode for 12s every round.",
            },
            {
                "title": "Streaks & scoring",
                "description": "Chain correct answers for up to +50% streak bonus and a big perfect-round bonus for 10/10.",
            },
            {
                "title": "Compete globally",
                "description": "Game Center (iOS) and Play Games (Android) for achievements and leaderboards.",
            },
            {
                "title": "12 languages",
                "description": "Arabic, Chinese, English, French, German, Hebrew, Italian, Japanese, Korean, Portuguese, Russian, Spanish.",
            },
            {
                "title": "Play your way",
                "description": "Dark or light theme, detailed stats, optional one-time ad removal, GDPR consent in Settings.",
            },
        ],
    }

    ft["screenshots"] = {
        "title": "Inside the app",
        "subtitle": "Real device captures — home, categories, gameplay, results, leaderboard, and stats.",
        "items": [
            {
                "id": "home",
                "title": "Your hub for every round",
                "description": "Start Game, stats bar, Hard Mode, and quick links to leaderboard and achievements.",
                "image": "/images/football-trivia/screenshot-home.png",
                "alt": "Football Trivia Master home screen with Start Game",
                "category": "features",
            },
            {
                "id": "category",
                "title": "Four themes + mix all",
                "description": "Pick World Football, National Teams, Global Finals, Tournament Spotlight, or All Categories.",
                "image": "/images/football-trivia/screenshot-category.png",
                "alt": "Football Trivia category picker",
                "category": "features",
            },
            {
                "id": "game",
                "title": "Beat the clock",
                "description": "Four options per question with a visible timer and streak indicator.",
                "image": "/images/football-trivia/screenshot-game.png",
                "alt": "Football Trivia question screen with timer",
                "category": "features",
            },
            {
                "id": "results",
                "title": "See every point you earned",
                "description": "Score breakdown, accuracy, and achievements unlocked after each round.",
                "image": "/images/football-trivia/screenshot-results.png",
                "alt": "Football Trivia results and score breakdown",
                "category": "features",
            },
            {
                "id": "leaderboard",
                "title": "Compete worldwide",
                "description": "Global ranks via Game Center or Google Play Games.",
                "image": "/images/football-trivia/screenshot-leaderboard.png",
                "alt": "Football Trivia global leaderboard",
                "category": "features",
            },
            {
                "id": "stats",
                "title": "Track improvement",
                "description": "Games played, accuracy, and performance by category.",
                "image": "/images/football-trivia/screenshot-stats.png",
                "alt": "Football Trivia statistics screen",
                "category": "features",
            },
        ],
    }

    ft["howToUse"] = {
        "title": "How to play",
        "subtitle": "A full round takes about 3–5 minutes. No account required — sign in only for leaderboards.",
        "steps": [
            {"number": "1", "title": "Tap Start Game", "description": "From the home screen. Optionally toggle Hard Mode for 12 seconds per question."},
            {"number": "2", "title": "Pick a category", "description": "All Categories for a mix, or focus on one of four themed pools."},
            {"number": "3", "title": "Answer 10 questions", "description": "Tap one of four options before the timer runs out. Correct answers build your streak."},
            {"number": "4", "title": "Review your results", "description": "See score breakdown, accuracy, and any achievements unlocked."},
            {"number": "5", "title": "Climb the leaderboard", "description": "Sign in via Play Games or Game Center, then open Leaderboard from home."},
        ],
    }

    ft["tips"] = {
        "title": "Pro tips",
        "subtitle": "Small habits that add up on the leaderboard.",
        "items": [
            {"title": "Protect your streak", "description": "Streak multipliers cap at +50% (5 correct in a row). One wrong answer resets to zero."},
            {"title": "Chase the time bonus", "description": "Answer with at least half the timer left for up to +50 bonus points per question."},
            {"title": "Perfect rounds pay off", "description": "+150 points for 10/10 — often more than two average questions combined."},
            {"title": "Warm up with All Categories", "description": "Mixed rounds expose weak spots. Check Statistics and drill your lowest category."},
            {"title": "Sign in before a serious run", "description": "Open Leaderboard once per session to confirm Game Center / Play Games is connected."},
            {"title": "Match language to your knowledge", "description": "Questions are localized — switch in Settings if another language suits you better."},
        ],
    }

    faq_items = flatten_faq(load_yaml(FAQ_YAML))
    ft["faq"] = {
        "title": "Frequently asked questions",
        "subtitle": "Quick answers before you download.",
        "viewAllSupport": "View all support →",
        "items": faq_items,
    }

    ft["status"]["versionValue"] = "1.0.8"
    ft["download"].update({
        "appStoreUrl": "https://apps.apple.com/app/id6760652362",
        "googlePlayUrl": "https://play.google.com/store/apps/details?id=com.zuki.apps.footballtrivia",
    })
    ft["footer"]["copyright"] = "© 2026 Zuki Apps. All rights reserved."

    EN.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Patched {EN} — {len(faq_items)} FAQ items, {len(ft['screenshots']['items'])} screenshots")


if __name__ == "__main__":
    main()
