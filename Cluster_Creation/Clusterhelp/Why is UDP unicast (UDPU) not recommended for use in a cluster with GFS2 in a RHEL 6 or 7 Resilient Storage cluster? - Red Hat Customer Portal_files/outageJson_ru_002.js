/*
 * This file should only contain scheduled Portal outage messages.
 *
 * The syntax for an entry is:
 * message: the message to be displayed
 * start: a Date() obj of when the message should start/appear
 * end: a Date() obj of when the message should end/disappear
 *
 * Example outage message entry:
 * {
 * message: "Outage!!!",
 * start: new Date("April 13, 2012 11:13:00"),
 * end: new Date("October 13, 2012 11:13:00")
 * }
 *
 * Another example outage message entry:
 * {
 * 		 message: "Outage test!!!",
 * 		 start: new Date("April 13, 2001 11:13:00"),
 * 		 end: new Date("October 13, 2001 11:13:00")
 * 	 },
 * 	 {
 * 		 message: "I can't believe Portal still exists!!!",
 * 		 start: new Date("January 13, 3000 11:13:00"),
 * 		 end: new Date("December 13, 3000 11:13:00")
 * 	 }
 *
 * Please remember to terminate the array of messages *without* a comma!
 * Here is a translation of a generic outage message that reads 
 * "The Customer Portal will be unavailable at times on [DATE] for scheduled maintenance. More details."
 * "[DATE] будет проводиться техническое обслуживание портала пользователей, и он может быть недоступен. Подробнее..."
 */

var portalOutageObj =
	[
{
		 message: "18 января будет проводиться техническое обслуживание портала пользователей, и он может быть недоступен. \u003ca href=\"https://access.redhat.com/announcements/1320124\"\u003eПодробнее\u003c/a\u003e.",
		 start: new Date("January 14, 2015 01:00:00"),
		 end: new Date("January 18, 2015 05:00:00")
},
{ 		
		 message: "\u003ca href=\"https://access.redhat.com/articles/1332213\"\u003e&#x041e;&#x0431;&#x044a;&#x044f;&#x0432;&#x043b;&#x0435;&#x043d;&#x0438;&#x0435;\u003c/a\u003e&#x043e;&#x0431; &#x0443;&#x044f;&#x0437;&#x0432;&#x0438;&#x043c;&#x043e;&#x0441;&#x0442;&#x0438; GHOST &#x0432; glibc.",
		 start: new Date("January 28, 2015 00:00:00"),
		 end: new Date("January 31, 2015 05:00:00")
},
{
		 message: "6 сентября будет проводиться техническое обслуживание портала пользователей, и он может быть недоступен. \u003ca href=\"https://access.redhat.com/site/announcements/1171973\"\u003eПодробнее\u003c/a\u003e.",
		 start: new Date("August 25, 2014 00:00:00"),
		 end: new Date("September 7, 2014 04:00:00")
},
{ 		
		 message: "В данный момент проводится обновление внутренних систем. Это не должно повлиять на работу портала пользователей. Однако если вы столкнулись с проблемами, свяжитесь с \u003ca href=\"https://access.redhat.com/support/contact/technicalSupport\"\u003eрегиональным представителем службы поддержки\u003c/a\u003e.",
		 start: new Date("March 25, 2015 00:00:00"),
		 end: new Date("March 29, 2015 23:59:59")
},
{ 		
		 message: "В данный момент проводится обновление внутренних систем. Это не должно повлиять на работу портала пользователей. Однако если вы столкнулись с проблемами, свяжитесь с \u003ca href=\"https://access.redhat.com/support/contact/technicalSupport\"\u003eрегиональным представителем службы поддержки\u003c/a\u003e.",
		 start: new Date("April 2, 2015 00:00:00"),
		 end: new Date("April 5, 2015 23:59:59")
},
{
		 message: "Please be patient as our teams recover from adverse weather in the Southeastern United States. We are still here serving your needs, but there may be some delays.",
		 start: new Date("Februrary 26, 2015 10:00:00"),
		 end: new Date("Februrary 26, 2015 20:00:00")
}
    ];


