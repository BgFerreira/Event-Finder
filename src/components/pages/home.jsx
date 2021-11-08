import { Container, Stack } from "@material-ui/core";
import { Box } from "@material-ui/system";
import React from "react";
import MediaCard from "../cardEvents/MediaCard";
import ButtonAppBar from "../navbar/navbar";
import BasicButtons from "../buttons/buttons"
const Home = () => {

    return (
        <>
            <Box sx={{ flexGrow: 1, backgroundColor: '#fdfdfc' }}>
                <ButtonAppBar />
                <Container maxWidth="lg" >
                    <BasicButtons type={"submit"} title={"Cadastrar Evento"} redirect={'newEvent'} />
                </Container>
                <h1 style={{ marginTop: "50px", marginLeft: "50px" }}>Eventos:</h1>
                <Stack spacing={2} direction="row">
                    <MediaCard />
                </Stack>

            </Box>

        </>
    )
}

export default Home;