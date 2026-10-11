# Team DADA

A responsive React/Vite portfolio for Team DADA — Developers Advancing Dreams & Aspirations. Built in the existing `D:\Projects\DADA-SITE` workspace, with design references from `D:\Projects\Portfolio`. The reference project is unchanged.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the local address Vite prints. On Windows PowerShell with script execution disabled, use `npm.cmd` instead of `npm`.

```sh
npm run build
npm run preview
npm test
```

The production files are generated in `dist/`. Deploy that directory to a static host. No backend or external service is required to browse the site.

## Editing

- `src/content.js`: all replaceable content, mascot paths, four core-member entries, contributions, achievements, socials, and independent service destinations.
- `src/styles.css`: theme variables, typography, layouts, breakpoints, and reduced-motion behavior.
- `src/components/`: navigation, hero, portfolio sections, enquiry form, footer, and accessible dialogs.
- `src/enquiry.js`: validation and the email API submission interface.
- `public/assets/mascot/`: five transparent blue mascot poses, mapped in `mascotPoses` in `src/content.js`. The pointing, thinking, celebrating, laptop, and waving poses appear in the hero, about, achievements, workshops, and contact sections. Original reference images and earlier variants are preserved; only the isolated blue poses render on the site.
- `public/assets/branding/`: logo reference, blue logo, and favicon. The site uses a black background with electric blue, orange, acid green, and pink accents; the mascot's outfit stays blue.
- `src/components/SignalField.jsx`: decorative canvas waveforms, capped at 30 fps with a limited pixel ratio. Drawing stops when paused or the tab is hidden. Reduced-motion preferences pause the background by default.

The layout is built around oversized poster typography, ambient waveform animation, selectable service channels, offset work panels, a vertical build log, a connected contribution diagram, and a crew roster. Colored borders use layered neon glows. The waveform console has been removed; a small footer control pauses or resumes ambient motion, and reduced-motion preferences are respected. The full DADA expansion is centralized in `siteConfig.fullName` and appears in the hero and footer.

The current mascot wears blue technical streetwear with plain geometric panels, without star patches. The supplied DADA logo reference informs the chest and laptop branding and the blue site wordmark. The final assets were edited using built-in image generation; reproducible prompts and output paths are recorded in `scripts/mascot-blue-streetwear-prompts.json`. PNG alpha is preserved; no poster backgrounds or CSS image masks are used.

`src/portfolio.js` holds the four selected projects, four hackathon records, and three engagement/session records. Projects use descriptions and interface images from `D:\Projects\Portfolio`; competition and session records come from `D:\Projects\DADA-PORTFOLIO\DADA-Portfolio`. The SIH result is explicitly an internal-round win. Session presenter and speaker credit lines are omitted. The build-log highlights derive from the same competition records.

The contribution channels open on mouse hover or activation by tap/keyboard. Projects reveals one image and description at a time, with project selectors, previous/next buttons, arrow keys, and touch swipes. It does not auto-advance. A panel remains open while its content is being explored; Close or Escape dismisses it and restores focus. Images are bundled in `public/assets/projects/` and `public/assets/events/` with no dependency on the source folders at runtime. Academic WDB uses a capture of the supplied portfolio's HTML/CSS conversation preview, labelled as a preview; `scripts/capture-academic-preview.mjs` records its provenance.

The four core members are Darshan C S, Andryan Durai Jebin, Dinesh G, and Akshaya P, in that order. Their roles, portraits, and available profile links come from the DADA portfolio's `data/team.ts` and `public/team/`. Portraits are bundled in `public/assets/team/`. Official team social links remain unconfigured.

The three engagement photo galleries advance automatically every 4.5 seconds with a sliding transition. Each includes previous/next buttons, photo selectors, and a pause/play control. Hover, keyboard focus, manual selection, offscreen galleries, hidden tabs, the footer motion setting, and reduced-motion preferences pause automatic movement. AI Nexus pairs Darshan's conversation photo with the DADA portfolio's expo-stall photo. Hackathon Awareness combines its Darshan portfolio photo with the EchoSense presentation photo from the DADA portfolio. Technical Initiatives uses full-width photo frames with contain sizing so both portrait and landscape photographs remain uncropped. CLICK Deployment includes the first portfolio rollout photo, the DADA portfolio's launch photo, and the supplied `click-deploy1.png` and `click-deploy2.jpeg`. `scripts/prepare-event-photos.mjs` records these sources and prepares oriented, uncropped WebP copies; the original files remain unchanged.

Barlow Condensed, DM Sans, and Space Mono are bundled locally in `public/assets/fonts/`, with their open font licenses. No runtime font CDN connection is required. `scripts/fetch-fonts.py` is an optional maintenance helper to refresh them from Google Fonts.

## Consultancy and workshops

Consultancy opens the bundled `/consultancy/` portfolio. Its components, five client case studies, public contact details, and 15 screenshots were copied from `D:\Projects\DADA-PORTFOLIO\DADA-Portfolio` and adapted to the existing Vite build. The original folder is unchanged. Edit its content in `src/consultancy/data/`, components in `src/consultancy/components/`, and styling in `src/consultancy/styles.css`. Images live in `public/consultancy/projects/`.

The copied portfolio retains client work, Build/Consult services, process, project credits, and contact. Its event/achievement content and team roster are omitted because they are on the main site. Unspecified project placeholder cards are omitted; the supplied aggregate project counts remain. Contact validates and prepares an enquiry locally, with a prefilled email link and copy action, plus the supplied phone and WhatsApp links. It does not call the source project's Next.js API.

The main site and consultancy have separate HTML and CSS entries. Vite builds both with one `npm run build`; the `consultancy-pages` plugin also writes `/consultancy/work/<slug>/index.html` for each case study, supporting direct links and refreshes on a static host. There is no runtime dependency on the source portfolio or a second server. Back-to-Team-DADA links return to `/`.

Set `VITE_CONSULTANCY_URL` only to override the bundled destination. Workshops still uses `VITE_WORKSHOPS_URL`; until configured it opens the existing coming-soon dialog. Rebuild after changing environment variables.

## Email delivery

Email is **not configured**. The site states this clearly and does not claim to send messages. Visitors can validate, prepare, and copy an enquiry. No messages are stored in the browser or sent elsewhere in this mode.

Set `VITE_ENQUIRY_ENDPOINT` to the URL of your real backend (for example, a serverless function), then rebuild. This is a public URL; never put provider credentials in a `VITE_` variable. The form sends:

```http
POST <VITE_ENQUIRY_ENDPOINT>
Content-Type: application/json
Idempotency-Key: <unique ID retained across retries of the same enquiry>
```

```json
{
  "name": "A real visitor",
  "email": "visitor@example.com",
  "organization": "Optional institution",
  "enquiryType": "Project Collaboration",
  "message": "The enquiry text"
}
```

Your backend must:

1. Validate all fields again. Enforce limits matching the UI (name 120, email 254, organization 180, message 5000 characters), and validate the enquiry type.
2. Configure a team inbox, verified sender, and an email provider on the server. Typical **server-only** variables: `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`, and your selected provider’s API key. Their exact names depend on the backend you choose.
3. Use a verified sender and the visitor’s email as `Reply-To`; never accept a sender or destination email from the client.
4. Rate limit requests and implement idempotency using the request header, preventing duplicate email on retries.
5. If the API is on another origin, allow only your deployed site origin in CORS, including `Content-Type` and `Idempotency-Key` headers and the `OPTIONS` preflight.
6. Respond with a successful HTTP status and **`{ "success": true }` only after the email provider accepts the message**. Failed or unconfirmed responses keep the form data and display an error. The frontend aborts unconfirmed requests after 15 seconds and never assumes delivery.

This project supplies the submission interface, not an unconfigured mail server. Add the chosen provider’s implementation to your hosting backend once the team inbox and provider are available.

## Publication metadata

The document includes title, description, theme, favicon, and Open Graph text. Add your actual deployed canonical URL and absolute `og:image` URL once you choose a public hostname. A destination has not been invented.

## Checks

`npm test` checks required-field validation, malformed emails, honest unconfigured behavior, acknowledgement requirements, trimmed payloads, duplicate-request keys, network failures, and timeouts. `npm run build` verifies the production bundle. Browser QA covers responsive layouts, navigation, dialogs, enquiry validation, and endpoint outcomes.
