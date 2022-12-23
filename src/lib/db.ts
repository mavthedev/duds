import { PRIVATE_MONGO } from "$env/static/private";
import mongoose, { mongo } from "mongoose";

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

const GameSubBlock = new mongoose.Schema({
    //@ts-ignore
    player: { ref: "user", type: String, required: function() { return this.filled }},
    filled: { type: Boolean, default: false },
    data: {
        type: Number,
        enum: [0, 1, 2], // 0 Empty, 1 First letter, 2 Second letter
        default: 0
    }
})

const Game = new mongoose.Schema({ 
    _id: {
        type: String
    },
    owner: { ref: "user", type: String, required: true },
    opponent: { ref: "user", type: String, required: false },
    isPlaying: { type: Boolean, default: false },
    blocks: { type: [{ type: GameSubBlock }], default: [{}, {}, {}, {}, {}, {}, {}, {}, {}]}
})

function getPoints(level: number) {
  return 20*(level-1)*(level+3);
}

function getLevel(points: number): number {
    return Math.floor(-1 + Math.sqrt(4 + points/20))
}

const db = {
    User: mongoose.models.user || mongoose.model("user", User),
    Session: mongoose.models.session || mongoose.model("session", Session),
    Game: mongoose.models.game || mongoose.model("game", Game),
}

mongoose.connect(PRIVATE_MONGO, {
    dbName: "db"
})

export {
    getLevel,
    getPoints,
    db
}