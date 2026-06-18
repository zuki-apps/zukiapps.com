#!/usr/bin/env python3
"""Sync product marketing kits from sibling app repos into ZukiApps-WEB."""
from __future__ import annotations

import argparse
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN_JSON = ROOT / "messages" / "en.json"
PUBLIC = ROOT / "public"

PAGE_NAV = {
    "features": "Features",
    "screenshots": "Screenshots",
    "howTo": "How to use",
    "tips": "Tips",
    "faq": "FAQ",
    "download": "Download",
}

APPS = {
    "noise-meter-shusher": {
        "namespace": "noiseMeterShusher",
        "repo": Path("/Users/zukman/GIT/NoiseMeterShusher/marketing"),
        "faq": "web/faq.md",
        "tips": "web/tips-and-tricks.md",
        "structured": (
            "Noise Meter — Shusher — real-time decibel meter for iOS and Android. "
            "Live sound level, timed sessions, noise scores, on-device history, Shusher in-app alerts, "
            "optional Premium charts and CSV export. Android com.zuki.apps.noisemeter by Zuki Apps."
        ),
        "screenshots": [
            ("screenshots/01-live-meter-light.png", "live-meter", "Live sound meter", "Real-time dB gauge and waveform while you measure."),
            ("screenshots/02-results-score-dark.png", "results", "Session results", "Average, min, max, noise category, and tips after each session."),
            ("screenshots/03-shusher-settings-light.png", "shusher", "Shusher alerts", "Set a threshold and get in-app nudges when noise crosses your line."),
            ("screenshots/04-history-list-light.png", "history", "History", "Compare rooms and times — data stays on your device."),
            ("screenshots/05-premium-features-light.png", "premium", "Premium", "Longer sessions, charts, CSV export, themes, and no ads."),
        ],
        "how_to": [
            ("1", "Allow microphone", "Grant mic access when prompted so the app can estimate ambient level."),
            ("2", "Start measuring", "Watch the live meter or tap Start measurement for a timed session."),
            ("3", "Read your score", "See average, category, and recommendations on the results screen."),
            ("4", "Save or share", "Add to History or share a clean results graphic with a label."),
        ],
    },
    "bit-scope": {
        "namespace": "bitScope",
        "repo": Path("/Users/zukman/GIT/BitScope/Marketing"),
        "faq": "faq/FAQ.md",
        "tips": "tips/TIPS.md",
        "structured": (
            "Bit Scope — bit-level calculator for developers and students on iOS and Android. "
            "Binary, octal, decimal, hex, IEEE 754, CRC32, hashes, bit canvas, batch convert, widgets. "
            "Android com.zuki.apps.bitscope by Zuki Apps."
        ),
        "screenshots": [
            ("screenshots/marketing-calculator.png", "calculator", "Calculator", "Convert and inspect values across number bases and bit widths."),
            ("screenshots/marketing-bit-canvas.png", "canvas", "Bit canvas", "Flip bits on a live canvas and copy results in one tap."),
            ("screenshots/marketing-converters.png", "converters", "Converters", "IEEE 754, CRC, hash, and more engineering utilities."),
            ("screenshots/marketing-utilities.png", "utilities", "Utilities", "Premium tools for power users — one-time unlock."),
            ("screenshots/marketing-widgets.png", "widgets", "Widgets", "Home-screen widgets for quick conversions."),
        ],
        "how_to": [
            ("1", "Pick a format", "Choose binary, octal, decimal, or hex and your bit width."),
            ("2", "Enter a value", "Type or paste — results update instantly across representations."),
            ("3", "Use the canvas", "Tap bits to flip them and see the value change live."),
            ("4", "Copy or export", "One-tap copy, history, and batch convert when you need more."),
        ],
    },
    "fun-facts-trivia": {
        "namespace": "funFactsTrivia",
        "repo": Path("/Users/zukman/GIT/FunFactsTrivia/marketing"),
        "faq": "faq/faq.md",
        "tips": "how-to/tips_and_tricks.md",
        "structured": (
            "Fun Facts! Trivia — multi-category timed trivia quiz for iOS and Android. "
            "Play solo, climb leaderboards, unlock categories, 12+ languages. "
            "Android com.zuki.apps.funfactstrivia by Zuki Apps."
        ),
        "screenshots": [
            ("screenshots/examples/01-home-play.png", "home", "Home & play", "Pick a category and jump into a timed round."),
            ("screenshots/examples/02-game-question.png", "question", "Trivia round", "Answer before the clock runs out."),
            ("screenshots/examples/03-results-score.png", "results", "Results", "See score, streak, and what you learned."),
            ("screenshots/examples/04-categories-grid.png", "categories", "Categories", "Science, history, sports, and more."),
            ("screenshots/examples/05-leaderboards.png", "leaderboards", "Leaderboards", "Compare scores with players worldwide."),
        ],
        "how_to": [
            ("1", "Choose a category", "Pick a topic that matches your mood or challenge yourself."),
            ("2", "Answer fast", "Each question is timed — tap the best answer before time expires."),
            ("3", "Review results", "See correct answers, explanations, and your score."),
            ("4", "Climb ranks", "Replay to improve and appear on leaderboards."),
        ],
    },
    "paratrooper-blitz": {
        "namespace": "paratrooperBlitz",
        "repo": Path("/Users/zukman/GIT/ParatrooperBlitz/marketing"),
        "faq": "copy/en/faq.md",
        "tips": "copy/en/tips.md",
        "structured": (
            "Paratrooper Blitz — retro anti-air arcade for iOS and Android. "
            "Arcade slide-and-shoot and Classic aim-and-fire modes, leaderboards, 14 achievements, 12 languages. "
            "Android com.zuki.apps.paratrooperblitz by Zuki Apps."
        ),
        "screenshots": [
            ("screenshots/web/01-home-menu.png", "menu", "Main menu", "Pick Arcade or Classic and view your best scores."),
            ("screenshots/web/02-classic-intro-scoring.png", "classic", "Classic mode", "Aim-and-fire paratrooper action with scoring on screen."),
            ("screenshots/web/03-arcade-gameplay.png", "arcade", "Arcade mode", "Slide-and-shoot waves of aircraft and chutes."),
            ("screenshots/web/04-arcade-chute-shot.png", "chute", "Chute shots", "Time your shots before paratroopers land."),
            ("screenshots/web/05-arcade-wave-pressure.png", "wave", "Wave pressure", "Survive escalating waves for a high score."),
        ],
        "how_to": [
            ("1", "Pick a mode", "Arcade for slide-and-shoot; Classic for aim-and-fire."),
            ("2", "Destroy threats", "Shoot aircraft and paratroopers before they reach your turret."),
            ("3", "Chain combos", "Keep accuracy high to maximize score multipliers."),
            ("4", "Beat your best", "Submit scores to leaderboards and unlock achievements."),
        ],
    },
    "power-interval-timer": {
        "namespace": "powerIntervalTimer",
        "repo": Path("/Users/zukman/GIT/PowerIntervalTimer/marketing"),
        "faq": "copy/faq.md",
        "tips": "copy/tips.md",
        "structured": (
            "Power Interval Timer — Tabata and HIIT interval timer for iOS and Android. "
            "Custom work/rest rounds, presets, display modes, audio cues. "
            "Android com.zuki.apps.powerintervaltimer by Zuki Apps."
        ),
        "screenshots": [
            ("screenshots/assets/01-home.png", "home", "Home", "Pick a workout preset or build your own intervals."),
            ("screenshots/assets/02-timer-work.png", "timer", "Work interval", "Large countdown with clear work/rest phases."),
            ("screenshots/assets/03-setup.png", "setup", "Setup", "Configure rounds, durations, and rest periods."),
            ("screenshots/assets/04-display-modes.png", "display", "Display modes", "Choose the view that works in the gym or at home."),
        ],
        "how_to": [
            ("1", "Choose a preset", "Start with Tabata, HIIT, or custom intervals."),
            ("2", "Set work & rest", "Adjust seconds per phase and number of rounds."),
            ("3", "Start the timer", "Follow audio and visual cues through each interval."),
            ("4", "Track sessions", "Repeat workouts and refine your timing."),
        ],
    },
    "sudoku-puzzle": {
        "namespace": "sudokuPuzzle",
        "repo": Path("/Users/zukman/GIT/SudokuPuzzle/marketing"),
        "faq": "copy/FAQ.md",
        "structured": (
            "Sudoku Fun Go — classic Sudoku puzzle game for iOS and Android. "
            "Multiple difficulties, hints, statistics, clean grid UI, 12+ languages. "
            "Android com.zuki.apps.sudokupuzzle by Zuki Apps."
        ),
        "screenshots": [
            ("1.png", "home", "New puzzle", "Pick difficulty and start a fresh grid."),
            ("2.png", "gameplay", "Gameplay", "Fill the grid with notes and smart hints."),
            ("3.png", "victory", "Victory", "Celebrate completion with time and stats."),
            ("4.png", "statistics", "Statistics", "Track wins, streaks, and best times."),
        ],
        "how_to": [
            ("1", "Select difficulty", "Easy to expert — find the level that fits you."),
            ("2", "Fill the grid", "Tap cells, use notes, and avoid duplicate digits per row, column, and box."),
            ("3", "Use hints wisely", "Hints help when stuck without spoiling the whole puzzle."),
            ("4", "Finish & improve", "Complete puzzles to grow your stats and streaks."),
        ],
    },
    "tempo-lab-pro": {
        "namespace": "tempoLabPro",
        "repo": Path("/Users/zukman/GIT/TempoLabPro/marketing"),
        "faq": "web/faq.md",
        "tips": "web/tips-for-musicians.md",
        "structured": (
            "TempoLab Pro — tempo, pitch, and audio practice lab for iOS and Android. "
            "Metronome, loop markers, tap tempo, import/export, EQ and effects for musicians. "
            "Android com.zuki.apps.tempolabpro by Zuki Apps."
        ),
        "screenshots": [
            ("screenshots/examples/01-hero-practice.png", "practice", "Practice view", "Tempo, time signature, and visual beat in one screen."),
            ("screenshots/examples/02-loop-markers.png", "loops", "Loop markers", "Mark sections and loop difficult passages."),
            ("screenshots/examples/03-effects-eq.png", "effects", "Effects & EQ", "Shape tone while you practice along."),
            ("screenshots/examples/04-practice-tap-tempo.png", "tap-tempo", "Tap tempo", "Set BPM by tapping the beat."),
            ("screenshots/examples/05-import-export.png", "import", "Import & export", "Bring backing tracks and save your presets."),
        ],
        "how_to": [
            ("1", "Set tempo", "Enter BPM or tap tempo; pick time signature."),
            ("2", "Load audio", "Import a track or use the built-in click."),
            ("3", "Mark loops", "Place markers around the section you are drilling."),
            ("4", "Practice & adjust", "Tweak EQ, pitch, and effects as you rehearse."),
        ],
    },
    "track-ledger": {
        "namespace": "trackLedger",
        "repo": Path("/Users/zukman/GIT/TrackLedger/marketing"),
        "faq": "content/FAQ.md",
        "tips": "content/TIPS.md",
        "structured": (
            "Track Ledger — offline-first GPS/GNSS track logger for iOS and Android. "
            "Record raw points, elevation profiles, OSM map overlay, export CSV (free) or GPX/GeoJSON (Premium). "
            "Android com.zuki.apps.trackledger by Zuki Apps."
        ),
        "screenshots": [
            ("screenshots/examples/marketing-screenshot-recording.png", "recording", "Recording", "Live distance, speed, and accuracy while logging."),
            ("screenshots/examples/marketing-screenshot-map.png", "map", "Map overlay", "Review tracks on OpenStreetMap tiles."),
            ("screenshots/examples/marketing-screenshot-summary.png", "summary", "Track summary", "Elevation vs distance and session stats."),
            ("screenshots/examples/marketing-screenshot-settings.png", "settings", "Settings", "Sampling, projects, and export options."),
        ],
        "how_to": [
            ("1", "Create a project", "Organize field work into named projects."),
            ("2", "Start recording", "Log raw GNSS points with your chosen sampling mode."),
            ("3", "Review on map", "Inspect path, elevation chart, and accuracy."),
            ("4", "Export data", "Share CSV free; GPX and GeoJSON with Premium."),
        ],
    },
    "zulist": {
        "namespace": "zulist",
        "repo": Path("/Users/zukman/GIT/ZuList/Marketing"),
        "faq": "web/content/en/faq.md",
        "tips": "web/content/en/tips.md",
        "structured": (
            "ZuList — shared shopping lists for iOS and Android. "
            "Real-time sync, home-screen widgets, invite links, export, Premium tiers. "
            "Android com.zuki.apps.zulist by Zuki Apps."
        ),
        "screenshots": [
            ("web/screenshots/exported/home-lists.png", "lists", "Your lists", "Create and manage multiple shopping lists."),
            ("web/screenshots/exported/shared-list.png", "shared", "Shared list", "Collaborate in real time with family or roommates."),
            ("web/screenshots/exported/invite-share.png", "invite", "Invite & share", "Send an invite link — no account required for guests."),
            ("web/screenshots/exported/home-widget.png", "widget", "Home widget", "Glance items from your home screen."),
        ],
        "how_to": [
            ("1", "Create a list", "Add items with quantities and categories."),
            ("2", "Share the list", "Send an invite link so others can edit live."),
            ("3", "Shop together", "Check off items — changes sync instantly."),
            ("4", "Use widgets", "Pin a list to your home screen for quick access."),
        ],
    },
}


def parse_faq_md(path: Path, limit: int = 12) -> list[dict[str, str]]:
    if not path.is_file():
        return []
    text = path.read_text(encoding="utf-8")
    items: list[dict[str, str]] = []

    # ### heading style
    for block in re.split(r"^###\s+", text, flags=re.MULTILINE)[1:]:
        lines = [ln.rstrip() for ln in block.strip().splitlines()]
        if not lines:
            continue
        question = re.sub(r"^#+\s*", "", lines[0]).strip()
        answer_lines = []
        for ln in lines[1:]:
            if ln.startswith("## ") or ln.startswith("### "):
                break
            if ln.strip() == "---":
                continue
            answer_lines.append(re.sub(r"\*\*([^*]+)\*\*", r"\1", ln))
        answer = " ".join(x.strip() for x in answer_lines if x.strip())
        answer = re.sub(r"\s+", " ", answer).strip()
        if question and answer:
            items.append({"question": question, "answer": answer[:600]})
        if len(items) >= limit:
            return items

    # **Question?** answer style (ZuList, Paratrooper, Power Interval)
    for block in re.split(r"^##\s+", text, flags=re.MULTILINE)[1:]:
        for para in re.split(r"\n\s*\n", block):
            m = re.match(r"^\*\*(.+?\?)\*\*\s*\n?(.*)$", para.strip(), re.DOTALL)
            if not m:
                continue
            q = m.group(1).strip()
            a = re.sub(r"\s+", " ", m.group(2).strip())
            if q and a:
                items.append({"question": q, "answer": a[:600]})
            if len(items) >= limit:
                return items

    return items[:limit]


def parse_tips_md(path: Path, limit: int = 8) -> list[dict[str, str]]:
    if not path.is_file():
        return []
    text = path.read_text(encoding="utf-8")
    items: list[dict[str, str]] = []
    for block in re.split(r"^###\s+|^##\s+", text, flags=re.MULTILINE)[1:]:
        lines = [ln.rstrip() for ln in block.strip().splitlines()]
        if not lines:
            continue
        title = lines[0].strip()
        body = " ".join(ln.strip() for ln in lines[1:] if ln.strip() and not ln.startswith("#"))
        body = re.sub(r"\*\*([^*]+)\*\*", r"\1", body)
        body = re.sub(r"^[-*]\s+", "", body)
        if title and body:
            items.append({"title": title, "description": body[:400]})
        if len(items) >= limit:
            break
    if not items:
        for ln in text.splitlines():
            m = re.match(r"^[-*]\s+\*\*([^*]+)\*\*[:\s—-]*(.*)$", ln.strip())
            if m:
                items.append({"title": m.group(1).strip(), "description": m.group(2).strip()[:400]})
            if len(items) >= limit:
                break
    return items


def copy_screenshots(slug: str, repo: Path, shots: list[tuple]) -> list[dict]:
    dest_dir = PUBLIC / "images" / slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    items = []
    for rel_src, sid, title, desc in shots:
        src = repo / rel_src
        if not src.is_file():
            print(f"  skip missing screenshot: {src}")
            continue
        ext = src.suffix.lower()
        dest_name = f"screenshot-{sid}{ext}"
        shutil.copy2(src, dest_dir / dest_name)
        items.append(
            {
                "id": sid,
                "title": title,
                "description": desc,
                "image": f"/images/{slug}/{dest_name}",
                "alt": f"{title} — {slug.replace('-', ' ')}",
                "category": "features",
            }
        )
    return items


def write_faq_md(slug: str, title: str, items: list[dict[str, str]]) -> None:
    out_dir = PUBLIC / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    lines = [f"# FAQ — {title}", "", f"Canonical page: https://zukiapps.com/{slug}", ""]
    for item in items:
        lines.extend([f"## {item['question']}", "", item["answer"], ""])
    (out_dir / "faq.md").write_text("\n".join(lines), encoding="utf-8")


def patch_namespace(data: dict, slug: str, cfg: dict) -> None:
    ns = cfg["namespace"]
    app = data.setdefault(ns, {})
    hero = app.setdefault("hero", {})
    hero["structuredDataDescription"] = cfg["structured"]

    repo: Path = cfg["repo"]
    faq_items = parse_faq_md(repo / cfg["faq"]) if cfg.get("faq") else []
    tip_items = parse_tips_md(repo / cfg["tips"]) if cfg.get("tips") else []

    app["pageNav"] = PAGE_NAV

    shots = copy_screenshots(slug, repo, cfg["screenshots"])
    app["screenshots"] = {
        "title": "Screenshots",
        "subtitle": f"Real app screens from {hero.get('title', slug)}.",
        "featuresTitle": "App screens",
        "items": shots,
    }

    app["howToUse"] = {
        "title": "How to use",
        "steps": [
            {"number": n, "title": t, "description": d}
            for n, t, d in cfg["how_to"]
        ],
    }

    if faq_items:
        app["faq"] = {
            "title": "Frequently asked questions",
            "subtitle": "Quick answers about features, privacy, and billing.",
            "viewAllSupport": "View full support & FAQ",
            "items": faq_items,
        }
        write_faq_md(slug, hero.get("title", slug), faq_items)

    if tip_items:
        app["tips"] = {
            "title": "Tips & tricks",
            "subtitle": "Get more from the app.",
            "items": tip_items,
        }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--app", default="all", help="Slug or 'all'")
    args = parser.parse_args()

    targets = list(APPS.keys()) if args.app == "all" else [args.app]
    data = json.loads(EN_JSON.read_text(encoding="utf-8"))

    for slug in targets:
        if slug not in APPS:
            raise SystemExit(f"Unknown app: {slug}")
        print(f"Syncing {slug}...")
        patch_namespace(data, slug, APPS[slug])

    EN_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Updated messages/en.json")


if __name__ == "__main__":
    main()
