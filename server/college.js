/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const mongoose = require("mongoose");
const Community = require("./models/Community");

require("dotenv").config();

mongoose.connect(process.env.MONGO_KEY);

async function getCollegeData() {
    const res = await fetch("http://universities.hipolabs.com/search?country=united%20states");
    console.log("made res");
    const data = await res.json();
    const colleges = data.map((college) => ({
            name: college.name,
            emailDomain: college.domains
        }));

    for await (const college of colleges) {
        Community.create({name: college.name, emailDomain: college.emailDomain})
            .then(() => console.log(`Added ${college.name}`))
            .catch(() => console.log`Unable to add ${college.name}`);
    }
}

getCollegeData();