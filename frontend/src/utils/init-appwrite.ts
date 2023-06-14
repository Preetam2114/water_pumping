// @ts-expect-error It is not taking props don't know why
import { Client, Functions, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_KEY);

const account = new Account(client);
const functions = new Functions(client);
const databases = new Databases(client);

export { functions, account, databases };
