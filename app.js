const Crawler = require('crawler');
const temme = require('temme').default;
const _ = require('lodash');
const fs = require('fs');

var c = new Crawler({
    maxConnections: 100,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            return console.log(error);
        }else{
            let json = _.compact(temme(res.body, `[class] td@{a[href=$url]{$text}};`));

            fs.appendFileSync('region.json', JSON.stringify(json));

            _.forEach(json, item => getRegion(item.url));
        }

        done();
    }

});

getRegion('index.html');

function getRegion(url) {
    const baseUrl = 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2016/';

    c.queue(`${baseUrl}${url}`);
}