//imports...
import express from 'express';
//models
import participantModel from '../models/participants.js';

const questionRouter = express.Router();

questionRouter.post("/:id", async (req, res) => {
    try {
        console.log("\n\n")
        console.log("POST questionRouter/:id is called...");

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

        let level = participant.level;
        console.log("participant level:");
        console.log(level);
        if (level > 6) {
            console.log("request returned a res message: level is greater than 6")
            console.log("\n\n")

            return res.json({ message: "level is greater than 6" });

        }
        else if (level == 6) {
            console.log("request returned a res message: You have answered all the questions")
            console.log("\n\n");
            return res.json({ message: "You have answered all the questions" });

        }
        else if (level < 1) {
            console.log("request returned a res message: level is less than 1")
            console.log("\n\n")
            return res.json({ message: "level is less than 1" });

        }

        if (req?.body?.answer) {
            let answer = req.body.answer.toUpperCase();
            let correct_answer;

            switch (level) {
                case 1:
                    correct_answer = process.env.ANSWER_1;
                    break;
                case 2:
                    correct_answer = process.env.ANSWER_2;
                    break;
                case 3:
                    correct_answer = process.env.ANSWER_3;
                    break;
                case 4:
                    correct_answer = process.env.ANSWER_4;
                    break;
                case 5:
                    correct_answer = process.env.ANSWER_5;
                    break;
            }

            if (answer === correct_answer) {
                console.log("Participant gave the correct answer")
                await participant.updateOne({
                    level: level + 1,
                    [`answer${level}.answer`]: answer,
                    [`answer${level}.submittedAt`]: new Date(),
                });
                level++;
            }
            else {
                console.log("participant gave the wrong answer")
                await participant.updateOne({
                    $push: { [`answer${level}.attemptedAnswers`]: { answer, submittedAt: new Date() } }
                });
                console.log("request returned a res message: Incorrect answer")
                console.log("\n\n")
                return res.json({ status: "failure", message: "Incorrect answer" });
            }

        }

        let question;
        let hint;

        switch (level) {
            case 1:
                question = process.env.QUESTION_1;
                hint = process.env.HINT_1;
                break;
            case 2:
                question = process.env.QUESTION_2;
                hint = process.env.HINT_2;
                break;
            case 3:
                question = process.env.QUESTION_3;
                hint = process.env.HINT_3;
                break;
            case 4:
                question = process.env.QUESTION_4;
                hint = process.env.HINT_4;
                break;
            case 5:
                question = process.env.QUESTION_5;
                hint = process.env.HINT_5;
                break;
        }
        console.log("Question fetch data:")
        console.log("question:")
        console.log(question)
        console.log("hint:")
        console.log(hint)
        console.log("level:")
        console.log(level)
        console.log("request end...")
        console.log("\n\n")

        res.json({
            status: "success",
            hint: hint,
            question: question,
            level: level,
        });

    } catch (err) {
        console.error(err);
    }
});

export default questionRouter;