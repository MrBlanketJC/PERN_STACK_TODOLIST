import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <Box>
      <AppBar position='static' color='default'>
      <Container>
          <Toolbar>
            <Typography sx={{flexGrow:1}}>
              <Link to="/">ToDoList</Link>              
            </Typography>
            <Button variant='contained' color='secondary' onClick={() => navigate('/tasks/new')}>
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}