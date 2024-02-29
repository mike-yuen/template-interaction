<script setup lang="ts">
import { IRelatedCombination } from '@/services/api';
const props = defineProps<{ combination: IRelatedCombination }>();
const emits = defineEmits<{
	(e: 'onSelectCombination', data: { id: number }): void;
}>();

const onSelectCombination = () => {
	emits('onSelectCombination', { data: { id: props.combination.id } });
};
</script>

<template>
	<a class="palette" @click="onSelectCombination">
		<span class="palette-colors">
			<span
				v-for="color in props.combination.colors"
				:key="color"
				:style="{ backgroundColor: color }"
			></span>
		</span>

		<div class="palette-info">
			<div class="palette-name">{{ props.combination.name }}</div>
			<button class="palette-like">
				<i class="pi pi-heart" />
				<span>{{ props.combination.likes }}</span>
			</button>
		</div></a
	>
</template>

<style lang="scss" scoped>
.palette {
	position: relative;
	display: block;
	border-radius: 4px;
	overflow: hidden;
	text-decoration: none;
	transition: box-shadow 0.2s ease;
	cursor: pointer;

	&:hover {
		.palette-info {
			transform: translateY(-100%);
		}
	}

	.palette-colors {
		position: relative;
		display: flex;
		height: 4.5rem;

		span {
			position: relative;
			flex: 1;
		}
	}

	.palette-info {
		position: absolute;
		bottom: auto;
		top: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 2.5rem;
		background-color: #fff;
		padding: 0 1rem;
		transform: translateY(0);
		transition: transform 0.2s ease;

		.palette-name {
			flex: 1;
			width: auto;
			font-size: 1rem;
			margin-right: 0.5rem;
			text-align: left;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		button {
			display: flex;
			align-items: center;
			gap: 6px;
			font-size: 0.875rem;
			background: transparent;
			border: 0;
			cursor: pointer;

			i {
				font-size: 1.125rem;
			}
		}
	}
}
</style>
