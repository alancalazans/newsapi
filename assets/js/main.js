let API_KEY = "56bbdc057c384409ab463d48f7925411",
    html,
    url,
    categoriaAtiva = $('li.active');

deactiveCategoriaAtiva = () => {
	if(categoriaAtiva != undefined) {
		$(categoriaAtiva).attr('class', 'nav-item');
	}
}

showContent = (obj) => {

	html = "";

	html = `
		<%for (let i in obj.articles) {%>
			<div class="item radius5">
				<%if(obj.articles[i].urlToImage != null){%>
					<p><img class="radius5" src="<%=obj.articles[i].urlToImage%>" title="" alt="Imagem não pode ser exibida"></p>
				<%} else {%>
					<img src="assets/img/svg/sem_img.svg" alt="Card image cap">
				<%}%>
				<p style="color: #4c4e4d;"><strong><%=obj.articles[i].source.name%></strong></p>
				<p style="color: #cc0000;"><strong><em><%=obj.articles[i].publishedAt%></em></strong></p>
				<p><a href="<%=obj.articles[i].url%>" target="_blank"><h5><%=obj.articles[i].title%></h5></a></p>
				<%if(obj.articles[i].content != "" || obj.articles[i].content != null){%>
					<p style="font-weight: bold;"><%=obj.articles[i].content%></p>
				<%} else if(obj.articles[i].description != "" || obj.articles[i].description != null){%>
					<p style="font-weight: bold;"><%=obj.articles[i].description%></p>
				<%}%>
			</div>
		<%}%>`;

	$("#container").html(ejs.render(html, { obj: obj }));

}

const loadNews = async (category) => {
	url = `https://newsapi.org/v2/top-headlines?country=br&category=${category}&apiKey=${API_KEY}`;

	try {
		let response = await axios.get(url)

		showContent(response.data)
	}
	catch(error) {
		// trata se alguma das promises falhar
		console.log(error.message);
	}
}

const searchNews = async (assunto) => {
	url = `https://newsapi.org/v2/everything?q=${assunto}&apiKey=${API_KEY}`;
	
	try {
		let response = await axios.get(url)

		showContent(response.data)
	}
	catch(error) {
		// trata se alguma das promises falhar
		console.log(error.message);
	}
}

$(() => {
	loadNews('general');

	$("#op").on("click", "a", function (event) {
		let href = $(this).attr('href');
		switch (href) {
			case '#general':
				$('html,body').scrollTop(0);
				loadNews('general');
				deactiveCategoriaAtiva();
				$(this).parent().attr('class', 'nav-item active');
				categoriaAtiva = $('li.active');
				break;
			case '#business':
				$('html,body').scrollTop(0);
				loadNews('business');
				deactiveCategoriaAtiva();
				$(this).parent().attr('class', 'nav-item active');
				categoriaAtiva = $('li.active');
				break;
			case '#entertainment':
				$('html,body').scrollTop(0);
				loadNews('entertainment');
				deactiveCategoriaAtiva();
				$(this).parent().attr('class', 'nav-item active');
				categoriaAtiva = $('li.active');
				break;
			case '#health':
				$('html,body').scrollTop(0);
				loadNews('health');
				deactiveCategoriaAtiva();
				$(this).parent().attr('class', 'nav-item active');
				categoriaAtiva = $('li.active');
				break;
			case '#science':
				$('html,body').scrollTop(0);
				loadNews('science');
				deactiveCategoriaAtiva();
				$(this).parent().attr('class', 'nav-item active');
				categoriaAtiva = $('li.active');
				break;
			case '#sports':
				$('html,body').scrollTop(0);
				loadNews('sports');
				deactiveCategoriaAtiva();
				$(this).parent().attr('class', 'nav-item active');
				categoriaAtiva = $('li.active');
				break;
			case '#technology':
				$('html,body').scrollTop(0);
				loadNews('technology');
				deactiveCategoriaAtiva();
				$(this).parent().attr('class', 'nav-item active');
				categoriaAtiva = $('li.active');
				break;
		}
	});

	document.querySelector('form').addEventListener('submit', event => {
		event.preventDefault();
		$('html,body').scrollTop(0);
		deactiveCategoriaAtiva();
		categoriaAtiva = undefined;
		searchNews($('#search').val());
	});

});
