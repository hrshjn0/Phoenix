import { 
  User, InsertUser, 
  Product, InsertProduct, 
  Inquiry, InsertInquiry, 
  Message, InsertMessage, 
  ContactSubmission, InsertContactSubmission 
} from "@shared/schema";

// Storage interface definition
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product operations
  getProduct(id: number): Promise<Product | undefined>;
  getProductsBySellerId(sellerId: number): Promise<Product[]>;
  searchProducts(query: string, filters?: any): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  
  // Inquiry operations
  getInquiry(id: number): Promise<Inquiry | undefined>;
  getInquiriesByBuyerId(buyerId: number): Promise<Inquiry[]>;
  getInquiriesBySellerId(sellerId: number): Promise<Inquiry[]>;
  getInquiriesByProductId(productId: number): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  // Message operations
  getMessagesByInquiryId(inquiryId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Contact form operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private inquiries: Map<number, Inquiry>;
  private messages: Map<number, Message>;
  private contactSubmissions: Map<number, ContactSubmission>;
  
  private userIdCounter: number;
  private productIdCounter: number;
  private inquiryIdCounter: number;
  private messageIdCounter: number;
  private contactSubmissionIdCounter: number;
  
  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.inquiries = new Map();
    this.messages = new Map();
    this.contactSubmissions = new Map();
    
    this.userIdCounter = 1;
    this.productIdCounter = 1;
    this.inquiryIdCounter = 1;
    this.messageIdCounter = 1;
    this.contactSubmissionIdCounter = 1;
    
    // Initialize with some sample data
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    // Create sample seller
    const seller: InsertUser = {
      email: "seller@example.com",
      role: "seller",
      businessName: "Tech Innovations Inc."
    };
    const createdSeller = this.createUser(seller);
    
    // Create another seller for diversity
    const secondSeller: InsertUser = {
      email: "health_tech@example.com",
      role: "seller",
      businessName: "Health Tech Solutions"
    };
    const healthSeller = this.createUser(secondSeller);
    
    // Create a fintech seller
    const fintechSeller: InsertUser = {
      email: "fintech@example.com",
      role: "seller",
      businessName: "FinTech Innovations"
    };
    const financeSeller = this.createUser(fintechSeller);
    
    // Create sample products
    const products: InsertProduct[] = [
      {
        sellerId: createdSeller.id,
        headline: "Customer Feedback Platform",
        description: "An established SaaS platform that helps businesses collect and analyze customer feedback across multiple channels including email, website, social media, and in-app experiences.",
        industry: "SaaS",
        age: "3 years",
        features: "Multi-channel feedback collection, AI-powered sentiment analysis, Customizable survey tools, Real-time reporting dashboards, Integration with major CRM platforms",
        totalUsers: "3,200+",
        activeUsers: "2,500+",
        arr: "$180,000",
        techStack: "React, Node.js, MongoDB, AWS, TensorFlow",
        teamStructure: "3 developers, 1 designer, 2 customer support specialists",
        growthOpportunities: "Expand into enterprise market, Add mobile app integration, Develop white-label solution",
        reasonForSelling: "Focusing on other ventures",
        thirdPartyRating: "4.0",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US, EU)",
        patents: "1 pending",
        averageDealPrice: "$4,800/year",
        isActive: true
      },
      {
        sellerId: createdSeller.id,
        headline: "Team Collaboration Tool",
        description: "A SaaS platform for remote teams to collaborate, manage projects, and track progress in real-time.",
        industry: "SaaS",
        age: "2 years",
        features: "Task management, File sharing, Video conferencing, Progress tracking, Team chat",
        totalUsers: "5,000+",
        activeUsers: "3,700+",
        arr: "$240,000",
        techStack: "Vue.js, Django, PostgreSQL, GCP",
        teamStructure: "4 developers, 1 designer, 2 marketing specialists",
        growthOpportunities: "Expand integrations, Add AI-powered features, Improve analytics",
        reasonForSelling: "Changing business focus",
        thirdPartyRating: "3.5",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US)",
        patents: "None",
        averageDealPrice: "$3,600/year",
        isActive: true
      },
      {
        sellerId: createdSeller.id,
        headline: "Email Marketing Automation",
        description: "A comprehensive email marketing platform with advanced automation and analytics capabilities.",
        industry: "SaaS",
        age: "4 years",
        features: "Email automation, A/B testing, Analytics dashboard, List management, Template builder",
        totalUsers: "2,000+",
        activeUsers: "1,200+",
        arr: "$450,000",
        techStack: "React, Express, MySQL, AWS",
        teamStructure: "6 developers, 2 designers, 3 marketing specialists",
        growthOpportunities: "Add SMS marketing, Improve AI suggestions, International expansion",
        reasonForSelling: "Consolidating product portfolio",
        thirdPartyRating: "5.0",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US, EU, APAC)",
        patents: "2 approved",
        averageDealPrice: "$6,000/year",
        isActive: true
      },
      // Additional products in various industries
      {
        sellerId: healthSeller.id,
        headline: "Remote Patient Monitoring Platform",
        description: "HIPAA-compliant telehealth solution that enables healthcare providers to monitor patients remotely through wearable devices and secure communication channels.",
        industry: "Healthcare",
        age: "5 years",
        features: "Real-time vital monitoring, Secure video consultations, Electronic health records integration, Prescription management, Appointment scheduling",
        totalUsers: "120+ healthcare providers",
        activeUsers: "80+ active institutions",
        arr: "$1.2 million",
        techStack: "React Native, Python, PostgreSQL, AWS, FHIR API",
        teamStructure: "8 developers, 3 healthcare specialists, 2 compliance officers",
        growthOpportunities: "International expansion, AI diagnostic assistance, Insurance integration",
        reasonForSelling: "Seeking strategic acquisition for market expansion",
        thirdPartyRating: "4.8",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US, Canada)",
        patents: "3 approved, 2 pending",
        averageDealPrice: "$85,000/year per institution",
        isActive: true
      },
      {
        sellerId: financeSeller.id,
        headline: "Investment Portfolio Analyzer",
        description: "Sophisticated financial analytics platform that helps investment professionals optimize portfolios and make data-driven investment decisions.",
        industry: "FinTech",
        age: "6 years",
        features: "Risk assessment models, Market trend analysis, Portfolio optimization, Tax impact simulation, Regulatory compliance checks",
        totalUsers: "850+ financial advisors",
        activeUsers: "620+ active users",
        arr: "$1.8 million",
        techStack: "Python, Django, React, PostgreSQL, AWS",
        teamStructure: "10 developers, 4 financial analysts, 2 compliance specialists",
        growthOpportunities: "Cryptocurrency integration, Retail investor version, International market expansion",
        reasonForSelling: "Founder retirement",
        thirdPartyRating: "4.6",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US, EU, UK)",
        patents: "2 approved",
        averageDealPrice: "$25,000/year per license",
        isActive: true
      },
      {
        sellerId: createdSeller.id,
        headline: "AI-Powered Content Generator",
        description: "Advanced natural language processing platform that creates SEO-optimized content for blogs, websites, and social media with minimal human input.",
        industry: "Marketing Technology",
        age: "2 years",
        features: "Multi-language support, SEO optimization, Brand voice customization, Content calendar, Analytics integration",
        totalUsers: "8,500+",
        activeUsers: "5,200+",
        arr: "$750,000",
        techStack: "Python, TensorFlow, React, MongoDB, GCP",
        teamStructure: "5 ML engineers, 3 full-stack developers, 2 content strategists",
        growthOpportunities: "Enterprise solution development, Visual content generation, E-commerce integration",
        reasonForSelling: "Pursuing new AI venture",
        thirdPartyRating: "4.3",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US)",
        patents: "1 pending",
        averageDealPrice: "$7,200/year",
        isActive: true
      },
      {
        sellerId: createdSeller.id,
        headline: "Supply Chain Management System",
        description: "End-to-end supply chain visibility platform that helps manufacturers and distributors optimize inventory, reduce costs, and improve fulfillment efficiency.",
        industry: "Logistics",
        age: "7 years",
        features: "Real-time tracking, Predictive inventory management, Supplier management, Route optimization, Warehouse management",
        totalUsers: "150+ companies",
        activeUsers: "120+ companies",
        arr: "$3.2 million",
        techStack: "Java, Spring Boot, Angular, Oracle, Azure",
        teamStructure: "12 developers, 5 logistics specialists, 3 customer support reps",
        growthOpportunities: "Blockchain integration for verification, Sustainability tracking, Small business version",
        reasonForSelling: "Strategic realignment",
        thirdPartyRating: "4.5",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (global)",
        patents: "4 approved",
        averageDealPrice: "$85,000/year",
        isActive: true
      },
      {
        sellerId: healthSeller.id,
        headline: "Mental Health Therapy Platform",
        description: "Digital therapy platform connecting patients with licensed mental health professionals through secure video calls, messaging, and interactive exercises.",
        industry: "Healthcare",
        age: "4 years",
        features: "Secure video sessions, Mood tracking, Journal prompts, Progress visualization, Provider matching",
        totalUsers: "25,000+ patients",
        activeUsers: "12,000+ monthly active users",
        arr: "$2.1 million",
        techStack: "React, Node.js, MongoDB, AWS",
        teamStructure: "7 developers, 3 mental health professionals, 4 customer support reps",
        growthOpportunities: "Corporate wellness programs, Insurance partnerships, International expansion",
        reasonForSelling: "Partner buyout opportunity",
        thirdPartyRating: "4.7",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US, UK)",
        patents: "None",
        averageDealPrice: "$240/year per patient",
        isActive: true
      },
      {
        sellerId: financeSeller.id,
        headline: "Cryptocurrency Tax Reporting Tool",
        description: "Automated crypto tax preparation platform that integrates with major exchanges and wallets to generate accurate tax reports and regulatory documents.",
        industry: "FinTech",
        age: "3 years",
        features: "Multi-exchange integration, Transaction reconciliation, Tax loss harvesting, Form generation, Audit trail",
        totalUsers: "45,000+",
        activeUsers: "22,000+ during tax season",
        arr: "$1.2 million",
        techStack: "TypeScript, React, Node.js, PostgreSQL, AWS",
        teamStructure: "6 developers, 2 tax professionals, 3 crypto specialists",
        growthOpportunities: "DeFi integration, International tax systems, Institutional version",
        reasonForSelling: "Capital raising for new venture",
        thirdPartyRating: "4.4",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US)",
        patents: "None",
        averageDealPrice: "$199/year",
        isActive: true
      },
      {
        sellerId: createdSeller.id,
        headline: "E-Learning Platform for Programming",
        description: "Interactive coding education platform with personalized learning paths, real-world projects, and mentorship from industry professionals.",
        industry: "EdTech",
        age: "5 years",
        features: "Interactive code editor, Video tutorials, Project assessment, 1-on-1 mentorship, Career resources",
        totalUsers: "75,000+ students",
        activeUsers: "32,000+ monthly active users",
        arr: "$3.8 million",
        techStack: "React, Django, PostgreSQL, Docker, AWS",
        teamStructure: "11 developers, 8 curriculum developers, 6 support specialists",
        growthOpportunities: "Corporate training programs, University partnerships, New technology tracks",
        reasonForSelling: "Founders pursuing educational non-profit",
        thirdPartyRating: "4.8",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US, EU)",
        patents: "1 approved",
        averageDealPrice: "$480/year per student",
        isActive: true
      },
      {
        sellerId: createdSeller.id,
        headline: "Smart Home Energy Management System",
        description: "IoT-based energy monitoring and optimization system that helps homeowners reduce energy consumption and costs through smart device integration.",
        industry: "CleanTech",
        age: "4 years",
        features: "Real-time monitoring, AI consumption optimization, Device integration, Solar panel compatibility, Mobile app control",
        totalUsers: "18,000+ households",
        activeUsers: "15,000+ households",
        arr: "$2.4 million",
        techStack: "Python, React Native, TensorFlow, MongoDB, Google Cloud",
        teamStructure: "8 developers, 3 IoT specialists, 4 energy analysts",
        growthOpportunities: "Commercial building systems, Utility company partnerships, International markets",
        reasonForSelling: "Pivoting to commercial energy solutions",
        thirdPartyRating: "4.5",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US, Canada)",
        patents: "3 approved, 1 pending",
        averageDealPrice: "$149/year plus hardware",
        isActive: true
      },
      {
        sellerId: financeSeller.id,
        headline: "Small Business Accounting Platform",
        description: "Cloud-based accounting solution designed specifically for small businesses and freelancers with automated bookkeeping, invoicing, and tax preparation.",
        industry: "FinTech",
        age: "6 years",
        features: "Expense tracking, Invoice generation, Tax calculation, Financial reporting, Bank reconciliation",
        totalUsers: "42,000+ businesses",
        activeUsers: "35,000+ businesses",
        arr: "$4.2 million",
        techStack: "Vue.js, Laravel, MySQL, AWS",
        teamStructure: "9 developers, 4 accountants, 6 customer support specialists",
        growthOpportunities: "Industry-specific versions, Payment processing, International tax compliance",
        reasonForSelling: "Merger opportunity with larger financial platform",
        thirdPartyRating: "4.6",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US, UK, Australia)",
        patents: "None",
        averageDealPrice: "$360/year per business",
        isActive: true
      },
      {
        sellerId: healthSeller.id,
        headline: "Fitness Tracking and Coaching App",
        description: "AI-powered fitness platform that provides personalized workout plans, nutrition guidance, and progress tracking with virtual coaching support.",
        industry: "Health & Fitness",
        age: "3 years",
        features: "Workout customization, Nutrition tracking, Progress visualization, Community challenges, Virtual personal training",
        totalUsers: "180,000+",
        activeUsers: "95,000+ monthly active users",
        arr: "$2.8 million",
        techStack: "React Native, Node.js, MongoDB, AWS, TensorFlow",
        teamStructure: "7 developers, 5 fitness professionals, 3 nutritionists",
        growthOpportunities: "Corporate wellness programs, Equipment integration, Premium content subscriptions",
        reasonForSelling: "Founder pursuing professional sports opportunity",
        thirdPartyRating: "4.4",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US)",
        patents: "1 pending",
        averageDealPrice: "$9.99/month per user",
        isActive: true
      },
      {
        sellerId: createdSeller.id,
        headline: "Virtual Event Platform",
        description: "Comprehensive virtual event solution for conferences, trade shows, and networking events with interactive features and engagement analytics.",
        industry: "Event Technology",
        age: "2 years",
        features: "Custom virtual venues, Live streaming, Networking tools, Exhibitor booths, Attendee analytics",
        totalUsers: "350+ organizations",
        activeUsers: "120+ monthly events",
        arr: "$1.9 million",
        techStack: "React, Node.js, WebRTC, PostgreSQL, AWS",
        teamStructure: "9 developers, 4 event specialists, 3 support staff",
        growthOpportunities: "Hybrid event tools, AI matchmaking, VR experiences",
        reasonForSelling: "Pursuing new VR technology venture",
        thirdPartyRating: "4.3",
        ipOwnership: "Full ownership",
        registeredTrademarks: "Yes (US, EU)",
        patents: "None",
        averageDealPrice: "$5,000 per event or $25,000/year subscription",
        isActive: true
      }
    ];
    
    products.forEach(product => this.createProduct(product));
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductsBySellerId(sellerId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.sellerId === sellerId);
  }
  
  async searchProducts(query: string, filters?: any): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      products = products.filter(product => 
        product.headline.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.industry.toLowerCase().includes(lowerQuery) ||
        product.features.toLowerCase().includes(lowerQuery)
      );
    }
    
    if (filters) {
      if (filters.industry && filters.industry !== 'All Industries') {
        products = products.filter(product => product.industry === filters.industry);
      }
      
      if (filters.age && filters.age !== 'Any Age') {
        products = products.filter(product => product.age === filters.age);
      }
      
      // Add more filters as needed
    }
    
    return products;
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const now = new Date();
    const product: Product = { ...insertProduct, id, createdAt: now };
    this.products.set(id, product);
    return product;
  }
  
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  // Inquiry operations
  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }
  
  async getInquiriesByBuyerId(buyerId: number): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).filter(inquiry => inquiry.buyerId === buyerId);
  }
  
  async getInquiriesBySellerId(sellerId: number): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).filter(inquiry => inquiry.sellerId === sellerId);
  }
  
  async getInquiriesByProductId(productId: number): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).filter(inquiry => inquiry.productId === productId);
  }
  
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryIdCounter++;
    const now = new Date();
    const inquiry: Inquiry = { ...insertInquiry, id, createdAt: now };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
  
  // Message operations
  async getMessagesByInquiryId(inquiryId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.inquiryId === inquiryId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const now = new Date();
    const message: Message = { ...insertMessage, id, createdAt: now };
    this.messages.set(id, message);
    return message;
  }
  
  // Contact form operations
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactSubmissionIdCounter++;
    const now = new Date();
    const submission: ContactSubmission = { ...insertSubmission, id, createdAt: now };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
