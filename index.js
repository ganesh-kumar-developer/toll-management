let Toll = function (item) {
	let self = this;
	self.name = item.name || '';
	self.vechile_types = [];
	for (let i = 0; i < 4; i++) {
		if (item.vechile_types)
			self.vechile_types.push(new VechileFeesType(item.vechile_types[i]));
		else
			self.vechile_types.push(new VechileFeesType({}));
	}
}

let VechileFeesType = function (item) {
	let self = this;
	self.category = item.category || '';
	self.single_entry = item.single_entry || '';
	self.return_entry = item.return_entry || '';
}

let Entry = function (item) {
	let self = this;
	self.toll_name = item.toll_name || '';
	self.entry_type = item.entry_type || '';
	self.vechile_type = item.vechile_type || '';
	self.vechile_number = item.vechile_number || '';
	self.tariff = item.tariff || '';
	self.date_time = item.date_time || '';
}

let tolls = [];
let vehicle_entries = [];
let toll_names = ['Tirunelveli', 'Sattur', 'Madurai'];
let vechile_types = [{
		label: 'CAR/JEEP/VAN',
		value: 'CAR/JEEP/VAN',
		disable: false
	},
	{
		label: 'LCV',
		value: 'LCV',
		disable: false
	},
	{
		label: 'TRUCK/BUS',
		value: 'TRUCK/BUS',
		disable: false
	},
	{
		label: 'HEAVY VEHICLE',
		value: 'HEAVY VEHICLE',
		disable: false
	},
];

tolls.push(new Toll({
	name: 'Tirunelveli',
	vechile_types: [{
			alias: 'lite',
			category: 'CAR/JEEP/VAN',
			single_entry: 30,
			return_entry: 60
		},
		{
			alias: 'medium',
			category: 'LCV',
			single_entry: 50,
			return_entry: 95
		},
		{
			alias: 'heavy',
			category: 'TRUCK/BUS',
			single_entry: 100,
			return_entry: 205
		},
		{
			alias: 'insturial',
			category: 'HEAVY VEHICLE',
			single_entry: 160,
			return_entry: 320
		}
	]
}));
tolls.push(new Toll({
	name: 'Sattur',
	vechile_types: [{
			alias: 'lite',
			category: 'CAR/JEEP/VAN',
			single_entry: 130,
			return_entry: 160
		},
		{
			alias: 'medium',
			category: 'LCV',
			single_entry: 150,
			return_entry: 195
		},
		{
			alias: 'heavy',
			category: 'TRUCK/BUS',
			single_entry: 200,
			return_entry: 405
		},
		{
			alias: 'insturial',
			category: 'HEAVY VEHICLE',
			single_entry: 360,
			return_entry: 420
		}
	]
}));
tolls.push(new Toll({
	name: 'Madurai',
	vechile_types: [{
			alias: 'lite',
			category: 'CAR/JEEP/VAN',
			single_entry: 50,
			return_entry: 100
		},
		{
			alias: 'medium',
			category: 'LCV',
			single_entry: 150,
			return_entry: 200
		},
		{
			alias: 'heavy',
			category: 'TRUCK/BUS',
			single_entry: 300,
			return_entry: 350
		},
		{
			alias: 'insturial',
			category: 'HEAVY VEHICLE',
			single_entry: 400,
			return_entry: 450
		}
	]
}));
vehicle_entries.push(new Entry({
	vechile_type: 'CAR/JEEP/VAN',
	entry_type: 'Single journey',
	vechile_number: 'A13',
	tariff: 30,
	toll_name: 'Sattur',
	date_time: new Date().toLocaleString()
}));
vehicle_entries.push(new Entry({
	vechile_type: 'LCV',
	entry_type: 'Return journey',
	vechile_number: 'A1',
	tariff: 30,
	toll_name: 'Tirunelveli',
	date_time: new Date().toLocaleString()
}));
vehicle_entries.push(new Entry({
	vechile_type: 'TRUCK/BUS',
	entry_type: 'Single journey',
	vechile_number: 'A1',
	tariff: 30,
	toll_name: 'Sattur',
	date_time: new Date().toLocaleString()
}));

if (!localStorage.tolls) {
	localStorage.setItem("tolls", JSON.stringify(tolls));
}
if (!localStorage.vehicle_entries) {
	localStorage.setItem("vehicle_entries", JSON.stringify(vehicle_entries));
}
if (!localStorage.toll_names) {
	localStorage.setItem("toll_names", JSON.stringify(toll_names));
}

console.log('tolls: ', tolls);
console.log('vehicle_entries: ', vehicle_entries);
console.log('toll_names: ', toll_names);
console.log('localStorage: ', localStorage);

function openPopup(id) {
	var modal = document.getElementById(id);
	if (modal) {
		let close = modal.getElementsByClassName("popup-close")[0];
		let cssObj = window.getComputedStyle(modal, null);
		let opacity = cssObj.getPropertyValue("opacity");

		if (opacity == '0') {
			modal.style.opacity = "1";
			modal.style.visibility = "visible";
		} else {
			modal.style.opacity = "0";
			modal.style.visibility = "hidden";
		}

		close.onclick = function () {
			modal.style.opacity = "0";
			modal.style.visibility = "hidden";
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.opacity = "0";
				modal.style.visibility = "hidden";
			}
		}
	}
}

function showToast(data) {
	let toastWrapper = document.getElementById('toast-wrapper');
	let toast = document.getElementById('toast-status');
	let message = document.getElementById('toast-message');
	let faIcon = document.getElementById('fa-icon');
	let close = document.getElementsByClassName("close-toast")[0];
	let cssObj = window.getComputedStyle(toastWrapper, null);
	let opacity = cssObj.getPropertyValue("opacity");

	if (data) {
		let icon = 'fa-info-circle';
		if (data.status == 'error') {
			icon = 'fa-times-circle'
		} else if (data.status == 'success') {
			icon = 'fa-check-circle';
			setTimeout(function () {
				toastWrapper.style.opacity = "0";
				toastWrapper.style.visibility = "hidden";
			}, 1000);
		} else if (data.status == 'warning') {
			icon = 'fa-exclamation-circle';
		}
		faIcon.classList.remove('fa-info-circle');
		faIcon.classList.remove('fa-times-circle');
		faIcon.classList.remove('fa-check-circle');
		faIcon.classList.remove('fa-exclamation-circle');
		faIcon.classList.add(icon);

		toast.classList.remove('success');
		toast.classList.remove('warning');
		toast.classList.remove('error');
		toast.classList.remove('info');
		toast.classList.add(data.status);

		message.innerHTML = data.message;
	}

	toastWrapper.style.opacity = "1";
	toastWrapper.style.visibility = "visible";


	close.onclick = function () {
		toastWrapper.style.opacity = "0";
		toastWrapper.style.visibility = "hidden";
	}
	window.onclick = function (event) {
		if (event.target == toastWrapper) {
			toastWrapper.style.opacity = "0";
			toastWrapper.style.visibility = "hidden";
		}
	}
}