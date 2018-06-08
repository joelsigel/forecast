class Palette {

	init() {
		this.content();
	}

  // content
	content() {

		var colorWell = document.querySelector("#palette");
	  colorWell.addEventListener("input", colorVal, true);

  	function colorVal(event) {
  		$("#palette").attr('value', event.target.value);
  		$("#color").attr('placeholder', event.target.value);
  		console.log(event.target.value);
  	}
	}

}
