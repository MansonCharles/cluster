/*global angular, define, s*/
/*jslint browser: true*/

/**
 * Omniture-specific values and functions.
 *
 * @module analytics/adapters/omniture/events
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2013-2015
 */
define([
	'jquery',
	'jsUri',
	'analytics/events',
	'analytics/attributes',
	'analytics/adapters/omniture/attributes',
	'chrome_lib',
	'underscore',
	'analytics/separators',
	's_code'
], function (
	$,
	jsUri,
	events,
	attributes,
	om_attrs,
	lib,
	_,
	separators
) {

	"use strict";

	var event_definitions;
	var saved_values = {};

	/**
	 * This function's argument can be either a string or a function.  If it's
	 * a function, it returns a function that calls that function.  If it's a
	 * string, it returns a function that returns that string.  Probably more
	 * confusing than necessary... I just added it to avoid some code
	 * duplication.
	 *
	 * var s = "hello ";
	 * var f = function () { return "world" };
	 * var output = "";
	 *
	 * output += get_val(s)();
	 * output += get_val(f)();
	 *
	 * console.log(output);
	 * "hello world"
	 *
	 */
	function get_val(obj, key) {
		switch (typeof obj[key]) {
		case 'string':
			return function () {
				return obj[key];
			};
		case 'object':
			return function () {
				return obj[key];
			};
		case 'function':
			return function (e) {
				return obj[key](e);
			};
		default:
			return function () {
				return undefined;
			};
		}
	}

	/**
	 * should we call the event.should_call?
	 * a helper function for the conditional in trigger()
	 *
	 * @private
	 */
	function should_call(event_def) {
		if (typeof event_def.should_call !== 'function') {
			return true;
		}
		return event_def.should_call();
	}

	event_definitions = {

		RHNDownload: function RHNDownloadEvent(products) {

			return {
				event_name: 'RHNDownload',
				values: {
					linkTrackVars   : "prop62,eVar36,eVar37,eVar62,eVar63,events,products",
					linkTrackEvents : "event65",
					events          : "event65",
					products        : function () {
						return om_attrs.prep_value("Products", products);
					},
					prop62: function () {
						return om_attrs.prep_value("UserSessionID", attributes.get("UserSessionID"));
					},
					eVar36: function () {
						return om_attrs.prep_value("UserNumber", attributes.get("UserNumber"));
					},
					eVar37: function () {
						return om_attrs.prep_value("UserLogin", attributes.get("UserLogin"));
					},
					eVar62: function () {
						return om_attrs.prep_value("UserSessionID", attributes.get("UserSessionID"));
					},
					eVar63: function () {
						return om_attrs.prep_value("CustomerNumber", attributes.get("CustomerNumber"));
					}
				},
				linkType: "d",
				linkName: "RHNDownload",
				call_tl: true
			};
		},
		CSPDownload: function CSPDownloadEvent(products) {
			// 'symlink' this event to RHNDownload
			var csp_download_event = event_definitions.RHNDownload(products);
			csp_download_event.linkName = "CSPDownload";
			csp_download_event.event_name = "CSPDownload";
			return csp_download_event;
		},
		UnifiedDownload: function UnifiedDownloadEvent(products) {
			// 'symlink' this event to RHNDownload
			var unified_download_event = event_definitions.RHNDownload(products);
			unified_download_event.linkName = "UnifiedDownload";
			unified_download_event.event_name = "UnifiedDownload";
			return unified_download_event;
		},
		DockerImageDownload: function DockerImageDownloadEvent(products) {
			// 'symlink' this event to RHNDownload
			var docker_download_event = event_definitions.RHNDownload(products);
			docker_download_event.linkName = "DockerImageDownload";
			docker_download_event.event_name = "DockerImageDownload";
			docker_download_event.values.products = function (ev) {
				var product_name = lib.getEventTarget(ev).getAttribute('data-product-name') + " Docker Image";
				return om_attrs.prep_value("Products", product_name);
			};
			return docker_download_event;
		},
		ProductPageDownload: function ProductPageDownloadEvent(products) {
			// 'symlink' this event to RHNDownload
			var download_event = event_definitions.RHNDownload(products);
			download_event.linkName = "ProductPageDownload";
			download_event.event_name = "ProductPageDownload";
			download_event.values.products = function (ev) {
				var product_name = lib.getEventTarget(ev).getAttribute('data-product-name');
				return om_attrs.prep_value("Products", product_name);
			};
			return download_event;
		},
		PortalProductDownload: {
			event_name: 'PortalProductDownload',
			values: {
				linkTrackVars: "prop75",
				prop75: "Product Page File Download Link"
			},
			linkName: "Product Page File Download Link",
			linkType: "o",
			call_tl: true
		},
		ABTestImpression: {
			event_name: 'ABTestImpression',
			values: {
				events: "event58"
			},
			call_tl: false
		},
		ABTestSuccess: {
			event_name: 'ABTestSuccess',
			values: {
				events: "event59",
				linkTrackEvents: "event59",
				linkTrackVars: "events"
			},
			linkType: "o",
			linkName: function () {
				var retval = "A/B Success";
				// If eVar59 exists, prepend it to the linkname
				if (typeof s.eVar59 !== "undefined") {
					retval = s.eVar59 + " | " + retval;
				}
				return retval;
			},
			call_tl: true
		},
		PortalSearch: function PortalSearchEvent() {

			function prop6() {
				// "product | language | kcsState | article_type | documentKind | DIVERGED"
				var facets = angular.element($('#searchbrowseapp')).scope().$$childHead.filterQuery;
				var values = [facets.documentKind, facets.product || facets.documentation_product];
				// remove separators.comma_nsp's
				values = _.each(values, function (v,k,l) {
					l[k] = _.map(l[k], function (s) { return s.replace(separators.comma_nsp, ''); });
				});
				values = _.map(values, separators.join(separators.comma_nsp));

				// turn empty strings into the string "undefined"
				values = _.map( values, function(s) {
					if (s.length === 0) {
						return "undefined";
					} else {
						return s;
					}
				}); 

				return values.join(separators.pipe);
			}

			return {
				event_name: 'PortalSearch',
				values: {

					// prop6 and eVar13 have the same value
					prop6: prop6,
					eVar13: function () { return this.prop6(); },

					// prop17 and eVar4 have the same value
					prop17 : function () {
						var retval;
						if (location.href.indexOf('q') >= 0) {
							try {
								retval = jsUri('?' + jsUri(location.href).anchor().slice(2))
								.getQueryParamValue('q')
								.replace(/\+/g, ' ');
							} catch (e) {
								// If any of the functions in the chained functions
								// above throw errors, catch them and return
								// undefined instead.
								retval = undefined;
							}
						}
						return retval;
					},
					eVar4: function () { return this.prop17(); },

					// prop33 and eVar33 have the same value
					prop33: "Onsite Search",
					eVar33: function () { return this.prop33; },

					events: function () {
						var event_list = [];
						if (this.prop17()) {
							event_list.push("event14");
						}
						if (this.prop6()) {
							event_list.push("event16");
						}
						// TODO include "event67" if search is prompted by an auto-suggest selection
						return event_list.join(',');
					}
				},
				call_tl: false
			};

		},
		CertificationSearch: function () {
			// build this array:
			// [
			//     ECOSYSTEM_VALUE,
			//     CATEGORY_VALUE,
			//     [ VENDOR_1, VENDOR_2, VENDOR_3, VENDOR_4, VENDOR_5 ],
			//     [ CERTIFIED_FOR_1, CERTIFIED_FOR_2, CERTIFIED_FOR_3 ],
			//     [ REGION_1, REGION_2, REGION_3 ],
			//     [ LANGUAGE_1, LANGUAGE_2, LANGUAGE_3 ],
			// ];
			// then turn it into "ecosystem_value | cat_value | vendor1,vendor2,vendor3 | cfor1,cfor2,cfor3 | reg1,reg2,reg3 | lang1,lang2,lang3"

			// 'symlink' this event to PortalSearch
			var evt             = event_definitions.PortalSearch();
            var searchservice   = angular.element($('#catalogsearch')).scope().$$childTail.SearchService;
			var keyword         = searchservice.currentQuery;
            var ecosystem_value = searchservice[ 'primary' + searchservice.searchMode ];
            var category_value  = searchservice.searchMode;
            var selected_facets;
            var m;

			evt.event_name = 'CertificationSearch';

            selected_facets = _.chain(searchservice)
            .pick('vendors', 'supportedLanguages', 'regions', 'portalCertifications')
            .mapObject( _.partial(_.filter, _, _.property('selected') ) ) // filter out unselected
            .mapObject( _.partial(_.map, _, _.property('name') ) )        // map from {name:'foo'} to 'foo'
            .mapObject( separators.strip_comma_from_array )               // map from {name:'foo'} to 'foo'
            .mapObject( separators.join(separators.comma_nsp) )           // join arrays with unspaced commas
            .value();

            m = [
                ecosystem_value                      || "undefined",
                category_value                       || "undefined",
                selected_facets.vendors              || "undefined",
                selected_facets.portalCertifications || "undefined",
                selected_facets.regions              || "undefined",
                selected_facets.supportedLanguages   || "undefined"
            ].join(separators.pipe);

			evt.values.prop6  = function () { return m; };
			evt.values.prop17 = function () { return String(keyword); };
			evt.values.prop33 = "certification search";

            return evt;

		},
		PortalSearchResultClick: function PortalSearchResultClickEvent() {
			return {
				event_name: 'PortalSearchResultClick',
				values: {
					linkTrackEvents: function (e) {
						var event_list = ["event22"];
						var is_keymatch = false;
						try {
							is_keymatch = lib.getEventTarget(e).getAttribute('class').indexOf('keymatch') >= 0;
						} catch (err) {
							// catch error if target element or class attribute don't exist... no worries
						}
						if (is_keymatch) {
							event_list.push('event68');
						}
						return event_list.join(',');
						// TODO add ",event68" if the click-through is prompted by
						// a keymatch selection.
					},
					linkTrackVars: "eVar65,events",
					eVar65: function (e) {
						var rank = ~~$(lib.getEventTarget(e)).attr('rank'),
						page = ~~$('.pager-num.pager-current').text(),
						page_rank = rank + (10 * (page - 1));
						return page_rank;
					},
					// events should have the same values as linkTrackEvents
					events: function (e) { return this.linkTrackEvents(e); }
				},
				call_tl: true,
				linkType: "o",
				linkName: "search result click-through"
			};
		},
		CertificationSearchResultClick: function CertificationSearchResultClickEvent() {
			// 'symlink' this event to PortalSearchResultClick
			var evt = event_definitions.PortalSearchResultClick();
			evt.event_name = 'CertificationSearchResultClick';
			evt.values.linkTrackEvents = function () { return "event22"; };
			evt.values.eVar65 = function (e) {
			    var rank = $(e.currentTarget).parents('tr').index();
			    return rank;
			};
			evt.linkName = "certification search result click-through";
			return evt;
		},
		LabsBegin : {
			event_name: 'LabsBegin',
			values : {
				events: "event33",
				prop33: function () { return attributes.get('ResourceType'); },
				eVar33: function () { return this.prop33(); }
			},
			call_tl: false,
			should_call: function () {
				var key = 'labs_begin_' + this.values.prop33() + '_' + window.getCookieValue('chrome_session_id');

				if (lib.store.session.get(key) === true) {
					return false;
				}

				lib.store.session.set(key, true);
				return true;
			},
			linkType: 'o',
			linkName: function () {
				return 'labs | ' + this.values.prop33();
			}
		},
		LabsCompletion : {
			event_name: 'LabsCompletion',
			values : {
				events: "event34",
				linkTrackEvents: "event34",
				prop33: function () { return attributes.get('ResourceType'); },
				eVar33: function () { return this.prop33(); }
			},
			call_tl: true,
			should_call: function () {
				var key = 'labs_complete_' + this.values.prop33() + '_' + window.getCookieValue('chrome_session_id');

				if (lib.store.session.get(key) === true) {
					return false;
				}

				lib.store.session.set(key, true);
				return true;
			},
			linkType: 'o',
			linkName: function () {
				this.call_once = false;
				return 'labs | ' + this.values.prop33();
			}
		},
		LabsCompletionPage : {
			event_name: 'LabsCompletionPage',
			values : {
				events: "event34"
			},
			call_tl: false
		},
		MoreLikeThisSolution : {
			event_name: 'MoreLikeThisSolution',
			values : {
				prop33: 'more_like_this',
				linkTrackVars: 'prop33'
			},
			call_tl: true,
			linkType: 'o',
			linkName: 'more_like_this | solution | solution'
		},
		MoreLikeThisArticle : {
			event_name: 'MoreLikeThisArticle',
			values : {
				prop33: 'more_like_this',
				linkTrackVars: 'prop33'
			},
			call_tl: true,
			linkType: 'o',
			linkName: 'more_like_this | article | article'
		},
		OpenSupportCase : {
			event_name: 'OpenSupportCase',
			values : {
				events: "event61,event63",
				prop61: "CaseCreation",
				eVar61: "CaseManagement"
			},
			call_tl: false
		},
		OpenSupportCaseRecommendationClick : {
			event_name: 'OpenSupportCaseRecommendationClick',
			values : {
				events: "event34,event66",
				prop61: "CaseRecommendation",
				linkTrackVars: "prop61,events",
				linkTrackEvents: "event34,event66"
			},
			call_tl: true,
			linkType: 'o',
			linkName: function (ev) {
				var target = lib.getEventTarget(ev),
					rec_type = "Undefined",
					has_get_attr;

				has_get_attr = typeof target !== "undefined" &&
					typeof target.getAttribute === "function";

				if (has_get_attr) {
					rec_type = target.getAttribute('data-rec-type');
				}
				return "RecommendationLink" + rec_type;
			}
		},
		OpenSupportCaseSubmit : {
			event_name: 'OpenSupportCaseSubmit',
			values : {
				events: "event62,event64",
				prop61: "CaseSubmit",
				eVar61: "CaseManagement",
				linkTrackVars: "prop61,eVar61,events",
				linkTrackEvents: "event62,event64"
			},
			call_tl: true,
			linkType: "o",
			linkName: "CaseSubmitButton"
		},
		CaseViewRecommendationClick : {
			event_name: 'CaseViewRecommendationClick',
			values: {},
			call_tl: true,
			linkType: "o",
			linkName: "RecommendationLinkOnCaseViewPage"
		},
		SurveyProductDocumentationClick : {
			event_name: 'SurveyProductDocumentationClick',
			values : {
				linkTrackVars: "eVar67,events",
				linkTrackEvents: "event71",
				events: "event71",
				eVar67: function() {
					return attributes.get("UserSessionID");
				}
			},
			call_tl: true,
			linkType: "o",
			linkName: "Product Documentation Survey"
		}
	};

	/**
	 * Get the `this` argument for Omniture's `s.tl` function.
	 *
	 * `s.tl`'s first argument is called `this`, and as per the Omniture
	 * documentation, it should be the target DOM element if the event's target
	 * element has an `href` attribute.  If it doesn't have an `href`
	 * attribute, it should be set to `true`.  Why?  Beats me.
	 *
	 * @param {DOMElement} target The target element.
	 * @memberof module:analytics/adapters/omniture/events
	 * @private
	 */
	function get_tl_this_arg(target) {
		var retval;
		if (typeof target === 'object' && typeof target.hasAttribute === 'function' && target.hasAttribute('href')) {

			retval = target;

		} else {
			retval = true;
		}
		return retval;
	}

	/**
	 * Remove all the values associated with the given event from the global
	 * `s` object.  Replace them with the values that existed before the event
	 * was called.
	 *
	 * @param {string} event_name The name of the event to wipe.
	 * @memberof module:analytics/adapters/omniture/events
	 */
	function wipe(event_name) {

		pop_values(event_name);

	}

	/**
	 * Call an event without checking to see whether it should be called.  {@link
	 * module:analytics/adapters/omniture/events.trigger trigger}, on the other
	 * hand, does a series of checks to see whether it's appropriate to invoke
	 * the given event.
	 *
	 * @memberof module:analytics/adapters/omniture/events
	 * @param {string} event_name The name of the event to call.
	 * @param {Event} e The DOM event which caused this function to be called.
	 * @param {object} data Any arbitrary data that might need to be passed in.  Not used by the eloqua adapter, currently.
	 * @param {function} callback A callback function to be run after this request has completed.
	 */
	function call_event(event_name, dom_event, data, callback) {
		var value,
			prop_val,
			event_s,
			event_this,
			link_type,
			link_name,
			event_obj,
			event_def,
			target;

		event_def = get_val(event_definitions, event_name)(data);

		if (should_call(event_def) === false) {
			return;
		}

		event_obj = new events.AnalyticsEvent(event_def);

		if (event_obj.call_tl) {
			add_customer_info(event_obj);
		}

		if (typeof dom_event === "undefined") {
			dom_event = {};
		} else {
			target = lib.getEventTarget(dom_event);
		}

		// Use omniture's window.s object
		event_s = window.s;

		// save any existing values of the s object that this event would overwrite;
		push_values(event_name);

		// Copy everything in event_obj.values onto the s object
		for (value in event_obj.values) {
			if (event_obj.values.hasOwnProperty(value)) {
				prop_val = get_val(event_obj.values, value)(dom_event);

				if (typeof prop_val !== "undefined") {
					// s.events can have multiple values, so we don't want to
					// overwrite them.  instead, append *new* values.
					if (value === "events") {
						add_event_value(event_s, prop_val);
					} else {
						// For s object properties other than s.events, simply
						// overwrite any existing values if the prop_val is not
						// undefined :)
						event_s[value] = prop_val;
					}
				}
			}
		}

		// Set s.linkType and s.linkName
		link_type = get_val(event_obj, "linkType")(dom_event);
		link_name = get_val(event_obj, "linkName")(dom_event);

		// Set prop75 to the link_name for all s.tl() calls.
		event_s.prop75 = link_name;
		add_value(event_s, "linkTrackVars", "prop75");

		// Call s.tl() if necessary for this event
		if (event_obj.call_tl) {
			event_this = get_tl_this_arg(target);
			event_s.tl(event_this, link_type, link_name, null, callback);
		}
	}

	/**
	 * Save an s object variable's value to be restored later.
	 *
	 * When events are fired, they sometimes modify the s object's values.  And
	 * when multiple events are fired on the same page, sometimes they
	 * accidentally bring along the values that a previous event set.  To
	 * circumvent this, PAF implements a value storage system that preserves
	 * existing values when events are fired, and restores them when the event
	 * has finished.
	 *
	 * This function preserves a value, see {@link
	 * module:analytics/adapters/omniture/events.pop_value pop_value} for how
	 * to restore a value.
	 *
	 * @param {string} event_name The name of the event that's about to be
	 * fired.
	 * @private
	 * @memberof module:analytics/adapters/omniture/events
	 */
	function push_values(event_name) {

		var event_def = event_definitions[event_name];
		var prop;
		var prop_val;
		var value_store = {};

		// get all the variable names that this particular event sets, and
		// their corresponding current values from window.s
		for (prop in event_def.values) {
			if (event_def.values.hasOwnProperty(prop)) {
				prop_val = event_def.values[prop];
				value_store[prop] = window.s[prop];
			}
		}

		// if this event doesn't have an array of saved values, create one
		if (!(saved_values[event_name] instanceof Array)) {
			saved_values[event_name] = [];
		}

		// save the values!
		saved_values[event_name].push(value_store);
	}

	/**
	 * Restore an s object variable's value after an event has fired.
	 *
	 * See {@link module:analytics/adapters/omniture/events.push_value
	 * push_value} for a full description, including how to save a value.
	 *
	 * @param {string} event_name The name of the event that was just fired.
	 * example, "eVar27" or "prop33".
	 * @private
	 * @memberof module:analytics/adapters/omniture/events
	 */
	function pop_values(event_name) {
		var restored;
		var prop;
		if (saved_values[event_name] instanceof Array) {
			restored = saved_values[event_name].pop();
			for (prop in restored) {
				if (restored.hasOwnProperty(prop)) {
					window.s[prop] = restored[prop];
				}
			}
		}
	}

	/**
	 * Add CustomerNumber (evar63) tracking to the given event object.
	 *
	 * @param {object} event_obj The event object to add CustomerNumber to.
	 * @memberof module:analytics/adapters/omniture/events
	 * @private
	 */
	function add_customer_info(event_obj) {
		var cn = om_attrs.attributes.CustomerNumber;
		var ul = om_attrs.attributes.UserLogin;
		var un = om_attrs.attributes.UserNumber;
		var customer_number_var = 'eVar' + cn.evar;
		var user_login_var = 'eVar' + ul.evar;
		var user_number_var = 'eVar' + un.evar;
		var ltv;
		if (typeof event_obj.values.linkTrackVars === 'string') {
			ltv = event_obj.values.linkTrackVars.split(',');
		} else {
			ltv = [];
		}
		ltv.unshift(customer_number_var);
		ltv.unshift(user_login_var);
		ltv.unshift(user_number_var);
		event_obj.values[customer_number_var] = attributes.get('CustomerNumber');
		event_obj.values[user_login_var] = attributes.get('UserLogin');
		event_obj.values[user_number_var] = attributes.get('UserNumber');
		event_obj.values.linkTrackVars = ltv.join(',');
	}

	/**
	 * Trigger a given event in the Omniture adapter.
	 *
	 * @memberof module:analytics/adapters/omniture/events
	 * @param {string} event_name The name of the event to trigger.
	 * @param {Event} e The DOM event which caused this function to be called.
	 * @param {object} data Any arbitrary data that might need to be passed in.  Not used by the eloqua adapter, currently.
	 * @param {function} callback A callback function to be run after this request has completed.
	 */
	function trigger(event_name, e, data, callback) {
		var event_def;

		if (event_definitions.hasOwnProperty(event_name)) {

			event_def = get_val(event_definitions, event_name)(data);

			// If this is an s.tl event (ie. an asynchronous event) invoke it
			// immediately.  Otherwise, do nothing.  It will sit in the
			// pending_events queue and will eventually be picked up by a call
			// to report().
			if (event_def.call_tl === true) {
				call_event(event_name, e, data, callback);
			}
		}
	}

	/**
	 * Add a value to a comma-separated list.
	 *
	 * @param {object} obj A reference to an object to be sent to Omniture.
	 * Typically `window.s`, but in certain cases a temporary copy of
	 * `window.s` is used.
	 * @param {string} property The name of the property to add the value to.
	 * @param {string} value The value to add to the `s.events` string.
	 *
	 * @example
	 * chrometwo_require(['analytics/adapters/omniture/events'], function (om_events) {
	 *     om_events.add_value(window.s, "events", "event61");
	 * });
	 */
	function add_value(obj, property, value) {
		if (typeof obj[property] === 'undefined' || obj[property] === "") {
			obj[property] = value;
		} else {
			if (typeof obj[property].indexOf !== 'undefined') {
				if (obj[property].indexOf(value) === -1) {
					obj[property] = [obj[property], value].join(',');
				}
			}
		}
	}

	/**
	 * Add an event to the `s.events` string.
	 *
	 * If the string is empty, just add it.  If there are existing events, add
	 * the new one to the comma-delimited list.  Unless it already exists, in
	 * which case don't add it again.
	 *
	 * @param {object} s_obj A reference to an object to be sent to Omniture.
	 * Typically `window.s`, but in certain cases a temporary copy of
	 * `window.s` is used.
	 * @param {string} value The value to add to the `s.events` string.
	 *
	 * @example
	 * chrometwo_require(['analytics/adapters/omniture/events'], function (om_events) {
	 *     om_events.add_event_value(window.s, "event61");
	 * });
	 */
	function add_event_value(s_obj, value) {
		add_value(s_obj, "events", value);
	}

	/**
	 * Remove an event from the `s.events` string.
	 *
	 * @param {object} s_obj A reference to an object to be sent to Omniture.
	 * Typically `window.s`, but in certain cases a temporary copy of
	 * `window.s` is used.
	 * @param {string} value The value to remove from the `s.events` string.
	 *
	 * @example
	 * chrometwo_require(['analytics/adapters/omniture/events'], function (om_events) {
	 *     om_events.remove_event_value(window.s, "event61");
	 * });
	 */
	function remove_event_value(s_obj, value) {
		var index, array_cnv;
		if (typeof s_obj.events !== 'undefined' && s_obj.events !== "") {
			if (typeof s_obj.events.indexOf !== 'undefined') {
				index = s_obj.events.indexOf(value);
				array_cnv = s_obj.events.split(',');
				if (index !== -1) {
					array_cnv.splice(index, 1); // remove it
					s_obj.events = array_cnv.join(','); // apply it back to the s obj
				}
			}
		}
	}

	return {
		trigger            : trigger,
		wipe               : wipe,
		event_definitions  : event_definitions,
		call_event         : call_event,
		add_event_value    : add_event_value,
		remove_event_value : remove_event_value
	};

});
