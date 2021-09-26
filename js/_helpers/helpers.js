function getFullPathItem(data, i) {
    return data[i];
}

function getFullPathItemByLevel(data, i, level) {
    return getFullPathItem(data, i)[level - 1];
}

function getFullPathItemByIdAndDataIndex(data, i, id) {
    return getFullPathItem(data, i).find(item => item.id === id);
}

function getPathItemOnlyById(data, id) {
    return data.find(path => !!(path.find(item => item.id === id)));
}

function getPathItemsOnlyById(data, id) {
    return data.filter(path => !!(path.find(item => item.id === id)));
}

function createObjectItem(item, i, path, emptyObj) {
    item.level = i;
    if (path[i - 1]) {
        item.parentId = path[i - 1].id;
    } else {
        item.parentId = null;
    }
    if(Object.keys(item).indexOf('haveChildren')<0)
     item.haveChildren=false;

 

    item.getBigParentData = function () { 
        return emptyObj.data[path[0].id];
    }
    item.getSiblings = function () {
        return this.getBigParentData().filter(it => (it.parentId === this.parentId) && it.id !== item.id);
    }
    item.getBigParent = function () {
        return this.getBigParentData()[0];
    }
    item.getDirectParent = function () {
        return this.getBigParentData().find(parentItem => parentItem.id === this.parentId) || null;
    }
    item.getDirectChildren = function () {
        return this.getBigParentData().filter(parentItem => parentItem.parentId === this.id);
    }
    item.hasChildren = function () {
        return this.getDirectChildren().length !== 0 || this.haveChildren;
    }
    item.hasParent = function () {
        return !!this.getDirectParent();
    }
}

function getEmptyObj() {
    return (
        {
            data: {},
            getAllData() {
                return this.data;
            },
            getDataById(id) {
                return this.data[id] || null;
            },
            getItemByParentAndId(parentId, itemId) {
                return this.getDataById(parentId).find(item => item.id === itemId) || null;
            }
        }
    );
}

function unifyElements(emptyObj, path) {
    if(Array.isArray( path ))
    { 
        for(var data of path )
        {
            if (!emptyObj.data[data.id]) 
                emptyObj.data[data.id] = [];
          
                emptyObj.data[data.id].push(path);
           
           // emptyObj.data[data.id] = _.unionBy(_.flatten(emptyObj.data[data.id]), 'id');
        }
       
    }else 
    {
        if (emptyObj.data[path.id] && Array.isArray(emptyObj.data[path.id])) {
            emptyObj.data[path.id].push(path);
        } else {
            emptyObj.data[path.id] = [];
            emptyObj.data[path.id].push(path);
        }
        emptyObj.data[path.id] = _.unionBy(_.flatten(emptyObj.data[path.id]), 'id');
    }

}

function createObjectItemWithData(item, i, path, emptyObj) {
    item.level = i;
    if (path[i - 1]) {
        item.parentId = path[i - 1].id;
    } else {
        item.parentId = null;
    }
    
    if(Object.keys(item).indexOf('haveChildren')<0)
    item.haveChildren=false;
    item.getBigParentData = function () {
        return emptyObj.data[path[0].id];
    }
    item.getSiblings = function () {
        return this.getBigParentData().filter(it => (it.parentId === this.parentId) && it.id !== item.id);
    }
    item.getBigParent = function () {
        return this.getBigParentData()[0];
    }
    item.getDirectParent = function () {
        return this.getBigParentData().find(parentItem => parentItem.id === this.parentId) || null;
    }
    item.getDirectChildren = function () {
        return this.getBigParentData().filter(parentItem => parentItem.parentId === this.id);
    }
    item.hasChildren = function () {
        return this.getDirectChildren().length !== 0 || this.haveChildren;
    }
    item.hasParent = function () {
        return !!this.getDirectParent();
    }
}

function unifyElementsWithData(emptyObj, path) {
    if (emptyObj.data[path[0].id] && Array.isArray(emptyObj.data[path[0].id])) {
        emptyObj.data[path[0].id].push(path);
    } else {
        emptyObj.data[path[0].id] = [];
        emptyObj.data[path[0].id].push(path);
    }
    emptyObj.data[path[0].id] = _.unionBy(_.flatten(emptyObj.data[path[0].id]), 'id');
}
function generateObjectsLevelsAndIdsClearWithValue(data) {
    console.log('With data',data)
    let emptyObj = getEmptyObj(); 
    if (data && Array.isArray(data)) {
        data.map((path,j) => {
           if(Array.isArray(path))
           {
            path.map((item, i) => {
                createObjectItemWithData(item, i, path, emptyObj);
                unifyElementsWithData(emptyObj, path);
            });
             
             emptyObj.haveChildren=true;
           }else 
           {
            createObjectItemWithData(path,j, data, emptyObj);
            unifyElementsWithData(emptyObj, data);
           }
           
           
            
        });
    }
    console.log('datas',emptyObj)
    return emptyObj;
}
function generateObjectsLevelsAndIds(data,clearInput) {
    let emptyObj = getEmptyObj(); 
    if (data && Array.isArray(data)) {
        data.map((path,j) => {

            
 
           if(Array.isArray(path))
           {
            path.map((item, i) => { 
                createObjectItem(item, j, item, emptyObj);
                unifyElements(emptyObj, item);
            }); 
            emptyObj.haveChildren=true;
           }else 
           {
            
            createObjectItem(path,j, data, emptyObj); 
            unifyElements(emptyObj, path);
           }
          
           
            
        });
    } 
    return emptyObj;
}

/*let requestUUID = 1;*/
function executeQuery(
    searchQuery,
    onSuccess,
    onFailed,
    {
        url = `${configurationData.api}`,
        data = {
            q: searchQuery,
            ...configurationData.requestsRequiredData
        },
        beforeSend = null
    } = {}) {
    /*requestUUID++;*/

    if(searchQuery !==null)    
         if(searchQuery.length== 0)
             url=`${configurationData.api_empty_field}`;

    $.ajax({
        url,
        data,
        dataType: 'json',
        beforeSend: () => {
            /*if (requestUUID > 1) {
                requestUUID--;
            }*/
            if (beforeSend) {
                beforeSend();
            }
        },
        success: (data, textStatus, jqXHR) => {
            /*            if(requestUUID===1) {*/
            if (onSuccess) {
                onSuccess(data, searchQuery.length!= 0 ,textStatus, jqXHR);
            } else {
                console.log('You have to define onSuccess callback')
            }
            /*requestUUID--;
        }*/
        },
        complete: () => {
            $('.form-group.search-blc').removeClass('loader');
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



function parseData(data)
{
    var result=[];
    var index=0;
    var insert;
    for(var element of data )
    {
        console.log(element)
        var pathIndex=0;
        for(var path of element )
        {
            let emptyObj = getEmptyObj(); 
             console.log('path',path)
            createObjectItem(path,pathIndex, data, emptyObj); 

            pathIndex++;
            result.push(path)
        }
      
        index++;
    }
    console.log('result',result)
}

