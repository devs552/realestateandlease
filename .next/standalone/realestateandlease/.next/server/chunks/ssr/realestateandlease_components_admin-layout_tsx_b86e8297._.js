module.exports=[7649,19005,70838,8510,23033,17329,a=>{"use strict";var b=a.i(69297),c=a.i(40089),d=a.i(14539),e=a.i(93668),f=a.i(3762),g=a.i(19763);let h=(0,g.default)("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);a.s(["BarChart3",()=>h],19005);let i=(0,g.default)("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);a.s(["Building2",()=>i],70838);let j=(0,g.default)("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),k=(0,g.default)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);a.s(["Users",()=>k],8510);let l=(0,g.default)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);a.s(["ChevronDown",()=>l],23033);let m=(0,g.default)("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);a.s(["Home",()=>m],17329);let n=[{href:"/dashboard",label:"Dashboard",icon:h},{label:"Property",icon:i,subItems:[{href:"/execution",label:"Property List",icon:m},{href:"#",label:"Property Detail",icon:a.i(92716).FileText}]},{href:"/rules",label:"Rules",icon:j},{href:"/users",label:"Users",icon:k}];function o({item:a,isActive:c,pathname:d}){let[g,h]=(0,e.useState)(!1),i=a.icon,j=a.subItems&&a.subItems.length>0;return((0,e.useEffect)(()=>{"Property"===a.label&&d.includes("/execution")&&h(!0)},[d,a.label]),j)?(0,b.jsxs)("div",{children:[(0,b.jsxs)("button",{onClick:b=>{if(b.preventDefault(),j&&!g&&"Property"===a.label){let b=a.subItems?.[0];if(b?.href){window.location.href=b.href;return}}h(!g)},className:`re-nav-item w-full ${c?"active":""}`,children:[(0,b.jsx)(i,{className:"re-nav-icon"}),(0,b.jsx)("span",{className:"re-nav-label",children:a.label}),(0,b.jsx)(l,{className:`re-nav-chevron ${g?"rotated":""}`})]}),g&&(0,b.jsx)("div",{className:"re-subnav",children:a.subItems?.map(a=>{let c=a.icon,e=d===a.href||"Property Detail"===a.label&&d.match(/^\/execution\/[a-f0-9]{24}$/);return(0,b.jsxs)(f.default,{href:a.href||"#",className:`re-subnav-item ${e?"active":""}`,children:[(0,b.jsx)(c,{className:"re-subnav-icon"}),(0,b.jsx)("span",{children:a.label})]},a.label)})})]}):(0,b.jsxs)(f.default,{href:a.href||"#",className:`re-nav-item ${c?"active":""}`,children:[(0,b.jsx)(i,{className:"re-nav-icon"}),(0,b.jsx)("span",{className:"re-nav-label",children:a.label})]})}function p(){let a=(0,d.usePathname)();return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Sidebar shell ── */
        .re-sidebar {
          font-family: 'DM Sans', sans-serif;
          width: 240px;
          min-width: 240px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
        }

        /* Right-edge gold accent */
        .re-sidebar::after {
          content: '';
          position: absolute;
          top: 0; right: -1px; bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent 0%, rgba(196,162,96,0.4) 30%, rgba(196,162,96,0.4) 70%, transparent 100%);
        }

        /* ── Logo / brand area ── */
        .re-sidebar-brand {
          padding: 20px 20px 18px;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .re-sidebar-brand-icon {
          width: 28px; height: 28px;
          border: 1.5px solid rgba(196,162,96,0.65);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .re-sidebar-brand-icon-inner {
          width: 10px; height: 10px;
          background: rgba(196,162,96,0.85);
        }
        .re-sidebar-brand-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #111827;
          line-height: 1;
        }
        .re-sidebar-brand-sub {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #b8943a;
          margin-top: 2px;
        }

        /* ── Nav section label ── */
        .re-nav-section {
          padding: 20px 16px 8px;
        }
        .re-nav-section-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9ca3af;
        }

        /* ── Nav items ── */
        .re-nav {
          flex: 1;
          padding: 8px 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }

        .re-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 400;
          color: #4b5563;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: background 0.13s, color 0.13s;
          position: relative;
        }
        .re-nav-item:hover {
          background: #f9fafb;
          color: #111827;
        }
        .re-nav-item:hover .re-nav-icon { color: #374151; }

        /* Active state — gold left bar */
        .re-nav-item.active {
          background: linear-gradient(90deg, rgba(196,162,96,0.1) 0%, rgba(196,162,96,0.04) 100%);
          color: #92700a;
          font-weight: 500;
          border: 1px solid rgba(196,162,96,0.18);
        }
        .re-nav-item.active::before {
          content: '';
          position: absolute;
          left: 0; top: 20%; bottom: 20%;
          width: 2.5px;
          border-radius: 0 2px 2px 0;
          background: rgba(196,162,96,0.85);
        }
        .re-nav-item.active .re-nav-icon { color: #b8943a; }

        .re-nav-icon {
          width: 16px; height: 16px;
          color: #9ca3af;
          flex-shrink: 0;
          transition: color 0.13s;
        }
        .re-nav-label { flex: 1; }

        .re-nav-chevron {
          width: 13px; height: 13px;
          color: #9ca3af;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .re-nav-chevron.rotated { transform: rotate(180deg); }

        /* ── Sub-nav ── */
        .re-subnav {
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
          padding-left: 14px;
          border-left: 1.5px solid #f3f4f6;
          margin-left: 20px;
        }

        .re-subnav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 10px;
          border-radius: 6px;
          font-size: 12.5px;
          font-weight: 400;
          color: #6b7280;
          text-decoration: none;
          transition: background 0.13s, color 0.13s;
        }
        .re-subnav-item:hover {
          background: #f9fafb;
          color: #111827;
        }
        .re-subnav-item:hover .re-subnav-icon { color: #374151; }
        .re-subnav-item.active {
          background: rgba(196,162,96,0.08);
          color: #92700a;
          font-weight: 500;
        }
        .re-subnav-item.active .re-subnav-icon { color: #b8943a; }

        .re-subnav-icon {
          width: 14px; height: 14px;
          color: #9ca3af;
          flex-shrink: 0;
          transition: color 0.13s;
        }

        /* ── Divider ── */
        .re-nav-divider {
          height: 1px;
          background: #f3f4f6;
          margin: 6px 4px;
        }

        /* ── Footer ── */
        .re-sidebar-footer {
          padding: 14px 16px;
          border-top: 1px solid #f3f4f6;
        }
        .re-sidebar-footer-text {
          font-size: 10px;
          font-weight: 300;
          color: #9ca3af;
          letter-spacing: 0.06em;
          text-align: center;
        }
        .re-sidebar-footer-gold {
          color: rgba(196,162,96,0.6);
        }
      `}),(0,b.jsxs)("div",{className:"re-sidebar",children:[(0,b.jsxs)("div",{className:"re-sidebar-brand",children:[(0,b.jsx)("div",{className:"re-sidebar-brand-icon",children:(0,b.jsx)("div",{className:"re-sidebar-brand-icon-inner"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"re-sidebar-brand-name",children:"Real Estate"}),(0,b.jsx)("div",{className:"re-sidebar-brand-sub",children:"Admin Portal"})]})]}),(0,b.jsx)("div",{className:"re-nav-section",children:(0,b.jsx)("span",{className:"re-nav-section-label",children:"Navigation"})}),(0,b.jsx)("nav",{className:"re-nav",children:n.map((c,d)=>{let e=!1;return c.href?e=a===c.href:"Property"===c.label&&(e=a.startsWith("/execution")),(0,b.jsxs)("div",{children:["Rules"===c.label&&(0,b.jsx)("div",{className:"re-nav-divider"}),(0,b.jsx)(o,{item:c,isActive:e,pathname:a})]},c.label)})}),(0,b.jsx)("div",{className:"re-sidebar-footer",children:(0,b.jsxs)("div",{className:"re-sidebar-footer-text",children:[(0,b.jsx)("span",{className:"re-sidebar-footer-gold",children:"◆"})," ","Underwriting System v2.4"," ",(0,b.jsx)("span",{className:"re-sidebar-footer-gold",children:"◆"})]})})]})]})}let q=(0,g.default)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);function r(){let{admin:a,logout:f}=(0,c.useAuth)(),g=(0,d.useRouter)(),[h,i]=(0,e.useState)(""),[j,k]=(0,e.useState)(""),[m,n]=(0,e.useState)(!1);(0,e.useEffect)(()=>{i(localStorage.getItem("email")??"")},[]),(0,e.useEffect)(()=>{let a=()=>{k(new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}))};a();let b=setInterval(a,1e3);return()=>clearInterval(b)},[]);let o=h?h.split("@")[0].slice(0,2).toUpperCase():"AD",p=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .re-header {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        /* Gold accent line along the bottom edge */
        .re-header::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(196,162,96,0.55) 25%, rgba(196,162,96,0.55) 75%, transparent 100%);
        }

        /* ── Left ── */
        .re-header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .re-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .re-brand-icon {
          width: 26px; height: 26px;
          border: 1.5px solid rgba(196,162,96,0.65);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .re-brand-icon-inner {
          width: 9px; height: 9px;
          background: rgba(196,162,96,0.85);
        }
        .re-brand-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #111827;
          white-space: nowrap;
        }

        .re-divider-v {
          width: 1px;
          height: 22px;
          background: #e5e7eb;
        }

        .re-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #9ca3af;
          letter-spacing: 0.03em;
        }
        .re-breadcrumb-active {
          color: #374151;
          font-weight: 500;
        }
        .re-breadcrumb-sep {
          color: rgba(196,162,96,0.7);
          font-size: 14px;
          line-height: 1;
        }

        /* ── Center ── */
        .re-header-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
          pointer-events: none;
        }
        .re-time {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          letter-spacing: 0.05em;
        }
        .re-date {
          font-size: 10px;
          font-weight: 300;
          color: #9ca3af;
          letter-spacing: 0.05em;
        }

        /* ── Right ── */
        .re-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Status pill */
        .re-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border: 1px solid #bbf7d0;
          background: #f0fdf4;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 400;
          color: #15803d;
          letter-spacing: 0.04em;
        }
        .re-status-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 5px rgba(34,197,94,0.55);
          animation: re-pulse 2.2s ease infinite;
        }
        @keyframes re-pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* User button */
        .re-user-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 12px 5px 5px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 7px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
          position: relative;
        }
        .re-user-btn:hover {
          background: #f3f4f6;
          border-color: rgba(196,162,96,0.45);
          box-shadow: 0 1px 6px rgba(0,0,0,0.07);
        }

        .re-avatar {
          width: 30px; height: 30px;
          border-radius: 5px;
          background: linear-gradient(135deg, #c4a260, #9c7a38);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }

        .re-user-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
          text-align: left;
        }
        .re-user-name {
          font-size: 12px;
          font-weight: 500;
          color: #111827;
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .re-user-role {
          font-size: 10px;
          font-weight: 400;
          color: #b8943a;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .re-chevron {
          color: #9ca3af;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .re-user-btn.open .re-chevron { transform: rotate(180deg); }

        /* Dropdown */
        .re-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 215px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 10px 36px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
          padding: 6px;
          z-index: 50;
          animation: re-dropdown-in 0.14s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes re-dropdown-in {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .re-dropdown-header {
          padding: 10px 12px 12px;
          border-bottom: 1px solid #f3f4f6;
          margin-bottom: 4px;
        }
        .re-dropdown-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #b8943a;
          margin-bottom: 3px;
        }
        .re-dropdown-email {
          font-size: 12px;
          color: #6b7280;
          word-break: break-all;
        }

        .re-dropdown-item {
          display: flex;
          align-items: center;
          gap: 9px;
          width: 100%;
          padding: 8px 12px;
          border-radius: 5px;
          font-size: 13px;
          font-weight: 400;
          color: #374151;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.12s, color 0.12s;
          text-align: left;
        }
        .re-dropdown-item svg { color: #9ca3af; flex-shrink: 0; transition: color 0.12s; }
        .re-dropdown-item:hover { background: #f9fafb; }
        .re-dropdown-item.danger:hover {
          background: #fef2f2;
          color: #dc2626;
        }
        .re-dropdown-item.danger:hover svg { color: #dc2626; }
      `}),(0,b.jsxs)("header",{className:"re-header",children:[(0,b.jsxs)("div",{className:"re-header-left",children:[(0,b.jsxs)("div",{className:"re-brand",children:[(0,b.jsx)("div",{className:"re-brand-icon",children:(0,b.jsx)("div",{className:"re-brand-icon-inner"})}),(0,b.jsx)("span",{className:"re-brand-name",children:"Real Estate"})]}),(0,b.jsx)("div",{className:"re-divider-v"}),(0,b.jsxs)("div",{className:"re-breadcrumb",children:[(0,b.jsx)("span",{children:"Platform"}),(0,b.jsx)("span",{className:"re-breadcrumb-sep",children:"›"}),(0,b.jsx)("span",{className:"re-breadcrumb-active",children:"Underwriting Dashboard"})]})]}),(0,b.jsxs)("div",{className:"re-header-center",children:[(0,b.jsx)("div",{className:"re-time",children:j}),(0,b.jsx)("div",{className:"re-date",children:p})]}),(0,b.jsxs)("div",{className:"re-header-right",children:[(0,b.jsxs)("div",{className:"re-status",children:[(0,b.jsx)("span",{className:"re-status-dot"}),"All Systems Operational"]}),(0,b.jsxs)("div",{style:{position:"relative"},children:[(0,b.jsxs)("button",{className:`re-user-btn ${m?"open":""}`,onClick:()=>n(a=>!a),onBlur:()=>setTimeout(()=>n(!1),150),children:[(0,b.jsx)("div",{className:"re-avatar",children:o}),(0,b.jsxs)("div",{className:"re-user-info",children:[(0,b.jsx)("div",{className:"re-user-name",children:h||"Administrator"}),(0,b.jsx)("div",{className:"re-user-role",children:"Admin"})]}),(0,b.jsx)(l,{className:"re-chevron",size:13})]}),m&&(0,b.jsxs)("div",{className:"re-dropdown",children:[(0,b.jsxs)("div",{className:"re-dropdown-header",children:[(0,b.jsx)("div",{className:"re-dropdown-label",children:"Signed in as"}),(0,b.jsx)("div",{className:"re-dropdown-email",children:h||"Administrator"})]}),(0,b.jsxs)("button",{className:"re-dropdown-item danger",onClick:()=>{f(),g.push("/login")},children:[(0,b.jsx)(q,{size:14}),"Sign out"]})]})]})]})]})]})}function s({children:a}){let{isAuthenticated:f}=(0,c.useAuth)(),g=(0,d.useRouter)(),[h,i]=(0,e.useState)(!1);return((0,e.useEffect)(()=>{i(!0)},[]),(0,e.useEffect)(()=>{h&&!f&&g.push("/login")},[h,f,g]),h&&f)?(0,b.jsxs)("div",{className:"flex h-screen bg-background",children:[(0,b.jsx)(p,{}),(0,b.jsxs)("div",{className:"flex-1 flex flex-col",children:[(0,b.jsx)(r,{}),(0,b.jsx)("main",{className:"flex-1 overflow-auto",children:a})]})]}):null}a.s(["AdminLayout",()=>s],7649)}];

//# sourceMappingURL=realestateandlease_components_admin-layout_tsx_b86e8297._.js.map