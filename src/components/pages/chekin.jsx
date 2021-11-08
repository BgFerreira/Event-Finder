import React, { useEffect, useState } from "react";
import LoginForm from "../form/loginForm";
import FormCard from "../cards/formCard";
import ButtonAppBar from "../navbar/navbar";
import { BackgroundImg } from "../background/backgroudStyle";
import api from "../../services/api";

const getEvent = async () => {
    const { data } = await api.get(`/checkIn?`, { withCredentials: true });
    return data;
}

const Chekin = () => {
const [filtered, setFiltered] = useState("");

useEffect(() => {
    (async () => {
        setFiltered(await getEvent())

    })();
}, []);

    return (

        <>
            {filtered?<h2>Acesso permitido</h2>:<h2>Acesso negado</h2> }
        </>

    )
}

export default Chekin;