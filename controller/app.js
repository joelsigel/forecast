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
						<div class="col-xs-8">
							<h1>$2,345.32</h1>
						</div>
					 </div>
					 <div class="row">
					 	<div class="col-xs-4">
							<div class="utilities auto">
								<span class="line"></span>
								<p>Auto</p>
								<h5>$220.00</h5>
								<span class="pull-right">
									<i class="fas fa-car"></i>
								</span>
							</div>
						</div>
						<div class="col-xs-4">
							<div class="utilities electrical">
								<span class="line"></span>
								<p>Electrical</p>
								<h5>$120.56</h5>
								<span class="pull-right">
									<i class="fas fa-bolt"></i>
								</span>
							</div>
						</div>
						<div class="col-xs-4">
							<div class="utilities internet">
								<span class="line"></span>
								<p>Internet</p>
								<h5>$158.73</h5>
								<span class="pull-right">
									<i class="fas fa-wifi"></i>
								</span>
							</div>
						</div>
					 </div>
					 <div class="row">
					 	<div class="col-xs-4">
							<div class="utilities phone">
								<span class="line"></span>
								<p>Phone</p>
								<h5>$180.00</h5>
								<span class="pull-right">
									<i class="fas fa-phone"></i>
								</span>
							</div>
						</div>
						<div class="col-xs-4">
							<div class="utilities insurance">
								<span class="line"></span>
								<p>Insurance</p>
								<h5>$115.84</h5>
								<span class="pull-right">
									<i class="fas fa-shield"></i>
								</span>
							</div>
						</div>
						<div class="col-xs-4">
							<div class="utilities mortage">
								<span class="line"></span>
								<p>Mortage</p>
								<h5>$1158.56</h5>
								<span class="pull-right">
									<i class="fas fa-home"></i>
								</span>
							</div>
						</div>
					 </div>
				 </div>
				 <div class="panel-footer">
			 	 	<div class="row" align="center">
						<div class="col-xs-3">
							<i class="fal fa-archive fa-2x"></i>
							<br><small>Something</small>
						</div>
						<div class="col-xs-3">
							<i class="fal fa-chart-bar fa-2x active"></i>
							<br><small class="active">Something</small>
						</div>
						<div class="col-xs-3">
							<i class="fal fa-plus fa-2x"></i>
							<br><small>Something</small>
						</div>
						<div class="col-xs-3">
							<i class="fal fa-cogs fa-2x"></i>
							<br><small>Something</small>
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
