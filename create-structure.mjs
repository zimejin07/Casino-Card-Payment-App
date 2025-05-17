// create-structure.mjs
import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const base = 'src/app/payment-methods'
const folders = [
  '',
  'components',
  'utils',
  'graphql',
  'hooks',
  '__tests__',
]

const files = {
  'page.tsx': '',
  'components/CardForm.tsx': '',
  'components/CardList.tsx': '',
  'utils/validation.ts': '',
  'graphql/queries.ts': '',
  'graphql/mutations.ts': '',
  'hooks/useCards.ts': '',
  'types.ts': '',
  '__tests__/CardForm.test.tsx': '',
  '../../../lib/apolloClient.ts': '',
}

folders.forEach(folder => mkdirSync(join(base, folder), { recursive: true }))
Object.entries(files).forEach(([path, content]) => {
  const fullPath = join(base, path)
  mkdirSync(fullPath.split('/').slice(0, -1).join('/'), { recursive: true })
  writeFileSync(fullPath, content)
})

console.log('✅ Project structure created')
