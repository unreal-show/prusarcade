# Pru's Arcade

Six games from Pru Nakamura of UNREAL. Live at https://www.prusarcade.com. It's an installable app (PWA) that works offline.

- Hosting: GitHub Pages (branch main, root) with custom domain www.prusarcade.com and Enforce HTTPS on.
- Update: replace index.html, then bump `CACHE` in sw.js (pru-arcade-v1 → v2).
- Ad hooks: `showRewardedAd()`, `maybeInterstitial()`, `#ad-banner`. These currently show UNREAL house promos.
- House Trivia stays locked until Season 1 airs and the draft question bank is approved.
