import cron from "node-cron"
import { run } from "@/testscript/test"

let initialized = false
function simpleTime() {
  return new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

export function startScheduler() {
  if (initialized) return
  initialized = true

  // TEMP: every minute (for verification)
  cron.schedule("* * * * *", async () => {
      console.log("⏱ Scheduler running:",  simpleTime())
    await run()
  })

  console.log("✅ Scheduler started")
}
