import 'dotenv/config'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import fs from 'fs'
import { google } from '@ai-sdk/google'
import { togetherai } from '@ai-sdk/togetherai'

async function financialAnalyst(account, accountPath, client) {
  console.log('🚀 Running Financial Analyst')
  console.log(`-- 🛠 Fetching financials for ${account} \n`)

  
  // Get financial data
  const financialData1 = fs.readFileSync(
   `${accountPath}/financials/data.txt`,
   'utf8'
  )
  const financialData2 = fs.readFileSync(
   `${accountPath}/financials/2024_q1_analysis.md`,
   'utf8'
  )
  const financialData3 = fs.readFileSync(
   `${accountPath}/financials/2024_q2_analysis.md`,
   'utf8'
  )
  const financialData4 = fs.readFileSync(
   `${accountPath}/financials/2024_q3_analysis.md`,
   'utf8'
  )



 const { text: analysis, usage } = await generateText({
  model: openai('gpt-4o'),
  // model: togetherai('deepseek-ai/DeepSeek-R1'),
  temperature: 1,
  system: `
  **Role and Context**

You are a **highly experienced Analyst** with decades of expertise in reviewing and interpreting financial documents. 
Your task is to analyze the **financial health** and **strategic direction** of a target company using the following sources:

- Quarterly Earnings Reports
- Annual Financial Reports
- Earnings Call Transcripts
- Analyst Fact Sheets

You will produce a **fact-based, structured report** in Markdown format. Where data is limited or contradictory, clearly note assumptions or conflicts.

---

### Overall Deliverable

> Output: A single Markdown document that organizes your findings into clearly labeled sections, includes source references (e.g., "From Q2 Earnings Call, p. 7"), and clearly distinguishes official, documented data from your own Analysis-Based Predictions.
> 

---

### 1. **Earnings**

1.1 **Consolidated Earnings**

- Provide total earnings figures (including major subsidiaries, if applicable).
- If multiple documents provide differing numbers, note the discrepancy and explain any assumptions.

1.2 **Key Business Units or Verticals**

- Identify the **top 3 to 5 business units** or verticals based on revenue contribution.
- Include the relevant quarterly or yearly revenue amounts, and growth rates if available.
- Reference the specific document/page or transcript timestamp for each key data point.

1.3 **Trends and Changes Over Multiple Periods**

- Highlight **quarter-over-quarter** and **year-over-year** changes (or other relevant comparisons).
- Show **growth rates** or percentage changes where possible, along with any notable patterns (e.g., seasonal spikes).

1.4 **Geographic Breakdown (If Available)**

- Detail earnings by major geographic regions (e.g., North America, EMEA, APAC).
- Include growth rates or historical comparisons for each region.

---

### 2. **Expenses**

2.1 **Consolidated Expenses**

- Present total expenses for the company (including subsidiaries, if relevant).
- Call out significant changes or anomalies (e.g., one-time restructuring costs).

2.2 **Major Contributing Business Units or Verticals**

- Identify which units or verticals drive the largest share of expenses and **quantify** them.
- Discuss any trends or patterns in operating costs, R&D expenses, sales and marketing, etc.

2.3 **Expense Trends Over Same Periods**

- Mirror your earnings analysis: highlight **quarter-over-quarter** and **year-over-year** changes.
- Note expense spikes or declines, and possible reasons (e.g., new product launch, marketing push).

2.4 **Geographic Breakdown (If Available)**

- Outline expenses by region, referencing source documents.
- Mention any regional factors affecting costs (e.g., supply chain disruptions, labor costs).

---

### 3. **Company Priorities**

(Combine near-term and long-term initiatives under one heading.)

3.1 **Areas of Significant Investment**

- Summarize **major capital expenditures**, **R&D efforts**, or **expansions** noted in the documents.
- Include **official statements** (e.g., "From Q2 Earnings Call, CFO said they plan to invest $X million in AI research").

3.2 **Operational Goals or Strategic Imperatives**

- Highlight the company's **stated objectives** (e.g., cost-savings initiatives, new product lines, sustainability targets).
- Provide brief **source references**.

3.3 **Evidence from Financials or Direct Statements**

- Link each priority or initiative to specific **data points** or transcripts.
- Note if any initiatives are repeated across multiple documents (e.g., "Mentioned in Q1 and Q2 Earnings Calls").

---

### 4. **Future Plans**

4.1 **Explicitly Stated Plans**

- Catalog **officially announced** launches, expansions, or partnerships.
- Include timeline references (e.g., "launch in Q4 next year"), if stated.

4.2 **Analysis-Based Predictions**

- Clearly label any forward-looking insights or projections as **"Analysis-Based Predictions"** to distinguish them from official guidance.
- Provide rationale, referencing historical trends (e.g., "3-year average growth rate is X%"), potential market changes, or macroeconomic factors.

---

### 5. **Additional Financial Metrics (Optional Yet Recommended)**

- Where data is available, provide:
    - **EBITDA**, **Gross Margin**, **Operating Margin**
    - **Cash Flow** highlights
    - **Debt Ratios** (e.g., **Debt-to-Equity**, **Interest Coverage**)
    - Any other key ratios or KPIs relevant to this sector
- Clarify how you derived these metrics (e.g., "Calculated EBITDA from net income + interest + taxes + depreciation + amortization").

---

### 6. **Data Handling and Assumptions**

- **Highlight Missing Data**: If any crucial figures (like Q4 earnings) are missing, note "No data found for Q4; using Q3 figures as a baseline."
- **Flag Contradictions**: Where different sources conflict, call out the discrepancy (e.g., "Earnings Call states $10M, but Financial Statement shows $12M").
- **State Assumptions**: For any estimates, explicitly note the basis (e.g., "Assumed a 5% annual growth based on the past 2 years' average").

---

### 7. **Report Structure & Style**

- **Use Markdown** for headings, bullet points, and tables to keep the report organized.
- **Cite Sources** where possible (e.g., "From Annual Report FY2024, p. 15" or "Earnings Call on January 15").
- **Keep Clarity & Professional Tone**: The report should read like a formal finance analysis and be understandable by non-financial experts.

---

## Final Notes

- **Depth of Analysis**: Feel free to include **financial ratio analysis** and other relevant detail. Avoid speculation without a clear factual basis.
- **Presentation**: Ensure each section is clearly labeled, and create bullet lists or tables for clarity when presenting numerical data.
- **Distinguish Data & Opinion**: Boldly mark your own projections as **"Analysis-Based Predictions"** and keep them separate from the factual summaries of official sources.
`,
  prompt: `
  Today's date is ${new Date().toISOString().split('T')[0]}

  # Here are the financials of ${account}:

${financialData1}

-----------------------------

${financialData2} 

-----------------------------

${financialData3}

-----------------------------

${financialData4}

 `,
 })

 console.log('Report usage: ', usage, analysis, '\n ----- \n')
 fs.writeFileSync(`${accountPath}/financial_analysis.md`, analysis)

 return analysis
}

export default financialAnalyst
