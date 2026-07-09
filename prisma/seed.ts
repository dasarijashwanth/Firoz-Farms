import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL, max: 3 });
const db = new PrismaClient({ adapter });

const categories = [
  {
    slug: "dairy",
    name: "Milk & Dairy",
    description: "Fresh milk, curd, paneer, ghee, and more — straight from our herd to your home.",
  },
  {
    slug: "eggs-honey",
    name: "Eggs & Honey",
    description: "Farm-laid eggs and raw, unprocessed forest honey.",
  },
  {
    slug: "vegetables-fruits",
    name: "Vegetables & Fruits",
    description: "Chemical-free, seasonal produce grown on organic soil.",
  },
  {
    slug: "grains-pulses",
    name: "Grains, Pulses & Oils",
    description: "Millets, rice, pulses, cold-pressed oils, and traditional staples.",
  },
  {
    slug: "gift-boxes",
    name: "Gift Boxes",
    description: "Curated hampers of our best farm produce for festivals and gifting.",
  },
] as const;

type ProductSeed = {
  name: string;
  slug: string;
  category: (typeof categories)[number]["slug"];
  price: number;
  compareAtPrice?: number;
  unit: string;
  sku: string;
  shortDescription: string;
  description: string;
  ingredients?: string;
  storageInfo: string;
  shelfLife: string;
  benefits: string[];
  nutritionFacts: Record<string, string>;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  farmerName: string;
};

const farmers = ["Firoz Khan", "Ramulu Naik", "Lakshmi Devi", "Venkat Rao", "Sarojini Bai"];
const farmerFor = (i: number) => farmers[i % farmers.length];

const milkNutrition = {
  "Energy": "62 kcal", "Protein": "3.2 g", "Fat": "3.6 g", "Carbohydrate": "4.8 g", "Calcium": "120 mg",
};
const gheeNutrition = { "Energy": "897 kcal", "Fat": "99.5 g", "Saturated Fat": "62 g" };
const produceNutrition = { "Energy": "varies by item", "Fiber": "rich", "Vitamins": "A, C" };
const grainNutrition = { "Energy": "340 kcal", "Protein": "8-12 g", "Fiber": "high" };
const honeyNutrition = { "Energy": "304 kcal", "Sugars": "82 g", "Antioxidants": "present" };

const products: ProductSeed[] = [
  { name: "A2 Cow Milk", slug: "a2-cow-milk-1l", category: "dairy", price: 90, unit: "1 Litre", sku: "FF-DAIRY-001", shortDescription: "Pure A2 protein milk from indigenous cows.", description: "Our A2 Cow Milk comes from indigenous Gir and Sahiwal cows raised on open pastures, free from hormones and antibiotics. Delivered fresh every morning within hours of milking.", storageInfo: "Refrigerate at 2-4°C. Consume within 48 hours of opening.", shelfLife: "2 days refrigerated", benefits: ["Rich in A2 protein", "Easier to digest", "No hormones or antibiotics", "Naturally sweet taste"], nutritionFacts: milkNutrition, isFeatured: true, isBestSeller: true, farmerName: farmerFor(0) },
  { name: "Buffalo Milk", slug: "buffalo-milk-1l", category: "dairy", price: 80, unit: "1 Litre", sku: "FF-DAIRY-002", shortDescription: "Creamy, high-fat buffalo milk.", description: "Thick, creamy buffalo milk perfect for tea, sweets, and everyday cooking. Sourced from our own herd and chilled immediately after milking.", storageInfo: "Refrigerate at 2-4°C.", shelfLife: "2 days refrigerated", benefits: ["High in calcium", "Rich creamy texture", "Great for sweets & desserts"], nutritionFacts: milkNutrition, isBestSeller: true, farmerName: farmerFor(1) },
  { name: "Toned Cow Milk", slug: "toned-cow-milk-500ml", category: "dairy", price: 45, unit: "500 ml", sku: "FF-DAIRY-003", shortDescription: "Light, everyday cow milk.", description: "A lighter, everyday milk option for the whole family — same farm-fresh sourcing, gently toned.", storageInfo: "Refrigerate at 2-4°C.", shelfLife: "2 days refrigerated", benefits: ["Lower fat option", "Farm fresh daily"], nutritionFacts: milkNutrition, farmerName: farmerFor(2) },
  { name: "Fresh Curd", slug: "fresh-curd-500g", category: "dairy", price: 55, unit: "500 g", sku: "FF-DAIRY-004", shortDescription: "Thick, set curd from farm-fresh milk.", description: "Traditionally set curd made fresh daily from our own milk — thick, tangy, and probiotic-rich.", storageInfo: "Refrigerate at 2-4°C.", shelfLife: "3 days refrigerated", benefits: ["Rich in probiotics", "Aids digestion", "No preservatives"], nutritionFacts: milkNutrition, isBestSeller: true, farmerName: farmerFor(0) },
  { name: "Paneer", slug: "fresh-paneer-200g", category: "dairy", price: 90, unit: "200 g", sku: "FF-DAIRY-005", shortDescription: "Soft, fresh cottage cheese.", description: "Handmade paneer prepared fresh from whole milk — soft, mild, and perfect for curries or snacking.", storageInfo: "Refrigerate at 2-4°C.", shelfLife: "3 days refrigerated", benefits: ["High protein", "No additives", "Soft texture"], nutritionFacts: { ...milkNutrition, "Protein": "18 g" }, isFeatured: true, farmerName: farmerFor(3) },
  { name: "White Butter", slug: "white-butter-200g", category: "dairy", price: 120, unit: "200 g", sku: "FF-DAIRY-006", shortDescription: "Traditional hand-churned white butter.", description: "Unsalted, hand-churned white butter made the traditional way from fresh cream.", storageInfo: "Refrigerate at 2-4°C.", shelfLife: "7 days refrigerated", benefits: ["No preservatives", "Traditionally churned"], nutritionFacts: gheeNutrition, farmerName: farmerFor(4) },
  { name: "Pure Cow Ghee", slug: "pure-cow-ghee-500ml", category: "dairy", price: 550, unit: "500 ml", sku: "FF-DAIRY-007", shortDescription: "Bilona-method cow ghee.", description: "Golden, aromatic cow ghee made using the traditional bilona method from cultured cream.", storageInfo: "Store at room temperature, away from moisture.", shelfLife: "12 months", benefits: ["Traditional bilona method", "Rich aroma", "Good fats"], nutritionFacts: gheeNutrition, isFeatured: true, isBestSeller: true, farmerName: farmerFor(0) },
  { name: "Buffalo Ghee", slug: "buffalo-ghee-500ml", category: "dairy", price: 600, unit: "500 ml", sku: "FF-DAIRY-008", shortDescription: "Rich, granular buffalo ghee.", description: "Full-bodied buffalo ghee with a distinctive granular texture, made in small batches.", storageInfo: "Store at room temperature.", shelfLife: "12 months", benefits: ["Rich flavour", "Small-batch made"], nutritionFacts: gheeNutrition, farmerName: farmerFor(1) },
  { name: "Buttermilk", slug: "buttermilk-500ml", category: "dairy", price: 35, unit: "500 ml", sku: "FF-DAIRY-009", shortDescription: "Refreshing spiced buttermilk.", description: "Light, tangy buttermilk churned from fresh curd — a refreshing everyday drink.", storageInfo: "Refrigerate at 2-4°C.", shelfLife: "2 days refrigerated", benefits: ["Cooling & refreshing", "Probiotic rich"], nutritionFacts: milkNutrition, farmerName: farmerFor(2) },
  { name: "Sweet Lassi", slug: "sweet-lassi-300ml", category: "dairy", price: 40, unit: "300 ml", sku: "FF-DAIRY-010", shortDescription: "Creamy sweetened yogurt drink.", description: "A classic sweet lassi made from thick curd, lightly sweetened with natural jaggery.", storageInfo: "Refrigerate at 2-4°C.", shelfLife: "2 days refrigerated", benefits: ["Probiotic rich", "Naturally sweetened"], nutritionFacts: milkNutrition, farmerName: farmerFor(3) },
  { name: "Fresh Cream", slug: "fresh-cream-200ml", category: "dairy", price: 85, unit: "200 ml", sku: "FF-DAIRY-011", shortDescription: "Thick dairy cream for cooking & desserts.", description: "Rich, thick cream skimmed from our farm milk — ideal for desserts, curries, and coffee.", storageInfo: "Refrigerate at 2-4°C.", shelfLife: "4 days refrigerated", benefits: ["Rich texture", "Versatile use"], nutritionFacts: gheeNutrition, farmerName: farmerFor(4) },
  { name: "Farmhouse Cheese", slug: "farmhouse-cheese-200g", category: "dairy", price: 150, unit: "200 g", sku: "FF-DAIRY-012", shortDescription: "Mild, fresh farmhouse cheese.", description: "A mild, fresh cheese made in small batches, perfect for sandwiches and snacking.", storageInfo: "Refrigerate at 2-4°C.", shelfLife: "10 days refrigerated", benefits: ["Small-batch made", "No artificial additives"], nutritionFacts: { ...milkNutrition, "Protein": "20 g" }, farmerName: farmerFor(0) },
  { name: "Farm Fresh Eggs (12 pcs)", slug: "farm-fresh-eggs-12pcs", category: "eggs-honey", price: 110, unit: "12 pcs", sku: "FF-EGGS-001", shortDescription: "Free-range farm eggs.", description: "Eggs from free-range hens raised on natural feed — rich yolk colour, farm-fresh taste.", storageInfo: "Refrigerate; use within 2 weeks.", shelfLife: "14 days refrigerated", benefits: ["Free-range", "Rich in protein", "No antibiotics"], nutritionFacts: { "Energy": "155 kcal/100g", "Protein": "13 g/100g" }, isBestSeller: true, farmerName: farmerFor(1) },
  { name: "Raw Forest Honey", slug: "raw-forest-honey-500g", category: "eggs-honey", price: 320, unit: "500 g", sku: "FF-HONEY-001", shortDescription: "Unprocessed, raw forest honey.", description: "Raw, unheated honey sourced from forest apiaries near our farm — unfiltered and full of natural enzymes.", storageInfo: "Store at room temperature.", shelfLife: "24 months", benefits: ["Raw & unprocessed", "Natural enzymes", "No added sugar"], nutritionFacts: honeyNutrition, isFeatured: true, farmerName: farmerFor(2) },
  { name: "Organic Tomatoes", slug: "organic-tomatoes-1kg", category: "vegetables-fruits", price: 60, unit: "1 kg", sku: "FF-VEG-001", shortDescription: "Vine-ripened organic tomatoes.", description: "Juicy, vine-ripened tomatoes grown without chemical pesticides on our own farmland.", storageInfo: "Store in a cool, dry place or refrigerate.", shelfLife: "5-7 days", benefits: ["Chemical-free", "Vine ripened", "Rich in vitamin C"], nutritionFacts: produceNutrition, farmerName: farmerFor(3) },
  { name: "Organic Spinach", slug: "organic-spinach-500g", category: "vegetables-fruits", price: 40, unit: "500 g", sku: "FF-VEG-002", shortDescription: "Fresh organic leafy spinach.", description: "Tender, iron-rich spinach leaves harvested fresh from our organic beds.", storageInfo: "Refrigerate; use within 3 days.", shelfLife: "3 days refrigerated", benefits: ["Iron rich", "Chemical-free", "Freshly harvested"], nutritionFacts: produceNutrition, farmerName: farmerFor(4) },
  { name: "Organic Bananas", slug: "organic-bananas-1kg", category: "vegetables-fruits", price: 55, unit: "1 kg", sku: "FF-FRT-001", shortDescription: "Naturally ripened organic bananas.", description: "Sweet, naturally ripened bananas grown without synthetic ripening agents.", storageInfo: "Store at room temperature.", shelfLife: "4-5 days", benefits: ["Naturally ripened", "Rich in potassium"], nutritionFacts: produceNutrition, farmerName: farmerFor(0) },
  { name: "Organic Mangoes", slug: "organic-mangoes-1kg", category: "vegetables-fruits", price: 150, unit: "1 kg", sku: "FF-FRT-002", shortDescription: "Seasonal organic mangoes.", description: "Sweet, fragrant mangoes grown organically on our farm — a true seasonal treat.", storageInfo: "Store at room temperature to ripen.", shelfLife: "5-6 days", benefits: ["Seasonal & organic", "Naturally sweet"], nutritionFacts: produceNutrition, isFeatured: true, farmerName: farmerFor(1) },
  { name: "Cold Pressed Groundnut Oil", slug: "cold-pressed-groundnut-oil-1l", category: "grains-pulses", price: 260, unit: "1 Litre", sku: "FF-OIL-001", shortDescription: "Wood-pressed groundnut oil.", description: "Traditionally wood-pressed groundnut oil retaining natural aroma and nutrients.", storageInfo: "Store in a cool, dry place.", shelfLife: "9 months", benefits: ["Cold pressed", "No chemical extraction"], nutritionFacts: gheeNutrition, farmerName: farmerFor(2) },
  { name: "Cold Pressed Coconut Oil", slug: "cold-pressed-coconut-oil-500ml", category: "grains-pulses", price: 220, unit: "500 ml", sku: "FF-OIL-002", shortDescription: "Virgin cold-pressed coconut oil.", description: "Pure, virgin coconut oil extracted through cold-pressing for maximum nutrition.", storageInfo: "Store in a cool, dry place.", shelfLife: "12 months", benefits: ["Cold pressed", "Virgin quality"], nutritionFacts: gheeNutrition, farmerName: farmerFor(3) },
  { name: "Foxtail Millet", slug: "foxtail-millet-1kg", category: "grains-pulses", price: 110, unit: "1 kg", sku: "FF-GRN-001", shortDescription: "Organically grown foxtail millet.", description: "Nutrient-dense foxtail millet, a wholesome gluten-free grain grown organically.", storageInfo: "Store in an airtight container.", shelfLife: "6 months", benefits: ["Gluten-free", "High fiber", "Organically grown"], nutritionFacts: grainNutrition, farmerName: farmerFor(4) },
  { name: "Sona Masoori Rice", slug: "sona-masoori-rice-5kg", category: "grains-pulses", price: 420, unit: "5 kg", sku: "FF-GRN-002", shortDescription: "Aromatic Sona Masoori rice.", description: "Lightly aromatic, low-glycemic Sona Masoori rice grown by our partner farmers.", storageInfo: "Store in an airtight container.", shelfLife: "12 months", benefits: ["Aromatic", "Naturally grown"], nutritionFacts: grainNutrition, isBestSeller: true, farmerName: farmerFor(0) },
  { name: "Toor Dal", slug: "toor-dal-1kg", category: "grains-pulses", price: 160, unit: "1 kg", sku: "FF-PLS-001", shortDescription: "Unpolished organic toor dal.", description: "Unpolished toor dal, naturally grown and minimally processed to retain nutrition.", storageInfo: "Store in an airtight container.", shelfLife: "9 months", benefits: ["Unpolished", "High protein"], nutritionFacts: grainNutrition, farmerName: farmerFor(1) },
  { name: "Organic Turmeric Powder", slug: "organic-turmeric-powder-200g", category: "grains-pulses", price: 90, unit: "200 g", sku: "FF-SPC-001", shortDescription: "Sun-dried, stone-ground turmeric.", description: "Vivid, high-curcumin turmeric — sun-dried and stone-ground from our own beds.", storageInfo: "Store in a cool, dry place.", shelfLife: "12 months", benefits: ["High curcumin", "Stone ground", "No additives"], nutritionFacts: grainNutrition, farmerName: farmerFor(2) },
  { name: "Natural Jaggery", slug: "natural-jaggery-1kg", category: "grains-pulses", price: 130, unit: "1 kg", sku: "FF-JGR-001", shortDescription: "Chemical-free cane jaggery.", description: "Traditionally made jaggery from farm-grown sugarcane, free from chemical clarifiers.", storageInfo: "Store in an airtight container.", shelfLife: "6 months", benefits: ["Chemical-free", "Traditional process", "Natural sweetener"], nutritionFacts: honeyNutrition, farmerName: farmerFor(3) },
  { name: "Whole Wheat Flour (Atta)", slug: "whole-wheat-flour-5kg", category: "grains-pulses", price: 280, unit: "5 kg", sku: "FF-FLR-001", shortDescription: "Stone-ground whole wheat atta.", description: "Freshly stone-ground whole wheat flour, retaining bran and germ for full nutrition.", storageInfo: "Store in an airtight container.", shelfLife: "3 months", benefits: ["Stone ground", "High fiber"], nutritionFacts: grainNutrition, farmerName: farmerFor(4) },
  { name: "Farm Fresh Festival Hamper", slug: "farm-fresh-festival-hamper", category: "gift-boxes", price: 1499, compareAtPrice: 1799, unit: "1 Box", sku: "FF-GIFT-001", shortDescription: "A curated box of our best farm produce.", description: "A beautifully packed hamper featuring ghee, honey, jaggery, and seasonal specialties — perfect for festive gifting.", storageInfo: "Store components as per individual instructions.", shelfLife: "Varies by item", benefits: ["Curated selection", "Festive packaging", "Supports local farmers"], nutritionFacts: { "Contents": "Ghee, Honey, Jaggery, Turmeric, Millets" }, isFeatured: true, farmerName: farmerFor(0) },
];

const testimonials = [
  { name: "Anitha Reddy", location: "Khammam", rating: 5, quote: "The A2 milk tastes exactly like what I remember from my grandmother's village. My kids actually ask for it now.", isFeatured: true },
  { name: "Suresh Kumar", location: "Hyderabad", rating: 5, quote: "Been subscribing to their daily milk for six months. Never missed a single morning delivery.", isFeatured: true },
  { name: "Priya Sharma", location: "Khammam", rating: 5, quote: "The ghee has an aroma I haven't found anywhere else. Worth every rupee.", isFeatured: true },
  { name: "Mohammed Aslam", location: "Warangal", rating: 4, quote: "Great quality produce, and it's reassuring to know exactly which farm it comes from.", isFeatured: false },
  { name: "Deepika Rao", location: "Khammam", rating: 5, quote: "Their curd is thicker and tastier than anything from the supermarket. My whole family is hooked.", isFeatured: true },
  { name: "Karthik Naidu", location: "Vijayawada", rating: 5, quote: "Ordered the festival hamper for Diwali gifting — everyone loved it and asked where I got it from.", isFeatured: false },
];

const blogPosts = [
  { title: "Why A2 Milk Is Easier on Your Digestion", slug: "why-a2-milk-easier-digestion", excerpt: "A look at the science behind A2 protein and why so many families are switching.", content: "A2 milk comes from cows that produce only the A2 beta-casein protein, unlike most commercial milk which contains a mix of A1 and A2. Many people who experience discomfort with regular milk report easier digestion with A2 milk. At Firoz Farms, our indigenous cattle naturally produce A2 milk, which we deliver fresh every morning without any processing that could affect its natural properties.", tags: ["nutrition", "dairy"] },
  { title: "A Day in the Life of Our Farm", slug: "a-day-in-the-life-of-our-farm", excerpt: "From sunrise milking to evening feed — here's what happens on our farm every day.", content: "Our day starts before sunrise. The cows are gently milked by hand and machine by 6 AM, and the milk is chilled within 30 minutes to preserve freshness. By 7 AM, our delivery team is already on the road. Throughout the day, our farmers tend to the fields, prepare organic feed, and check on the health of every animal.", tags: ["farm life", "behind the scenes"] },
  { title: "5 Signs Your Milk Isn't Really Farm Fresh", slug: "5-signs-milk-isnt-farm-fresh", excerpt: "Not all 'farm fresh' claims are equal. Here's what to actually look for.", content: "The term 'farm fresh' is used loosely in the dairy industry. Real farm-fresh milk should be delivered within hours of milking, never have a long shelf life without proper refrigeration, and come from a source you can actually trace back to a named farm and farmer.", tags: ["nutrition", "guide"] },
  { title: "The Case for Chemical-Free Farming", slug: "the-case-for-chemical-free-farming", excerpt: "Why we've committed to organic methods across every acre of our farm.", content: "Chemical-free farming isn't just a marketing term for us — it's a long-term commitment to soil health, animal welfare, and the wellbeing of the families we serve. We use natural composting, biological pest control, and rotational grazing instead of synthetic inputs.", tags: ["organic farming"] },
  { title: "How We Keep Our Cows Healthy and Happy", slug: "how-we-keep-cows-healthy-happy", excerpt: "Healthy cows are the foundation of everything we do.", content: "Our cows graze on open pasture, are fed a natural diet free of hormones and antibiotics, and receive regular veterinary check-ups. We believe happy, stress-free animals produce better, more nutritious milk.", tags: ["cow care", "animal welfare"] },
  { title: "Ghee-Making the Traditional Bilona Way", slug: "ghee-making-traditional-bilona-way", excerpt: "Why the slower, traditional method makes a difference in flavour and nutrition.", content: "The bilona method involves churning curd (not cream) to extract butter, which is then slow-cooked into ghee. It's more time-consuming than industrial methods, but the resulting ghee has a richer aroma and better nutrient retention.", tags: ["ghee", "traditional methods"] },
];

const recipes = [
  { title: "Classic Homemade Paneer Butter Masala", slug: "paneer-butter-masala", description: "A rich, restaurant-style curry made with our fresh farm paneer.", prepTimeMins: 15, cookTimeMins: 25, servings: 4, ingredients: ["250g Firoz Farms paneer", "2 tbsp butter", "2 onions", "3 tomatoes", "1 tbsp ginger-garlic paste", "100ml fresh cream", "Spices to taste"], steps: ["Sauté onions and ginger-garlic paste in butter.", "Add chopped tomatoes and cook until soft.", "Blend into a smooth gravy and simmer with spices.", "Add paneer cubes and cream, simmer for 5 minutes.", "Garnish and serve hot with naan or rice."], tags: ["dinner", "paneer"] },
  { title: "Homemade Mango Lassi", slug: "homemade-mango-lassi", description: "A refreshing summer drink using seasonal organic mangoes and fresh curd.", prepTimeMins: 10, cookTimeMins: 0, servings: 2, ingredients: ["2 Firoz Farms organic mangoes", "1 cup fresh curd", "1/2 cup chilled milk", "2 tbsp jaggery syrup"], steps: ["Peel and chop the mangoes.", "Blend mango, curd, milk, and jaggery syrup until smooth.", "Chill and serve garnished with a mint leaf."], tags: ["drinks", "summer"] },
  { title: "Ghee Roast Dosa", slug: "ghee-roast-dosa", description: "Crispy dosa finished with a generous swirl of our bilona ghee. Batter needs to ferment overnight.", prepTimeMins: 15, cookTimeMins: 20, servings: 4, ingredients: ["2 cups dosa batter (fermented overnight)", "3 tbsp Firoz Farms cow ghee", "Salt to taste"], steps: ["Heat a dosa pan and spread a ladle of batter thin.", "Drizzle ghee generously around the edges.", "Cook until golden and crisp, then fold and serve."], tags: ["breakfast"] },
  { title: "Millet Vegetable Khichdi", slug: "millet-vegetable-khichdi", description: "A wholesome one-pot meal using our organic foxtail millet.", prepTimeMins: 10, cookTimeMins: 25, servings: 3, ingredients: ["1 cup Firoz Farms foxtail millet", "1/2 cup moong dal", "Mixed vegetables", "1 tbsp ghee", "Spices to taste"], steps: ["Wash millet and dal together.", "Sauté vegetables and spices in ghee.", "Add millet, dal, and water; pressure cook until soft.", "Serve hot with a dollop of ghee."], tags: ["lunch", "millets", "healthy"] },
  { title: "Fresh Curd Rice", slug: "fresh-curd-rice", description: "A cooling, comforting classic made with our thick set curd.", prepTimeMins: 10, cookTimeMins: 15, servings: 3, ingredients: ["2 cups cooked rice", "1.5 cups Firoz Farms fresh curd", "1/2 cup milk", "Tempering: mustard seeds, curry leaves, green chilli"], steps: ["Mash cooked rice slightly while warm.", "Mix in curd and milk until creamy.", "Prepare tempering and mix through.", "Chill before serving."], tags: ["lunch", "comfort food"] },
  { title: "Jaggery Ginger Tea", slug: "jaggery-ginger-tea", description: "A warming everyday tea sweetened naturally with our farm jaggery.", prepTimeMins: 5, cookTimeMins: 10, servings: 2, ingredients: ["2 cups water", "1 cup Firoz Farms buffalo milk", "2 tbsp grated jaggery", "1 tsp crushed ginger", "Tea leaves"], steps: ["Boil water with ginger and tea leaves.", "Add milk and simmer for 3-4 minutes.", "Stir in jaggery until dissolved, strain, and serve hot."], tags: ["drinks", "winter"] },
];

async function main() {
  console.log("Seeding categories...");
  const categoryRecords: Record<string, string> = {};
  for (const [i, c] of categories.entries()) {
    const created = await db.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { ...c, sortOrder: i },
    });
    categoryRecords[c.slug] = created.id;
  }

  console.log("Seeding products...");
  for (const [i, p] of products.entries()) {
    const product = await db.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        categoryId: categoryRecords[p.category],
        shortDescription: p.shortDescription,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        unit: p.unit,
        sku: p.sku,
        stock: 100,
        isFeatured: p.isFeatured ?? false,
        isBestSeller: p.isBestSeller ?? false,
        nutritionFacts: p.nutritionFacts,
        storageInfo: p.storageInfo,
        shelfLife: p.shelfLife,
        benefits: p.benefits,
        sourceFarmNote: `Grown and produced at Firoz Farms, Mahaboobnagar Village, Khammam District — cared for by ${p.farmerName} and our farming team.`,
        farmerName: p.farmerName,
        avgRating: 4.5 + ((i % 5) * 0.1),
        reviewCount: 12 + i * 3,
      },
    });

    await db.productImage.deleteMany({ where: { productId: product.id } });
    await db.productImage.createMany({
      data: [
        { productId: product.id, url: `placeholder:${p.slug}-1`, alt: p.name, sortOrder: 0 },
        { productId: product.id, url: `placeholder:${p.slug}-2`, alt: `${p.name} alternate view`, sortOrder: 1 },
      ],
    });
  }

  console.log("Seeding testimonials...");
  await db.testimonial.deleteMany();
  await db.testimonial.createMany({
    data: testimonials.map((t) => ({ ...t, avatarUrl: `placeholder:avatar-${t.name}` })),
  });

  console.log("Seeding blog posts...");
  for (const post of blogPosts) {
    await db.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: { ...post, coverImageUrl: `placeholder:blog-${post.slug}` },
    });
  }

  console.log("Seeding recipes...");
  for (const recipe of recipes) {
    await db.recipe.upsert({
      where: { slug: recipe.slug },
      update: {},
      create: { ...recipe, coverImageUrl: `placeholder:recipe-${recipe.slug}` },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
