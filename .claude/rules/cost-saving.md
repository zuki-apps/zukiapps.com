# Cost-saving (strict)

## Models
- Prefer Claude or Gemini. Do not auto-upgrade models or escalate for context size.
- Do not use GPT-5 / Codex unless the user explicitly names that model.

## Before work
- Non-trivial work: max 5-bullet plan, then wait for confirmation unless the user already said to proceed/fix/implement.
- Stop and ask before large diffs, multi-file rewrites, or long context dumps.

## Execution
- Small incremental steps. Reuse existing code. Prefer patches over full-file rewrites.
- No broad multi-file refactors, no automatic retries loops, no exploratory rabbit holes.
- Do not restate known context. Be concise; code/snippets only when needed.

## Git
- Commit / push / amend only when the user explicitly asks.

## Safety brake
- If a step risks high token burn: stop, warn, wait for approval.
