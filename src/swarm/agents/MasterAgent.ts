import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';
import { 
  SwarmTask, 
  SwarmAgent
} from '../types';

export class MasterAgent implements SwarmAgent {
  id: string = 'master';
  type: 'master' = 'master';
  name: string = 'Master Agent';
  description: string = 'Orchestrates task decomposition and coordination';
  capabilities: string[] = ['task_decomposition', 'coordination', 'workflow_management'];
  isActive: boolean = true;
  lastActive: Date = new Date();
  performanceMetrics = {
    totalTasks: 0,
    successfulTasks: 0,
    averageConfidence: 0,
    averageProcessingTime: 0,
    errorRate: 0,
  };

  private llm: OpenAI;
  private chain: LLMChain;

  constructor(apiKey: string) {
    this.llm = new OpenAI({
      openAIApiKey: apiKey,
      temperature: 0.7,
      modelName: 'gpt-4'
    });

    const prompt = PromptTemplate.fromTemplate(
      `You are a master AI agent coordinating a swarm of specialized agents.
      
      Task: {task}
      Context: {context}
      
      Analyze the task and provide strategic guidance for the swarm agents.
      Focus on market adaptation, scalability, and innovation opportunities.
      
      Response:`
    );

    this.chain = new LLMChain({
      llm: this.llm,
      prompt: prompt
    });
  }

  async process(task: SwarmTask): Promise<string> {
    try {
      const result = await this.chain.invoke({
        task: task.input?.description || 'No task description',
        context: task.input?.context || 'No additional context provided'
      });

      return result.text;
    } catch (error) {
      console.error('MasterAgent processing error:', error);
      return 'Error processing task with master agent';
    }
  }
} 