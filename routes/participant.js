//imports...
import express from 'express';
//models
import participantModel from '../models/participants.js';

const participantRouter = express.Router();

participantRouter.get("/:id", async (req, res) => {
    try {

        console.log("\n\n")
        console.log("GET participantRouter/:id is called...");

        const currentTime = new Date();
        const startTime = new Date(process.env.START_TIME);
        const endTime = new Date(process.env.END_TIME);

        if (!req.params.id === process.env.ADMIN_ID) {

            if (currentTime < startTime) {
                console.log("request returned a res mesaage: The event has not started yet");
                console.log("\n\n")
                return res.json({ message: "The event has not started yet" });
            }
            else if (currentTime > endTime) {
                console.log("request returned a res mesaage: The event has ended");
                console.log("\n\n")
                return res.json({ message: "The event has ended" });
            }
        }

        const participant = await participantModel.findById(req.params.id);
        if (!participant) {
            console.log("request returned a res mesaage: Invalid participant");
            console.log("\n\n")
            return res.json({ message: "Invalid participant" });
        }

        console.log("request end... ")
        console.log("\n\n")
        return res.json({
            status: "success",
            participant: participant
        });

    } catch (err) {
        console.error(err);
    }
});

export default participantRouter;