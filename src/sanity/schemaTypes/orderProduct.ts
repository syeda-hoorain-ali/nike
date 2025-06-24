import { defineField, defineType } from "sanity";
import { OrderProductPreview } from "../components";

export const orderProduct = defineType({
    name: "orderProduct",
    type: "object",
    fields: [
        defineField({
            name: "productId",
            title: "Product ID",
            type: "string",
            description: "ID of the purchased product",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "string",
           validation: Rule => Rule.required(),
        }),
        defineField({
            name: "quantity",
            title: "Quantity",
            type: "number",
            description: "Quantity purchased",
            validation: Rule => Rule.required().min(1),
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            description: "Price per unit of the product",
            validation: Rule => Rule.required().min(0),
        }),
    ],
    components: {
        preview: OrderProductPreview
    },
    preview: {
        select: {
            name: 'name',
            image: 'image',
            price: 'price',
            quantity: 'quantity'
        },
    },
})
