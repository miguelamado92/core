import { parse } from '$lib/schema/valibot';
import { describe, expect, it } from 'vitest';

import { timestamp } from '$lib/schema/valibot';
describe('timestamp', () => {
	it('should parse a timestamp', () => {
		expect(parse(timestamp, '2021-01-01T00:00:00.000Z')).toEqual(
			new Date('2021-01-01T00:00:00.000Z')
		);
	});
	it('should parse a representation of a date, always outputting a JS date', () => {
		expect(parse(timestamp, '2021-01-01')).toEqual(new Date('2021-01-01'));
	});
	it('should parse a Javascript date type', () => {
		expect(parse(timestamp, new Date('2021-01-01'))).toEqual(new Date('2021-01-01'));
	});
	it('should throw an error if the input is not a valid date', () => {
		expect(() => parse(timestamp, 'not a date')).toThrow();
	});
	it('should throw an error if the input is not a string', () => {
		expect(() => parse(timestamp, 123)).toThrow();
	});
	it('should throw an error if the input is null', () => {
		expect(() => parse(timestamp, null)).toThrow();
	});
	it('should return a Date of the current time when undefined', () => {
		const parsedDate = parse(timestamp, undefined);
		expect(parsedDate).toHaveProperty('toISOString'); //that means it's a date
		const parsedUnixTime = parsedDate.getTime();
		const now = new Date().getTime();
		const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).getTime();
		expect(parsedUnixTime).toBeGreaterThan(yesterday);
		expect(parsedUnixTime).toBeLessThanOrEqual(now); //might be equal...
	});
});

import { timestampNoDefault } from '$lib/schema/valibot';
describe('timestampNoDefault', () => {
	it('should parse a timestamp', () => {
		expect(parse(timestampNoDefault, '2021-01-01T00:00:00.000Z')).toEqual(
			new Date('2021-01-01T00:00:00.000Z')
		);
	});
	it('should parse a date', () => {
		expect(parse(timestampNoDefault, new Date('2021-01-01T00:00:00.000Z'))).toEqual(
			new Date('2021-01-01T00:00:00.000Z')
		);
	});
	it('should throw an error if the input is not a valid date', () => {
		expect(() => parse(timestampNoDefault, 'not a date')).toThrow();
	});
	it('should throw an error if the input is not a string', () => {
		expect(() => parse(timestampNoDefault, 123)).toThrow();
	});
	it('should throw an error if the input is null', () => {
		expect(() => parse(timestampNoDefault, null)).toThrow();
	});
	it('should throw an error if the input is undefined', () => {
		expect(() => parse(timestampNoDefault, undefined)).toThrow();
	});
});

import { isoTimestamp } from '$lib/schema/valibot';
describe('isoTimestamp', () => {
	it('should parse an ISO timestamp', () => {
		expect(parse(isoTimestamp, '2021-01-01T00:00:00.000Z')).toEqual('2021-01-01T00:00:00.000Z');
	});
	it('should output an ISO timestamp', () => {
		expect(parse(isoTimestamp, '2021-01-01T00:00:00.000Z')).toEqual('2021-01-01T00:00:00.000Z');
	});
	it('should throw an error if the input is not a string', () => {
		expect(() => parse(isoTimestamp, 123)).toThrow();
	});
	it('should throw an error if the input is a Date', () => {
		expect(() => parse(isoTimestamp, new Date('2021-01-01'))).toThrow();
	});
});
