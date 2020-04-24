<!DOCTYPE HTML>
<html lang="pl">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<link rel="stylesheet" href="styles/styleKawa.css">	
	<title>Osadnicy - gra przeglądarkowa</title>
		<style>
			body{
				background-image: url("img/4.jpg");
			}
		</style>
	</head>
	
	<body>
		<div id="information">
			<p>Dziękujemy Ci,</p>
				<?php


		$login = $_POST['login'];
		$haslo = $_POST['haslo'];
		
		echo "$login, Witaj w grze!!!";

	
?>	
			<p>, za zapisanie się na kurs</p>
		</div>
		<div id="back">
			<a href="Topic.html">Back</a>
		</div>
	</body>
	
</html>