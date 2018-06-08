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


			// debts
			var debt01name = (data.available && data.debts ? data.debts.debt01.name : "");
			var debt01short = (data.available && data.debts ? data.debts.debt01.short : "");
			var debt01amount = (data.available && data.debts ? data.debts.debt01.amount : "");
			var debt02name = (data.available && data.debts ? data.debts.debt02.name : "");
			var debt02short = (data.available && data.debts ? data.debts.debt02.short : "");
			var debt02amount = (data.available && data.debts ? data.debts.debt02.amount : "");
			var debt03name = (data.available && data.debts ? data.debts.debt03.name : "");
			var debt03short = (data.available && data.debts ? data.debts.debt03.short : "");
			var debt03amount = (data.available && data.debts ? data.debts.debt03.amount : "");

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
					<section id="debts-drop" class="hidden">
						<div class="row">
							<div class="col-xs-6 col-sm-4">
							  <div class="utilities `+debt01short+`">
							    <span class="line"></span>
							    <p>`+debt01name+`</p>
							    <h5 class="debtTotal" id="`+debt01short+`">`+debt01amount+`</h5>
							    <span class="pull-right">
							      <i class="fas fa-credit-card-front"></i>
							    </span>
							  </div>
							</div>
							<div class="col-xs-6 col-sm-4">
							<div class="utilities `+debt02short+`">
								<span class="line"></span>
								<p>`+debt02name+`</p>
								<h5 class="debtTotal" id="`+debt02short+`">`+debt02amount+`</h5>
							    <span class="pull-right">
							      <i class="fas fa-credit-card"></i>
							    </span>
							  </div>
							</div>
							<div class="col-xs-6 col-sm-4">
							<div class="utilities `+debt03short+`">
								<span class="line"></span>
								<p>`+debt03name+`</p>
								<h5 class="debtTotal" id="`+debt03short+`">`+debt03amount+`</h5>
							    <span class="pull-right">
							      <i class="fas fa-credit-card-front"></i>
							    </span>
							  </div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12 col-sm-6 buffer" align="center">
								<div id="debtChart" class="chart"></div>
							</div>
							<div class="col-xs-12 col-sm-6 buffer">
								<div class="utilities">
									<h4>Note that each color corresponds with each category of debt.</h4>
									<span class="pull-right">
										<i class="fas fa-chart-pie"></i>
									</span>
								</div>
								<div class="utilities">
									<h4>Please note that all data is updated as debts are reported.</h4>
									<span class="pull-right">
										<i class="fas fa-exclamation-triangle"></i>
									</span>
								</div>
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
								<div id="dataChart" class="chart"></div>
							</div>
							<div class="col-xs-12 col-sm-6">
								<div class="utilities">
									<h4>Note that each color corresponds with each category.</h4>
									<span class="pull-right">
										<i class="fas fa-chart-pie"></i>
									</span>
								</div>
								<div class="utilities">
									<h4>Please note that all data is updated as bills are reported.</h4>
									<span class="pull-right">
										<i class="fas fa-exclamation-triangle"></i>
									</span>
								</div>
							</div>
						</div>
					</section>
				</div>

				 <div class="panel-footer">
			 	 	<div class="row" align="center">
						<div class="col-xs-3">
							<span class="footer-btn" onclick="debts();">
								<span class="fa-layers fa-fw fa-2x">
									<i class="fas fa-credit-card-front"></i>
									<span class="fa-layers-counter"></span>
								</span>
								<br><small>Debts</small>
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

				// debt counter
				var debtcount = $('.debtTotal').length;
				$('.fa-layers-counter').append(debtcount);

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

				// timestamp
				var time = new Time();
				time.init();

				// utilities
				var utilities = new Utilities();
				utilities.init();

				// debts
				var debts = new Debts();
				debts.init();

				// palette
				var palette = new Palette();
				palette.init();


		});

	}


	// load utilities
	loadUtilities(json) {
		for (var i=0; i < Object.keys(json).length; i++) {
			var data, content;
			data = json[i];

			// bills
			var mortgage = (data.available && data.utilities ? data.utilities.mortgage.name : "");
			var mortgagecost = (data.available && data.utilities ? data.utilities.mortgage.amount : "");
			var phone = (data.available && data.utilities ? data.utilities.phone.name : "");
			var phonecost = (data.available && data.utilities ? data.utilities.phone.amount : "");
			var insurance = (data.available && data.utilities ? data.utilities.insurance.name : "");
			var insurancecost = (data.available && data.utilities ? data.utilities.insurance.amount : "");
			var security = (data.available && data.utilities ? data.utilities.security.name : "");
			var securitycost = (data.available && data.utilities ? data.utilities.security.amount : "");
			var electrical = (data.available && data.utilities ? data.utilities.electrical.name : "");
			var electricalcost = (data.available && data.utilities ? data.utilities.electrical.amount : "");
			var internet = (data.available && data.utilities ? data.utilities.internet.name : "");
			var internetcost = (data.available && data.utilities ? data.utilities.internet.amount : "");


			content = `
			<div class="row">
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
				  <div class="utilities `+phone+`">
				    <span class="line"></span>
				    <p>`+phone+`</p>
				    <h5 class="cost" id="`+phone+`">`+phonecost+`</h5>
				    <span class="pull-right">
				      <i class="fas fa-phone"></i>
				    </span>
				  </div>
				</div>
				<div class="col-xs-6 col-sm-4">
				  <div class="utilities `+insurance+`">
				    <span class="line"></span>
				    <p>`+insurance+`</p>
				    <h5 class="cost" id="`+insurance+`">`+insurancecost+`</h5>
				    <span class="pull-right">
				      <i class="fas fa-shield"></i>
				    </span>
				  </div>
				</div>
				<div class="col-xs-6 col-sm-4">
				  <div class="utilities `+security+`">
				    <span class="line"></span>
				    <p>`+security+`</p>
				    <h5 class="cost" id="`+security+`">`+securitycost+`</h5>
				    <span class="pull-right">
				      <i class="fas fa-lock"></i>
				    </span>
				  </div>
				</div>
				<div class="col-xs-6 col-sm-4">
				  <div class="utilities `+electrical+`">
				    <span class="line"></span>
				    <p>`+electrical+`</p>
				    <h5 class="cost" id="`+electrical+`">`+electricalcost+`</h5>
				    <span class="pull-right">
				      <i class="fas fa-bolt"></i>
				    </span>
				  </div>
				</div>
				<div class="col-xs-6 col-sm-4">
				  <div class="utilities `+internet+`">
				    <span class="line"></span>
				    <p>`+internet+`</p>
				    <h5 class="cost" id="`+internet+`">`+internetcost+`</h5>
				    <span class="pull-right">
				      <i class="fas fa-wifi"></i>
				    </span>
				  </div>
				</div>
			</div>
			`;

			$('.utility-drop').append(content);
		}
	}


}
