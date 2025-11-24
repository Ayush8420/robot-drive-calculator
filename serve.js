const http = require("http");
const fs = require("fs")
const path = require("path")



const files = fs.readdirSync(process.cwd())


const server = http.createServer((req, res) => {
	res.end(fs.readFileSync(path.join(process.cwd(), req.url == "/"? "index.html": req.url)))
})

server.listen(8000, () => console.log("Listening to port 8000"))

