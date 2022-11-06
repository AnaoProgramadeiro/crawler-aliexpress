const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function getPhotos(productId, ownerMemberId, totalPages) {
  //{ headless: false, defaultViewport: null }
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();
  var photos = [];

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const feedbackUrl = `https://feedback.aliexpress.com/display/productEvaluation.htm?v=2&page=${currentPage}&currentPage=${currentPage}&productId=${productId}&ownerMemberId=${ownerMemberId}&withPictures=true`;
      console.log(feedbackUrl)
      var cookies = [
        {
          "name": "ali_apache_id",
          "value": "33.3.26.85.1667544478499.198049.6",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1702104478.472446,
          "httpOnly": false,
          "secure": false
        },
        {
          "name": "xman_us_f",
          "value": "x_l=0&acs_rt=195a759d72dc4f32b6e7fd00aeda4e66",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1702148001.778484,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "acs_usuc_t",
          "value": "x_csrf=e2sw9ey6pf_z&acs_rt=195a759d72dc4f32b6e7fd00aeda4e66",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "xman_t",
          "value": "01vSPtfUDEJ0BSGio0EfH7Q6pvbGaMsWe9OaxyJaUPS7GL5Ej6xyN3HbYQVYOvza",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1675320478.472525,
          "httpOnly": true,
          "secure": true
        },
        {
          "name": "xman_f",
          "value": "LlLik9tSg9Pg1257a4qpwc1rpMbWn5dedQkT9CU+xSkK7flIvEUR40k4xPabhf/GZ5J6F2JFgjdRMXMQ31/bVqwiccLLiRtaOF2sD2QAvxEMd55QiDS5DA==",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1702104478.472538,
          "httpOnly": true,
          "secure": true
        },
        {
          "name": "SLG_G_WPT_TO",
          "value": "pt",
          "domain": "feedback.aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "SLG_GWPT_Show_Hide_tmp",
          "value": "1",
          "domain": "feedback.aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "SLG_wptGlobTipTmp",
          "value": "1",
          "domain": "feedback.aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "x5sec",
          "value": "7b2261656272696467653b32223a226434306332306363393732326163303432653830386461346539633933303966435043386c5a7347454c7552337272346e4f654a587a445976652f5541304144227d",
          "domain": "feedback.aliexpress.com",
          "path": "/",
          "expires": 1667589501.033249,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "JSESSIONID",
          "value": "CC4B6F96A86170C959C5094D5B8DB382",
          "domain": "feedback.aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": true,
          "secure": false
        },
        {
          "name": "isg",
          "value": "BNvb7qArPAeGVUERWoKYw8Viej9FsO-yC_lc1s0Yt1rxrPuOVYB_Avk-QBQil0eq",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1683140001,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "tfstk",
          "value": "cIONBVwU7fhZGKYx26f2aCUCa6LOwUODNv7AImbTnKX2KNf0ooQ3XV-e2yrcI",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1683140001,
          "httpOnly": false,
          "secure": false
        },
        {
          "name": "l",
          "value": "eBaM9mCuLjWTk8uLBOfanurza77OSKRYYuPzaNbMiOCPOUfB5GI5W6rS7DL6C3MNh6uWR3Wh0jdDBeYBqQAonxvtP73nADMmn",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1683140001,
          "httpOnly": false,
          "secure": false
        }
      ];

      await page.setCookie(...cookies);
      await page.goto(feedbackUrl, {timeout: 0});
      await new Promise(r => setTimeout(r, 2000));
      var data = await page.evaluate(() => document.querySelector('*').outerHTML);
      
      const $ = cheerio.load(data);
      $('.feedback-list-wrap .feedback-item').each((index, element) => {
        const $elm = $(element);
 
        $elm.find('.r-photo-list > ul > li').each((index, photo) => {
          const url = $(photo)
            .find('img')
            .attr('src');
          photos.push(url);
        });
      });
    }
    await browser.close(); 
    return photos
  }

module.exports = getPhotos;


