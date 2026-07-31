import type { PolicyDoc } from "@/types";

export const policies: PolicyDoc[] = [
  {
    slug: "shipping", title: "Shipping Policy", updatedAt: "2026-07-01",
    sections: [
      { heading: "Dispatch", body: ["Stones in stock are dispatched within two working days of cleared payment. Bespoke and set pieces are dispatched on the date confirmed in writing at the time of order."] },
      { heading: "Domestic shipping", body: ["Shipping within India is fully insured, tracked and included in the price of the stone. A signature is required on delivery, and we cannot deliver to a PO box."] },
      { heading: "International shipping", body: ["We ship internationally by insured courier, quoted at cost before dispatch. Import duties, taxes and customs charges are the responsibility of the recipient and are not included in our quotation."] },
      { heading: "Loss in transit", body: ["Every shipment is insured for its full value. In the rare event of loss or damage in transit, we handle the claim and either replace the stone or refund you in full."] },
    ],
  },
  {
    slug: "refund", title: "Refund & Returns Policy", updatedAt: "2026-07-01",
    sections: [
      { heading: "Loose stones", body: ["Loose stones may be returned within 14 days of delivery for a full refund, provided they are unaltered, unset and accompanied by their original certificate and packaging."] },
      { heading: "Bespoke and set pieces", body: ["Pieces made or set to order are not returnable, as they cannot be resold. This does not affect your rights where a piece is faulty or does not match the approved design — in those cases we correct or remake the piece at our cost."] },
      { heading: "How to return", body: ["Contact us before returning anything so we can arrange insured collection. Uninsured returns sent without notice travel at your own risk.", "Approved refunds are issued to the original payment method within seven working days of the stone reaching us and passing inspection."] },
    ],
  },
  {
    slug: "privacy", title: "Privacy Policy", updatedAt: "2026-07-01",
    sections: [
      { heading: "What we collect", body: ["We collect only what you give us through an enquiry or newsletter form — your name, email address, telephone number where provided, and the content of your message. We also collect anonymised analytics about how the site is used."] },
      { heading: "How we use it", body: ["Your details are used to answer your enquiry, fulfil an order, and — only where you have opted in — to send occasional news about new stones. We do not sell or rent your information to anyone."] },
      { heading: "Retention and your rights", body: ["Enquiry records are kept for three years, order records for the period required by Indian tax law. You may ask us at any time to show you what we hold, correct it, or delete it, by writing to the address on our contact page."] },
      { heading: "Cookies", body: ["The site uses essential cookies required for it to function, and analytics cookies that measure aggregate traffic. No advertising or cross-site tracking cookies are set."] },
    ],
  },
  {
    slug: "terms", title: "Terms of Service", updatedAt: "2026-07-01",
    sections: [
      { heading: "Listings", body: ["Stone descriptions, weights and measurements are stated as accurately as we can determine them. Photographs and video are captured under controlled lighting; colour reproduction varies between screens, and a stone should be assessed in person or on approval."] },
      { heading: "Availability and pricing", body: ["All stones are one of a kind and are sold subject to remaining available. Prices are quoted in Indian Rupees and are exclusive of applicable GST unless stated otherwise. We reserve the right to correct pricing errors before an order is confirmed."] },
      { heading: "Governing law", body: ["These terms are governed by the laws of India, and the courts at Bengaluru have exclusive jurisdiction over any dispute arising from them."] },
    ],
  },
];

export const policiesBySlug = new Map(policies.map((p) => [p.slug, p]));
