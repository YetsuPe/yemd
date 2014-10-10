(function(angular, yemd){
	yemd.factory('listHtml', [ function(){
    return function(query,select ){
      var result= {};
      var newQuery= [];
      if ( angular.isArray(query) ) {
        angular.forEach(query, function(valueI,indexI){ // travel of all rows
          var row={};
          angular.forEach(valueI, function(value,key){ // individual row and retrieve field,key
            //angular.forEach(value, function(contentOneRow,fieldOneRow){ //key and field of individual row
              angular.forEach(select, function(content,index){ //select array
                if ( angular.isObject(content) ) {
                  angular.forEach(content, function(nameView,field){
                    if ( key === field && typeof(content.filter)==='undefined' ) { this[nameView]=value };
                    if ( key === field && typeof(content.filter)!=='undefined') { this[nameView]= content.filter(value) };
                  }, row);
                }else if (  key === content ) { 
                  this[key]= value ;
                };
              }, row);
            //});
          });
          this.push(row);
        },newQuery);
        return newQuery;
      }else{
        angular.forEach(query, function(value,key){ 
          angular.forEach(select, function(content,index){
            if ( angular.isObject(content) ) {
              angular.forEach(content, function(nameView,field){
                if ( key === field && typeof(content.filter)==='undefined' ) { this[nameView]=value };
                if ( key === field && typeof(content.filter)!=='undefined')  { this[nameView]= content.filter(value) };
              }, result);
            }else if (  key === content ) { 
              this[key]=value ;
            };
          }, result);
        });
        return result;
      }; 
    };  
  }]);
})(angular,yemd);