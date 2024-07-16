export function sqlWildcardify(input: string): string {
	input = input.replace('_', '\\_');
	input = input.replace('?', '_');
	input = input.replace('*', '%');
	return `%${input}%`;
}
