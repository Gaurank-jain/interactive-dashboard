import React, { useState, useRef, useEffect } from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import { formatDate } from "@fullcalendar/core"
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  Button,
  TextField
} from "@mui/material"
import Header from 'components/Header'
import { useDeleteEventMutation, usePostEventMutation, usePutEventMutation, useGetEventQuery } from 'state/api'
import { useSelector } from 'react-redux'


const Events = () => {

  const theme = useTheme();

  const id = useSelector((state) => state.global.userId);
  const { data, isLoading }  = useGetEventQuery(id);
  const [postEvent, postResult] = usePostEventMutation()
  const [deleteEvent, deleteResult] = useDeleteEventMutation()
  const [putEvent, putResult] = usePutEventMutation()
  const [currentEvents, setCurrentEvents] = useState([]);
  var newData;

  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => {
    setIsOpen(false);
  }
   const handleSubmit = (e) => {
      e.preventDefault();
      handleClose();
   };
  
useEffect(() => {
  if (data) {
    var tempnewData = data["events"];
    var formattedData = tempnewData.map((obj) => {
      return {
        id: obj.id,
        title: obj.title,
        start: obj.start,
        end: obj.end,
      };
    });
    //setCurrentEvents(formattedData); // Update the state with the new data
    newData=formattedData
    setCurrentEvents(newData)

    console.log("newData 1: ", newData, "formatttedData: ", formattedData);
  }

}, [data, id]);

//console.log(newData);
   

// if (data) {
//     var tempnewData = data["events"];
//     var formattedData = tempnewData.map((obj) => {
//       return {
//         id: obj.id,
//         title: obj.title,
//         start: obj.start,
//         end: obj.end,
//       };
//     });
//     //setCurrentEvents(formattedData);
//     newData=formattedData;
// }
const handleDateClick = (selected) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selected.view.calendar;
    calendarApi.unselect();
    // console.log("Hello from events :", title, id);
    console.log("List on add 2 : ", newData)

    if (title) {
      calendarApi.addEvent({
        "id": `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        //allDay: selected.allDay
      })

    const eventData={
      "id": `${selected.startStr}-${title}`,
      "title": title,
      "start": selected.startStr,
      "end": selected.endStr,
      //"allDay": selected.allDay
    }
    
    //console.log("event from front ",eventData)
    // console.log("event from front ", ...eventData)
    postEvent({id: id, body: {
      "eid": `${selected.startStr}-${title}`,
      "title": title,
      "start": selected.startStr,
      "end": selected.endStr,
      //"allDay": selected.allDay
    }}).unwrap()
  }    
} 

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`))
      deleteEvent({id: id, body: {"eid" : `${selected.event.startStr}-${selected.event.title}`}}).unwrap();
      //console.log("List on delete: ", currentEvents)
      selected.event.remove();
  }

  // const handleDeleteEvent = () => {
  //   deleteEvent({id: id, body: "2023-05-07-gaurank"}).unwrap();
  // }



  return (
    //</>

    <Box m="20px">
      
      {/* <Button onClick={handleDeleteEvent}>Click Me</Button> */}
      <Header title="CALENDAR" subtitle="Keep a track of your Events here!"/>
      {/* { !isLoading ? ( */}
      <Box display="flex" justifyContent="space-between">
        <Box flex="1 1 20%" backgroundColor={theme.palette.background.alt} p="15px" borderRadius="4px" maxHeight={"78vh"} overflow={"auto"}>
          <Typography variant="h5">Events</Typography>
          <List>
            {console.log("List 3: ", currentEvents, newData)}
            {/*!isLoading &&*/ currentEvents.map((event)=>{
              return (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: theme.palette.secondary[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start , {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem> )
            })}
          </List>
        </Box>

        <Box flex="1 1 100%" ml="15px">
            <FullCalendar 
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar= {{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick} 
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={newData
            //    [{
            //     id: "12315",
            //     title: "All-day event",
            //     start: "2023-09-14",
            //     end: "2023-09-15",
            //   },
            //   {
            //     id: "5123",
            //     title: "Timed event",
            //     start: "2023-09-28",
            //     end: "2023-09-29",
            // },]
            }
            />
        </Box>

      </Box>
     {/* ) : <>Loading...</> } */}
    </Box>

  );
}

export default Events;


  
  // const handleEventDrop = (eventDropInfo) => {
  //   const { event, delta } = eventDropInfo;
  
  //   // Make a request to update the event in your database using the updated event information
  //   axios.put(`/events/${event.id}`, {
  //     start: event.start,
  //     end: event.end,
  //   });
  // };
  
  // const handleEventResize = (eventResizeInfo) => {
  //   const { event, delta } = eventResizeInfo;
  
  //   // Make a request to update the event in your database using the updated event information
  //   axios.put(`/events/${event.id}`, {
  //     start: event.start,
  //     end: event.end,
  //   });
  // }


  

// export const Form = ({isOpen, handleClose, handleSubmit, title, setTitle}) => {
//   return <>
//   <Dialog open={isOpen} onClose={handleClose}>
//        <form onSubmit={handleSubmit}>
//          <Box display="flex" flexDirection={"column"} justifyContent={"center"} padding="2rem">
//            <TextField label="title" required value={title} onChange={(e)=>setTitle(e.target.value)}/>
//            {/* <TextField label="description" value={desc} onChange={(e)=>setDesc(e.target.value)}/> */}
//          </Box>
//          <Box display="flex" justifyContent={"flex-end"}>
//            {/* <Button variant="text" onClick={onDelete}>Delete</Button>
//            <Button variant="contained" type="submit">Edit</Button> */}
//            <Button variant="text">Cancel</Button>
//            <Button variant="contained" type="submit">Create</Button>
//          </Box>
//        </form>
//   </Dialog>
//   </>
// }