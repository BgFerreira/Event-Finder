import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import * as React from 'react';
import { useHistory } from 'react-router';


export default function ButtonAppBar() {

  const history = useHistory()

  const redirect = (_values) => {
      console.log(_values)
      history.push(`/${_values}`);

  }

  return (
    
    <Box  sx={{ flexGrow: 1,backgroundColor: '#fff'}}>
      <AppBar position="static" >
        <Toolbar>
          <Typography  variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
            QrCode
          </Typography>
          <Button sx={{ color: '#fff' }} onClick={() => redirect('')}>Sair</Button>
        </Toolbar>
      </AppBar>
   </Box>
    
  );
}
