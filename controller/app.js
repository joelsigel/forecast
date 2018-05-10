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
			var avail = (data.available ? 'enabled' : 'disabled');

			// test iteration of array
			console.log(i);

			// set content
			content = `
			<div class="col-xs-offset-1 col-xs-10 col-sm-offset-0 col-sm-6">
				<div class="panel panel-primary">
				  <div class="panel-heading">
						<div class="row">
							<div class="col-xs-10">
								<span class="title">`+avail+`</span>
							</div>
							<div class="col-xs-2">
				    		<span class="options-menu"><i class="fal fa-sliders-h"></i></span>
							</div>
						</div>
				 </div>
				 <div class="panel-body">
				   <div class="row">
					 	<div class="col-xs-4">
							<h5>May<br><small>2018</small></h5>
						</div>
						<div class="col-xs-4">
							<h1>$2,345.32</h1>
						</div>
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
