# Session brief token budgets

Artspectiv measures **injectable** `sessionStart` context (`additional_context`) using whitespace-delimited **word counts** as a cheap proxy for tokens (~1.3× for rough token estimate).

## Defaults

| Variable | Default | Meaning |
|----------|---------|---------|
| `ARTSPECTIV_BRIEF_GLOBAL_WORD_CAP` | 220 | Max words: static template + dynamic slices |
| `ARTSPECTIV_BRIEF_CONSTRAINTS_WORDS` | 48 | Active constraints block |
| `ARTSPECTIV_BRIEF_DECISIONS_WORDS` | 48 | Recent Decision Log slice |
| `ARTSPECTIV_BRIEF_DIRECTION_WORDS` | 32 | Current Direction fragment |
| `ARTSPECTIV_BRIEF_SKILLS_WORDS` | 64 | Skill catalogue index |
| `ARTSPECTIV_BRIEF_DEEPER_WORDS` | 28 | Deeper context pointers |
| `ARTSPECTIV_BRIEF_QUALITY_WORDS` | 24 | Output quality reminder |
| `ARTSPECTIV_BRIEF_RECENT_DL` | 3 | DL entries in brief |
| `ARTSPECTIV_BRIEF_SKILL_BLURB_CHARS` | 80 | Per-skill description length |

Implementation: [`.cursor/hooks/lib/brief-budgets.mjs`](../../.cursor/hooks/lib/brief-budgets.mjs)

## Re-measure (PowerShell)

```powershell
$env:CURSOR_PROJECT_DIR = (Get-Location).Path
'{}' | node .cursor/hooks/session-start.mjs
```

Parse JSON `additional_context` and count words (split on whitespace).

## Baseline

Recorded **2026-05-26** after initial harness wiring. Re-run the command above after template or AGENTS changes and update this section.

| Metric | Value |
|--------|------:|
| Target cap | 220 words |
| Notes | Static template ~120 words; skills trimmed before AGENTS slices |

## Subagent mode

Set `CURSOR_SUBAGENT=true` on the hook subprocess for **template + Active Constraints only** (no skill catalogue).

## Redaction

Do not promote secrets into AGENTS or shared docs. Secret gates: [`.cursor/hooks/lib/sensitive-paths.mjs`](../../.cursor/hooks/lib/sensitive-paths.mjs).

## Acceptance

- `npm run verify:agent-harness` passes
- `npm run test:hooks` passes
- Brief still surfaces **Active Constraints** and **Recent Decisions** after tightening
