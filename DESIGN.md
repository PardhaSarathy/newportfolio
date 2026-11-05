# Portfolio design contract

This is an enhancement of Pardhu's existing portfolio, not a new visual direction.
Use the Product Playbook's hierarchy, clarity, spacing and motion principles.
The owner has approved the forest/sage identity and delegated the final polish
decisions on 4 November 2026. The exceptions below preserve that identity.

## Screen plan

1. Question: can Pardhu own and ship useful software from design to production?
2. Hero: his identity and role, followed directly by real, live project previews.
3. Density: a spacious reading experience; project images carry the proof.
4. States: clear selected filters, inline form errors, honest email-draft handoff,
   keyboard focus and certificate previews. No artificial loading states.
5. Avoid: a new theme, generic SaaS decoration, repeated icon-and-paragraph cards,
   a wall of technology chips, and motion on every element.

## Structure and visual lock

- Home: introduction, named live-work links, four production project previews,
  a quiet expertise list, and one closing contact invitation.
- Projects: live work first, followed by case studies and experiments. Preserve
  the factual project statuses and confidentiality boundaries in `lib/projects.ts`.
- Navigation vocabulary: Home, Profile, Projects, Credentials, Contact.
- Keep the approved headline, centered introduction, arch portrait and dock.
- Only public website screenshots are shown. No private app or console screens.
- Detailed case studies lead with the problem and personal contribution, then
  show a public preview, explain user workflows, and describe shipped outcomes.
  Workflow illustrations are labeled; capabilities are not presented as measured impact.
- Use sentence case, specific labels and clear action verbs. Project names and
  technical acronyms keep their proper spelling. Do not invent evidence.

## Tokens and surfaces

The runtime theme tokens are in `app/globals.css`.

| Role | Light | Dark |
| --- | --- | --- |
| Ground | #ede7de | #0a1c16 |
| Card | #f9f6f1 | #112a22 |
| Primary text | #183c32 | #d1ebe1 |
| Secondary text | #40584f | #9cc7b7 |
| Muted text | #52655e | #7fa898 |
| Action | #025a4e | #2cc082 |
| Field boundary | #728b80 | #648f7e |

- Existing type roles: Space Grotesk for display, Manrope for body, JetBrains Mono
  for occasional technical metadata. Do not introduce another family.
- Spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px.
- Project cards: 24px radius / 16px inset on phones; 32px / 24px on desktop.
  Preview radius: 8px, so nested corners share a center.
- Cards use a hairline, not a shadow. Preview images have their own thin outline.
- Keep technology names as quiet text. Use pills for statuses and existing
  navigation/actions. Color must never be the only status cue.
- Touch controls aim for at least 44px. Form fields are at least 48px.
- The dock is a prominent navigation landmark: 64px desktop buttons with 28px
  icons inside a 96px bar. Phones use 48px buttons, reducing to 44px below 360px.
  Keep its wave, reserve bottom clearance, and keep project section links clear.
- Text pairings measured against flat card colors exceed 4.5:1; this is not a
  blanket contrast claim for every translucent layer or image.

## Motion

- Ambient glow is static. No autoplay loops or pulsing availability indicator.
- Cards remain still and visible; hover changes a border or color only.
- Preserve the approved desktop and finger-driven dock wave, tap navigation,
  keyboard labels and reduced-motion handling.
- Keep one modest page/hero arrival. Filter feedback is brief and interruptible.
- No button growth on hover. Large-button press may scale to 0.98.
- Theme changes snap. Reduced motion exposes the final state immediately.

## Portfolio-specific owner decisions

| Date | Playbook rules | Decision |
| --- | --- | --- |
| 2026-11-04 | D5, D10, D13 | Preserve both forest/sage dark and cream/forest light themes. Static ambient glow and dock transparency are intentional identity choices. |
| 2026-11-04 | D11, D25, D31 | Retain the approved typography and existing Lucide family, with the role separation above. Do not replace the visual system solely to satisfy the default banned-family list. |
| 2026-11-04 | D29, D39–42 | Preserve pill actions and the explicitly requested dock magnification/wave. Other surfaces and motion follow the restrained defaults above. |
| 2026-11-04 | D6–7, D98 | Existing labeled engineering-layer accents may distinguish Model, Serving, Infra and Product. Keep these accents local; do not add decorative color fields. |

These decisions apply to this portfolio. They do not change the shared Product
Playbook or the rules for other products.
