<script setup lang="ts">
const colors = [
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
];
</script>

<template>
	<div class="combination">
		<div class="combination-image">
			<img src="" alt="" />

			<button class="combination-like">
				<i class="pi pi-heart" />
				<span>10968</span>
			</button>
		</div>

		<div class="palette">
			<div class="palette-container">
				<button
					v-for="color in colors"
					:style="{ backgroundColor: color.hex }"
				>
					<span class="">Copy</span>
					<div class=""></div>
					<span class=""></span>
				</button>
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
			}
		}
	}
}
</style>
