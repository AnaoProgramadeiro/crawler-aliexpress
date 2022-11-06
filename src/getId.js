const puppeteer = require('puppeteer');

async function minhaFuncao(id){
  //{ headless: false, defaultViewport: null }
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();
  
    await page.goto(`https://pt.aliexpress.com/af/${id}.html?trafficChannel=af&d=y&CatId=0&SearchText=${id}&ltype=affiliate&SortType=total_tranpro_desc&groupsort=1&page=1`, {timeout: 0});

    await page.evaluate('window.scrollTo(0, 500)');
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate('window.scrollTo(500, 1000)');
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate('window.scrollTo(1000, 1500)');
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate('window.scrollTo(1500, 2000)');
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate('window.scrollTo(2000, 2500)');

    const hrefsCategoriesDeduped = new Set(await page.evaluate(
      () => Array.from(
        document.querySelectorAll('._3t7zg'),
        a => a.href
      )))
    var myArr = Array.from(hrefsCategoriesDeduped);
  await browser.close(); 
  
  return myArr
  }


  
  module.exports = minhaFuncao;