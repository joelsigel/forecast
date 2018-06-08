class Utilities {

	init() {
		this.content();
	}

  // content
	content() {

    var total = 0;
    $('.cost').each(function(i, obj) {
      total += parseInt($(this).text());
    });
    line(total);
  	function line(total) {
  		var average = 0;
  		$('.cost').each(function(i, obj) {
  			average = parseInt($(this).text())/total;
  			// percent of each
    		// console.log(average*100);
  			if (average*100 > 60) {
  				average = average*100 - 10;
  			} else {
  				average = average*100 + 10;
  			}
  			$(this).siblings('.line').animate({width: average+'%'}, 1500);

      });
  	}

	}

}
