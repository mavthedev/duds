import mongoose from "mongoose";

const User = new mongoose.Schema({
    _id: {
        type: String,
    },
    provider_id: {
        type: String,
        unique: true,
        required: true
    },
    hashed_password: {
        type: String
    },
    exp: {
        type: Number,
        default: 0
    },
}, { _id: false, virtuals: {
    levels: {
        get() {
            return getLevel(this.exp)
        }
    }
} })

const Session = new mongoose.Schema({
    _id: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    },
    expires: {
        type: Number,
        required: true
    },
    idle_expires: {
        type: Number,
        required: true
    }
}, { _id: false })

function getPoints(level: number) {
  return 20*(level-1)*(level+3);
}

function getLevel(points: number): number {
    return Math.floor(-1 + Math.sqrt(4 + points/20))
}

const db = {
    User: mongoose.model("User", User),
    Session: mongoose.model("Session", Session)
}

export {
    getLevel,
    getPoints,
    db
}