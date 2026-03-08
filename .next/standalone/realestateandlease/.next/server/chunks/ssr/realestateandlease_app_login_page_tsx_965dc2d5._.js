module.exports=[41278,a=>{"use strict";var b=a.i(69297),c=a.i(93668),d=a.i(14539),e=a.i(40089);function f(){let[a,f]=(0,c.useState)(""),[g,h]=(0,c.useState)(""),[i,j]=(0,c.useState)(""),[k,l]=(0,c.useState)(!1),[m,n]=(0,c.useState)(null),{login:o}=(0,e.useAuth)(),p=(0,d.useRouter)(),q=async b=>{b.preventDefault(),j(""),l(!0);try{await o(a,g),p.push("/dashboard")}catch(a){j(a instanceof Error?a.message:"Login failed")}finally{l(!1)}};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .rе-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          background: #0c0f14;
        }

        /* ── Left panel — architectural image ── */
        .re-image-panel {
          display: none;
          position: relative;
          overflow: hidden;
          background: #0c0f14;
        }
        @media (min-width: 1024px) {
          .re-image-panel { display: block; width: 52%; }
        }

        .re-image-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&fit=crop');
          background-size: cover;
          background-position: center;
        }
        .re-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(12,15,20,0.72) 0%,
            rgba(12,15,20,0.35) 50%,
            rgba(12,15,20,0.68) 100%
          );
        }
        .re-image-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 52px 56px;
        }

        .re-logo-mark {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .re-logo-icon {
          width: 36px;
          height: 36px;
          border: 1.5px solid rgba(196,162,96,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(45deg);
        }
        .re-logo-icon-inner {
          width: 14px;
          height: 14px;
          background: rgba(196,162,96,0.85);
          transform: rotate(0deg);
        }
        .re-logo-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.92);
          text-transform: uppercase;
        }

        .re-tagline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 46px;
          font-weight: 300;
          line-height: 1.18;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .re-tagline em {
          font-style: italic;
          color: rgba(196,162,96,0.9);
        }
        .re-tagline-sub {
          margin-top: 16px;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.52);
          letter-spacing: 0.04em;
          line-height: 1.6;
          max-width: 340px;
        }

        .re-stats {
          display: flex;
          gap: 40px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .re-stat-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 500;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .re-stat-label {
          font-size: 11px;
          font-weight: 400;
          color: rgba(255,255,255,0.42);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* ── Right panel — form ── */
        .re-form-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 32px;
          background: #0f1218;
          position: relative;
          overflow: hidden;
        }

        /* Subtle grid texture */
        .re-form-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,162,96,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,162,96,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* Top accent line */
        .re-form-panel::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(196,162,96,0.6) 40%, rgba(196,162,96,0.6) 60%, transparent);
        }

        .re-form-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 400px;
        }

        /* Mobile logo */
        .re-mobile-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 44px;
        }
        @media (min-width: 1024px) {
          .re-mobile-logo { display: none; }
        }
        .re-mobile-logo-icon {
          width: 28px; height: 28px;
          border: 1px solid rgba(196,162,96,0.6);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(45deg);
        }
        .re-mobile-logo-inner { width: 10px; height: 10px; background: rgba(196,162,96,0.8); }
        .re-mobile-logo-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 16px; font-weight: 500;
          letter-spacing: 0.12em; color: rgba(255,255,255,0.88);
          text-transform: uppercase;
        }

        .re-form-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 34px;
          font-weight: 400;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .re-form-subheading {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.05em;
          margin-bottom: 40px;
        }

        .re-field {
          margin-bottom: 22px;
        }
        .re-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 8px;
          transition: color 0.2s;
        }
        .re-field.focused .re-label {
          color: rgba(196,162,96,0.85);
        }

        .re-input-wrap {
          position: relative;
        }
        .re-input-line {
          position: absolute;
          bottom: 0; left: 0;
          height: 1.5px;
          width: 0%;
          background: linear-gradient(90deg, rgba(196,162,96,0.9), rgba(196,162,96,0.4));
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .re-field.focused .re-input-line {
          width: 100%;
        }

        .re-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-bottom: none;
          border-radius: 4px 4px 0 0;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #fff;
          outline: none;
          transition: background 0.2s, border-color 0.2s;
          letter-spacing: 0.02em;
        }
        .re-input::placeholder { color: rgba(255,255,255,0.2); }
        .re-input:focus {
          background: rgba(196,162,96,0.05);
          border-color: rgba(196,162,96,0.2);
        }

        .re-error {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          padding: 12px 14px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 4px;
          font-size: 13px;
          color: #fca5a5;
          letter-spacing: 0.02em;
          animation: re-shake 0.3s ease;
        }
        @keyframes re-shake {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        .re-submit {
          width: 100%;
          height: 50px;
          background: linear-gradient(135deg, rgba(196,162,96,0.92) 0%, rgba(176,140,72,0.92) 100%);
          border: none;
          border-radius: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0c0f14;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s, transform 0.15s;
          margin-bottom: 28px;
        }
        .re-submit:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .re-submit:active:not(:disabled) { transform: translateY(0); }
        .re-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .re-submit-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.25) 50%,
            transparent 70%
          );
          transform: translateX(-100%);
          animation: re-shimmer 2.4s infinite;
        }
        @keyframes re-shimmer {
          0% { transform: translateX(-100%); }
          60%,100% { transform: translateX(200%); }
        }
        .re-submit:disabled .re-submit-shimmer { display: none; }

        .re-submit-loader {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .re-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(12,15,20,0.3);
          border-top-color: #0c0f14;
          border-radius: 50%;
          animation: re-spin 0.7s linear infinite;
        }
        @keyframes re-spin { to { transform: rotate(360deg); } }

        .re-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .re-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .re-divider-text {
          font-size: 11px;
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.08em;
        }

        .re-help {
          padding: 16px 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 4px;
        }
        .re-help-title {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(196,162,96,0.65);
          margin-bottom: 6px;
        }
        .re-help-text {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          line-height: 1.5;
        }

        .re-footer {
          margin-top: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 11px;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.08em;
        }
        .re-footer-dot { color: rgba(196,162,96,0.4); }

        /* Entrance animation */
        .re-form-inner { animation: re-fadein 0.6s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes re-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}),(0,b.jsxs)("div",{className:"rе-root",children:[(0,b.jsxs)("div",{className:"re-image-panel",children:[(0,b.jsx)("div",{className:"re-image-bg"}),(0,b.jsx)("div",{className:"re-image-overlay"}),(0,b.jsxs)("div",{className:"re-image-content",children:[(0,b.jsxs)("div",{className:"re-logo-mark",children:[(0,b.jsx)("div",{className:"re-logo-icon",children:(0,b.jsx)("div",{className:"re-logo-icon-inner"})}),(0,b.jsx)("span",{className:"re-logo-text",children:"Real Estate "})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{className:"re-tagline",children:["Precision in",(0,b.jsx)("br",{}),(0,b.jsx)("em",{children:"every"})," acquisition."]}),(0,b.jsx)("div",{className:"re-tagline-sub",children:"Institutional-grade underwriting tools for commercial real estate professionals."}),(0,b.jsxs)("div",{className:"re-stats",style:{marginTop:40},children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"re-stat-value",children:"$4.2B"}),(0,b.jsx)("div",{className:"re-stat-label",children:"Assets Analyzed"})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"re-stat-value",children:"1,400+"}),(0,b.jsx)("div",{className:"re-stat-label",children:"Deals Underwritten"})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"re-stat-value",children:"99.8%"}),(0,b.jsx)("div",{className:"re-stat-label",children:"Uptime SLA"})]})]})]})]})]}),(0,b.jsx)("div",{className:"re-form-panel",children:(0,b.jsxs)("div",{className:"re-form-inner",children:[(0,b.jsxs)("div",{className:"re-mobile-logo",children:[(0,b.jsx)("div",{className:"re-mobile-logo-icon",children:(0,b.jsx)("div",{className:"re-mobile-logo-inner"})}),(0,b.jsx)("span",{className:"re-mobile-logo-text",children:"Real Estate"})]}),(0,b.jsx)("div",{className:"re-form-heading",children:"Welcome back"}),(0,b.jsx)("div",{className:"re-form-subheading",children:"Real Estate Underwriting System · Secure Access"}),(0,b.jsxs)("form",{onSubmit:q,children:[(0,b.jsxs)("div",{className:`re-field ${"email"===m?"focused":""}`,children:[(0,b.jsx)("label",{className:"re-label",htmlFor:"email",children:"Email Address"}),(0,b.jsxs)("div",{className:"re-input-wrap",children:[(0,b.jsx)("input",{id:"email",className:"re-input",type:"email",placeholder:"you@company.com",value:a,onChange:a=>f(a.target.value),onFocus:()=>n("email"),onBlur:()=>n(null),required:!0,autoComplete:"email"}),(0,b.jsx)("div",{className:"re-input-line"})]})]}),(0,b.jsxs)("div",{className:`re-field ${"password"===m?"focused":""}`,children:[(0,b.jsx)("label",{className:"re-label",htmlFor:"password",children:"Password"}),(0,b.jsxs)("div",{className:"re-input-wrap",children:[(0,b.jsx)("input",{id:"password",className:"re-input",type:"password",placeholder:"••••••••••••",value:g,onChange:a=>h(a.target.value),onFocus:()=>n("password"),onBlur:()=>n(null),required:!0,autoComplete:"current-password"}),(0,b.jsx)("div",{className:"re-input-line"})]})]}),i&&(0,b.jsxs)("div",{className:"re-error",children:[(0,b.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:[(0,b.jsx)("circle",{cx:"7",cy:"7",r:"6",stroke:"#fca5a5",strokeWidth:"1.2"}),(0,b.jsx)("path",{d:"M7 4v3.5M7 9.5v.5",stroke:"#fca5a5",strokeWidth:"1.2",strokeLinecap:"round"})]}),i]}),(0,b.jsxs)("button",{type:"submit",className:"re-submit",disabled:k,children:[(0,b.jsx)("div",{className:"re-submit-shimmer"}),k?(0,b.jsxs)("span",{className:"re-submit-loader",children:[(0,b.jsx)("span",{className:"re-spinner"}),"Authenticating…"]}):"Sign In to Platform"]})]}),(0,b.jsxs)("div",{className:"re-divider",children:[(0,b.jsx)("div",{className:"re-divider-line"}),(0,b.jsx)("span",{className:"re-divider-text",children:"Need access?"}),(0,b.jsx)("div",{className:"re-divider-line"})]}),(0,b.jsxs)("div",{className:"re-help",children:[(0,b.jsx)("div",{className:"re-help-title",children:"Credentials & Access"}),(0,b.jsx)("div",{className:"re-help-text",children:"Contact your system administrator to reset credentials or request access to this platform."})]}),(0,b.jsxs)("div",{className:"re-footer",children:[(0,b.jsx)("span",{children:"© 2026 Real Estate Group"}),(0,b.jsx)("span",{className:"re-footer-dot",children:"◆"}),(0,b.jsx)("span",{children:"Confidential"}),(0,b.jsx)("span",{className:"re-footer-dot",children:"◆"}),(0,b.jsx)("span",{children:"v2.4.1"})]})]})})]})]})}a.s(["default",()=>f])}];

//# sourceMappingURL=realestateandlease_app_login_page_tsx_965dc2d5._.js.map