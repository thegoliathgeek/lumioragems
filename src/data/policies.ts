import type { PolicyDoc } from "@/types";

export const policies: PolicyDoc[] = [
  {
    slug: "shipping", title: "Shipping Policy", updatedAt: "2026-09-17",
    intro:
      "At Lumiora, we are committed to ensuring your gemstones and jewellery arrive safely, securely, and promptly. Every order is carefully packaged and fully insured for your peace of mind.",
    sections: [
      { heading: "Complimentary Worldwide Shipping", body: [
        { lead: "We are pleased to offer complimentary secure, insured express shipping on all retail orders worldwide." },
        "All shipments are fully insured up to the invoiced value until they have been successfully delivered.",
        { list: [
          "Australia: Shipped via Australia Post Express or an equivalent premium courier service.",
          "International: Shipped via trusted international couriers such as FedEx, DHL, TNT, or an equivalent express carrier.",
          "Trade and wholesale customers: Shipping charges may apply and will be calculated during checkout or provided in your quotation.",
        ] },
      ] },
      { heading: "Estimated Delivery Times", body: [
        "The delivery times below apply once your order has been dispatched. Please note that custom-made jewellery requires additional production time before shipping.",
        { table: {
          head: ["Destination", "Estimated Delivery"],
          rows: [
            ["Australia", "1–2 business days"],
            ["New Zealand", "2–3 business days"],
            ["Hong Kong & Singapore", "1–2 business days"],
            ["United States & Canada", "3–5 business days"],
            ["United Kingdom & Europe", "3–5 business days"],
            ["Japan", "3–5 business days"],
            ["Rest of the World", "5–7 business days"],
          ],
        } },
        "Delivery times are estimates only and may vary depending on courier services, customs processing, weather conditions, or other unforeseen circumstances.",
      ] },
      { heading: "Customs, Import Duties & Taxes", body: [
        "Orders are shipped from Australia.",
        "International orders may be subject to customs inspections, import duties, taxes, or other government charges imposed by the destination country. These charges are determined by your local customs authority and are the responsibility of the customer unless otherwise stated.",
        "While customs procedures are generally straightforward in many countries, occasional inspections may result in delivery delays that are outside Lumiora's control.",
        "Customers are encouraged to check with their local customs office before placing an order to understand any import requirements or potential charges.",
        "If customs duties or taxes are payable, the shipping carrier may contact you directly to arrange payment before delivery.",
      ] },
      { heading: "Shipment Tracking & Insurance", body: [
        "Once your order has been dispatched, you will receive a shipping confirmation email containing your tracking information.",
        "Every shipment is fully insured while in transit. If your parcel is lost or damaged during delivery, please contact Lumiora as soon as possible so we can assist with the courier's claims process.",
      ] },
      { heading: "Delivery Information", body: [
        "Please ensure that the shipping address provided at checkout is accurate and complete. Lumiora cannot be held responsible for delays or additional charges resulting from incorrect or incomplete delivery information.",
        "If a parcel is returned due to an incorrect address, refusal of delivery, or failure to pay applicable customs charges, any additional shipping costs incurred to resend the parcel will be the responsibility of the customer.",
      ] },
      { heading: "Need Assistance?", body: [
        "If you have any questions regarding shipping, delivery times, customs, or your order, our team will be happy to assist you.",
      ] },
    ],
    closing:
      "Thank you for choosing Lumiora. We take pride in delivering exceptional gemstones and handcrafted jewellery safely to customers around the world.",
  },
  {
    slug: "refund", title: "Refund Policy", updatedAt: "2026-09-17",
    intro:
      "At Lumiora, every gemstone and jewellery piece is handled with exceptional care and craftsmanship. Please read our refund policy carefully before making a purchase.",
    sections: [
      { heading: "Custom-Made Jewellery", body: [
        "All custom-made jewellery is created specifically for each customer. As every piece is individually designed and manufactured, we do not accept returns, refunds, or exchanges for change of mind.",
        "Once a design has been approved and an invoice has been issued, the order cannot be cancelled or modified. Any deposit paid is non-refundable.",
        "If you request changes after the original design has been approved, additional design and manufacturing costs may apply. These costs will be quoted and invoiced before work continues.",
        "If your jewellery arrives with a manufacturing fault or does not match the agreed design specifications, please contact us within 7 days of receiving your order. We will assess the item and, where appropriate, repair, replace, or remake the piece within a reasonable timeframe.",
        "We recommend that all jewellery is insured against loss, theft, or accidental damage once it has been delivered.",
      ] },
      { heading: "Loose Gemstones", body: [
        "At Lumiora, we mine, cut, polish, and carefully inspect our gemstones to ensure they meet our quality standards before they reach our customers.",
        { lead: "We accept returns of loose gemstones within 14 days of the delivery date, provided that:" },
        { list: [
          "the return has been approved by Lumiora before shipping;",
          "the gemstone is returned by the original purchaser named on the invoice;",
          "the gemstone is in its original, unused, and unaltered condition;",
          "all original packaging, certificates, identification reports, and accompanying documentation are returned with the gemstone; and",
          "the original invoice is included.",
        ] },
        "Once the returned gemstone has been received and inspected, an eligible refund will be processed using the original payment method.",
        "Shipping costs, insurance fees, import duties, customs charges, taxes, and return shipping expenses are non-refundable and remain the responsibility of the customer.",
        "International refunds are processed in the original invoiced currency. Exchange rate fluctuations may result in differences between the original payment amount and the refunded amount.",
      ] },
      { heading: "Aura Readings & Astrology Consultations", body: [
        { lead: "Bookings for aura readings and astrology consultations may be cancelled up to 48 hours before the scheduled appointment for a full refund or to reschedule your booking." },
        "Cancellations made less than 48 hours before the appointment, or failure to attend a scheduled consultation, are non-refundable.",
        "If Lumiora needs to reschedule or cancel your appointment due to unforeseen circumstances, you may choose either a full refund or an alternative appointment time.",
      ] },
      { heading: "Return Instructions", body: [
        "Please contact Lumiora before returning any item. Returns sent without prior approval may not be accepted.",
        "For your protection, returned items should be shipped using a fully insured and trackable express courier service. Lumiora cannot accept responsibility for items lost or damaged during return transit.",
      ] },
      { heading: "Australian Consumer Law", body: [
        "Nothing in this Refund Policy excludes or limits your rights under the Australian Consumer Law. If a product has a major fault or fails to meet consumer guarantees, you may be entitled to a repair, replacement, or refund as provided under applicable law.",
      ] },
    ],
  },
  {
    slug: "warranty", title: "Our Craftsmanship Warranty", updatedAt: "2026-09-17",
    intro:
      "At Lumiora, exceptional craftsmanship is at the heart of everything we create. Every custom jewellery piece is meticulously designed, expertly crafted, and carefully inspected to ensure it meets our uncompromising standards of quality before it reaches you. We stand behind the quality of our workmanship and are committed to providing jewellery that is made to be treasured for generations.",
    sections: [
      { heading: "24-Month Craftsmanship Warranty", body: [
        { lead: "Lumiora provides a 24-month Craftsmanship Warranty on all custom-made jewellery against manufacturing defects in workmanship." },
        "If your jewellery is found to have a manufacturing fault resulting from our craftsmanship within 24 months of the purchase date, we will assess the item and, where appropriate, repair or replace the affected component at no cost.",
        "This warranty applies only to manufacturing defects and does not affect your rights under the Australian Consumer Law.",
      ] },
      { heading: "What Is Covered", body: [
        "Our warranty covers defects resulting from our manufacturing process, including:",
        { list: [
          "Faults in craftsmanship",
          "Structural manufacturing defects",
          "Manufacturing issues affecting gemstone settings",
          "Manufacturing defects in soldering or assembly",
        ] },
        "Every warranty claim is individually assessed by our jewellery specialists.",
      ] },
      { heading: "What Is Not Covered", body: [
        "Our Craftsmanship Warranty does not cover damage resulting from normal wear and tear, accidental damage, misuse, neglect, or improper care. Examples include:",
        { list: [
          "Scratches, dents, or surface wear from everyday use",
          "Bent, broken, or worn claws caused by impact or snagging",
          "Damage caused by dropping or striking the jewellery",
          "Damage resulting from unauthorised repairs or alterations",
          "Chemical damage caused by exposure to harsh cleaning products",
          "General wear of polished finishes",
        ] },
        "White gold jewellery that has been rhodium plated will naturally require re-plating over time to maintain its bright white appearance. Depending on wear and lifestyle, this may be required every one to five years. Rhodium plating is considered routine maintenance and is not covered under this warranty.",
      ] },
      { heading: "Loss of Gemstones", body: [
        "While every Lumiora jewellery piece is crafted with great care, the loss of a gemstone due to accidental damage, impact, wear, or external causes is not covered under our Craftsmanship Warranty.",
        "We strongly recommend arranging comprehensive jewellery insurance as soon as your purchase has been delivered to protect against accidental loss, theft, or damage.",
      ] },
      { heading: "Complimentary Annual Inspection", body: [
        { lead: "To help keep your jewellery in excellent condition, Lumiora offers a complimentary annual jewellery inspection." },
        "During the inspection, our team will examine:",
        { list: ["Gemstone security", "Claw condition", "Settings", "General wear", "Overall structural integrity"] },
        "Regular inspections help identify normal wear before it develops into a more significant issue and assist in maintaining the longevity of your jewellery.",
      ] },
      { heading: "Jewellery Care & Servicing", body: [
        "Over time, all fine jewellery benefits from professional care. Lumiora also offers cleaning, polishing, resizing, refinishing, and repair services to help preserve the beauty and integrity of your treasured pieces.",
        "If you have any concerns about your jewellery or believe it may require inspection or repair, please contact our team. We are always happy to assist.",
      ] },
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
