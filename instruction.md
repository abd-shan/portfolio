You are not doing cosmetic edits.

You are rebuilding an existing developer portfolio into a production-grade modern portfolio while preserving content meaning.

The current codebase is plain HTML, CSS, and JavaScript, unstructured, inconsistent, and contains technical debt.

Your task is to refactor and elevate it carefully as if preparing it for a senior frontend engineer portfolio.

The final result must feel:

* exceptional
* minimal
* intelligent
* engineering-focused
* premium but restrained

The visitor must immediately feel:

"This developer understands systems, not just UI."

---

# Global Execution Rules

1. Never perform large uncontrolled rewrites.
2. Work in isolated phases only.
3. At the end of every phase:

    * verify output
    * report risks
    * stop before continuing
4. If any instability appears:

    * rollback before proceeding
5. Preserve current content meaning unless improvement is clearly justified.

---

# Phase 1 — Full Audit Only

Goal:
Understand the current project before changing anything.

Tasks:

* inspect HTML structure
* inspect CSS organization
* inspect JS behavior
* detect duplicated code
* detect weak naming
* detect layout risks
* detect performance risks

Output required:

* HTML weaknesses
* CSS weaknesses
* JS weaknesses
* maintainability risks
* immediate dangerous areas

Rules:

* do not modify code
* do not redesign
* do not optimize yet

Stop after audit.

Mandatory verification before phase completion:

* confirm no files changed

---

# Phase 2 — Safe HTML Refactor

Goal:
Clean structure without changing appearance.

Tasks:

* improve semantic tags
* normalize section hierarchy
* clean unnecessary wrappers
* improve accessibility where obvious
* keep DOM stable

Forbidden:

* no visual redesign
* no animation
* no class explosion

Verification required:

* layout visually unchanged
* all sections still render
* no content missing

Stop after verification.

---

# Phase 3 — CSS Structural Refactor

Goal:
Make styles maintainable without changing design intent.

Tasks:

* group related styles
* remove duplicate declarations
* improve selector clarity
* separate layout / typography / component logic
* improve naming consistency carefully

Forbidden:

* no aggressive redesign
* no random color changes

Verification required:

* no visual breakage
* no cascade conflict
* no mobile regression

Stop after verification.

---

# Phase 4 — JavaScript Safety Refactor

Goal:
Stabilize JS without changing user-visible behavior.

Tasks:

* detect repeated logic
* isolate event listeners
* improve naming
* remove unsafe patterns
* reduce fragile DOM dependencies

Forbidden:

* no new features yet

Verification required:

* all existing interactions still work
* no console errors
* no broken listeners

Stop after verification.

---

# Phase 5 — Visual Upgrade Layer

Goal:
Elevate visual quality carefully.

Allowed:

* spacing refinement
* typography hierarchy
* card polish
* hover refinement
* section balance

Forbidden:

* no flashy redesign
* no heavy visual experimentation

Verification required:

* premium visual consistency
* no overflow
* mobile preserved

Stop after verification.

---

# Phase 6 — Motion Layer

Goal:
Add subtle premium interaction.

Allowed:

* reveal animations
* subtle transitions
* hover depth

Forbidden:

* animation overload
* distracting movement

Rules:

Motion must communicate confidence.

Verification required:

* smooth animation
* no FPS drop
* content remains primary

Stop after verification.

---

# Phase 7 — Optional Premium Technical Effect

Goal:
Add one advanced premium effect only if justified.

Choose only one:

* subtle background depth
* mouse-reactive light
* minimal particle field

Rules:

* lightweight only
* optional fallback required
* no heavy rendering

Verification required:

* first paint remains fast
* CPU impact acceptable
* effect does not dominate content

Stop after verification.

---

# Phase 8 — Final Engineering Review

Goal:
Validate final quality honestly.

Check:

* semantic quality
* CSS maintainability
* JS clarity
* visual coherence
* performance risks
* remaining technical debt

Output required:

* what improved
* what still needs improvement
* what should not be touched further

---

# Critical Decision Rule

When uncertain:

Prefer engineering clarity over visual complexity.

---

# Mandatory Stop Rule

Never continue automatically to next phase without explicit verification.

Always finish one phase fully before moving to another.
