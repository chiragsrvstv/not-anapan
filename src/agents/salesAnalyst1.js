import 'dotenv/config'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import fs from 'fs'



async function salesAnalyst1(account, accountPath) {
 
 console.log('🚀 Running Sales Agent 1')
 console.log(`-- 🛠 Analyzing ${account} \n`)

 // Get financial data
 const financialAnalysisFile = fs.readFileSync(
  `${accountPath}/financial_analysis.md`,
  'utf8'
 )
 const industryAnalysisFile = fs.readFileSync(
  `${accountPath}/industry_analysis.md`,
  'utf8'
 )
 


 const { text: analysis, usage } = await generateText({
  model: openai('gpt-4o'),
  temperature: 0.4,
  system: `You are a world class analyst. You will be provided with industry trends and financial analysis of a public compmany. 
 

 # Instructions
 - Your task is to make an analysis that includes the following: 
  * An evaluation of liquidity, solvency, profitability, and efficiency metrics compared to industry benchmarks.
  * Whether current industry growth aligns with the company's expansion and revenue trends.
  * Whether the company is positioned to take advantage of or is vulnerable to emerging trends.
  * How well the company manages costs and capital in comparison to industry norms.
  * Identification of potential risks from both the company's financials (e.g., high debt levels, cash flow issues, etc.) and industry challenges (e.g., regulatory changes, market saturation, etc.).
  * What are they misssing and should prioritise on.
 - Do not hallucinate.
 - Return the results in Markdown format.

 # Rules
 2. Only give what is asked.

`,
  prompt: `# Here are the financials of ${account}:

${financialAnalysisFile}


--------------------------------------

# Here are the industry trends and analysis:
${industryAnalysisFile}
 `,
 })

//  console.log('Report usage: ', usage, analysis, '\n ----- \n')
 fs.writeFileSync(`${accountPath}/sales_analysis_1.md`, analysis)

 return analysis

// await new Promise(resolve => setTimeout(resolve, 30000));

}

export default salesAnalyst1
