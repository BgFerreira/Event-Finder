import { Button } from '@material-ui/core';
import * as React from 'react';
import { useHistory } from 'react-router';



export default function BasicButtons(props) {
  const history = useHistory()

  const redirect = (_values) => {
      console.log(_values)
      history.push(`/${_values}`);

  }
  return (
      
      <Button onClick={() => redirect(props.redirect)} variant="contained">{props.title}</Button> 
  );
}

export function SecundaryButtons(props){
  const history = useHistory()

  const redirect = (_values) => {
      console.log(_values)
      history.push(`/${_values}`);

  }

 return (<Button onClick={() => redirect(props.redirect)} variant="outlined" >{props.title}</Button>) 
}
