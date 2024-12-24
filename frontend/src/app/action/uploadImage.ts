'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function uploadImage(data: FormData) {
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    throw new Error('No file uploaded')
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type not allowed. Please upload a JPEG, PNG, or GIF image.')
  }

  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit.')
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileName = `${Date.now()}-${file.name}`
  const path = join('public', 'uploads', fileName)
  await writeFile(path, buffer)

  return `/uploads/${fileName}`
}

