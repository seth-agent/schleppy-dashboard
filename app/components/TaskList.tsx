"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type TaskStatus = "queued" | "in_progress" | "done";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: number;
  updatedAt: number;
};

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  queued: { label: "Queued", color: "bg-muted" },
  in_progress: { label: "In Progress", color: "bg-warning" },
  done: { label: "Done", color: "bg-success" },
};

const placeholderTasks: Task[] = [
  {
    _id: "1",
    title: "Set up Schleppy Dashboard",
    description: "Create Next.js observability dashboard",
    status: "in_progress",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "2",
    title: "Review specprint PR #42",
    description: "Code review for spec validation changes",
    status: "queued",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "3",
    title: "Fix RN macOS build issue",
    description: "Investigate failing CI on main branch",
    status: "done",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export default function TaskList() {
  const convexTasks: Task[] | undefined = useQuery(api.tasks.list);
  const tasks: Task[] = convexTasks && convexTasks.length > 0 ? convexTasks : placeholderTasks;

  return (
    <section data-testid="task-list" className="bg-card-bg border border-card-border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task: Task) => {
          const status = statusConfig[task.status];
          return (
            <li
              key={task._id}
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
