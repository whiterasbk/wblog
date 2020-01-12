

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



var public_opts = {
	el: "#vue_public_scop",

	data: {
		whiter:2,
		hidden_block_title: '',
		hidden_block_msg: '',
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
				template: '<div class=""> as {{ whiter }} </div>',
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
				template: `<div id="markdownit-view"></div>`,
			},	

			beforeEnter: (to, from, next) => {
p(this.vue_public_app)

				new article(to.params.id).render(this.vue_public_app);


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

var vue_public_app = new Vue(public_opts);





$("#hidden-block").hide();
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

	this.render = function(ctx){


		window.vue_public_app.hidden_block_msg = "文章加载中..."

		$(_hidden_block).slideDown();

		$.get(manager.article_root_path + articleid, function(data) {



			$(_outputviewid).html(window.markdownit().render(data))


			// console.log(window.markdownit().render(data));
			setTimeout(1*1000, function() {
				$(_hidden_block).slideUp('slow/400/fast');
				
			})

			window.vue_public_app.hidden_block_msg = ""

		});

		// vue_public_app.$router.replace();
	};

	this.setout = function(element) {
		_outputviewid = $(element);
	}		
}



function p(argument) {
	console.log(argument);
}