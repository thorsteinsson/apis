var assert = require('assert');

function assertResults(json) {
    assert(json.results && typeof json.results.length !== "undefined", "Does not contain a 'results' field");
    assert(json.results.length > 0, "Results are empty");
};
function assertPresenceOfFields(fields, arr) {
    arr.forEach(function(result, i) {
        fields.forEach(function(field) {
            assert(typeof result[field] !== "undefined", "Missing field '" + field + "' in result #" + i);
        });
    });
};
// always returns the same fields, so we'll just reuse this function for both cases
// (I may be going a bit overboard on this)
exports.testRequestHandlerForFields = function(done, fieldsToCheckFor) {
    return function(err, res, body) {
        if (err) throw err;
        var json = JSON.parse(body);

        // Check for the presence of the results property
        assertResults(json);

        // Check for the presence of all expected fields
        assertPresenceOfFields(fieldsToCheckFor, json.results);

        done();
    };
};
// Generate http request params for a particular endpoint
exports.testRequestParams = function(path, form) {
    return {
        url: "http://localhost:3100" + path,
        method: "POST",
        form: form,
        headers: [ "Content-type: application/json" ]
    };
};
