var Buffer = require('buffer').Buffer
var fs = require('fs')
var test = require('tape')

// Test using the 'request' library on top of this module.
// This will use this module as a replacement for 'http' based on the configuration in
// .zuul.yml
var request = require('request')

var reference = fs.readFileSync(__dirname + '/../server/static/basic.txt')

test('basic use of \'request\'', function (t) {
	var numData = 0
	var numEnd = 0
	var req = request(location.protocol + '//' + location.host + '/basic.txt', function (error, response, body) {
		t.notOk(error, 'no error')
		t.ok(numData >= 1, 'at least one data event')
		t.equal(numEnd, 1, 'exactly one end event')
		t.equals(response.statusCode, 200, 'correct status code')
		t.equals(body, reference.toString(), 'contents match')
		t.end()
	})
	req.on('data', function () {
		numData++
	})
	req.on('end', function () {
		numEnd++
	})
	t.end()
})