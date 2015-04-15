chrometwo_require(['jquery', 'moment', 'equalHeights', 'base'], function($) {
$(document).ready(function () {
    rewriteContentLockAnchors();
    removeMarkdownUI();
    removeUsersFromGroupBlock();
    enableSubmitEval();
    moveNotificationsElement();
    insertMarkdownInsteadOfHtml();
    hideCommentWhileReply();
    accessStateMessage();
    setupListPageFiltering();
    initPageTemplateRadios();
    if (typeof window["Emphasis"] != "undefined"){
      window.Emphasis.init();
    }
    ifHashInUrl();



    if ($('body').hasClass('kcs_external')) {
      removeCommentsPagination();
    }

    /* Make knowledge landing page top section equal */
    $('#knowledge-links li').equalHeights();
    /* Make knowledge landing page blocks the same height */
    $('.landing-blocks .block-views .block-inner').equalHeights();

    // if we are replying to a private comment, autocheck the "mark as private" checkbox
    if($('.comment').is('.reply.private')){
      $('#edit-field-kcs-private-comment-und').attr('checked', true);
    }

    // if we are adding a new solution, hide the dupe of field.
    var a = location.pathname.split("/");
    if ( a[3] == "add" || a[4] == "add" ) {
      $('#edit-field-dupe-of').hide();
    }

    /* disable video right-click save */
    $('video').bind("contextmenu", function(e) {
      e.preventDefault();
    });

    /* TODO: Needs to be officially moved to sidebar rather than view-header */
    if ($('#tax-rss-feed').length > 0) {
      $('#tax-rss-feed').detach().prependTo('#main-content');
    }

    $('.view-filters .views-submit-button, .list-filter-options .views-submit-button').find('input[type="submit"]').addClass('btn');


    $('#sidebar-toggle').click(function() {
      sidebar = $('aside#sidebar');
      toggleButton = $(this);
      if ( sidebar.hasClass('noshow') ) {
        sidebar.removeClass('noshow');
        toggleButton.addClass('icon-caret-right').removeClass('icon-caret-left').removeClass('noshow'); // >
      } else {
        sidebar.addClass('noshow');
        toggleButton.addClass('icon-caret-left').removeClass('icon-caret-right').addClass('noshow'); // <
      }
      return false;
    });

    /* Temp Page Add Fix */
    $('dl.node-type-list > dt > a[href="/node/add/page"]').eq('1').parent().hide().next('dd').hide();
    /* /End Temp Page Add Fix */

    initMomentDates();
    
  Drupal.behaviors.updateMomentJSDates = {
    attach: function(context,settings) {
      initMomentDates();
    }
  };
  Drupal.attachBehaviors('.moment_date');

    $('.cert-cancel-btn').each(function() {
          $(this).click(function(){
              history.go(-1);
              return false;
          });
          $(this).attr('href', "#");
    });
});

$(window).resize(function() {
  /* Re-fire */
  /* Make knowledge landing page top section equal */
  $('#knowledge-links li').equalHeights();
  /* Make knowledge landing page blocks the same height */
  $('.landing-blocks .block-views .block-inner').equalHeights();
});

window.hideCommentWhileReply = hideCommentWhileReply; // expose globally :(
function hideCommentWhileReply() {
  if ($('#edit-comment-body').length !== 0) {
    var commentForm = $('#comment-form');
    var commentHeader = $('h2.title.comment-form');

    Drupal.behaviors.changeLinks = {
      attach: function(context,settings) {
        if ($('.comment-form:visible').length > 2) {
          commentHeader.hide();
          commentHeader.next('form.comment-form').hide();
          $('.comment-form a.ajaxCancel').click(function() {
              $('form.comment-form[action*="ajax"]').remove();
              commentHeader.show();
              commentHeader.next('form.comment-form').show();
          });

        } else {
          commentHeader.show();
          commentHeader.next('form.comment-form').show();
        }
      }
    };

    Drupal.attachBehaviors('li.comment-reply');
  }
}

window.removeCommentsPagination = removeCommentsPagination;
function removeCommentsPagination() {
  var pager = $('#comments ul.pager');
  if (pager.length > 0) {
    $('#comments ul.pager').remove();
    fetchComments(1, 1);
  }
}

window.fetchComments = fetchComments;
function fetchComments(pageNum, commentCount) {
  $('<div>').load('?page='+pageNum+' #comments', function() {
      var tmpDiv = $(this);
      var stop = false;

      if ($(tmpDiv).find('.pager-next').length === 0) {
        stop = true;
      }

      $('#comments h2.element-invisible').before(tmpDiv.find('div.comment').each(function() {
            var comment = $(this);
            comment.removeClass('even');
            comment.removeClass('odd');
            if (commentCount % 2) {
              comment.addClass('odd');
            } else {
              comment.addClass('even');
            }
            commentCount++;
      }));
      if (!stop && pageNum < 100) {
        pageNum++;
        fetchComments(pageNum, commentCount);
      }
  });
}

window.insertMarkdownInsteadOfHtml = insertMarkdownInsteadOfHtml;
function insertMarkdownInsteadOfHtml() {
  // added check to skip markdown insert for page content type.
  if ((!$('form').hasClass('node-page-form') || !$('form').hasClass('node-product-form')) && $('#edit-field-kcs-img-files-und-ajax-wrapper').length !== 0) {
    setInterval(function() {
        var button = $('input.insert-button');
        var text = button.val();
        button.after('<input type="button" class="markdown-insert-button" value="'+text+'" />');
        button.remove();
      }, 250);


    $('.markdown-insert-button').live('click', function(e) {
        var insertButton = $(this);
        changeInsertButton(insertButton);
        return false;
      });
  }
}

window.changeInsertButton = changeInsertButton;
function changeInsertButton(insertButton) {
  var tr = insertButton.parentsUntil('tr').parent();
  var link = tr.find('div.image-widget-data a');
  var i = tr.parent().children().index(tr);

  var alt = $('#edit-field-kcs-img-files-und-'+i+'-alt').val();
  if (alt === null || alt === "") {
    alt = link.html();
  }

  var title = $('#edit-field-kcs-img-files-und-'+i+'-title').val();
  if (title === null || title === "") {
    title = link.html();
  }

  var size = tr.find('select.insert-style option:selected').first().val();
  size = size.replace(/image_/, '');

  var path = link.attr('href');
  path = path.replace(/http.*?\/k/, '/k');
  if (size !== null && size !== '') {
    var newpath = path.replace(/\/sites\/default\/files\/images\//, '/sites/default/files/styles/'+size+'/public/images/');
    if (newpath !== null && newpath !== '') {
      path = newpath;
    }
  }

  Drupal.insert.insertIntoActiveEditor('!['+alt+']('+path+' "'+title+'")');
  return false;
}

window.replaceImgTag = replaceImgTag;
function replaceImgTag(text) {
  text = text.replace(/&lt;img.*?href="(.*?)(&quot;)*".*?class="image-(.*?)".*?&gt;/g, "<img src=\"$1\" class=\"image-$3\" />");
  return text;
}

window.render = render;
function render(text) {
  "use strict";
  var MarkEditShowDown, html, lineBreakInP, lineBreaksRemaining;
  MarkEditShowDown = new Attacklab.showdown.converter();
  if (typeof (text) !== 'undefined') {
    html =  MarkEditShowDown.makeHtml(text);
    html = html.replace(/\r/g, '');

    // Convert newlines to <br/> inside a <p>
    lineBreakInP = /(<p>(?:[\S\s](?!<\/p>))*)\n([\S\s]*?<\/p>)/g;
    lineBreaksRemaining = lineBreakInP.exec(html);

    while (lineBreaksRemaining !== null) {
      html = html.replace(lineBreakInP, '$1<br />$2');
      lineBreaksRemaining = lineBreakInP.exec(html);
    }
  }
  return html;
}

window.moveNotificationsElement = moveNotificationsElement;
function moveNotificationsElement() {
  var move = $('.node-form #edit-notifications .fieldset-wrapper');
  $('.node-form #edit-notifications').remove();
  $('.node-form #edit-actions').before(move);

}

window.enableSubmitEval = enableSubmitEval;
function enableSubmitEval() {
  $('.sqiEvaluationForm').click(function() {
    var checks = 0;
    $('.sqiEvaluationForm > div > div').each(function() {
        var inputs = $(this).find('input');
        checks += inputs.filter(':checked').length;
    });
    if(checks == 6) {
      $('.sqiEvaluationForm').find('input:submit').removeAttr('disabled');
    }
  });
}

window.removeMarkdownUI = removeMarkdownUI;
function removeMarkdownUI() {
  var commentSelect = $('#edit-comment-body .form-type-select select');
  commentSelect.addClass('noDelete');
  //page content type - custom class (noHide) to show text format select
  var page_type = $('#page-node-form, #product-node-form .text-format-wrapper .form-type-select select');
  page_type.addClass('noHide');
  $('.form-type-select').each(function() {
      var wrapping_div = $(this);
      if (wrapping_div.find('select').length > 0) {
        var select = wrapping_div.find('select');
        if (select.find('option[value="markdown"]').length > 0) {
          if (select.hasClass('noDelete')) {
            wrapping_div.hide();
          }
          else if (select.hasClass('noHide')) {
            wrapping_div.hide();
            page_type.val('full_html');
          }
          else {
            wrapping_div.remove();
          }
        }
      }
    });
}

window.removeUsersFromGroupBlock = removeUsersFromGroupBlock;
function removeUsersFromGroupBlock() {
  $("div#block-og-extras-group-info div.content div a.username").each(function(index) {
    if (index != 0) {
      $(this).parent().remove();
    }
  });
}

window.rewriteContentLockAnchors = rewriteContentLockAnchors;
function rewriteContentLockAnchors() {
  var warning_div = $(".messages.warning");
  var anchors = warning_div.find('a');
  anchors.each(function() {
      var anchor = $(this);
      var href = anchor.attr('href');
      if (href.indexOf("content_lock/release") != -1) {
        anchor.attr('href', '#');
        anchor.click(function() {
            $.get(href);
            anchor.parent().remove();
            if (warning_div.find('a').length === 0) {
              warning_div.remove();
            }
          });
      }
    });
}

window.setupListPageFiltering = setupListPageFiltering;
function setupListPageFiltering() {
  if ($('.list-page-view').length > 0) {

    var optionsDiv = $('#more-filter-options');
    var optionsToggleButton = $('#filter-options-toggle');
    optionsDiv.slideUp();
    optionsToggleButton.find('.less').hide();

    optionsToggleButton.find('span').bind('click', function() {
      if ($(this).hasClass('less')) {
        optionsDiv.slideUp('fast');
        optionsToggleButton.find('.less').hide();
        optionsToggleButton.find('.more').show();
      } else {
        optionsDiv.slideDown('fast');
        optionsToggleButton.find('.more').hide();
        optionsToggleButton.find('.less').show();
      }
    });

    var titleInput = $('#sidebar .list-filter-options #edit-title');
    setupInput(titleInput, false);

  }
}

/* SetupInput from Umbra Chrome */
window.setupInput = setupInput;
function setupInput(element, activatable) {
  // Remove browsers autocomplete
  element.attr("autocomplete", "off");

  element.keyup(function(){
      if (element.val() === '') {
        // ensure that the close <a> is not visible when element is empty
        close.addClass('nodisplay');
      } else {
        // remove the display blocking class when a user starts typing
        close.removeClass('nodisplay');
      }
    });

  // Put the X/close anchor after the global search <input>
  var closeID = 'searchClose_' + element.attr('id');
  element.after('<a id="'+ closeID  +'" class="close nodisplay">Close</a>');

  var close = $('#' + closeID.replace(':', '\\:'));
  // close the autocomplete flyout when the user clicks close
  close.mousedown(function() {
      element.autocomplete("close");
      element.val('');
      close.addClass('nodisplay');
      element.focus();
    });

  element.focus(function() {
      // on focus add the active class and remove the input value (if it is Search)
      if (activatable) {
        element.addClass("active");
        if (element.val() == searchLabel) {
          element.val('');
        }
      }
    }).blur(function() {
        // on blur remove the active class and set an empty input value to Search
        if (element.val() === '') {
          if (activatable) {
            element.removeClass("active");
            element.val(searchLabel);
          }
          close.addClass('nodisplay');
        }
      });
}

window.accessStateMessage = accessStateMessage;
function accessStateMessage() {
  if ($('#access-state-widget').length > 0) {
    var current = $('#access-state-widget input:radio[checked=checked]').val();
    // show the default message based on current set state
    $('#access-messages span.'+current).css("display", "block");
    // show hide messages based on which one's clicked
    $('input:radio').click(function() {
      var clicked = $(this).val();
      $('#access-messages span').css("display", "none");
      $('#access-messages span.'+clicked).css("display", "block");
    });
  }
}

window.initPageTemplateRadios = initPageTemplateRadios;
function initPageTemplateRadios() {
  pageTemplateRadios = $('#edit-field-page-template div.form-type-radio');
    pageTemplateRadios.children('input:radio').each( function () {
      $(this).hide();
      if ( $(this).attr('checked') != 'undefined' && $(this).attr('checked') == 'checked' ) {
        $(this).siblings('label').addClass('selected');
        $(this).after('<span class="icon-check-alt" aria-hidden="true"></span>');
      }
    });
    pageTemplateRadios.children('label').click(function () {
      pageTemplateRadios.children('label').removeClass('selected');
      pageTemplateRadios.find('span.icon-check-alt').remove();
      $(this).addClass('selected');
      $(this).after('<span class="icon-check-alt" aria-hidden="true"></span>');
    });
}

window.ifHashInUrl = ifHashInUrl;
function ifHashInUrl() {
    // if there's a hash at the end of the url
  if(window.location.hash) {
    var jump = window.location.hash;
    // Check to see if this has the "emphasis pattern"
    var emphasis = "#h[";
    if(jump.indexOf(emphasis) != -1){
      var ele = jump.substr(3).split(',')[0];
      // element is passed to jumpToElement function.
      jumpToElement(ele);
    }
    // Safari screws up the characters in the url
    // so we have to do a separate check
    if($.browser.safari == true) {
      var emphasis = "#h%";
      if(jump.indexOf(emphasis) != -1){
        var ele = jump.substr(5).split(',')[0];
        // element is passed to jumpToElement function.
        jumpToElement(ele);
      }
    }
  }
}

window.jumpToElement = jumpToElement;
function jumpToElement(ele) {
  // Cheap if check, could be better
  if(ele.length == 6) {
    // Determine the offset and jump the document to the element
    var pos = $('p[data-key="'+ele+'"]').offset();
    $(window).scrollTop(pos.top - 10);
  }
}

window.initMomentDates = initMomentDates;
function initMomentDates() {
  var momentDates = $('.moment_date');
  if (momentDates.length > 0){
    defineMomentTranslations();
    var locale = getCookieValue('rh_locale');
    if (locale == '' || locale == 'undefined') {
      locale = 'en';
    }
    moment.lang(locale);
    momentDates.each(function() {
      var date_string = $(this).text();
      var momentDate = moment(date_string, "YYYY-MM-DDTHH:mm:ssZ");

      if (momentDate.isValid()){
        var date = new Date(date_string);

        var now = new Date();

        var date_text = '';

        //call setHours to take the time out of the comparison
        if(date.setHours(0,0,0,0) == now.setHours(0,0,0,0)) {
          //Date equals today's date
          date_text = momentDate.fromNow();
        }
        else {
          date_text = momentDate.zone(date_string).calendar();
        }

        var full_text = momentDate.format(momentDate.lang().calendar('sameElse', momentDate));

        $(this).prop('title', full_text);
        $(this).text(date_text);
      }
    });
  }
}

window.defineMomentTranslations = defineMomentTranslations;
function defineMomentTranslations(){
  moment.lang('ja', {
      relativeTime : {
          future: '%s に',
          past:   '%s 前に',
          s:  '秒',
          m:  '1 分',
          mm: '%d 分',
          h:  '1 時間',
          hh: '%d 時間',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[昨日の時刻:]HH:mm',
          sameDay : '[本日の時刻:]HH:mm',
          nextDay : '[明日の時刻:]HH:mm',
          lastWeek : 'dddd [時刻:]HH:mm',
          nextWeek : 'dddd [時刻:]HH:mm',
          sameElse : 'YYYY[年]MMMMD[日]Ah[時]mm[分に]'
      },
      weekdays : [
          '日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'
      ],
      months : [
          '1月', '2月', '3月', '4月', '5月', '6月', '7月',
          '8月', '9月', '10月', '11月', '12月'
      ],
      meridiem : function (hour, minute, isLowercase) {
          if (hour < 12) {
              return "午 前";
          } else {
              return "午 後";
          }
      }
  });

  moment.lang('de', {
      relativeTime : {
          future: 'In %s',
          past:   'Vor %s',
          s:  'Sekunden',
          m:  'eine Minute',
          mm: '%d Minuten',
          h:  'eine Stunde',
          hh: '%d Stunden',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Gestern um] HH:mm',
          sameDay : '[Heute um] HH:mm',
          nextDay : '[Morgen um] HH:mm',
          lastWeek : 'dddd [um] HH:mm',
          nextWeek : 'dddd [um] HH:mm',
          sameElse : 'D. MMMM YYYY [um] HH:mm'
      },
      weekdays : [
          'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
      ],
      months : [
          'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
          'August', 'September', 'Oktober', 'November', 'Dezember'
      ]
  });

  moment.lang('es', {
      relativeTime : {
          future: 'en %s',
          past:   'hace %s',
          s:  'segundos',
          m:  'un minuto',
          mm: '%d minutos',
          h:  'una hora',
          hh: '%d horas',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Ayer a las] HH:mm',
          sameDay : '[Hoy a las] HH:mm',
          nextDay : '[Mañana a las] HH:mm',
          lastWeek : 'dddd [a las] HH:mm',
          nextWeek : 'dddd [a las] HH:mm',
          sameElse : 'D [de] MMMM [de] YYYY [a las] HH:mm'
      },
      weekdays : [
          'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
      ],
      months : [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
          'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ]
  });

  moment.lang('fr', {
      relativeTime : {
          future: 'dans %s',
          past:   '%s auparavant',
          s:  'secondes',
          m:  'une minute',
          mm: '%d minutes',
          h:  'une heure',
          hh: '%d heures',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Hier à] HH:mm',
          sameDay : '[Aujourd\'hui à] HH:mm',
          nextDay : '[Demain à] HH:mm',
          lastWeek : 'dddd [à] HH:mm',
          nextWeek : 'dddd [à] HH:mm',
          sameElse : 'D MMMM YYYY [à] HH[h]mm'
      },
      weekdays : [
          'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
      ],
      months : [
          'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
          'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ]
  });

  moment.lang('it', {
      relativeTime : {
          future: 'tra %s',
          past:   '%s fa',
          s:  'secondi',
          m:  'un minuto',
          mm: '%d minuti',
          h:  'un\'ora',
          hh: '%d ore',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Ieri alle] HH:mm',
          sameDay : '[Oggi alle] HH:mm',
          nextDay : '[Domani alle] HH:mm',
          lastWeek : 'dddd [alle] HH:mm',
          nextWeek : 'dddd [alle] HH:mm',
          sameElse : 'D MMMM YYYY [alle] HH:mm'
      },
      weekdays : [
          'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'
      ],
      months : [
          'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio',
          'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
      ]
  });

  moment.lang('pt', {
      relativeTime : {
          future: 'em %s',
          past:   'em %s',
          s:  'segundos',
          m:  'um minuto',
          mm: '%d minutos',
          h:  'uma hora',
          hh: '%d horas',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Ontem às] HH:mm',
          sameDay : '[Hoje às] HH:mm',
          nextDay : '[Amanhã às] HH:mm',
          lastWeek : 'dddd [às] HH:mm',
          nextWeek : 'dddd [às] HH:mm',
          sameElse : 'D [de] MMMM [de] YYYY [às] HH:mm'
      },
      weekdays : [
          'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
      ],
      months : [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
          'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ]
  });

  moment.lang('ko', {
      relativeTime : {
          future: '%s 후',
          past:   '%s 전',
          s:  '초',
          m:  '1분',
          mm: '%d분',
          h:  '1시간',
          hh: '%d시간',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : 'HH[시] mm[분] [어제]',
          sameDay : 'HH[시] mm[분] [오늘]',
          nextDay : 'HH[시] mm[분] [내일]',
          lastWeek : 'HH[시] mm[분] dddd',
          nextWeek : 'HH[시] mm[분] dddd',
          sameElse : 'HH[시] mm[분] YYYY[년] MMMM D[일]'
      },
      weekdays : [
          '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'
      ],
      months : [
          '1월', '2월', '3월', '4월', '5월', '6월', '7월',
          '8월', '9월', '10월', '11월', '12월'
      ]
  });

  moment.lang('zh_CN', {
      relativeTime : {
          future: '%s',
          past:   '%s 前',
          s:  '秒',
          m:  '1 分钟',
          mm: '%d 分钟',
          h:  '1 小时',
          hh: '%d 小时',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[昨天]HH:mm',
          sameDay : '[今天] LT',
          nextDay : '[明天] LT',
          lastWeek : 'dddd [在] LT',
          nextWeek : 'dddd [在] LT',
          sameElse : 'YYYY[年]MMMMD[日]HH:mm'
      },
      weekdays : [
          '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
      ],
      months : [
          '一月', '二月', '三月', '四月', '五月', '六月', '七月',
          '八月', '九月', '十月', '十一月', '十二月'
      ]
  });

  moment.lang('en', {
      relativeTime : {
          future: 'in %s',
          past:   '%s ago',
          s:  'seconds',
          m:  'a minute',
          mm: '%d minutes',
          h:  'an hour',
          hh: '%d hours',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Yesterday at] LT',
          sameDay : '[Today at] LT',
          nextDay : '[Tomorrow at] LT',
          lastWeek : 'dddd [at] LT',
          nextWeek : 'dddd [at] LT',
          sameElse : 'MMMM D YYYY [at] h:mm A'
      },
      weekdays : [
          'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ],
      months : [
          'January', 'February', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October', 'November', 'December'
      ]
  });
}
});
