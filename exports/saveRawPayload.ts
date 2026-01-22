import fs from "fs"
import path from "path"

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
    console.log(`✓ Created data directory: ${dataDir}`)
  }
  return dataDir
}

export function saveRawPayload(payload: any[]) {
  try {
    const dataDir = ensureDataDir()
    const filePath = path.join(dataDir, "raw-public-payload.json")

    const data = {
      fetchedAt: new Date().toISOString(),
      totalCount: payload.length,
      records: payload, // Save ALL records, not just 3
      sample: payload.slice(0, 1), // Also include first record as sample
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    console.log(`✅ Saved ${payload.length} raw records to: ${filePath}`)
    console.log(`   File size: ${(fs.statSync(filePath).size / 1024).toFixed(2)} KB`)
  } catch (err) {
    console.error("❌ Error saving raw payload:", err)
  }
}

/**
 * Export summary report of the entire pipeline run
 */
export function exportSummary(
  totalFetched: number,
  totalNormalized: number,
  totalEvaluated: number,
  evaluatedBreakdown: { status: string; count: number }[]
) {
  try {
    const dataDir = ensureDataDir()
    const filePath = path.join(dataDir, "pipeline-summary.json")

    const data = {
      completedAt: new Date().toISOString(),
      fetch: {
        total: totalFetched,
      },
      normalization: {
        total: totalNormalized,
        successRate: totalFetched > 0 ? ((totalNormalized / totalFetched) * 100).toFixed(2) + "%" : "N/A",
      },
      evaluation: {
        total: totalEvaluated,
        successRate: totalNormalized > 0 ? ((totalEvaluated / totalNormalized) * 100).toFixed(2) + "%" : "N/A",
        breakdown: evaluatedBreakdown,
      },
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    console.log(`✅ Saved pipeline summary to: ${filePath}`)
  } catch (err) {
    console.error("❌ Error exporting summary:", err)
  }
}
export function listGeneratedFiles() {
  try {
    const dataDir = path.join(process.cwd(), "data")
    if (!fs.existsSync(dataDir)) {
      console.log("No data directory found")
      return
    }

    const files = fs.readdirSync(dataDir)
    console.log(`\n📁 Generated files in ${dataDir}:`)
    files.forEach((file) => {
      const filePath = path.join(dataDir, file)
      const stats = fs.statSync(filePath)
      console.log(`   • ${file} (${(stats.size / 1024).toFixed(2)} KB)`)
    })
  } catch (err) {
    console.error("Error listing files:", err)
  }
}