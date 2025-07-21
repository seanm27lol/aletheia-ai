import { users, stories, type User, type InsertUser, type Story, type InsertStory } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getStories(): Promise<Story[]>;
  getStory(id: number): Promise<Story | undefined>;
  createStory(story: InsertStory): Promise<Story>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getStories(): Promise<Story[]> {
    return await db.select().from(stories).orderBy(stories.createdAt);
  }

  async getStory(id: number): Promise<Story | undefined> {
    const [story] = await db.select().from(stories).where(eq(stories.id, id));
    return story || undefined;
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const [story] = await db
      .insert(stories)
      .values(insertStory)
      .returning();
    return story;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  currentUserId: number;
  currentStoryId: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.currentUserId = 1;
    this.currentStoryId = 4; // Start from 4 since we're adding 3 sample stories

    // Add sample stories
    this.stories.set(1, {
      id: 1,
      title: 'Climate Change Policies Spark Global Debate',
      summary: 'World leaders gather to discuss new environmental regulations and their economic impact on developing nations. The proposed policies aim to reduce carbon emissions by 50% over the next decade while providing financial support for green technology transitions.',
      duration: '2:34',
      views: '156K',
      topic: 'Environment',
      perspectiveLeft: 'Progressive environmental policies are essential for preventing climate catastrophe. The transition to renewable energy will create millions of jobs and reduce long-term healthcare costs from pollution. We must act decisively now to protect future generations from environmental disaster.',
      perspectiveCenter: 'A balanced approach is needed between environmental protection and economic stability. Gradual implementation with support for affected workers and communities is most practical. International cooperation and technological innovation should guide policy decisions.',
      perspectiveRight: 'Economic impact on jobs and energy costs must be carefully considered. Market-based solutions and technological innovation should lead, not government mandates. Rapid policy changes could harm working families and American competitiveness.',
      sources: ['Reuters', 'AP News', 'BBC'],
      verified: true,
      thumbnail: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=600&fit=crop',
      createdAt: new Date()
    });

    this.stories.set(2, {
      id: 2,
      title: 'Social Media Regulation Debate Intensifies',
      summary: 'Congressional hearings examine new proposals for regulating social media platforms amid concerns about misinformation and privacy. Lawmakers consider content moderation requirements and data protection standards.',
      duration: '3:12',
      views: '89K',
      topic: 'Technology',
      perspectiveLeft: 'Social media companies have too much power and need strict regulation to protect democracy and user privacy. Public utilities model should be considered for platforms that control public discourse. Corporate self-regulation has failed.',
      perspectiveCenter: 'Targeted regulations focusing on transparency and user safety while preserving innovation are needed. Bipartisan approach with industry input can balance free speech concerns with platform accountability.',
      perspectiveRight: 'Free market solutions work better than government regulation. Innovation and competition will solve problems without stifling technological progress. First Amendment protections must be preserved.',
      sources: ['Wall Street Journal', 'New York Times', 'Washington Post'],
      verified: true,
      thumbnail: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=600&fit=crop',
      createdAt: new Date()
    });

    this.stories.set(3, {
      id: 3,
      title: 'Healthcare Reform Proposals Under Review',
      summary: 'New bipartisan healthcare legislation aims to reduce prescription drug costs while maintaining quality of care. The proposal includes price transparency measures and expanded access to generic medications.',
      duration: '2:45',
      views: '234K',
      topic: 'Healthcare',
      perspectiveLeft: 'Universal healthcare is a human right. Single-payer system would eliminate insurance company profits and provide comprehensive care for all Americans. Medicare for All would reduce administrative costs and improve health outcomes.',
      perspectiveCenter: 'Incremental improvements to the current system while expanding access offer a practical path forward. Public option alongside private insurance provides choice and competition while maintaining stability.',
      perspectiveRight: 'Market-based reforms and price transparency will reduce costs better than government takeover. Preserve doctor-patient relationship and medical innovation. Competition among providers drives quality improvements.',
      sources: ['CNN', 'Fox News', 'NPR'],
      verified: true,
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=600&fit=crop',
      createdAt: new Date()
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getStories(): Promise<Story[]> {
    return Array.from(this.stories.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getStory(id: number): Promise<Story | undefined> {
    return this.stories.get(id);
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.currentStoryId++;
    const story: Story = { 
      ...insertStory,
      views: insertStory.views || "0",
      verified: insertStory.verified ?? true,
      id, 
      createdAt: new Date() 
    };
    this.stories.set(id, story);
    return story;
  }
}

// Temporarily use in-memory storage due to database connection issues
export const storage = new MemStorage();
