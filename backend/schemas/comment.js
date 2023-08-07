import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'comment',
    title: 'comment',
    type: 'document',
    fields: [
      defineField({
        name: 'blog',
        title: 'Blog',
        type: 'string',
        readOnly:true,
      }),
      defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
        readOnly:true,
      }),
      defineField({
        name: 'email',
        title: 'Email',
        type: 'string',
        readOnly:true,
      }),
      defineField({
        name: 'message',
        title: 'Message',
        type: 'text',
        readOnly:true,
      }),
    ],
  })
