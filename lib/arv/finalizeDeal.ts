import { calculateBaseArv } from "./calculateBaseArv"
import { applyAdjustments, Adjustment } from "./adjustments"

export function finalizeDeal({
  subject,
  comps,
  adjustments,
}: {
  subject: any
  comps: any[]
  adjustments: Adjustment[]
}) {
  if (adjustments.length >= 2) {
    return {
      status: "FAIL",
      reason: "Multiple negative location factors",
    }
  }

  const baseArv = calculateBaseArv(
    subject.squareFeet,
    comps
  )

  const finalArv = applyAdjustments(
    baseArv,
    adjustments
  )

  return {
    status: "PASS",
    baseArv,
    finalArv,
  }
}
