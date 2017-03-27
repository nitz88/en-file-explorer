"use strict";
/* global angular, require */
angular.module("enFileExplorer")
        .filter("searchBrowser",
        ["$filter", require("./enFileBrowser.filter")]);

angular.module("enFileExplorer")
        .filter("offset",
        require("./enFileBrowser.offset"));