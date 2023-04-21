import * as dotenv from 'dotenv';
import { SimpleLocize } from '..';

dotenv.config({ path: `${__dirname}/../../.env` });

const projectId = process.env.LOCIZE_PROJECT_ID || '';
const environment = process.env.LOCIZE_ENVIRONMENT || '';
const privateEnvironment = process.env.LOCIZE_PRIVATE_ENVIRONMENT || '';
const namespace = process.env.LOCIZE_NAMESPACE || '';
const privateKey = process.env.LOCIZE_PRIVATE_KEY || '';

const locizePublic = new SimpleLocize(projectId, environment);
const locizePrivate = new SimpleLocize(projectId, privateEnvironment, privateKey);

test('getAllTranslationsFromNamespace (public)', async () => {
	const test1 = await locizePublic.getAllTranslationsFromNamespace(namespace, 'en');
	const test2 = await locizePublic.getAllTranslationsFromNamespace(namespace, 'es');

	const enExpectation = {
		one: 'One',
		two: {
			three: 'Two Three',
		},
		four: {
			five: {
				six: 'Four Five Six',
			},
		},
	};

	const esExpectation = {
		one: 'Uno',
		two: {
			three: 'Dos Tres',
		},
		four: {
			five: {
				six: 'Quattro Cinco Seis',
			},
		},
	};

	expect(test1).toMatchObject(enExpectation);
	expect(test2).toMatchObject(esExpectation);
});

test('translate (public)', async () => {
	const test1 = await locizePublic.translate(namespace, 'en', 'test.test'); // should not exist
	const test2 = await locizePublic.translate(namespace, 'es', 'test.test'); // should not exist
	const test3 = await locizePublic.translate(namespace, 'en', 'one');
	const test4 = await locizePublic.translate(namespace, 'es', 'one');
	const test5 = await locizePublic.translate(namespace, 'en', 'two.three');
	const test6 = await locizePublic.translate(namespace, 'es', 'two.three');
	const test7 = await locizePublic.translate(namespace, 'en', 'four.five.six');
	const test8 = await locizePublic.translate(namespace, 'es', 'four.five.six');

	expect(test1).toBe('test.test');
	expect(test2).toBe('test.test');
	expect(test3).toBe('One');
	expect(test4).toBe('Uno');
	expect(test5).toBe('Two Three');
	expect(test6).toBe('Dos Tres');
	expect(test7).toBe('Four Five Six');
	expect(test8).toBe('Quattro Cinco Seis');
});

test('getAllTranslationsFromNamespace (private)', async () => {
	const test1 = await locizePublic.getAllTranslationsFromNamespace(namespace, 'en');
	const test2 = await locizePublic.getAllTranslationsFromNamespace(namespace, 'es');

	const enExpectation = {
		one: 'One',
		two: {
			three: 'Two Three',
		},
		four: {
			five: {
				six: 'Four Five Six',
			},
		},
	};

	const esExpectation = {
		one: 'Uno',
		two: {
			three: 'Dos Tres',
		},
		four: {
			five: {
				six: 'Quattro Cinco Seis',
			},
		},
	};

	expect(test1).toMatchObject(enExpectation);
	expect(test2).toMatchObject(esExpectation);
});

test('translate (private)', async () => {
	const test1 = await locizePrivate.translate(namespace, 'en', 'test.test'); // should not exist
	const test2 = await locizePrivate.translate(namespace, 'es', 'test.test'); // should not exist
	const test3 = await locizePrivate.translate(namespace, 'en', 'one');
	const test4 = await locizePrivate.translate(namespace, 'es', 'one');
	const test5 = await locizePrivate.translate(namespace, 'en', 'two.three');
	const test6 = await locizePrivate.translate(namespace, 'es', 'two.three');
	const test7 = await locizePrivate.translate(namespace, 'en', 'four.five.six');
	const test8 = await locizePrivate.translate(namespace, 'es', 'four.five.six');

	expect(test1).toBe('test.test');
	expect(test2).toBe('test.test');
	expect(test3).toBe('One');
	expect(test4).toBe('Uno');
	expect(test5).toBe('Two Three');
	expect(test6).toBe('Dos Tres');
	expect(test7).toBe('Four Five Six');
	expect(test8).toBe('Quattro Cinco Seis');
});
