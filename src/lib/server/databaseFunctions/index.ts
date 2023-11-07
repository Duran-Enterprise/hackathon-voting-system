import { MongoClient, ServerApiVersion } from 'mongodb';
const username = import.meta.env.VITE_MONGODB_USERNAME;
const password = import.meta.env.VITE_MONGODB_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@daedalus.eqacbls.mongodb.net/?retryWrites=true&w=majority`;

export const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
});
export const DATABASE_NAME = 'hackathon';
export const DATABASE = client.db(DATABASE_NAME);
