import { FilesIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const category = defineType({
    name: 'categories',
    title: 'Categories',
    type: 'document',
    icon: FilesIcon,

    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        })
    ]
})
