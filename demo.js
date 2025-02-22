import { generateText, tool } from 'ai'
import anapanAgent from './index.js'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import axios from 'axios'
import financialAnalyst from './src/agents/financialAnalyst.js'
import industryAnalyst from './src/agents/industryAnalyst.js'
import jobsAnalyst from './src/agents/jobsAnalyst.js'
import orgPerformanceAnalyst from './src/agents/orgPerformanceAnalyst.js'

const account = 'Virgin Media O2'
const accountPath = '/Users/chirag/Work/ai/research-agent/sources/virginMedia'

// anapanAgent(account, accountPath)
// financialAnalyst(account, accountPath)
// industryAnalyst(account, accountPath)

orgPerformanceAnalyst(account, accountPath)



/* Agentic  

Go over the internet -> figure out the trends and research -> fetch the files and come up with industry reports

*/

// const { text: result, toolCalls } = await generateText({
//  model: openai('gpt-4o'),
//  tools: {
//   search: tool({
//    description: `A tool to search the web about a topic.`,
//    parameters: z.object({ topic: z.string() }),
//    execute: async ({ topic }) => {
//     const response = await axios.get(
//      `https://google.com/search?q=${encodeURIComponent(topic)}`
//     )
//     const { data } = await response
//     console.log('data from axios tool', data)
//     return data
//    },
//   }),
//  },
//  system: `You are a a helpful research assistant. You will be given a company and your tasks include:
 
//  # Instructions
//   1. Figure out the industry of the company.
//   2. Search the web for:
//    * what is happening in the industry.
//    * Get current market size, historical growth rates, and future growth projections.
//    * Evaluate if the company’s products or services are aligned with current consumer trends and if they have the potential to capture evolving market segments.
//    * Number and size of competitors, market share distribution, and the competitive intensity.
//    * Emerging technologies, innovation trends, and investment in R&D within the industry.
//    * Identify external risks such as regulatory changes or market disruptions that could affect the company's future performance.
//    * Trends in consumer preferences, changing demographics, and shifts in demand patterns.
//    * Changes in supply chain dynamics, cost drivers (like raw material prices), and logistics trends.
//   3. Return the results in markdown format.
//  `,
//  prompt: `Here is the company: ${account}`,
// })

// console.log('Final usage: ', JSON.stringify(toolCalls, null, 2), '\n ----- \n')
// console.log('Final result: ', result, '\n ----- \n')
