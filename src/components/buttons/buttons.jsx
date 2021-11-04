import { Button } from '@material-ui/core';
import * as React from 'react';


export default function BasicButtons(props) {
  return (
      
      <Button variant="contained">{props.title}</Button> 
  );
}
