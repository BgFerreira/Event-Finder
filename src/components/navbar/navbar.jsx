import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import * as React from 'react';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >

          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Sair</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
