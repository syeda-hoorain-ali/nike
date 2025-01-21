import { defineField, defineType } from "sanity";
import { CategoryIcon } from "./components";

export const category = defineType({
    name: 'categories',
    title: 'Categories',
    type: 'document',
    icon: CategoryIcon,

    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        })
    ]
})
