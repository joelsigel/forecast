class Storage {

	// init
	init() {

	}

	// data
	dataRead(data) {
		localStorage.setItem('dataRead', JSON.stringify(data));
	}
}
