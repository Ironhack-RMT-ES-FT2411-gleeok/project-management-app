import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectPage() {

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ isFetching, setIsFetching ] = useState(true)

  const dynamicParams = useParams()

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_SERVER_URL}/projects/${dynamicParams.projectId}`)
    .then((response) => {
      console.log(response.data);
      setTitle(response.data.title)
      setDescription(response.data.description)
      setIsFetching(false) // ya tengo la data
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // ...updated logic should be here

    const updatedProject = {
      title,
      description
    }

    axios.put(`${import.meta.env.VITE_SERVER_URL}/projects/${dynamicParams.projectId}`, updatedProject)
    .then(() => {
      navigate(`/projects/${dynamicParams.projectId}`)
    })
    .catch((error) => {
      console.log(error)
    })

  };

  // const deleteProject = () => {
  //   // ...delete logic should be here

  //   axios.delete(`${import.meta.env.VITE_SERVER_URL}/projects/${dynamicParams.projectId}`)
  //   .then(() => {
  //     navigate("/projects")
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
    
  // }; 

  const deleteProject = async () => {
    // ...delete logic should be here

    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/projects/${dynamicParams.projectId}`)
      navigate("/projects")
    } catch (error) {
      console.log(error)
    }
    
  }; 

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isFetching}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isFetching}
        />

        <button type="submit" disabled={isFetching}>Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>      
    </div>
  );
}

export default EditProjectPage;
