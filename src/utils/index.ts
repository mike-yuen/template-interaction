export const getContrastingColor = (background: string) => {
	// Remove the '#' symbol if present
	const cleanBackground = background.replace('#', '');

	// Convert the hexadecimal background color to RGB
	const r = parseInt(cleanBackground.substring(0, 2), 16);
	const g = parseInt(cleanBackground.substring(2, 4), 16);
	const b = parseInt(cleanBackground.substring(4, 6), 16);

	// Calculate the relative luminance of the background color
	const relativeLuminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

	// Calculate the contrast ratio with black (#000) and white (#FFF)
	const contrastWithBlack = (relativeLuminance + 0.05) / 0.05;
	const contrastWithWhite = 1.05 / (relativeLuminance + 0.05);

	// Return the color with higher contrast ratio
	return contrastWithBlack > contrastWithWhite ? '#000' : '#FFF';
};
