import type { FaqItem } from "@/types";

export const faqs: FaqItem[] = [
  { group: "Buying", question: "Can I see a stone before committing?",
    answer: "Yes. We send stones on approval within India against a refundable deposit, and we film any stone on request under both daylight and indoor lighting. No stone should be bought from a photograph alone." },
  { group: "Buying", question: "Do your prices include the setting?",
    answer: "No. Every stone is priced loose. Setting is quoted separately once you have chosen a design, because metal choice and complexity vary widely." },
  { group: "Buying", question: "Do you offer a payment plan?",
    answer: "For stones above ₹5,00,000 we can arrange a staged payment schedule. Please raise it during your enquiry and we will set out the terms in writing." },
  { group: "Stones", question: "What does 'unheated' mean, and why does it cost more?",
    answer: "An unheated stone reached its colour and clarity without any thermal treatment. Heating is legitimate, permanent and disclosed, but stones that emerged from the ground already fine are far rarer — the premium reflects scarcity, not superior beauty." },
  { group: "Stones", question: "Is 'eye clean' the same as flawless?",
    answer: "No. Eye clean means no inclusions are visible to an unaided eye at normal viewing distance. Sapphire is expected to contain inclusions; eye clean is the practical standard for fine coloured stones." },
  { group: "Stones", question: "Who certifies your stones?",
    answer: "Higher-value stones carry reports from GIA, GRS or IGI. Others carry our in-house gemmological assessment. The certifying body is stated on every listing, and we will arrange independent certification on request at cost." },
  { group: "Custom", question: "How long does a bespoke piece take?",
    answer: "Typically six to ten weeks from approved design to finished piece. Complex settings and unusual metals can extend this; we confirm a date before any work begins." },
  { group: "Custom", question: "Can I use a stone or metal I already own?",
    answer: "Yes. We regularly reset inherited stones and can reuse metal where its condition allows. We will assess both and tell you honestly if reuse is inadvisable." },
  { group: "Orders", question: "How are stones shipped?",
    answer: "Fully insured and tracked, with signature on delivery. Domestic shipping is included. International shipping is quoted at cost, and any customs duty is the buyer's responsibility." },
  { group: "Orders", question: "What is your return policy?",
    answer: "Loose stones may be returned within 14 days of delivery in their original, unaltered condition for a full refund. Bespoke and set pieces are made to order and are not returnable, though we will always correct our own errors." },
];

export const faqGroups = Array.from(new Set(faqs.map((f) => f.group)));
