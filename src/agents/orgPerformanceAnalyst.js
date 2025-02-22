import 'dotenv/config'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import fs from 'fs'
import { google } from '@ai-sdk/google'
import { anthropic } from '@ai-sdk/anthropic'



async function orgPerformanceAnalyst(account, accountPath) {
 
 console.log('🚀 Running Org Analyst')
 console.log(`-- 🛠 Analyzing org chart and financials of ${account} \n`)

 // Get financial data
 const financialAnalysisFile = fs.readFileSync(
  `${accountPath}/financial_analysis.md`,
  'utf8'
 )
 const orgStructure = fs.readFileSync(`${accountPath}/orgStructure.json`, 'utf8');

 


 const { text: analysis, usage } = await generateText({
  model: google('gemini-2.0-flash-001'),
  temperature: 0.3,
  system: `You are a world class performance analyst.
  You have just joined ${account} to help them with analysis of their target customers.
  You will be provided with financial analysis and org chart(json) of a company. 
  Prepare a report as following.  
 

  # Instructions
   1. Match financial metrics (like profitability and revenue growth) with the corresponding department head from the org chart.
   4. Confirm clear lines of accountability and decision-making authority for each department from the financial analysis data.
   2. Analyze who is performing well and who is not.
   3. Consider how a department’s performance might affect or be affected by its interaction with other departments.
   5. Measure output (e.g., revenue or profit) against the department size.
   6. Monitor performance trends over time to determine consistency and growth.
   7. Do not hallucinate.
   8. Return the results in markdown format.

  # Rules
  1. Return the report only.
  2. Just give performance analysis, nothing else.
  `,
  prompt: `${account}

  # Financials:
  ${financialAnalysisFile}

-----------------------------------------

# Organization chart:
${orgStructure}
 `,
 })

 console.log('Report usage: ', usage, analysis, '\n ----- \n')
 fs.writeFileSync(`${accountPath}/org_performance_analysis.md`, analysis)

 return analysis

}

export default orgPerformanceAnalyst
