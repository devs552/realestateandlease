import Rule from "@/models/Rule"

export async function getRulesMap() {
  const rules = await Rule.find()
  return Object.fromEntries(rules.map(r => [r.key, r.value]))
}
