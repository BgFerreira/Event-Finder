import React from "react";

import { Box } from "@material-ui/system";
import NewEventForm from "../form/newEventForm";
import ButtonAppBar from "../navbar/navbar";

const Login = () => {

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#fdfdfc' }}> 
        <ButtonAppBar />
        <NewEventForm action={"/newEvent"} method={"post"} />
         </Box>
    )
}

export default Login;