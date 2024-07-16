export default function (size_in_bytes: number): string {
	var i = -1;
	var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
	do {
		size_in_bytes /= 1024;
		i++;
	} while (size_in_bytes > 1024);

	return Math.max(size_in_bytes, 0.1).toFixed(1) + byteUnits[i];
}
