import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  //estado para recuperar datos del form
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  //estado para cargando
  const [loading, setLoading] = useState(false);
  //estado editar
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate(); //Para reornar a la lista
  const params = useParams(); //Para editar, parametros

  //Capturar el submit del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(task);//ver tareas
    setLoading(true);

    if (editing) {
      // const response = await fetch(`http://localhost:4000/tasks/${params.id}`,{
      await fetch(`http://localhost:4000/tasks/${params.id}`,{
        method: "PUT",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      // const data = await response.json();
      // console.log(data)
    } else {
      try {
        // Enviar datos a la API del backend
        // const res = await fetch("http://localhost:4000/tasks", {
        await fetch("http://localhost:4000/tasks", {
          method: "POST",
          body: JSON.stringify(task),
          headers: { "Content-Type": "application/json" },
        });
        //await res.json();
        //console.log(data); // Verifica la respuesta de la API        
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setLoading(false);
    navigate("/"); // Redirige a la página principal
  };

  //capturar el onchange del input
  const handleChange = (e) => {
    //console.log(e.target.name, e.target.value);

    //agregar contenido a cada input
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  //Cargar los daros por ID
  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`);
    const data = await res.json();
    // console.log(data)

    setTask({ title: data.title, description: data.description }); //agregar el value en los TextField
    setEditing(true);
  };
  //Para editar
  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  return (
    <Grid2
      container
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid2 size={3}>
        <Card sx={{ mt: 5 }} style={{ padding: "1rem" }}>
          <Typography variant="h5" textAlign={"center"}>
            { editing ? "Edit Task" : "Create Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                value={task.title}
                name="title"
                variant="outlined"
                label="Write your title"
                sx={{ display: "block", margin: ".5rem 0" }}
                onChange={handleChange}
              />
              <TextField
                value={task.description}
                name="description"
                variant="outlined"
                label="Write your description"
                multiline
                rows={4}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                type="submit"
                color="primary"
                sx={{ margin: ".5rem 0" }}
                disabled={!task.title || !task.description}
              >
                {loading ? (
                  <CircularProgress color="secondary" size="24px" />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
