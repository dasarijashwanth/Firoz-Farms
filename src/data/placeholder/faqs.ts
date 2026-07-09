export type Faq = {
  question: string;
  answer: string;
  category: string;
};

export const faqCategories = [
  "Ordering & Delivery",
  "Subscriptions",
  "Products & Quality",
  "Payments",
  "Returns & Support",
] as const;

export const faqs: Faq[] = [
  // Ordering & Delivery
  {
    category: "Ordering & Delivery",
    question: "Which areas do you deliver to?",
    answer:
      "We currently deliver fresh across Khammam District and surrounding mandals in Telangana, including Annapureddy Pally Mandal and neighbouring villages. During checkout, simply enter your PIN code and we'll confirm instantly whether your address is within our delivery zone. We're steadily expanding, so if we don't cover your area yet, do reach out and we'll let you know when we do.",
  },
  {
    category: "Ordering & Delivery",
    question: "What time will my order be delivered?",
    answer:
      "Our farm-fresh deliveries run daily between 7:00 AM and 7:00 PM, matching our farm's operating hours. Milk and dairy orders placed the previous evening are prioritised for early morning delivery so they reach you as fresh as possible. You'll receive a call or WhatsApp update from our delivery team shortly before they arrive.",
  },
  {
    category: "Ordering & Delivery",
    question: "Is there a minimum order value?",
    answer:
      "For one-time orders, we keep a minimum order value of ₹150 to keep our farm-to-door delivery model sustainable. Subscription customers (daily or alternate-day milk plans) have no minimum order requirement once the plan is active.",
  },
  {
    category: "Ordering & Delivery",
    question: "Can I schedule a delivery for a specific date?",
    answer:
      "Yes. When placing an order on our website, you can choose a preferred delivery date and time window. For recurring subscription orders, deliveries are automatically scheduled based on the plan frequency you select.",
  },
  {
    category: "Ordering & Delivery",
    question: "Do you charge for delivery?",
    answer:
      "Delivery is free on all subscription plans and on one-time orders above ₹500. A small delivery fee applies to smaller one-time orders to help cover our last-mile logistics — this is always shown clearly at checkout before you pay.",
  },

  // Subscriptions
  {
    category: "Subscriptions",
    question: "How do I pause or skip a delivery?",
    answer:
      "You can pause, skip, or resume any upcoming delivery from the 'My Subscriptions' section of your account, up to 8 PM the night before the scheduled delivery. This gives our farm team enough time to adjust the next morning's milking and packing schedule.",
  },
  {
    category: "Subscriptions",
    question: "Can I change my subscription plan or quantity?",
    answer:
      "Absolutely. You can upgrade, downgrade, or switch products on your subscription anytime from your account dashboard. Changes made before 8 PM apply from the very next delivery; changes made later take effect from the following day.",
  },
  {
    category: "Subscriptions",
    question: "What happens if I forget to skip a delivery while travelling?",
    answer:
      "No problem — call or WhatsApp our support team on our contact number as early as possible and we'll do our best to hold the delivery. If it has already left the farm, we're happy to credit that delivery towards your next order.",
  },
  {
    category: "Subscriptions",
    question: "Is there a long-term commitment for subscriptions?",
    answer:
      "None at all. All Firoz Farms subscriptions are month-to-month with no lock-in period, and you can cancel anytime from your account with no cancellation charges.",
  },

  // Products & Quality
  {
    category: "Products & Quality",
    question: "Is Firoz Farms milk and dairy genuinely organic?",
    answer:
      "Yes. Our cows graze on open, pesticide-free pastures and are fed natural fodder grown without synthetic fertilisers. We follow strict no-hormone, no-antibiotic practices across the farm, and our processes are regularly audited to meet organic farming standards.",
  },
  {
    category: "Products & Quality",
    question: "How long does the milk stay fresh, and how should I store it?",
    answer:
      "Our milk is chilled immediately after milking and delivered the same day, so it typically stays fresh for 24–48 hours when refrigerated at or below 4°C. For best taste and quality, store it towards the back of your fridge (not the door) and consume it within a day or two of delivery.",
  },
  {
    category: "Products & Quality",
    question: "Do you pasteurise your milk?",
    answer:
      "Yes, all our milk undergoes gentle pasteurisation to ensure it's safe for drinking while preserving its natural taste and nutrition. We avoid any homogenisation or additives, so you may notice a thin cream layer forming naturally on top — that's a sign of real, unprocessed milk.",
  },
  {
    category: "Products & Quality",
    question: "Do your products contain any preservatives?",
    answer:
      "No. Everything from Firoz Farms — milk, curd, ghee, paneer, and our grocery range — is made without artificial preservatives, colours, or synthetic additives. This is also why our products have a shorter shelf life than supermarket alternatives, and why we recommend ordering in quantities you'll use within a few days.",
  },

  // Payments
  {
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI (Google Pay, PhonePe, Paytm), all major debit and credit cards, net banking, and Cash on Delivery (COD) for one-time orders. Subscription plans can be set up with UPI autopay for hassle-free recurring billing.",
  },
  {
    category: "Payments",
    question: "Is Cash on Delivery available for subscriptions?",
    answer:
      "COD is available for one-time orders, but subscriptions require an online payment method (UPI or card) since deliveries happen automatically each day and our delivery staff don't collect cash on recurring routes.",
  },
  {
    category: "Payments",
    question: "How do refunds work if I'm unhappy with my order?",
    answer:
      "If an order is cancelled before dispatch, refunds are processed to your original payment method within 3–5 business days. For approved quality issues after delivery, we offer either a replacement on your next delivery or a refund/wallet credit — whichever you prefer.",
  },

  // Returns & Support
  {
    category: "Returns & Support",
    question: "What should I do if a product arrives damaged or spoiled?",
    answer:
      "Please let us know within 12 hours of delivery via a call, WhatsApp, or the contact form on this site, along with a photo if possible. We take quality seriously and will arrange a free replacement or refund promptly, no questions asked.",
  },
  {
    category: "Returns & Support",
    question: "How can I reach customer support?",
    answer:
      "You can call or WhatsApp us, email us, or use the contact form on our Contact page — our team is available every day from 7:00 AM to 7:00 PM. See the Contact page for our phone number, WhatsApp, and email address.",
  },
  {
    category: "Returns & Support",
    question: "Do you offer bulk or event orders?",
    answer:
      "Yes, we cater to bulk requirements for events, restaurants, and institutions. Reach out to us through the Contact page with your requirement and preferred date, and our team will get back to you with availability and pricing.",
  },
];
