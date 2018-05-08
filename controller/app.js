class App {

	// init
	init() {
		this.template();
		this.content();
	}

	// template
	template() {
		var frame, content;
		frame = $('.frame');
		content = `
			<header class="navbar"></header>
			<section class="section"></section>
		`;
		frame.html(content);
	}

	// content
	content() {
		var storage = new Storage(), app = new App();
		$.getJSON('data/data.json', function(json) {
			if (Object.keys(json).length < 1) {
				console.log('json data empty');
			}
			else {
				console.log('json data loaded');
				storage.dataRead(json);
				app.loadData(json);
			}
		});
	}

	// load data
	loadData(json) {
		for (var i=0; i < Object.keys(json).length; i++) {
			var data, content;
			data = json[i];

			// data sets
			var avail = (data.available ? 'available' : 'not-available');

			// test iteration of array
			console.log(i);

			// set content
			content = `
			<div class="col-xs-6">
				<div class="panel panel-primary">
				  <div class="panel-heading">
						<span class="title">`+avail+`</span>
				    <span class="options-menu"><i class="fal fa-sliders-h fa-2x"></i></span>
				 </div>
				 <div class="panel-body">
				   <div class="row">

					 </div>
				 </div>
			  </div>
		  </div>
		  `;


			// append data
			$('.section').append(content);

			// secondary scripts
			// $(document).ready(function() {

			// });


		}
	}

}
