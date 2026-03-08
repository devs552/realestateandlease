import fs from "fs"
import path from "path"

const EXPORTS_DIR = path.join(process.cwd(), "exports")

// Ensure exports directory exists
function ensureExportsDir() {
  if (!fs.existsSync(EXPORTS_DIR)) {
    fs.mkdirSync(EXPORTS_DIR, { recursive: true })
  }
}

export function saveRawPayload(raw: any[]): void {
  ensureExportsDir()
  const filePath = path.join(EXPORTS_DIR, "raw-payload.json")
  fs.writeFileSync(filePath, JSON.stringify(raw, null, 2))
  console.log(`   📄 Saved: ${filePath}`)
}

export function saveNormalizedListings(listings: any[]): void {
  ensureExportsDir()
  const filePath = path.join(EXPORTS_DIR, "normalized-listings.json")
  fs.writeFileSync(filePath, JSON.stringify(listings, null, 2))
  console.log(`   📄 Saved: ${filePath}`)
}

export function exportEvaluations(evaluations: any[]): void {
  ensureExportsDir()
  const filePath = path.join(EXPORTS_DIR, "evaluations.json")
  fs.writeFileSync(filePath, JSON.stringify(evaluations, null, 2))
  console.log(`   📄 Saved: ${filePath}`)
}

// ✅ NEW: COMP Rule Explainability Export
export function exportCompExplanations(compExplanations: any[]): void {
  ensureExportsDir()
  const filePath = path.join(EXPORTS_DIR, "comp-explanations.json")
  fs.writeFileSync(filePath, JSON.stringify(compExplanations, null, 2))
  console.log(`   📄 Saved: ${filePath}`)
}

export function exportSummary(
  fetchedCount: number,
  normalizedCount: number,
  evaluatedCount: number,
  statusBreakdown: any[]
): void {
  ensureExportsDir()
  
  const summary = {
    pipelineRunAt: new Date().toISOString(),
    steps: {
      step1_ingestion: {
        name: "Real Public-Source Ingestion (Non-Simulated)",
        source: "Realtor.com (Dallas–Fort Worth)",
        fetched: fetchedCount,
        status: "✅ Complete",
      },
      step2_normalization: {
        name: "Normalization & DOM/Status Tracking",
        normalized: normalizedCount,
        normalizeRate: fetchedCount > 0 ? ((normalizedCount / fetchedCount) * 100).toFixed(2) + "%" : "N/A",
        status: "✅ Complete",
      },
      step3_neighborhood: {
        name: "Neighborhood Boundary Enforcement (COMP Selection)",
        propertiesEvaluated: normalizedCount,
        status: "✅ Complete",
      },
      step4_compExplainability: {
        name: "COMP Rule Explainability (JSON Export)",
        exportFile: "comp-explanations.json",
        status: "✅ Complete",
      },
      step5_negativeAdjustments: {
        name: "Negative Adjustments & Automatic Rejection",
        evaluated: evaluatedCount,
        status: "✅ Complete",
      },
      step6_export: {
        name: "Data Export & Storage",
        files: [
          "raw-payload.json",
          "normalized-listings.json",
          "evaluations.json",
          "comp-explanations.json",
          "pipeline-summary.json",
        ],
        status: "✅ Complete",
      },
    },
    results: {
      totalEvaluated: evaluatedCount,
      statusBreakdown: statusBreakdown,
      passRate: evaluatedCount > 0 
        ? ((statusBreakdown.find((s) => s.status === "PASS")?.count || 0) / evaluatedCount * 100).toFixed(2) + "%"
        : "N/A",
    },
  }
  
  const filePath = path.join(EXPORTS_DIR, "pipeline-summary.json")
  fs.writeFileSync(filePath, JSON.stringify(summary, null, 2))
  console.log(`   📄 Saved: ${filePath}`)
}

export function listGeneratedFiles(): void {
  ensureExportsDir()
  
  if (!fs.existsSync(EXPORTS_DIR)) {
    console.log("   (No files generated yet)")
    return
  }

  const files = fs.readdirSync(EXPORTS_DIR)
  
  if (files.length === 0) {
    console.log("   (No files in exports directory)")
    return
  }

  console.log(`\n   Found ${files.length} files in ${EXPORTS_DIR}:`)
  files.forEach((file) => {
    const filePath = path.join(EXPORTS_DIR, file)
    const stats = fs.statSync(filePath)
    const sizeKb = (stats.size / 1024).toFixed(2)
    console.log(`   • ${file} (${sizeKb} KB)`)
  })
}