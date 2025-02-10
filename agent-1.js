import 'dotenv/config'
import { generateText } from 'ai'; 
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import fs from 'fs'


/* Approach 1

- Different agents responsible for extracting data from sources.
- Those agents are not aware the larger context.
- One final AI that would then make sense of all these info and would give out opportunities

*/


const account = 'Virgin Media O2'
const accountPath = '/Users/chirag/Work/ai/research-agent/sources/virginMedia'

const accountOfferings = fs.readFileSync(`${accountPath}/offerings.md`, 'utf-8')

// const accountFinancials10q1 = fs.readFileSync(`${accountPath}/10-q-p1i1.txt`, 'utf8');
// const accountFinancials10q1 = fs.readFileSync(`${accountPath}/10-q-p1i1.txt`, 'utf8');
const accountFinancials10q1 = fs.readFileSync(`${accountPath}/pdf-text/1.txt`, 'utf8');
const accountFinancials10q2 = fs.readFileSync(`${accountPath}/pdf-text/2.txt`, 'utf8');

const accountHiring = fs.readFileSync(`${accountPath}/jobs_data.json`, 'utf8');

const accountOrgStructure = fs.readFileSync(`${accountPath}/orgStructure.json`, 'utf-8')

const client = 'Happiest Minds'
const clientPath = '/Users/chirag/Work/ai/research-agent/sources/clients/happiestMinds'
const clientOfferings = fs.readFileSync(`${clientPath}/offerings.md`, 'utf-8')


// Agent-1
// const { text: financialAnalysis, usage: financialAnalysisUsage } = await generateText({
//  model: openai('o1-preview'),
// //  temperature: 0.3,
//  system: `You are a word class finance analyst. You will be provided with finance data like 10q or 10k of a public compmany. 
 

//  # Instructions
//  - Your task is to make a report that includes the following: 
//   * Spends and expenditure of the company along with all its subsidaries if any.
//   * Mergers and acquisitions.
//   * Focus areas of the company.
//   * Priorities of the company.
//   * Key changes.
//   * Strategies.
// - Do not hallucinate.
// - Return the results in Markdown format.

// `,
//  prompt: `Here is the financials of ${account}:

// ${accountFinancials10q1}



// ${accountFinancials10q2}
//  `
// });

// console.log('Report usage: ', financialAnalysisUsage, financialAnalysis, '\n ----- \n');
// fs.writeFileSync(`${accountPath}/financial_analysis.md`, financialAnalysis);



// // Agent-2
// const { text: hiringAnalysis, usage: hiringAnalysisUsage } = await generateText({
//  model: google('gemini-2.0-flash-001'),
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

// ${accountHiring}
// `
// });

// console.log('Hiring usage: ', hiringAnalysisUsage, hiringAnalysis, '\n ----- \n');
// fs.writeFileSync(`${accountPath}/hiring_analysis.md`, hiringAnalysis);


// Agent-3

const financialAnalysisFile = fs.readFileSync(`${accountPath}/hiring_analysis.md`, 'utf-8')
const hiringAnalysisFile = fs.readFileSync(`${accountPath}/hiring_analysis.md`, 'utf-8')

const { text: final, usage: finalUsage } = await generateText({
  model: google('gemini-2.0-flash-001'),
  // model: anthropic('claude-3-5-sonnet-latest'),
  temperature: 0.6,
  system: `You are a word class sales analyst working for ${client}. 
  You will be provided with important anlyses of a prospect company. 
  Your task is to infer and spot sales opportunity in that prospect company.
  
 
  # Instructions
  - Make a report on the sales opportunities for ${client} based on the provided information.
  - Start with concise account summary including the markets they operate in, their offerings and business verticals, and major highlights such as recent mergers, acquisitions, or leadership changes.
  - Provide with actionable insights that are in-depth, number-backed, and to the point.
  - Spot relevant signals, opportunities and possible solutions in the prospect company for your sales director in ${client}.
  - Only provide realistic opportunities, do not blindly fit services. Your sales director is unforgiving of mistakes.
  - Try to add a expected conversion percentage to every opportunity. If percentage is low, give tips on increasing it.
  - Provide insights that are easy for sales leaders to understand and act upon, avoiding jargon.
  - Think step by step and give reason and data to back the opportunities or insights.
  - Figure out the best stakeholder in the organization that can be pitched with the opportunity.
  - Give pointers to start conversation or pitch.
  - Do not hallucinate.
  - Return the results in Markdown format.
  
  # Services offered by ${client}:

  ${clientOfferings}

 `,
  prompt: `Here is all the latest relevant information about the prospect company, ${account}:


  # Services and Products
  ${accountOfferings}



  # Organization Structure
  ${accountOrgStructure}

  
  
  # Financial Analysis
  ${financialAnalysisFile}
  
  

  # Hiring Analysis
  ${hiringAnalysisFile}
`,
 
});
 

console.log('Final usage: ', finalUsage, final, '\n ----- \n');
fs.writeFileSync(`${accountPath}/final.md`, final);
