import 'dotenv/config'

// const { get } = require('lodash');

// import { PredictLeadsClient } from '@agentic/predict-leads'

// const predictLeads = new PredictLeadsClient()
// const res = await predictLeads.getCompanyEvents({ domain: 'apple.com' })

// console.log(res)

import virgino2 from './virgino2.js';
import wm from './wm.js';

import { generateText } from 'ai'; 
import { openai } from '@ai-sdk/openai';
import { anthropic, anthropic } from '@ai-sdk/anthropic';



/* Approach 1

- Different agents responsible for extracting data from sources.
- Those agents are not aware the larger context.
- One final AI that would then make sense of all these info and would give out opportunities

*/

const { text: report, usage: reportUsage } = await generateText({
 model: openai('gpt-4o'),
 temperature: 0.3,
 system: `You are a word class inside sales analyst. You will be provided with information about the target company which would include finance, job posts, news, etc. Your task is to come up with an intelligent report identifying sales opportunities within this company: 


- Do not hallucinate.
- Return the results in markdown format.

`,
 prompt: `Here is the information about the target company:

${wm.data}

-----------------------------------------------------------------------
`
});



console.log('Report usage: ', reportUsage, report, '\n ----- \n');



const anthropic = await generateText({
 model: anthropic('claude-sonnet'),

})