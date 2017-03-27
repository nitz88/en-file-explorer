/* global module */
function fileBrowserFilter($filter){
	return function(allData,currentFolderId, searchTerm, searchBy){
		if(allData && allData.length > 0){
			var result = [];

			if(searchBy === "all" && searchTerm && searchTerm.length > 0){
				result = $filter("filter")(allData, searchTerm);
			}else if(searchBy !== "all" && searchTerm && searchTerm.length > 0){
				result = $filter("filter")(allData,{name: searchTerm, type : searchBy});
			}else{
				result = $filter("filter")(allData, {id : currentFolderId});
			}
			return result;	    	
		}
		
		return allData;
	};
}
module.exports = fileBrowserFilter;