import {createApp} from '../src/main.js'

export default context => {
	return new Promise((resolve,reject) => {
		const app = createApp()
		app.$router.push(context.url)
		const matchedComponents = app.$router.getMatchedComponents()
		if (!matchedComponents.length) { return reject({code:404}) };
		// 遍历路由下所以的组件，如果有需要服务端渲染的请求，则进行请求
        Promise.all(matchedComponents.map(component => {
            if (component.serverRequest) {
                return component.serverRequest(app.$store)
            }
        })).then(() => {
        	console.log(app.$store.state)
        	context.state = app.$store.state
            resolve(app)
        }).catch(reject)
	})
}