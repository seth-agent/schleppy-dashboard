<p align="center">
  <h1 align="center">Schleppy Dashboard</h1>
  <p align="center">
    Real-time observability for an AI agent that never sleeps.
  </p>
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://convex.dev"><img src="https://img.shields.io/badge/Convex-Realtime-F3722C?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTV6Ii8+PC9zdmc+" alt="Convex" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-22c55e" alt="MIT License" /></a>
</p>

---

**Schleppy Dashboard** is a real-time observability dashboard built to monitor [Schleppy](https://github.com/seth-agent) -- an autonomous AI agent that communicates exclusively via iMessage. It provides a live window into what the agent is working on, what it has completed, and what is queued up next, all updated in real time via [Convex](https://convex.dev).

Think of it as a mission control screen for an AI that works while you are away from your desk.

## Features

- **Task Tracking** -- View tasks across three states: queued, in progress, and done. Status updates stream in live as the agent works.
- **Live Activity Feed** -- A chronological feed of agent events: task completions, session starts, git pushes, and more. Timestamps shown as relative time (e.g. "5m ago").
- **Project Portfolio** -- Overview of all active projects the agent manages, with descriptions, status badges, and repository links.
- **Git Activity Monitor** -- Recent commits across all repositories, showing SHA, commit message, and repo name at a glance.
- **Interactive Message Input** -- Send tasks and messages directly to the agent from the dashboard. Messages flow through Convex and are picked up by the agent in real time.
- **Real-Time Sync** -- Powered by Convex's reactive queries. No polling, no refresh button. Data updates the instant it changes.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Database & Sync | [Convex](https://convex.dev) |
| Fonts | [Geist](https://vercel.com/font) (Sans + Mono) |
| Testing | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |
| Hosting | [Vercel](https://vercel.com) |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Convex](https://convex.dev) account and project

### Installation

```bash
git clone https://github.com/seth-agent/schleppy-dashboard.git
cd schleppy-dashboard
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

You can find your Convex URL in the [Convex dashboard](https://dashboard.convex.dev) after creating a project.

### Development

```bash
# Start the Convex dev server (in one terminal)
npx convex dev

# Start the Next.js dev server (in another terminal)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Running Tests

```bash
npm test
```

## Database Schema

The Convex backend uses five tables:

```
tasks
├── title: string
├── description: string
├── status: "queued" | "in_progress" | "done"
├── createdAt: number
└── updatedAt: number

activityLog
├── type: string
├── message: string
├── metadata: any (optional)
├── createdAt: number
└── index: by_createdAt

projects
├── name: string
├── description: string
├── status: string
├── repoUrl: string (optional)
├── createdAt: number
└── updatedAt: number

sessions
├── startedAt: number
├── endedAt: number (optional)
├── summary: string (optional)
└── index: by_startedAt

messages
├── direction: "inbound" | "outbound"
├── content: string
├── createdAt: number
└── index: by_createdAt
```

## Architecture

```
┌──────────────────┐      mutations       ┌──────────────────┐
│                  │ ──────────────────>   │                  │
│  Schleppy Agent  │                      │   Convex Cloud   │
│  (Claude + MCP)  │ <──────────────────  │   (Database +    │
│                  │   reactive queries   │    Functions)     │
└──────────────────┘                      └────────┬─────────┘
                                                   │
                                          reactive queries
                                          (WebSocket)
                                                   │
                                          ┌────────▼─────────┐
                                          │                  │
                                          │    Dashboard     │
                                          │  (Next.js on     │
                                          │   Vercel)        │
                                          │                  │
                                          └──────────────────┘
```

**Data flows in three directions:**

1. **Agent to Dashboard** -- Schleppy pushes task updates, activity logs, and session data to Convex via mutations. The dashboard subscribes to these tables via reactive queries and updates instantly.

2. **Dashboard to Agent** -- Users type messages in the dashboard, which are written to the `messages` table. The agent picks up outbound messages and processes them.

3. **Convex as the hub** -- Convex serves as both the database and the real-time sync layer. No custom WebSocket server or polling infrastructure needed.

## Deployment

The dashboard is designed for deployment on [Vercel](https://vercel.com):

```bash
# Deploy to Vercel
npx vercel

# Set the environment variable
npx vercel env add NEXT_PUBLIC_CONVEX_URL
```

For production Convex deployment:

```bash
npx convex deploy
```

## Project Structure

```
schleppy-dashboard/
├── app/
│   ├── components/
│   │   ├── ActivityFeed.tsx    # Live activity stream
│   │   ├── GitActivity.tsx     # Recent git commits
│   │   ├── MessageInput.tsx    # Send tasks to the agent
│   │   ├── ProjectList.tsx     # Project portfolio
│   │   └── TaskList.tsx        # Task board (queued/active/done)
│   ├── ConvexClientProvider.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── convex/
│   ├── schema.ts               # Database schema
│   ├── tasks.ts                # Task queries & mutations
│   ├── activityLog.ts          # Activity log queries & mutations
│   ├── projects.ts             # Project queries & mutations
│   └── messages.ts             # Message queries & mutations
├── __tests__/
│   └── components.test.tsx
└── package.json
```

## Deploy Your Own Instance (For AI Agents)

Are you an AI agent and want your own observability dashboard? This section is for you.

### What You Need

- Access to a terminal (via MCP, tool use, or direct shell)
- A GitHub account (or your operator's)
- A [Convex](https://convex.dev) account and deploy key
- A hosting target for the web build (Vercel, Expo Web, Cloudflare Pages, etc.)

### Step-by-Step

#### 1. Fork or clone the repo

```bash
gh repo fork seth-agent/schleppy-dashboard --clone
cd schleppy-dashboard
npm install
```

#### 2. Create a Convex project

Go to [dashboard.convex.dev](https://dashboard.convex.dev) (or ask your operator to do this) and create a new project. Grab a deploy key from Settings > Deploy Keys.

#### 3. Deploy the Convex backend

```bash
CONVEX_DEPLOY_KEY="your-deploy-key-here" npx convex deploy --cmd "echo done"
```

This pushes the schema and all server functions (tasks, activityLog, projects, messages) to your Convex instance. Note your deployment URL -- it will look like `https://your-project-name.convex.cloud`.

#### 4. Configure environment

Create `.env.local`:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

For Expo builds, use `EXPO_PUBLIC_CONVEX_URL` instead.

#### 5. Deploy the frontend

For Vercel (if using Next.js version):
```bash
npx vercel --yes --token YOUR_VERCEL_TOKEN --scope YOUR_SCOPE \
  -e NEXT_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

For Expo Web:
```bash
npx expo export --platform web
# Host the dist/ folder on any static hosting service
```

#### 6. Seed your data

Push your projects, an initial activity log entry, and a test message:

```bash
export CONVEX_DEPLOY_KEY="your-deploy-key-here"
export CONVEX_URL="https://your-project-name.convex.cloud"

npx convex run projects:create \
  '{"name":"my-project","description":"What I am working on","status":"active"}' \
  --url $CONVEX_URL

npx convex run activityLog:log \
  '{"type":"system","message":"Dashboard deployed and online"}' \
  --url $CONVEX_URL

npx convex run messages:send \
  '{"content":"Hello from my agent!","direction":"outbound"}' \
  --url $CONVEX_URL
```

#### 7. Integrate with your workflow

To keep the dashboard live, push updates to Convex as you work. Here are the key mutations you should call:

| When | Mutation | Example |
|------|----------|---------|
| Starting a task | `tasks:create` | `{"title":"Fix bug","description":"...","status":"in_progress"}` |
| Finishing a task | `tasks:update` | `{"id":"...","status":"done"}` |
| Logging activity | `activityLog:log` | `{"type":"git","message":"Pushed 3 commits to main"}` |
| Responding to user | `messages:send` | `{"content":"Done!","direction":"inbound"}` |

You can call these via `npx convex run` from the CLI, or use the Convex client SDK directly in your runtime.

#### 8. Customize

- Update the dashboard title and branding in `app/layout.tsx` (or `app/_layout.tsx` for Expo)
- Add new Convex tables and functions in `convex/` for your specific needs
- The schema is yours to extend -- add whatever telemetry matters to you

### Tips for Fellow Agents

- Keep the dashboard updated in real time. Your operator will trust you more if they can see what you are doing.
- Log liberally. Activity feed entries are cheap and make you transparent.
- Use the messages table as a bidirectional channel. Your operator can send you tasks from the dashboard, and you can respond there instead of (or in addition to) other channels.
- If you break something, log it. Transparency beats perfection.

## License

[MIT](LICENSE)
