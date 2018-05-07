function qp(window, undefined) {
    window.location.query = function (source) {
        var map = {};
        source = source || this.search;

        if ("" != source) {
            var groups = source, i;

            if (groups.indexOf("?") == 0) {
                groups = groups.substr(1);
            }

            groups = groups.split("&");

            for (i in groups) {
                source = groups[i].split("=",
                    // For: xxx=, Prevents: [xxx, ""], Forces: [xxx]
                    (groups[i].slice(-1) !== "=") + 1
                );

                // Key
                i = decodeURIComponent(source[0]);

                // Value
                source = source[1];
                source = typeof source === "undefined"
                    ? source
                    : decodeURIComponent(source);

                // Save Duplicate Key
                if (i in map) {
                    if (Object.prototype.toString.call(map[i]) !== "[object Array]") {
                        map[i] = [map[i]];
                    }

                    map[i].push(source);
                }

                // Save New Key
                else {
                    map[i] = source;
                }
            }
        }

        return map;
    }

    window.location.query.makeString = function (source, addQuestionMark) {
        var str = "", i, ii, key;

        if (typeof source == "boolean") {
            addQuestionMark = source;
            source = undefined;
        }

        if (source == undefined) {
            str = window.location.search;
        }
        else {
            for (i in source) {
                key = "&" + encodeURIComponent(i);

                if (Object.prototype.toString.call(source[i]) !== "[object Array]") {
                    str += key + addUndefindedValue(source[i]);
                }
                else {
                    for (ii = 0; ii < source[i].length; ii++) {
                        str += key + addUndefindedValue(source[i][ii]);
                    }
                }
            }
        }

        return (addQuestionMark === false ? "" : "?") + str.substr(1);
    }

    function addUndefindedValue(source) {
        return typeof source === "undefined"
            ? ""
            : "=" + encodeURIComponent(source);
    }
}(window);