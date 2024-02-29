<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import Combination from '@/components/combination/Combination.vue';
</script>

<template>
	<main>
		<div class="combination-main">
			<div class="combination-bg" style="background-color: #f7cac9"></div>
			<div class="combination-container">
				<Breadcrumb combination="Pastel Blonde" />

				<h1 class="combination-heading">
					Pastel Blonde
					<br />
					color combination
				</h1>

				<Combination />
			</div>
		</div>

		<div class="related-combinations-container">
			<div class="related-combinations-heading">
				<h2>Related Combinations</h2>
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
</style>
