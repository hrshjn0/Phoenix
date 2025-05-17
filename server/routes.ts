import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { login, register, authenticate, getCurrentUser } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth Routes
  app.post('/api/auth/register', register);
  app.post('/api/auth/login', login);
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

  app.post('/api/products', async (req, res) => {
    try {
      // Parse and validate the request body
      const productData = insertProductSchema.parse(req.body);
      
      // Create the product
      const product = await storage.createProduct(productData);
      
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to create product' });
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
