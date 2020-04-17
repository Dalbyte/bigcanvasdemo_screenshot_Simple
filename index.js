const puppeteer = require('puppeteer');
var loopcount = 0;

myTimer();

function myTimer() {

    var currentDate = new Date();
    var zeit = currentDate.toLocaleTimeString();
    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //January is 0 not 1
    var year = currentDate.getFullYear();    
    var dateString =zeit.replace(/:/g, "-")+ '_' + date + "-" +(month + 1) + "-" + year;
    loopcount += 1;
    var save = 'png/' + dateString + '_'+ zeroPad(loopcount, 6) +'.png';

    

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://bigcanvasdemo.com/');
        await page.setViewport({width: 1920, height: 1080});
        // Interval Time Set
        await page.waitFor(120000);
    
        await page.screenshot({path: save, fullPage: true});
        await browser.close();
        await console.log( save );
        await myTimer();
    })();


    
}

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }