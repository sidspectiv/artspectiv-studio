# Codex Brief: Artspectiv Studio

## Role
You are maintaining a premium static website for **Artspectiv Studio**, a New Barnet and North London content studio.

## Business positioning
Artspectiv Studio sells productised visual content packages for cafés, brunch spots, restaurants, bars, salons, nail studios, beauty clinics and local lifestyle brands, and can also manage posting rhythm across social platforms.

Core promise:
> Monthly visual content for local businesses that need their online presence to match the quality of the real-life experience.

## Conversion objective
Primary goal: get business owners to request a content shoot quickly.
Secondary goal: build trust instantly through local proof, specific deliverables, clear terms, and practical posting support.

Primary CTA copy:
> Request a content shoot

## Current offer and pricing
- Starter Content Shoot — from £445
- Monthly Content Bank — from £945
- Campaign Content Day — from £1,595

Do not reintroduce legacy pricing (£225/£695/£1,095) unless explicitly requested.

## Brand and copy guardrails
Keep the experience dark editorial, premium, warm, and plain English.

Avoid:
- generic freelancer language
- corporate jargon
- fake growth claims
- cluttered portfolio-first flow

## Technical guardrails
- Static site only
- Keep `index.html` as primary entry
- No heavy framework
- Vanilla HTML/CSS/JS preferred
- Preserve Cloudflare Pages compatibility
- Keep performance high
- All images under `assets/`

## Harness engineering implementation rules
Use a repeatable delivery harness on each iteration:

1. **Prompt harness**
   - Restate audience, conversion goal, and non-negotiables.
2. **Build harness**
   - Implement in slices: structure -> offer copy -> style -> accessibility polish.
3. **QA harness**
   - Check mobile first (small, tablet, desktop), CTA visibility, proof clarity, package scanability, fallback behaviour, and keyboard focus states.
4. **Handoff harness**
   - Summarise what changed, what remains, and what should be replaced later (for example mailto with Tally/Formspree).

## Required page narrative order
1. Hero
2. Credibility strip
3. Problem framing
4. Offers
5. Rita's Café case study
6. Curated portfolio
7. Process
8. Terms
9. FAQ
10. Final CTA

## Tone checks before shipping
- Is it clear, human, and local?
- Would a busy owner understand the offer in under 10 seconds?
- Is the next step obvious on mobile without scrolling too far?
