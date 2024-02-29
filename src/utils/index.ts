export const getContrastingColor = (background: string) => {
	// Remove the '#' symbol if present
	const cleanBackground = background.replace('#', '');

	// Convert the hexadecimal background color to RGB
	const r = parseInt(cleanBackground.substring(0, 2), 16);
	const g = parseInt(cleanBackground.substring(2, 4), 16);
	const b = parseInt(cleanBackground.substring(4, 6), 16);

	// Calculate the relative luminance of the background color
	const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

	// Return the color with higher contrast ratio
	return brightness > 125 ? '#000' : '#FFF';
};
