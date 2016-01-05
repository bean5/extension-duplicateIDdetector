$(function() {
	if(!window.location.host.match(/dpccloud.com|bs|localhost|127.0.0.1|^[^.]+$/g) || !!window.location.host.match(/kibana|-solr\.|jenkins/g)) { //don't run on jenkin sites nor on solr admin sites
		console.log('Skipping check for duplicate IDs; page whitelisted.');
		return;
	}

	var counter = 0;
	var whitelisted_duplicates = ["Layer_1"];

	//must use Chrome's event listener system to subscribe to node insertion event
	document.addEventListener('DOMNodeInserted', function() {
		var tempCounter = ++counter;

		setTimeout(function() {
		if(tempCounter !== counter)
			return;
			detectDuplicateIDs();
		}, 5000);
	});

	detectDuplicateIDs();

	function detectDuplicateIDs() {
		//gather duplicate IDs
		var duplicate_ids = [], ignored_duplicate_ids = [];
		$('[id]').map(function(i, el) {
			$id = $(el).attr('id');
			if($('[id="'+$id+'"]').length > 1) {
				if(whitelisted_duplicates.indexOf($id) != -1) {
					duplicate_ids.push($id);
				} else {
					ignored_duplicate_ids.push($id);
				}
			}
		});

		//prompt about worrisome duplicate IDs
		if(duplicate_ids.length > 0) {
			prompt('duplicate ids exist!', duplicate_ids.join(', '));
		} else {
			console.log('No duplicate IDs detected on last check.');
		}

		//log about ignored duplicate IDs
		if(ignored_duplicate_ids.length > 0) {
			console.warn('duplicate ids exist that were ignored: ' + ignored_duplicate_ids.join(', '));
		}
	}
});
