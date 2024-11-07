import { MongoClient, type Db } from 'mongodb';

let connection: Promise<Db>;

export const connectToDatabase = async () => {
    if (!connection) {
        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        connection = client.connect().then(() => {
            return client.db('job_hunter');
        });
    }

    return connection;
};
