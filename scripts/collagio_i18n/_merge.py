from __future__ import annotations

from typing import Any


def deep_merge(base: dict[str, Any], override: dict[str, Any]) -> dict[str, Any]:
    if override is None:
        return base
    if base is None:
        return override
    result = {**base}
    for key, value in override.items():
        if (
            key in result
            and isinstance(result[key], dict)
            and isinstance(value, dict)
            and not isinstance(result[key], list)
            and not isinstance(value, list)
        ):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result
