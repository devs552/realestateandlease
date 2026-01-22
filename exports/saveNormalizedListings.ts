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
export function saveNormalizedListings(listings: any[]) {
  try {
    const dataDir = ensureDataDir()
    const filePath = path.join(dataDir, "normalized-listings.json")

    const data = {
      runAt: new Date().toISOString(),
      count: listings.length,
      listings: listings,
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    console.log(`✅ Saved ${listings.length} normalized listings to: ${filePath}`)
    console.log(`   File size: ${(fs.statSync(filePath).size / 1024).toFixed(2)} KB`)
  } catch (err) {
    console.error("❌ Error saving normalized listings:", err)
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