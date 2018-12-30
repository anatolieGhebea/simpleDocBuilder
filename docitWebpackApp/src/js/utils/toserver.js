'use strict';

module.exports = {
    loadDocumentData(url, resp) {
        //load json file with data from server
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var rs = JSON.parse(this.responseText);
                //buildWorkingPage(rs);
                resp.data = rs;
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    },
    urlPost(url, resp) {
        //load json file with data from server
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var rs = JSON.parse(this.responseText);
                
                console.log(rs);
                //buildWorkingPage(rs);
                resp.data = rs;
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    },
    sendDataToServer(url, data){

        let type = 'POST';
        let contentType = 'application/json';
    
        var xhr = new XMLHttpRequest();
        xhr.open(type, url, true);
        xhr.setRequestHeader("Content-Type", contentType);
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //var json = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
            }
        };
    
        var d = JSON.stringify(data);   
        xhr.send(d);
    
    }
}