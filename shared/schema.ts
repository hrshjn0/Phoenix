import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User accounts (buyers and sellers)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(), // "buyer" or "seller"
  businessName: text("business_name"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// For registering a new user
export const registerUserSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["buyer", "seller"], { 
    required_error: "Please select a role",
    invalid_type_error: "Role must be either buyer or seller",
  }),
  businessName: z.string().optional(),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
});

// For logging in
export const loginUserSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  role: z.enum(["buyer", "seller"], { 
    invalid_type_error: "Role must be either buyer or seller",
  }).optional(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true, 
  createdAt: true
});

// Product listings
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  sellerId: integer("seller_id").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  industry: text("industry").notNull(),
  isActive: boolean("is_active").default(true),
  businessModel: text("business_model").notNull(), // B2B, B2C, or Both
  launchYear: text("launch_year").notNull(),
  description: text("description").notNull(),
  features: text("features").notNull(),
  logo: text("logo"), // URL or file path to uploaded logo
  
  // Additional optional information
  thirdPartyRating: text("third_party_rating"),
  numberOfClients: text("number_of_clients"),
  totalUsers: text("total_users"),
  activeUsers: text("active_users"),
  revenue: text("revenue"),
  averageDealSize: text("average_deal_size"),
  averageSalesCycle: text("average_sales_cycle"),
  investmentHistory: text("investment_history"),
  techStack: text("tech_stack"),
  ipDetails: text("ip_details"),
  parentCompanyBackground: text("parent_company_background"),
  additionalDetails: text("additional_details"),
  brochureUrl: text("brochure_url"),
  
  // For backward compatibility and additional fields
  headline: text("headline"),
  age: text("age"),
  growthOpportunities: text("growth_opportunities"),
  reasonForSelling: text("reason_for_selling"),
  registeredTrademarks: text("registered_trademarks"),
  patents: text("patents"),
  teamStructure: text("team_structure"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true
});

// Inquiries/messages between buyers and sellers
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  buyerId: integer("buyer_id").notNull(),
  sellerId: integer("seller_id").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true
});

// Messages within inquiries
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  inquiryId: integer("inquiry_id").notNull(),
  senderId: integer("sender_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
