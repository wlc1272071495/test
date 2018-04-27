var $ = {
    ajax: function (json) {
        if (json.data) {
            json.url = json.url + "?";
            for (var i in json.data) {
                json.url += i + "=" + json.data[i] + "&";
            }

            json.url = json.url.substring(0, json.url.length - 1);
        }
        var req = new XMLHttpRequest();
        req.open(json.type, json.url, true);
        req.send();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                json.success(req.responseText);
            }
        }

    }
}