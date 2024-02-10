import { config } from './remult.config';
import { remult } from 'remult';
import { Content } from "./src/shared/Content";
import { data } from "./data";

async function insertData() {
  await remult.init(config);
  const contentRepo = remult.repo(Content);

  try {
    // Assuming data.content is an array of objects
    const contentArray = data.content;

    // Use bulk insert for better performance
    await contentRepo.bulkInsert(contentArray);
    
    console.log("Data insertion complete!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Close the Remult connection when done
    await remult.close();
  }
}

// Call the function to start the data insertion process
insertData();
