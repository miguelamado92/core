import { parse, shortString, shortStringNotEmpty } from '$lib/schema/valibot';
import { describe, expect, it } from 'vitest';
describe('shortString', () => {
	it('should parse a short string', () => {
		expect(parse(shortString, 'hello')).toBe('hello');
	});
	it('should throw an error if the input is too long', () => {
		expect(() => parse(shortString, 'a'.repeat(101))).toThrow();
	});
	it('should throw an error if the input is not a string', () => {
		expect(() => parse(shortString, 123)).toThrow();
	});
	it('should throw an error if the input is null', () => {
		expect(() => parse(shortString, null)).toThrow();
	});
	it('should parse even if the string is empty', () => {
		expect(parse(shortString, '')).toBe('');
	});
});

describe('shortStringNotEmpty', () => {
	it('should parse a short string', () => {
		expect(parse(shortStringNotEmpty, 'hello')).toBe('hello');
	});
	it('should throw an error if the input is too long', () => {
		expect(() => parse(shortStringNotEmpty, 'a'.repeat(101))).toThrow();
	});
	it('should throw an error if the input is not a string', () => {
		expect(() => parse(shortStringNotEmpty, 123)).toThrow();
	});
	it('should throw an error if the input is null', () => {
		expect(() => parse(shortStringNotEmpty, null)).toThrow();
	});
	it('should throw an error if the input is empty', () => {
		expect(() => parse(shortStringNotEmpty, '')).toThrow();
	});
});
