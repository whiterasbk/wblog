

// let vue_public_app
// let routes
// let public_opts






// let article = {

// 	_outputviewid: "#markdownit-view",
// 	_hidden_block: "#hidden-block",

// 	manager: {
// 		article_root_path: "https://whiterasbk.github.io/wblog/res/article/",
// 		article_index_path: "https://whiterasbk.github.io/wblog/res/article-index.json"
// 	},

	
// }
// 
window.hljs.initHighlightingOnLoad();


window.w_markdownit = markdownit({
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return '<pre class="hljs"><code>' +
				hljs.highlight(lang, str, true).value +
				'</code></pre>';
			} catch (__) {}
		}

		return '<pre class="hljs"><code>' + w_markdownit.utils.escapeHtml(str) + '</code></pre>';
	}
});







var public_opts = {
	el: "#vue_public_scop",

	data: {
		whiter:2,
		hidden_block_title: '',
		hidden_block_msg: '',
		hidden_block: false,


		load_art_info: {
			title: "",
			msg: "",
			is_success: false,
			is_show_block: false,
		},

		article_list: {},

		current_article: {
			classic: "",
			detail: {}, 
		}
	},

	methods: {
		navbar_nav_li_click: function(e){

			let lis = $("#top_navbar-links").find('li');
			for (let index = 0; index < lis.length; index ++) {
				$(lis[index]).removeClass("active")
			} 

			$(e.currentTarget).addClass("active")

		},

		on_navbar_search_submit: function(e) {

		},

		on_logo_button_click: function (e) {
			let lis = $("#top_navbar-links").find('li');
			for (let index = 0; index < lis.length; index ++) {
				$(lis[index]).removeClass("active")
			}

			$(lis[0]).addClass("active")		
		}

	},

	router: new VueRouter({routes: [
		{
			path: "/",
			component: {
				template: '<div class=""> as {{ $router.app.whiter  }} </div>',
			},

			beforeEnter: (to, from, next) => {
				console.log(to);
				next();
			}	
		},

		{
			path: "/about",
			component: {
				template: `<div> aa: {{ whiter }} </div>`
			}
		},

		{
			path: "/article/:id",
			component: {
				template: `
				

				<div>
					<div id="article_load_msgbox" v-if="$router.app.load_art_info.is_show_block">
						<div class="alert alert-warning alert-dismissible" role="alert">
							<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<strong>{{ $router.app.load_art_info.title }}</strong>
							{{ $router.app.load_art_info.msg }}
						</div>				
					</div>

					<div v-if="$router.app.load_art_info.is_success">
						<ol class="breadcrumb">
  							<li><a href="#">归档</a></li>
  							<li><a href="#">{{ $router.app.current_article.classic }}</a></li>
  							<li class="active">{{ $router.app.current_article.detail.title }}</li>
						</ol>
						<div v-for="lable in $router.app.current_article.detail.lables">
							<div class="label label-default">{{ lable }}</div>
						</div>
						

						<div id="markdownit-view"></div>
					</div>
				</div>
							

				

				`,
			},	

			beforeEnter: (to, from, next) => {


				// new article(to.params.id).render(router.app);

				let id = to.params.id
				let app = router.app
				let vals = {
					apath: 'https://whiterasbk.github.io/wblog/res/article/',
					output_view: "#markdownit-view",
					msgbox: "#article_load_msgbox",
				}


				$.ajax({
					url: 'https://whiterasbk.github.io/wblog/res/article-index.json',
					type: 'GET',
					dataType: 'json',
				})
				.done(function(data) {



					try {

						
						for (let i in data) {

							for (let k in data[i]) {
								if (data[i][k]['id'] == id) {
									app.current_article.classic = i;
									app.current_article.detail = data[i][k];

									vals.apath += id

									$.ajax({
										url: vals.apath,
										type: 'GET',
									})
									.done(function(article_data) {

										app.load_art_info.is_show_block = true;
										app.load_art_info.is_success = true;

										app.load_art_info.msg = "文章加载中...";

										
										setTimeout(function(argument) {
											$(vals.output_view).html(window.w_markdownit.render(article_data))
										}, 1 * 1000)

										setTimeout(function() {

											$(vals.msgbox).slideUp('slow/400/fast');
											
											app.load_art_info.is_show_block = false;
											app.load_art_info.msg = "";

										}, 2 * 1000);	
							
									}).fail(function() {
										
										app.load_art_info.msg = "你要找的文章自己插上翅膀飞走了";
										app.load_art_info.is_show_block = true;
										app.load_art_info.is_success = false;
									});
									

								}
							}
					

							window.vue_public_app.article_list = data		
						}

					} catch (e) {
						p(e)
					}		


					p(app.current_article)		


				})
				.fail(function() {
					app.load_art_info.msg = "你要找的文章自己插上翅膀飞走了";
					app.load_art_info.is_show_block = true;
					app.load_art_info.is_success = false;
				});


				

				


				next();
			},

			beforeRouteEnter (to, from, next) {
    		// 在渲染该组件的对应路由被 confirm 前调用
    		// 不！能！获取组件实例 `this`
    		// 因为当守卫执行前，组件实例还没被创建
    			p(1)
    			next();
			},
			beforeRouteUpdate (to, from, next) {
    		// 在当前路由改变，但是该组件被复用时调用
    		// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    		// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    		// 可以访问组件实例 `this`
				p(2)
				next();
			},
			beforeRouteLeave (to, from, next) {
    		// 导航离开该组件的对应路由时调用
    		// 可以访问组件实例 `this`
				p(3)
				next();
			}

		},

		// 404 
		{
			path: '*',
			component: {
					template: `<div class="well"> {{ $route.params }} 404 not fun </div>`
			},

			beforeEnter: (to, from, next) => {
				console.log(to);
				next();
			}						
		}	



]})}



var router = public_opts.router;




var vue_public_app = new Vue(public_opts);


router.afterEach((to, from) => {
	// p(vue_public_app)
 //  p(to)
})



// $.get('https://whiterasbk.github.io/wblog/res/test.md', function(data) {

// 			// $("#preview").innerHTML = marked(data);
// 			// var md = window.markdownit();
			
// 			$("#markdownit-view").html(window.markdownit().render(data));

// 			$("#hidden-block").slideUp('slow/400/fast', function() {

// 			});

// 			// let md = window.markdownit();
// 			// var result = md.render(data);
// 			// document.getElementById('preview').innerHTML = result
// 		});
// 		
// 		
// 		



function article(articleid){

	let _outputviewid = "#markdownit-view";
	let _hidden_block = "#hidden-block";
	let manager = {
		article_root_path: "https://whiterasbk.github.io/wblog/res/article/",
		article_index_path: "https://whiterasbk.github.io/wblog/res/article-index.json"
	};


	let load_list = function (context){
		$.ajax({
			url: 'https://whiterasbk.github.io/wblog/res/article-index.json',
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			try {


				for (let i in data) {

					for (let k in data[i]) {
						if (data[i][k]['id'] == articleid || data[i][k]['title'] == articleid) {
							context.current_article.classic = i;
							context.current_article.detail = data[i][k];

						}
						
						// p(data[i][k])
						// p(data[i][k]['id'] == articleid || data[i][k]['title'] == articleid)
					}
					

					window.vue_public_app.article_list = data

					// p(data[i])
					
								
				}
			} catch (e) {
				p(e)
			}
			
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("acomplete");
		});		
	}


	// let parse_current = function() {
		
	// 	let data = ctx.article_list

	// 	try {


	// 		for (let i in data) {

	// 				for (let k in data[i]) {
	// 					if (data[i][k]['id'] == articleid || data[i][k]['title'] == articleid) {
	// 						ctx.current_article.classic = i;
	// 						ctx.current_article.detail = data[i][k];

	// 					}
						
	// 					// p(data[i][k])
	// 					// p(data[i][k]['id'] == articleid || data[i][k]['title'] == articleid)
	// 				}
								
	// 			}
	// 		} catch (e) {
	// 			p(e)
	// 		}
	// }
 


	// let search_article_by_id = function(key, ctx){ 
	// 	try {

	// 		load_list(ctx);
	// 		p ( 123+   ctx.article_list)

	// 		for (let c_classic in ctx.article_list) {
	// 			if (ctx.article_list[c_classic]['id'] == key || ctx.article_list[c_classic]['title'] == key) {
	// 				ctx.current_article.classic = c_classic;
	// 				ctx.current_article.detail = ctx.article_list[c_classic];

	// 				p(c_classic)
	// 				p(ctx.article_list[c_classic])

	// 				return true;
	// 			}
	// 		}
	// 	} catch (_) {
	// 		p(_)
	// 	}

	// 	return false;
	// }

	this.setout = function(element) {
		_outputviewid = $(element);
	}		

	this.render = function(vue){

		

		try {

			// let d = {}
			// for (let i in ctx) {
			// 	d[i] = ctx[i]
			// }

			p(vue)

			let h ={

			}

			for (let i in vue) {
				h[i] = vue[i]
			}

			p(h)

// load_art_info: {
// 			title: "",
// 			msg: "",
// 			is_success: false,
// 			is_show_block: false,
// 		},			

			vue._self.load_art_info.msg = "文章加载中..."

			vue.load_art_info.is_show_block = true;


			// $(_hidden_block).slideDown();
		} catch(_) {
			p(_)
		}

		

		// $.get(manager.article_root_path + articleid, function(data) {



		// 	$(_outputviewid).html(window.w_markdownit.render(data))


		// 	// console.log(window.markdownit().render(data));
		// 	setTimeout(1*1000, function() {
		// 		$(_hidden_block).slideUp('slow/400/fast');

		// 	})

		// 	window.vue_public_app.hidden_block_msg = ""

		// });
		// 
		


		load_list(vue)
		// parse_current()


		$.ajax({
			url: manager.article_root_path + articleid,
			type: "GET",
			success: function(data) {

				$(_outputviewid).html(window.w_markdownit.render(data))


						// console.log(window.markdownit().render(data));
						vue.load_art_info.is_success = true;
						setTimeout(function() {
							$(_hidden_block).slideUp('slow/400/fast');
							vue.load_art_info.is_show_block = false;
							vue.load_art_info.msg = "";

						}, 2 * 1000);

					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						vue.load_art_info.msg = "你要找的文章自己插上翅膀飞走了";
					},

					complete: function(XMLHttpRequest, textStatus) {
                        this; // 调用本次AJAX请求时传递的options参数


                    }
                });





		// vue_public_app.$router.replace();
	};

}



function p(argument) {
	console.log(argument);
}

window.onload = function() {

	$.ajax({
		url: 'https://whiterasbk.github.io/wblog/res/article-index.json',
		type: 'GET',
		dataType: 'json',
	})
	.done(function(data) {
		

		let app = vue_public_app;

		app.article_list = data;
		
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	

}