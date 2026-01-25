import nodemailer from "nodemailer"

type PassDealSummary = {
  address: string
  purchasePrice: number
  baseArv: number
  finalArv: number
  marginPercent: number
}

// Format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value)
}

// Generate beautiful HTML email
const generateEmailHTML = (deals: PassDealSummary[]): string => {
  const totalPurchasePrice = deals.reduce((sum, d) => sum + d.purchasePrice, 0)
  const totalArv = deals.reduce((sum, d) => sum + d.finalArv, 0)
  const avgMargin = deals.reduce((sum, d) => sum + d.marginPercent, 0) / deals.length

  const dealRows = deals
    .map(
      (d, i) => `
      <tr>
        <td style="padding: 16px; border-bottom: 1px solid #e0e0e0; text-align: center; font-weight: 600; color: #667eea;">
          ${i + 1}
        </td>
        <td style="padding: 16px; border-bottom: 1px solid #e0e0e0; color: #333;">
          <strong>${d.address}</strong>
        </td>
        <td style="padding: 16px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #333;">
          ${formatCurrency(d.purchasePrice)}
        </td>
        <td style="padding: 16px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #333;">
          ${formatCurrency(d.finalArv)}
        </td>
        <td style="padding: 16px; border-bottom: 1px solid #e0e0e0; text-align: right;">
          <span style="background-color: #d4edda; color: #155724; padding: 6px 12px; border-radius: 20px; font-weight: 600;">
            ${d.marginPercent.toFixed(1)}%
          </span>
        </td>
      </tr>
    `
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Daily PASS Deals</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 1000px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px 12px 0 0; padding: 40px 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 36px; font-weight: 700; letter-spacing: -0.5px;">
            ✅ Daily PASS Deals
          </h1>
          <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.95;">
            ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <!-- Stats Section -->
        <div style="background: white; padding: 30px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; border-bottom: 1px solid #e0e0e0;">
          
          <!-- Stat 1: Count -->
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-radius: 10px; border-left: 4px solid #667eea;">
            <div style="font-size: 32px; font-weight: 700; color: #667eea; margin-bottom: 8px;">
              ${deals.length}
            </div>
            <div style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
              Properties
            </div>
          </div>

          <!-- Stat 2: Total Purchase -->
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #2196F315 0%, #1976D215 100%); border-radius: 10px; border-left: 4px solid #2196F3;">
            <div style="font-size: 24px; font-weight: 700; color: #1976D2; margin-bottom: 8px;">
              ${formatCurrency(totalPurchasePrice)}
            </div>
            <div style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
              Total Purchase
            </div>
          </div>

          <!-- Stat 3: Total ARV -->
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #4CAF5015 0%, #388E3C15 100%); border-radius: 10px; border-left: 4px solid #4CAF50;">
            <div style="font-size: 24px; font-weight: 700; color: #388E3C; margin-bottom: 8px;">
              ${formatCurrency(totalArv)}
            </div>
            <div style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
              Total ARV
            </div>
          </div>

          <!-- Stat 4: Avg Margin -->
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #FF980015 0%, #F5730015 100%); border-radius: 10px; border-left: 4px solid #FF9800;">
            <div style="font-size: 32px; font-weight: 700; color: #F57300; margin-bottom: 8px;">
              ${avgMargin.toFixed(1)}%
            </div>
            <div style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
              Avg Margin
            </div>
          </div>

        </div>

        <!-- Table Section -->
        <div style="background: white; padding: 30px;">
          <h2 style="margin: 0 0 20px 0; color: #333; font-size: 20px; font-weight: 700;">
            Deal Summary
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                <th style="padding: 16px; text-align: center; font-weight: 600; border: none;">#</th>
                <th style="padding: 16px; text-align: left; font-weight: 600; border: none;">Address</th>
                <th style="padding: 16px; text-align: right; font-weight: 600; border: none;">Purchase Price</th>
                <th style="padding: 16px; text-align: right; font-weight: 600; border: none;">ARV</th>
                <th style="padding: 16px; text-align: right; font-weight: 600; border: none;">Margin</th>
              </tr>
            </thead>
            <tbody>
              ${dealRows}
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; text-align: center; color: #666; font-size: 13px; line-height: 1.8;">
          <p style="margin: 0 0 10px 0;">
            <strong>Real Estate Investment Pipeline</strong>
          </p>
          <p style="margin: 0 0 10px 0; color: #999;">
            Phase 1 – Screening output only
            <br>
            All figures are assumption-based and non-binding
          </p>
          <p style="margin: 0; color: #999; font-size: 12px;">
            ${new Date().toISOString()}
          </p>
        </div>

      </div>
    </body>
    </html>
  `
}

// Main function
export async function sendDailyPassEmail(deals: PassDealSummary[]) {
  if (deals.length === 0) return

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Real Estate App" <${process.env.SMTP_USER}>`,
    to: process.env.DAILY_DEALS_EMAIL,
    subject: `✅ Daily PASS Deals – ${deals.length} Properties`,
    html: generateEmailHTML(deals),
  })

  console.log(`✅ Daily email sent (${deals.length} deals)`)
}