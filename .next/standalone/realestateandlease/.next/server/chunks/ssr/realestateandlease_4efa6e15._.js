module.exports=[1122,(a,b,c)=>{"use strict";b.exports=a.r(99721).vendored["react-ssr"].ReactServerDOMTurbopackClient},19763,92716,a=>{"use strict";var b=a.i(93668);let c=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let e=(0,b.forwardRef)(({color:a="currentColor",size:e=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...d,width:e,height:e,stroke:a,strokeWidth:g?24*Number(f)/Number(e):f,className:c("lucide",h),...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),f=(a,d)=>{let f=(0,b.forwardRef)(({className:f,...g},h)=>(0,b.createElement)(e,{ref:h,iconNode:d,className:c(`lucide-${a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,f),...g}));return f.displayName=`${a}`,f};a.s(["default",()=>f],19763);let g=f("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);a.s(["FileText",()=>g],92716)},4429,a=>{"use strict";let b=(0,a.i(19763).default)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);a.s(["Trash2",()=>b],4429)},45501,48971,a=>{"use strict";var b=a.i(19763);let c=(0,b.default)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);a.s(["Search",()=>c],45501);let d=(0,b.default)("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);a.s(["Eye",()=>d],48971)},71492,a=>{"use strict";let b=(0,a.i(19763).default)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);a.s(["Calendar",()=>b],71492)},60145,a=>{"use strict";let b=(0,a.i(19763).default)("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);a.s(["MapPin",()=>b],60145)},9566,34417,a=>{"use strict";var b=a.i(19763);let c=(0,b.default)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);a.s(["ChevronLeft",()=>c],9566);let d=(0,b.default)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);a.s(["ChevronRight",()=>d],34417)},46484,a=>{"use strict";let b=(0,a.i(19763).default)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);a.s(["X",()=>b],46484)},43991,a=>{"use strict";var b=a.i(69297),c=a.i(93668),d=a.i(3762),e=a.i(7649),f=a.i(45501),g=a.i(60145),h=a.i(71492),i=a.i(48971),j=a.i(4429),k=a.i(17329),l=a.i(9566),m=a.i(34417),n=a.i(46484);function o(){let[a,o]=(0,c.useState)([]),[p,q]=(0,c.useState)(!0),[r,s]=(0,c.useState)(""),[t,u]=(0,c.useState)(null),[v,w]=(0,c.useState)(1),[x,y]=(0,c.useState)(null);(0,c.useEffect)(()=>{(async()=>{try{q(!0);let a=await fetch("/api/execution/properties");if(!a.ok)throw Error("Failed to fetch properties");let b=await a.json();o(Array.isArray(b)?b:b.data||[])}catch(a){u(a instanceof Error?a.message:"An error occurred")}finally{q(!1)}})()},[]);let z=async(b,c)=>{if(c.preventDefault(),c.stopPropagation(),confirm("Are you sure you want to delete this property?")){y(b);try{await fetch(`/api/execution/properties/${b}`,{method:"DELETE"}),o(a.filter(a=>a._id!==b))}catch{alert("Failed to delete property. Please try again.")}finally{y(null)}}},A=a.filter(a=>{let b=r.toLowerCase();return a.address?.toLowerCase().includes(b)||a.city?.toLowerCase().includes(b)||a.state?.toLowerCase().includes(b)||a.zipCode?.toLowerCase().includes(b)}),B=Math.ceil(A.length/9),C=(v-1)*9,D=A.slice(C,C+9);(0,c.useEffect)(()=>{w(1)},[r]);let E=a=>{w(a),window.scrollTo({top:0,behavior:"smooth"})};return(0,b.jsxs)(e.AdminLayout,{children:[(0,b.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .ex {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f8f9fb;
          padding: 36px 40px;
        }

        /* ── Page header ── */
        .ex-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 32px;
          gap: 16px;
        }
        .ex-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 30px;
          font-weight: 600;
          color: #111827;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }
        .ex-subtitle {
          font-size: 13px;
          font-weight: 300;
          color: #9ca3af;
          letter-spacing: 0.03em;
        }

        /* ── Stats bar ── */
        .ex-stats-bar {
          display: flex;
          gap: 16px;
          margin-bottom: 28px;
        }
        .ex-stat {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 16px 22px;
          position: relative;
          overflow: hidden;
          flex: 1;
          transition: box-shadow 0.15s;
        }
        .ex-stat:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
        .ex-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 10px 10px 0 0;
          background: linear-gradient(90deg, rgba(196,162,96,0.85), rgba(196,162,96,0.3));
        }
        .ex-stat-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 4px;
        }
        .ex-stat-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 600;
          color: #111827;
          line-height: 1;
        }
        .ex-stat-value.gold { color: #92700a; }
        .ex-stat-value.blue { color: #4f46e5; }

        /* ── Search + filter row ── */
        .ex-search-row {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          align-items: center;
        }
        .ex-search-wrap {
          position: relative;
          flex: 1;
        }
        .ex-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px; height: 16px;
          color: #9ca3af;
          pointer-events: none;
        }
        .ex-search {
          width: 100%;
          padding: 10px 14px 10px 40px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #111827;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ex-search::placeholder { color: #9ca3af; }
        .ex-search:focus {
          border-color: rgba(196,162,96,0.5);
          box-shadow: 0 0 0 3px rgba(196,162,96,0.08);
        }
        .ex-clear-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          display: flex; align-items: center; justify-content: center;
          padding: 2px;
          transition: color 0.12s;
        }
        .ex-clear-btn:hover { color: #374151; }
        .ex-clear-btn svg { width: 14px; height: 14px; }

        .ex-filter-count {
          font-size: 12px;
          color: #6b7280;
          white-space: nowrap;
          padding: 0 4px;
        }

        /* ── Error ── */
        .ex-error {
          margin-bottom: 20px;
          padding: 12px 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          font-size: 13px;
          color: #b91c1c;
        }

        /* ── Grid ── */
        .ex-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        /* Property card */
        .prop-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.15s, box-shadow 0.2s, transform 0.15s;
          position: relative;
        }
        .prop-card:hover {
          border-color: rgba(196,162,96,0.45);
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .prop-card.deleting {
          opacity: 0.5;
          pointer-events: none;
        }

        /* Card top accent */
        .prop-card-top {
          height: 3px;
          background: linear-gradient(90deg, rgba(196,162,96,0.7), rgba(196,162,96,0.15));
          flex-shrink: 0;
        }

        .prop-card-body {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Index number */
        .prop-index {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(196,162,96,0.6);
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }

        .prop-address {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
          line-height: 1.4;
          margin-bottom: 14px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .prop-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }
        .prop-meta-row {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          color: #6b7280;
          font-weight: 300;
        }
        .prop-meta-row svg { width: 12px; height: 12px; color: #9ca3af; flex-shrink: 0; }

        /* Action buttons */
        .prop-actions {
          display: flex;
          gap: 8px;
          padding: 14px 20px;
          border-top: 1px solid #f3f4f6;
          background: #fafafa;
        }
        .prop-view-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          background: rgba(196,162,96,0.08);
          border: 1px solid rgba(196,162,96,0.2);
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #92700a;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: background 0.15s, border-color 0.15s;
        }
        .prop-view-btn:hover {
          background: rgba(196,162,96,0.14);
          border-color: rgba(196,162,96,0.35);
        }
        .prop-view-btn svg { width: 13px; height: 13px; }

        .prop-del-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 10px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
          color: #9ca3af;
        }
        .prop-del-btn:hover {
          background: #fef2f2;
          border-color: #fecaca;
          color: #dc2626;
        }
        .prop-del-btn svg { width: 13px; height: 13px; }

        /* ── Skeleton ── */
        .skel {
          background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: skel 1.4s infinite;
          border-radius: 4px;
        }
        @keyframes skel { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        .prop-card-skel {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          padding: 20px;
        }
        .prop-card-skel-top { height: 3px; background: #f3f4f6; margin: -20px -20px 16px; }

        /* ── Empty state ── */
        .ex-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 64px 24px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
        }
        .ex-empty-icon {
          width: 56px; height: 56px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }
        .ex-empty-icon svg { width: 24px; height: 24px; color: #9ca3af; }
        .ex-empty-title { font-size: 15px; font-weight: 500; color: #374151; margin-bottom: 6px; }
        .ex-empty-sub { font-size: 13px; color: #9ca3af; font-weight: 300; }

        /* ── Pagination ── */
        .ex-pagination {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .ex-pagination-info {
          font-size: 12px;
          color: #6b7280;
          font-weight: 300;
        }
        .ex-pagination-info strong { color: #111827; font-weight: 500; }
        .ex-pagination-controls { display: flex; align-items: center; gap: 4px; }

        .pg-btn {
          min-width: 34px;
          height: 34px;
          padding: 0 8px;
          display: flex; align-items: center; justify-content: center;
          background: none;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.12s;
        }
        .pg-btn:hover:not(:disabled) {
          background: #f9fafb;
          border-color: rgba(196,162,96,0.35);
          color: #92700a;
        }
        .pg-btn.active {
          background: rgba(196,162,96,0.1);
          border-color: rgba(196,162,96,0.4);
          color: #92700a;
          font-weight: 500;
        }
        .pg-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .pg-btn svg { width: 14px; height: 14px; }
        .pg-ellipsis { padding: 0 4px; color: #9ca3af; font-size: 13px; }
      `}),(0,b.jsxs)("div",{className:"ex",children:[(0,b.jsx)("div",{className:"ex-header",children:(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"ex-title",children:"Property Executions"}),(0,b.jsx)("div",{className:"ex-subtitle",children:"Manage and monitor all properties in the execution pipeline"})]})}),(0,b.jsxs)("div",{className:"ex-stats-bar",children:[(0,b.jsxs)("div",{className:"ex-stat",children:[(0,b.jsx)("div",{className:"ex-stat-label",children:"Total Properties"}),(0,b.jsx)("div",{className:`ex-stat-value gold ${p?"skel":""}`,style:p?{height:28,width:48,display:"block"}:{},children:!p&&a.length})]}),(0,b.jsxs)("div",{className:"ex-stat",children:[(0,b.jsx)("div",{className:"ex-stat-label",children:"Filtered Results"}),(0,b.jsx)("div",{className:"ex-stat-value blue",children:p?"—":A.length!==a.length?A.length:"—"})]}),(0,b.jsxs)("div",{className:"ex-stat",children:[(0,b.jsx)("div",{className:"ex-stat-label",children:"Current Page"}),(0,b.jsx)("div",{className:"ex-stat-value",children:p?"—":`${v} / ${B||1}`})]})]}),(0,b.jsxs)("div",{className:"ex-search-row",children:[(0,b.jsxs)("div",{className:"ex-search-wrap",children:[(0,b.jsx)(f.Search,{className:"ex-search-icon"}),(0,b.jsx)("input",{type:"text",placeholder:"Search by address, city, state or zip code…",value:r,onChange:a=>s(a.target.value),className:"ex-search"}),r&&(0,b.jsx)("button",{className:"ex-clear-btn",onClick:()=>s(""),children:(0,b.jsx)(n.X,{})})]}),r&&!p&&(0,b.jsxs)("span",{className:"ex-filter-count",children:[A.length," result",1!==A.length?"s":""]})]}),t&&(0,b.jsx)("div",{className:"ex-error",children:t}),(0,b.jsx)("div",{className:"ex-grid",children:p?[...Array(9)].map((a,c)=>(0,b.jsxs)("div",{className:"prop-card-skel",children:[(0,b.jsx)("div",{className:"prop-card-skel-top"}),(0,b.jsx)("div",{className:"skel",style:{height:10,width:60,marginBottom:12}}),(0,b.jsx)("div",{className:"skel",style:{height:16,marginBottom:6}}),(0,b.jsx)("div",{className:"skel",style:{height:16,width:"70%",marginBottom:20}}),(0,b.jsx)("div",{className:"skel",style:{height:12,width:"80%",marginBottom:8}}),(0,b.jsx)("div",{className:"skel",style:{height:12,width:"55%",marginBottom:20}}),(0,b.jsx)("div",{className:"skel",style:{height:34,borderRadius:6}})]},c)):0===A.length?(0,b.jsxs)("div",{className:"ex-empty",children:[(0,b.jsx)("div",{className:"ex-empty-icon",children:r?(0,b.jsx)(f.Search,{}):(0,b.jsx)(k.Home,{})}),(0,b.jsx)("div",{className:"ex-empty-title",children:r?"No properties match your search":"No properties yet"}),(0,b.jsx)("div",{className:"ex-empty-sub",children:r?"Try adjusting your search terms":"Properties added to the execution pipeline will appear here"})]}):D.map((a,c)=>(0,b.jsxs)("div",{className:`prop-card ${x===a._id?"deleting":""}`,children:[(0,b.jsx)("div",{className:"prop-card-top"}),(0,b.jsxs)("div",{className:"prop-card-body",children:[(0,b.jsx)("div",{className:"prop-address",children:a.address||"Address not specified"}),(0,b.jsxs)("div",{className:"prop-meta",children:[(0,b.jsxs)("div",{className:"prop-meta-row",children:[(0,b.jsx)(g.MapPin,{}),[a.city,a.state,a.zipCode].filter(Boolean).join(", ")||"Location not specified"]}),a.createdAt&&(0,b.jsxs)("div",{className:"prop-meta-row",children:[(0,b.jsx)(h.Calendar,{}),new Date(a.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})]})]})]}),(0,b.jsxs)("div",{className:"prop-actions",children:[(0,b.jsxs)(d.default,{href:`/execution/${a._id}`,className:"prop-view-btn",children:[(0,b.jsx)(i.Eye,{}),"View Details"]}),(0,b.jsx)("button",{onClick:b=>z(a._id,b),className:"prop-del-btn",title:"Delete property",children:(0,b.jsx)(j.Trash2,{})})]})]},a._id))}),!p&&B>1&&(0,b.jsxs)("div",{className:"ex-pagination",children:[(0,b.jsxs)("div",{className:"ex-pagination-info",children:["Showing ",(0,b.jsx)("strong",{children:C+1}),"–",(0,b.jsx)("strong",{children:Math.min(C+9,A.length)})," of ",(0,b.jsx)("strong",{children:A.length})," properties"]}),(0,b.jsxs)("div",{className:"ex-pagination-controls",children:[(0,b.jsx)("button",{className:"pg-btn",onClick:()=>E(v-1),disabled:1===v,children:(0,b.jsx)(l.ChevronLeft,{})}),(()=>{let a=[];if(B<=5)for(let b=1;b<=B;b++)a.push(b);else v<=3?a.push(1,2,3,4,"...",B):v>=B-2?a.push(1,"...",B-3,B-2,B-1,B):a.push(1,"...",v-1,v,v+1,"...",B);return a})().map((a,c)=>"..."===a?(0,b.jsx)("span",{className:"pg-ellipsis",children:"…"},`e-${c}`):(0,b.jsx)("button",{className:`pg-btn ${v===a?"active":""}`,onClick:()=>E(a),children:a},a)),(0,b.jsx)("button",{className:"pg-btn",onClick:()=>E(v+1),disabled:v===B,children:(0,b.jsx)(m.ChevronRight,{})})]})]})]})]})}a.s(["default",()=>o])}];

//# sourceMappingURL=realestateandlease_4efa6e15._.js.map