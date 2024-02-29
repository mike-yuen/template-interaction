import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
	history: createWebHashHistory(),
	scrollBehavior() {
		return { top: 0 };
	},
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
	],
});

export default router;
