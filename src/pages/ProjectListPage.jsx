import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard"; // used to render each Project
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectListPage() {

  const [ projectsArr, setProjectsArr ] = useState([])

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_SERVER_URL}/projects`)
    .then((response) => {
      //console.log(response)
      setProjectsArr(response.data)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])
  
  return (
    <div className="ProjectListPage">

      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>     

      {/* ... list of all projects should be rendered here   */}
      {/* ... for each project, we should render one ProjectCard */}
      {projectsArr.map((eachProject) => {
        return <ProjectCard key={eachProject.id} eachProject={eachProject}/>
      })}
       
    </div>
  );
}

export default ProjectListPage;