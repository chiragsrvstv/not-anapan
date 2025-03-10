import 'dotenv/config'
import { openai } from '@ai-sdk/openai'
import { ChromaClient } from 'chromadb'

import { OpenAIEmbeddingFunction } from 'chromadb';
// import isEmpty from 'lodash/isEmpty';

const chroma = new ChromaClient()
const openaiEmbeddingFunction = new OpenAIEmbeddingFunction({
  model: openai('text-embedding-3-large'),
  apiKey: process.env.OPENAI_API_KEY,
})


async function getCaseStudies({searchQuery}) {

 const collection = await chroma.getCollection ({
  name: 'happiestMinds_case_studies',
  embeddingFunction: openaiEmbeddingFunction
})

if(!searchQuery) {
  return {}
}

const results = await collection.query({
  queryTexts: searchQuery,
  nResults: 2,
})



return {names: results.ids, documents: results.documents, links: results.metadatas}


}

export default getCaseStudies