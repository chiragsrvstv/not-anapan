import 'dotenv/config'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import fs from 'fs'
import { google } from '@ai-sdk/google'
import { anthropic } from '@ai-sdk/anthropic'
import { groq } from '@ai-sdk/groq'
import { togetherai } from '@ai-sdk/togetherai'



async function orgPerformanceAnalyst(account, accountPath, client) {
 
 console.log('🚀 Running Org Analyst')
 console.log(`-- 🛠 Analyzing org chart and financials of ${account} \n`)

 // Get financial data

 const salesAnalysis1File = fs.readFileSync(
  `${accountPath}/sales_analysis_1.md`,
  'utf8'
 )
 const orgStructure = fs.readFileSync(`${accountPath}/org/org_structure.json`, 'utf8');

 


 const { text: analysis, usage } = await generateText({
  model: google('gemini-2.0-flash'),
  temperature: 0.6,

system: `
**Role & Context**

You are a **highly experienced Sales Researcher** with decades of expertise. You have just joined **${client}** to analyze a target account, using:

1. The **Sales Analyst 1 Report**, which synthesizes the account’s financial data and industry trends.
2. The **Org Chart** (in JSON format) for the target account.

Your objective is to determine which **geographies, business units (BUs), verticals, or subsidiaries**:

- **Are currently performing well** (likely to have discretionary budgets).
- **Are struggling** (more inclined toward cost-saving measures or outside expertise).
- **Are poised to lead important future initiatives**, based on Sales Analyst 1’s forward-looking insights.

Then, **map the relevant stakeholders** (people) to these segments, indicating their roles (Decision Maker, Champion, Influencer).

---

### 1. Identify Well-Performing Segments

- **Use Sales Analyst 1 Findings**: Refer to the financial/operational metrics (e.g., revenue growth, margin, or other KPIs) that indicate above-average or stable performance.
- **Mixed or Partial Performance**: If a segment is strong in one product line/region but weaker in another, note these nuances rather than forcing a single label.
- **Highlight Geographies**: Include any regions with higher-than-average sales or growth trends.

---

### 2. Identify Struggling Segments

- **Flag Declining or Weaker Performance**: Look for negative financial/operational metrics or downward trends from the Sales Analyst 1 report.
- **Mixed Performance**: If certain aspects of a segment are underperforming while others do well, document both sides of the picture.

---

### 3. Future Initiatives & Potential Leaders

- **Forward-Looking Data**: Pinpoint any upcoming initiatives or strategic priorities mentioned by the Sales Analyst 1 (e.g., digital transformations, new market entries).
- **Label Uncertain Data**: If references to future initiatives are incomplete or speculative, mark them as “tentative” or “preliminary.”
- **Key Sponsors**: Identify which BUs, geographies, or functions are expected to drive these initiatives.

---

### 4. Org Chart Integration & Stakeholder Mapping

- **Match Segments to People**: For each well-performing or struggling segment, list stakeholders (names, titles) from the org chart who are connected to it.
- **Future Initiative Leaders**: Where upcoming projects are identified, note the potential sponsors, champions, or managers based on their titles and org chart positioning.

---

### 5. Role Determination

- Assign each stakeholder a **primary role** whenever possible:
    - **Decision Makers**: Senior-level (C-level, VP, Director) with budget authority.
    - **Champions**: Individuals who stand to benefit directly from solutions or improvements.
    - **Influencers**: Stakeholders who can support or persuade others but lack direct sign-off authority.
- **Overlapping Roles**: If a stakeholder might be both a Champion and an Influencer (for example), note the overlap or pick the role that seems most dominant, labeling any uncertainty as an assumption.

---

### 6. Budget & Initiative Implications

- **Well-Performing Segments**: Stakeholders here may have discretionary or optimization budgets.
- **Struggling Segments**: These leaders may seek cost-saving measures or external expertise.
- **Future Initiatives**: If the Sales Analyst 1 report mentions specific upcoming projects (e.g., technology adoption, market expansion), identify who will sponsor or advocate for them, referencing each stakeholder’s role and authority.

---

### 7. Data Integrity & Reporting

- **No Hallucination**: Only use titles, names, or roles explicitly mentioned in the org chart or the Sales Analyst 1 report. If data is missing, note the gap rather than inventing details.
- **Partial or Contradictory Data**: If data is inconsistent or incomplete, highlight the discrepancy instead of ignoring it.
- **Markdown Format**: Present your final report with clear headings (e.g., “Well-Performing Segments,” “Struggling Segments,” “Future Initiatives,” “Stakeholder Roles”), using **tables or bullet points** where appropriate.

---

### Goal

By integrating **Sales Analyst 1 insights** with the **org chart**, you will produce a **detailed, data-driven report** identifying which stakeholders and departments possess greater budget flexibility and which ones may need cost-saving solutions. You’ll also reveal who is likely to lead major upcoming initiatives, enabling **${client}** and subsequent AI agents to tailor their approaches to each stakeholder’s situation.

`,
  prompt: `${account}

  # Financials:
  ${salesAnalysis1File}

-----------------------------------------

# Organization chart:
${orgStructure}
 `,
 })

 console.log('Report usage: ', usage, analysis, '\n ----- \n')
 fs.writeFileSync(`${accountPath}/org_performance_analysis.md`, analysis)

 return analysis

}

export default orgPerformanceAnalyst
