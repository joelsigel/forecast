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
							<h5>May<br><small>2018</small></h5>
						</div>
						<div class="col-xs-8">
							<h1 class="current"><?php echo $g_data['total-amount']; ?></h1>
						</div>
				 	</div>
					<section class="utility-drop"></section>
				</div>

				 <div class="panel-footer">
			 	 	<div class="row" align="center">
						<div class="col-xs-3 col-sm-3">
							<i class="fal fa-archive fa-2x"></i>
							<br><small>Archive</small>
						</div>
						<div class="col-xs-3 col-sm-3">
							<i class="fal fa-chart-bar fa-2x active"></i>
							<br><small class="active">Analytics</small>
						</div>
						<div class="col-xs-3 col-sm-3">
							<i class="fal fa-plus fa-2x"></i>
							<br><small>Add</small>
						</div>
						<div class="col-xs-3 col-sm-3">
							<i class="fal fa-cogs fa-2x"></i>
							<br><small>Settings</small>
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
		$('.current').load("pull/data-pull.php").fadeIn();
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
			    <h5 class="cost">`+mortgagecost+`</h5>
			    <span class="pull-right">
			      <i class="fas fa-home"></i>
			    </span>
			  </div>
			</div>
			<div class="col-xs-6 col-sm-4">
			  <div class="utilities phone">
			    <span class="line"></span>
			    <p>Phone</p>
			    <h5 class="cost">196.14</h5>
			    <span class="pull-right">
			      <i class="fas fa-phone"></i>
			    </span>
			  </div>
			</div>
			<div class="col-xs-6 col-sm-4">
			  <div class="utilities insurance">
			    <span class="line"></span>
			    <p>Insurance</p>
			    <h5 class="cost">152.97</h5>
			    <span class="pull-right">
			      <i class="fas fa-shield"></i>
			    </span>
			  </div>
			</div>
			<div class="col-xs-6 col-sm-4">
			  <div class="utilities security">
			    <span class="line"></span>
			    <p>Security</p>
			    <h5 class="cost">55.99</h5>
			    <span class="pull-right">
			      <i class="fas fa-lock"></i>
			    </span>
			  </div>
			</div>
			<div class="col-xs-6 col-sm-4">
			  <div class="utilities electrical">
			    <span class="line"></span>
			    <p>Electrical</p>
			    <h5 class="cost">149.57</h5>
			    <span class="pull-right">
			      <i class="fas fa-bolt"></i>
			    </span>
			  </div>
			</div>
			<div class="col-xs-6 col-sm-4">
			  <div class="utilities internet">
			    <span class="line"></span>
			    <p>Internet</p>
			    <h5 class="cost">166.53</h5>
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
