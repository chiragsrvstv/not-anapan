import 'dotenv/config'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'
import { groq } from '@ai-sdk/groq';

import fs from 'fs'
import financialAnalyst from './src/agents/financialAnalyst.js'
import jobsAnalyst from './src/agents/jobsAnalyst.js'
import industryAnalyst from './src/agents/industryAnalyst.js'
import appendToNotion from './src/notion.js'
import salesAnalyst1 from './src/agents/salesAnalyst1.js'
import salesAnalyst3 from './src/agents/salesAnalyst3.js'
import salesAnalyst2 from './src/agents/salesAnalyst2.js'
import orgPerformanceAnalyst from './src/agents/orgPerformanceAnalyst.js'


/* Approach 1

- Different agents responsible for extracting data from sources.
- Those agents are not aware the larger context.
- One final AI that would then make sense of all these info and would give out opportunities

*/

async function anapanAgent(name) {
 const account = 'Virgin Media O2'
 const accountPath = '/Users/chirag/Work/ai/research-agent/sources/virginMedia'

 console.log('🚀 Running Org Analyst Agent \n')
 const accountOfferings = fs.readFileSync(
  `${accountPath}/offerings.md`,
  'utf-8'
 )

 console.log(`---🛠️ Fetching org structure of: ${account}`)
 console.log(`---🛠️ Fetching services and solutions of: ${account} \n`)

 const accountOrgStructure = fs.readFileSync(
  `${accountPath}/orgStructure.json`,
  'utf-8'
 )

 const client = 'Happiest Minds'
 const clientPath =
  '/Users/chirag/Work/ai/research-agent/sources/clients/happiestMinds'

 console.log(`🛠 Fetching services and offerings of client: ${client} \n`, )
 const clientOfferings = fs.readFileSync(`${clientPath}/offerings.md`, 'utf-8')

 await financialAnalyst(account, accountPath)
 await industryAnalyst(account, accountPath)
 await jobsAnalyst(account, accountPath)
 await orgPerformanceAnalyst(account, accountPath)
 await salesAnalyst1(account, accountPath)
 await salesAnalyst2(account, accountPath)
 await salesAnalyst3(account, accountPath)


 const financialAnalysisFile = fs.readFileSync(
  `${accountPath}/financial_analysis.md`,
  'utf-8'
 )
 const hiringAnalysisFile = fs.readFileSync(
  `${accountPath}/jobs_analysis.md`,
  'utf-8'
 )
 const industryAnalysisFile = fs.readFileSync(
  `${accountPath}/industry_analysis.md`,
  'utf-8'
 )
 const salesAnalysisFile1 = fs.readFileSync(
  `${accountPath}/sales_analysis_1.md`,
  'utf-8'
 )
 const salesAnalysisFile2 = fs.readFileSync(
  `${accountPath}/sales_analysis_2.md`,
  'utf-8'
 )
 const salesAnalysisFile3 = fs.readFileSync(
  `${accountPath}/sales_analysis_3.md`,
  'utf-8'
 )

 console.log('🚀 Running Super Agent. Collating signals....\n')

//  Super Agent
 const { text: intelligence, usage: finalUsage } = await generateText({
  model: groq('deepseek-r1-distill-llama-70b'),
  temperature: 0.4,
  system: `You are a word class senior sales analyst working for ${client}. 
  You will be provided with different reports by junior sales analysts about a prospect company. 
  Your task is to:
  
 
  # Instructions
  - Make a report on the sales opportunities for ${client} based on the provided analysis reports.
  - Start with concise account summary including the markets they operate in, their offerings and business verticals, and major highlights such as recent mergers, acquisitions, or leadership changes.
  - Provide with actionable insights that are in-depth, number-backed, and to the point.
  - Spot relevant signals, opportunities and possible solutions in the prospect company for your sales director in ${client}.
  - Only provide realistic opportunities, do not blindly fit services. Your sales director is unforgiving of mistakes.
  - A good opportunity lies in an area where the prospect is struggling, something which is of priority to them, and areas where they are massively hiring.
  - Provide insights that are easy for sales leaders to understand and act upon, avoiding jargon.
  - Think step by step and give reasons to back the opportunities.
  - Trace the specific point for the reason from the report.
  - Figure out the exact stakeholder with the name in the organization who can be contacted for the opportunity.
  - Do not hallucinate.
  - Do not add any information on your own, only use whatever you've been provided in the reports and other data.
  - Return the results in Markdown format.
  
  # Services offered by ${client}:

  ${clientOfferings}

 `,
  prompt: `Here is all the latest relevant information about the prospect company, ${account}:


  # Services and Products
  ${accountOfferings}


  # Analysis 1 - Industry benchmarks
  ${salesAnalysisFile1}


  # Analysis 2 - Stakeholders Analysis
  ${salesAnalysisFile2}


  # Analysis 3 - Stakeholders with hiring demands
  ${salesAnalysisFile3}
  
  
`,
 })

 console.log('Final usage: ', finalUsage, '\n ----- \n')
 fs.writeFileSync(`${accountPath}/intelligenceReport-deepseek.md`, intelligence)

 
 // Send to Notion
await appendToNotion(intelligence)
console.log('✅ Success. Intelligence report generated and pushed to Notion')


}

export default anapanAgent