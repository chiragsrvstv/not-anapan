import { Client } from '@notionhq/client'
import { markdownToBlocks } from '@tryfabric/martian'

async function appendToNotion(data) {
 const notion = new Client({
  auth: 'ntn_c962374183196QSPGYPWE4e59swiFhus7OzZ761eWdueXu',
 })
 const blocks = markdownToBlocks(data)

 await notion.blocks.children
  .append({
   block_id: '19923d9ea587800bb7d5e404c0b7d5dc',
   children: blocks,
  })
  .catch((err) => console.error(err))
}

export default appendToNotion