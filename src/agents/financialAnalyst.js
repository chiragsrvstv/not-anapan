import 'dotenv/config'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import fs from 'fs'



async function financialAnalyst(account, accountPath, client) {
 
 console.log('🚀 Running Financial Analyst')
 console.log(`-- 🛠 Fetching financials (10q, 10k) for ${account} \n`)

 // Get financial data
 const accountFinancials10q1 = fs.readFileSync(
  `${accountPath}/pdf-text/1.txt`,
  'utf8'
 )
 const accountFinancials10q2 = fs.readFileSync(
  `${accountPath}/pdf-text/2.txt`,
  'utf8'
 )


 const { text: analysis, usage } = await generateText({
  model: openai('gpt-4o'),
  temperature: 0.3,
  system: `You're an experienced Finance Analyst with decades of experience. 
You have just joined ${client} to help them with analysis of their target customers.

You will be given customers' quarterly earning reports, annual financial reports, and other
documents like earning calls transcripts, analyst fact sheet.

Perform a thorough and in-depth analysis of these documents to come up with facts
and insights that will help the sales team carry out targeted sales outreach.

Detailed instructions for you are mentioned below  
 - Your task is to conduct deep research and create a report on the following 
  * Earnings of the company along with all its subsidiaries if any
  * Different business units or verticals that are contributing to the earnings of the company
  * Trends in earnings of different business units across time periods
  * Trends in earnings from different geographies across time periods
  * Trends in earnings of the company in the different time periods
  
  * Expenses of the company along with all its subsidiaries if any
  * Different business units or verticals that are contributing to the expenses of the company
  * Trends in expenses of different business units across time periods
  * Trends in expenses from different geographies across time periods
  * Trends in expenses of the company in the different time periods
  
  * Focus areas of the company based on trends in revenue and expenses
  * Focus areas of the company based on mentions of future plans of the company
  
	* Trends in focus areas of the company over different time periods
	* Trends in priorities of the company over different time periods
	
	* Expected future focus areas based on developing trends
	* Expected future hurdles based on developing trends
	
- Make sure to double check every detail and make heavily number and fact backed claims.

- Your report will be used by senior sales leaders to create in depth sales strategies,
	so make sure everything is in-depth, number backed, and accurate.

- Do not hallucinate.
	
- Return the results in Markdown format.
`,
  prompt: `Here are the financials of ${account}:

${accountFinancials10q1}


${accountFinancials10q2}
 `,
 })

 console.log('Report usage: ', usage, analysis, '\n ----- \n')
 fs.writeFileSync(`${accountPath}/financial_analysis.md`, analysis)

 return analysis

// await new Promise(resolve => setTimeout(resolve, 30000));

}

export default financialAnalyst

