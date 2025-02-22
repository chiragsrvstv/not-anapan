import { generateText } from 'ai'; 
import { perplexity } from '@ai-sdk/perplexity';

import fs from 'fs'

async function industryAnalyst(account, accountPath) {
 // Get jobs data
console.log('🚀 Running Industry Analyst')
console.log(`-- 🛠 Searching web: industry trends related to ${account}\n`)

 const { text: analysis, usage } = await generateText({
 model: perplexity('sonar-pro'),
 temperature: 1.0,
 system: `You are a helpful research assistant. You will be given a company and your tasks include:

 # Instructions
 1. Figure out the industry of the company.
 2. Get Current market size, historical growth rates, and future growth projections.
 3. Evaluate if the company’s products or services are aligned with current consumer trends and if they have the potential to capture evolving market segments.
 4. Number and size of competitors, market share distribution, and the competitive intensity.
 5. Emerging technologies, innovation trends, and investment in R&D within the industry.
 6. Identify external risks such as regulatory changes or market disruptions that could affect the company's future performance.
 7. Trends in consumer preferences, changing demographics, and shifts in demand patterns.
 8. Changes in supply chain dynamics, cost drivers (like raw material prices), and logistics trends.


 # Rules
 1. Only provide what is asked, do not clarify or question.
 `,

 prompt: `Here is the company: ${account}` 
});

console.log('industry analyst usage: ', usage, analysis, '\n ----- \n');
fs.writeFileSync(`${accountPath}/industry_analysis.md`, analysis);

return analysis

}



export default industryAnalyst