let API_KEY = "56bbdc057c384409ab463d48f7925411";

let html;

showContent = (obj) => {

	html = "";

	html = `
		<%for (let i in obj.articles) {%>
			<div class="item radius5">
				<%if(obj.articles[i].urlToImage != null){%>
					<p><img class="radius5" src="<%=obj.articles[i].urlToImage%>" title="" alt="Imagem não pode ser exibida"></p><br>
				<%} else {%>
					<img src="assets/img/svg/sem_img.svg" alt="Card image cap">
				<%}%>
				<p style="color: #666666;"><strong><%=obj.articles[i].source.name%></strong></p><br>
				<p style="color: #cc0000;"><strong><em><%=obj.articles[i].publishedAt%></em></strong></p><br>
				<p><a href="<%=obj.articles[i].url%>" target="_blank"><h3><%=obj.articles[i].title%></h3></a></p><br>
				<%if(obj.articles[i].content != "" || obj.articles[i].content != null){%>
					<p><%=obj.articles[i].content%></p>
				<%} else if(obj.articles[i].description != "" || obj.articles[i].description != null){%>
					<p><%=obj.articles[i].description%></p>
				<%}%>
			</div>
		<%}%>`;

	$("#container").html(ejs.render(html, { obj: obj }));

}

loadNews = (category) => {
	let url = `https://newsapi.org/v2/top-headlines?country=br&category=${category}&apiKey=${API_KEY}`;

	fetch(url)
	.then(res => res.json())
	.then(json => showContent(json))
	.catch(err => {
		// trata se alguma das promises falhar
		console.log(err.message);
	});
}

searchNews = (assunto) => {
	let url = `https://newsapi.org/v2/everything?q='${assunto}'&apiKey=${API_KEY}`;

	fetch(url)
	.then(res => res.json())
	.then(json => showContent(json))
	.catch(err => {
		// trata se alguma das promises falhar
		console.log(err.message);
	});
}

$(() => {
	loadNews('general');
	let hrefAtiva = $('a.active');

	$(".nav-items").on("click", "a", function (event) {
		let href = $(this).attr('href');
		let classe = $(this).attr('class');
		switch (href) {
			case '#general':
				loadNews('general');
				$(hrefAtiva).attr('class', 'category deactive');
				$(this).attr('class', 'category active');
				hrefAtiva = $('a.active');
				break;
			case '#business':
				loadNews('business');
				$(hrefAtiva).attr('class', 'category deactive');
				$(this).attr('class', 'category active');
				hrefAtiva = $('a.active');
				break;
			case '#entertainment':
				loadNews('entertainment');
				$(hrefAtiva).attr('class', 'category deactive');
				$(this).attr('class', 'category active');
				hrefAtiva = $('a.active');
				break;
			case '#health':
				loadNews('health');
				$(hrefAtiva).attr('class', 'category deactive');
				$(this).attr('class', 'category active');
				hrefAtiva = $('a.active');
				break;
			case '#science':
				loadNews('science');
				$(hrefAtiva).attr('class', 'category deactive');
				$(this).attr('class', 'category active');
				hrefAtiva = $('a.active');
				break;
			case '#sports':
				loadNews('sports');
				$(hrefAtiva).attr('class', 'category deactive');
				$(this).attr('class', 'category active');
				hrefAtiva = $('a.active');
				break;
			case '#technology':
				loadNews('technology');
				$(hrefAtiva).attr('class', 'category deactive');
				$(this).attr('class', 'category active');
				hrefAtiva = $('a.active');
				break;
		}
	});

	document.querySelector('form').addEventListener('submit', event => {
		event.preventDefault();
		searchNews($('#search-data').val());
	});

});
