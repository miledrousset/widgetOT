$(document)
    .ready(
        function(){
    let reorganizedData = {};
    let my_tree = $("#my-tree");
    let searchElement = $("input#my-search");
    let tree = initView(my_tree,
        reorganizedData,
        searchElement,
        {
            onSuccess: (data,clearInput, textStatus) => {
                reorganizedData = {};
                if(clearInput)
                reorganizedData =generateObjectsLevelsAndIdsClearWithValue(data);
                else
                reorganizedData = generateObjectsLevelsAndIds(data);
                createList(my_tree, reorganizedData);
                my_tree.attr('class','tf-tree tf-search-result');
                $('#my-tree').show();
            },
            onFailed: (jqXHR, textStatus, errorThrown) => {
                my_tree.removeClass("tf-tree");
            },
            tree: my_tree,
        });
});
