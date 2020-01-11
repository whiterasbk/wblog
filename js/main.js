


let routes = [
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

			console.log(to);

			article.setout("#markdownit-view");
			article.render(to.params.id);

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
]

let public_opts = {
	el: "#vue_public_scop",

	data: {
		whiter:2,
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

	router: new VueRouter({routes: routes})
}

let vue_public_app = new Vue(public_opts);





$("#hidden-block").show()

$.get('https://whiterasbk.github.io/wblog/res/test.md', function(data) {

			// $("#preview").innerHTML = marked(data);
			// var md = window.markdownit();
			
			$("#markdownit-view").html(window.markdownit().render(data));

			$("#hidden-block").slideUp('slow/400/fast', function() {

			});

			// let md = window.markdownit();
			// var result = md.render(data);
			// document.getElementById('preview').innerHTML = result
		});