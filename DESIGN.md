# Design System Strategy: The Cosmic Ledger

## 1. Overview & Creative North Star
**Creative North Star: The Cosmic Ledger**
This design system is built to evoke the feeling of an immutable, high-tech ledger floating in deep space. It rejects the "flatness" of traditional SaaS in favor of **visual gravity** and **editorial precision**. For Indian founders who value both rapid innovation and deep-rooted trust, this system translates "brutal honesty" into sharp edges, high-contrast typography, and layered depth.

We break the "standard template" look by utilizing:
*   **Intentional Asymmetry:** Breaking the grid with oversized typography and overlapping "glass" containers.
*   **Atmospheric Depth:** Using "light-bleed" radial glows to highlight focal points, suggesting a light source behind the UI.
*   **The Editorial Scale:** Treating the interface like a premium business journal—dramatic headings paired with hyper-legible data.

---

## 2. Color Architecture & The Tonal Rulebook
The palette is rooted in a deep, near-black purple (`surface: #200c1c`), providing a sophisticated alternative to standard greys or pure blacks.

### The "No-Line" Rule
Standard UI relies on 1px solid borders to separate sections. In this system, **1px solid borders are prohibited for sectioning.** Boundaries must be defined through:
1.  **Tonal Shifts:** Placing a `surface_container_high` (#3a2334) card against a `surface` (#200c1c) background.
2.  **Negative Space:** Using the Spacing Scale (e.g., `spacing-16`) to let content breathe.
3.  **Light Bleed:** Using a subtle `primary_container` (#7c3aed) radial gradient to "lift" an area.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent materials. 
*   **Base:** `surface_dim` (#200c1c) for the primary application canvas.
*   **Nesting:** When a component sits inside another, it should move one step "up" the hierarchy (e.g., a `surface_container_highest` (#452d3f) input field inside a `surface_container_low` (#2a1425) card).

### The Glass & Gradient Rule
To achieve "Futuristic Trust," use **Glassmorphism** for floating elements (modals, dropdowns, sticky navs):
*   **Fill:** `surface_variant` (#452d3f) at 60% opacity.
*   **Effect:** `backdrop-filter: blur(12px)`.
*   **Stroke:** See "The Ghost Border" in Section 4.

---

## 3. Typography: The Editorial Voice
Our typography balances the aggressive modernity of **Plus Jakarta Sans** with the utilitarian clarity of **Inter**.

*   **Display & Headlines (Plus Jakarta Sans):** Use `display-lg` (3.5rem) for hero statements. Apply **tight tracking (-2%)** and **bold/extra-bold weights**. This creates an authoritative "Editorial" feel that demands attention.
*   **Body & Titles (Inter):** Use `body-lg` (1rem) for primary reading. Ensure a generous line-height (1.6) to provide relief against the high-contrast dark background.
*   **Labels (Inter):** Use `label-md` (0.75rem) in `on_surface_variant` (#ccc3d8) for metadata. These should feel like "technical annotations" on the ledger.

---

## 4. Elevation & Depth
Depth is not an ornament; it is functional hierarchy.

### The Layering Principle
Avoid traditional drop shadows for every card. Instead, stack your tokens:
*   A `surface_container_lowest` (#1b0717) card provides a "sunken" feel for secondary data.
*   A `surface_bright` (#4a3143) card creates a "raised" effect for primary calls to action.

### Ambient Shadows
When a component must "float" (e.g., a Primary Button or Modal), use an **Ambient Shadow**:
*   **Color:** A tinted version of `primary` (#7c3aed) at 20% opacity.
*   **Values:** `0 10px 30px -10px`. This mimics a soft purple glow rather than a muddy grey shadow.

### The "Ghost Border" Fallback
If accessibility requires a container boundary, use a **Ghost Border**:
*   **Token:** `outline_variant` (#4a4455).
*   **Execution:** 1px solid at **15% opacity**. It should be felt, not seen.

---

## 5. Signature Components

### Buttons (The "Core Engine")
*   **Primary:** Gradient from `primary_container` (#7c3aed) to `tertiary_container` (#7645e0). 
    *   **Radius:** `lg` (0.75rem/12px).
    *   **Hover:** Add a `primary` outer glow (`box-shadow: 0 0 20px rgba(124, 58, 237, 0.4)`).
*   **Secondary:** Ghost variant with the "Ghost Border" and `on_surface` text.

### Input Fields (The "Command Line")
*   **Background:** `surface_container_lowest` (#1b0717).
*   **Interaction:** On focus, the border transitions to `primary` (#d2bbff) with a 4px soft outer glow.
*   **Typography:** Use `body-md` for user input to maintain a sleek, technical profile.

### Cards & Information Display
*   **Constraint:** Absolutely no divider lines. 
*   **Separation:** Use `surface_container` shifts. For a list within a card, the list items should be `surface_container_low` against a `surface_container_high` card body.
*   **Rounding:** `xl` (1.5rem/16px) for main containers to soften the "brutally honest" tone.

### Status Indicators (The "Score")
*   **Success:** `secondary` (#4edea3) with a `0 0 12px` emerald glow.
*   **Danger:** `error` (#ffb4ab) with a `0 0 12px` red glow.
*   **Tone:** Use these sparingly. In a "Brutally Honest" system, the color should only appear when the data warrants a reaction.

---

## 6. Do’s and Don’ts

### Do:
*   **Use High Contrast:** Pair `display-lg` in `on_surface` (#fdd8ef) with `body-sm` in `on_surface_variant` (#ccc3d8).
*   **Embrace the Purple:** Use the purple-tinted `surface_dim` for backgrounds rather than generic dark grey.
*   **Vary Rounding:** Use `xl` for large layout blocks and `md` for smaller interactive elements like chips to create visual hierarchy.

### Don’t:
*   **Don't use 100% white (#FFFFFF):** It is too harsh. Always use `on_surface` (#fdd8ef) for text.
*   **Don't use flat buttons:** Every primary action should feel like it has "energy" (via gradients or subtle glows).
*   **Don't use standard shadows:** Never use `rgba(0,0,0,x)`. Always tint your shadows with the background or primary purple.
*   **Don't crowd the edges:** Indian founders are moving toward global premium standards; use the `spacing-20` (5rem) and `spacing-24` (6rem) tokens for page margins to convey "luxury of space."