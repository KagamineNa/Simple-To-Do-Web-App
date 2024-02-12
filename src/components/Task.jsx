import NewTask from "./NewTask.jsx";

export default function Task({ onAdd, onRemove, tasks, prjID }) {
  const tasksArr = tasks.filter((task) => task.projectID === prjID);
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} prjID={prjID} />

      {tasksArr.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet
        </p>
      )}
      {tasksArr.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasksArr.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button
                onClick={() => onRemove(task.id)}
                className="text-stone-700 hover:text-red-500"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

//projectID
