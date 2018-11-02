const exp = require("express")
const express = exp();
const { createBundleRenderer } = require('vue-server-renderer')


// 设置静态文件目录
express.use('/', exp.static(__dirname + '/dist'))

const clientBundleFileUrl = '/bundle.client.js'
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
	runInNewContext: false, // 推荐
	inject: false,
	clientManifest
})

// getHomeInfo请求
express.get('/api/getHomeInfo', (req, res) => {
    res.send('SSR发送请求')
})

express.get('*', (req, res)=> {
	const context = { url: req.url }
	let state = JSON.stringify(context.state)
	renderer.renderToString(context, (err, html)=>{
		if (err) { return res.state(500).end('运行时错误') }
		res.end(html)
	})
})

// 服务器监听地址
express.listen(8888, () => {
    console.log('服务器已启动！')
})

