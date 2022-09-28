console.log('coidgo1');
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
// document.getElementsByTagName('head')[0].appendChild(script);
console.log('codigo2');
console.log($);

let botaoAdicionarCodigo = document.querySelector('.header-navigation-actions');
let botaoBackupCodigo = botaoAdicionarCodigo.cloneNode(true);
botaoBackupCodigo.style = 'margin-right: -20px';
//botaoAdicionarCodigo.parentElement.appendChild(botaoBackupCodigo);
botaoAdicionarCodigo.insertAdjacentElement('beforebegin', botaoBackupCodigo);
console.log('botaoBackupCodigo', botaoBackupCodigo);
botaoBackupCodigo.querySelector('a.w-auto').innerText = 'Download código';
//botaoBackupCodigo.querySelector('a.flex').innerHTML = '';
// botaoBackupCodigo.querySelector(
//   'a.flex'
// ).innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
// viewBox="0 0 485 485" style="enable-background:new 0 0 485 485;" xml:space="preserve">
//    <path d="M426.5,458h-368C51,458,45,464,45,471.5S51,485,58.5,485h368c7.5,0,13.5-6,13.5-13.5S434,458,426.5,458z"/>
//    <path d="M233,378.7c2.5,2.5,6,4,9.5,4s7-1.4,9.5-4l107.5-107.5c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0L256,336.5v-323
//        C256,6,250,0,242.5,0S229,6,229,13.5v323l-84.4-84.4c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1L233,378.7z"/>
// </svg>
// `;

let anchors = botaoBackupCodigo.querySelectorAll('a');
for (let a of anchors) {
  a.href = '#';
}
async function consultarURL(url) {
  var consulta = await $.ajax({
    type: 'GET',
    dataType: 'html',
    url: url,
  });
  console.log(consulta);
}

//document.addEventListener('DOMContentLoaded', function (e) {
console.log('Teste1');
botaoBackupCodigo.onclick = () => {
  console.log('Teste2');
  let caixaDeCodigos = document.querySelector('.rows.min-h-auto');
  console.log('Teste3');
  let divsCodigos = caixaDeCodigos.querySelectorAll('.row.small');
  console.log('Teste4');
  for (let divCodigo of divsCodigos) {
    let num;
    for (let cls of divCodigo.classList) {
      if (cls.startsWith('codigo_')) {
        num = cls.replace('codigo_', '');
        break;
      }
    }
    // console.log(
    //   'a',
    //   `https://app.lojaintegrada.com.br/painel/configuracao/html/${num}/editar`
    // );
    /* var consulta = $.ajax({
      type: 'GET',
      dataType: 'html',
      url: `https://app.lojaintegrada.com.br/painel/configuracao/html/${num}/editar`,
    }); */
    consultarURL(
      `https://app.lojaintegrada.com.br/painel/configuracao/html/${num}/editar`
    );
    // console.log(consulta);
    // console.log(consulta.responseText);
  }
};
