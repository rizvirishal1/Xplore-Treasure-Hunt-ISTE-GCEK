//imports...
import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    level: {
        type: Number,
        default: 1,
    },
    answer1: {
        attemptedAnswers: [{
            answer: String,
            submittedAt: Date,
        }],
        answer: String,
        submittedAt: Date,
    },
    answer2: {
        attemptedAnswers: [
            {
                answer: String,
                submittedAt: Date,
            },
        ],
        answer: String,
        submittedAt: Date,
    },
    answer3: {
        attemptedAnswers: [{
            answer: String,
            submittedAt: Date,
        }],
        answer: String,
        submittedAt: Date,
    },
    answer4: {
        attemptedAnswers: [
            {
                answer: String,
                submittedAt: Date,
            },
        ],
        answer: String,
        submittedAt: Date,
    },
    answer5: {
        attemptedAnswers: [{
            answer: String,
            submittedAt: Date,
        }],
        answer: String,
        submittedAt: Date,
    },

});

const participnatModel = mongoose.model('participnatModel', participantSchema);
export default participnatModel;