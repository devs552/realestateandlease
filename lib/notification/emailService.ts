import nodemailer from "nodemailer"

type PassDealSummary = {
  address: string
  purchasePrice: number
  baseArv: number
  finalArv: number
  marginPercent: number
}

export async function sendDailyPassEmail(deals: PassDealSummary[]) {
  if (deals.length === 0) return

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const body = `
Daily PASS Deals (${new Date().toDateString()})

${deals
  .map(
    (d, i) => `
${i + 1}. ${d.address}
   PP: $${d.purchasePrice.toLocaleString()}
   ARV: $${d.finalArv.toLocaleString()}
   Margin: ${d.marginPercent.toFixed(1)}%
`
  )
  .join("\n")}

Phase 1 – Screening output only.
All figures are assumption-based and non-binding.
`

  await transporter.sendMail({
    from: `"Deal Screener" <${process.env.SMTP_USER}>`,
    to: process.env.DAILY_DEALS_EMAIL,
    subject: `Daily PASS Deals – ${deals.length} Properties`,
    text: body,
  })
}
