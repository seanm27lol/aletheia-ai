import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStorySchema } from "@shared/schema";
import { z } from "zod";
import { deepseekService } from "./deepseek";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for stories
  app.get("/api/stories", async (req, res) => {
    try {
      const stories = await storage.getStories();
      res.json(stories);
    } catch (error) {
      console.error("Error fetching stories:", error);
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  app.get("/api/stories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid story ID" });
      }
      
      const story = await storage.getStory(id);
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      
      res.json(story);
    } catch (error) {
      console.error("Error fetching story:", error);
      res.status(500).json({ message: "Failed to fetch story" });
    }
  });

  app.post("/api/stories", async (req, res) => {
    try {
      const validatedData = insertStorySchema.parse(req.body);
      const story = await storage.createStory(validatedData);
      res.status(201).json(story);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      console.error("Error creating story:", error);
      res.status(500).json({ message: "Failed to create story" });
    }
  });

  // DeepSeek AI Analysis Routes
  app.post("/api/analyze/perspectives", async (req, res) => {
    try {
      const { title, content } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ 
          message: "Title and content are required" 
        });
      }

      const analysis = await deepseekService.generatePerspectives(title, content);
      
      if (!analysis) {
        return res.status(503).json({ 
          message: "AI analysis service not available. Please configure DEEPSEEK_API_KEY." 
        });
      }

      res.json(analysis);
    } catch (error) {
      console.error("Error generating perspectives:", error);
      res.status(500).json({ message: "Failed to analyze perspectives" });
    }
  });

  app.post("/api/analyze/bias", async (req, res) => {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ 
          message: "Content is required" 
        });
      }

      const analysis = await deepseekService.detectBias(content);
      
      if (!analysis) {
        return res.status(503).json({ 
          message: "AI analysis service not available. Please configure DEEPSEEK_API_KEY." 
        });
      }

      res.json(analysis);
    } catch (error) {
      console.error("Error detecting bias:", error);
      res.status(500).json({ message: "Failed to analyze bias" });
    }
  });

  app.post("/api/analyze/factcheck", async (req, res) => {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ 
          message: "Content is required" 
        });
      }

      const analysis = await deepseekService.factCheck(content);
      
      if (!analysis) {
        return res.status(503).json({ 
          message: "AI analysis service not available. Please configure DEEPSEEK_API_KEY." 
        });
      }

      res.json(analysis);
    } catch (error) {
      console.error("Error fact-checking:", error);
      res.status(500).json({ message: "Failed to fact-check content" });
    }
  });

  // API routes for users
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
