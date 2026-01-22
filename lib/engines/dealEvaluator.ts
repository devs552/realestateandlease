import { runCompEngine } from "./compEngine"
import { runArvEngine } from "./arvEngine"
import { runDomEngine } from "./domEngine"

export function evaluateDeal(deal: any, comps: any[], rules: any) {
  const failures = []

  try {
    // Validate input
    if (!deal) {
      return {
        status: "FAIL",
        arv: 0,
        profitPercent: 0,
        comps: [],
        failureReasons: ["Invalid deal data"]
      }
    }

    if (!Array.isArray(comps) || comps.length === 0) {
      return {
        status: "FAIL",
        arv: 0,
        profitPercent: 0,
        comps: [],
        failureReasons: ["No comparables provided"]
      }
    }

    const dealPrice = Number(deal.price) || deal.purchasePrice
    if (!dealPrice || dealPrice <= 0) {
      return {
        status: "FAIL",
        arv: 0,
        profitPercent: 0,
        comps: [],
        failureReasons: ["Invalid deal price"]
      }
    }

    // Log inputs for debugging
    console.log("📊 Deal Evaluation Started")
    console.log("Deal Price:", dealPrice)
    console.log("Comps Count:", comps.length)
    console.log("Rules:", rules)

    // Step 1: Run comp engine
    console.log("\n🔍 Step 1: Filtering Comparables...")
    const compResult = runCompEngine(deal, comps, rules)
    console.log("Comp Result:", compResult)

    if (!compResult || !Array.isArray(compResult.selected) || compResult.selected.length === 0) {
      failures.push("No valid comparables selected")
      return {
        status: "FAIL",
        arv: 0,
        profitPercent: 0,
        comps: [],
        failureReasons: failures
      }
    }

    const selected = compResult.selected
    console.log(`✅ Selected ${selected.length} valid comps`)

    // Step 2: Calculate ARV
    console.log("\n📈 Step 2: Calculating ARV...")
    const arvResult = runArvEngine(selected)
    console.log("ARV Result:", arvResult)

    if (!arvResult || typeof arvResult.arv !== "number" || arvResult.arv <= 0) {
      failures.push("Failed to calculate ARV")
      return {
        status: "FAIL",
        arv: 0,
        profitPercent: 0,
        comps: selected,
        failureReasons: failures
      }
    }

    const arv = arvResult.arv
    console.log(`✅ ARV Calculated: $${Math.round(arv).toLocaleString()}`)

    // Step 3: Check DOM
    console.log("\n📅 Step 3: Checking Days on Market...")
    const domCheck = runDomEngine(selected, rules?.MAX_COMP_DOM || 180)
    console.log("DOM Check:", domCheck)

    if (domCheck && !domCheck.pass) {
      failures.push(domCheck.reason || "DOM check failed")
      console.log("⚠️ DOM Check Failed:", domCheck.reason)
    } else {
      console.log("✅ DOM Check Passed")
    }

    // Step 4: Calculate Profit
    console.log("\n💰 Step 4: Calculating Profit...")
    const profitAmount = arv - dealPrice
    const profitPercent = (profitAmount / dealPrice) * 100

    console.log("Profit Amount:", Math.round(profitAmount))
    console.log("Profit Percent:", Math.round(profitPercent) + "%")

    if (isNaN(profitPercent) || !isFinite(profitPercent)) {
      failures.push("Profit calculation error")
      return {
        status: "FAIL",
        arv: Math.round(arv),
        profitPercent: 0,
        comps: selected,
        failureReasons: failures
      }
    }

    // Step 5: Check minimum profit
    console.log("\n✔️ Step 5: Checking Minimum Profit Threshold...")
    const minProfit = rules?.MIN_PROFIT_PERCENT || 10
    console.log(`Minimum Required: ${minProfit}%`)
    console.log(`Actual Profit: ${Math.round(profitPercent)}%`)

    if (profitPercent < minProfit) {
      failures.push(`Profit below minimum (${Math.round(profitPercent)}% < ${minProfit}%)`)
      console.log("❌ Profit Check Failed")
    } else {
      console.log("✅ Profit Check Passed")
    }

    // Final result
    const result = {
      status: failures.length ? "FAIL" : "PASS",
      arv: Math.round(arv),
      profitPercent: Math.round(profitPercent),
      profitAmount: Math.round(profitAmount),
      comps: selected,
      failureReasons: failures
    }

    console.log("\n📋 Final Result:", result)
    return result

  } catch (error) {
    console.error("❌ Evaluation Engine Error:", error)
    return {
      status: "FAIL",
      arv: 0,
      profitPercent: 0,
      comps: [],
      failureReasons: ["Evaluation error: " + (error instanceof Error ? error.message : "Unknown")]
    }
  }
}