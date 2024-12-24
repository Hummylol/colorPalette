import { colord } from 'colord'

// Helper function to generate a random hex color
export const generateRandomColor = (): string => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
  return colord(randomColor).toHex()
}

// Generate a color palette based on the base color
export const generateColorPalette = (baseColor: string, paletteType: 'complementary' | 'analogous' | 'triadic' | 'tetradic' = 'analogous') => {
  const base = colord(baseColor)

  let palette: string[] = []

  switch (paletteType) {
    case 'complementary':
      palette = [
        base.toHex(), // Base color
        base.rotate(180).toHex(), // Complementary color (opposite on the color wheel)
      ]
      break

    case 'analogous':
      palette = [
        base.toHex(), // Base color
        base.rotate(30).toHex(), // Analogous color 1
        base.rotate(-30).toHex(), // Analogous color 2
      ]
      break

    case 'triadic':
      palette = [
        base.toHex(), // Base color
        base.rotate(120).toHex(), // Triadic color 1
        base.rotate(240).toHex(), // Triadic color 2
      ]
      break

    case 'tetradic':
      palette = [
        base.toHex(), // Base color
        base.rotate(90).toHex(), // Tetradic color 1
        base.rotate(180).toHex(), // Tetradic color 2
        base.rotate(270).toHex(), // Tetradic color 3
      ]
      break

    default:
      break
  }

  return palette
}

// Format color to hex, rgb, or hsl
export const formatColor = (color: string, format: 'hex' | 'rgb' | 'hsl') => {
  const parsed = colord(color)
  if (format === 'rgb') return parsed.toRgbString()
  if (format === 'hsl') return parsed.toHslString()
  return parsed.toHex()
}
