// // Initialize button with user's preferred color
// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// if (window.location.href.indexOf('lista.mercadolivre.com.br') > -1) {
// }
console.log('AAA2');
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { mercadoLivreMedia: 'request' },
    function (response) {
      console.log(response.mercadoLivreMedia);
      let elMedia = document.querySelector('#mediaMercadoLivre');
      elMedia.innerHTML = response.mercadoLivreMedia;
    }
  );
});
console.log('AAAAAB3');

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(
//     sender.tab
//       ? 'from a content script:' + sender.tab.url
//       : 'from the extension'
//   );
//   if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });
// });
// // A function to use as callback
// function doStuffWithDom(domContent) {
//   console.log('I received the following DOM content:\n' + domContent);
// }

// // When the browser-action button is clicked...
// chrome.action.onClicked.addListener(function (tab) {
//   chrome.storage.sync.get(['mediaMercadoLivre'], function (result) {
//     console.log('Value currently is ' + result.key);
//   });
//   // ...check the URL of the active tab against our pattern and...
//   //if (urlRegex.test(tab.url)) {
//   if (true) {
//     console.log('Entraaaaaaaa');
//     // ...if it matches, send a message specifying a callback too
//     chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom);
//   }
// });
