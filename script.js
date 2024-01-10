const symbol = require('/node_modules/symbol-sdk')

const address = symbol.Address.createFromRawAddress("TCRPYAX4AUWTCTKDOJS4LRSNN6EAIZLT552LTRY")
console.log("Hello Symbol")
console.log(`Your Address : ${address.plain()}`)
