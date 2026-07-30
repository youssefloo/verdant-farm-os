import Link from "next/link";

const features=[
  ["Livestock","A living profile for every animal: identity, health, weight, diet, output and history."],
  ["Workforce","People, responsibilities and daily tasks in one calm operational view."],
  ["Resources","Record water, electricity, feed, fuel and waste where they are consumed."],
  ["Finance","Track income and expenses without turning farm work into accounting work."],
  ["Analytics","See trends only after you record real measurements—never invented figures."],
  ["Automations","Define repeatable farm rules and keep every workflow understandable."],
];

export default function Landing(){return <main className="landing">
  <nav className="public-nav"><Link className="brand" href="/"><i>V</i> Verdant</Link><div><Link href="/help">Handbook</Link><Link href="/console?mode=login">Sign in</Link><Link className="button small" href="/console?mode=signup">Start free</Link></div></nav>
  <section className="hero"><p className="eyebrow">THE FARM OPERATING SYSTEM</p><h1>Your whole farm.<br/>Clearly managed.</h1><p>Verdant turns livestock, people, tasks, utilities and money into one simple daily workspace. It starts empty, then becomes the exact record of your operation.</p><div className="hero-actions"><Link className="button" href="/console?mode=signup">Create your farm</Link><Link className="text-link" href="/help">Read the handbook →</Link></div><div className="hero-window"><div className="window-head"><span>Today</span><b>Willow Creek Farm</b><em>All records current</em></div><div className="window-body"><aside><b>Overview</b><span>Livestock</span><span>Workforce</span><span>Resources</span><span>Finance</span></aside><article><small>Tuesday, July 29</small><h2>Good morning.</h2><p>Your setup guide is ready. Add your first real record to begin.</p><div className="preview-row"><b>1</b><span><strong>Register an animal</strong><small>Build livestock history from day one</small></span><button>Start</button></div><div className="preview-row"><b>2</b><span><strong>Add your team</strong><small>Assign work to the right people</small></span><button>Start</button></div></article></div></div></section>
  <section className="promise"><p className="eyebrow">BUILT FOR REAL OPERATIONS</p><h2>No demo numbers. No noisy control room.</h2><p>When there is no data, Verdant says so and shows the single best next action. When records exist, the same space becomes your live farm view.</p></section>
  <section className="feature-list">{features.map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
  <section className="how"><div><p className="eyebrow">FROM ZERO TO OPERATING</p><h2>Useful on the first day.<br/>More valuable every day after.</h2></div><ol><li><b>Create the farm</b><span>Choose the operation type and basic location.</span></li><li><b>Follow the setup guide</b><span>Add the animals, people and records you actually manage.</span></li><li><b>Run today</b><span>Assign tasks, record consumption and review real performance.</span></li></ol></section>
  <section className="final-cta"><h2>Start with an empty, honest workspace.</h2><p>Verdant is free to begin and designed to grow with your farm.</p><Link className="button light" href="/console?mode=signup">Create your account</Link></section>
  <footer><span>© 2026 Verdant Farm OS</span><Link href="/help">Complete handbook</Link><Link href="/console?mode=login">Sign in</Link></footer>
  </main>}
