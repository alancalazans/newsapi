<?php
	$assunto = isset($_POST['assunto']) ? $_POST['assunto'] : '';

	if (!empty($assunto)){
		$contents = file_get_contents('https://newsapi.org/v2/everything?q='.urlencode($assunto).'&apiKey=56bbdc057c384409ab463d48f7925411');
		echo $contents;
	} else {
		echo('Nenhuma pesquisa informada');
	}
?>
