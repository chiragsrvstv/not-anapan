import 'dotenv/config'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import fs from 'fs'
import { google } from '@ai-sdk/google'



async function salesAnalyst3(account, accountPath) {
 
 console.log('🚀 Running Sales Analyst 3')
 console.log(`-- 🛠 Analyzing ${account} \n`)

 // Get financial data
 const salesAnalysis1File = fs.readFileSync(
  `${accountPath}/sales_analysis_1.md`,
  'utf8'
 )
 const jobsAnalysisFile = fs.readFileSync(`${accountPath}/jobs_analysis.md`, 'utf8');

 


 const { text: analysis, usage } = await generateText({
  model: google('gemini-2.0-flash-001'),
  temperature: 0.3,
  system: `You are a word class analyst. You will be provided with analysis of a public company and the jobs posts of a company in json format. Prepare a report as following.  
 

  # Instructions
   1. On the basis of the company-industry and jobs analysis, list the departments where there is strong hiring demand.
   2. After that figure out respective stakeholders in those departments.
   3. Do not hallucinate.
   4. Return the results in markdown format.

  # Rules
  1. Only return the report.
  2. Do not summarize.
  
  `,
  prompt: `${account}

  # Company analysis:
  ${salesAnalysis1File}

--------------------------------------

# Jobs:
${jobsAnalysisFile}
 `,
 })

//  console.log('Report usage: ', usage, analysis, '\n ----- \n')
 fs.writeFileSync(`${accountPath}/sales_analysis_3.md`, analysis)

 return analysis

// await new Promise(resolve => setTimeout(resolve, 30000));

}

export default salesAnalyst3
