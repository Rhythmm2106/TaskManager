// Personal Tasks Component
const PersonalTasks = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [newTask, setNewTask] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = () => {
    if (newTask.trim() && newTaskDate) {
      onAddTask({
        id: Date.now(),
        text: newTask,
        date: newTaskDate,
        completed: false,
        type: 'personal'
      });
      setNewTask('');
      setNewTaskDate('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="mr-2 text-blue-600"><BookOpenIcon /></span>
          Personal Tasks
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
        >
          <PlusIcon />
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task..."
            className="w-full p-3 border border-blue-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            className="w-full p-3 border border-blue-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Task
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {tasks.filter(task => task.type === 'personal').map(task => (
          <div
            key={task.id}
            className={`p-4 rounded-lg border-l-4 transition-all ${
              task.completed 
                ? 'bg-green-50 border-green-500 opacity-75' 
                : 'bg-white border-blue-500 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className={`p-1 rounded-full transition-colors ${
                    task.completed 
                      ? 'bg-green-500 text-white' 
                      : 'border-2 border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {task.completed && <CheckIcon />}
                </button>
                <div>
                  <p className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.text}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <span className="mr-1"><ClockIcon /></span>
                    {new Date(task.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700 p-1 transition-colors"
              >
                <XIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};