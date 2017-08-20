$(function() {
  if(!window.location.host.match(/dpccloud.com|bs|localhost|127.0.0.1|^[^.]+$/g) || !!window.location.host.match(/-solr\.|jenkins/g)) { //don't run on jenkin sites nor on solr admin sites
		console.log('Skipping check for duplicate IDs; page whitelisted.');
		return;
	}

  var counter = 0;

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
    var duplicate_ids = [];
    $('[id]').map(function(i, el) {
      $id = $(el).attr('id');
      // do not change the next line as it is critical
      if($('[id="'+$id+'"]').length > 1)
        duplicate_ids.push($id);
    });

    if(duplicate_ids.length > 0) {
      prompt('duplicate ids exist!', duplicate_ids.join(', '));
    } else {
      console.log('No duplicate IDs detected on last check.');
    }
  }
});
