# Design QA

Source visual truth path:

- `C:\Users\THINKPAD X1\.codex\attachments\5604ff16-088a-4229-a898-cce8f496cb31\image-1.png`

Implementation screenshot path:

- `C:\tmp\base-cms-home-full-pass-2.png`

Viewport:

- Desktop

State:

- Default homepage load state

Full-view comparison evidence:

- Compared the current local homepage capture against the provided homepage screenshot at the same desktop/default state.

Focused region comparison evidence:

- Hero/header region required a focused pass because fidelity depends on logo scale, nav spacing, CTA treatment, blur-panel sizing, and hero image integration.
- Mid-page comparison still required for service/doctor/process/compliance/FAQ rhythm because those details are too dense to validate from code alone.

Patches made since the previous QA pass:

- Reworked homepage hero into a full-bleed background treatment with a generated clinic image and translucent blur panel for the text stack.
- Tightened topbar/header density, added icon-led topbar items, and updated the header CTA to better match the reference hierarchy.
- Removed `Trang chủ` from the main visible nav row to align more closely with the screenshot menu composition.
- Reduced hero headline density, panel size, chip size, and spacing so the hero reads closer to the reference.
- Strengthened blog/FAQ/doctor authority content and added JSON-LD support for FAQ, article, and physician pages.
- Compressed mid-page cards, icon sizes, FAQ row heights, knowledge cards, booking CTA proportions, and footer rhythm to reduce the generic system-page feel.
- Reworked the bottom CTA panel to remove the portrait-heavy layout and pushed the footer toward the icon-led, denser structure visible in the reference.

**Findings**

- [P1] Hero is closer, but still not screenshot-faithful enough
  Location: homepage header + hero.
  Evidence: the current build now has the correct full-width image direction and a readable text overlay, but the reference still has a lighter, flatter text zone with less card-like separation. The generated hero image also differs in subject framing and clinic branding details from the reference.
  Impact: this is the most visible region of the landing page, so remaining drift is immediately noticeable.
  Fix: keep the full-bleed approach, but soften the blur panel further, reduce the visual edge of the panel, and refine image framing/logo placement to feel more naturally integrated.

- [P1] Mid-page sections still read as a polished system page rather than a near-clone
  Location: about, services, doctor/process, compliance, reasons.
  Evidence: the reference uses tighter card heights, smaller typography, thinner borders, and more uniform vertical rhythm. The current implementation is now notably denser than before, but card proportions and text density still remain slightly more app-like than the source screenshot.
  Impact: even with the right section order, the page does not yet visually land as the same design.
  Fix: compress card heights, reduce body copy size slightly, tighten section gaps, and normalize border/radius/shadow values across the mid-page modules.

- [P1] FAQ + knowledge cluster is directionally right but not yet visually equivalent
  Location: lower-middle homepage cluster.
  Evidence: the current layout has the correct split and authority content, and the bottom CTA/footer are now closer to the source, but the FAQ rows and article cards still feel heavier and more card-like than the reference.
  Impact: this block is a key trust/SEO area and still breaks screenshot fidelity.
  Fix: reduce FAQ row height, tighten article card internals, and simplify the links panel spacing to match the source more closely.

- [P2] Footer remains structurally correct but visually heavier than the reference
  Location: homepage footer.
  Evidence: the footer now has a closer icon-led reading pattern and denser spacing, but the reference footer is still flatter and more compact than the implementation.
  Impact: final-page polish still feels off even though the content model is stronger.
  Fix: reduce footer heading/body spacing, trim column widths and padding, and compress the legal-note row.

- [P2] Available imagery is now stronger, but not one-to-one with the source visual
  Location: hero and content imagery.
  Evidence: the hero uses a generated long-form clinic image, which solves the full-bleed requirement, but it is not a faithful recreation of the exact clinic/reception visual shown in the screenshot.
  Impact: this limits how close the implementation can get to the reference without another art-direction pass.
  Fix: iterate on the hero art direction again if stricter visual cloning is required.

**Open Questions**

- The current generated hero image is acceptable for the requested full-screen background direction, but it is still a design-adjacent replacement rather than a one-to-one recreation of the source screenshot.

**Implementation Checklist**

- Soften and integrate the hero blur panel further so it reads less like a floating card.
- Tighten card heights, copy scale, and spacing across the mid-page sections.
- Refine the FAQ + knowledge cluster for denser row/card proportions.
- Compress footer spacing and visual weight.

**Follow-up Polish**

- Fine-tune the hero image crop/subject position once the panel treatment is locked.
- Add more screenshot-specific micro-typography adjustments to doctor/process/compliance cards.

Final result:

final result: blocked
