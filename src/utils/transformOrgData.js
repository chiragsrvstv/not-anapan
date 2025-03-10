import fs from 'fs'

// Convert orgStructure.json to org.json
import orgStructure from '/Users/chirag/Work/ai/not-anapan/research-agent/sources/7-Eleven/org_structure_full.json' with { type: 'json' }
const orgStructureArray = []
for (const person of orgStructure) {

 orgStructureArray.push(({name: person.node.position.fullName, role: person.node.position.role}))
 
 fs.writeFileSync('/Users/chirag/Work/ai/not-anapan/research-agent/sources/7-Eleven/org_structure.json', JSON.stringify(orgStructureArray, null, 2))
}
