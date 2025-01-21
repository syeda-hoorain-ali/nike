import { defineField, defineType } from "sanity";
import { ProductsIcon, Rating } from "./components";

export const product = defineType({
    name: 'products',
    title: 'Products',
    type: 'document',
    icon: ProductsIcon,
    groups: [
        { name: 'analytics', title: 'Analytics' }
    ],


    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'categories' }],
            validation: Rule => Rule.required()
        }),
        
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required()
        }),
        
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'object',
            group: 'analytics',
            fields: [
                
                defineField({
                    name: 'stars',
                    title: 'Stars',
                    type: 'number',
                }),
                
                defineField({
                    name: 'count',
                    title: 'Count',
                    type: 'number',
                })
            ],
            components: {
                input: Rating
            }
        }),
        
        defineField({
            name: 'price_id',
            title: 'Stripe Price id',
            type: 'string',
            readOnly: true
        }),
        
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: Rule => Rule.required(),
            options: {
                list: [
                    { title: 'Just In', value: 'just-in' },
                    { title: 'Promo exclusion', value: 'promo-exclusion' },
                    { title: 'Sustainable materials', value: 'sustainable-materials' },
                ]
            }
        }),
        
        defineField({
            name: 'size',
            title: 'Size',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
            validation: Rule => Rule.required()
        }),
        
        defineField({
            name: 'stock',
            title: 'Stock',
            type: 'number',
            validation: Rule => Rule.required()
        }),
        
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: Rule => Rule.required()
        }),
        
        defineField({
            name: 'colors',
            title: 'Colors',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
            validation: Rule => Rule.required()
        }),
    ],
    
    preview: {
        select: {
            title: 'name',
            subtitle: 'category.name',
            media: 'image'
        }
    }
})
