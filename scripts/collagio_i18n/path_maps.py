import json
from pathlib import Path

PATH_MAPS: dict[str, dict[str, object]] = {}
_maps_dir = Path(__file__).parent / "maps"
if _maps_dir.exists():
    for path in sorted(_maps_dir.glob("*_strings.json")):
        loc = path.stem.replace("_strings", "")
        PATH_MAPS[loc] = json.loads(path.read_text(encoding="utf-8"))
