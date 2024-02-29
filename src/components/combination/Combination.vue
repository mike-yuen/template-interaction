<script setup lang="ts">
const combination = {
	liked: false,
	id: 719,
	slug: 'pastel-blonde',
	color: {
		slug: 'rose-quartz',
		hex: '#F7CAC9',
		name: 'Rose Quartz',
	},
	featuredImage: {
		alt: '',
		url: 'RoseQuartz.png',
	},
	name: 'Pastel Blonde',
	likes: 10953,
	colors: [
		{
			slug: 'yellow',
			hex: '#fff4bd',
			name: 'Yellow',
		},
		{
			slug: 'rose-quartz',
			hex: '#f4b9b8',
			name: 'Rose Quartz',
		},
		{
			slug: 'spearmint',
			hex: '#85d2d0',
			name: 'Spearmint',
		},
		{
			slug: 'purple',
			hex: '#887bb0',
			name: 'Purple',
		},
	],
};
</script>

<template>
	<div class="combination">
		<div class="combination-image">
			<img
				:src="`/images/thumbnail/${combination.featuredImage.url}`"
				:alt="combination.featuredImage.alt"
			/>

			<button class="combination-like">
				<i class="pi pi-heart" />
				<span>{{ combination.likes }}</span>
			</button>
		</div>

		<div class="palette">
			<div class="palette-container">
				<button
					v-for="color in combination.colors"
					:key="color.slug"
					:style="{ backgroundColor: color.hex }"
				>
					<span class="copy-hex">Copy</span>
					<i class="pi pi-check" />
				</button>
			</div>

			<div class="palette-text">
				<div v-for="color in combination.colors" :key="color.slug">
					<span class="">{{ color.name }}</span>
					<p class="">{{ color.hex }}</p>
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
			display: flex;
			margin-top: 1.5rem;
			text-align: center;

			& > div {
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
}
</style>
