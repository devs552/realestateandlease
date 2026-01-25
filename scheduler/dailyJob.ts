import cron from "node-cron"
import { run } from "@/testscript/test"

let initialized = false

// Format time nicely
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

// Get next run time
function getNextRunTime(cronExpression: string): string {
  const now = new Date()
  
  // Simple calculation for daily jobs
  const nextRun = new Date(now)
  nextRun.setDate(nextRun.getDate() + 1)
  nextRun.setHours(9, 0, 0, 0) // Assuming 9 AM daily
  
  return nextRun.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

// Main scheduler function
export function startScheduler() {
  if (initialized) return
  initialized = true

  console.log("\n" + "=".repeat(70))
  console.log("📅 PIPELINE SCHEDULER STARTED")
  console.log("=".repeat(70))

  // ✅ OPTION 1: Run every day at 9:00 AM
  console.log("\n⏰ Schedule: Every day at 9:00 AM")
  cron.schedule("0 9 * * *", async () => {
    console.log("\n" + "─".repeat(70))
    console.log(`🚀 Pipeline execution started at ${simpleTime()}`)
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

  console.log(`   Next run: ${getNextRunTime("0 9 * * *")}`)
  console.log("✅ Scheduler initialized\n")
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CRON SCHEDULE REFERENCE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
CRON FORMAT: (minute hour day-of-month month day-of-week)

COMMON SCHEDULES:
─────────────────────────────────────────────────────────────────

📅 DAILY
  "0 9 * * *"          → Every day at 9:00 AM
  "0 18 * * *"         → Every day at 6:00 PM
  "0 0 * * *"          → Every day at midnight (12:00 AM)
  "30 14 * * *"        → Every day at 2:30 PM


//⏰ MULTIPLE TIMES PER DAY
 // "0 9,14,18 * * *"    → 9 AM, 2 PM, 6 PM daily
 // "0 9-17 * * *"       → Every hour from 9 AM to 5 PM
 

//📆 WEEKLY
  //"0 9 * * 1"          → Every Monday at 9:00 AM
  //"0 9 * * 1,3,5"      → Mon, Wed, Fri at 9:00 AM
  //"0 9 * * 1-5"        → Mon-Fri (weekdays) at 9:00 AM

//🗓️ MONTHLY
  //"0 9 1 * *"          → 1st of every month at 9:00 AM
  //"0 9 15 * *"         → 15th of every month at 9:00 AM
  //"0 9 L * *"          → Last day of month at 9:00 AM

//🔄 REPEATING

  //"0 * * * *"          → Every hour


//TIMEZONE:
  //Add timezone parameter: cron.schedule(expr, callback, { timezone: "America/Chicago" })

//AVAILABLE TIMEZONES:
 // "America/New_York"
 // "America/Chicago"
  //"America/Denver"
  //"America/Los_Angeles"
  //"Europe/London"
  //"Europe/Paris"
  //"Asia/Tokyo"
  //"Australia/Sydney"
/*
EXAMPLES WITH TIMEZONES:
  cron.schedule("0 9 * * *", callback, { timezone: "America/New_York" })
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OTHER SCHEDULE OPTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * OPTION 2: Run every day at specific times
 * Uncomment to use
 */
// export function startScheduler() {
//   if (initialized) return
//   initialized = true

//   console.log("\n" + "=".repeat(70))
//   console.log("📅 PIPELINE SCHEDULER STARTED")
//   console.log("=".repeat(70))

//   // Morning run (9 AM)
//   cron.schedule("0 9 * * *", async () => {
//     console.log(`\n🚀 Morning pipeline run at ${simpleTime()}`)
//     try {
//       await run()
//       console.log(`✅ Completed at ${simpleTime()}`)
//     } catch (error) {
//       console.error(`❌ Failed: ${error}`)
//     }
//   })

//   // Afternoon run (2 PM)
//   cron.schedule("0 14 * * *", async () => {
//     console.log(`\n🚀 Afternoon pipeline run at ${simpleTime()}`)
//     try {
//       await run()
//       console.log(`✅ Completed at ${simpleTime()}`)
//     } catch (error) {
//       console.error(`❌ Failed: ${error}`)
//     }
//   })

//   // Evening run (6 PM)
//   cron.schedule("0 18 * * *", async () => {
//     console.log(`\n🚀 Evening pipeline run at ${simpleTime()}`)
//     try {
//       await run()
//       console.log(`✅ Completed at ${simpleTime()}`)
//     } catch (error) {
//       console.error(`❌ Failed: ${error}`)
//     }
//   })

//   console.log("\n⏰ Schedule: 9:00 AM, 2:00 PM, 6:00 PM daily")
//   console.log("✅ Scheduler initialized\n")
// }

/**
 * OPTION 3: Run every 4 hours (6 times per day)
 * Uncomment to use
 */
// export function startScheduler() {
//   if (initialized) return
//   initialized = true

//   console.log("\n" + "=".repeat(70))
//   console.log("📅 PIPELINE SCHEDULER STARTED")
//   console.log("=".repeat(70))

//   cron.schedule("0 */4 * * *", async () => {
//     console.log(`\n🚀 Pipeline run at ${simpleTime()}`)
//     try {
//       await run()
//       console.log(`✅ Completed at ${simpleTime()}`)
//     } catch (error) {
//       console.error(`❌ Failed: ${error}`)
//     }
//   })

//   console.log("\n⏰ Schedule: Every 4 hours")
//   console.log("✅ Scheduler initialized\n")
// }

/**
 * OPTION 4: Weekdays only (Mon-Fri) at 9 AM
 * Uncomment to use
 */
// export function startScheduler() {
//   if (initialized) return
//   initialized = true

//   console.log("\n" + "=".repeat(70))
//   console.log("📅 PIPELINE SCHEDULER STARTED")
//   console.log("=".repeat(70))

//   cron.schedule("0 9 * * 1-5", async () => {
//     console.log(`\n🚀 Weekday pipeline run at ${simpleTime()}`)
//     try {
//       await run()
//       console.log(`✅ Completed at ${simpleTime()}`)
//     } catch (error) {
//       console.error(`❌ Failed: ${error}`)
//     }
//   }, { timezone: "America/New_York" })

//   console.log("\n⏰ Schedule: Monday-Friday at 9:00 AM (New York time)")
//   console.log("✅ Scheduler initialized\n")
// }

/**
 * OPTION 5: Specific days and times
 * Uncomment to use
 */
// export function startScheduler() {
//   if (initialized) return
//   initialized = true

//   console.log("\n" + "=".repeat(70))
//   console.log("📅 PIPELINE SCHEDULER STARTED")
//   console.log("=".repeat(70))

//   // Monday, Wednesday, Friday at 9 AM
//   cron.schedule("0 9 * * 1,3,5", async () => {
//     console.log(`\n🚀 Mon/Wed/Fri pipeline run at ${simpleTime()}`)
//     try {
//       await run()
//       console.log(`✅ Completed at ${simpleTime()}`)
//     } catch (error) {
//       console.error(`❌ Failed: ${error}`)
//     }
//   })

//   console.log("\n⏰ Schedule: Monday, Wednesday, Friday at 9:00 AM")
//   console.log("✅ Scheduler initialized\n")
// }

/**
 * OPTION 6: Monthly - 1st of every month at 9 AM
 * Uncomment to use
 */
// export function startScheduler() {
//   if (initialized) return
//   initialized = true

//   console.log("\n" + "=".repeat(70))
//   console.log("📅 PIPELINE SCHEDULER STARTED")
//   console.log("=".repeat(70))

//   cron.schedule("0 9 1 * *", async () => {
//     console.log(`\n🚀 Monthly pipeline run at ${simpleTime()}`)
//     try {
//       await run()
//       console.log(`✅ Completed at ${simpleTime()}`)
//     } catch (error) {
//       console.error(`❌ Failed: ${error}`)
//     }
//   })

//   console.log("\n⏰ Schedule: 1st of every month at 9:00 AM")
//   console.log("✅ Scheduler initialized\n")
// }