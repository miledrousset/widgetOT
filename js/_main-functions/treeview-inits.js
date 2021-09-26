function initView(mytree,data, searchElement,callbacks = {onSuccess: null, onFailed: null}) {
    if(configurationData.using_proxy){
        initCorsProxy(configurationData.proxy_url);
    }
    createList(mytree, data);
    checkContainsIn();
    return treefilter = new initTreeView(
        mytree,
        {
            searcher: searchElement,
            multiselect: false
        },
        callbacks
    );
}
