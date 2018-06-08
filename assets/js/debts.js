class Debts {

	init() {
		this.content();
	}

  // content
	content() {


    var total = 0;
    $('.debtTotal').each(function(i, obj) {
      total += parseInt($(this).text());
      // console.log(total);
    });
    debtLine(total);

  	function debtLine(total) {
  		var average = 0;
  		$('.debtTotal').each(function(i, obj) {
  			average = parseInt($(this).text())/total;
  			// percent of each
    		// console.log(average*100);
  			if (average*100 > 30) {
  				average = average*100 - 10;
  			} else {
  				average = average*100;
  			}
  			$(this).siblings('.line').animate({width: average+'%'}, 1500);

      });
  	}

	}

}
