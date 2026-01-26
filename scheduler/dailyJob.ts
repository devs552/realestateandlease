import cron from "node-cron"
import { run } from "@/testscript/test"

let initialized = false
let firstRunCompleted = false

function simpleTime() {
  return new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
}

export async function startScheduler() {
  if (initialized) return
  initialized = true

  console.log("\n" + "=".repeat(70))
  console.log("📅 PIPELINE SCHEDULER STARTED")
  console.log("=".repeat(70))

  // 🔥 FIRST RUN (immediate)
  if (!firstRunCompleted) {
    console.log("\n🚀 First-time pipeline execution started")
    console.log(`⏱ Time: ${simpleTime()}`)

    try {
      await run()
      firstRunCompleted = true
      console.log(`✅ First run completed at ${simpleTime()}`)
    } catch (error) {
      console.error(`❌ First run failed at ${simpleTime()}`)
      console.error(error)
    }

    console.log("─".repeat(70))
  }

  // ⏰ DAILY 9 AM CRON
  cron.schedule("0 9 * * *", async () => {
    console.log("\n" + "─".repeat(70))
    console.log(`🚀 Scheduled pipeline started at ${simpleTime()}`)
    console.log("─".repeat(70))

    try {
      await run()
      console.log(`✅ Pipeline completed at ${simpleTime()}`)
    } catch (error) {
      console.error(`❌ Pipeline failed at ${simpleTime()}`)
      console.error(error)
    }

    console.log("─".repeat(70) + "\n")
  })

  console.log("⏰ Schedule: Every day at 9:00 AM")
  console.log("✅ Scheduler initialized\n")
}
