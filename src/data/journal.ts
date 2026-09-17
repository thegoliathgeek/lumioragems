import type { JournalPost, VideoItem } from "@/types";

const author = "Lumiora";

/** Ordered as they appear on the home page grid; the Ceylon essay closes the list. */
export const journalPosts: JournalPost[] = [
  {
    slug: "choosing-a-sapphire",
    title: "Choosing a Sapphire",
    subtitle: "Finding the one that speaks to you.",
    image: "/gems/ceylon-cornflower-blue-3-42ct.jpg",
    excerpt:
      "Choosing a sapphire is a deeply personal experience. Unlike selecting a stone simply by size or price, the beauty of a natural sapphire lies in the combination of characteristics that makes each one individual.",
    category: "Journal", author, publishedAt: "2026-09-10", readingMinutes: 3,
    cta: { label: "Find your sapphire", href: "/shop/all-sapphires" },
    body: [
      "Colour is often the first thing that captures the eye. Some are drawn to rich, intense blues, while others prefer softer tones, vivid pinks, golden yellows or unusual combinations of colour.",
      "Cut reveals the personality of the stone. Oval, cushion, pear, round and emerald cuts can each present a sapphire's colour and brilliance differently.",
      "Clarity is another part of its natural identity. As gemstones formed within the earth, sapphires may contain internal characteristics. Rather than automatically diminishing their beauty, these can be part of what distinguishes one natural stone from another.",
      "Finally, consider something that cannot always be measured: connection.",
      "The right sapphire is not necessarily the largest or most expensive. It is the one whose colour, shape and character feel right to you.",
    ],
  },
  {
    slug: "a-world-of-colour",
    title: "A World of Colour",
    subtitle: "Beyond the classic blue.",
    image: "/collections/all-sapphires.jpg",
    excerpt:
      "Mention sapphire and the first image that often comes to mind is an extraordinary blue gemstone. Yet nature created sapphires in a far greater palette.",
    category: "Journal", author, publishedAt: "2026-09-03", readingMinutes: 3,
    cta: { label: "Explore the colours", href: "/shop" },
    body: [
      "Natural sapphires can be discovered in shades of blue, pink, yellow, green, violet, orange and many tones in between. Some even display more than one distinct colour within a single stone, commonly known as parti sapphires.",
      "Every colour offers a different personality.",
      "Deep blues feel timeless and sophisticated. Pale blues can appear delicate and serene. Pink sapphires bring warmth and romance, while yellow sapphires offer a luminous golden character. Greens and parti-coloured stones provide something more unexpected and individual.",
      "Natural variations in tone and saturation mean that even two sapphires described as the same colour can appear remarkably different.",
      "It is this individuality that makes choosing a natural sapphire so personal.",
      "At Lumiora, colour is not simply a specification. It is part of the stone's identity.",
    ],
  },
  {
    slug: "from-earth-to-gem",
    title: "From Earth to Gem",
    subtitle: "A journey millions of years in the making.",
    image: "/studio/start-with-a-stone.jpg",
    excerpt:
      "Long before a sapphire becomes part of a treasured piece of jewellery, its story begins deep within the earth.",
    category: "Journal", author, publishedAt: "2026-08-27", readingMinutes: 3,
    cta: { label: "Discover the collection", href: "/shop/all-sapphires" },
    body: [
      "Natural sapphires form through geological processes occurring over immense periods of time. Eventually, some are brought closer to the surface, where they may be discovered and carefully recovered.",
      "In Sri Lanka, gemstone mining carries a long history of knowledge and tradition. Once unearthed, a rough sapphire may appear very different from the brilliant gemstone it has the potential to become.",
      "The transformation requires skill.",
      "A cutter studies the rough stone—its colour, shape, clarity and natural characteristics—before deciding how it should be cut. Each decision influences how the finished sapphire interacts with light and reveals its colour.",
      "After cutting and polishing, the character once concealed within the rough stone emerges.",
      "Through established connections with Sri Lankan miners, Lumiora carefully selects natural sapphires with attention to beauty, character, rarity and quality.",
      "From deep within the earth to its final form, every sapphire has travelled a remarkable journey before reaching you.",
    ],
  },
  {
    slug: "heated-or-unheated",
    title: "Heated or Unheated?",
    subtitle: "Understanding your sapphire.",
    image: "/studio/start-with-an-idea.jpg",
    excerpt:
      "When exploring natural sapphires, you may encounter two terms frequently: heated and unheated. But what do they actually mean?",
    category: "Journal", author, publishedAt: "2026-08-20", readingMinutes: 3,
    cta: { label: "Explore natural sapphires", href: "/shop/all-sapphires" },
    body: [
      "Heat treatment has been used within the gemstone industry for generations. A sapphire may be carefully heated to enhance characteristics such as its colour or clarity. Importantly, a heat-treated natural sapphire is still a natural sapphire—the stone itself was formed within the earth.",
      "An unheated sapphire is one whose natural colour and characteristics have not been altered through heat treatment. Fine-quality unheated sapphires can be particularly sought after because attractive examples are comparatively uncommon.",
      "Neither description alone determines whether a sapphire is beautiful.",
      "Colour, cut, clarity, origin, size, rarity and personal preference can all influence the desirability and value of an individual gemstone.",
      "What matters most is transparency.",
      "Understanding the characteristics and treatment status of the sapphire you are considering allows you to choose with greater knowledge and confidence.",
      "At Lumiora, the story of a gemstone should be as clear as its beauty.",
    ],
  },
  {
    slug: "create-with-lumiora",
    title: "Create with Lumiora",
    subtitle: "Your stone. Your vision. Your story.",
    image: "/studio/bespoke-panel.jpg",
    excerpt:
      "There is something extraordinary about creating a piece of jewellery that begins with a gemstone chosen by you.",
    category: "Journal", author, publishedAt: "2026-08-13", readingMinutes: 3,
    cta: { label: "Create your piece", href: "/custom/enquiry" },
    body: [
      "The journey starts with the sapphire.",
      "Explore natural sapphires in different colours, shapes and personalities until you discover the one that feels unmistakably yours. Perhaps it is an intense Ceylon blue, a delicate pink, a luminous yellow or an unusual parti sapphire unlike anything you expected to find.",
      "Once your stone is chosen, your vision begins to take form.",
      "Consider the metal, setting, silhouette and finer details that will surround your sapphire. Every choice provides an opportunity to create something that reflects your individual style while allowing the natural character of the gemstone to remain at the heart of the design.",
      "With Lumiora, the experience is not simply about selecting jewellery from a collection.",
      "It is about creating something personal.",
      "A piece inspired by your vision, centred around a gemstone chosen by you and created to hold meaning far beyond the moment it is made.",
      "Your sapphire. Your vision. Create with Lumiora.",
    ],
  },
  {
    slug: "the-care-guide",
    title: "The Care Guide",
    subtitle: "Gemstone care & maintenance.",
    image: "/studio/workshop-bench.jpg",
    excerpt:
      "Your Lumiora gemstone is a natural treasure formed over millions of years. With the right care, it can maintain its beauty, brilliance, and value for generations.",
    category: "Journal", author, publishedAt: "2026-08-06", readingMinutes: 5,
    cta: { label: "Contact Lumiora", href: "/contact" },
    body: [
      "Whether you own a loose gemstone or a custom-made jewellery piece, following these simple care guidelines will help keep it in excellent condition.",
      { heading: "Designed to Last" },
      "Many of the gemstones we offer, including ruby and sapphire (members of the corundum family), are exceptionally durable and suitable for everyday wear. Corundum is the second hardest natural gemstone after diamond, making it highly resistant to scratching during normal use.",
      "In addition to their hardness, rubies and sapphires possess excellent toughness and do not have perfect cleavage, making them less susceptible to chipping or breaking than many other gemstones.",
      "Other gemstones vary in hardness and durability. While many are suitable for regular wear, softer gemstones such as opal, emerald, pearl, turquoise, and fluorite require additional care to protect them from scratches, impacts, and harsh chemicals.",
      "Although natural gemstones are durable, we recommend removing jewellery during heavy manual work, contact sports, gardening, or any activity that may expose it to strong impacts or abrasive surfaces.",
      { heading: "Cleaning Your Gemstones" },
      "The safest and most effective way to clean most gemstones is with:",
      { list: ["Warm water", "Mild soap", "A soft microfibre or jewellery polishing cloth", "A soft-bristled brush for jewellery settings"] },
      "Gently clean around the setting, paying particular attention to the underside (pavilion) of the gemstone, where dirt and oils can accumulate and reduce its brilliance.",
      "Avoid using harsh chemicals, bleach, abrasive cleaners, or household cleaning products, as these may damage certain gemstones or jewellery settings.",
      "For gemstones that have undergone fracture filling or other enhancement treatments, avoid exposure to acids, strong cleaning agents, excessive heat, and ultrasonic cleaning.",
      { heading: "Storing Your Jewellery" },
      "Store each gemstone or jewellery piece separately in a soft pouch or individual jewellery box.",
      "This helps prevent scratches, as harder gemstones can damage softer gemstones and precious metals. For example:",
      { list: [
        "Diamonds can scratch all other gemstones.",
        "Rubies and sapphires can scratch most coloured gemstones as well as gold, silver, and platinum.",
        "Softer gemstones should always be stored individually for added protection.",
      ] },
      "Keeping each piece separate will help preserve both the gemstone and its setting.",
      { heading: "Ultrasonic & Steam Cleaning" },
      { lead: "We do not recommend using ultrasonic or steam cleaners unless advised by a qualified jeweller for your specific gemstone." },
      "Natural inclusions, fractures, and certain gemstone treatments can make some stones vulnerable to damage from ultrasonic vibration or sudden temperature changes.",
      "If you are unsure whether your gemstone is suitable for ultrasonic cleaning, please contact Lumiora for advice.",
      { heading: "Preserving Your Gemstone's Beauty" },
      "Natural gemstones may temporarily appear less vibrant after being stored away for extended periods. This is completely normal.",
      "Allowing your gemstone to be exposed to natural daylight for a short period can often restore its lively appearance. However, prolonged exposure to intense sunlight should be avoided for gemstones that are known to fade, such as amethyst, kunzite, fluorite, and some topaz varieties.",
      { heading: "Professional Care" },
      "We recommend having your jewellery professionally inspected every 12–24 months to ensure the setting remains secure and to maintain its condition.",
      "If your Lumiora jewellery requires cleaning, polishing, resizing, or repairs, our team is always happy to assist.",
      { heading: "A Lifetime of Beauty" },
      "Every Lumiora gemstone has been carefully mined, expertly cut, precisely polished, and thoughtfully crafted to showcase its natural beauty.",
      "With proper care, your Lumiora gemstone or custom jewellery piece will remain a timeless treasure, preserving its brilliance and significance for generations to come.",
    ],
  },
  {
    slug: "the-ceylon-sapphire",
    title: "The Ceylon Sapphire",
    subtitle: "Born from an island of gems.",
    image: "/collections/blue-sapphires.jpg",
    excerpt:
      "For centuries, Sri Lanka has been celebrated as one of the world's most remarkable sources of natural sapphires. Historically known as Ceylon, the island is renowned for producing sapphires admired for their beautiful colour, brilliance and exceptional variety.",
    category: "Journal", author, publishedAt: "2026-07-30", readingMinutes: 2,
    cta: { label: "Explore Ceylon sapphires", href: "/shop/all-sapphires" },
    body: [
      "While the luminous blues of Ceylon sapphires are perhaps the most recognised, Sri Lanka's earth reveals an extraordinary spectrum of colour from delicate pinks and warm yellows to greens, violets and distinctive parti sapphires.",
      "At Lumiora, this heritage holds a special significance. With more than three decades of experience connected to Sri Lanka's gemstone industry, each sapphire is carefully hand-selected with an appreciation for its individual colour, character and natural beauty.",
      "No two natural sapphires are truly identical. Each carries its own story formed by nature and waiting to become part of yours.",
    ],
  },
];

/** The six essays laid out in the home page grid, in order. */
export const homeJournalPosts = journalPosts.slice(0, 6);

export const cyclopediaEntries: JournalPost[] = [
  {
    slug: "the-four-cs-for-coloured-stones",
    title: "The Four Cs, Adapted for Coloured Stones",
    excerpt: "Cut, colour, clarity and carat mean something different once you leave diamonds behind. Here is the working order of priority.",
    category: "Gem Cyclopedia", author: "Lumiora Gemmology Desk", publishedAt: "2026-04-08", readingMinutes: 8,
    body: [
      "The diamond framework transfers poorly to sapphire. For a colourless stone, cut governs everything, because brilliance is all there is to see. For a coloured stone, colour governs everything, and cut exists to serve it.",
      "Colour is assessed on three axes: hue (the colour itself), tone (how light or dark), and saturation (how vivid, versus how grey or brown). Saturation moves price more than any other single factor. A medium-tone, highly saturated stone will outprice a darker or greyer stone of the same weight many times over.",
      "Clarity is graded against type. Corundum is a Type II stone, expected to contain inclusions. 'Eye clean' — no inclusions visible to an unaided eye at a normal viewing distance — is the practical standard, not the loupe-clean benchmark applied to diamond.",
      "Cut is where value is most often lost. Cutters working on commission by weight will leave stones deep to preserve carats, producing a gem that looks smaller face-up than its weight suggests and often carries a dark window at the centre. Always ask for millimetre dimensions, not just weight.",
      "Carat is last for a reason. Price per carat rises in steps at round numbers, so a 2.95 ct stone frequently offers better value than a 3.05 ct stone of identical appearance.",
    ],
  },
  {
    slug: "sapphire-origins-explained",
    title: "Sapphire Origins, Explained",
    excerpt: "Ceylon, Kashmir, Burma, Madagascar, Montana, Australia — what each origin means for colour, and where the premiums are justified.",
    category: "Gem Cyclopedia", author: "Lumiora Gemmology Desk", publishedAt: "2026-03-22", readingMinutes: 9,
    body: [
      "Origin matters because geology shapes chemistry, and chemistry shapes colour. It is also, frankly, a marketing lever — some origin premiums reflect genuine rarity, and others reflect reputation outliving supply.",
      "Sri Lanka, still traded as Ceylon, is the most consistent source of fine blue and fancy-colour sapphire. Ceylon blues are typically lighter and more luminous than Burmese stones, with an open, slightly sleepy character.",
      "Kashmir commands the highest premiums of any origin, for a velvety cornflower blue produced by microscopic inclusions that scatter light. The deposits were substantially exhausted within decades of their discovery in the 1880s. Almost every Kashmir stone in circulation is a recirculated antique.",
      "Madagascar has become the volume source for fine blue sapphire since the 1990s, and produces material that can closely resemble Ceylon. Some of the finest current-production sapphire is Malagasy, and it usually costs less than a comparable Ceylon stone.",
      "Montana and Australia matter for a different reason: small-scale, well-documented mining. For buyers who care about traceability, these origins offer a chain of custody that most of the trade cannot match.",
    ],
  },
  {
    slug: "caring-for-a-sapphire",
    title: "Caring for a Sapphire",
    excerpt: "Corundum is hard, but the setting around it is not. Practical guidance on cleaning, storage and wear.",
    category: "Gem Cyclopedia", author: "Lumiora Gemmology Desk", publishedAt: "2026-02-15", readingMinutes: 4,
    body: [
      "Sapphire sits at 9 on the Mohs scale, second only to diamond. It resists scratching from almost everything encountered day to day, which is why it wears so well as a daily ring.",
      "Hardness is not toughness. A hard stone can still chip if struck at an exposed corner, so pointed cuts — pear, marquise, kite — benefit from a setting that protects the tips.",
      "Warm water, mild soap and a soft brush handle ordinary cleaning. Avoid ultrasonic cleaners on stones with significant inclusions or any fracture filling, where vibration can propagate an existing feature.",
      "Store pieces separately. A sapphire will scratch nearly every other gem it shares a box with, and diamonds will scratch it in return.",
      "Have settings checked annually. In our experience, stones are lost to worn claws far more often than to any damage to the stone itself.",
    ],
  },
];

export const allArticles = [...journalPosts, ...cyclopediaEntries];
export const articlesBySlug = new Map(allArticles.map((a) => [a.slug, a]));

export const videos: VideoItem[] = [
  { id: "v1", title: "Cornflower Blue Under Natural Light", description: "A 3.42 ct unheated Ceylon cushion, filmed in diffuse daylight with no colour correction applied.", youtubeId: "dQw4w9WgXcQ", durationLabel: "2:14" },
  { id: "v2", title: "What Colour Change Actually Looks Like", description: "The same Tanzanian sapphire under daylight and then incandescent light, in a single unbroken take.", youtubeId: "dQw4w9WgXcQ", durationLabel: "1:47" },
  { id: "v3", title: "Inside a Parti Sapphire", description: "How colour zoning forms, and how a cutter decides where to place the table.", youtubeId: "dQw4w9WgXcQ", durationLabel: "4:32" },
  { id: "v4", title: "Setting a Padparadscha", description: "Bench footage of a 2.18 ct padparadscha being set in an 18k rose gold six-claw mount.", youtubeId: "dQw4w9WgXcQ", durationLabel: "6:08" },
];
