import * as fs from "fs"
import * as path from "path"

/**
 * Simple Logger - Writes all console.log output to a log.txt file
 * Everything printed to console is also saved to file
 */

class SimpleLogger {
  private logFilePath: string
  private originalLog: typeof console.log
  private originalWarn: typeof console.warn
  private originalError: typeof console.error

  constructor(logFileName: string = "log.txt") {
    // Create logs directory if it doesn't exist
    const logsDir = "./logs"
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true })
    }

    this.logFilePath = path.join(logsDir, logFileName)

    // Add header with timestamp (append mode, don't clear)
    const separator = "=".repeat(80)
    const timestamp = new Date().toISOString()
    const header = `\n${separator}\nPipeline Log Started: ${timestamp}\n${separator}\n`
    fs.appendFileSync(this.logFilePath, header, "utf-8")

    // Store original console methods
    this.originalLog = console.log
    this.originalWarn = console.warn
    this.originalError = console.error

    // Override console methods
    this.setupInterception()
  }

  private setupInterception() {
    console.log = (...args: any[]) => {
      // Print to console
      this.originalLog(...args)
      // Write to file
      this.writeToFile(args)
    }

    console.warn = (...args: any[]) => {
      this.originalWarn(...args)
      this.writeToFile(args)
    }

    console.error = (...args: any[]) => {
      this.originalError(...args)
      this.writeToFile(args)
    }
  }

  private writeToFile(args: any[]) {
    const message = args
      .map((arg) => {
        if (typeof arg === "string") return arg
        if (typeof arg === "object") {
          try {
            return JSON.stringify(arg, null, 2)
          } catch {
            return String(arg)
          }
        }
        return String(arg)
      })
      .join(" ")

    const timestamp = new Date().toISOString()
    const logLine = `[${timestamp}] ${message}\n`

    // Append to file
    fs.appendFileSync(this.logFilePath, logLine, "utf-8")
  }

  // Restore original console
  restore() {
    console.log = this.originalLog
    console.warn = this.originalWarn
    console.error = this.originalError
  }

  // Get log file path
  getLogPath() {
    return this.logFilePath
  }
}

export default SimpleLogger