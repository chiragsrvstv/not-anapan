import 'dotenv/config'
import { Client } from '@notionhq/client'
import { markdownToBlocks } from '@tryfabric/martian'

async function appendToNotion(data) {
 const notion = new Client({
  auth: process.env.NOTION_API_KEY,
 })
 const blocks = markdownToBlocks(data)

 await notion.blocks.children
  .append({
   block_id: process.env.NOTION_BLOCK_ID,
   children: blocks,
  })
  .catch((err) => console.error(err))
}

export default appendToNotion