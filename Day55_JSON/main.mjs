import data from './data.json'

for (let user of data.users) {
    console.log( `${user.firstName}, born at ${user.dateOfBirth} - ${user.knowsAs}` );
}

//node --experimental-json-modules main.mjs   - to run