"use client";

import { ActivityLogEntry } from "@/lib/supabase";

const placeholderActivities: ActivityLogEntry[] = [
  {
    id: "1",
    type: "task_completed",
    message: "Completed PR review for react-native-macos",
    metadata: null,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    type: "session_started",
    message: "New session started",
    metadata: null,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "3",
    type: "git_push",
    message: "Pushed 3 commits to specprint/main",
    metadata: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function ActivityFeed() {
  return (
    <section data-testid="activity-feed" className="bg-card-bg border border-card-border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Activity Feed</h2>
      <ul className="space-y-3">
        {placeholderActivities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-3">
            <span className="mt-1 w-2 h-2 rounded-full bg-accent shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm">{activity.message}</p>
              <p className="text-xs text-muted">{timeAgo(activity.created_at)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
