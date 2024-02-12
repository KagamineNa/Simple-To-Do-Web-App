import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import Sidebar from "./components/SideBar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedPrID: undefined,
    projects: [],
    tasks: [],
  });
  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedPrID: null,
      };
    });
  }
  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedPrID: undefined,
        projects: [...prevState.projects, projectData],
      };
    });
  }
  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedPrID: undefined,
      };
    });
  }
  function handleSelectedProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedPrID: id,
      };
    });
  }
  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedPrID: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedPrID
        ),
      };
    });
  }
  function handleAddTask(newTask) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }
  function handleRemoveTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedPrID
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onRemoveTask={handleRemoveTask}
      tasks={projectState.tasks}
    />
  );
  if (projectState.selectedPrID === undefined)
    content = <NoProjectSelected onCreateNew={handleStartAddProject} />;
  else if (projectState.selectedPrID === null)
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancelProject={handleCancelAddProject}
      />
    );
  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onCreateNew={handleStartAddProject}
        projects={projectState.projects}
        onSelectedProject={handleSelectedProject}
        selectedProjectID={projectState.selectedPrID}
      />
      {content}
    </main>
  );
}

export default App;
