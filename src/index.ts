import { server } from './app';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const start = async () => {
    try {
        server.listen(port, () => {
            console.log(`Server has successfully started on port:${port}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
