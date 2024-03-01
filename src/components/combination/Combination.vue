<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { Chrome, Payload } from '@ckpack/vue-color';
import { onClickOutside } from '@vueuse/core';
import { ICombination } from '@/services/api';
import { getContrastingColor } from '@/utils';

const props = defineProps<{ combination: ICombination }>();

const colorPickerTarget = ref(null);
const liked = ref(false);
const likes = ref(0);
const colors = reactive<
	{ showPicker: boolean; slug: string; hex: string; name: string }[]
>([]);
const copiedHex = ref<string | null>(null);

const onCopyHex = async (color: { hex: string; slug: string }) => {
	try {
		await navigator.clipboard.writeText(color.hex);
		copiedHex.value = `${color.slug}-${color.hex}`;
		setTimeout(() => {
			copiedHex.value = null;
		}, 2000);
	} catch (e) {
		alert('Cannot copy');
	}
};

const onToggleLike = () => {
	liked.value = !liked.value;
	liked.value ? likes.value++ : likes.value--;
};

const onShowColorPicker = (index: number) => {
	colors[index].showPicker = true;
};

const onUpdateColor = (pickedColors: Payload, index: number) => {
	colors[index].hex = pickedColors.hex;
};

onClickOutside(colorPickerTarget, () => {
	colors.map((color) => (color.showPicker = false));
});

watch(
	() => props.combination.id,
	() => {
		console.log('watch: ', colors, props.combination.colors);
		liked.value = props.combination.liked;
		likes.value = props.combination.likes;
		Object.assign(
			colors,
			props.combination.colors.map((color) => ({
				showPicker: false,
				...color,
			})),
		);
	},
	{ immediate: true },
);
</script>

<template>
	<div class="combination">
		<div class="combination-image">
			<img
				:src="`/images/thumbnail/${props.combination.featuredImage.url}`"
				:alt="props.combination.featuredImage.alt"
			/>

			<button class="combination-like" @click="onToggleLike">
				<i
					class="pi"
					:class="[liked ? ' pi-heart-fill' : ' pi-heart']"
				/>
				<span>{{ likes }}</span>
			</button>
		</div>

		<div class="palette">
			<div class="palette-container">
				<button
					v-for="color in colors"
					:key="`${color.slug}-${color.hex}`"
					:style="{
						'--palette-font-color': getContrastingColor(color.hex),
						backgroundColor: color.hex,
					}"
					@click="() => onCopyHex(color)"
				>
					<i
						v-if="copiedHex === `${color.slug}-${color.hex}`"
						class="pi pi-check"
					/>
					<span v-else class="copy-hex">Copy</span>
				</button>
			</div>

			<div class="palette-text">
				<div
					v-for="(color, index) in colors"
					:key="`${color.slug}-${color.hex}`"
				>
					<span @click="() => onShowColorPicker(index)">{{
						color.name
					}}</span>
					<p>{{ color.hex }}</p>
					<Chrome
						ref="colorPickerTarget"
						v-show="color.showPicker"
						:modelValue="color.hex"
						@update:modelValue="
							(colors) => onUpdateColor(colors, index)
						"
						disableAlpha
						class="color-picker"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.combination {
	width: 100%;
	position: relative;

	.combination-image {
		position: relative;
		display: block;
		overflow: hidden;
		padding-bottom: 66.75%;
		border-radius: 8px 8px 0 0;

		img {
			position: absolute;
			top: 0;
			object-position: center center;
			object-fit: cover;
			height: 100%;
		}

		.combination-like {
			position: absolute;
			top: 16px;
			right: 16px;
			display: flex;
			align-items: center;
			gap: 6px;
			font-size: 0.875rem;
			padding: 0 8px;
			height: 2.5rem;
			background: rgb(255, 255, 255);
			border-radius: 4px;
			border: none;
			cursor: pointer;

			i {
				font-size: 1.125rem;
			}

			.pi-heart-fill {
				color: #ff525a;
			}
		}
	}

	.palette {
		.palette-container {
			display: flex;
			height: 128px;
			border-radius: 0 0 8px 8px;
			overflow: hidden;

			button {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
				border: 0;
				color: var(--palette-font-color);
				cursor: pointer;

				&:hover {
					.copy-hex {
						opacity: 1;
					}
				}

				.copy-hex {
					font-size: 1rem;
					font-weight: 500;
					opacity: 0;
					transition: opacity 0.2s ease;
				}

				i {
					font-size: 1.25rem;
				}
			}
		}

		.palette-text {
			position: relative;
			display: flex;
			margin-top: 1.5rem;
			text-align: center;

			& > div {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				flex-wrap: wrap;
				flex: 1;

				span {
					font-size: 1rem;
					font-weight: 600;
					color: rgb(0, 0, 0);
					text-decoration: underline;
					cursor: pointer;

					&:hover {
						text-decoration: none;
					}
				}

				p {
					font-size: 0.875rem;
					color: rgb(0, 0, 0, 0.5);
					text-transform: uppercase;
				}
			}
		}
	}

	.color-picker {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 1;
	}
}
</style>
