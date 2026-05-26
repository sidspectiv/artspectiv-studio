---
name: artspectiv-memory
description: Institutional memory — Decision Log, Gotchas, sceptical verification of AGENTS.md, promotion to rules.
---

# Artspectiv memory protocol

Use when work touches **constraints, past decisions, or promotion to rules**.

## Sceptical memory

1. Treat **AGENTS.md** entries as **claims**, not facts.
2. Before acting on a remembered pattern, **verify** with `Grep` / `Read` against the current repo.
3. If memory contradicts the codebase, **prefer the code** and plan an AGENTS.md correction.

## When to write AGENTS.md

- **Decision Log:** substantive product, copy, or technical decision (2–4 lines per field). Append only.
- **Gotchas:** operational traps that will recur (pricing, asset names, CTA flow).
- **Current Direction:** shift in priorities (short bullets).

Do **not** log typos or one-line fixes.

## Decision Log template

```text
### DL-NNN: [Short title] (YYYY-MM-DD)
**Area:** frontend | copy | deploy | infra | UX
**Context:** …
**Decision:** …
**Outcome:** Worked | Partially worked | Failed | Abandoned
**Lesson:** …
```

## Rule lineage radar

1. **Classify** the learning (frontend, QA, deploy, workflow).
2. **Route** to the single primary `.cursor/rules/*.mdc` per AGENTS.md routing table.
3. **Consolidate** there; at most 1–3 lines in `artspectiv-global.mdc` if cross-cutting.
4. Never paste full skill bodies into MDC files.

## Memory promotion pipeline

1. Capture — hooks (`afterAgentResponse`, `stop`)
2. Distil — human or `agents-memory-updater` subagent
3. Approve — `npm run verify:agent-harness`
4. Promote — Gotchas → skill → scoped `.mdc`

## Pointers

- Session brief: `.cursor/hooks/session-start.mjs`
- Adding skills: `.cursor/skills/artspectiv-skill-install/SKILL.md`
