# FROGINAL DOGS Party Lobby

Standalone party lobby for the FROGINALS ecosystem.

## Included
- Instant nickname + avatar entry (no account required)
- Six avatar choices
- Five meme reactions and a local feed
- Attendee list (local demo state)
- Bottom music player with volume and progress
- Links to the main FROGINALS website and mint page
- Responsive desktop/mobile layout in the FROGINALS orange/yellow/black style

## Important status
The site currently runs in **local demo mode**. Attendees and reactions only exist in the visitor's current browser session. Shared live attendance and reactions are **not enabled yet**. Supabase constants in app.js are placeholders; a database schema, safe Row Level Security policies, and Realtime subscriptions still need to be configured and tested.

Never put a Supabase service_role key in browser JavaScript.

## Add music
Edit app.js and set PARTY_AUDIO_URL to a music file you own or are licensed to stream. Browsers usually require the user to click Play before audio can start.

## GitHub Pages
1. Open repository Settings → Pages.
2. Select Deploy from a branch.
3. Select branch main and folder /(root), then Save.
4. After the Pages build finishes, the expected URL is:
   https://obideft.github.io/roginal-dogs-party-lobby/

## Project separation
This repository is separate from Obideft/froginals and Obideft/froginal-dogs-mint.
