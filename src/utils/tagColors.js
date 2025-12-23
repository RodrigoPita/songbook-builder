/**
 * Generate a consistent color for a tag based on its name
 * Uses golden angle for maximum color separation
 */
export function getTagColor(tag) {
  // Hash the tag name to get a consistent number
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    const char = tag.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  // Use golden angle (137.5°) for optimal color distribution
  // This ensures maximum visual separation between consecutive colors
  const goldenAngle = 137.508;
  const index = Math.abs(hash);
  const hue = (index * goldenAngle) % 360;

  // Fixed saturation and lightness for consistent, distinct colors
  const bgSaturation = 70;  // Vibrant colors
  const bgLightness = 85;   // Light background
  const textLightness = 25; // Dark text for readability
  const hoverLightness = 75; // Slightly darker on hover

  // Generate HSL colors
  const bgColor = `hsl(${hue}, ${bgSaturation}%, ${bgLightness}%)`;
  const textColor = `hsl(${hue}, ${bgSaturation}%, ${textLightness}%)`;
  const hoverColor = `hsl(${hue}, ${bgSaturation}%, ${hoverLightness}%)`;

  return {
    bg: bgColor,
    text: textColor,
    hover: hoverColor,
  };
}
