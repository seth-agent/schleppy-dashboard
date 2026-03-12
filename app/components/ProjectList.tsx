"use client";

import { Project } from "@/lib/supabase";

const placeholderProjects: Project[] = [
  {
    id: "1",
    name: "react-native-macos-official",
    description: "OOT React Native platform for macOS",
    status: "active",
    repo_url: "https://github.com/user/react-native-macos",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "specprint",
    description: "Thingiverse for software specs",
    status: "active",
    repo_url: "https://github.com/user/specprint",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function ProjectList() {
  return (
    <section data-testid="project-list" className="bg-card-bg border border-card-border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Projects</h2>
      <ul className="space-y-2">
        {placeholderProjects.map((project) => (
          <li
            key={project.id}
            className="p-3 rounded-md bg-background border border-card-border"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{project.name}</p>
              <span className="text-xs px-2 py-0.5 rounded bg-success text-background font-medium">
                {project.status}
              </span>
            </div>
            {project.description && (
              <p className="text-xs text-muted mt-1">{project.description}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
