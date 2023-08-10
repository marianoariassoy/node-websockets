import fs from 'node:fs/promises'
export const readFile = async path => {
  const data = await fs.readFile(path, 'utf-8')
  return data === '' ? [] : JSON.parse(data)
}
export const writeFile = async (data, file) => {
  await fs.writeFile(file, JSON.stringify(data, null, 2))
}
