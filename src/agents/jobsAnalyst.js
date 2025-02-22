import { generateText } from 'ai'; 
import { google } from '@ai-sdk/google';
import fs from 'fs'



async function jobsAnalyst(account, accountPath) {
 // Get jobs data
 console.log('🚀 Running Job Analyst Agent')
 console.log(`-- 🛠 Fetching jobs for ${account} \n`)
 const jobs = fs.readFileSync(`${accountPath}/jobs_data.json`, 'utf8');

 const { text: analysis, usage } = await generateText({
 model: google('gemini-2.0-flash-001'),
//  system: `You are a word class data analyst. You will be provided job posts of a company in json format. 
 

//  # Instructions
//  - Your task is to make a report that includes the following: 
//   * Areas in which the company is hiring.
//   * Analysis of what it might mean.
//   * Try to infer priorities and focus areas of the company.
// - Do not hallucinate.
// - Return the results in Markdown format.

// `,
//  prompt: `Here are the job posts of ${account}:

// ${jobs}
// `
system: `

You're an experienced Sales Analyst with decades of experience. 
You have just joined ${account} to help them with analysis of their target customers.

You will be given a JSON file with all the job postings at ${account}.

Perform a thorough and in-depth analysis of these job postings to come up with
sales insights for your team.

Your analysis will be very important because it will help your team understand
areas of weakness and areas of future priorities for a client.
 

Detailed instructions for you are mentioned below  
 - Your task is to conduct deep research and create a report on the following 
  * The job roles for which a company is hiring
  * The departments in which this company is hiring 
  * The locations or geographies in which the company is hiring
  * The level of experience required in the different job roles.
		Openings for senior roles can indicate upcoming strategic moves.
	  Openings for junior roles can indicate current operational challenges.

  * The number of open positions in the job roles, department or location. 
	  Higher number of open positions indicates strong need or a major future
	  initiative
	
	* The exact platform or product with which comfort or experience is required.
		This indicates the existing tech stack of the company
		
	* Trends in the overall hiring listings of this company
	
	* Your predictions on current pain areas and future focus areas based on 
		openings at this company. 
	
- Make sure to double check every detail and make heavily number and fact backed claims.

- Your report will be used by senior sales leaders to create in depth sales strategies,
	so make sure everything is in-depth, number backed, and accurate
	
- Return the results in Markdown format.


`,
 prompt: `Here are the job posts of ${account}:

${jobs}
`

});

console.log('jobs usage: ', usage, analysis, '\n ----- \n');
fs.writeFileSync(`${accountPath}/jobs_analysis.md`, analysis);

// return analysis


await new Promise(resolve => setTimeout(resolve, 30000));

}

export default jobsAnalyst