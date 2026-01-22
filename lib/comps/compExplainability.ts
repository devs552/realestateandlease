export function explainComp(subject: any, comp: any) {
  const reasons: string[] = []

  if (Math.abs(comp.sqft - subject.sqft) / subject.sqft > 0.2) {
    reasons.push("Sqft variance > 20%")
  }

  if (comp.dom && comp.dom > 120) {
    reasons.push("DOM exceeds 120 days")
  }

  if (comp.yearBuilt && subject.yearBuilt) {
    if (Math.abs(comp.yearBuilt - subject.yearBuilt) > 20) {
      reasons.push("Year-built outside tolerance")
    }
  }

  return {
    compId: comp.externalId,
    included: reasons.length === 0,
    reasons,
  }
}
