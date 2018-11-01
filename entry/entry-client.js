import { createApp } from '../src/main'

const app = createApp()

// 同步服务端信息
if (window.__INITIAL_STATE__) {
    app.$store.replaceState(window.__INITIAL_STATE__)
}

window.onload = function(){
	console.log(app.$route)
	app.$mount('#app')
}