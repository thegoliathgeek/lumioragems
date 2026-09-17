import type { FaqItem } from "@/types";

export const faqs: FaqItem[] = [
  { group: "About Lumiora", question: "What is Lumiora?",
    answer: "Lumiora is a premium Australian gemstone and jewellery company specialising in natural gemstones, custom-made jewellery, and personalised consultation services. We are passionate about bringing exceptional gemstones from their origin to our customers through expert craftsmanship, transparency, and personalised service." },
  { group: "About Lumiora", question: "What makes Lumiora different?",
    answer: "Unlike many gemstone retailers, Lumiora is involved in every stage of the gemstone journey. We mine, cut, polish, and carefully inspect many of our gemstones before offering them directly to our customers. This allows us to maintain exceptional quality, authenticity, and attention to detail.",
    after: "In addition to gemstones and bespoke jewellery, we also offer private aura readings and astrology consultations by appointment for customers seeking a more personalised experience." },

  { group: "Our Gemstones", question: "Are your gemstones natural?",
    answer: "Yes. We specialise in natural gemstones. Where applicable, any treatments or enhancements are clearly disclosed in the product description." },
  { group: "Our Gemstones", question: "What types of gemstones do you offer?",
    answer: "Our collection includes a wide range of gemstones, including:",
    list: ["Sapphire", "Ruby", "Emerald", "Spinel", "Tourmaline", "Garnet", "Aquamarine", "Topaz", "Zircon", "Peridot", "Opal", "Tanzanite", "Morganite", "Amethyst", "Citrine"],
    after: "Our collection is continually growing as we source exceptional gemstones from around the world." },
  { group: "Our Gemstones", question: "Where do your gemstones come from?",
    answer: "Many of our gemstones come directly from our own mining operations, while others are responsibly sourced from trusted mining partners. Every gemstone is carefully selected, expertly cut, polished, and inspected before being offered for sale." },
  { group: "Our Gemstones", question: "Are your gemstones ethically sourced?",
    answer: "Yes. We are committed to responsible sourcing practices, ethical business standards, and supporting sustainable mining wherever possible." },
  { group: "Our Gemstones", question: "Do your gemstones come with certificates?",
    answer: "Many gemstones include an independent gemological certificate or identification report. Certification details are listed on each product page. Additional certification can often be arranged upon request." },
  { group: "Our Gemstones", question: "Can I purchase loose gemstones?",
    answer: "Absolutely. We specialise in premium loose gemstones suitable for collectors, investors, jewellery designers, and customers wishing to create custom jewellery." },
  { group: "Our Gemstones", question: "Can you source a gemstone that isn't listed on your website?",
    answer: "Yes. If you are looking for a particular gemstone, size, colour, origin, or shape, please contact us. Our team can often source rare and unique gemstones through our global network." },

  { group: "Custom Jewellery", question: "Do you make custom jewellery?",
    answer: "Yes. We create bespoke jewellery tailored to your vision. Whether you're designing an engagement ring, wedding band, pendant, earrings, bracelet, or another one-of-a-kind piece, we'll work with you to bring your ideas to life." },
  { group: "Custom Jewellery", question: "Can I use a gemstone purchased from Lumiora?",
    answer: "Yes. Most of our customers choose one of our loose gemstones and have it transformed into a custom jewellery piece." },
  { group: "Custom Jewellery", question: "Can I use my own gemstone?",
    answer: "In many cases, yes. We can assess your gemstone to determine whether it is suitable for setting into custom jewellery." },
  { group: "Custom Jewellery", question: "How long does custom jewellery take?",
    answer: "Production times vary depending on the design and complexity of the piece. An estimated completion timeframe will be provided during the design process." },

  { group: "Aura Readings & Astrology", question: "What consultation services do you offer?",
    answer: "Lumiora offers private aura readings and astrology consultations by appointment. These services are designed to provide personal insight and help customers explore gemstones in a way that aligns with their own interests and beliefs." },
  { group: "Aura Readings & Astrology", question: "Do I need to purchase a gemstone to book a consultation?",
    answer: "No. Our consultation services are available independently and do not require a gemstone or jewellery purchase." },
  { group: "Aura Readings & Astrology", question: "Can a consultation help me choose a gemstone?",
    answer: "Yes. Many customers choose to combine a consultation with gemstone selection to find a gemstone that resonates with their personal preferences or spiritual interests." },

  { group: "Shipping", question: "Do you ship internationally?",
    answer: "Yes. We securely ship gemstones and jewellery worldwide using trusted courier services." },
  { group: "Shipping", question: "Is shipping insured?",
    answer: "Yes. Every order is fully insured while in transit until it has been delivered." },
  { group: "Shipping", question: "How quickly are orders dispatched?",
    answer: "Loose gemstones are typically dispatched within one business day after payment has been confirmed.",
    after: "Custom jewellery is shipped once manufacturing has been completed." },
  { group: "Shipping", question: "How long does delivery take?",
    answer: "Estimated delivery times are:",
    list: [
      "Australia: 1–2 business days",
      "New Zealand: 2–3 business days",
      "Hong Kong & Singapore: 1–2 business days",
      "USA & Canada: 3–5 business days",
      "United Kingdom & Europe: 3–5 business days",
      "Japan: 3–5 business days",
      "Other international destinations: 5–7 business days",
    ],
    after: "Delivery times are estimates and may vary due to customs processing or courier delays." },
  { group: "Shipping", question: "Will I need to pay customs duties or taxes?",
    answer: "International customers may be required to pay customs duties, import taxes, or other charges imposed by their destination country. These charges are determined by local customs authorities and are the responsibility of the customer unless otherwise stated." },

  { group: "Returns", question: "Can I return a loose gemstone?",
    answer: "Yes. Eligible loose gemstones may be returned within 14 days of delivery, provided they remain in their original condition and are accompanied by all original documentation. Please contact us before returning any item." },
  { group: "Returns", question: "Can I return custom-made jewellery?",
    answer: "As each piece is individually designed and handcrafted, custom-made jewellery cannot be returned for change of mind. This does not affect your rights under Australian Consumer Law." },

  { group: "Jewellery Care", question: "How should I clean my jewellery?",
    answer: "Most gemstones can be cleaned using warm water, mild soap, and a soft cloth or soft brush. Avoid harsh chemicals, ultrasonic cleaners, and steam cleaners unless specifically recommended for your gemstone." },
  { group: "Jewellery Care", question: "Are gemstones suitable for everyday wear?",
    answer: "Many gemstones—including sapphire and ruby—are durable enough for daily wear. Softer gemstones such as opal, pearl, fluorite, turquoise, and emerald require extra care to avoid scratching or impact damage." },

  { group: "Payments & Security", question: "What payment methods do you accept?",
    answer: "We accept major credit and debit cards along with other secure payment methods available at checkout." },
  { group: "Payments & Security", question: "Is my payment secure?",
    answer: "Yes. All online payments are processed using encrypted, secure payment gateways to protect your personal and financial information." },

  { group: "Contact", question: "How can I contact Lumiora?",
    answer: "Our team is happy to assist with gemstone enquiries, custom jewellery, consultations, or existing orders.",
    after: "Please visit our Contact page or email us directly, and we'll respond as soon as possible." },

  { group: "Gemstone Investment", question: "Do you offer gemstone investment services?",
    answer: "Yes. Lumiora offers personalised gemstone investment consultations for individuals, collectors, and businesses interested in acquiring high-quality natural gemstones as part of a diversified investment portfolio.",
    after: "Our team provides guidance on gemstone selection based on factors such as rarity, quality, origin, market demand, and long-term collectability." },
  { group: "Gemstone Investment", question: "What types of gemstones are suitable for investment?",
    answer: "Investment-grade gemstones may include exceptional-quality sapphires, rubies, emeralds, spinels, alexandrites, and other rare gemstones. Recommendations depend on current market conditions, availability, and your investment objectives." },
  { group: "Gemstone Investment", question: "Can businesses invest through Lumiora?",
    answer: "Yes. We work with businesses, investors, and private collectors seeking to acquire premium natural gemstones. We can assist in sourcing suitable stones, providing documentation where available, and helping build a gemstone portfolio aligned with your objectives." },
  { group: "Gemstone Investment", question: "Is gemstone investment guaranteed to increase in value?",
    answer: "No. Like any investment, gemstone values can rise or fall depending on market demand, rarity, quality, global economic conditions, and other factors. Lumiora provides information and guidance to help clients make informed decisions but does not guarantee future performance or investment returns." },
  { group: "Gemstone Investment", question: "Do you provide private investment consultations?",
    answer: "Yes. Private consultations are available by appointment. During the consultation, we discuss your goals, budget, and preferences to help identify gemstones that may be suitable for your collection or investment strategy." },
  { group: "Gemstone Investment", question: "I couldn't find the answer to my question.",
    answer: "We're here to help. If your question isn't covered above, please contact our team. We'll be delighted to assist you and provide personalised guidance." },
];

export const faqGroups = Array.from(new Set(faqs.map((f) => f.group)));

/** The full answer as one plain string, for structured data. */
export function faqAnswerText(faq: FaqItem) {
  return [faq.answer, faq.list?.join(", "), faq.after].filter(Boolean).join(" ");
}
