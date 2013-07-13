Template.resultItem.ucFirst = function  (str) {
	str += '';
	str = str.split(" ");
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].toLowerCase();
		str[i] = str[i].charAt(0).toUpperCase()+str[i].substr(1);	
	};
	// console.log(str.join(/**/" "));
  	return str.join(" ").trim();
}