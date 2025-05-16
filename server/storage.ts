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
