<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { Chrome } from '@ckpack/vue-color';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import Combination from '@/components/combination/Combination.vue';
import Palette from '@/components/palette/Palette.vue';
import {
	ICombination,
	IRelatedCombination,
	getCombination,
} from '@/services/api';
import { getContrastingColor } from '@/utils';

const router = useRouter();
const data = reactive<{
	combination: ICombination;
	relatedCombinations: IRelatedCombination[];
}>({ combination: {} as ICombination, relatedCombinations: [] });
const showAllRelatedCombinations = ref(false);
const colors = ref('#194D33A8');

const contrastFontColor = computed(() =>
	getContrastingColor(data.combination.color.hex),
);

const filteredRelatedCombinations = computed(() =>
	showAllRelatedCombinations.value
		? data.relatedCombinations
		: data.relatedCombinations.slice(0, 5),
);

const onChangeCombination = (data: { id: number }) => {
	showAllRelatedCombinations.value = false;
	router.push({ path: '/', query: { id: data.id } });
};

const seeMoreCombinations = () => {
	showAllRelatedCombinations.value = true;
};

watchEffect(() => {
	const combinationId = router.currentRoute.value.query?.id || undefined;
	if (!Array.isArray(combinationId)) {
		const mock = getCombination(combinationId);
		if (mock) {
			const { combination, relatedCombinations } = mock;
			data.combination = combination;
			data.relatedCombinations = relatedCombinations;
		}
	}
});
</script>

<template>
	<main>
		<div class="combination-main">
			<div
				class="combination-bg"
				:style="{ backgroundColor: data.combination.color.hex }"
			></div>
			<div class="combination-container">
				<Breadcrumb
					:combination="data.combination.name"
					:fontColor="contrastFontColor"
				/>

				<h1
					class="combination-heading"
					:style="{ color: contrastFontColor }"
				>
					{{ data.combination.name }}
					<br />
					color combination
				</h1>

				<Combination :combination="data.combination" />
			</div>
		</div>

		<Chrome v-model="colors" />

		<div class="related-combinations-container">
			<div class="related-combinations-heading">
				<h2>Related Combinations</h2>
			</div>

			<div class="palette-container">
				<div class="grid palette-gutter">
					<div
						v-for="relatedCombination in filteredRelatedCombinations"
						:key="relatedCombination.id"
						class="col-6"
					>
						<Palette
							:combination="relatedCombination"
							@onSelectCombination="onChangeCombination"
						/>
					</div>
					<div
						v-if="
							!showAllRelatedCombinations &&
							data.relatedCombinations.length > 5
						"
						class="col-6"
					>
						<button
							class="palette-see-more"
							@click="seeMoreCombinations"
						>
							See more combinations
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="footer">
			<div class="footer-container">
				<h2>
					Use this color palette and create beautiful designs and
					documents!
				</h2>
				<button>Browse templates</button>
			</div>
		</div>
	</main>
</template>

<style lang="scss" scoped>
.combination-main {
	position: relative;
	padding: 0 24px;

	.combination-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 50rem;
		background-repeat: no-repeat;
		background-position: bottom;
		background-image: url('/images/foreground.png');
	}

	.combination-container {
		position: relative;
		max-width: 654px;
		width: 100%;
		margin: auto;
		padding: 0;
		padding-top: 3.75rem;

		.combination-heading {
			text-align: center;
			margin: 1rem 0 6rem;
			font-size: 3rem;
			font-weight: 600;
			line-height: 1.2;
			color: rgb(0, 0, 0);
		}
	}
}

.related-combinations-container {
	position: relative;
	padding: 0 24px;

	.related-combinations-heading {
		margin-top: 6rem;
		margin-bottom: 2rem;
		text-align: center;

		h2 {
			font-size: 2rem;
			font-weight: 600;
		}
	}

	.palette-container {
		max-width: 654px;
		width: 100%;
		margin: auto;
		padding: 0;

		.palette-gutter {
			margin-right: -1rem;
			margin-left: -1rem;
			margin-top: -1rem;

			[class*='col'] {
				padding: 1rem;
			}
		}

		.palette-see-more {
			height: 4.5rem;
			width: 100%;
			border-radius: 4px;
			border: 0;
			font-size: 1rem;
			margin: 0;
			padding: 6px 16px;
			background-color: rgba(0, 0, 0, 0.1);
			cursor: pointer;
		}
	}
}

.footer {
	position: relative;
	padding: 0 24px;
	margin-top: 6rem;
	margin-bottom: 4rem;

	.footer-container {
		margin: auto;
		text-align: center;
		max-width: 654px;

		h2 {
			font-size: 2.125rem;
			font-weight: 600;
			line-height: 1.3;
			margin-bottom: 0.5rem;
		}

		button {
			font-size: 0.875rem;
			line-height: 1.5;
			height: 2.5rem;
			border: 0;
			border-radius: 0.25rem;
			margin: 0;
			margin: 2rem 0;
			padding: 0.375rem 1rem;
			cursor: pointer;
		}
	}
}
</style>
