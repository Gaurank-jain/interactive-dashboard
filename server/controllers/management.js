import Event from "../models/Events.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js"


export const getAdmins = async (req, res) => {
    try{
        const admins = await User.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserPerformance = async (req, res) => {
    try {
      const { id } = req.params;
  
      const userWithStats = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "affiliatestats",
            localField: "_id",
            foreignField: "userId",
            as: "affiliateStats",
          },
        },
        { $unwind: "$affiliateStats" },
      ]);
  
      const saleTransactions = await Promise.all(
        userWithStats[0].affiliateStats.affiliateSales.map((id) => {
          return Transaction.findById(id);
        })
      );
      const filteredSaleTransactions = saleTransactions.filter(
        (transaction) => transaction !== null
      );
  
      res
        .status(200)
        .json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

 
export const getEvents = async (req, res) => {
    try {
      const { id } = req.params;
      const events = await Event.findOne({ userId: id });
  
      if (!events) {
        //return res.status(404).json({ error: 'No events found for this user' });
        return res.status(200).json({ events: [] });
      }
  
      return res.status(200).json({ events: events.events });
    } catch (err) {
      console.error(err);
      return res.status(404).json({ error: 'Server error' });
    }
};
  

export const postEvents = async (req, res) => {
    try{
        const { title, eid, start, end } = req.body;
        const { id } = req.params;
        console.log(title, id);
  
        const newEvent = {
         title: title,
         id: eid,
         start: start,
         end: end,
        };
        console.log(newEvent);
        // Find the event schema with the given userId
        const eventSchema = await Event.findOne({userId: id});
        //  // If the event schema does not exist, create a new one with the given userId and the new event object
        if (!eventSchema) {
        const neventSchema = await Event.create({
          userId: id,
          events: [newEvent]
        });
        } else {
        // If the event schema exists, add the new event object to the existing events array
          eventSchema.events.push(newEvent);
          await eventSchema.save();
        }
        // Save the event schema
        //await eventSchema.save();
  
        res.status(201).json({ message: "Event created successfully", event: newEvent });
        //res.status(201).json({ message: "Event created successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteEvents = async (req, res) => {
    try {
        const { eid } = req.body;
        const { id } = req.params;
        console.log(id, eid);

        const event = await Event.findOne({ userId: id, 'events.id': eid });
        console.log("data from delete: ", event)

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Filter the events array to remove the event with matching eventId
        event.events = event.events.filter((e) => e.id !== eid);
        console.log("delete api: ",event)
        // Save the updated event to the database
        await event.save();
        console.log("delete api: ",event)

        return res.status(200).json({ message: 'Event deleted successfully', event });
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const putEvents = async (req, res) => {
    try{
        const { title, eid, start, end } = req.body;
        const { id } = req.params;

    // Find the event schema with the given userId
    const eventSchema = await Event.findOne({ userId: id });

    // If the event schema does not exist, return a 404 error
    if (!eventSchema) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Find the event object in the events array with the given eventId
    const eventToUpdate = eventSchema.events.find(event => event.id === eid);

    // If the event object does not exist, return a 404 error
    if (!eventToUpdate) {
      return res.status(404).json({ message: "Event not found" });
    }

    eventToUpdate.title = title;
    eventToUpdate.start = start;
    eventToUpdate.id=`${start}-${title}`
    eventToUpdate.end = end;

    await eventSchema.save();

    res.status(200).json({ message: "Event updated successfully", event: eventToUpdate });
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}