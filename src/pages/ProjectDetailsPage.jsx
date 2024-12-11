import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask"; // for rendering Task Add Form
import TaskCard from "../components/TaskCard"; // for rendering Task List
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectDetailsPage () {

  const [ project, setProject ] = useState(null)

  const dynamicParams = useParams()
  //console.log(dynamicParams)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/projects/${dynamicParams.projectId}?_embed=tasks`)
    .then((response) => {
      console.log(response.data)
      setProject(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  if (project === null) {
    return <h3>... buscando</h3>
  }
  
  return (
    <div className="ProjectDetailsPage">

      <div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>

      {/* ... list of all Tasks for this Project should be rendered here */}

      {/* example of a single TaskCard being rendered */}
      {/* <TaskCard /> */}
      {project.tasks.map((eachTask) => {
        return <TaskCard key={eachTask.id} eachTask={eachTask}/>
      })}

      {/* ... form for adding a new Task should be rendered here    */}
      <AddTask projectId={project.id} getData={getData}/>

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
      
      <Link to={`/projects/edit/${project.id}`}>
        <button>Edit Project</button>
      </Link>      
      
    </div>
  );
}

export default ProjectDetailsPage;
