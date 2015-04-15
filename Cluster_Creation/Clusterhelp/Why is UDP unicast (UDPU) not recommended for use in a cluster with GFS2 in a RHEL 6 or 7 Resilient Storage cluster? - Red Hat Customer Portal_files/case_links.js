ajq(document).ready(function () {
	// this should be bullet proof, but I will try/catch just for _extra_ safety... thinking of etowns
	try {
		if (Drupal.portal.currentUser.isInternal) {
				do_it();
		}
	} catch (err) {
	}
});

function do_it() {
	// short circut as to not display on edit pages
	if (document.location.href.indexOf("edit") != -1) {
		return;
	}

        var URL = '/rs/cases?linked=https://api.'+window.location.host+'/rs/solutions/';
	var nid = null;

        //find nid of solution
        var explode = document.URL.split('/');
        if(isInteger(explode[4]) === true && explode[3] === 'solutions') {
            var nid = explode[4];
        }

	if (nid !== null) { 
            ajq.getJSON(URL + nid, function(data) {                
                var content = "";
                var sideBar = ajq('#sidebar div.region-sidebar-second div.section');
                if(typeof data === 'object' && typeof data.case !== 'undefined') {
                    ajq.each( data.case, function( key, val ) {
                        if(isInteger(val.case_number) === true) {
                            //content += "<li>" + "<a href='" + host + "/support/cases/#/case/" + val.case_number+"'>" + val.case_number + "</a>";
                            content += "<li>" + "<a href='" + "/support/cases/#/case/" + val.case_number+"'>" + val.case_number + "</a>";
                            if(typeof val.linked_by !== 'undefined') {
                                content += " - " + val.linked_by +" </li>";
                            }
                            else {
                                content += "</li>";
                            }
                        }
                    });
                    sideBar.append('<div id="case-links" class="block"><h2 class="block-title">Case links (Internal)</h2><p class="caseLinksNote">Note: this information is only visible to Red Hat associates</p><div class="content">'+content+'</div></div>');
                }
            });
	}
}

/**
 * Check if it is a number
 * @param {int} x (a number)
 * @returns {Boolean} 
 */
function isInteger(x) {
    return x % 1 === 0;
}