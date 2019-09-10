<?php
if($_POST){
	$q=json_decode(file_get_contents('./settings.json'));
	$w=Array();
	foreach($q as $q=>$z){
	if(trim($q)!=trim($_POST['title'])) $w[$q]=$z;
	else $w[$q]=trim($_POST['color']);
}
	$a=fopen('./settings.json','w');
	fwrite($a,json_encode($w));
	fclose($a);
}
?>