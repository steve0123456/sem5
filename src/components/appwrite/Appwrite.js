import { Client, Account,Teams,Storage,Databases } from "appwrite";

// Initialize the Appwrite Client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject("66bb5856001a4163db8e"); // Your project ID

// Initialize the Account service
const account = new Account(client);
const teams = new Teams(client);
const storage = new Storage(client);
const databases = new Databases(client);

export { teams };
export { client, account , storage ,databases};
