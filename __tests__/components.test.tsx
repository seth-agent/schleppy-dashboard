import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ActivityFeed from "@/app/components/ActivityFeed";
import TaskList from "@/app/components/TaskList";
import ProjectList from "@/app/components/ProjectList";
import GitActivity from "@/app/components/GitActivity";
import MessageInput from "@/app/components/MessageInput";

// Mock convex/react hooks
vi.mock("convex/react", () => ({
  useQuery: () => undefined,
  useMutation: () => vi.fn(),
}));

afterEach(() => {
  cleanup();
});

describe("ActivityFeed", () => {
  it("renders the activity feed section", () => {
    render(<ActivityFeed />);
    expect(screen.getByTestId("activity-feed")).toBeInTheDocument();
    expect(screen.getByText("Activity Feed")).toBeInTheDocument();
  });

  it("renders placeholder activity entries", () => {
    render(<ActivityFeed />);
    expect(
      screen.getByText("Completed PR review for react-native-macos")
    ).toBeInTheDocument();
    expect(screen.getByText("New session started")).toBeInTheDocument();
  });
});

describe("TaskList", () => {
  it("renders the task list section", () => {
    render(<TaskList />);
    expect(screen.getByTestId("task-list")).toBeInTheDocument();
    expect(screen.getByText("Tasks")).toBeInTheDocument();
  });

  it("renders tasks with correct statuses", () => {
    render(<TaskList />);
    expect(
      screen.getByText("Set up Schleppy Dashboard")
    ).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Queued")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});

describe("ProjectList", () => {
  it("renders the project list section", () => {
    render(<ProjectList />);
    expect(screen.getByTestId("project-list")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders placeholder projects", () => {
    render(<ProjectList />);
    expect(
      screen.getByText("react-native-macos-official")
    ).toBeInTheDocument();
    expect(screen.getByText("specprint")).toBeInTheDocument();
  });
});

describe("GitActivity", () => {
  it("renders the git activity section", () => {
    render(<GitActivity />);
    expect(screen.getByTestId("git-activity")).toBeInTheDocument();
    expect(screen.getByText("Git Activity")).toBeInTheDocument();
  });

  it("renders placeholder commits with SHAs", () => {
    render(<GitActivity />);
    expect(screen.getByText("a1b2c3d")).toBeInTheDocument();
    expect(
      screen.getByText("feat: add spec validation endpoint")
    ).toBeInTheDocument();
  });
});

describe("MessageInput", () => {
  it("renders the message input section", () => {
    render(<MessageInput />);
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
    expect(screen.getByText("Send Task")).toBeInTheDocument();
  });

  it("renders input and submit button", () => {
    render(<MessageInput />);
    expect(
      screen.getByPlaceholderText(
        "Send a message or task to Schleppy..."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it("disables send button when input is empty", () => {
    render(<MessageInput />);
    const button = screen.getByText("Send");
    expect(button).toBeDisabled();
  });
});
