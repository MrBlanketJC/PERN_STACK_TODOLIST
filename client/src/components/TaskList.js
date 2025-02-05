import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  //Estado para las tareas
  const [tasks, setTasks] = useState([]);
  //Navegaciones
  const navigate = useNavigate();

  //funcion para traer los datos del BK usando async
  const loadTask = async () => {
    const response = await fetch("http://localhost:4000/tasks");
    const data = await response.json();
    // console.log(data)
    setTasks(data);
  };

  //Funcion para eliminar
  const handleDetele = async (id) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE"
      })
      // console.log(res)
  
      //Una vez eliminado del BK arriba, solo quitamos el elemento de la vista para evitar otra consulta al BK
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.log(error)
    }

  }

  //cuando el componente se carge
  useEffect(() => {
    //ejecutamos cuando cargue el componente/cargamos lo datos
    loadTask();
  }, []);

  return (
    <>
      <h1>Task List</h1>
      {tasks.map((task) => (
        <Card key={task.id} style={{
          marginBottom: ".7rem",
        }}>
          <CardContent style={{
            display:"flex",
            justifyContent:"space-between"
          }}>
            <div>
            <Typography>{task.title}</Typography>
            <Typography>{task.description}</Typography>
            </div>
            <div>
            <Button variant="contained" color="primary" onClick={() => navigate(`/tasks/${task.id}/edit`)} style={{marginRight:"1rem"}}>Edit</Button>
            <Button variant="contained" color="error" onClick={() => handleDetele(task.id)} >Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
