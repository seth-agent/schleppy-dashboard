"use client";

import { Task } from "@/lib/supabase";

const placeholderTasks: Task[] = [
  {
    id: "1",
    title: "Set up Schleppy Dashboard",
    description: "Create Next.js observability dashboard",
    status: "in_progress",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Review specprint PR #42",
    description: "Code review for spec validation changes",
    status: "queued",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Fix RN macOS build issue",
    description: "Investigate failing CI on main branch",
    status: "done",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const statusConfig: Record<Task["status"], { label: string; color: string }> = {
  queued: { label: "Queued", color: "bg-muted" },
  in_progress: { label: "In Progress", color: "bg-warning" },
  done: { label: "Done", color: "bg-success" },
};

export default function TaskList() {
  return (
    <section data-testid="task-list" className="bg-card-bg border border-card-border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Tasks</h2>
      <ul className="space-y-2">
        {placeholderTasks.map((task) => {
          const status = statusConfig[task.status];
          return (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 rounded-md bg-background border border-card-border"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{task.title}</p>
                {task.description && (
                  <p className="text-xs text-muted truncate">{task.description}</p>
                )}
              </div>
              <span
                className={`ml-3 shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-background ${status.color}`}
              >
                {status.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
