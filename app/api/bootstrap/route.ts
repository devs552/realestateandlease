import { startScheduler } from "@/scheduler/dailyJob"

export async function GET() {
  startScheduler()
  return new Response("Scheduler bootstrapped")
}
