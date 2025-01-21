import { defineField, defineType } from "sanity";
import { OrderIcon } from "./components";

export const order = defineType({
    name: "orders",
    title: "Orders",
    type: "document",
    readOnly: true,
    icon: OrderIcon,

    groups: [
        { name: 'order-details', title: 'Order details', default: true },
        { name: 'user-details', title: 'User details' },
        { name: 'products', title: 'Products' },
        { name: 'shipping', title: 'Shippment' },
    ],

    fields: [
        defineField({
            name: "userId",
            title: "User ID",
            type: "string",
            group: ["order-details", "user-details"],
            description: "ID of the user who placed the order",
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: "username",
            title: "Username",
            type: "string",
            group: ["order-details", "user-details"],
            description: "Name of the user who placed the order",
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: "email",
            title: "Email",
            type: "string",
            group: "user-details",
            description: "Email of the user who placed the order",
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: "phoneNo",
            title: "Phone No",
            type: "string",
            group: "user-details",
            description: "Phone number of the user who placed the order",
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: "products",
            title: "Products",
            type: "array",
            group: "products",
            of: [
                defineField({
                    name: 'product',
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
                            description: "Name of the product",
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
                }),
            ],
        }),

        defineField({
            name: "totalAmount",
            title: "Total Amount",
            type: "number",
            group: "order-details",
            description: "Total amount paid for the order",
            validation: Rule => Rule.required().min(0),
        }),

        defineField({
            name: "paymentStatus",
            title: "Payment Status",
            type: "string",
            group: "order-details",
            options: {
                list: ["pending", "completed", "failed"],
                layout: "radio"
            },
            description: "Status of the payment",
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: "shipping",
            title: "Shipping Details",
            type: "object",
            group: "shipping",
            fields: [
                defineField({
                    name: "name",
                    title: "Recipient Name",
                    type: "string",
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: "address",
                    title: "Address",
                    type: "string",
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: "city",
                    title: "City",
                    type: "string",
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: "state",
                    title: "State",
                    type: "string",
                }),
                defineField({
                    name: "postalCode",
                    title: "Postal Code",
                    type: "string",
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: "country",
                    title: "Country",
                    type: "string",
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: "shippingRate",
                    title: "Shipping Rate",
                    type: "number",
                    description: "Calculated shipping rate",
                    validation: Rule => Rule.required().min(0),
                }),
                defineField({
                    name: "trackingId",
                    title: "Tracking ID",
                    type: "string",
                    description: "Shipment tracking ID",
                }),
            ],
        }),
        
        defineField({
            name: "createdAt",
            title: "Created At",
            group: "order-details",
            type: "datetime",
            description: "Order creation timestamp",
            validation: Rule => Rule.required(),
        })
    ]
});
