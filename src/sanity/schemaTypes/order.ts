import { defineField, defineType } from "sanity";
import { OrderIcon, TotalAmountDisplay } from "../components";

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
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending", value: "pending" },
                    { title: "Processing", value: "processing" },
                    { title: "Shipped", value: "shipped" },
                    { title: "Delivered", value: "delivered" },
                    { title: "Cancelled", value: "cancelled" },
                    { title: "Refunded", value: "refunded" },
                ],
            },
            group: "order-details",
            description: "",
            validation: Rule => Rule.required().min(0),
        }),

        defineField({
            name: "products",
            title: "Products",
            type: "array",
            group: "products",
            of: [
                defineField({
                    name: 'orderProduct',
                    type: 'orderProduct',
                })
            ],
        }),

        defineField({
            name: "totalAmount",
            title: "Total Amount",
            type: "number",
            group: "order-details",
            description: "Total amount paid for the order",
            validation: Rule => Rule.required().min(0),
            components: {
                input: TotalAmountDisplay,
            },
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
                    name: "pan",
                    title: "PAN",
                    type: "string",
                    validation: Rule => Rule.required(),
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
                    name: "carrierCode",
                    title: "Carrier Code",
                    type: "number",
                    description: "Shipping carrier code",
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
    ],

    preview: {
        select: {
            username: 'username',
            products: 'products',
        },
        prepare(selection) {
            const { username, products } = selection
            const totalProducts: number = products.reduce(
                (total: number, item: { quantity: number }) => total + item.quantity,
                0)

            return {
                title: `${username}'s Order`,
                subtitle: `${totalProducts} product(s)`
            }
        }
    },
});
