import { generateText } from 'ai'; 
import { google } from '@ai-sdk/google';
import fs from 'fs'
import { openai } from '@ai-sdk/openai';



async function jobsAnalyst(account, accountPath, client) {
 // Get jobs data
 console.log('🚀 Running Job Analyst Agent')
 console.log(`-- 🛠 Fetching jobs for ${account} \n`)
 const jobs = fs.readFileSync(`${accountPath}/jobs/jobs_data.json`, 'utf8');
 const jobsStats = fs.readFileSync(`${accountPath}/jobs/jobs_stats.json`, 'utf8');

 const { text: analysis, usage } = await generateText({
 model: google('gemini-1.5-flash'),
	temperature: 0.4,

system: `

# Role & Context
- You are a highly experienced Sales Analyst.
-----------------------------------------------------


# Instructions
- Your goal is to produce a **comprehensive, data-driven report that will help understanding in what areas the company might be needing workforce.
- Make sure to include the below sections in your report:
	* 1. Experience Levels (High Priority) - Tabular format
	* 2. Tech Stack / Platforms (High Priority)
	* 3. Estimate(range) of Open Positions along with the roles (High Priority)
	* 4. Job Roles & Departments
		a. Summary of all the job roles and departments with a range of open positions (tabular).
		b. Elaborate on hiring for the executive, directors, vp, etc. roles. Highlight their tech stack, industry, job function, etc. and try to infer what does it mean from your perspective.(Tabular)
		E.g. Role | Function | Tech Stack | Industry | Insight 
	* 5. Locations / Geographies
	* 6. Hiring Trends
	* 7. Predictions & Insights (Based on tech stack and opened roles)
-----------------------------------------------------

# Rules
1. You will be given jobs stats. Use that to understand numbers.
2. YOu will be given full job details. Use that to understand the type of jobs in detail.
3. Do not make up information, only use whatever is provided.

`,


 prompt: ` Here is the jobs stats of ${account}:
	
	${jobsStats}
	
	Here are the job posts of ${account}:

${jobs}
`

});

console.log('jobs usage: ', usage, analysis, '\n ----- \n');
fs.writeFileSync(`${accountPath}/jobs_analysis.md`, analysis);

// return analysis


await new Promise(resolve => setTimeout(resolve, 30000));

}

export default jobsAnalyst