const Crawler = require('crawler');
const temme = require('temme').default;
const {defineFilter} = require('temme');
const _ = require('lodash');
const fs = require('fs');

// defineFilter('replace', (arg1, arg2) => {
//     console.log(arg1)
//     console.log(arg2)
// })
var c = new Crawler({
    maxConnections: 100,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            let json = _.compact(temme(res.body, `[class] td@{a[href=$url]{$text}};`));

            fs.appendFileSync('region.json', JSON.stringify(json))
            _.forEach(json, item => {
                getRegion(item.url)
            });
        }
        done();
    }
    
});
const baseUrl = 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2016/';

c.queue(`${baseUrl}index.html`);

function getRegion(url) {
    c.queue(`${baseUrl}${url}`);
}