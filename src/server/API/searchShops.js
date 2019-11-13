const request = require('request-promise');
global.review = [];

let searchShops = {
    getList: function () {
    	let options = {
			method: 'GET',
			url: 'http://api.yelp.com/v3/businesses/search?location=alpharetta&term=top 5 ice cream shops',
			headers: {
			  'Authorization': 'Bearer ofys-_RITh6A5P4i0KS9b7WlyVfrv0njB9PgQTng4JSjDtHaMJ52PTR9Gd1UfLLoWtybuhNV-kr8dvrXJ90vtlCgpN4HZFlh8MQyaQwEMxR0oROEDhS6huSrsdDKXXYx',
			  'content-type': 'application/JSON',
			  rejectUnauthorized: false
			}
		};
        return request(options).then(function(response) {
            let result = JSON.parse(response);
            let topShops;
            if(result.businesses && result.businesses.length > 0) {
            	topShops = result.businesses.slice(0,5);
            	topShops.map((business, index) => {
            		topShops[index].review = module.exports.getReview(business.id);
            		console.log('shirin review:', topShops[index].review);
            	});
            }
            // console.log('topshops', topShops);
            return topShops;
        }).catch(function (err) {
        	console.info('Error:', err);
    	});
    },
    getReview: function (id) {
    	let options = {
			method: 'GET',
			url: 'http://api.yelp.com/v3/businesses/' + id + '/reviews',
			headers: {
			  'Authorization': 'Bearer ofys-_RITh6A5P4i0KS9b7WlyVfrv0njB9PgQTng4JSjDtHaMJ52PTR9Gd1UfLLoWtybuhNV-kr8dvrXJ90vtlCgpN4HZFlh8MQyaQwEMxR0oROEDhS6huSrsdDKXXYx',
			  'content-type': 'application/JSON',
			  rejectUnauthorized: false
			}
		};

    	// let review;
		request(options).then(function(response) {
			let result = JSON.parse(response);
			reviewFirst = result.reviews.slice(0,1);
			// console.log('hasan', {text: review[0].text, name: review[0].user.name});
			global.review[id] = {text: reviewFirst[0].text, name: reviewFirst[0].user.name}
			return global.review[id];
		}).catch(function (err) {
        	console.info('Error:', err);
    	});
		let review = global.review[id];
		return review;
    }
};

module.exports = searchShops;