

let vue_public_app
let routes
let public_opts







let article = {

	_outputviewid: "#markdownit-view",
	_hidden_block: "#hidden-block",

	manager: {
		article_root_path: "https://whiterasbk.github.io/wblog/res/article/",
		article_index_path: "https://whiterasbk.github.io/wblog/res/article-index.json"
	},

	render: function(articleid){


		vue_public_app.hidden_block_msg = "文章加载中..."

		$(article._hidden_block).slideDown();



		$.get(article.manager.article_root_path + articleid, function(data) {



			$(article._outputviewid).html(window.markdownit().render(data))


			// console.log(window.markdownit().render(data));
			setTimeout(1*1000, function() {
				$(article._hidden_block).slideUp('slow/400/fast');
				
			})

			vue_public_app.hidden_block_msg = ""

		});

		// vue_public_app.$router.replace();
	},

	setout: function(element) {
		this._outputviewid = $(element);
	}
}




