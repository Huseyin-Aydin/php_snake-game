<?php
$page="main-menu";
if(isset($_GET['page']))
	$page=$_GET['page'];
include './pages/'.$page.'.html';
?>