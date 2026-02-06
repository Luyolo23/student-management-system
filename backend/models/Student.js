const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        fullName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        course: {type: String, required: true},
    },
    { timestamps: true}
);

module.exports = mongoose.model("Student", studentSchema);