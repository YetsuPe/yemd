(function(angular,yemd){

	function form(){
		this.template=function(query){
			if (!query.status) return query ;
			var template='';
			angular.forEach(query.respond, function(value,index){
				switch (value.type){
					case 'number':
						var required = (value.required)? 'required' : '' ;
						template    += "<input type='"+value.type+"' name='"+value.name+"' "+required+" max='"+value.max+"' placeholder='"+value.name+"'/>";
					break;
					default:
						template +="<input/>";
					break;
				}
			}, template);
			return template;

		};
		return this.template;
	}

	yemd.factory('formHtml',form);
})(angular,yemd);