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
				// console.log('json data empty');
			}
			else {
				// console.log('json data loaded');
				storage.dataRead(json);
				app.loadData(json);
				app.loadUtilities(json);
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
			var institute = (data.available && data.bank ? data.bank.name : '');

			// test iteration of array
			// console.log(i);

			// set content
			content = `
			<div class="col-xs-offset-1 col-xs-10">
				<div class="panel panel-primary">
				  <div class="panel-heading">
						<div class="row">
							<div class="col-xs-12">
								<span class="title">`+institute+`</span>
							</div>
							<div class="col-xs-12">
								<div class="progress">
									<div class="progress-bar progress-bar-danger" role="progressbar" style="width:0%">
										Data download complete...
									</div>
								</div>
							</div>
						</div>
				 </div>
				 <div class="panel-body">
			   	<div class="row">
				 		<div class="col-xs-4">
							<h5 id="month"></h5>
						</div>
						<div class="col-xs-8">
							<h1 class="current"><i class="fal fa-circle-notch fa-spin"></i><?php echo $g_data['total-amount']; ?></h1>
						</div>
				 	</div>
					<section class="utility-drop"></section>
					<section id="archive-drop" class="hidden">
						<div class="row">
							<div class="col-xs-12">
								<span class="archive-date">
									<small class="info"><i class="fas fa-hdd"></i> 05/01/2018</small> <small>| Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...</small>
								</span>
							</div>
							<div class="col-xs-12">
								<span class="archive-date">
									<small class="info"><i class="fas fa-hdd"></i> 04/01/2018</small> <small>| Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...</small>
								</span>
							</div>
						</div>
					</section>
					<section id="add-drop" class="hidden">
						<div class="row">
							<div class="col-xs-12">
								<div class="add-palette">
									<div class="input-group">
										<span class="input-group-addon">
											<input id="palette" type="color" value="#ff0000">
										</span>
										<input disabled id="color" type="text" class="form-control" name="color" placeholder="#ff0000">
									</div>
								</div>
								<div class="add-details">
									<div class="input-group">
										<span class="input-group-addon"><i class="fal fa-tags"></i></span>
										<input disabled id="email" type="text" class="form-control" name="label" placeholder="Label">
									</div>
									<div class="input-group">
										<span class="input-group-addon"><i class="fal fa-credit-card"></i></span>
										<input disabled id="cost" type="text" class="form-control" name="cost" placeholder="$10.00">
									</div>
									<div class="input-group">
										<span class="input-group-addon"><i class="fal fa-watch"></i></span>
										<input disabled id="icon" type="text" class="form-control" name="icon" placeholder="fa-watch">
									</div>
									<button type="button" class="btn btn-info">Add</button>
								</div>
							</div>
						</div>
					</section>
					<section id="data-drop" class="hidden">
						<div class="row">
							<div class="col-xs-12 col-sm-6" align="center">
								<div id="doughnutChart" class="chart"></div>
							</div>
							<div class="col-xs-12 col-sm-6">
								<div class="chart-p">
									<span class="line"></span>
									<p>Monthly utilities and bills are collected and tallied in the graph. Note that each color corresponds with each category.</p>
								</div>
								<div class="chart-p">
									<span class="line"></span>
									<p><i class="fas fa-exclamation-triangle"></i> Ladipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
							</div>
						</div>
					</section>
				</div>

				 <div class="panel-footer">
			 	 	<div class="row" align="center">
						<div class="col-xs-3">
							<span class="footer-btn" onclick="archive();">
								<span class="fa-layers fa-fw fa-2x">
									<i class="fas fa-hdd"></i>
									<span class="fa-layers-counter">2</span>
								</span>
								<br><small>Archive</small>
							</span>
						</div>
						<div class="col-xs-3 col-sm-3">
							<span id="analytics">
								<i class="fal fa-chart-bar fa-2x active"></i>
								<br><small class="active">Analytics</small>
							</span>
						</div>
						<div class="col-xs-3 col-sm-3">
							<span class="footer-btn" onclick="add();">
								<i class="fal fa-plus fa-2x"></i>
								<br><small>Add</small>
							</span>
						</div>
						<div class="col-xs-3 col-sm-3">
							<span class="footer-btn" onclick="data();">
								<i class="fal fa-chart-pie fa-2x"></i>
								<br><small>Data</small>
							</span>
						</div>
					</div>
				 </div>
			  </div>
		  </div>
		  `;


			// append data
			$('.section').append(content);

		}
		// google sheet data pull
		$('.current').load("pull/data-pull.php").fadeIn();

		// load on ready options
		$( document ).ready(function() {

				// data loader
				$(".progress-bar").animate({
						    width: "100%"
						}, 200);
				//
				$('.footer-btn').on('click', function() {
					$('.footer-btn').not(this).find('small').removeClass('active');
					$('.footer-btn').not(this).find('svg').removeClass('active');
					$(this).find('small').toggleClass('active');
					$(this).find('svg').toggleClass('active');
				});

				//
				timestamp();
				total();
				palette();


		});

	}


	// load utilities
	loadUtilities(json) {
		for (var i=0; i < Object.keys(json).length; i++) {
			var data, rowstart, content, rowend;
			data = json[i];

			//
			var mortgage = (data.available && data.utilities ? data.utilities.mortgage.name : "");
			var mortgagecost = (data.available && data.utilities ? data.utilities.mortgage.amount : "");


			if (i % 3 === 0) {
				rowstart =`<div class="row">`;
			}
			else {
				rowstart=``;
			}

			content = `
			<div class="col-xs-6 col-sm-4">
			  <div class="utilities `+mortgage+`">
			    <span class="line"></span>
			    <p>`+mortgage+`</p>
			    <h5 class="cost" id="`+mortgage+`">`+mortgagecost+`</h5>
			    <span class="pull-right">
			      <i class="fas fa-home"></i>
			    </span>
			  </div>
			</div>
			<div class="col-xs-6 col-sm-4">
			  <div class="utilities phone">
			    <span class="line"></span>
			    <p>Phone</p>
			    <h5 class="cost" id="phone">196.14</h5>
			    <span class="pull-right">
			      <i class="fas fa-phone"></i>
			    </span>
			  </div>
			</div>
			<div class="col-xs-6 col-sm-4">
			  <div class="utilities insurance">
			    <span class="line"></span>
			    <p>Insurance</p>
			    <h5 class="cost" id="insurance">152.97</h5>
			    <span class="pull-right">
			      <i class="fas fa-shield"></i>
			    </span>
			  </div>
			</div>
			<div class="col-xs-6 col-sm-4">
			  <div class="utilities security">
			    <span class="line"></span>
			    <p>Security</p>
			    <h5 class="cost" id="security">55.99</h5>
			    <span class="pull-right">
			      <i class="fas fa-lock"></i>
			    </span>
			  </div>
			</div>
			<div class="col-xs-6 col-sm-4">
			  <div class="utilities electrical">
			    <span class="line"></span>
			    <p>Electrical</p>
			    <h5 class="cost" id="electrical">149.57</h5>
			    <span class="pull-right">
			      <i class="fas fa-bolt"></i>
			    </span>
			  </div>
			</div>
			<div class="col-xs-6 col-sm-4">
			  <div class="utilities internet">
			    <span class="line"></span>
			    <p>Internet</p>
			    <h5 class="cost" id="internet">166.53</h5>
			    <span class="pull-right">
			      <i class="fas fa-wifi"></i>
			    </span>
			  </div>
			</div>
			`;

			if (i % 3 === 0) {
				rowend =`</div>`;
			}
			else {
				rowend=``;
			}

			$('.utility-drop').append(rowstart + content + rowend);
		}
	}


}
