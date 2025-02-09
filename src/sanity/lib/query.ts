interface QueryParams {
    category?: string | null;
    userQuery?: string | null;
    sort?: string | null;
    latest?: boolean | null;
    price?: string | null; // Format: '2000-40000'
}

export function generateGroqQuery(params: QueryParams): string {
    const { category, userQuery, sort, latest, price } = params;

    // Base query
    let query = '*[_type == "products"]';

    // Filters
    const filters: string[] = [];

    // Category filter
    if (category) {
        const formattedCategory = category.trim().toLowerCase();
        filters.push(`lower(category->name) match "${formattedCategory}*"`);
    }

    // User search filter (matches product name or category name)
    if (userQuery) {
        const formattedSearch = userQuery.trim().toLowerCase();
        filters.push(
            `(lower(name) match "*${formattedSearch}*" || lower(category->name) match "*${formattedSearch}*")`
        );
    }

    // Price filter (validate format: 'min-max')
    if (price && /^\d+-\d+$/.test(price)) {
        const [minPrice, maxPrice] = price.split('-').map(Number);
        if (minPrice <= maxPrice) {
            filters.push(`price >= ${minPrice} && price <= ${maxPrice}`);
        }
    }

    // Latest filter (fetch most recent products)
    if (latest) {
        filters.push('defined(_createdAt)');
    }

    // Add filters to the query
    if (filters.length > 0) {
        query += `[${filters.join(' && ')}]`;
    }

    // Sorting
    if (sort) {
        if (sort === 'asc') {
            query += ` | order(price asc)`;
        } else if (sort === 'desc') {
            query += ` | order(price desc)`;
        }
    }

    // Latest sorting (overrides price sort if applied)
    if (latest) {
        query += ` | order(_createdAt desc)`;
    }

    // Select fields
    query += `{
      "id": _id, 
      "image": image.asset->url,
      name,
      price,
      label,
      colors,
      category -> { name }
    }`;

    return query;
}

export const singleProductQuery = `*[_type == "products" && _id == $id]{
    "id": _id, 
    "image": image.asset->url,
    name,
    price,
    price_id,
    stock,
    label,
    category -> { name } 
}[0]`

export const productImage = `*[_type == "products" && _id == $id]{
    "image": image.asset->url,
}[0]`

export const trackingQuery = `*[_type == "orders" && shipping.trackingId == $trackingNumber]{
    "carrierCode": shipping.carrierCode,
    "trackingNumber": shipping.trackingId
}[0]`



