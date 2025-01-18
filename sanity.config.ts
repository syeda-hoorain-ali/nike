'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { schema } from '@/sanity/schemaTypes'
import { structure } from '@/sanity/structure'
import Icon from '@/sanity/components'
import { Logo } from '@/components/icons'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  icon: Logo,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
