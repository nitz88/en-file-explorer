/* global require, module, $ */
function fileBrowserDirective($timeout, $filter,fileBrowserService){
    return{
        restrict: "E",
        controllerAs: "vm",
        bindToController: true,
        template: require("./enFileBrowser.template.html"),
        controller: function(){
            console.log("File Browser Controller(FBC) - start");
            this.model = {
                data: [],
                currentFolder: "",
                currentFolderId : "",
                currentFolderDataLength: 0,
                newFolderName: "",
                showNewFolderForm: false,
                rootFolderName : "root",
                rootFolderId : 123,
                selectedFileObj: [],
                filter: "",
                pagination:{
                    itemPerPage: 5,
                    currentPage: 0,
                    totalPages: 0,
                    disableNextBtn: false,
                    disablePrevBtn: false
                },
                filterByLabel: "Filter by",
                filterByValue: "all",
                filterOption: []
            };

            // for creating new folder, we will make form reset and make it show on page
            this.showNewFolderForm = function(){
                this.model.newFolderName = "";
                this.model.showNewFolderForm = true;
            };

            // for closing new folder form
            this.closeNewFolderForm = function(){
                this.model.showNewFolderForm = false;
            };

            // on button click making input file click using jquery so file explorer will come up automatically
            this.openFilExplorer = function(){
                $timeout(function(){
                    $("#fileExplorer").click();
                });
            };

            // after selecting files, will add up in main object
            this.filesSelected = function(ele){
                this.model.selectedFileObj = $(ele)[0].files;
                var data = [];
                for(var i=0;i<this.model.selectedFileObj.length; i++){
                    data = fileBrowserService.addFiles({
                        blobId: Math.random(),
                        createdDate: new Date().valueOf(),
                        id: this.model.currentFolderId,
                        name: this.model.selectedFileObj[i].name,
                        size: this.model.selectedFileObj[i].size,
                        type:"File",
                        contentType: this.model.selectedFileObj[i].type
                    });
                }
               this.model.data = data;
               setPaginationControl(this);
               console.log("FBC - New Files Added");
            };

            // after adding folder details, will add folder details in main obj and make form display none
            this.addNewFolder = function(){
                var folderObj = {
                    name : this.model.newFolderName,
                    type: "Directory",
                    size: "",
                    createdDate: new Date().valueOf(),
                    blobId: Math.random(),
                    id: this.model.currentFolderId
                };

                this.model.data = fileBrowserService.addFolder(folderObj);
                this.closeNewFolderForm();

                setPaginationControl(this);
                console.log("FBC - New Folder Added");
            };

            /*
                if directory is selected then 
                    will make currentfolder id change,
                    will make current page number to 0
                    will set pagination control as it needs to be updated based on current folder data
            */

            this.changeFolder = function(fileObj){
                if(fileObj.type.toLowerCase() === "directory"){
                    this.model.currentFolderId = fileObj.blobId;
                    this.model.currentFolder = fileObj.name;
                    resetCurrentPage(this);
                    setPaginationControl(this);
                    console.log("FBC - Current Folder changed to " + fileObj.name);
                }
            };

            // to toggle filter menu option 
            this.toggleDropDownMenu = function(){
                $(".filterMenu").toggle();
            };

            // setting current folder id to root folder id and reseting pagination control
            this.goToRoot = function(){
                this.model.currentFolderId = this.model.rootFolderId;
                this.model.currentFolder = this.model.rootFolderName;
                setPaginationControl(this);
                console.log("FBC - Going to Root Folder");
            };

            // for changing filter option
            this.selectFilterOption = function(option){
                this.model.filterByLabel = option.label;
                this.model.filterByValue = option.value;
                this.toggleDropDownMenu();
            };
            
            // making next page and changing pagination button status
            this.nextPage = function(){
                this.model.pagination.currentPage++;
                setPaginationButtonStatus(this);
            };

            // making previous page and changing pagination button status
            this.prevPage = function(){
                this.model.pagination.currentPage--;
                setPaginationButtonStatus(this);
            };

            this.refreshPage = function(){
                // currently making same action as goToRoot
                this.goToRoot();
            };

            // setting filter options
            function setFilterOption(that){
                that.model.filterOption = fileBrowserService.getFilterOption();
                that.model.filterByLabel = "Filter By";
                that.model.filterByValue = "all";
            }

            // setting pagination buttons status - to make them disable or enable
            function setPaginationButtonStatus(that){
                that.model.pagination.disableNextBtn = ((that.model.pagination.currentPage + 1) >= that.model.pagination.totalPages);

                that.model.pagination.disablePrevBtn = (that.model.pagination.currentPage === 0);
            }

            // getting current folder data by using filter
            function getCurrentFolderData(that){
                return $filter("searchBrowser")(
                        that.model.data,
                        that.model.currentFolderId,
                        that.model.filter,
                        that.model.filterByValue);
            }

            // reseting current page to 0
            function resetCurrentPage(that){
                that.model.pagination.currentPage = 0;
            }

            // setting pagination control based on current page
            function setPaginationControl(that){
                var currentFolderData = getCurrentFolderData(that);
                that.model.currentFolderDataLength = currentFolderData.length;
                that.model.pagination.totalPages = Math.ceil(currentFolderData.length / that.model.pagination.itemPerPage);
                setPaginationButtonStatus(that);
            }

            // setting initial value for folder and folder id
            function setInitialValue(that){
                that.model.currentFolder = that.model.rootFolderName;
                that.model.currentFolderId = that.model.rootFolderId;
            }

            // making control ready to use
            (function init(that){
                setInitialValue(that);
                setFilterOption(that);
                setPaginationControl(that);
                console.log("FBC - All set and ready to use");
            })(this); // passing this to access model values
        }
    };
}

module.exports = fileBrowserDirective;