import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import axios from 'axios'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })


if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_SANITY_DATASET ||
  !process.env.NEXT_PUBLIC_SANITY_API_TOKEN
) {
  throw new Error("Envoirment variables are not set!")
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-26',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

const uploadImageToSanity = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`);

    // Convert the image to a buffer (binary format)
    const buffer = await response.arrayBuffer();
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: imageUrl.split('/').pop()
    })
    
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset;


  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return undefined;
  }
}

const upload = async () => {

  console.log("Starting data migration...");

  try {
    const products = await axios.get("https://677d32fd4496848554c978e5.mockapi.io/api/products");
    const categories = await axios.get("https://677d32fd4496848554c978e5.mockapi.io/api/categories");
    const categoryIdMap = {}

    for (const category of categories.data) {
      try {

        const sanityCategory = {
          _type: 'categories',
          name: category.name
        }

        const result = await client.create(sanityCategory);
        categoryIdMap[category.name.toLowerCase()] = result._id;
        console.log(`Category "${result.name}" created with id ${result._id}`);

      } catch (err) {
        console.error(`Failed to create category ${category.name}:`, err);
      }
    }

    console.log("Category ids: ", categoryIdMap)

    for (const product of products.data) {
      try {
        const image = await uploadImageToSanity(product.image)
        
        const sanityProduct = {
          _type: 'products',
          name: product.name,
          label: product.label,
          category: {
            _type: "reference",
            _ref: categoryIdMap[product.category.toLowerCase()], // Use the migrated category ID
          },
          price: product.price || 0,
          stock: product.stock || 0,
          rating: {
            stars: product.rating?.average || 0,
            count: product.rating?.count || 0,
          },
          sizes: product.sizes || [],
          colors: product.colors || [],
          image: image
        }

        const result = await client.create(sanityProduct);
        console.log(`Product ${result.name} created`);


      } catch (err) {
        console.error(`Failed to create product ${product.id}:`, err);
      }
    }

    console.log("Data migration completed successfully!");

  } catch (error) {
    console.log("Error fetching data:")
    console.log(error)
  }
}

upload()
