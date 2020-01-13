

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



window.onload = function() {

	

	$.ajax({
		url: 'https://whiterasbk.github.io/wblog/res/article-index.json',
		type: 'GET',
		dataType: 'json',
	})
	.done(function(data) {
		vue_public_app.article_list = data
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	

}



var public_opts = {
	el: "#vue_public_scop",

	data: {
		whiter:2,
		hidden_block_title: '',
		hidden_block_msg: '',
		hidden_block: false,
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

				<div v-if="">
					<ol class="breadcrumb">
  						<li><a href="#">{{ toString($router.app.article_list)  }}</a></li>
  						<li><a href="#">Library</a></li>
  						<li class="active">Data</li>
					</ol>
					<div class="label label-default">sex</div>

					<div id="markdownit-view"></div>
				</div>

				`,
			},	

			beforeEnter: (to, from, next) => {
				
				new article(to.params.id).render(router.app);



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
	p(vue_public_app)
  p(to)
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


	let load_list = function (ctx){
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
							ctx.current_article.classic = i;
							ctx.current_article.detail = data[i];

						

							
						
						}
						
						p(data[i][k])
						p(data[i][k]['id'] == articleid || data[i][k]['title'] == articleid)
					}
					

					window.vue_public_app.article_list = data

					// p(data[i])
					
					p(window.vue_public_app.article_list)			
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

	this.render = function(ctx){

		try {
			ctx.hidden_block_msg = "文章加载中..."

			ctx.hidden_block = true;


			$(_hidden_block).slideDown();
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
		


		load_list(ctx)


		$.ajax({
			url: manager.article_root_path + articleid,
			type: "GET",
			success: function(data) {

				$(_outputviewid).html(window.w_markdownit.render(data))


						// console.log(window.markdownit().render(data));
						setTimeout(function() {
							$(_hidden_block).slideUp('slow/400/fast');
							ctx.hidden_block = false;
							ctx.hidden_block_msg = "";

						}, 2 * 1000);

						


					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						ctx.hidden_block_msg = "你要找的文章自己插上翅膀飞走了";
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

