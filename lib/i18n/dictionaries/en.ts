/**
 * English content dictionary. Plain, JSON-compatible data (no JSX) so it
 * can be swapped for a CMS payload or another locale file later without
 * touching component code.
 */
const en = {
  brand: {
    name: "A SHAN SISTER",
    legalNameZh: "广东阿珊姐食品有限公司",
    legalNameEnNote: "Registered company name shown in Chinese",
  },
  nav: {
    home: "Home",
    products: "Products",
    manufacturing: "Manufacturing",
    about: "About",
    news: "News",
    contact: "Contact",
    requestQuote: "Request a Quote",
  },
  contactInfo: {
    phone: "+86 186 8969 2126",
    phoneHref: "tel:+8618689692126",
    whatsapp: "+86 180 8887 6662",
    whatsappHref: "https://wa.me/8618088876662",
    emailPrimary: "lynn666889@gmail.com",
    emailSecondary: "1205806239@qq.com",
    addressLine1: "Lihu Town, Puning, Jieyang",
    addressLine2: "Guangdong Province, China",
  },
  footer: {
    tagline: "Source manufacturer of Chaoshan-style preserved fruit since 2016.",
    columns: {
      company: "Company",
      catalog: "Catalog",
      contact: "Contact",
    },
    rightsReserved: "All rights reserved.",
  },
  home: {
    hero: {
      slides: [
        {
          image: "/images/banner-product.jpg",
          alt: "Jars of A SHAN SISTER preserved tangerine peel on a warm cream backdrop",
          eyebrow: "Puning, Guangdong, China · Est. 2016",
          heading: "Preserved fruit, made by the source manufacturer",
          body: "A SHAN SISTER produces preserved tangerine peel, bergamot, lemon and other Chaoshan-style preserved fruit for bulk wholesale and OEM/ODM packaging.",
          ctaPrimary: { label: "Browse the catalog", href: "/products" },
          ctaSecondary: { label: "Request a quote", href: "/contact" },
        },
        {
          image: "/images/banner-drying.jpg",
          alt: "Preserved fruit drying room at the A SHAN SISTER facility",
          eyebrow: "Nine workshops · Four semi-automatic lines",
          heading: "A documented, source-manufacturer process",
          body: "Raw-material sourcing, product development, production and sales are integrated in one operation, with a typical order lead time within 10 days.",
          ctaPrimary: { label: "See our manufacturing", href: "/manufacturing" },
          ctaSecondary: { label: "Request a quote", href: "/contact" },
        },
        {
          image: "/images/banner-showroom.jpg",
          alt: "A SHAN SISTER product showroom with preserved fruit on display",
          eyebrow: "Bulk wholesale · OEM/ODM packaging",
          heading: "Built for wholesale buyers and private-label partners",
          body: "Review the full catalog in our showroom-ready range, then send us your target product and packaging requirements to start an inquiry.",
          ctaPrimary: { label: "Start an inquiry", href: "/contact" },
          ctaSecondary: { label: "About the company", href: "/about" },
        },
      ],
    },
    intro: {
      eyebrow: "About A Shan Sister",
      heading: "A source manufacturer built around one region's preserved-fruit craft",
      body: [
        "A SHAN SISTER was founded in 2016 in Lihu Town, Puning — a part of Guangdong Province long associated with preserved-fruit production.",
        "The company operates as a source manufacturer: raw-material sourcing, product development, production and sales are integrated in one operation, supplying both bulk wholesale buyers and OEM/ODM private-label partners.",
      ],
      image: "/images/facility-office.jpg",
      imageAlt: "A SHAN SISTER office space",
      cta: { label: "Read more about us", href: "/about" },
    },
    featured: {
      eyebrow: "Catalog",
      heading: "A sample of our preserved-fruit range",
      body: "The full catalog spans eight product groups. These are a few examples — every item ships under bulk wholesale or OEM/ODM packaging terms.",
      cta: { label: "View all products", href: "/products" },
    },
    manufacturing: {
      eyebrow: "Manufacturing",
      heading: "Documented capacity, from raw material to finished pack",
      body: "These figures describe our current facility in Lihu Town, Puning. We share them as-is, without extrapolation.",
      image: "/images/facility-drying-portrait.jpg",
      imageAlt: "Preserved fruit drying racks inside an A SHAN SISTER workshop",
      cta: { label: "View manufacturing details", href: "/manufacturing" },
    },
    oem: {
      eyebrow: "OEM / ODM",
      heading: "How a wholesale or private-label inquiry moves forward",
      body: "The process below reflects how we work with wholesale and private-label buyers today.",
      steps: [
        {
          title: "Share your requirement",
          body: "Tell us the target product, purchase volume and packaging format through our inquiry form.",
        },
        {
          title: "Confirm specification",
          body: "We confirm product specification, packaging and any private-label artwork details with you.",
        },
        {
          title: "Production",
          body: "Your order is produced at our Puning facility, typically within a 10-day lead time.",
        },
        {
          title: "Documentation & shipment",
          body: "We prepare the agreed documentation and arrange shipment of your order.",
        },
      ],
    },
    quality: {
      eyebrow: "Documentation",
      heading: "Production documentation, shared plainly",
      body: "Our facility holds an SC food production license. Relevant production and compliance documentation can be discussed and confirmed for each order.",
      cta: { label: "Ask about documentation", href: "/contact" },
    },
    showroom: {
      eyebrow: "Facility",
      heading: "See where the catalog is produced and displayed",
      image: "/images/facility-showroom-portrait.jpg",
      imageAlt: "A SHAN SISTER product showroom displaying preserved fruit packaging",
      body: "Our showroom and production facility are both located at our Lihu Town, Puning site.",
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Common questions from wholesale buyers",
      items: [
        {
          question: "Do you support OEM/ODM private-label packaging?",
          answer:
            "Yes. Alongside bulk wholesale supply, we support OEM/ODM packaging — share your target product and packaging requirement through our inquiry form and we will follow up.",
        },
        {
          question: "What is the typical order lead time?",
          answer: "Our typical order lead time is within 10 days, depending on the product and order volume.",
        },
        {
          question: "Is there a minimum order quantity?",
          answer:
            "Minimum order quantities depend on the specific product and packaging format. Please share your requirement through our inquiry form and we will respond with details.",
        },
        {
          question: "Can I request product samples?",
          answer: "Please include your sample request in the inquiry form and we will follow up with next steps.",
        },
      ],
    },
    news: {
      eyebrow: "News",
      heading: "Company news",
      emptyTitle: "No news articles yet",
      emptyBody: "We haven't published any news articles yet. Check back later, or contact us directly with questions.",
      cta: { label: "Visit the news page", href: "/news" },
    },
    finalCta: {
      heading: "Ready to start a wholesale or OEM/ODM inquiry?",
      body: "Send us your target product, purchase requirement and packaging details, and we will follow up.",
      cta: { label: "Request a quote", href: "/contact" },
    },
  },
  productsPage: {
    heading: "Product catalog",
    intro:
      "A SHAN SISTER's full catalog spans eight preserved-fruit product groups. This list is data-driven and grows as new SKUs are added — there is no fixed maximum.",
    allCategoriesLabel: "All products",
    emptyState: "No products are listed in this category yet.",
    inquireLabel: "Inquire about this product",
  },
  productDetail: {
    backLabel: "Back to all products",
    descriptionHeading: "Description",
    packagingHeading: "Packaging",
    categoryLabel: "Category",
    inquireCta: "Request a quote for this product",
    otherInCategory: "More from this category",
  },
  manufacturingPage: {
    heading: "Manufacturing & capacity",
    intro:
      "A SHAN SISTER operates as a source manufacturer at a single facility in Lihu Town, Puning, Guangdong. The figures below describe this facility as documented — we do not extend or estimate beyond them.",
    heroImage: "/images/facility-exterior.jpg",
    heroImageAlt: "Exterior of the A SHAN SISTER production facility in Lihu Town, Puning",
    statsHeading: "Facility at a glance",
    processHeading: "Production process",
    processBody:
      "Raw-material sourcing, product development, production and sales are integrated in one operation at this facility. Preserved fruit is produced across nine workshops using four semi-automatic production lines, with a documented monthly capacity of approximately 167 metric tons and a typical order lead time within 10 days.",
    galleryHeading: "Facility photographs",
    galleryImages: [
      { src: "/images/facility-drying-portrait.jpg", alt: "Preserved fruit drying racks inside a workshop" },
      { src: "/images/facility-showroom-portrait.jpg", alt: "Product showroom displaying preserved fruit packaging" },
      { src: "/images/facility-office.jpg", alt: "A SHAN SISTER office space" },
    ],
    licenseHeading: "Production license",
    licenseBody:
      "The facility holds an SC food production license. Relevant production and compliance documentation can be provided on request to support your import process.",
    oemHeading: "OEM / ODM & bulk wholesale",
    oemBody:
      "This facility supports bulk wholesale supply as well as OEM/ODM private-label packaging. Share your target product, purchase requirement and packaging format through our inquiry form to begin.",
    cta: { label: "Start an inquiry", href: "/contact" },
  },
  aboutPage: {
    heading: "About A Shan Sister",
    intro:
      "A SHAN SISTER is a source manufacturer of Chaoshan-style preserved fruit based in Lihu Town, Puning, Jieyang, Guangdong, China. The registered company name is 广东阿珊姐食品有限公司.",
    heroImage: "/images/facility-exterior.jpg",
    heroImageAlt: "Exterior of the A SHAN SISTER facility in Lihu Town, Puning",
    historyHeading: "Founded in a region known for preserved fruit",
    historyBody: [
      "The company was founded in 2016 in Lihu Town, Puning — a part of Guangdong Province long associated with preserved-fruit production.",
      "A SHAN SISTER's documented catalog includes preserved tangerine peel, preserved bergamot, preserved lemon, preserved mango, sour plum strips, preserved Indian gooseberry, fruit chewy bites and tangerine-peel ginger candy.",
    ],
    modelHeading: "A source manufacturer",
    modelBody:
      "Raw-material sourcing, product development, production and sales are integrated in one operation. This model supports both bulk wholesale supply and OEM/ODM private-label packaging for wholesale buyers.",
    modelImage: "/images/facility-office.jpg",
    modelImageAlt: "A SHAN SISTER office space",
    contactHeading: "Get in touch",
    contactBody: "Reach us directly, or send an inquiry with your target product and requirement.",
    cta: { label: "Contact us", href: "/contact" },
  },
  newsPage: {
    heading: "News",
    intro: "Company updates and announcements from A SHAN SISTER.",
    emptyTitle: "No news articles yet",
    emptyBody:
      "We haven't published any news articles yet. This page is ready to display real updates as soon as they're available — check back later, or contact us directly with questions.",
    backLabel: "Back to news",
    cta: { label: "Contact us", href: "/contact" },
  },
  contactPage: {
    heading: "Request a quote",
    intro:
      "Tell us about your target product, purchase requirement and packaging needs, and we will follow up directly.",
    directHeading: "Contact us directly",
    directBody: "Prefer to reach out directly? Use any of the details below.",
    addressHeading: "Address",
  },
} as const

export default en
export type Dictionary = typeof en
