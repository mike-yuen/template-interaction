<script setup lang="ts">
const props = defineProps<{ combination: string; fontColor: string }>();
</script>

<template>
	<ul
		class="breadcrumb"
		:style="{ '--breadcrumb-font-color': props.fontColor }"
	>
		<li class="breadcrumb-item">
			<span class="breadcrumb-text">Colors</span>
			<i class="pi pi-angle-right" />
		</li>
		<li class="breadcrumb-item">
			<span class="breadcrumb-text">Color Palettes</span>
			<i class="pi pi-angle-right" />
		</li>
		<li class="breadcrumb-item">{{ props.combination }}</li>
	</ul>
</template>

<style lang="scss" scoped>
.breadcrumb {
	display: flex;
	align-items: center;
	justify-content: center;
	list-style: none;
	padding: 0;

	.breadcrumb-item {
		display: flex;
		align-items: center;
		color: var(--breadcrumb-font-color);
		font-size: 0.875rem;

		&:last-of-type {
			opacity: 0.75;
		}

		.breadcrumb-text {
			color: var(--breadcrumb-font-color);
		}

		i {
			margin-left: 0.5rem;
			margin-right: 0.5rem;
		}
	}
}
</style>
