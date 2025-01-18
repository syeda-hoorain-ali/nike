import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })


if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_SANITY_DATASET ||
  !process.env.NEXT_PUBLIC_SANITY_API_TOKEN
) {
  throw Error("Envoirment variables are not set!")
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-26',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

const deleteDocumentsByType = async (documentType) => {

  try {
    console.log(`Fetching documents of type: ${documentType}...`);
    const documents = await client.fetch(`*[_type == "${documentType}"]`);

    if (documents.length === 0) {
      console.log(`No documents found for type: ${documentType}`);
      return;
    }

    console.log(`Found ${documents.length} documents. Deleting...`);

    for (const doc of documents) {
      await client.delete(doc._id);
      console.log(`Deleted document: ${doc._id} (${doc.title || doc.name || "No Name"})`);
    }

    console.log(`All documents of type "${documentType}" deleted successfully.`);

  } catch (error) {
    console.error(`Error deleting documents of type "${documentType}":`, error.message);
  }
}

const cleanupData = async () => {
  console.log("Starting data cleanup...");

  try {
    // Delete all products
    await deleteDocumentsByType("products");

    // Delete all categories
    await deleteDocumentsByType("categories");

    console.log("Data cleanup completed successfully!");
  } catch (error) {
    console.error("Error during cleanup:", error.message);
    process.exit(1); // Stop execution if an error occurs
  }
}

cleanupData()