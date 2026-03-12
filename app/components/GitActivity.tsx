"use client";

const placeholderCommits = [
  {
    id: "1",
    sha: "a1b2c3d",
    message: "feat: add spec validation endpoint",
    repo: "specprint",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "2",
    sha: "e4f5g6h",
    message: "fix: resolve macOS keyboard event handling",
    repo: "react-native-macos",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "3",
    sha: "i7j8k9l",
    message: "chore: update CI configuration",
    repo: "specprint",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
];

export default function GitActivity() {
  return (
    <section data-testid="git-activity" className="bg-card-bg border border-card-border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Git Activity</h2>
      <ul className="space-y-2">
        {placeholderCommits.map((commit) => (
          <li
            key={commit.id}
            className="flex items-start gap-3 p-3 rounded-md bg-background border border-card-border"
          >
            <code className="text-xs text-accent font-mono shrink-0 mt-0.5">
              {commit.sha}
            </code>
            <div className="min-w-0 flex-1">
              <p className="text-sm truncate">{commit.message}</p>
              <p className="text-xs text-muted">{commit.repo}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
