import { TaskList } from "../components/tasks/TaskList";

export default function Home() {
  return (
    <div>
      <div className="bg-black text-white items-center justify-center flex pt-5">
        Minhas tasks
      </div>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <TaskList />
      </div>
    </div>
  );
}
