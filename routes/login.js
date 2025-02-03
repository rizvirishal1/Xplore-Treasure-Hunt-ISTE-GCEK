//imports...
import express from 'express';
//models
import participantModel from '../models/participants.js';

const loginRouter = express.Router();

loginRouter.post("", async (req, res) => {
    try {

        const currentTime = new Date();
        const endTime = new Date(process.env.END_TIME);

        if (currentTime > endTime) {
            return res.json({ message: "The event has ended" });
        }

        if (!req?.body?.name)
            return res.json({ message: "Name is required" });
        if (!req?.body?.email)
            return res.json({ message: "Email is required" });

        const existing_participant = await participantModel.findOne({ email: req.body.email });
        let new_participant;
        if (!existing_participant) {
            new_participant = new participantModel(req.body);
            await new_participant.save();
        }

        res.json({
            message: "Login successful",
            participantMongoId: existing_participant?._id || new_participant?._id,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default loginRouter;