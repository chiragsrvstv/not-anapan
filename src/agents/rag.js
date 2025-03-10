import 'dotenv/config'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import fs from 'fs'
import { google } from '@ai-sdk/google'
import { togetherai } from '@ai-sdk/togetherai'
import { anthropic } from '@ai-sdk/anthropic'

import { ChromaClient } from 'chromadb'
import caseStudies from '../../sources/clients/happiestMinds/case_studies.json' with { type: 'json' }

import { OpenAIEmbeddingFunction } from 'chromadb';

const chroma = new ChromaClient()
const openaiEmbeddingFunction = new OpenAIEmbeddingFunction({
  model: openai('text-embedding-3-large'),
  apiKey: process.env.OPENAI_API_KEY,
})



async function rag(account, accountPath, client) {
  
  const collection = await chroma.getOrCreateCollection ({
    name: 'happiestMinds_case_studies',
    embeddingFunction: openaiEmbeddingFunction,
    metadata: {
      "hnsw:space": "cosine",
    }
  })
  
  
  // Happiest Minds Case Studies
  // await collection.upsert({
  //   ids: caseStudies.map(c => c.name),
  //   documents: caseStudies.map(c => c.data),
  //   metadatas: caseStudies.map(c => ({url: c.url})),
  // })
  
  const result = await collection.query({
    queryTexts: `IoT Integration for Real-Time Supply Chain & Sustainability Insights`,
    nResults: 10
  })
  
  console.log('caseStudies', result, JSON.stringify(result.metadatas, null, 2)) 


}

export default rag
