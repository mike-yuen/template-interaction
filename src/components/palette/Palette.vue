<script setup lang="ts"></script>

<template>
	<a class="palette">
		<span class="palette-colors">
			<span style="background-color: rgb(249, 204, 211)"></span>
			<span style="background-color: rgb(170, 25, 69)"></span>
			<span style="background-color: rgb(241, 206, 212)"></span>
			<span style="background-color: rgb(57, 19, 6)"></span>
		</span>

		<div class="palette-info">
			<div class="palette-name">Trees in Bloom</div>
			<button class="palette-like">
				<i class="pi pi-heart" />
				<span>5477</span>
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
