let article = {

	_outputview: null,

	manager: {
		article_root_path: "https://whiterasbk.github.io/wblog/res/article/",
		article_index_path: "https://whiterasbk.github.io/wblog/res/article-index.json"
	},

	render: function(articleid){


		$.get(manager.article_root_path + articleid, function(data) {
			output.html(window.markdownit().render(data))
		});

		vue_public_app.$router.replace();
	},

	setout: function(element) {
		_outputview = $(element);
	}
}




