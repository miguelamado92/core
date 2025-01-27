import { parse } from '$lib/schema/valibot';
import { describe, it, expect } from 'vitest';

import { id } from '$lib/schema/valibot';
describe('id', () => {
	it('should parse an integer id', () => {
		expect(parse(id, 123)).toBe(123);
	});
	it('should throw an error if the input is not an integer', () => {
		expect(() => parse(id, 123.45)).toThrow();
	});
	it('should throw an error if the input is not a number', () => {
		expect(() => parse(id, '123')).toThrow();
		expect(() => parse(id, null)).toThrow();
		expect(() => parse(id, true)).toThrow();
		expect(() => parse(id, undefined)).toThrow();
	});
	it('should throw an error if the input is negative', () => {
		expect(() => parse(id, -123)).toThrow();
	});
	it('should throw an error if the input is zero', () => {
		expect(() => parse(id, 0)).toThrow();
	});
	it('should throw an error if the input is NaN', () => {
		expect(() => parse(id, NaN)).toThrow();
	});
});

import { integer } from '$lib/schema/valibot';
describe('integer', () => {
	it('should parse an integer', () => {
		expect(parse(integer, 123)).toBe(123);
	});
	it('should throw an error if the input is not an integer', () => {
		expect(() => parse(integer, 123.45)).toThrow();
	});
	it('should throw an error if the input is not a number', () => {
		expect(() => parse(integer, '123')).toThrow();
		expect(() => parse(integer, null)).toThrow();
		expect(() => parse(integer, true)).toThrow();
		expect(() => parse(integer, undefined)).toThrow();
	});
});

import { count } from '$lib/schema/valibot';
describe('count', () => {
	it('should parse a count', () => {
		expect(parse(count, 123)).toBe(123);
	});
	it('should throw an error if the input is not an integer', () => {
		expect(() => parse(count, 123.45)).toThrow();
	});
	it('should throw an error if the input is not a number', () => {
		expect(() => parse(count, '123')).toThrow();
		expect(() => parse(count, null)).toThrow();
		expect(() => parse(count, true)).toThrow();
		expect(() => parse(count, undefined)).toThrow();
	});
	it('should throw an error if the input is negative', () => {
		expect(() => parse(count, -123)).toThrow();
	});
	it('should parse a count of zero', () => {
		expect(parse(count, 0)).toBe(0);
	});
});
