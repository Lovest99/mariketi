"use client";
/* eslint-disable @next/next/no-img-element */
// Mariketi 2027 responsive product-completion layer.

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  History,
  MapPin,
  MessageCircle,
  PackageCheck,
  Search,
  Settings,
  Tractor,
  Truck,
  UploadCloud,
  UserRound,
  Users,
  WalletCards,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { seedListings } from "@/data/seed";
import type { UserRole } from "@/domain/types";

type Go = (path: string) => void;

const publicLinks = [
  ["Buy livestock", "/marketplace"],
  ["Sell livestock", "/sell"],
  ["Collection centres", "/collection-centres"],
  ["Verification", "/verification"],
  ["How it works", "/how-it-works"],
] as const;

export function MobilePublicNavigation({
  go,
  openSearch,
  openNotifications,
  dark,
  toggleTheme,
}: {
  go: Go;
  openSearch: () => void;
  openNotifications: () => void;
  dark: boolean;
  toggleTheme: () => void;
}) {
  return (
    <div className="mobile-public-nav">
      <span className="eyebrow blue">Explore Mariketi</span>
      <nav aria-label="Mobile navigation">
        {publicLinks.map(([label, path]) => (
          <button key={path} onClick={() => go(path)}>
            <span>{label}</span>
            <ArrowRight />
          </button>
        ))}
      </nav>
      <div className="mobile-quick-actions">
        <button onClick={openSearch}><Search />Search</button>
        <button onClick={openNotifications}><MessageCircle />Updates</button>
        <button onClick={toggleTheme}>{dark ? <Activity /> : <Settings />}{dark ? "Light mode" : "Dark mode"}</button>
      </div>
      <Button className="orange wide" onClick={() => go("/sell")}>List livestock</Button>
      <Button variant="outline" className="wide" onClick={() => go("/app")}>Open workspace</Button>
    </div>
  );
}

export function SiteFooter({ go }: { go: Go }) {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <img src="/mariketi-logo.png" alt="Mariketi" />
        <p>Zimbabwe’s evidence-led livestock marketplace—connecting discovery, verification, transaction and accountable handover.</p>
        <span><BadgeCheck /> Built for trusted livestock commerce</span>
      </div>
      <div>
        <b>Marketplace</b>
        <button onClick={() => go("/marketplace")}>Browse livestock</button>
        <button onClick={() => go("/sell")}>Sell livestock</button>
        <button onClick={() => go("/collection-centres")}>Collection centres</button>
      </div>
      <div>
        <b>Trust & support</b>
        <button onClick={() => go("/verification")}>Verification standard</button>
        <button onClick={() => go("/safety")}>Safety centre</button>
        <button onClick={() => go("/help")}>Help centre</button>
      </div>
      <div>
        <b>Mariketi</b>
        <button onClick={() => go("/about")}>About</button>
        <button onClick={() => go("/terms")}>Terms</button>
        <button onClick={() => go("/privacy")}>Privacy</button>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Mariketi Zimbabwe. All rights reserved.</span>
        <span>Bulawayo · Harare · Nationwide</span>
      </div>
    </footer>
  );
}

const routeCopy: Record<string, { title: string; description: string; icon: typeof Search }> = {
  "/app/profile": { title: "Account & trust profile", description: "Manage your identity, contact details, preferences and verification standing.", icon: UserRound },
  "/app/verification-requests": { title: "Verification requests", description: "Track inspection requests from submission through evidence review.", icon: BadgeCheck },
  "/agent/sync": { title: "Offline sync centre", description: "Keep field evidence protected until a reliable connection is available.", icon: UploadCloud },
  "/agent/history": { title: "Inspection history", description: "Review completed visits, outcomes and evidence audit trails.", icon: History },
  "/operator/intake": { title: "Livestock intake", description: "Check arrivals against seller, animal and movement records.", icon: ClipboardCheck },
  "/operator/animals": { title: "Animals on site", description: "Search the current holding register and welfare status.", icon: Tractor },
  "/operator/handover": { title: "Handover queue", description: "Confirm buyer, transporter, condition and release evidence.", icon: PackageCheck },
  "/operator/issues": { title: "Centre issues", description: "Escalate welfare, document, identity and collection exceptions.", icon: AlertTriangle },
  "/transport/assignments": { title: "Today’s route", description: "Sequence pickups and handovers with the right documents at every stop.", icon: MapPin },
  "/transport/history": { title: "Delivery history", description: "Review completed journeys and proof of handover.", icon: Clock3 },
};

function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`status ${tone}`}>{children}</span>;
}

function SectionIntro({ path }: { path: string }) {
  const item = routeCopy[path];
  if (!item) return null;
  const Icon = item.icon;
  return <section className="route-intro"><div><Icon /></div><span className="eyebrow blue">Purpose-built workflow</span><h2>{item.title}</h2><p>{item.description}</p></section>;
}

function ProfileView() {
  return <><SectionIntro path="/app/profile"/><div className="profile-layout"><section className="panel profile-card"><div className="profile-avatar">TM</div><div><h3>Tariro Moyo</h3><p>Buyer · Bulawayo, Zimbabwe</p><StatusPill tone="clear"><Check/>Identity verified</StatusPill></div><Button variant="outline">Edit profile</Button></section><section className="panel"><h3>Account readiness</h3><div className="readiness-list"><span><Check/>Mobile number verified</span><span><Check/>Identity document verified</span><span><Check/>Marketplace terms accepted</span><span><AlertTriangle/>Add a preferred collection centre</span></div></section><section className="panel"><h3>Preferences</h3><label>Primary province<select defaultValue="Bulawayo"><option>Bulawayo</option><option>Midlands</option><option>Matabeleland South</option></select></label><label>Livestock interests<select defaultValue="Cattle"><option>Cattle</option><option>Goats</option><option>Sheep</option></select></label></section></div></>;
}

function VerificationRequests() {
  return <><SectionIntro path="/app/verification-requests"/><div className="workflow-list">{seedListings.slice(0,3).map((x,i)=><article key={x.id}><img src={x.image} alt=""/><div><small>{x.id} · Requested {i+1} day{i ? "s" : ""} ago</small><h3>{x.title}</h3><p>{x.location} · Field visit {i===0 ? "booked for tomorrow" : i===1 ? "awaiting assignment" : "evidence in review"}</p></div><StatusPill tone={i===0?"clear":i===2?"caution":"neutral"}>{i===0?"SCHEDULED":i===1?"QUEUED":"REVIEW"}</StatusPill><Button variant="outline">View</Button></article>)}</div></>;
}

function AgentRoute({ path }: { path: string }) {
  if (path === "/agent/sync") return <><SectionIntro path={path}/><div className="metrics"><div className="metric"><span>Queued evidence</span><b>7</b><small>28.4 MB protected locally</small></div><div className="metric"><span>Last successful sync</span><b>08:42</b><small>Today · Wi-Fi</small></div><div className="metric"><span>Connection</span><b>Good</b><small>Ready to upload</small></div><div className="metric"><span>Sync failures</span><b>0</b><small>No action needed</small></div></div><section className="panel sync-panel"><Wifi/><div><h3>All records are safe</h3><p>Evidence remains encrypted on this device until upload and server confirmation complete.</p></div><Button>Sync 7 records</Button></section><div className="workflow-list">{seedListings.slice(0,3).map((x,i)=><article key={x.id}><UploadCloud/><div><small>{x.id}</small><h3>{x.title}</h3><p>{["Photos and GPS","Ownership documents","Inspection observations"][i]}</p></div><StatusPill tone="neutral">QUEUED</StatusPill></article>)}</div></>;
  return <><SectionIntro path={path}/><div className="workflow-list">{seedListings.slice(0,4).map((x,i)=><article key={x.id}><FileCheck2/><div><small>{x.id} · {x.location}</small><h3>{x.title}</h3><p>Completed by R. Ncube · {22-i} Sep 2026</p></div><StatusPill tone={i===2?"caution":"clear"}>{i===2?"FOLLOW-UP":"COMPLETE"}</StatusPill><Button variant="outline">Evidence</Button></article>)}</div></>;
}

function OperatorRoute({ path }: { path: string }) {
  const configs: Record<string, [string,string,string][]> = {
    "/operator/intake": [["MK-24018","Brahman Bull","ARRIVING 09:30"],["MK-24017","Bonsmara Heifer","DOCUMENT CHECK"],["MK-24012","Mashona Cow","EXPECTED 13:00"]],
    "/operator/animals": [["MK-24018","Brahman Bull","PEN A04"],["MK-23998","Kalahari Red Goats","PEN G02"],["MK-23972","Dorper Ewes","PEN S01"]],
    "/operator/handover": [["TX-1048","Brahman Bull","BUYER DUE 14:00"],["TX-1022","Dorper Ewes","DRIVER VERIFIED"],["TX-0987","Kalahari Red Goats","READY TO RELEASE"]],
    "/operator/issues": [["IS-018","Movement permit mismatch","HIGH"],["IS-017","Collection overdue 18h","MEDIUM"],["IS-014","Identity review required","REVIEW"]],
  };
  const rows=configs[path]||configs["/operator/intake"];
  return <><SectionIntro path={path}/><div className="toolbar"><div><Search/><Input placeholder="Search reference, seller or animal"/></div><Button>{path.includes("issues")?"Report issue":path.includes("intake")?"Start intake":"Export register"}</Button></div><div className="workflow-list">{rows.map((x,i)=><article key={x[0]}><Building2/><div><small>{x[0]} · Gweru Livestock Exchange</small><h3>{x[1]}</h3><p>{i?"Evidence and custody record available":"Action required at centre desk"}</p></div><StatusPill tone={path.includes("issues")||i===0?"caution":"clear"}>{x[2]}</StatusPill><Button variant="outline">Open</Button></article>)}</div></>;
}

function TransportRoute({ path }: { path: string }) {
  if (path === "/transport/history") return <><SectionIntro path={path}/><div className="metrics"><div className="metric"><span>Completed trips</span><b>48</b></div><div className="metric"><span>On-time handovers</span><b>94%</b></div><div className="metric"><span>Distance</span><b>3,820 km</b></div><div className="metric"><span>Evidence complete</span><b>100%</b></div></div><div className="workflow-list">{seedListings.slice(0,3).map((x,i)=><article key={x.id}><Truck/><div><small>TR-{1048-i} · {18-i} Sep 2026</small><h3>{x.location} → Gweru</h3><p>{x.title} · Proof of handover secured</p></div><StatusPill tone="clear">COMPLETED</StatusPill><Button variant="outline">Receipt</Button></article>)}</div></>;
  return <><SectionIntro path={path}/><section className="route-map"><div><span className="eyebrow light">Live route</span><h3>Bulawayo → Gweru → Kwekwe</h3><p>3 stops · 184 km · Documents ready</p></div><Truck/></section><div className="workflow-list">{seedListings.slice(0,3).map((x,i)=><article key={x.id}><span className="route-number">{i+1}</span><div><small>{i===0?"PICKUP · 09:30":"HANDOVER · 13:00"}</small><h3>{x.seller}</h3><p>{x.location} · {x.title}</p></div><StatusPill tone={i===0?"caution":"neutral"}>{i===0?"EN ROUTE":"UPCOMING"}</StatusPill><Button>{i===0?"Update":"Details"}</Button></article>)}</div></>;
}

const adminConfig: Record<string,{title:string;description:string;icon:typeof Search;actions:string[]}>={
  users:{title:"User directory",description:"Identity, role, verification and marketplace access.",icon:Users,actions:["Verify identity","Suspend access"]},
  listings:{title:"Listing governance",description:"Review quality, verification and tradeability before exposure.",icon:Tractor,actions:["Review listing","Request evidence"]},
  verification:{title:"Verification operations",description:"Assign agents and protect inspection turnaround targets.",icon:BadgeCheck,actions:["Assign agent","Escalate"]},
  payments:{title:"Payment reconciliation",description:"Track protected funds, provider events and exceptions.",icon:WalletCards,actions:["Reconcile","Review event"]},
  disputes:{title:"Dispute casework",description:"Resolve evidence-led cases with a clear decision trail.",icon:AlertTriangle,actions:["Open case","Assign reviewer"]},
  configuration:{title:"Marketplace configuration",description:"Control policies, fees, verification rules and operating regions.",icon:Settings,actions:["Edit policy","Review changes"]},
  audit:{title:"Immutable audit log",description:"Trace high-impact actions across users, listings and transactions.",icon:Activity,actions:["Export log","View event"]},
};

function AdminModule({ path }: { path: string }) {
  const key=path.split("/").pop()||"users";
  const cfg=adminConfig[key]||adminConfig.users;
  const Icon=cfg.icon;
  return <><section className="admin-module-head"><div className="module-icon"><Icon/></div><div><span className="eyebrow blue">Operations module</span><h2>{cfg.title}</h2><p>{cfg.description}</p></div><Button>{cfg.actions[0]}</Button></section><div className="toolbar"><div><Search/><Input placeholder={`Search ${key}`}/></div><select><option>All statuses</option><option>Needs review</option><option>Verified</option></select><Button variant="outline">Export</Button></div><div className="refined-table" role="table" aria-label={cfg.title}><div role="row" className="table-head"><span>Reference</span><span>Record</span><span>Actor / location</span><span>Status</span><span>Updated</span><span></span></div>{seedListings.slice(0,4).map((x,i)=><div role="row" key={x.id}><span>{key.slice(0,3).toUpperCase()}-{24018-i}</span><span><b>{key==="users"?["Tariro Moyo","Farai Dube","Rudo Ncube","Tinashe Zhou"][i]:x.title}</b><small>{x.seller}</small></span><span>{x.location}</span><span><StatusPill tone={i===2?"caution":"clear"}>{i===2?"NEEDS REVIEW":"ACTIVE"}</StatusPill></span><span>{i*12+4} min ago</span><Button variant="outline">{cfg.actions[1]}</Button></div>)}</div></>;
}

export function RefinedWorkspace({ role, path }: { role: UserRole; path: string; go: Go }) {
  if (path === "/app/profile") return <ProfileView/>;
  if (path === "/app/verification-requests") return <VerificationRequests/>;
  if (role === "agent" && path !== "/agent") return <AgentRoute path={path}/>;
  if (role === "operator" && path !== "/operator") return <OperatorRoute path={path}/>;
  if (role === "transport" && path !== "/transport") return <TransportRoute path={path}/>;
  if (role === "admin" && adminConfig[path.split("/").pop()||""]) return <AdminModule path={path}/>;
  return null;
}

export const refinedPaths = new Set([
  "/app/profile","/app/verification-requests","/agent/sync","/agent/history",
  "/operator/intake","/operator/animals","/operator/handover","/operator/issues",
  "/transport/assignments","/transport/history","/admin/users","/admin/listings",
  "/admin/verification","/admin/payments","/admin/disputes","/admin/configuration","/admin/audit",
]);
