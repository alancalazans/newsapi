<?php
	$category = isset($_GET['category']) ? $_GET['category'] : '';

	if (! empty($category)){
		$contents = file_get_contents('http://newsapi.org/v2/top-headlines?country=br&category='.$category.'&apiKey=56bbdc057c384409ab463d48f7925411');
		echo $contents;
	} else {
		echo('Nenhuma pesquisa informada');
	}
?>
