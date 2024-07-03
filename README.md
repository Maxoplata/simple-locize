# Simple Locize

Simple Locize is a library for handling translations via the Locize API. Locize is a translation management system that allows you to easily manage your application's translations.

## Installation

You can install Simple Locize via NPM. Run the following command in your terminal:

```bash
npm install simple-locize
```

## Usage

To use Simple Locize, you first need to create an instance of the `SimpleLocize` class:

```js
import { SimpleLocize } from 'simple-locize';

cosnt projectId = 'your-project-id';
const environment = 'your-environment';
const privateKey = 'your-private-key'; // optional

const locize = new SimpleLocize(projectId, environment, privateKey);
```

### Fetching translations

To fetch translations for a specific namespace and language, you can use the `getAllTranslationsFromNamespace` method:

```js
const namespace = 'your-namespace';
const language = 'en';

const translations = locize.getAllTranslationsFromNamespace(namespace, language);
```

This will return an object containing all translations for the specified namespace and language.

### Translating a key

To translate a specific key for a namespace and language, you can use the `translate` method:

```js
const namespace = 'your-namespace';
const language = 'en';
const key = 'your.key';

const translation = locize.translate(namespace, language, key);
```

This will return the translation for the specified key, or the key itself if no translation is found.

## License

Simple Locize is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
