export const notexSite = {
  name: "Notex",
  description: "AI meeting notes, transcripts, document summaries, and action items without a meeting bot.",
  url: import.meta.env.SITE ?? "https://notex.example",
  locale: "en-US",
  email: "hello@notex.example",
  navigation: [
    { label: "Features", href: "/features/" },
    { label: "Use cases", href: "/use-cases/" },
    { label: "Integrations", href: "/integrations/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "Resources", href: "/blog/" }
  ]
};

export const notexFeatures = [
  {
    slug: "meeting-notes",
    label: "Meeting notes",
    title: "Meeting notes that become work",
    description: "Capture the conversation, pull out decisions, and leave every meeting with a clear next step.",
    answer: "Notex records or imports a meeting, creates a readable transcript, summarizes the important context, and turns commitments into actionable tasks.",
    bullets: ["Structured summaries with decisions and open questions", "Action items grouped by owner and due date", "Searchable transcript with speaker context"],
    related: ["transcription", "document-summaries"]
  },
  {
    slug: "transcription",
    label: "Transcription",
    title: "Transcripts without a meeting bot",
    description: "Use the browser or upload audio when you need a transcript, without inviting another participant into the call.",
    answer: "Notex captures audio from the user's browser session or accepts a local audio file, so teams can create transcripts without a bot joining Google Meet or Zoom.",
    bullets: ["Works with browser-based calls", "Upload local audio and video files", "Keep the transcript connected to the source recording"],
    related: ["meeting-notes", "privacy"]
  },
  {
    slug: "document-summaries",
    label: "Document summaries",
    title: "Understand long documents faster",
    description: "Turn research, briefs, and customer documents into concise summaries with the source context intact.",
    answer: "Notex summarizes documents into key points, risks, questions, and recommended follow-ups while keeping the original document available for verification.",
    bullets: ["Summarize PDFs, notes, and uploaded files", "Ask follow-up questions against the source", "Keep citations and source links visible"],
    related: ["meeting-notes", "knowledge-work"]
  },
  {
    slug: "action-items",
    label: "Action items",
    title: "Turn transcript into a task list",
    description: "Make ownership visible before the conversation disappears into a chat thread.",
    answer: "Notex detects commitments and proposed work in a transcript, then presents each task with its owner, context, and suggested deadline.",
    bullets: ["Detect commitments and decisions", "Edit owners, deadlines, and wording", "Export tasks to the tools your team already uses"],
    related: ["meeting-notes", "integrations"]
  }
];

export const notexUseCases = [
  { slug: "sales-teams", label: "Sales teams", title: "Keep customer context after every call", description: "Give sales teams a consistent way to capture discovery, objections, next steps, and handoff notes.", proof: "Sales teams use Notex to reduce manual note-taking and keep follow-up grounded in the actual customer conversation.", features: ["Discovery call summaries", "Objection and requirement extraction", "CRM-ready follow-up notes"] },
  { slug: "remote-teams", label: "Remote teams", title: "Make distributed meetings easier to follow", description: "Create a dependable record of decisions for people who could not attend live.", proof: "Remote teams can catch up from a focused summary instead of replaying a full meeting recording.", features: ["Async meeting summaries", "Decision and dependency tracking", "Search across previous conversations"] },
  { slug: "research-teams", label: "Research teams", title: "Move from interviews to insight", description: "Organize interviews, notes, and source material so the team can compare patterns without losing nuance.", proof: "Research teams use source-linked summaries to move faster while preserving evidence for review.", features: ["Interview transcription", "Theme and insight extraction", "Source-linked evidence"] },
  { slug: "founders", label: "Founders and operators", title: "Spend less time recovering from meetings", description: "Keep decisions, risks, and follow-ups visible when you are moving between customers, product, and operations.", proof: "Operators get a lightweight system of record for the conversations that move the business forward.", features: ["Fast capture", "Decision log", "Weekly follow-up review"] },
  { slug: "knowledge-workers", label: "Knowledge workers", title: "Make every conversation searchable", description: "Build a personal knowledge layer from meetings, calls, and documents.", proof: "Knowledge workers use Notex to retrieve context instead of relying on memory or scattered notes.", features: ["Unified search", "Document Q&A", "Reusable summaries"] }
];

export const notexComparisons = [
  { slug: "meeting-bot", label: "Meeting bot", title: "Notex vs. a meeting bot", description: "A practical comparison for teams that want meeting notes without another participant in the call.", criteria: ["Capture model: browser or file input vs. bot participant", "Setup: install and start vs. invite and permission flow", "Context: transcript plus documents vs. meeting transcript only", "Privacy: capture stays with the user's workflow vs. another attendee in the room"] },
  { slug: "fireflies", label: "Fireflies alternative", title: "Notex vs. Fireflies", description: "Compare a browser-first note-taking workflow with a traditional meeting assistant.", criteria: ["No bot required for browser-based calls", "Meeting notes and document summaries in one workspace", "Transparent source context for follow-up", "Designed for teams that want less meeting overhead"] },
  { slug: "otter", label: "Otter alternative", title: "Notex vs. Otter", description: "Choose the workflow that best fits your team's recording, transcript, and action-item needs.", criteria: ["Capture conversations without adding a meeting participant", "Turn transcripts into tasks and decisions", "Summarize documents alongside meetings", "Connect output to existing team tools"] },
  { slug: "notion-ai", label: "Notion AI alternative", title: "Notex vs. Notion AI for meeting notes", description: "Understand when a dedicated capture workflow is more useful than a general workspace assistant.", criteria: ["Capture first, organize later", "Transcript-specific summaries", "Source-aware action items", "Works alongside your existing knowledge base"] }
];

export const notexIntegrations = [
  { slug: "google-meet", label: "Google Meet", title: "Capture Google Meet context without a bot", description: "Use the browser extension workflow to capture the conversation without adding another attendee.", status: "Available" },
  { slug: "zoom", label: "Zoom", title: "Keep Zoom follow-up in one place", description: "Bring meeting audio, transcripts, and action items into a searchable workflow.", status: "Available" },
  { slug: "notion", label: "Notion", title: "Send useful notes to Notion", description: "Move reviewed summaries and decisions into the workspace where your team already works.", status: "Coming soon" },
  { slug: "slack", label: "Slack", title: "Share the right follow-up in Slack", description: "Publish concise decisions and assigned tasks without dropping a full transcript into the channel.", status: "Coming soon" },
  { slug: "linear", label: "Linear", title: "Turn decisions into product work", description: "Create focused issue drafts from meeting commitments and product discussions.", status: "Coming soon" }
];

export const notexCustomers = [
  { slug: "northstar-ops", name: "Northstar Ops", industry: "Operations", title: "A searchable record for a distributed operations team", summary: "Northstar Ops replaced scattered follow-up notes with a shared decision and action-item workflow.", metrics: ["42% less manual note-taking", "2.1x faster weekly follow-up", "100% of decisions linked to source context"] },
  { slug: "fieldnotes-research", name: "Fieldnotes Research", industry: "Research", title: "From recorded interviews to evidence-backed themes", summary: "Fieldnotes Research uses Notex to move from interviews to comparable insight without losing the original evidence.", metrics: ["3 hours saved per research sprint", "100+ interviews searchable", "1 source of truth for synthesis"] },
  { slug: "orbit-sales", name: "Orbit Sales", industry: "B2B sales", title: "Better handoffs from discovery to delivery", summary: "Orbit Sales uses structured call summaries to keep customer requirements visible after the first conversation.", metrics: ["30% faster handoff", "Fewer repeated customer questions", "Clear owner on every follow-up"] }
];

export const notexFaq = [
  { question: "Does Notex require a meeting bot?", answer: "No. Notex is designed for browser-based capture and local file uploads, so teams can create notes without inviting a bot into Google Meet or Zoom." },
  { question: "What can Notex summarize?", answer: "Notex can summarize meetings, audio recordings, transcripts, PDFs, briefs, and other documents that you provide." },
  { question: "Can Notex create tasks from a transcript?", answer: "Yes. Notex identifies commitments and follow-ups, then presents them as editable action items with context and ownership." },
  { question: "Who is Notex for?", answer: "Notex is built for sales teams, remote teams, researchers, founders, operators, and knowledge workers who need reliable context from conversations and documents." },
  { question: "Does Notex replace my knowledge base?", answer: "Not necessarily. Notex focuses on capture, understanding, and follow-up. It can feed reviewed outputs into the knowledge tools your team already uses." }
];

export const notexBlog = [
  { slug: "ai-meeting-notes-without-meeting-bot", category: "Use case", title: "How to take AI meeting notes without a meeting bot", description: "Compare browser capture, file upload, and bot-based workflows for modern teams.", date: "2026-07-01", readTime: "7 min read" },
  { slug: "turn-transcript-into-tasks", category: "Workflow", title: "How to turn a transcript into useful action items", description: "A practical framework for extracting ownership, deadlines, decisions, and unresolved questions.", date: "2026-06-18", readTime: "6 min read" },
  { slug: "meeting-notes-for-sales-teams", category: "Sales", title: "What sales teams should capture from every discovery call", description: "A structured note template for customer goals, objections, requirements, and next steps.", date: "2026-06-03", readTime: "8 min read" },
  { slug: "summarize-local-audio-files", category: "Guide", title: "How to summarize local audio files with AI", description: "A clear workflow for turning recordings into searchable notes while keeping source context.", date: "2026-05-20", readTime: "5 min read" }
];
