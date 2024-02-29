import data from '@/assets/combinations.json';

export interface ICombination {
	liked: boolean;
	id: number;
	slug: string;
	color: {
		slug: string;
		hex: string;
		name: string;
	};
	featuredImage: {
		alt: string;
		url: string;
	};
	name: string;
	likes: number;
	colors: {
		slug: string;
		hex: string;
		name: string;
	}[];
}

export interface IRelatedCombination {
	id: number;
	name: string;
	slug: string;
	colors: string[];
	likes: number;
	liked: boolean;
}

export const getCombination = (id?: string) => {
	return id
		? data.combinations.find(
				(item) => item.combination.id?.toString() === id,
			)
		: data.combinations[0];
};
