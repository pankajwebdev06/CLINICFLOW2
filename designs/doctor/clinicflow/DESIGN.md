---
name: ClinicFlow
colors:
  surface: '#faf8ff'
  surface-dim: '#d8d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#ecedf9'
  surface-container-high: '#e6e7f3'
  surface-container-highest: '#e1e2ee'
  on-surface: '#191b24'
  on-surface-variant: '#424655'
  inverse-surface: '#2d3039'
  inverse-on-surface: '#eff0fc'
  outline: '#727787'
  outline-variant: '#c2c6d8'
  surface-tint: '#0057ce'
  primary: '#0057cd'
  on-primary: '#ffffff'
  primary-container: '#0d6efd'
  on-primary-container: '#ffffff'
  inverse-primary: '#b1c5ff'
  secondary: '#575f67'
  on-secondary: '#ffffff'
  secondary-container: '#d8e1ea'
  on-secondary-container: '#5b646b'
  tertiary: '#a63b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cf4b00'
  on-tertiary-container: '#ffffff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b1c5ff'
  on-primary-fixed: '#001946'
  on-primary-fixed-variant: '#00419e'
  secondary-fixed: '#dbe4ed'
  secondary-fixed-dim: '#bfc8d0'
  on-secondary-fixed: '#141d23'
  on-secondary-fixed-variant: '#3f484f'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb599'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7f2b00'
  background: '#faf8ff'
  on-background: '#191b24'
  surface-variant: '#e1e2ee'
typography:
  headline-lg:
    fontFamily: Public Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  touch-target-min: 48px
  container-margin: 16px
  gutter: 12px
---

## Brand & Style
The brand personality is rooted in clinical precision and operational reliability. This design system is built for healthcare professionals who require speed and accuracy in high-stakes environments. The aesthetic follows a **Corporate / Modern** movement, emphasizing clarity and order over decorative flair. 

The visual language communicates trustworthiness through stability and cleanliness. By stripping away unnecessary ornamentation and focusing on information density that remains legible, the interface reduces cognitive load for clinicians and administrative staff. The result is a utilitarian yet sophisticated environment that feels like a professional medical instrument.

## Colors
The palette is led by a Professional Medical Blue, chosen for its associations with authority and hygiene. A system of soft whites and cool greys forms the backdrop, ensuring the interface feels airy and sterile without causing eye strain. 

Status colors are high-chroma to ensure immediate recognition in busy clinic environments: 
- **Success (Green):** Indicates completed tasks or stable vitals.
- **Waiting (Amber):** Signals urgency or pending actions in the queue.
- **Cancelled (Red):** Flags critical errors, alerts, or cancelled appointments.

Contrast ratios must strictly adhere to WCAG AA standards to ensure readability on low-end mobile displays and in varied lighting conditions.

## Typography
This design system utilizes **Public Sans**, an institutional and highly accessible sans-serif. The typeface was selected for its neutral tone and exceptional legibility at small sizes on mobile screens. 

To accommodate low-end devices and varied visual acuity among staff, the type scale starts at a larger base size (16px for body text). Headlines use a heavier weight to provide clear section anchoring. Data-heavy labels utilize increased letter spacing and semi-bold weights to ensure that critical patient data—such as timestamps and ID numbers—is unmistakable at a glance.

## Layout & Spacing
The layout follows a strict **8pt spacing system**, ensuring mathematical harmony across all views. For its mobile-first application, the design system employs a fluid 4-column grid with 16px side margins. 

Operational efficiency is prioritized through generous touch targets. Every interactive element—from navigation tabs to vitals toggles—must maintain a minimum height and width of 48dp. This prevents accidental taps in fast-paced clinical workflows. Vertical rhythm is maintained by using 16px (md) or 24px (lg) increments between card components to clearly separate patient records in the queue.

## Elevation & Depth
Depth is conveyed primarily through **tonal layers** and **low-contrast outlines** rather than heavy shadows. This maintains the "clean/clinical" aesthetic. 

- **Surface Level 0:** The soft-grey background (#F8F9FA).
- **Surface Level 1:** White cards (#FFFFFF) with a 1px border (#DEE2E6). This is the standard for patient cards and queue items.
- **Surface Level 2:** Subtle, diffused shadows are reserved exclusively for "active" states or floating action buttons (FABs), providing a physical metaphor for elements that are currently being interacted with. 

Avoid using blurs or frosted-glass effects, as they can degrade performance on low-end hardware and distract from data clarity.

## Shapes
The design system uses a **Rounded** shape language to balance professional rigor with modern approachability. 

The standard corner radius is set to 8px (0.5rem), providing a softened edge to medical data that might otherwise feel cold. For larger containers like patient cards or modals, a radius of 12px is permitted to reinforce the "card-based" container metaphor. Interactive elements like "vitals chips" or "status badges" utilize a pill-shape (fully rounded) to distinguish them from structural layout components.

## Components
Consistent styling of components is vital for the operational speed of the design system:

- **Buttons:** High-contrast primary buttons use the Primary Blue (#0D6EFD) with white text. They must be 48px tall to meet touch target requirements. 
- **Status Badges:** Compact, pill-shaped indicators. Use high-contrast background tints with dark text (e.g., Amber background with Dark Brown text) to signal status without overwhelming the patient's name.
- **Vitals Chips:** Small, interactive badges used for displaying heart rate, blood pressure, or temperature. They should be styled with subtle borders and clear icons to allow for quick scanning.
- **Queue Cards:** The primary container for patient info. Cards should feature a vertical "status strip" on the left edge, using the status colors (Success, Waiting, Cancelled) to provide a color-coded vertical scan-line for doctors.
- **Input Fields:** Large, 48px height fields with 1px borders. Use "Public Sans" at 16px for input text to ensure clarity during data entry. Label text should always be visible above the field, never hidden as placeholder text.