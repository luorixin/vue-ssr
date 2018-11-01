import Vue from 'vue'
import createRouter from './route.js'
import App from './App.vue'
import createStore from './store'

export function createApp(){
	const router = createRouter();
	const store = createStore();
	const app = new Vue({
		router,
		store,
		render: h => h(App)
	})
	return app;
}