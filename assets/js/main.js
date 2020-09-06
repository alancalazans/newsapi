let API_KEY = "56bbdc057c384409ab463d48f7925411";

let html, tagAAtiva = $('a.active');

deactiveCategoriaAtiva = () => {
	if(tagAAtiva != undefined) {
		$(tagAAtiva).attr('class', 'category deactive');
	}
}

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
				<p style="color: #4c4e4d;"><strong><%=obj.articles[i].source.name%></strong></p><br>
				<p style="color: #cc0000;"><strong><em><%=obj.articles[i].publishedAt%></em></strong></p><br>
				<p><a href="<%=obj.articles[i].url%>" target="_blank"><h3><%=obj.articles[i].title%></h3></a></p><br>
				<%if(obj.articles[i].content != "" || obj.articles[i].content != null){%>
					<p style="font-weight: bold;"><%=obj.articles[i].content%></p>
				<%} else if(obj.articles[i].description != "" || obj.articles[i].description != null){%>
					<p style="font-weight: bold;"><%=obj.articles[i].description%></p>
				<%}%>
			</div>
		<%}%>`;

	$("#container").html(ejs.render(html, { obj: obj }));

}

loadNews = (category) => {
	let url = `assets/php/categoryNewsApi.php?category=${category}`;

	fetch(url)
	.then(res => res.json())
	.then(json => showContent(json))
	.catch(err => {
		// trata se alguma das promises falhar
		console.log(err.message);
	});
}

searchNews = (assunto) => {
	let url = 'assets/php/searchNewsApi.php';
	fetch(url, {
		method: 'post',
		headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
		body: `assunto=${assunto}`
	})
	.then(res => res.json())
	.then(json => showContent(json))
	.catch(err => {
		// trata se alguma das promises falhar
		console.log(err.message);
	});
}

$(() => {
	loadNews('general');

	$(".nav-items").on("click", "a", function (event) {
		let href = $(this).attr('href');
		switch (href) {
			case '#general':
				loadNews('general');
				deactiveCategoriaAtiva();
				$(this).attr('class', 'category active');
				tagAAtiva = $('a.active');
				break;
			case '#business':
				loadNews('business');
				deactiveCategoriaAtiva();
				$(this).attr('class', 'category active');
				tagAAtiva = $('a.active');
				break;
			case '#entertainment':
				loadNews('entertainment');
				deactiveCategoriaAtiva();
				$(this).attr('class', 'category active');
				tagAAtiva = $('a.active');
				break;
			case '#health':
				loadNews('health');
				deactiveCategoriaAtiva();
				$(this).attr('class', 'category active');
				tagAAtiva = $('a.active');
				break;
			case '#science':
				loadNews('science');
				deactiveCategoriaAtiva();
				$(this).attr('class', 'category active');
				tagAAtiva = $('a.active');
				break;
			case '#sports':
				loadNews('sports');
				deactiveCategoriaAtiva();
				$(this).attr('class', 'category active');
				tagAAtiva = $('a.active');
				break;
			case '#technology':
				loadNews('technology');
				deactiveCategoriaAtiva();
				$(this).attr('class', 'category active');
				tagAAtiva = $('a.active');
				break;
		}
	});

	document.querySelector('form').addEventListener('submit', event => {
		event.preventDefault();
		deactiveCategoriaAtiva();
		tagAAtiva = undefined;
		searchNews($('#search-data').val());
	});

});
