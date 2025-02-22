import 'dotenv/config'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import fs from 'fs'



async function salesAnalyst2(account, accountPath) {
 
 console.log('🚀 Running Sales Analyst 2')
 console.log(`-- 🛠 Analyzing ${account} \n`)

 // Get financial data
 const salesAnalysis1File = fs.readFileSync(
  `${accountPath}/sales_analysis_1.md`,
  'utf8'
 )
 const orgPerformanceAnalysisFile = fs.readFileSync(
  `${accountPath}/org_performance_analysis.md`,
  'utf-8'
 )
 


 const { text: analysis, usage } = await generateText({
  model: openai('gpt-4o'),
  temperature: 0.3,
  system: `You are a word class analyst. You will be provided with analysis of a public company and the organization chart in json.  
 

 # Instructions
   1. On the basis of the company-industry analysis and performance analysis come up with what who in the organization can be reached out to discuss about the highlighted problems.
   2. Do not hallucinate.
   3. Return the results in markdown format.
`,
  prompt: `${account}

  # Organization analysis:
  ${orgPerformanceAnalysisFile}

--------------------------------------

# Here are the industry trends and analysis:
${salesAnalysis1File}
 `,
 })

//  console.log('Report usage: ', usage, analysis, '\n ----- \n')
 fs.writeFileSync(`${accountPath}/sales_analysis_2.md`, analysis)

 return analysis


}

export default salesAnalyst2
