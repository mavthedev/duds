import { PRIVATE_MONGO } from "$env/static/private";
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
    username: {
        type: String,
        required: true,
        unique: true
    }
}, { _id: false, virtuals: {
    level: {
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
    User: mongoose.models.user || mongoose.model("user", User),
    Session: mongoose.models.session || mongoose.model("session", Session)
}

mongoose.connect(PRIVATE_MONGO, {
    dbName: "db"
})

export {
    getLevel,
    getPoints,
    db
}