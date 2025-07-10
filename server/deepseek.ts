import OpenAI from 'openai';

// DeepSeek AI service for content analysis and perspective generation
class DeepSeekService {
  private client: OpenAI | null = null;

  constructor() {
    if (process.env.DEEPSEEK_API_KEY) {
      this.client = new OpenAI({
        baseURL: 'https://api.deepseek.com/v1',
        apiKey: process.env.DEEPSEEK_API_KEY,
      });
    }
  }

  private isConfigured(): boolean {
    return this.client !== null;
  }

  /**
   * Analyze news content and generate balanced perspectives
   */
  async generatePerspectives(title: string, content: string): Promise<{
    left: string;
    center: string;
    right: string;
    summary: string;
    biasScore: number;
  } | null> {
    if (!this.isConfigured()) {
      console.warn('DeepSeek API key not configured');
      return null;
    }

    try {
      const prompt = `Analyze this news story and provide three balanced political perspectives:

Title: ${title}
Content: ${content}

Please provide:
1. A progressive/left-leaning perspective (2-3 sentences)
2. A moderate/centrist perspective (2-3 sentences)
3. A conservative/right-leaning perspective (2-3 sentences)
4. An objective summary (2-3 sentences)
5. A bias score from -10 (very left-leaning) to +10 (very right-leaning), with 0 being neutral

Format your response as JSON:
{
  "left": "progressive perspective...",
  "center": "moderate perspective...",
  "right": "conservative perspective...",
  "summary": "objective summary...",
  "biasScore": 0
}`;

      const response = await this.client!.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an expert political analyst who provides balanced, objective analysis of news content from multiple perspectives. Always maintain neutrality and present viewpoints fairly.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      });

      const content_text = response.choices[0]?.message?.content;
      if (!content_text) {
        throw new Error('No response from DeepSeek');
      }

      return JSON.parse(content_text);
    } catch (error) {
      console.error('Error generating perspectives with DeepSeek:', error);
      return null;
    }
  }

  /**
   * Detect bias in news content
   */
  async detectBias(content: string): Promise<{
    score: number;
    explanation: string;
    confidence: number;
  } | null> {
    if (!this.isConfigured()) {
      return null;
    }

    try {
      const prompt = `Analyze the following news content for political bias:

${content}

Provide a bias analysis with:
1. Bias score from -10 (very left-leaning) to +10 (very right-leaning)
2. Explanation of detected bias indicators
3. Confidence level (0-1)

Format as JSON:
{
  "score": 0,
  "explanation": "analysis...",
  "confidence": 0.8
}`;

      const response = await this.client!.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in media bias detection. Analyze content objectively and identify specific bias indicators.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 500
      });

      const content_text = response.choices[0]?.message?.content;
      if (!content_text) {
        throw new Error('No response from DeepSeek');
      }

      return JSON.parse(content_text);
    } catch (error) {
      console.error('Error detecting bias with DeepSeek:', error);
      return null;
    }
  }

  /**
   * Generate fact-check summary for news content
   */
  async factCheck(content: string): Promise<{
    verifiable: boolean;
    claims: Array<{
      claim: string;
      verifiable: boolean;
      sources_needed: string[];
    }>;
    overall_credibility: number;
  } | null> {
    if (!this.isConfigured()) {
      return null;
    }

    try {
      const prompt = `Fact-check this news content and identify verifiable claims:

${content}

Analyze and provide:
1. Whether the content contains verifiable claims
2. List of specific claims that can be fact-checked
3. Overall credibility assessment (0-1)

Format as JSON:
{
  "verifiable": true,
  "claims": [
    {
      "claim": "specific claim...",
      "verifiable": true,
      "sources_needed": ["type of source needed"]
    }
  ],
  "overall_credibility": 0.8
}`;

      const response = await this.client!.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a fact-checking expert. Identify verifiable claims and assess credibility objectively.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 800
      });

      const content_text = response.choices[0]?.message?.content;
      if (!content_text) {
        throw new Error('No response from DeepSeek');
      }

      return JSON.parse(content_text);
    } catch (error) {
      console.error('Error fact-checking with DeepSeek:', error);
      return null;
    }
  }
}

export const deepseekService = new DeepSeekService();