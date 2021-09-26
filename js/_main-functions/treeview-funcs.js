function initCorsProxy(proxyUrl) {
    $.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = proxyUrl + options.url;
        }
    });
}

function createRecursiveList(elements, tree) {
    let html = '';
    elements.forEach(element => {
        const addUnderlinedClass = (element.hasChildren() ? '' : '');
        var autoSearchClass='';
        if(element.getDirectChildren().length >0)
        autoSearchClass='manuelSearch';
        const caret=(element.hasChildren() ? 'caret   '+autoSearchClass : '');
        html += "<li class='tf-search-result tf-child-true'>" + "<span class='"+caret+"'> <a data-id='sho_btn_" + element.id + "'  onclick='saveCurrentId(" + element.id + ","+JSON.stringify(element)+",event, this)' class='pl-3" + addUnderlinedClass + "' href='javascript:void(0)'>" + element.label + "</a></span>";
        // html += "<a data-id-show='sho_btn_" + element.id + "' class='float-right hidden show-details-btn' onclick='showEntityById(" + element.id + ")' href='javascript:void(0)'></a>";
        html += "<div class='clearfix'></div>";
        if (element.hasChildren()) {
            html += '<ul class="tf-search-result nested  " style="display:none" >';
            let appends = createRecursiveList(element.getDirectChildren(), tree);
            html += appends;
            html += '</ul>';
        }

        html += '</li>';

    });
    return html;

}

/**
 *
 * @param element
 * @param fullElement
 * @param {Event} event
 */
function saveCurrentId(element, fullElement = null,event = null) {


    if(event){
        event.stopPropagation();
        event.stopImmediatePropagation();
    }

    if(fullElement){
        $('#my-search').val(fullElement.label);
    }
    console.log(fullElement,element)
  /*   if(fullElement.haveChildren() )
    {
        if($(event.target.parentNode).hasClass("caret-down"))
        {
            $(event.target.parentNode).removeClass("caret-down");
            $(event.target.parentNode.parentNode).find('ul').addClass('hidden') ;
            return;
        }
        getSubList($(event.target.parentNode.parentNode),event.target.parentNode);

       // $(event.target.parentNode.parentNode).find(".nested").toggle("active");
        $(event.target.parentNode).addClass("caret-down");
        return;
    }
*/
    let $submit = $(".submit-btn");
    $submit.addClass('hidden');
    let $show = $(".show-details-link");
    $show.removeClass('hidden');
    $show.remove();
    $submit.after("<button data-id-show='sho_btn_" + element + "' class='show-details-link' onclick='showEntityById(" + element + ")'>Afficher Détails</button>");
    $(".search-blc").addClass('style-2');
    let $myTree = $('#my-tree');
    if(!$myTree.hasClass('hidden')){
        $myTree.addClass('hidden')
    }
}

function setClickListeners() {
    let $buttons = $('[data-id*="sho_btn_"]');
    $buttons.on('click', function () {
        let next = $(this).next();
        next.toggleClass('hidden');
        $buttons.each(function (i, elem) {
            let $nextElem = $(elem).next();
            if ($nextElem[0] !== next[0] && !$nextElem.hasClass('hidden')) {
                $nextElem.addClass('hidden');
            }
            $("#my-search").val($(this).text().trim());
            $('.tf-search-result').addClass('hidden');

            if ($('#my-search').val().length == 0) {
                $('.search-blc').removeClass('style-2');
                $('.submit-btn').removeClass('hidden');
                $('.show-details-link').addClass('hidden');
            }
        });
    });

    $('[data-id-show*="sho_btn_"]').on('click', function (e) {
        let dataIdToShow = $(this).attr('data-id-show');
        let dataId = dataIdToShow.slice(dataIdToShow.lastIndexOf('_') + 1);
    });

}

function createList(my_tree, data) {
    my_tree.html('');
    let bigHtml = '';
    $.each(data.data, function (i, element) {
        bigHtml += '<li class="tf-search-result tf-child-true" >';
       console.log('element',element[0])
        var autoSearchClass='';
       if(element[0].getDirectChildren().length >0)
       autoSearchClass=' manuelSearch';
       if (element[0].hasChildren()  ) {
        bigHtml += "<span class='caret "+autoSearchClass+" ' data-id='"+element[0].id +"'> <a data-id='sho_btn_" + element[0].id + "' class=' ' href='javascript:void(0)' onclick='saveCurrentId(" + element[0].id + ","+JSON.stringify(element[0])+",event)' >" + element[0].label + "</a></span>";
        console.log('element childs',element[0].label, element[0].getDirectChildren())
        bigHtml += '<ul class="tf-search-result nested ">';
        let html = createRecursiveList(element[0].getDirectChildren(), my_tree);
        bigHtml += html;
        bigHtml += '</ul>';
    } else
         bigHtml += "<span style='margin-left:25px;' ><a data-id='sho_btn_" + element[0].id + "' class=' ' href='javascript:void(0)' onclick='saveCurrentId(" + element[0].id + ","+JSON.stringify(element[0])+",event)' >" + element[0].label + "</a></span>";
        bigHtml += "<div class='clearfix'></div>";

        bigHtml += "</li>";


    });
    my_tree.html(bigHtml);

    my_tree.find('.caret').click(function() {
        $(this.parentNode).find(" > .nested").toggle();
        this.classList.toggle("caret-down");
        console.log('has class down',$(this).hasClass('caret-down'),$(this).hasClass('manuelSearch'))
        if($(this).hasClass('caret-down') )
          if(!$(this).hasClass('manuelSearch') )
          getSubList(this.parentNode,$(this) );


      });
    setClickListeners();
}
function getSubList(box,a)
{

    fullElement=$(a).data('id');
var ul=$('<ul class="tf-search-result nested"></ul>');
$(box).find('ul').remove();
$(box).append(ul);
$.ajax({
   url:`${configurationData.sub_category_url}`,
   data:{'theso':'th13','lang':'fr','id':fullElement},
   dataType: 'json',
   beforeSend: () => {
    $('.form-group.search-blc').addClass('loader');
   },
   success: (data, textStatus, jqXHR) => {
     reorganizedData = generateObjectsLevelsAndIds(data);
     createList(ul, reorganizedData);

   // createList($("#my-tree"), data);
   },
   complete: () => {
       $('.form-group.search-blc').removeClass('loader');
       $(ul).removeClass('hidden').toggle();

   },
   error: (jqXHR, textStatus, errorThrown) => {
       if (onFailed) {
           onFailed(jqXHR, textStatus, errorThrown);
       } else {
           console.log('You have to define onFailed callback')
       }
   }
});

}
/**
 * Execute an api call by id
 *
 * @param id
 */
function showEntityById(id) {
    let $search = $('.search-blc');
    executeQuery(id,
        (data) => {
            $search.removeClass('loader');
            render2ViewElements(data, [
                {
                    searchedKey: 'label',
                    dataType: 'string',
                    searchedValue: 'value',
                    titleToDisplay: 'Label'
                },
                {
                    searchedKey: 'ark',
                    dataType: 'string',
                    searchedValue: 'value',
                    titleToDisplay: 'Ark'
                },
                {
                    searchedKey: 'definition',
                    dataType: 'array',
                    searchedValue: 'value',
                    titleToDisplay: 'Description'
                },
              /*  {
                    searchedKey: 'created',
                    dataType: 'date',
                    searchedValue: 'value',
                    titleToDisplay: 'Date de création'
                },
                {
                    searchedKey: 'modified',
                    dataType: 'date',
                    searchedValue: 'value',
                    titleToDisplay: 'Date de modification'
                },*/
                {
                    searchedKey: 'altLabel',
                    dataType: 'string',
                    searchedValue: 'value',
                    withLang: true,
                    titleToDisplay: 'AltLabel'
                },
                {
                    searchedKey: 'Alignment',
                    dataType: 'array',
                    searchedValue: 'value',
                    withLang: true,
                    titleToDisplay: 'Alignment'
                },
                {
                    searchedKey: 'prefLabel',
                    dataType: 'array',
                    searchedValue: 'value',
                    withLang: true,
                    titleToDisplay: 'PrefLabel'
                },
                //{searchedKey: 'inScheme', dataType: 'string', searchedValue: 'value', titleToDisplay: 'InScheme'},
               // {searchedKey: 'memberOf', dataType: 'string', searchedValue: 'value', titleToDisplay: 'Membre à'},
               // {searchedKey: 'narrower', dataType: 'array', searchedValue: 'value', titleToDisplay: 'Limité'},
                {searchedKey: 'related', dataType: 'array', searchedValue: 'value', titleToDisplay: 'Relatif'},
            ]);
            //  renderViewElements(data);
            $('#details-modal').modal('show');
        },
        () => {
            console.log("there is an error while executing api request");
            $search.removeClass('loader');
        },
        {
            url: `${configurationData.details_url}/${configurationData.theso}.${id}.labels`,

            data: '',
            beforeSend: () => {
                $search.addClass('loader');
            }
        }
    );
}

/**
 * Create nodes elements to render
 *
 * @param data
 */
function renderViewElements(data) {
    let dataFirstKey = Object.keys(data)[0];
    let fullHtml = '';
    let $moda = $('#moda-body');
    if (dataFirstKey) {
        $moda.html('');
        let obj = data[dataFirstKey];
        let altArray = getArraysByKeys(obj, 'altLabel');
        let prefLabel = getArraysByKeys(obj, 'prefLabel');
        fullHtml = arrayToHtml(altArray) + arrayToHtml(prefLabel);
    } else {
        fullHtml = renderEmptyMessage();
    }
    $moda.html(fullHtml);
}

/**
 * Create nodes elemets to render all client needed elements
 * @param data
 * @param searchedObjects
 */
function render2ViewElements(data, searchedObjects = []) {
    let dataFirstKey = Object.keys(data)[0];
    let fullHtml = '';
    let $moda = $('#moda-body');
    if (dataFirstKey) {
        $moda.html('');
        let parentObject = data;//[dataFirstKey];
        let fullInformationArray = [];

        for (let searchObj of searchedObjects) {
            //let fullObject = getObjectByObjectParameters(parentObject, searchObj);
            fullInformationArray.push(getObjectByObjectParameters(parentObject, searchObj));
        }
        //  fullHtml = arrayToHtml(altArray) + arrayToHtml(prefLabel)
        fullInformationArray = fullInformationArray.filter(element => element && !Array.isArray(element));
        fullHtml = arrayToHtmlFullInformations(fullInformationArray);
    } else {
        fullHtml = renderEmptyMessage();
    }
    $moda.html(fullHtml);
}

/**
 * Display empty message.
 */
function renderEmptyMessage() {
    let fullHtml = '';
    fullHtml += '<div class="row">';
    fullHtml += "<div class='col-12'>Il n'y a pas assez d'informations.</div>";
    fullHtml += '</div>';
    return fullHtml;
}


/**
 * Convert array to html elements
 *
 * @param array
 * @returns {string}
 */
function arrayToHtmlFullInformations(array) {

    let html = ``;
    if (array.length) {
        html += '<div class="detail-item-blc">';
        for (let parent of array) {
                html += '<div class="row mb-6">';
                html += '<h4 class="detail-bloc-title mb-3"><span>' + parent.title + '</span></h4>';
                switch (parent.type) {
                    case "string" : {
                        html += '<div class="col-12 p-0" align="left">' + '<span class="lang-icn ' + parent.value + '">' + parent.value + '</span>' + '</div>';
                        break;
                    }
                    case "date" : {
                        html += '<div class="col-12 p-0" align="left">' + '<span class="lang-icn">' + moment(parent.value).format('MMMM YYYY, h:mm:ss a');
                        +'</span>' + '</div>';
                        break;
                    }
                    case "array" : {
                        if(parent.title === 'Alignment') {
                            for (let element of parent.value) {
                                html += '<div class="row mb-3 mt-2 col-12">';
                                html += '<div class="col-6 p-0" align="left">'  + element['type'] + '</div>';
                                html += '<div class="col-6 p-0" align="left"><a href="' + element['uri'] + '" target="_blank">URL</a> </div>';
                                html += '</div>';
                            }
                        }else{
                            if (parent.withLang) {
                                for (let element of parent.value) {
                                    html += '<div class="row mb-3 mt-2 col-12">';
                                    html += '<div class="col-6 p-0" align="left">' + '<span class="lang-icn ' + element[0] + '">' + element[0] + '</span>' + '</div>';
                                    html += '<div class="col-6 p-0" align="left">' + '<span class="lang-value">' + element[1] + '</span>' + '</div>';
                                    html += '</div>';
                                }
                            } else {
                                for (let element of parent.value) {
                                    html += '<div class="row mb-3 mt-2 col-12">';
                                    html += '<div class="col-12 p-0" align="left">' + '<span class="lang-icn ' + element + '">' + element + '</span>' + '</div>';
                                    html += '</div>';
                                }
                            }
                        }
                        break;
                    }
                }
                html += '</div>';
                html += '</div>';
        }
    }
    return html;
}


/**
 * Convert array to html elements
 *
 * @param array
 * @returns {string}
 */
function arrayToHtml(array) {

    let html = ``;
    if (array.length) {
        html += '<div class="row detail-item-blc">';
        html += '<h4 class="detail-bloc-title"><span>altLabel</span></h4>';
        for (let element of array) {
            html += '<div class="col-6">' + '<span class="lang-icn ' + element.lang + '">' + element.lang + '</span>' + '</div>';
            html += '<div class="col-6">' + '<span class="lang-value">' + element.value + '</span>' + '</div>';
        }
        html += '</div>';
    }
    return html;
}

/**
 * Seaarch for arrays by given keys in a given object
 *
 * @param obj
 * @param searchableKey
 * @param {boolean} byExactKey search by exact key (true) or by contained string (false)
 * @returns {Array|Uint8Array|BigInt64Array|{lang: *, value: *}[]|Float64Array|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array|*[]}
 */
function getArraysByKeys(obj, searchableKey, byExactKey = false) {
    let objKeys = Object.keys(obj);
    let fullKey;
    if (byExactKey) {
        fullKey = objKeys.find(key => key === searchableKey);
    } else {
        fullKey = objKeys.find(key => key.includes(`#${searchableKey}`));
    }
    if (fullKey) {
        return obj[fullKey].map(element => ({value: element.value, lang: element.lang}));
    }
    return [];
}


/**
 * Search for arrays by given keys in a given object
 *
 * @param obj
 * @param searchableObject
 * @param {boolean} byExactKey search by exact key (true) or by contained string (false)
 * @returns {Array|Uint8Array|BigInt64Array|{lang: *, value: *}[]|Float64Array|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array|*[]}
 */
function getObjectByObjectParameters(obj, searchableObject, byExactKey = false) {
    let objKeys = Object.keys(obj);
    let fullKey = '';
    if (byExactKey) {
        fullKey = objKeys.find(key => key === searchableObject);
    } else {
        fullKey = objKeys.find(key => (key.includes(`#${searchableObject.searchedKey}`) || key.includes(searchableObject.searchedKey)));
    }
    if (fullKey) {
        switch (searchableObject.dataType) {
            case "string" : {
                return ({
                    value: obj[fullKey],
                    type: searchableObject.dataType,
                    title: searchableObject.titleToDisplay
                });
            }
            case "date" : {
                return ({
                    value: new Date(obj[fullKey]),
                    type: searchableObject.dataType,
                    title: searchableObject.titleToDisplay
                });
            }
            case "array" : {
                return ({
                    value: obj[fullKey],
                    type: searchableObject.dataType,
                    withLang: !!searchableObject.withLang,
                    title: searchableObject.titleToDisplay
                });
            }
        }
    }
    return [];
}


function checkContainsIn() {
    $.extend($.expr[":"], {
        "containsIN": function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });
}

function initTreeView(el, options, callbacks = {onSuccess: null, onFailed: null}) {
    var defaults = {
        offsetLeft: 20, // left offset for each level
        searcher: null, // search input field
        expanded: false, // if true, your list will be show with expanded.
        multiselect: false // multiselect.
    };

    // Public Variables
    var plugin = this;
    var status = []; // save folder status for "var memory"

    plugin.settings = {};
    // PUBLIC METHOD
    plugin.openAll = function () {
        plugin.el.find("li.tf-child-true").parent().addClass("tf-open");
    };
    plugin.closeAll = function () {
        plugin.el.find("li.tf-child-true").parent().removeClass("tf-open");
    };

    // PRIVATE FUNCTION
    // fired when type on search input field.


    // save current status of folder
    // action : string "in" / "out"
    // array : array that saves current status
    // list : el
    initPlugin(el, plugin, defaults, options, callbacks);
}

function initPlugin(el, plugin, defaults, options, callbacks = {onSuccess: null, onFailed: null}) {
    plugin.settings = $.extend({}, defaults, options);
    plugin.el = el;
    // set class names to tags
    el.addClass("tf-tree");
    el.find("li").addClass("tf-child-true");
    el.find("li").css("padding-left", plugin.settings.offsetLeft);
    el.find("li a:only-child").parent().removeClass("tf-child-true");
    el.find("li a:only-child").parent().addClass("tf-child-false");

    // if the list has a checkbox, block event bubbling.
    el.find("input[type=checkbox]").click(function (e) {
        e.stopPropagation();
    });

    // set click event.
    el.find("li.tf-child-true").children("a").click(function (e) {
        const $THIS = $(this);
        if (e.metaKey || e.ctrlKey) {
            if ($THIS.parent().hasClass("tf-open")) {
                $THIS.parent().find("li.tf-child-true").removeClass("tf-open");
            } else {
                $THIS.parent().find("li.tf-child-true").addClass("tf-open");
            }
        }
        $THIS.parent().toggleClass("tf-open");
    });

    // toggle effect when multiselect enabled.
    el.find(".tf-link").click(function () {
        if (plugin.settings.multiSelect != true) {
            el.find("li.tf-selected").removeClass("tf-selected");

        }
        $(this).toggleClass("tf-selected");
        $("#my-search").val($(this).text().trim());
        $('.tf-tree').removeClass("tf-search-result");
        $('.search-blc').removeClass('loader');

    });


    if (plugin.settings.searcher) {
        searcher(plugin, callbacks);
    }
    $('input[type=search]').on('search', () => {
        onClearInput(plugin, callbacks);
    });

}

function onClearInput(plugin, callbacks) {
    memory(plugin, "out", status);
    let $search = $('.search-blc');
    $search.removeClass('loader');
    $('.tf-tree').removeClass("tf-search-result");
    if (callbacks.tree) {
        callbacks.tree.removeClass("tf-search-result");
        callbacks.tree.addClass('tf-tree');
    }
    $search.removeClass('style-2');
    $('.submit-btn').removeClass('hidden');
    $('.show-details-link').addClass('hidden');
}

function searcher(plugin, callbacks = {onSuccess: null, onFailed: null, tree: null}) {
    const $submit = $('.submit-btn');
    const $search = $('.search-blc');
    $(plugin.settings.searcher).keyup(function ($event) {
        if (
            ($event.keyCode >= 65 && $event.keyCode <= 90) ||
            ($event.keyCode >= 97 && $event.keyCode <= 122) ||
            $event.keyCode === 8 ||
            $event.keyCode === 32
        ) {
            $('#my-tree').hide();
        }
        if ($(this).val().length === 0) {
            onClearInput(plugin, callbacks);
        } else {
            plugin.closeAll();
            plugin.el.find("li.tf-open").removeClass("tf-open");
            plugin.el.find("li.tf-search-result").removeClass("tf-search-result");
            plugin.el.find("ul.tf-search-result").removeClass("tf-search-result");
            plugin.el.find("li:containsIN('" + $(this).val() + "')").addClass("tf-search-result");
            plugin.el.find("li.tf-search-result").parent().addClass("tf-search-result");
            if ($event.key === 'Enter') {
                $search.addClass('loader');
                executeQuery($(this).val(),callbacks.onSuccess, callbacks.onFailed);
            }
        }

        /* -- */
        if ($(this).val().length !== $("li.tf-selected").text()) {
            $("li.tf-child-false").removeClass("tf-selected");

            $search.removeClass('style-2');
            $submit.removeClass('hidden');
            $('.show-details-link').addClass('hidden');

        }
        if (!this.value) {
            $search.removeClass('style-2');
            $submit.removeClass('hidden');
            $('.show-details-link').addClass('hidden');
        }

    });
    $submit.on('click', function () {
        const inputVal = $('#my-search').val().trim();

        if(inputVal.length< 3 && inputVal.length> 0)
            return;
        $search.addClass('loader');
        executeQuery(inputVal, callbacks.onSuccess, callbacks.onFailed);
    });
    $(plugin.settings.searcher).keydown(function () {
        if ($(this).val().length == 0) {
            memory(plugin, "in", status);
        }
    });


}

function memory(plugin, action, status) {
    if (action == "in") {
        status = [];
        plugin.el.find("li").each(function () {
            status.push($(this).hasClass("tf-open"));
        });
    } else if (action == "out") {
        plugin.el.find("li").each(function (i) {
            const $THIS = $(this);
            if (status[i]) {
                $THIS.addClass("tf-open");
            } else {
                $THIS.removeClass("tf-open");
            }
        });
    }
}

function getSubCategory(fullElement)
{



$.ajax({
   url:`${configurationData.sub_category_url}`,
   data:{'theso':'th13','lang':'fr','id':fullElement.id},
   dataType: 'json',
   beforeSend: () => {
    $('.form-group.search-blc').addClass('loader');
   },
   success: (data, textStatus, jqXHR) => {
     reorganizedData = generateObjectsLevelsAndIds(data);
     createList($("#my-tree"), reorganizedData);
   // createList($("#my-tree"), data);
   },
   complete: () => {
       $('.form-group.search-blc').removeClass('loader');
       $('#my-tree').removeClass('hidden');

   },
   error: (jqXHR, textStatus, errorThrown) => {
       if (onFailed) {
           onFailed(jqXHR, textStatus, errorThrown);
       } else {
           console.log('You have to define onFailed callback')
       }
   }
});

}