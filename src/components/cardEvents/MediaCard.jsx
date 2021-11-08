import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import api from "../../services/api";

export const getEvents = async () => {
  const response = await api.get("/get-events", { withCredentials: true })
  console.log("oi" + response)
  return response.data;

}

const eventTest = getEvents()
console.log(eventTest)


export default function MediaCard() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      setEvents(await getEvents())
    })();
  }, []);


  const history = useHistory()

  const details = (id) => {
    history.push(id)
  }
  console.log(events)
  
  return (
        events.map(events => {
        return (

          <Card sx={{ maxWidth: 345 }} style={{ marginTop: "50px", marginLeft: "50px" }}>
            <CardMedia
              component="img"
              height="140"
              image={events.img}
              alt={events.title}
              onClick={() => details(`/event/${events.id}`)}
            />
            <CardContent>
              <Typography onClick={() => details(`/event/${events.id}`)} gutterBottom variant="h5" component="div">
                {events.title}
              </Typography>


              <Typography onClick={() => details(`/event/${events.id}`)} variant="body2" color="text.secondary">
                Date: {events.date}
              </Typography>

              <Typography onClick={() => details(`/event/${events.id}`)} variant="body2" color="text.secondary">
                Time: {events.time}
              </Typography>
              <Typography onClick={() => details(`/event/${events.id}`)} variant="body2" color="text.secondary">
                {events.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" >Confrm</Button>
              <Button size="small" onClick={() => details(`/event/${events.id}`)}>convite</Button>
            </CardActions>
          </Card>
        )
      }))
    }