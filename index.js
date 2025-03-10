import 'dotenv/config'
import { generateText, tool } from 'ai'
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'
import { groq } from '@ai-sdk/groq';

import fs from 'fs'
import financialAnalyst from './src/agents/financialAnalyst.js'
import jobsAnalyst from './src/agents/jobsAnalyst.js'
import industryAnalyst from './src/agents/industryAnalyst.js'
import appendToNotion from './src/utils/notion.js'
import salesAnalyst1 from './src/agents/salesAnalyst1.js'
import salesAnalyst2 from './src/agents/salesAnalyst2.js'
import orgPerformanceAnalyst from './src/agents/orgPerformanceAnalyst.js'
import { togetherai } from '@ai-sdk/togetherai'
import { z } from 'zod'
import getPastProjects from './src/utils/getCaseStudies.js'


async function anapanAgent({account, accountPath, client, clientPath}) {

 console.log(`🛠 Fetching services and offerings of client: ${client} \n`, )
 const clientOfferings = fs.readFileSync(`${clientPath}/offerings.md`, 'utf-8')

 await financialAnalyst(account, accountPath, client)
 await industryAnalyst(account, accountPath, client)
 await jobsAnalyst(account, accountPath, client)
 await salesAnalyst1(account, accountPath, client)
 await orgPerformanceAnalyst(account, accountPath, client)
 await salesAnalyst2(account, accountPath, client)



 const salesAnalysisFile1 = fs.readFileSync(
  `${accountPath}/sales_analysis_1.md`,
  'utf-8'
 )
 const salesAnalysisFile2 = fs.readFileSync(
  `${accountPath}/sales_analysis_2.md`,
  'utf-8'
 )

 const orgPerformanceAnalysisFile = fs.readFileSync(
  `${accountPath}/org_performance_analysis.md`,
  'utf-8'
 )

 console.log('🚀 Running Super Agent. Collating signals....\n')

//  Super Agent
 const { text: intelligence, usage: finalUsage, toolResults } = await generateText({
  model: openai('o3-mini-2025-01-31'),
//   model: togetherai('deepseek-ai/DeepSeek-R1'),
  temperature: 0.7,

system: `

**Role & Context**

You are an **experienced Sales Researcher** with decades of expertise. You have just joined **${client}** 
to transform their **sales research** for a **target account**. Your primary assignment is to **consolidate** and 
**finalize** all the intelligence gathered by the subordinate agents, creating a single, **executive-level** 
report for **senior sales leadership** at ${client}. 


Keep every opportunity detailed, informative and visual. 


---

### 1. Data Sources

Leverage the following **subordinate reports** and data streams:

1. **Financial Performance**: Earnings, growth metrics, cost structures, budgets.
2. **Industry Trends**: Market shifts, competitive landscape, regulatory or technological drivers.
3. **Org Chart & Stakeholder Mapping**: Key decision makers, influencers, champions, and departmental performance details.
4. **Job Postings**: Areas of active hiring (seniority levels, required tech skills, number of positions).
5. **Vendor Contracts**: Existing external supplier agreements, **renewal or expiry timelines**, and potential for competitor displacement.

---

### 2. Short Brief (2–3 Paragraphs)

- **Account Snapshot**: Size, market share, primary industry, and any recent notable changes (e.g., mergers, leadership shifts).
- **Major Strengths or Growth Segments**: Highlight high-performing areas or innovations.
- **Key Challenges or Risks**: Underscored by financial or industry data (e.g., declining margins, regulatory hurdles).

*(If needed, you may include a quick “Key Stats” bullet list following this short brief.)*

---

### 3. In-Depth Sales Opportunities

Develop a **fact-based breakdown** of each major sales opportunity ${client} should consider:

1. **Trend in the Account**
    - Identify a significant change or marker (e.g., increased investment in a certain tech stack, an upcoming vendor contract expiry, new leadership role hires).
    - Specify if it’s an **immediate (0–6 months)** or **short-to-mid term (1–3 years)** trend.
2. **Problems**
    - Outline the operational or strategic issues this trend might create (e.g., skill gaps, budget constraints, risk exposure).
    - If relevant, mention whether this problem is linked to a **vendor contract** about to expire or a segment with known performance issues.
3. **Opportunities**
    - Show how ${client} can address these problems—what solutions, expertise, or services could be most relevant?
    - If vendor contracts are in play, specify whether there’s potential to **displace a competitor** or capture a new line of business.
4. **Evidence / Insights**
    - **Cite Specific Data** from the subordinate reports (e.g., “Jobs Analyst: 10 open DevOps roles,” “Financial Analyst: 20% YoY increase in Cloud spending,” “Vendor Contract for CRM expires next quarter,” etc.).
    - If any data is **incomplete** or **in conflict** (e.g., Org Chart vs. Job Postings), note it rather than guessing.
5. **Competitor Benchmarking**
    - Back with information about similar projects undertaken by competition with proper reasoning (if any)

7. **Stakeholders & Departments**
    - List who controls the budget or influences decisions (using titles from the org chart).
    - If roles are ambiguous, provide multiple possibilities (e.g., “Either the VP of Operations or the CIO is the final decision maker—titles are unclear.”)
    - Label assumptions clearly if official data is missing.
    - Give a small personalized pitch to approach these stakeholders based on case studies (if relevant).

**Repeat this structure** for each distinct opportunity, ensuring you include numeric details (budgets, spending trends, contract timelines) whenever possible.

---

### 4. Data Integrity & Contradictions

- **No Hallucination**: Use **only** information present in the subordinate reports.
- **Handle Contradictory Data**:
    - If a division is flagged “underperforming” in financial data but “hiring aggressively” in job postings, highlight the mismatch explicitly.
    - If a vendor contract is reported as expired in one source but still active in another, note the discrepancy.
    - **Optional**: You may create a brief “Data Gaps / Contradictions” subsection if there are multiple conflicts to itemize.

---

### 5. Format Requirements

- Provide a **Markdown-formatted** final report with **clear headings**. Suggested outline:
    1. **Short Brief**
    2. **Sales Opportunities** (using the structured format: Trend → Problems → Opportunities → Evidence → Stakeholders)
    3. **Data Gaps / Contradictions** (optional if needed)
    4. **Conclusion / Summary of Recommendations**
- Use **bullet points or tables** to make numeric data (growth rates, job counts, contract expiry dates) easily scannable by senior leadership.

---

### 6. Conclusion / Summary of Recommendations

- Provide a **prioritized list** of the **most critical or time-sensitive** opportunities.
- You may rank them by **potential revenue impact, urgency,** or **synergy** with the account’s strategy.
- Keep it concise—**focus** on what senior leaders must address **first** and why (e.g., “CRM contract expiry next quarter,” “AI-driven analytics pilot demands immediate staffing”).

---

## Goal

Your **comprehensive final report** will enable senior sales leaders at **${client}** to:

1. **Spot** immediate and future sales opportunities.
2. **Recognize** which stakeholders hold budget authority or can champion an initiative.
3. **Plan** an informed sales strategy that accounts for existing vendor relationships, organizational performance, and industry shifts.

All insights must be **fact-based, actionable, and transparent** about any assumptions or data gaps.


`,
  prompt: `Your subordinates have generated the following reports for the target account, ${account}:

  # Report 1
  ${salesAnalysisFile1}


  # Report 2
  ${salesAnalysisFile2}

  # Report 3
  ${orgPerformanceAnalysisFile}

  #Offerings of ${client}:
  ${clientOfferings}

  
  `,
  tools: {
    getPastProjects: tool({
        description: `Gets the past projects undertaken by ${client} from the knowledgebox. Returns a JSON object containing past projects of ${client} with their names, OCR documents, and links.`,
        parameters: z.object({
            searchQuery: z.string().describe(`The search query to search for past projects`)
        }),
        execute: async ({searchQuery}) => {
            console.log('🚀 Running getPastProjects tool', searchQuery)
            return await getPastProjects({searchQuery})
        }
    })
  },
  maxSteps: 5,
  onStepFinish: (data) => {
    console.log('🚀 onStepFinish', JSON.stringify(data, null, 2))
  },
  toolChoice: 'auto'
})


 console.log('Final usage: ', toolResults, finalUsage, '\n ----- \n')
 fs.writeFileSync(`${accountPath}/intelligenceReport.md`, intelligence)

 
 // Send to Notion
await appendToNotion(intelligence)
console.log('✅ Success. Intelligence report generated and pushed to Notion')


}

export default anapanAgent