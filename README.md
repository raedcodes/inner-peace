# Inner Peace

A calm, educational website about anxiety, GAD, and stress — with practical lifestyle guidance, information on therapy and medication, and private in-browser wellness tools (breathing exercise, relaxation timer, mood tracker, anxiety journal).

Inner Peace is educational and wellness content only. It is not a substitute for professional medical or mental-health care.

## Stack

React + Vite + Tailwind CSS. No backend, no database, no authentication — the Mood Tracker and Anxiety Journal store data only in the browser's `localStorage`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static `dist/` folder ready to deploy — e.g. to Netlify (`netlify.toml` is already configured with `npm run build` / `dist`).

## Audio

`public/audio/` needs royalty-free or public-domain audio files for the Calm Audio tool — see `public/audio/README.md` for the required filenames. Until added, the player shows a "coming soon" placeholder instead of a broken player.
