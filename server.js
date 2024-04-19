import server from './index.js';


const PORT = 8080

server.listen(PORT, ()=> {
    console.log(`Server listening on http://localhost:${PORT}`);
});