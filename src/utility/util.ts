export function getSizeTrans(fs: number): string {
	if (fs < 1024) {
		return String(fs);
	} else if (fs < 1024 * 1024) {
		return parseInt(String((fs * 10) / 1024)) / 10 + "K";
	} else if (fs < 1024 * 1024 * 1024) {
		return parseInt(String((fs * 10) / 1024 / 1024)) / 10 + "M";
	} else {
		return parseInt(String((fs * 10) / 1024 / 1024 / 1024)) / 10 + "G";
	}
}

export function getMimeTypeFromArray(
	uint8Array: Uint8Array
): string | undefined {
	// Convert the first few bytes of the Uint8Array to a hexadecimal string
	const hex = uint8Array
		.slice(0, 4)
		.reduce((acc, i) => acc + ("00" + i.toString(16)).slice(-2), "");
	// Define a map of magic numbers to MIME types
	const magicNumbersMap = new Map<string, string>([
		["89504e47", "image/png"],
		["47494638", "image/gif"],
		["25504446", "application/pdf"],
		["ffd8ffe0", "image/jpeg"],
		["ffd8ffe1", "image/jpeg"],
		["ffd8ffe2", "image/jpeg"],
		["ffd8ffe3", "image/jpeg"],
		["ffd8ffe8", "image/jpeg"],
		["504b0304", "application/zip"],
		["504b34", "application/zip"],
	]);
	// Look up the MIME type for the magic number, if it exists
	return magicNumbersMap.get(hex) || undefined;
}
