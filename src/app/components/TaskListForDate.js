// --- TaskListForDate.js ---
"use client";

export default function TaskListForDate({ date, personalTasks, sharedTasks }) {
  const allTasks = [...personalTasks, ...sharedTasks].filter(t => t.date === date);

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Tasks for {date}:</h3>
      <ul className="list-disc list-inside space-y-1">
        {allTasks.length > 0 ? allTasks.map((task, idx) => (
          <li key={idx} className={task.completed ? "line-through text-gray-400" : ""}>{task.text}</li>
        )) : <p className="text-sm text-gray-500">No tasks scheduled.</p>}
      </ul>
    </div>
  );
}