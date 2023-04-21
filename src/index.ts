interface LocizeTranslation {
	[key: string]: string | LocizeTranslation;
}

interface LocizeTranslations {
	[namespace: string]: {
		[language: string]: LocizeTranslation;
	};
}

export class SimpleLocize {
	projectId: string;
	environment: string;
	privateKey?: string;

	translations: LocizeTranslations = {};

	constructor(
		projectId: string,
		environment: string,
		privateKey?: string,
	) {
		this.projectId = projectId;
		this.environment = environment;
		this.privateKey = privateKey;
	}

	async fetchFromLocize (namespace: string, language: string) {
		try {
			const locizeFetch = await fetch(
				`https://api.locize.io/${!!this.privateKey ? 'private/' : ''}${this.projectId}/${this.environment}/${language}/${namespace}`,
				typeof this.privateKey !== 'undefined' ? {
					headers: {
						Authorization: this.privateKey,
					},
				} : {},
			);

			const locizeData = await locizeFetch.json();

			this.translations[namespace] = {
				...(this.translations[namespace] || {}),
				[language]: locizeData,
			};
		} catch {
			// fail
		}
	}

	async getAllTranslationsFromNamespace(namespace: string, language: string) {
		if (!this.translations[namespace]?.[language]) {
			await this.fetchFromLocize(namespace, language);
		}

		return this.translations[namespace]?.[language];
	}

	async translate(namespace: string, language: string, key: string) {
		if (!this.translations[namespace]?.[language]) {
			await this.fetchFromLocize(namespace, language);
		}

		const keySplit = key.split('.');

		const keyValue: LocizeTranslation | string = keySplit.length === 1
			? this.translations[namespace]?.[language]?.[key]
			: keySplit.reduce(
				(acc: LocizeTranslation | string, item) => (acc as LocizeTranslation)?.[item],
				this.translations[namespace]?.[language],
			);

		return typeof keyValue === 'string' ? keyValue : key;
	}
}
