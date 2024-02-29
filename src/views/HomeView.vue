<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
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

const contrastFontColor = computed(() =>
	getContrastingColor(data.combination.color.hex),
);

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

		<div class="related-combinations-container">
			<div class="related-combinations-heading">
				<h2>Related Combinations</h2>
			</div>

			<div class="palette-container">
				<div class="grid palette-gutter">
					<div
						v-for="relatedCombination in data.relatedCombinations"
						:key="relatedCombination.id"
						class="col-6"
					>
						<Palette
							:combination="relatedCombination"
							@onSelectCombination="
								({ data }) =>
									router.push({
										path: '/',
										query: { id: data.id },
									})
							"
						/>
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
			border: 0;
			border-radius: 0.25rem;
			margin: 0;
			margin: 2px 0;
			padding: 0.375rem 1rem;
			cursor: pointer;
		}
	}
}
</style>
