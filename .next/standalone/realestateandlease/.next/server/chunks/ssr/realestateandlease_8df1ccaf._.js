module.exports=[1122,(a,b,c)=>{"use strict";b.exports=a.r(99721).vendored["react-ssr"].ReactServerDOMTurbopackClient},19763,92716,a=>{"use strict";var b=a.i(93668);let c=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let e=(0,b.forwardRef)(({color:a="currentColor",size:e=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...d,width:e,height:e,stroke:a,strokeWidth:g?24*Number(f)/Number(e):f,className:c("lucide",h),...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),f=(a,d)=>{let f=(0,b.forwardRef)(({className:f,...g},h)=>(0,b.createElement)(e,{ref:h,iconNode:d,className:c(`lucide-${a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,f),...g}));return f.displayName=`${a}`,f};a.s(["default",()=>f],19763);let g=f("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);a.s(["FileText",()=>g],92716)},15913,a=>{"use strict";let b=(0,a.i(19763).default)("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);a.s(["TrendingUp",()=>b],15913)},68698,a=>{"use strict";let b=(0,a.i(19763).default)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);a.s(["Clock",()=>b],68698)},71492,a=>{"use strict";let b=(0,a.i(19763).default)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);a.s(["Calendar",()=>b],71492)},60145,a=>{"use strict";let b=(0,a.i(19763).default)("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);a.s(["MapPin",()=>b],60145)},49686,a=>{"use strict";var b=a.i(69297),c=a.i(7649),d=a.i(93668),e=a.i(70838),f=a.i(19763);let g=(0,f.default)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);var h=a.i(60145),i=a.i(71492),j=a.i(15913),k=a.i(68698);let l=(0,f.default)("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);var m=a.i(3762);function n(){let[a,f]=(0,d.useState)([]),[n,o]=(0,d.useState)(!0),[p,q]=(0,d.useState)(null),r=async()=>{o(!0),q(null);try{let a=await fetch("/api/execution/properties");if(!a.ok)throw Error("Failed to fetch properties");let b=await a.json();f(Array.isArray(b)?b:b.data||[])}catch(a){q(a instanceof Error?a.message:"Failed to load")}finally{o(!1)}};(0,d.useEffect)(()=>{r()},[]);let s=a.length,t=[...a].sort((a,b)=>new Date(b.createdAt??0).getTime()-new Date(a.createdAt??0).getTime()).slice(0,5),u=new Date(Date.now()-6048e5),v=new Date(Date.now()-2592e6),w=a.filter(a=>a.createdAt&&new Date(a.createdAt)>=u).length,x=a.filter(a=>a.createdAt&&new Date(a.createdAt)>=v).length;return Object.entries(a.reduce((a,b)=>{let c=b.state?.trim()||"Unknown";return a[c]=(a[c]||0)+1,a},{})).sort((a,b)=>b[1]-a[1]).slice(0,4),(0,b.jsxs)(c.AdminLayout,{children:[(0,b.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .dash { font-family: 'DM Sans', sans-serif; min-height: 100vh; background: #f8f9fb; padding: 36px 40px; }

        .dash-header { margin-bottom: 32px; display: flex; align-items: flex-start; justify-content: space-between; }
        .dash-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 30px; font-weight: 600; color: #111827; margin-bottom: 4px; letter-spacing: -0.01em; }
        .dash-subtitle { font-size: 13px; font-weight: 300; color: #9ca3af; letter-spacing: 0.03em; }

        .refresh-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; color: #6b7280; cursor: pointer; transition: all 0.15s; }
        .refresh-btn:hover { border-color: rgba(196,162,96,0.4); color: #92700a; }
        .refresh-btn svg { width: 13px; height: 13px; }
        .refresh-btn.spinning svg { animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Section label */
        .dash-section-label { font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #9ca3af; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
        .dash-section-label::after { content: ''; flex: 1; height: 1px; background: #e5e7eb; }

        /* Stat cards */
        .dash-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }

        .stat-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 22px 24px; position: relative; overflow: hidden; transition: box-shadow 0.15s, border-color 0.15s; }
        .stat-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); border-color: #d1d5db; }
        .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 10px 10px 0 0; }
        .stat-card.gold::before  { background: linear-gradient(90deg, rgba(196,162,96,0.9), rgba(196,162,96,0.35)); }
        .stat-card.green::before { background: linear-gradient(90deg, rgba(34,197,94,0.8), rgba(34,197,94,0.25)); }
        .stat-card.blue::before  { background: linear-gradient(90deg, rgba(99,102,241,0.8), rgba(99,102,241,0.25)); }
        .stat-card.slate::before { background: linear-gradient(90deg, rgba(100,116,139,0.8), rgba(100,116,139,0.25)); }

        .stat-icon-wrap { width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .stat-icon-wrap.gold  { background: rgba(196,162,96,0.1); }
        .stat-icon-wrap.green { background: rgba(34,197,94,0.1); }
        .stat-icon-wrap.blue  { background: rgba(99,102,241,0.1); }
        .stat-icon-wrap.slate { background: rgba(100,116,139,0.1); }
        .stat-icon-wrap svg { width: 18px; height: 18px; }
        .stat-icon-wrap.gold  svg { color: #b8943a; }
        .stat-icon-wrap.green svg { color: #16a34a; }
        .stat-icon-wrap.blue  svg { color: #6366f1; }
        .stat-icon-wrap.slate svg { color: #64748b; }

        .stat-label { font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #9ca3af; margin-bottom: 6px; }
        .stat-value { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 38px; font-weight: 600; letter-spacing: -0.02em; line-height: 1; margin-bottom: 8px; color: #111827; }
        .stat-value.gold  { color: #92700a; }
        .stat-value.green { color: #15803d; }
        .stat-value.blue  { color: #4f46e5; }
        .stat-value.slate { color: #475569; }
        .stat-sub { font-size: 12px; font-weight: 300; color: #9ca3af; }

        /* Skeleton pulse */
        .skel { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: skel-anim 1.4s infinite; border-radius: 4px; }
        @keyframes skel-anim { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* Mid row */
        .dash-mid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }

        /* Property CTA dark card */
        .property-cta-card { background: #111827; border-radius: 10px; padding: 32px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; min-height: 200px; }
        .property-cta-card::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(196,162,96,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(196,162,96,0.05) 1px, transparent 1px); background-size: 32px 32px; }
        .property-cta-card::after { content: ''; position: absolute; top: -40px; right: -40px; width: 160px; height: 160px; background: radial-gradient(circle, rgba(196,162,96,0.2) 0%, transparent 70%); pointer-events: none; }
        .cta-label { font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(196,162,96,0.7); margin-bottom: 8px; position: relative; z-index: 1; }
        .cta-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 26px; font-weight: 500; color: #fff; margin-bottom: 6px; position: relative; z-index: 1; line-height: 1.2; }
        .cta-sub { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.38); margin-bottom: 24px; position: relative; z-index: 1; }
        .cta-count { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 42px; font-weight: 600; color: rgba(196,162,96,0.9); line-height: 1; position: relative; z-index: 1; }
        .cta-count-label { font-size: 11px; color: rgba(255,255,255,0.3); letter-spacing: 0.06em; position: relative; z-index: 1; margin-bottom: 20px; }
        .cta-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: rgba(196,162,96,0.9); border: none; border-radius: 6px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #111827; text-decoration: none; cursor: pointer; transition: background 0.15s, transform 0.12s; position: relative; z-index: 1; width: fit-content; }
        .cta-btn:hover { background: rgba(196,162,96,1); transform: translateY(-1px); }
        .cta-btn svg { width: 14px; height: 14px; }

        /* State breakdown card */
        .breakdown-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 28px; }
        .breakdown-title { font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        .breakdown-title svg { width: 14px; height: 14px; color: rgba(196,162,96,0.7); }
        .breakdown-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f9fafb; }
        .breakdown-row:last-child { border-bottom: none; }
        .breakdown-state { font-size: 13px; font-weight: 500; color: #374151; min-width: 80px; }
        .breakdown-bar-wrap { flex: 1; height: 5px; background: #f3f4f6; border-radius: 3px; overflow: hidden; }
        .breakdown-bar { height: 100%; border-radius: 3px; background: linear-gradient(90deg, rgba(196,162,96,0.85), rgba(196,162,96,0.35)); }
        .breakdown-count { font-size: 13px; font-weight: 600; color: #6b7280; min-width: 24px; text-align: right; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 17px; }
        .breakdown-empty { font-size: 13px; color: #9ca3af; text-align: center; padding: 24px 0; }

        /* Recent properties table */
        .activity-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .activity-head { padding: 20px 24px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; justify-content: space-between; }
        .activity-head-title { font-size: 13px; font-weight: 500; color: #374151; }
        .activity-head-sub { font-size: 11px; color: #9ca3af; margin-top: 2px; }
        .activity-view-all { font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #b8943a; text-decoration: none; display: flex; align-items: center; gap: 4px; transition: opacity 0.15s; }
        .activity-view-all:hover { opacity: 0.7; }
        .activity-view-all svg { width: 12px; height: 12px; }

        .activity-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 24px; border-bottom: 1px solid #f9fafb; transition: background 0.12s; }
        .activity-row:last-child { border-bottom: none; }
        .activity-row:hover { background: #fafafa; }

        .activity-left { display: flex; align-items: flex-start; gap: 12px; }
        .activity-icon-wrap { width: 34px; height: 34px; border-radius: 7px; background: rgba(196,162,96,0.08); border: 1px solid rgba(196,162,96,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .activity-icon-wrap svg { width: 15px; height: 15px; color: #b8943a; }
        .activity-addr { font-size: 13px; font-weight: 500; color: #111827; margin-bottom: 2px; }
        .activity-loc { font-size: 11px; color: #9ca3af; font-weight: 300; }

        .activity-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
        .activity-date { font-size: 11px; color: #9ca3af; display: flex; align-items: center; gap: 4px; }
        .activity-date svg { width: 11px; height: 11px; }

        .view-btn { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 500; color: #9ca3af; text-decoration: none; padding: 5px 10px; border-radius: 5px; border: 1px solid #e5e7eb; transition: all 0.12s; letter-spacing: 0.04em; }
        .view-btn:hover { border-color: rgba(196,162,96,0.4); color: #92700a; background: rgba(196,162,96,0.04); }
        .view-btn svg { width: 11px; height: 11px; }

        /* Empty / error state */
        .empty-state { text-align: center; padding: 48px 24px; }
        .empty-icon { width: 48px; height: 48px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
        .empty-icon svg { width: 22px; height: 22px; color: #9ca3af; }
        .empty-text { font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 4px; }
        .empty-sub { font-size: 12px; color: #9ca3af; }

        .error-banner { margin-bottom: 24px; padding: 12px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; font-size: 13px; color: #b91c1c; }
      `}),(0,b.jsxs)("div",{className:"dash",children:[(0,b.jsxs)("div",{className:"dash-header",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"dash-title",children:"Dashboard"}),(0,b.jsx)("div",{className:"dash-subtitle",children:"Overview of your real estate property portfolio"})]}),(0,b.jsxs)("button",{className:`refresh-btn ${n?"spinning":""}`,onClick:r,disabled:n,children:[(0,b.jsx)(l,{}),"Refresh"]})]}),p&&(0,b.jsx)("div",{className:"error-banner",children:p}),(0,b.jsx)("div",{className:"dash-section-label",children:"Portfolio Overview"}),(0,b.jsxs)("div",{className:"dash-stats",children:[(0,b.jsxs)("div",{className:"stat-card gold",children:[(0,b.jsx)("div",{className:"stat-icon-wrap gold",children:(0,b.jsx)(e.Building2,{})}),(0,b.jsx)("div",{className:"stat-label",children:"Total Properties"}),n?(0,b.jsx)("div",{className:"skel",style:{height:42,width:80,marginBottom:8}}):(0,b.jsx)("div",{className:"stat-value gold",children:s}),(0,b.jsx)("div",{className:"stat-sub",children:"In execution pipeline"})]}),(0,b.jsxs)("div",{className:"stat-card green",children:[(0,b.jsx)("div",{className:"stat-icon-wrap green",children:(0,b.jsx)(j.TrendingUp,{})}),(0,b.jsx)("div",{className:"stat-label",children:"Added This Week"}),n?(0,b.jsx)("div",{className:"skel",style:{height:42,width:60,marginBottom:8}}):(0,b.jsx)("div",{className:"stat-value green",children:w}),(0,b.jsx)("div",{className:"stat-sub",children:"Last 7 days"})]}),(0,b.jsxs)("div",{className:"stat-card blue",children:[(0,b.jsx)("div",{className:"stat-icon-wrap blue",children:(0,b.jsx)(i.Calendar,{})}),(0,b.jsx)("div",{className:"stat-label",children:"Added This Month"}),n?(0,b.jsx)("div",{className:"skel",style:{height:42,width:60,marginBottom:8}}):(0,b.jsx)("div",{className:"stat-value blue",children:x}),(0,b.jsx)("div",{className:"stat-sub",children:"Last 30 days"})]})]}),(0,b.jsx)("div",{className:"dash-section-label",children:"Property Management"}),(0,b.jsx)("div",{className:"",children:(0,b.jsxs)("div",{className:"property-cta-card",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"cta-label",children:"Execution Pipeline"}),(0,b.jsx)("div",{className:"cta-title",children:"Property Portfolio"}),(0,b.jsx)("div",{className:"cta-sub",children:"Search, filter and manage all properties under execution"}),n?(0,b.jsx)("div",{className:"skel",style:{height:42,width:80,marginBottom:4}}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"cta-count",children:s}),(0,b.jsx)("div",{className:"cta-count-label",children:"Total Properties"})]})]}),(0,b.jsxs)(m.default,{href:"/execution",className:"cta-btn",children:["View All Properties",(0,b.jsx)(g,{})]})]})}),(0,b.jsx)("div",{className:"dash-section-label",children:"Recent Properties"}),(0,b.jsxs)("div",{className:"activity-card",children:[(0,b.jsxs)("div",{className:"activity-head",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"activity-head-title",children:"Latest Additions"}),(0,b.jsx)("div",{className:"activity-head-sub",children:"5 most recently added properties"})]}),(0,b.jsxs)(m.default,{href:"/execution",className:"activity-view-all",children:["View all ",(0,b.jsx)(g,{})]})]}),n?(0,b.jsx)("div",{style:{padding:"16px 24px",display:"flex",flexDirection:"column",gap:12},children:[void 0,void 0,void 0,void 0,void 0].map((a,c)=>(0,b.jsx)("div",{className:"skel",style:{height:52}},c))}):0===t.length?(0,b.jsxs)("div",{className:"empty-state",children:[(0,b.jsx)("div",{className:"empty-icon",children:(0,b.jsx)(e.Building2,{})}),(0,b.jsx)("div",{className:"empty-text",children:"No properties yet"}),(0,b.jsx)("div",{className:"empty-sub",children:"Properties added to the execution pipeline will appear here"})]}):t.map(a=>(0,b.jsxs)("div",{className:"activity-row",children:[(0,b.jsxs)("div",{className:"activity-left",children:[(0,b.jsx)("div",{className:"activity-icon-wrap",children:(0,b.jsx)(h.MapPin,{})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"activity-addr",children:a.address||"Address not specified"}),(0,b.jsx)("div",{className:"activity-loc",children:[a.city,a.state,a.zipCode].filter(Boolean).join(", ")||"Location not specified"})]})]}),(0,b.jsxs)("div",{className:"activity-right",children:[a.createdAt&&(0,b.jsxs)("div",{className:"activity-date",children:[(0,b.jsx)(k.Clock,{}),new Date(a.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})]}),(0,b.jsxs)(m.default,{href:`/execution/${a._id}`,className:"view-btn",children:["Details ",(0,b.jsx)(j.TrendingUp,{})]})]})]},a._id))]})]})]})}a.s(["default",()=>n],49686)}];

//# sourceMappingURL=realestateandlease_8df1ccaf._.js.map