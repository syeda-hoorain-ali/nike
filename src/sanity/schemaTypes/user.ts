import { defineField, defineType } from 'sanity'
import { UserIcon } from '../components'
import React from 'react'

export const user = defineType({
    name: 'users',
    title: 'Users',
    type: 'document',
    icon: UserIcon,
    // readOnly: true,

    fields: [
        // Core User Information
        defineField({
            name: 'userId',
            title: 'User ID',
            type: 'string',
            description: 'Unique identifier from authentication provider (e.g., Clerk)',
            validation: (Rule) => Rule.required(),
            group: 'core',
        }),

        defineField({
            name: 'username',
            title: 'Username',
            type: 'string',
            description: 'Unique username for the user',
            validation: (Rule) => Rule.required().min(3).max(30),
            group: 'core',
        }),

        defineField({
            name: 'firstName',
            title: 'First Name',
            type: 'string',
            validation: (Rule) => Rule.required().min(1).max(50),
            group: 'core',
        }),

        defineField({
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
            validation: (Rule) => Rule.required().min(1).max(50),
            group: 'core',
        }),

        defineField({
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
            description: 'Computed full name (firstName + lastName)',
            readOnly: true,
            group: 'core',
        }),

        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
            group: 'core',
        }),

        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            description: 'Contact phone number',
            group: 'core',
        }),

        defineField({
            name: 'imageUrl',
            title: 'Profile Image URL',
            type: 'url',
            description: 'URL to user profile image',
            group: 'core',
        }),

        // Personal Information
        defineField({
            name: 'dateOfBirth',
            title: 'Date of Birth',
            type: 'date',
            validation: (Rule) => Rule.required(),
            group: 'personal',
        }),

        defineField({
            name: 'gender',
            title: 'Gender',
            type: 'string',
            options: {
                list: [
                    { title: 'Male', value: 'male' },
                    { title: 'Female', value: 'female' },
                ],
                layout: 'radio'
            },
            validation: (Rule) => Rule.required(),
            group: 'personal',
        }),

        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
            validation: (Rule) => Rule.required(),
            group: 'personal',
        }),

        // Address Information
        defineField({
            name: 'address',
            title: 'Address',
            type: 'object',
            group: 'address',
            fields: [
        
                defineField({
                    name: 'addressLine1',
                    title: 'Address Line 1',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
        
                defineField({
                    name: 'addressLine2',
                    title: 'Address Line 2',
                    type: 'string',
                }),
        
                defineField({
                    name: 'addressLine3',
                    title: 'Address Line 3',
                    type: 'string',
                }),
        
                defineField({
                    name: 'city',
                    title: 'City',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
        
                defineField({
                    name: 'state',
                    title: 'State/Province',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
        
                defineField({
                    name: 'postalCode',
                    title: 'Postal Code',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
            ],
        }),

        // Financial Information
        defineField({
            name: 'pan',
            title: 'PAN Number',
            type: 'string',
            description: 'Permanent Account Number for tax purposes',
            group: 'financial',
        }),

        // Shopping Data
        defineField({
            name: 'cart',
            title: 'Shopping Cart',
            type: 'array',
            group: 'shopping',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'productId',
                        title: 'Product ID',
                        type: 'reference',
                        to: [{ type: 'products' }],
                        validation: (Rule) => Rule.required(),
                    }),
            
                    defineField({
                        name: 'quantity',
                        title: 'Quantity',
                        type: 'number',
                        validation: (Rule) => Rule.required().min(1),
                    }),
            
                    defineField({
                        name: 'size',
                        title: 'Size',
                        type: 'string',
                    }),
            
                    defineField({
                        name: 'color',
                        title: 'Color',
                        type: 'string',
                    }),
            
                    defineField({
                        name: 'addedAt',
                        title: 'Added At',
                        type: 'datetime',
                        readOnly: true,
                    }),
                ],
                preview: {
                    select: {
                        title: 'productId.title',
                        quantity: 'quantity',
                        size: 'size',
                    },
                    prepare(selection) {
                        const { title, quantity, size } = selection
                        return {
                            title: title || 'Product',
                            subtitle: `Qty: ${quantity} ${size ? `| Size: ${size}` : ''}`,
                        }
                    },
                },
            }],
        }),

        defineField({
            name: 'orders',
            title: 'Order History',
            type: 'array',
            group: 'shopping',
            of: [{
                type: 'reference',
                to: [{ type: 'orders' }],
            }],
        }),

        // Preferences & Settings
        defineField({
            name: 'preferences',
            title: 'User Preferences',
            type: 'object',
            group: 'preferences',
            fields: [
        
                defineField({
                    name: 'newsletterSubscription',
                    title: 'Newsletter Subscription',
                    type: 'boolean',
                    initialValue: false,
                }),
        
                defineField({
                    name: 'marketingEmails',
                    title: 'Marketing Emails',
                    type: 'boolean',
                    initialValue: true,
                }),
        
                defineField({
                    name: 'sizePreference',
                    title: 'Preferred Size',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'US 7', value: 'us_7' },
                            { title: 'US 8', value: 'us_8' },
                            { title: 'US 9', value: 'us_9' },
                            { title: 'US 10', value: 'us_10' },
                            { title: 'US 11', value: 'us_11' },
                            { title: 'US 12', value: 'us_12' },
                        ],
                    },
                }),
        
                defineField({
                    name: 'favoriteCategories',
                    title: 'Favorite Categories',
                    type: 'array',
                    of: [{
                        type: 'reference',
                        to: [{ type: 'categories' }],
                    }],
                }),
        
                defineField({
                    name: 'language',
                    title: 'Preferred Language',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'English', value: 'en' },
                            { title: 'Spanish', value: 'es' },
                            { title: 'French', value: 'fr' },
                            { title: 'German', value: 'de' },
                        ],
                    },
                    initialValue: 'en',
                }),
            ],
        }),

        // Account Status & Metadata
        defineField({
            name: 'lastLogin',
            title: 'Last Login',
            type: 'datetime',
            readOnly: true,
            group: 'metadata',
        }),

        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            readOnly: true,
            group: 'metadata',
        }),

        defineField({
            name: 'updatedAt',
            title: 'Updated At',
            type: 'datetime',
            readOnly: true,
            group: 'metadata',
        }),
    ],

    groups: [
        { name: 'core', title: 'Core Information' },
        { name: 'personal', title: 'Personal Information' },
        { name: 'address', title: 'Address' },
        { name: 'financial', title: 'Financial Information' },
        { name: 'shopping', title: 'Shopping Data' },
        { name: 'preferences', title: 'Preferences & Settings' },
        { name: 'metadata', title: 'Account Status & Metadata' },
    ],

    preview: {
        select: {
            fullName: 'fullName',
            username: 'username',
            email: 'email',
            media: 'imageUrl',
        },
        prepare(selection) {
            const { fullName, username, email, media } = selection
            return {
                title: fullName || username,
                subtitle: email || 'No email',
                media: media ? React.createElement('img', { src: media, alt: fullName || username }) : undefined,
            }
        },
    },

    orderings: [
        {
            title: 'Name A-Z',
            name: 'nameAsc',
            by: [{ field: 'firstName', direction: 'asc' }],
        },
        {
            title: 'Name Z-A',
            name: 'nameDesc',
            by: [{ field: 'firstName', direction: 'desc' }],
        },
        {
            title: 'Recently Created',
            name: 'createdAtDesc',
            by: [{ field: 'createdAt', direction: 'desc' }],
        },
        {
            title: 'Recently Updated',
            name: 'updatedAtDesc',
            by: [{ field: 'updatedAt', direction: 'desc' }],
        },
    ],
}) 
