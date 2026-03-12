import ActivityFeed from "./components/ActivityFeed";
import TaskList from "./components/TaskList";
import ProjectList from "./components/ProjectList";
import GitActivity from "./components/GitActivity";
import MessageInput from "./components/MessageInput";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      <MessageInput />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskList />
        <ActivityFeed />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectList />
        <GitActivity />
      </div>
    </div>
  );
}
