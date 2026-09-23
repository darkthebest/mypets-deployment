/* My Pets content. Vet-sourced: Merck Veterinary Manual, Maddie's Fund,
   National Kitten Coalition / Alley Cat Allies, PAWS Chicago, AKC, VCA, Purina. */

const FEED_DATA = {
  kitten: {
    id: "kitten",
    name: "Kittens",
    emoji: "🐱",
    accent: "kitten",
    introduction:
      "With no mother, kittens under 4 weeks need kitten milk replacer (KMR) bottle-fed around the clock. Feed by weight, not appetite, and weigh them daily — a healthy kitten gains 10–15 g every day.",
    intervals: [2, 3, 4, 5, 6],
    schedules: [
      { age: "0–1 week", weight: "50–150 g", amount: "2–6 ml", frequency: "Every 2 hours", feeds: "8–12 a day", note: "Around the clock, including overnight." },
      { age: "1–2 weeks", weight: "150–250 g", amount: "6–10 ml", frequency: "Every 2–3 hours", feeds: "8–12 a day", note: "Still needs overnight feedings." },
      { age: "2–3 weeks", weight: "250–350 g", amount: "10–14 ml", frequency: "Every 3–4 hours", feeds: "6–8 a day", note: "Can start lapping from a shallow saucer." },
      { age: "3–4 weeks", weight: "350–450 g", amount: "14–18 ml", frequency: "Every 4–5 hours", feeds: "5–6 a day", note: "Begin weaning: offer gruel in a dish." },
      { age: "4–5 weeks", weight: "450–550 g", amount: "18–22 ml", frequency: "Every 5–6 hours", feeds: "4–5 a day", note: "Gruel becomes the main food." },
      { age: "5–8 weeks", weight: "550–850 g", amount: "Weaning", frequency: "Every 6 hours", feeds: "4 meals + bottles", note: "Offer wet kitten food freely; fully weaned by ~8 weeks." }
    ],
    feedingGuide: [
      "Stomach can hold roughly 4–5 ml per 100 g of body weight — never force more.",
      "Warm formula to 95–100°F (35–38°C). Never microwave — use a warm-water bath.",
      "Feed on the belly, like nursing from mom — never on the back (risk of choking/aspiration).",
      "Tilt the bottle to keep the nipple full of milk so the kitten doesn't swallow air.",
      "Let the kitten suckle at its own pace; burp (gently rub the back) after feeding.",
      "Leftover formula spoils fast: discard anything left at room temp after 1 hour, refrigerated mix after 24–48 hours."
    ],
    calculator: {
      rule: "Daily total ≈ 22–26 ml of formula per 100 g of body weight, divided into all feedings.",
      gain: "Target weight gain: 10–15 g per day for the first weeks.",
      weigh: "Weigh every 12 hours during the first 2 weeks if possible, daily after that."
    },
    commercial:
      "Use a kitten-specific milk replacer powder — brands like PetAg KMR, Just Born, or Hartz. Mix exactly per the label (never stronger). Powder lasts longer than pre-mixed liquid. It feeds kittens from newborn to ~6 weeks, and can also supplement a nursing mom.",
    homemade: [
      {
        kind: "Best homemade · can keep feeding until weaning",
        name: "Goat's milk formula",
        purpose: "The only homemade mix vets and rescues say can be used longer-term (still: get commercial KMR as soon as you can).",
        ingredients: [
          "1 quart whole goat's milk",
          "1 tsp light Karo / corn syrup",
          "1 Tbsp plain non-fat yogurt (goat's milk yogurt preferred)",
          "1 egg yolk",
          "Unflavored Knox gelatin — newborn: 1 pkg · 2nd week: 1½–2 pkgs · 3rd week: 2½–3 pkgs · 4th week: 4 pkgs"
        ],
        steps: [
          "Warm the goat's milk in a saucepan and stir in the gelatin until fully dissolved.",
          "Remove from heat, mix in the remaining ingredients, blend until smooth.",
          "Refrigerate; keeps up to 1 week.",
          "Warm to body temperature (95–100°F) before every feeding; test a drop on your wrist."
        ],
        shelf: "Refrigerated: up to 1 week",
        warning: "Never feed plant-based milks (almond, oat, soy) — kittens can die."
      },
      {
        kind: "Emergency",
        name: "Condensed-milk replacer (Maddie's Fund)",
        purpose: "Quick mix from fridge/pantry staples if goat's milk isn't available.",
        ingredients: [
          "6 Tbsp condensed (sweetened) milk",
          "6 Tbsp water",
          "½ cup plain yogurt (NOT low-fat)",
          "3 large (or 4 small) egg yolks"
        ],
        steps: [
          "Blend everything until smooth and uniform.",
          "Warm to 95–100°F in a warm-water bath.",
          "Refrigerate between feedings; discard 24 hours after mixing."
        ],
        shelf: "Refrigerated: 24 hours"
      },
      {
        kind: "Last-resort emergency",
        name: "Whole-milk + egg replacer",
        purpose: "Only if nothing better is available — groceries are closed, pet store is far.",
        ingredients: [
          "1 cup (240 ml) cow's whole milk",
          "3 egg yolks",
          "1 Tbsp corn oil",
          "Small pinch of salt",
          "1 drop of quality oral multivitamin solution, if you have one"
        ],
        steps: [
          "Blend uniformly and warm to 95–100°F.",
          "Refrigerate between uses; discard any unused formula after 24 hours."
        ],
        shelf: "Refrigerated: 24 hours",
        warning: "Cow's milk alone causes diarrhea and nutrient gaps — this mix is temporary shelter, not a diet."
      },
      {
        kind: "Classic emergency",
        name: "Evaporated milk formula (SPCA / Alley Cat)",
        purpose: "The classic late-night rescue mix using pantry staples.",
        ingredients: [
          "1 (8 oz) can evaporated milk",
          "1 beaten egg yolk",
          "2 Tbsp Karo / corn syrup",
          "1 drop liquid pediatric vitamins (optional)"
        ],
        steps: [
          "Mix all ingredients well and strain.",
          "Warm before serving; keep refrigerated."
        ],
        shelf: "Refrigerated: 24 hours"
      }
    ],
    alternatives: [
      { had: "Pet store is closed (no KMR)", use: "Homemade goat's-milk formula — the closest to mother's milk.", note: "Switch to KMR at first chance." },
      { had: "No goat's milk", use: "The condensed-milk or evaporated-milk emergency formulas.", note: "Warm every batch to 95–100°F." },
      { had: "No corn / Karo syrup", use: "¼ tsp of sugar dissolved in warm water instead.", note: "Corn syrup isn't for sweetness — it's quick energy." },
      { had: "Raw egg yolk scares you (salmonella)", use: "Pasteurized egg yolk (sold in cartons).", note: "Egg white is NOT used in any formula." },
      { had: "No kitten bottle", use: "For one feeding, a clean syringe WITHOUT the needle, or a dropper.", note: "Go slow — aspiration is deadly. Get a real nurser soon." },
      { had: "'Cat milk' treat from the grocery store", use: "Don't. That's a treat for older cats, not milk replacer.", note: "It lacks calories and nutrients kittens need." }
    ],
    dos: [
      "Feed on the belly, milk toward the nipple, never on the back.",
      "Weigh daily — flat or falling weight is an emergency.",
      "Stimulate the bottom with a warm damp cotton ball after every feeding until ~3 weeks.",
      "Keep them warm — 85–90°F nest temp the first week.",
      "Mix formula fresh, warm to 95–100°F, discard leftovers."
    ],
    donts: [
      "Plain cow's milk as a diet — causes diarrhea and malnutrition.",
      "Any plant-based milk (almond, oat, soy, coconut beverage).",
      "Microwaving formula.",
      "Feeding a cold kitten — warm it first (cold babies can't digest).",
      "Feeding on the back or forcing the bottle (choking/aspiration).",
      "Human baby formula or 'cat milk' treat as a long-term food."
    ],
    weaning: [
      "3 weeks: start offering warmed formula in a very shallow saucer to teach lapping.",
      "3–4 weeks: make gruel = 2 parts kitten wet food + 1 part formula (or warm water), texture like oatmeal. Smear a bit on the lips to get them started.",
      "4½–6 weeks: start offering moistened dry kitten food; gradually use less liquid.",
      "6–8 weeks: fully weaned — wet kitten food 3–4 times a day, fresh water always available."
    ]
  },

  puppy: {
    id: "puppy",
    name: "Puppies",
    emoji: "🐶",
    accent: "puppy",
    introduction:
      "Orphaned puppies need puppy milk replacer bottle-fed every 2–3 hours for the first week or two. Weigh them daily — a healthy pup gains about 10% of their birth weight every day.",
    intervals: [2, 3, 4, 5, 6],
    schedules: [
      { age: "0–1 week", weight: "varies by breed", amount: "1 ml per oz of weight per feed", frequency: "Every 2–3 hours", feeds: "8–10 a day", note: "Around the clock. Don't wake deep sleepers — feed when they wake hungry." },
      { age: "1–2 weeks", weight: "varies by breed", amount: "grows with weight", frequency: "Every 3–4 hours", feeds: "6–8 a day", note: "Still needs overnight feedings." },
      { age: "2–3 weeks", weight: "varies by breed", amount: "grows with weight", frequency: "Every 4–5 hours", feeds: "5–6 a day", note: "Eyes/ears opening; can start weaning on gruel around 3 weeks." },
      { age: "3–4 weeks", weight: "varies by breed", amount: "weaning begins", frequency: "Every 5–6 hours", feeds: "4–5 a day", note: "Offer puppy gruel in a shallow bowl." },
      { age: "4–6 weeks", weight: "varies by breed", amount: "Weaning", frequency: "4 meals a day", feeds: "4", note: "Thicker gruel → soft puppy food; reduce bottle feeds." },
      { age: "6–8 weeks", weight: "varies by breed", amount: "Solid food", frequency: "3–4 meals a day", feeds: "3–4", note: "Usually fully weaned; dry or wet puppy food." }
    ],
    feedingGuide: [
      "Daily total ≈ 22–26 ml of formula per 100 g of body weight (≈ 2 Tbsp per 4 oz).",
      "Warm formula to 95–100°F (35–38°C). Never microwave — use a warm-water bath.",
      "Feed on the belly — never on the back or upright (choking risk).",
      "Angle the bottle so the nipple stays full of milk; no air bubbles.",
      "Burp pups by gently rubbing their back after feeding.",
      "Puppies should sleep through parts of the night — if a pup is deeply asleep, let it sleep and feed when it wakes."
    ],
    calculator: {
      rule: "Daily total ≈ 22–26 ml of formula per 100 g of body weight, divided across feedings.",
      gain: "Target: gain about 10% of birth weight (1 g per 10 g of weight) each day.",
      weigh: "Weigh at birth, 12h, 24h, 48h, then every 1–2 days — write it down."
    },
    commercial:
      "Use a puppy-specific milk replacer — brands like PetAg Esbilac or PetLac. Mix per the label; powder is preferred (liquid versions cause more diarrhea). Mixing: 1 Tbsp powder + 2 Tbsp warm water ≈ 2⅓ Tbsp of liquid ≈ a 4 oz pup's day. All puppies ideally nurse mother's colostrum in the first 24h.",
    homemade: [
      {
        kind: "Best homemade",
        name: "Milk + egg + calcium formula (Maddie's Fund)",
        purpose: "The most recommended homemade puppy replacer for emergencies.",
        ingredients: [
          "½ cup (120 ml) cow's or goat's milk",
          "½ cup (120 ml) water",
          "2–4 egg yolks",
          "1–2 tsp vegetable oil",
          "1,000 mg calcium carbonate, if you have it (TUMS antacid tablets are calcium carbonate)"
        ],
        steps: [
          "Blend everything until uniform and smooth.",
          "Warm to 95–100°F in a warm-water bath (not microwave).",
          "Refrigerate between uses; discard 24 hours after mixing."
        ],
        shelf: "Refrigerated: 24 hours",
        warning: "TUMS: 500 mg, 750 mg or 1,000 mg tablets — use the right count to reach ~1,000 mg."
      },
      {
        kind: "Emergency pantry mix",
        name: "Evaporated milk formula",
        purpose: "Any grocery store has these three ingredients, even late at night.",
        ingredients: [
          "10 oz evaporated milk (NOT skim)",
          "3 oz boiled, cooled water",
          "½ tsp light corn syrup",
          "1 cup plain full-fat yogurt"
        ],
        steps: [
          "Blend until smooth and creamy.",
          "Warm gently in a bowl of hot water (no microwave).",
          "Serve at body temperature (95–100°F) via bottle or syringe.",
          "Refrigerate leftovers; discard after 24 hours."
        ],
        shelf: "Refrigerated: 24 hours",
        warning: "Never use plain store cow's milk by itself — it lacks calcium and calories and causes diarrhea."
      },
      {
        kind: "Last-resort emergency",
        name: "Whole-milk + egg replacer",
        purpose: "Only when nothing better is available and you must act now.",
        ingredients: [
          "1 cup (240 ml) cow's whole milk",
          "3 egg yolks",
          "1 Tbsp corn oil",
          "Small pinch of salt",
          "1 drop of quality oral multivitamin solution, if you have one"
        ],
        steps: [
          "Blend uniformly; warm to 95–100°F.",
          "Refrigerate between uses; discard any unused formula after 24 hours."
        ],
        shelf: "Refrigerated: 24 hours",
        warning: "Temporary only — switch to real puppy formula as soon as possible."
      }
    ],
    alternatives: [
      { had: "Pet store is closed (no puppy formula)", use: "Homemade milk + egg + calcium formula — closest to dog's milk.", note: "Switch to Esbilac/PetLac at first chance." },
      { had: "No goat's milk / plain milk", use: "Evaporated milk formula (pantry staples).", note: "Evaporated whole milk, not skim." },
      { had: "No calcium carbonate / TUMS", use: "Use 1 tsp of ground eggshell (rinsed, heated dry, crushed) — or skip if truly none.", note: "Calcium is critical for growing bones." },
      { had: "No corn / Karo syrup", use: "¼ tsp sugar dissolved in warm water.", note: "It's a quick-energy source, not a sweetener." },
      { had: "Raw egg yolk scares you", use: "Pasteurized egg yolk.", note: "No egg whites in any puppy formula." },
      { had: "No nursing bottle", use: "Clean syringe (no needle) or dropper for one feed.", note: "Drip slowly — aspiration can kill. Get a real bottle fast." },
      { had: "Cow's milk gave diarrhea", use: "Switch to goat's milk, or dilute formula slightly.", note: "Diarrhea in a pup = call the vet if it persists." }
    ],
    dos: [
      "Feed on the belly, never on the back.",
      "Weigh daily — puppies must gain about 10% of birth weight per day.",
      "Stimulate the bottom with a warm damp cotton ball after every feeding until ~3–4 weeks.",
      "Keep the whelping box warm (85–90°F the first 4 days).",
      "Burp after every feeding."
    ],
    donts: [
      "Plain cow's milk as a diet — not enough calories, calcium, or phosphorus.",
      "Microwaving formula.",
      "Feeding on the back or too fast (aspiration/choking).",
      "Feeding a cold puppy — warm first, cold pups can't digest.",
      "Leaving a heat pad that pups can't crawl away from (burns).",
      "Waking deeply sleeping puppies just to stick to a schedule at night."
    ],
    weaning: [
      "3 weeks: start weaning orphans — make gruel = 2 parts puppy canned food + 1 part formula or warm water, about 65–70% water at first.",
      "3–4 weeks: feed gruel in a wide, shallow bowl; let them step in it and lick paws — that's how they learn.",
      "5–6 weeks: food with chunks; reduce water gradually (1 part dry + 3 parts water → more solid).",
      "6–8 weeks: fully weaned — 3–4 small meals of puppy food a day; fresh water always available."
    ]
  },

  emergency: {
    headerPriority:
      "A baby that is COLD, REFUSING TO EAT, or NOT GAINING WEIGHT is an emergency. Time matters — babies can fade in hours. Call a vet or an emergency clinic immediately, then do the steps below.",
    fading: {
      title: "Fading baby (failing to thrive)",
      signs: [
        "Feels cool or cold to the touch",
        "Weak, no suckle reflex, won't take the bottle",
        "Weight loss or no weight gain",
        "Lethargy; lies alone away from littermates",
        "Pale gums; dry mouth",
        "Constant crying — or strange quietness",
        "Trouble breathing",
        "Sunken eyes, poor skin elasticity"
      ],
      steps: [
        { title: "Warm them first — never feed a cold baby", text: "Wrap in a towel 'purrito' (only the face out). Add a covered heat source on LOW — heating pad, hot-water bottle, or heated rice bag. Warm slowly over 30–60 min. A cold baby can't digest food, and feeding one can be fatal." },
        { title: "Raise blood sugar", text: "Give 3 drops of Karo syrup or strong sugar-water on the gums every 3 minutes (rub it in — they absorb it through the mouth even if not swallowing). Repeat for 15–20 minutes or until they perk up." },
        { title: "Get to a vet NOW", text: "Carry them (warmed and wrapped) to the nearest vet or emergency clinic. Treatment may need fluids under the skin, warmth, oxygen, or antibiotics." }
      ]
    },
    hypothermia: {
      title: "Hypothermia (too cold)",
      text: "Newborns can't regulate their own body temperature until ~4 weeks. Chilling is the #1 killer of orphans.",
      signs: [
        "Cold skin, lethargy",
        "Pale gums, weakness",
        "Stiff muscles, slow breathing or heart rate",
        "Dilated pupils, loss of consciousness"
      ],
      temps: [
        { week: "Week 1", rectal: "95–99°F (35–37°C)", nest: "85–90°F (29–32°C)" },
        { week: "Weeks 2–3", rectal: "97–100°F (36–38°C)", nest: "79–84°F (26–29°C)" },
        { week: "Week 4", rectal: "99–101°F (37–38°C)", nest: "74–79°F (23–26°C)" }
      ],
      do: [
        "Cover any heat source with a towel — never let it touch skin directly.",
        "Let the baby crawl away from the heat if it gets too warm.",
        "Rewarm slowly (30–60 min) — too fast causes shock.",
        "Keep humidity around 55–60%."
      ],
      dont: [
        "NEVER feed a cold baby.",
        "Never use a heat lamp (dehydrates and burns).",
        "Leave a sick baby alone on a heat source."
      ]
    },
    dehydration: {
      title: "Dehydration",
      signs: [
        "Skin 'tents' when pinched and doesn't snap back fast",
        "Gums dry, pale, or slow to re-color after pressing (over 2 seconds)",
        "Dark urine (should be very pale yellow)",
        "Sunken eyes, lethargy, weakness"
      ],
      text: "Common from diarrhea or not eating enough. If you suspect dehydration, this is a vet visit — babies dehydrate fast and can suffer organ damage within hours."
    },
    elimination: {
      title: "Pooping & peeing (you must help!)",
      text: "Under ~3 weeks, babies cannot pee or poop on their own — mom licks their bottoms to trigger it. As their stand-in, do this after every feeding:",
      steps: [
        "After each bottle, use a warm damp cotton ball or soft cloth.",
        "Gently rub the genital/anal area in a circular motion.",
        "They should pee every feeding; poop at least once every 1–2 days.",
        "Keep doing this until they start going on their own (~3–4 weeks old).",
        "Pee that's dark = possible dehydration → call the vet."
      ]
    },
    feedingSafety: {
      title: "Feeding safety — the absolute rules",
      do: [
        "Feed on the belly, never the back.",
        "Warm formula to 95–100°F; test on your wrist.",
        "Angle the bottle so the nipple is full of milk.",
        "Let them set the pace — never squeeze or force.",
        "Discard formula: 1 hour at room temp; 24–48 hours in the fridge."
      ],
      dont: [
        "NEVER plain cow's milk as a diet.",
        "NEVER plant-based milk.",
        "NEVER microwave formula.",
        "NEVER feed a cold baby.",
        "NEVER feed so fast the baby coughs/chokes — slow down immediately."
      ]
    }
  }
};

const INTERVAL_OPTIONS = [
  { value: 1, label: "Every 1 hour (crisis/very weak baby?)" },
  { value: 2, label: "Every 2 hours · newborn" },
  { value: 3, label: "Every 3 hours · 1–2 weeks" },
  { value: 4, label: "Every 4 hours · 2–3 weeks" },
  { value: 5, label: "Every 5 hours · 3–4 weeks" },
  { value: 6, label: "Every 6 hours · 5–8 weeks" }
];