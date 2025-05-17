import { 
  User, InsertUser, 
  Product, InsertProduct, 
  Inquiry, InsertInquiry, 
  Message, InsertMessage, 
  ContactSubmission, InsertContactSubmission,
  users,
  products,
  inquiries,
  messages,
  contactSubmissions
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const [createdUser] = await db.insert(users).values(user).returning();
    return createdUser;
  }
  
  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async getProductsBySellerId(sellerId: number): Promise<Product[]> {
    return db.select().from(products).where(eq(products.sellerId, sellerId));
  }
  
  async searchProducts(query: string, filters?: any): Promise<Product[]> {
    // This is a simplified implementation that will need to be expanded with proper search logic
    // For now, we'll just return all products
    return this.getAllProducts();
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const [createdProduct] = await db.insert(products).values(product).returning();
    return createdProduct;
  }
  
  async getAllProducts(): Promise<Product[]> {
    return db.select().from(products);
  }
  
  // Inquiry operations
  async getInquiry(id: number): Promise<Inquiry | undefined> {
    const [inquiry] = await db.select().from(inquiries).where(eq(inquiries.id, id));
    return inquiry;
  }
  
  async getInquiriesByBuyerId(buyerId: number): Promise<Inquiry[]> {
    return db.select().from(inquiries).where(eq(inquiries.buyerId, buyerId));
  }
  
  async getInquiriesBySellerId(sellerId: number): Promise<Inquiry[]> {
    return db.select().from(inquiries).where(eq(inquiries.sellerId, sellerId));
  }
  
  async getInquiriesByProductId(productId: number): Promise<Inquiry[]> {
    return db.select().from(inquiries).where(eq(inquiries.productId, productId));
  }
  
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [createdInquiry] = await db.insert(inquiries).values(inquiry).returning();
    return createdInquiry;
  }
  
  // Message operations
  async getMessagesByInquiryId(inquiryId: number): Promise<Message[]> {
    return db.select().from(messages).where(eq(messages.inquiryId, inquiryId));
  }
  
  async createMessage(message: InsertMessage): Promise<Message> {
    const [createdMessage] = await db.insert(messages).values(message).returning();
    return createdMessage;
  }
  
  // Contact form operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [createdSubmission] = await db.insert(contactSubmissions).values(submission).returning();
    return createdSubmission;
  }
}