enum SchemaAddress {
	HTTP_PRODUCT = 'http://schema.org/Product',
	HTTP_OFFER = 'http://schema.org/Offer',
	HTTPS_PRODUCT = 'https://schema.org/Product',
	HTTPS_OFFER = 'https://schema.org/Offer'
}

type ItemProp = Record<string, string | null>;

export class SchemaParser {
	private readonly tags = {
		product: ['name'],
		offer: ['price', 'priceCurrency']
	};

	private readonly elements: Element[] = [];

	constructor() {
		const product =
			document.querySelector(
				`[itemtype="${SchemaAddress.HTTPS_PRODUCT}"]`
			) ??
			document.querySelector(
				`[itemtype="${SchemaAddress.HTTP_PRODUCT}"]`
			);

		const offer =
			document.querySelector(
				`[itemtype="${SchemaAddress.HTTPS_OFFER}"]`
			) ??
			document.querySelector(`[itemtype="${SchemaAddress.HTTP_OFFER}"]`);

		this.tags.product.forEach(tag => {
			const element = product?.querySelector(`[itemprop="${tag}"]`);

			if (element) {
				this.elements.push(element);
			}
		});

		this.tags.offer.forEach(tag => {
			const element = offer?.querySelector(`[itemprop="${tag}"]`);

			if (element) {
				this.elements.push(element);
			}
		});
	}

	public getData(): ItemProp {
		let result: ItemProp = {};

		if (this.elements.length > 0) {
			this.elements.forEach(element => {
				if (element.localName === 'meta') {
					result = { ...result, ...this.parseMeta(element) };
				} else {
					result = { ...result, ...this.parseWithInnerText(element) };
				}
			});
		}

		return result;
	}

	private parseValue(key: string, value: string): string {
		if (key === 'price') {
			return parseInt(value.replace(/ /g, '')).toString();
		}

		return value;
	}

	private parseMeta(tag: Element): ItemProp {
		const result: ItemProp = {};

		const key = tag.getAttribute('itemprop');
		const value = tag.getAttribute('content');

		if (key && !value) {
			result[key] = null;
		} else if (key && value) {
			result[key] = this.parseValue(key, value);
		}

		return result;
	}

	private parseWithInnerText(tag: Element): ItemProp {
		const result: ItemProp = {};

		const key = tag.getAttribute('itemprop');
		const value = tag.textContent?.trim();

		if (key && !value) {
			result[key] = null;
		} else if (key && value) {
			result[key] = this.parseValue(key, value);
		}

		return result;
	}
}
