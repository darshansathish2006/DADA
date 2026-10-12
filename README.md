# Team DADA

A responsive React/Vite portfolio for Team DADA — Developers Advancing Dreams & Aspirations. Built in the existing `D:\Projects\DADA-SITE` workspace, with design references from `D:\Projects\Portfolio`. The reference project is unchanged.

## Run

Uses Node.js 24.x, matching GitHub Actions and the Vercel project setting declared in `package.json`.

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

### Vercel

Import this GitHub repository into Vercel with the repository root as the **Root Directory**. The checked-in `vercel.json` selects **Vite**, installs with `npm ci`, runs `npm test && npm run build`, and publishes **dist**. No Vercel Functions or additional email credentials are needed; enquiry delivery uses the existing Google Apps Script service.

Vercel uses the root path `/`. Keep the build command from `vercel.json`; the `/DADA/` base flag belongs only to the GitHub Pages workflow. The build emits separate HTML files for `/`, `/workshop/`, `/consultancy/`, and every `/consultancy/work/<slug>/` case study, so direct links and refreshes work without a catch-all SPA rewrite. `trailingSlash: true` keeps directory URLs consistent. See [Vercel's Vite guide](https://vercel.com/docs/frameworks/frontend/vite) and [configuration reference](https://vercel.com/docs/project-configuration/vercel-json).

The shared Google endpoint is already configured in source. To use another deployment, set `VITE_ENQUIRY_ENDPOINT` in Vercel's project environment variables and redeploy; `VITE_WORKSHOP_ENQUIRY_ENDPOINT` is an optional workshop-only override. These are public URLs, never passwords. Before publishing the required-phone forms, update the existing Apps Script deployment using [the phone-contact upgrade instructions](apps-script/README.md#update-the-existing-deployment-for-phone-enquiries). Verify the endpoint reports `version: 2` and `ready: true`.

### GitHub Pages

The repository uses `.github/workflows/deploy-pages.yml` to test, build, and deploy `dist/` on pushes to `master`. Pages must use **GitHub Actions** as its source, rather than publishing the source branch directly. The public site is `https://darshansathish2006.github.io/DADA/`.

The workflow builds with `npm run build -- --base /DADA/`. Images, navigation, workshop and consultancy routes, and case studies resolve through Vite's deployment base. For a root-domain host or ordinary local development, the default base remains `/`. To preview the Pages build locally, use `npm run preview -- --base /DADA/` and open `/DADA/` on its printed origin. If the repository name or hosting path changes, update the workflow's build base.

## Editing

- `src/content.js`: all replaceable content, mascot paths, four core-member entries, contributions, achievements, socials, and independent service destinations.
- `src/styles.css`: theme variables, typography, layouts, breakpoints, and reduced-motion behavior.
- `src/section-refresh.css`: the About photo composition, client/workshop invitations, and contribution gallery previews.
- `src/components/`: navigation, hero, portfolio sections, enquiry form, footer, and accessible dialogs.
- `src/enquiry.js`: validation and the email API submission interface.
- `public/assets/mascot/`: five transparent blue mascot poses, mapped in `mascotPoses` in `src/content.js`. The pointing, thinking, celebrating, laptop, and waving poses appear in the hero, about, achievements, workshops, and contact sections. Original reference images and earlier variants are preserved; only the isolated blue poses render on the site.
- `public/assets/branding/`: logo reference, blue logo, and favicon. The site uses a black background with electric blue, orange, acid green, and pink accents; the mascot's outfit stays blue.
- `src/components/SignalField.jsx`: decorative canvas waveforms, capped at 30 fps with a limited pixel ratio. Drawing stops when paused or the tab is hidden. Reduced-motion preferences pause the background by default.

The layout is built around oversized poster typography, ambient waveform animation, selectable service channels, offset work panels, a vertical build log, a connected contribution diagram, and a crew roster. Colored borders use layered neon glows. The waveform console has been removed; a small footer control pauses or resumes ambient motion, and reduced-motion preferences are respected. The full DADA expansion is centralized in `siteConfig.fullName` and appears in the hero and footer.

The header's Light mode / Dark mode button switches the main site between its original black canvas and white surfaces with dark, readable text. Light mode is the default for visitors without a saved preference. Neon borders and original image colors are preserved. The preference is saved locally as `dada-theme` and restored before rendering; the switch also works when browser storage is unavailable. `src/theme.css` covers the header, sections, galleries, forms, and dialogs.

The current mascot wears blue technical streetwear with plain geometric panels, without star patches. Its five poses use the more mature face from the supplied orange DADA poster: a defined jaw, fuller beard, calmer expression, and more balanced head proportions. The supplied DADA logo reference informs the chest and laptop branding and the blue site wordmark. The face updates were edited using built-in image generation; their prompts and paths are recorded in `scripts/mascot-mature-face-prompts.json`, and the earlier outfit/logo prompts remain in `scripts/mascot-blue-streetwear-prompts.json`. The active transparent cutouts are `public/assets/mascot/dada-mature-*.png`; PNG alpha is preserved, with no poster backgrounds or CSS image masks.

`src/portfolio.js` holds the four selected projects, four hackathon records, and three engagement/session records. Projects use descriptions and interface images from `D:\Projects\Portfolio`; competition and session records come from `D:\Projects\DADA-PORTFOLIO\DADA-Portfolio`. The SIH result is explicitly an internal-round win. Session presenter and speaker credit lines are omitted. The build-log highlights derive from the same competition records.

About combines the CLICK launch team photo, CLICK interface preview, and blue mascot with decorative circuit animation. Its four principles form a connected strip. Stage 4 explicitly invites visitors to build their company's project or arrange a workshop, with full-card activation and filled action bars. The workshop card opens the bundled workshop catalogue. Stage 6 has image previews, counts, visible click-to-open labels, and filled actions for each gallery. All new assets use the deployment base, and circuit animation follows reduced-motion and the footer's pause control.

The contribution channels preview on mouse movement over a card and open on activation by tap/keyboard. A clicked selection stays open until another card is activated or the panel is closed, so incidental hover cannot replace it. Projects reveals one image and description at a time, with project selectors, previous/next buttons, arrow keys, and touch swipes. It does not auto-advance. Close or Escape dismisses the panel and restores focus. Images are bundled in `public/assets/projects/` and `public/assets/events/` with no dependency on the source folders at runtime. Academic WDB uses a capture of the supplied portfolio's HTML/CSS conversation preview, labelled as a preview; `scripts/capture-academic-preview.mjs` records its provenance.

The four core members are Darshan C S, Andryan Durai Jebin, Dinesh G, and Akshaya P, in that order. Their roles, portraits, and available profile links come from the DADA portfolio's `data/team.ts` and `public/team/`. Portraits are bundled in `public/assets/team/`. Official team social links remain unconfigured.

The three engagement photo galleries advance automatically every 4.5 seconds with a sliding transition. Each includes previous/next buttons, photo selectors, and a pause/play control. Hover, keyboard focus, manual selection, offscreen galleries, hidden tabs, the footer motion setting, and reduced-motion preferences pause automatic movement. AI Nexus pairs Darshan's conversation photo with the DADA portfolio's expo-stall photo. Hackathon Awareness combines its Darshan portfolio photo with the EchoSense presentation photo from the DADA portfolio. Technical Initiatives uses full-width photo frames with contain sizing so both portrait and landscape photographs remain uncropped. CLICK Deployment includes the first portfolio rollout photo, the DADA portfolio's launch photo, and the supplied `click-deploy1.png` and `click-deploy2.jpeg`. `scripts/prepare-event-photos.mjs` records these sources and prepares oriented, uncropped WebP copies; the original files remain unchanged.

Barlow Condensed, DM Sans, and Space Mono are bundled locally in `public/assets/fonts/`, with their open font licenses. No runtime font CDN connection is required. `scripts/fetch-fonts.py` is an optional maintenance helper to refresh them from Google Fonts.

## Consultancy and workshops

Consultancy opens the bundled `/consultancy/` portfolio, updated from `Andryandurai/DADA-Portfolio` commit `6f18e5b`. The latest hero, Plan/Design/Build services, five-project approach, logo, team, and client work are adapted to the existing Vite build. Edit its content in `src/consultancy/data/`, components in `src/consultancy/components/`, and styling in `src/consultancy/styles.css`. Its images and public resumes live in `public/consultancy/`.

Consultancy uses the locally maintained five-person team roster and project credits; credit links jump to the corresponding team member. Contact validates and emails enquiries through the shared endpoint, with a prefilled email link and copy action if delivery is unavailable. Both the contact section and footer list the supplied numbers under **Call / WhatsApp**, with working call and chat links. It does not call the source project's Next.js API.

Workshops opens `/workshop/`, imported from `Andryandurai/DADA-Workshop` commit `15f7930`. It includes the searchable workshop catalogue, school/college pathways, activities, detail dialogs, theme switch, team, FAQ, and enquiry form. Edit `src/workshop/`. Existing mascot, branding, portraits, and fonts are shared; the workshop's Bricolage Grotesque font and license are bundled. Workshop contacts list **+91 73585 28466** and **+91 73059 66008** under **Call / WhatsApp**. **+91 99448 52361** is removed from workshop only.

The main site, consultancy, and workshop have separate HTML and CSS entries. Vite builds all three with one `npm run build`; the `consultancy-pages` plugin also writes `/consultancy/work/<slug>/index.html` for each case study, supporting direct links and refreshes on a static host. There is no runtime dependency on the source repositories or a second server. Main-site return links use the current deployment base. `scripts/service-sources.json` records exact imported commits and integration adaptations; upstream Git history and deployment settings are not copied into this repository.

Set `VITE_CONSULTANCY_URL` or `VITE_WORKSHOPS_URL` only to override their bundled destinations. Main, consultancy and workshop enquiries share `VITE_ENQUIRY_ENDPOINT`; `VITE_WORKSHOP_ENQUIRY_ENDPOINT` is an optional workshop-only override. Each request includes its source and the source-specific form fields. All forms preserve the details and offer a manual email draft if delivery is unavailable. Rebuild after changing environment variables.

## Email delivery

The email backend in `apps-script/Code.gs` is deployed and authorized in **teamdadaoffl@gmail.com**. Its public Google `/exec` URL is configured in `src/contact-details.js`, so all three forms work with ordinary local and GitHub Pages builds. The website stays on GitHub Pages. See [the setup and maintenance guide](apps-script/README.md) to recreate the script or change deployments. `VITE_ENQUIRY_ENDPOINT` optionally overrides the default: use a GitHub Actions repository variable for Pages, or `.env.local` for local development.

Every form requires a **Phone / WhatsApp number** (10–15 digits; spaces, parentheses, hyphens and a leading `+` are accepted). **Email is optional** and is validated when provided. Both contact fields are included in the payload, email body and fallback draft. The Apps Script deployment must be updated to version 2 for this contract; replacing a file in GitHub does not update the running Google script.

The script sends **from the team Gmail account to the same account**, with the customer as Reply-To only when they supplied an email. Otherwise the message asks the team to contact the customer by phone / WhatsApp. Subjects identify Main site, Workshop or Consultancy. Bodies include all submitted enquiry fields, the enquiry ID and the time. Recipient/sender are fixed on the server. Validation, a honeypot, per-phone/global limits and 24-hour retry deduplication run on Google's servers. Only request hashes, timestamps and state are kept in Script Properties; enquiry text is not stored there.

`src/contact-details.js` centralizes the inbox, contact numbers and endpoint settings. Every enquiry section includes email and **Call / WhatsApp** links; the workshop's excluded number stays excluded. `src/enquiry-delivery.js` handles acknowledged submissions from all three forms. It never treats an unreadable response or network failure as a sent email.

Enquiries are sent automatically through the configured script. If sending fails or cannot be confirmed, visitors keep their entered details and can use the visible contact links and email-draft fallbacks. No passwords or mail credentials are placed in the client bundle.

The Apps Script transport uses a CORS-simple `text/plain` POST containing JSON, with `source` and `requestId` in the body, and follows Google's response redirect. A custom HTTPS backend can also be used; it receives a JSON POST with the same fields plus an `Idempotency-Key` header:

```http
POST <VITE_ENQUIRY_ENDPOINT>
Content-Type: application/json
Idempotency-Key: <unique ID retained across retries of the same enquiry>
```

```json
{
  "name": "A real visitor",
  "source": "main",
  "requestId": "a-unique-enquiry-id",
  "phone": "+91 98765 43210",
  "email": "visitor@example.com",
  "organization": "Optional institution",
  "enquiryType": "Project Collaboration",
  "message": "The enquiry text"
}
```

If replacing the supplied Google backend, the replacement must:

1. Validate all fields again. Require a valid phone (10–15 digits, up to 30 display characters); allow blank email, validating it when supplied. Enforce limits matching the UI (name 120, email 254, organization 180, message 5000 characters), and validate the enquiry type.
2. Configure a team inbox, verified sender, and an email provider on the server. Typical **server-only** variables: `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`, and your selected provider’s API key. Their exact names depend on the backend you choose.
3. Use a verified sender and set `Reply-To` only when the visitor supplies an email; never accept a sender or destination email from the client.
4. Rate limit requests and implement idempotency using the request header, preventing duplicate email on retries.
5. If the API is on another origin, allow only your deployed site origin in CORS, including `Content-Type` and `Idempotency-Key` headers and the `OPTIONS` preflight.
6. Respond with a successful HTTP status and **`{ "success": true }` only after the email provider accepts the message**. Failed or unconfirmed responses keep the form data and display an error. The frontend aborts unconfirmed requests after 30 seconds and never assumes delivery.

Apps Script uses the inbox owner's Google authorization. Local unit tests simulate Google services; when changing deployments, verify live sending from all three forms and check the team inbox for the test messages.

## Publication metadata

The document includes title, description, theme, favicon, and Open Graph text. Add your actual deployed canonical URL and absolute `og:image` URL once you choose a public hostname. A destination has not been invented.

## Checks

`npm test` checks required-field validation, malformed emails, honest unconfigured behavior, acknowledgement requirements, trimmed payloads, duplicate-request keys, network failures, and timeouts. It also exercises `apps-script/Code.gs` with simulated Google services: all three email formats, fixed recipient and Reply-To, invalid requests, quota/account failures, rate limits, deduplication and interrupted sends. `npm run build` verifies the production bundle. Browser QA covers responsive layouts, navigation, dialogs, enquiry validation, and endpoint outcomes.
