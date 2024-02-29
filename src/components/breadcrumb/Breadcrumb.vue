<script setup lang="ts">
const props = defineProps<{ combination: string }>();
</script>

<template>
	<ul class="breadcrumb">
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
		color: rgba(0, 0, 0, 0.5);
		font-size: 0.875rem;

		.breadcrumb-text {
			color: rgba(0, 0, 0);
		}

		i {
			margin-left: 0.5rem;
			margin-right: 0.5rem;
		}
	}
}
</style>
