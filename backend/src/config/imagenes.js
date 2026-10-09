import { fileURLToPath } from 'node:url'

export const carpetaImagenes = fileURLToPath(new URL('../../uploads/', import.meta.url))
