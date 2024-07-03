export const capitalize = (string: string): string => {
	if (string.length > 0) {
		return string[0].toUpperCase() + string.slice(1).toLowerCase();
	}

	return string.toUpperCase();	
}
