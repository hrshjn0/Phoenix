import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { login, register, authenticate, getCurrentUser } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth Routes
  app.post('/api/auth/register', register);
  
  // Custom login handler to enforce role validation
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password, role } = req.body;
      console.log('Login request received:', { email, hasPassword: !!password, role });
      
      // Find user
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        console.log('User not found');
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      
      console.log('User found:', { id: user.id, email: user.email, role: user.role });
      
      // Check password
      const isValidPassword = await import('./auth').then(auth => auth.comparePassword(password, user.password));
      if (!isValidPassword) {
        console.log('Invalid password');
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      
      // Strict role checking
      if (role && role !== user.role) {
        console.log('Role mismatch:', { requestedRole: role, actualRole: user.role });
        return res.status(403).json({
          message: 'You are not authorized to log in with this account type'
        });
      }
      
      // Generate token
      const token = await import('./auth').then(auth => auth.generateToken(user.id, user.email, user.role));
      
      // Return user info (without password)
      const { password: _, ...userWithoutPassword } = user;
      
      console.log('Login successful for user:', { id: user.id, role: user.role });
      
      res.json({
        message: 'Login successful',
        user: userWithoutPassword,
        token
      });
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  });
  
  app.get('/api/auth/me', authenticate, getCurrentUser);
  
  // API Routes
  app.get('/api/products', async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
      
      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  app.post('/api/products', authenticate, async (req, res) => {
    try {
      // Get the authenticated user ID from the token
      const userId = (req as any).user?.id;
      
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required to create product listings' });
      }
      
      console.log('Product submission body:', req.body);
      
      // Create a compatible product object with required fields
      const productData = {
        // Required fields
        sellerId: userId,
        headline: req.body.name || req.body.headline || 'New Product',
        name: req.body.name || req.body.headline || 'New Product',
        description: req.body.description || 'Product description',
        industry: req.body.industry || 'Technology',
        features: req.body.features || 'Product features',
        category: req.body.category || 'SaaS',
        businessModel: req.body.businessModel || 'B2B',
        launchYear: req.body.launchYear || '2023',
        isActive: req.body.isActive !== undefined ? req.body.isActive : true,
        
        // Optional fields
        logo: req.body.logo || null,
        thirdPartyRating: req.body.thirdPartyRating || null,
        numberOfClients: req.body.numberOfClients || null,
        totalUsers: req.body.totalUsers || null,
        activeUsers: req.body.activeUsers || null,
        revenue: req.body.revenue || null,
        averageDealSize: req.body.averageDealSize || null,
        averageSalesCycle: req.body.averageSalesCycle || null,
        investmentHistory: req.body.investmentHistory || null,
        techStack: req.body.techStack || null,
        ipDetails: req.body.ipDetails || null,
        parentCompanyBackground: req.body.parentCompanyBackground || null,
        additionalDetails: req.body.additionalDetails || null,
        brochureUrl: req.body.brochureUrl || null,
        
        // For backward compatibility
        age: req.body.age || req.body.launchYear || '1-2 years',
        growthOpportunities: req.body.growthOpportunities || null,
        reasonForSelling: req.body.reasonForSelling || null,
        teamStructure: req.body.teamStructure || null,
      };
      
      // Log the product creation request
      console.log(`Creating product for seller ID: ${productData.sellerId}`);
      
      // Create the product
      const product = await storage.createProduct(productData);
      
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      
      res.status(500).json({ 
        error: 'Failed to create product',
        details: error.message
      });
    }
  });

  app.get('/api/products/search', async (req, res) => {
    try {
      const query = req.query.q as string || '';
      const industry = req.query.industry as string;
      const age = req.query.age as string;
      
      const filters = {
        industry,
        age
      };
      
      const products = await storage.searchProducts(query, filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search products' });
    }
  });

  app.post('/api/contact', async (req, res) => {
    try {
      // Parse and validate the request body
      const contactData = insertContactSubmissionSchema.parse(req.body);
      
      // Create the contact submission
      const submission = await storage.createContactSubmission(contactData);
      
      res.status(201).json({ success: true, message: 'Contact submission received' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to submit contact form' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
