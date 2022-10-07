function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function wait(seg) {
  await wait(seg * 1000);
}

function mostrarMediaProdutos() {
  console.log('Entrou no media');
  let componenteOrdernarPor = document.querySelector(
    '.ui-search-view-options__title.shops-custom-primary-font'
  );
  // É uma página de busca?
  if (componenteOrdernarPor) {
    function getPreco(elPriceAmount) {
      let parteInteiraEl = elPriceAmount.querySelector('.price-tag-fraction');
      let parteDecimalEl = elPriceAmount.querySelector('.price-tag-cents');
      let precoNum = 0;
      if (parteInteiraEl)
        precoNum += parseFloat(parteInteiraEl.innerText.replace('.', ''));
      if (parteDecimalEl)
        precoNum += parseFloat(parteDecimalEl.innerText) / 100;
      return precoNum;
    }
    let tagsPreco = document.querySelectorAll(
      'ol li div.ui-search-item__group__element .price-tag-amount'
    );
    let total = 0;
    for (const elPreco of tagsPreco) {
      total += getPreco(elPreco);
      console.log(`${getPreco(elPreco)} ${total}`);
    }
    let media = total / tagsPreco.length;
    console.log(`${media}`);

    // let elWrapOrdernarPor = document.querySelector(
    //   '.ui-search-view-options__container'
    // );
    // let elResultsDiv = document.querySelector(
    //   '.ui-search-search-result.shops__result'
    // );
    let wrapMedia = document.querySelector('#mediaMercadoLivre');
    let elMedia = document.createElement('div');
    elMedia.classList.add('elMediaInformer');
    var formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    elMedia.innerHTML = `<p>Média: <strong>${formatter.format(
      media
    )}</strong></p>`;
    //wrapMedia.appendChild(elMedia);
    document.querySelector('body').prepend(elMedia);
    if (window.innerWidth > 2300) {
      elMedia.style = 'position: absolute; margin: 5.5vw 38vw;';
    } else if (window.innerWidth > 2300) {
      elMedia.style = 'position: absolute; margin: 6vw 37vw;';
    } else if (window.innerWidth > 1900) {
      elMedia.style = 'position: absolute; margin: 7vw 35vw;';
    } else if (window.innerWidth > 1600) {
      elMedia.style = 'position: absolute; margin: 8vw 32vw;';
    } else if (window.innerWidth > 1400) {
      elMedia.style = 'position: absolute; margin: 10vw 30vw;';
    } else if (window.innerWidth > 1000) {
      elMedia.style = 'position: absolute; margin: 11vw 26vw;';
    } else if (window.innerWidth > 800) {
      elMedia.style = 'position: absolute; margin: 15vw 36vw;';
    }

    //document.querySelector('#nav-header-menu').prepend(elMedia);
    //elWrapOrdernarPor.appendChild(elMedia);
    // elResultsDiv.insertAdjacentElement('afterend', elMedia);
  }
}

console.log('Entrou no media de antes');

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('nada entra aqui mesmo??');
});

window.addEventListener('load', function (event) {
  console.log('Sequer entrou?');
  mostrarMediaProdutos();
  console.log('Final?');
});

// document.addEventListener('readystatechange', (event) => {
//   // When HTML/DOM elements are ready:
//   if (event.target.readyState === 'interactive') {
//     //does same as:  ..addEventListener("DOMContentLoaded"..
//     alert('hi 1');
//   }

//   // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
//   if (event.target.readyState === 'complete') {
//     console.log('Sequer entrou?');
//     mostrarMediaProdutos();
//     console.log('Final?');
//   }
// });
