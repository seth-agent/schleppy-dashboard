"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type Project = {
  _id: string;
  name: string;
  description: string;
  status: string;
  repoUrl?: string;
  createdAt: number;
  updatedAt: number;
};

const placeholderProjects: Project[] = [
  {
    _id: "1",
    name: "react-native-macos-official",
    description: "OOT React Native platform for macOS",
    status: "active",
    repoUrl: "https://github.com/user/react-native-macos",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "2",
    name: "specprint",
    description: "Thingiverse for software specs",
    status: "active",
    repoUrl: "https://github.com/user/specprint",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export default function ProjectList() {
  const convexProjects: Project[] | undefined = useQuery(api.projects.list);
  const projects: Project[] =
    convexProjects && convexProjects.length > 0
      ? convexProjects
      : placeholderProjects;

  return (
    <section data-testid="project-list" className="bg-card-bg border border-card-border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Projects</h2>
      <ul className="space-y-2">
        {projects.map((project: Project) => (
          <li
            key={project._id}
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
