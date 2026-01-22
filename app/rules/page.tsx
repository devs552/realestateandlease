"use client"

import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, AlertCircle } from "lucide-react"

interface Rule {
  _id: string
  engine: "COMP" | "DOM" | "ARV" | "PROFIT"
  key: string
  value: number | boolean
  unit?: string
  description: string
  locked: boolean
}

const ENGINE_CONFIG = {
  COMP: { label: "Comparables", icon: "📊" },
  DOM: { label: "Dominant Factors", icon: "🎯" },
  ARV: { label: "After Repair Value", icon: "🏠" },
  PROFIT: { label: "Profitability", icon: "💰" },
}

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check system preference and localStorage
    const prefersDark = localStorage.getItem("theme") === "dark" || 
      (localStorage.getItem("theme") === null && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setIsDark(prefersDark)
    document.documentElement.classList.toggle("dark", prefersDark)

    fetch("/api/rules")
      .then((res) => res.json())
      .then((data) => {
        setRules(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const updateRule = async (id: string, value: any) => {
    setEditingId(null)
    setSavedId(id)
    setTimeout(() => setSavedId(null), 2000)

    await fetch(`/api/rules/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    }).catch(console.error)
  }

  const grouped = rules.reduce((acc, rule) => {
    acc[rule.engine] = acc[rule.engine] || []
    acc[rule.engine].push(rule)
    return acc
  }, {} as Record<string, Rule[]>)

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading rules...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        
        :root {
          --bg-primary: #f8fafc;
          --bg-secondary: #ffffff;
          --bg-tertiary: #f1f5f9;
          --border-color: #e2e8f0;
          --border-color-light: #f1f5f9;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --text-tertiary: #94a3b8;
          --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
          --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
          --shadow-hover: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        :root.dark {
          --bg-primary: #000000;
          --bg-secondary: #111111;
          --bg-tertiary: #1a1a1a;
          --border-color: #2a2a2a;
          --border-color-light: #333333;
          --text-primary: #ffffff;
          --text-secondary: #d1d5db;
          --text-tertiary: #9ca3af;
          --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.5);
          --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.6);
          --shadow-hover: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
        
        .rules-container {
          font-family: 'Inter', sans-serif;
          background: var(--bg-primary);
          min-height: 100vh;
          color: var(--text-primary);
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .engine-card {
          animation: fadeInUp 0.6s ease-out;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .engine-card:hover {
          border-color: var(--border-color-light);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        
        .engine-header {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border-color);
        }
        
        .engine-header::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(100px, -100px);
        }
        
        .engine-icon {
          font-size: 2rem;
          margin-right: 12px;
        }
        
        .rule-item {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color-light);
          border-radius: 8px;
          padding: 20px;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out both;
        }
        
        .rule-item:hover {
          background: var(--bg-tertiary);
          border-color: var(--border-color);
          box-shadow: var(--shadow-hover);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .rule-key {
          font-family: 'Syne', sans-serif;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }
        
        .rule-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
          line-height: 1.5;
        }
        
        .rule-input-group {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .rule-input {
          padding: 10px 14px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          background: var(--bg-primary);
          font-weight: 500;
          color: var(--text-primary);
        }
        
        .rule-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
        
        .rule-input:disabled {
          background: var(--bg-tertiary);
          color: var(--text-tertiary);
          cursor: not-allowed;
        }
        
        .rule-unit {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          font-weight: 500;
          min-width: 40px;
        }
        
        .save-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #dcfce7;
          color: #166534;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          animation: slideInRight 0.3s ease-out;
        }

        :root.dark .save-indicator {
          background: rgba(16, 185, 129, 0.2);
          color: #86efac;
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .locked-badge {
          display: inline-block;
          background: #fee2e2;
          color: #991b1b;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 8px;
        }

        :root.dark .locked-badge {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
        }
      `}</style>

      <div className="rules-container">
        <div className="px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Underwriting Rules
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Phase 1 Configuration</p>
          </div>
        </div>

        <div className="px-8 pb-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            {Object.entries(grouped).map(([engine, engineRules], idx) => {
              const config = ENGINE_CONFIG[engine as keyof typeof ENGINE_CONFIG]

              return (
                <div
                  key={engine}
                  className="engine-card rounded-12"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  <div
                    className="engine-header px-8 py-6 relative"
                  >
                    <div className="flex items-center relative z-10">
                      <span className="engine-icon">{config.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                          {config.label}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{engineRules.length} rules configured</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    {engineRules.map((rule, ruleIdx) => (
                      <div
                        key={rule._id}
                        className="rule-item"
                        style={{
                          animationDelay: `${(idx * 0.1 + ruleIdx * 0.05)}s`,
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="rule-key">{rule.key}</div>
                            <p className="rule-description">{rule.description}</p>
                            {rule.locked && <div className="locked-badge">🔒 Locked</div>}
                          </div>
                        </div>

                        <div className="flex justify-between items-center gap-4">
                          <div className="rule-input-group flex-1">
                            <input
                              type="number"
                              defaultValue={rule.value as number}
                              onBlur={(e) => updateRule(rule._id, Number(e.target.value))}
                              onFocus={() => setEditingId(rule._id)}
                              className="rule-input flex-1"
                              disabled={rule.locked}
                              step="0.01"
                            />
                            {rule.unit && <span className="rule-unit">{rule.unit}</span>}
                          </div>

                          {savedId === rule._id && (
                            <div className="save-indicator">
                              <Check size={16} strokeWidth={3} />
                              <span>Saved</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}