if (typeof(ymaps) !== "undefined") {
	ymaps.ready(init);
	var yaMap;
	function init() {
		ymaps.geocode(addr, {
			results: 1
		}).then(function (res) {

			var coords = res.geoObjects.get(0).geometry.getCoordinates(),
				myPlacemark = new ymaps.Placemark(coords, {
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/bg/bg_icons_marker.png',
					iconImageSize: [27, 39],
					iconImageOffset: [-14, -39]
				});
			
			yaMap = new ymaps.Map("map",{
				center: coords,
				zoom: 16,
				controls: []
			});

			yaMap.geoObjects.add(myPlacemark);
		});
	}
}