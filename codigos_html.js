let botaoAdicionarCodigo = document.querySelector('.header-navigation-actions');
let botaoBackupCodigo = botaoAdicionarCodigo.cloneNode(true);
botaoBackupCodigo.style = 'margin-right: -20px';
botaoAdicionarCodigo.insertAdjacentElement('beforebegin', botaoBackupCodigo);
botaoBackupCodigo.querySelector('a.w-auto').innerText = 'Download código';

let anchors = botaoBackupCodigo.querySelectorAll('a');
for (let a of anchors) {
  a.href = '#';
}
async function getBlobFromUrl(url) {
  var consulta = await $.ajax({
    type: 'GET',
    url: url,
    xhrFields: {
      withCredentials: true,
    },
    'Access-Control-Allow-Origin': 'https://app.lojaintegrada.com.br/',
    'Access-Control-Allow-Credentials': true,
  });

  function getValorSelecionado(elSelect) {
    for (let option of elSelect.querySelectorAll('option')) {
      if (option.selected) return option.value;
    }
    return false;
  }
  function getTipo(htmlEl) {
    let selectTipo = htmlEl.querySelector('#id_tipo');
    let tipo = getValorSelecionado(selectTipo);
    if (tipo == 'javascript') return 'js';
    return tipo;
  }

  function getPaginaPublicacao(htmlEl) {
    let selectPagina = htmlEl.querySelector('#id_pagina_publicacao');
    return getValorSelecionado(selectPagina);
  }

  function getLocalPublicacao(htmlEl) {
    let selectLocal = htmlEl.querySelector('#id_local_publicacao');
    return getValorSelecionado(selectLocal);
  }

  let htmlEl = document.createElement('html');
  htmlEl.innerHTML = consulta.trim();
  let nome = htmlEl.querySelector('#id_descricao').value;

  let formato = getTipo(htmlEl);
  let codigoProgramado = `${
    formato === 'html' ? '<!--' : '/*'
  }\nPágina publicação: ${getPaginaPublicacao(htmlEl)}
  \nLocal Publicação: ${getLocalPublicacao(htmlEl)}\n
  ${formato === 'html' ? '-->' : '*/'}
  \n\n${htmlEl.querySelector('#id_conteudo').innerText}`;
  return {
    blob: new Blob([codigoProgramado], { type: 'text/plain;charset=utf-8' }),
    format: formato,
    name: nome,
  };
}

function createLoading(numEls = 1) {
  let headerNavigationDiv = document.querySelector('.header-navigation');
  let loadingDiv = document.createElement('div');
  loadingDiv.style = 'margin-top: -25px;';
  loadingDiv.innerHTML = `<p style="text-align:right;">Baixando elementos: <strong id="loadingElementsNum">0</strong><strong id="totalLoadingElements">/${numEls}</strong></p>`;
  loadingDiv.id = 'liue_loadingDiv';
  headerNavigationDiv.insertAdjacentElement('afterend', loadingDiv);
}

function setCurrentLoading(num) {
  let loadingNum = document.querySelector('#loadingElementsNum');
  loadingNum.innerText = `${num}`;
}

function destroyLoading() {
  let loadingDiv = document.querySelector('#liue_loadingDiv');
  if (loadingDiv) loadingDiv.remove();
}

function getZipName() {
  let loja = document.querySelector(
    '.truncate.text-on-base.font-semibold.text-sm.leading-4'
  ).innerText;
  let now = new Date();
  let data = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    .toString()
    .replaceAll(',', '');
  let time = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .toString()
    .replaceAll(',', '');
  return `Backup LojaIntegrada - ${loja} - ${data} ${time}`;
}
botaoBackupCodigo.onclick = () => {
  var zip = new JSZip();
  async function downloadFiles() {
    let caixaDeCodigos = document.querySelector('.rows.min-h-auto');
    let divsCodigos = caixaDeCodigos.querySelectorAll('.row.small');
    createLoading(divsCodigos.length);
    let i = 0;
    for (let divCodigo of divsCodigos) {
      i++;
      setCurrentLoading(i);
      let num;
      for (let cls of divCodigo.classList) {
        if (cls.startsWith('codigo_')) {
          num = cls.replace('codigo_', '');
          break;
        }
      }
      let f = await getBlobFromUrl(`/painel/configuracao/html/${num}/editar`);
      zip.file(`${f.name}.${f.format}`, f.blob);
    }
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, getZipName());
    });
    destroyLoading();
  }
  downloadFiles();
};
