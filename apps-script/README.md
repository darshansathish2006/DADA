# Activate DADA enquiry emails

All three forms send to **teamdadaoffl@gmail.com**. This script must be deployed by that same Google account: the sender and recipient are the team mailbox. Phone is required; email is optional. Reply-To is the customer's email when provided; otherwise the message directs the team to their phone / WhatsApp number. No Gmail password belongs in the site or in GitHub.

The team has deployed and authorized the script. Its public `/exec` URL is the default in `src/contact-details.js`, shared by all three forms. The setup instructions below are for recreating or replacing that deployment.

## Update the existing deployment for phone enquiries

The previous deployment requires email and does not include phone in the message. Deploy the version in this folder **before publishing the updated website**; pushing to GitHub or Vercel does not change Google's running code.

1. In the existing **DADA Enquiries** Apps Script project, replace `Code.gs` with [this updated file](./Code.gs) and save. The manifest and permissions are unchanged.
2. Choose **Deploy → Manage deployments → Edit → New version → Deploy**. Keep **Execute as: Me** and **Anyone** access. Editing the existing deployment preserves the current `/exec` URL. See [Google's deployment instructions](https://developers.google.com/apps-script/concepts/deployments).
3. Open the `/exec` URL and confirm `{"service":"DADA enquiries","version":2,"ready":true}`. A response without `version:2` is still the old deployment.
4. Submit a labelled test enquiry with phone filled and email blank, then check the team inbox for the phone number. Verify a second enquiry with an email sets Reply-To correctly. Do not use real customer details for testing.

The new deployment rejects missing or invalid phone numbers. Publish the new forms immediately after the update so new visitors use the matching contact fields.

## One-time Google setup

1. Sign in to **teamdadaoffl@gmail.com** and open [Google Apps Script](https://script.google.com/home/start). Create a new project named **DADA Enquiries**.
2. Replace `Code.gs` with this folder's [Code.gs](./Code.gs).
3. In **Project Settings**, enable **Show appsscript.json manifest file in editor**. Replace that file with [appsscript.json](./appsscript.json).
4. Select `authorizeEnquiries` in the editor and click **Run**. Review and grant the email-sending and account-identity permissions. This function does not send a test email or read your inbox.
5. Choose **Deploy → New deployment → Web app**. Set **Execute as: Me (teamdadaoffl@gmail.com)** and **Who has access: Anyone**. Deploy and copy the **Web app URL ending in `/exec`**, not the test `/dev` URL.
6. Open that URL in a private browser window. It should show `{"service":"DADA enquiries","version":2,"ready":true}`. A sign-in prompt means public access is not enabled; `ready:false` means the account/permissions/quota need attention.

Google documents the [web-app deployment settings](https://developers.google.com/apps-script/guides/web) and [MailApp send and Reply-To behavior](https://developers.google.com/apps-script/reference/mail/mail-app).

## Connect the existing GitHub Pages site

The supplied `/exec` URL is already configured in `src/contact-details.js`; no Actions variable is needed for the current deployment. To replace it without changing source, create a **repository variable** named `VITE_ENQUIRY_ENDPOINT` in the [DADA repository's Actions variables](https://github.com/darshansathish2006/DADA/settings/variables/actions) and set it to the replacement `/exec` URL. The deployment workflow reads it for all three forms. Leave `VITE_WORKSHOP_ENQUIRY_ENDPOINT` empty unless intentionally using a separate endpoint.

Commit/push the site changes, or run **Actions → Deploy DADA to GitHub Pages → Run workflow** after the changes are on `master`. Setting the variable without rebuilding does not update the existing static website. For local development, put the same variable in an untracked `.env.local` file and restart Vite.

The `/exec` URL is a public endpoint, not a Gmail password or access token.

## Verify actual delivery

Submit one enquiry from each deployed page: main site, workshop, and consultancy. Confirm three messages reach the team Gmail mailbox with the corresponding source in the subject and all submitted fields, including phone, in the body. Leave email blank in at least one test; provide it in another to verify Reply-To. Browser tests with simulated responses do not verify Gmail delivery.

The forms show success only after `MailApp.sendEmail` returns successfully and a receipt is saved. This confirms acceptance by the sending service, not inbox placement. If a request times out, retrying unchanged data uses the same enquiry ID. The script deduplicates successful requests for 24 hours; if a send was interrupted or uncertain, it refuses to send that ID again and asks the customer to contact the team directly.

## Maintenance

- After script changes, use **Deploy → Manage deployments → Edit → New version → Deploy** to keep the same URL.
- Recipient and sender are fixed to the team mailbox; client input cannot change them. Messages are plain text, and input is validated on Google's servers.
- A hidden form field catches simple bots. Server limits allow up to three requests per phone number per ten minutes and ten requests globally per minute. Display separators and `+` are removed before hashing the phone, so formatting changes cannot bypass this limit. Google also applies [Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas); the script reports unavailability if its email quota is exhausted. These measures limit abuse but do not replace a CAPTCHA for a heavily targeted form.
- Script Properties retain only request IDs, hashes, timestamps and delivery state for deduplication/rate limiting. Records older than 24 hours are pruned on the next submission. Customer enquiry text is sent by email and is not saved in a Sheet or logged by this script.
- The browser sends JSON as `text/plain` to avoid an unsupported preflight, follows Google's [Content Service redirect](https://developers.google.com/apps-script/guides/content), and reads the JSON acknowledgement. Do not switch to `no-cors`: an unreadable response cannot confirm a sent email.
- If delivery is unavailable, each form keeps the entered details and offers a manual email draft, alongside the visible call/WhatsApp contacts.
