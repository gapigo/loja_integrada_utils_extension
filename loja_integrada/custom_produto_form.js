console.log('custom_produto_form.js');
const api_key = `eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzODIwMjIwNCwidWlkIjoyODI5NjIwMywiaWFkIjoiMjAyMy0wMi0xOFQwNDowNTo1MC4wOTFaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6NTU1NjY4MSwicmduIjoidXNlMSJ9.gX1zX-JWdGTFxMUS9Y12BplM3Jv2OjQluutbInd_IH8`;
console.log(':|');

function fetchMonday(query, vars = {}) {
  return fetch('https://api.monday.com/v2', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: api_key,
    },
    body: JSON.stringify({
      query: query,
      variables: JSON.stringify(vars),
    }),
  })
    .then((res) => res.json())
    .then((res) => res);
}

async function criarElementoTabelaOuUpdate({
  sdk,
  nome,
  preco_custo,
  preco_venda,
  preco_promocional,
  data_criacao,
  data_modificacao,
  descricao,
}) {
  let query =
    'query { complexity { query } items_by_column_values (board_id: 4010317072, column_id: "name", column_value: "USZPZPGAE") { id name } }';

  let {
    data: {
      items_by_column_values: [item],
    },
  } = await fetchMonday(query);

  if (item) {
    query = `mutation ($itemId: Int!, $modifying: JSON!) { complexity { query } change_multiple_column_values (board_id: 4010317072, item_id: $itemId, column_values: $modifying) {id}}`;
    let vars = {
      itemId: parseInt(item.id),
      modifying: JSON.stringify({
        name: sdk,
        texto5: nome,
        n_meros: parseFloat(preco_custo.replace('.', '').replace(',', '.')),
        n_meros6: parseFloat(preco_venda.replace('.', '').replace(',', '.')),
        n_meros3: parseFloat(
          preco_promocional.replace('.', '').replace(',', '.')
        ),
        data: { date: data_criacao },
        data9: { date: data_modificacao },
        texto_longo9: descricao,
      }),
    };

    console.log(await fetchMonday(query, vars));
  } else {
  }
}

function converterData(string) {
  const datePattern = /\b(?:\d{2}(?:\/\d{2}\/\d{4})?)\b/;
  const numberPattern = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
  let arr = string.match(datePattern)[0].match(numberPattern);
  let res = '';
  arr.forEach((num, i) => {
    res = `${i == arr.length - 1 ? '' : '-'}${num}${res}`;
  });
  return res;
}

function trocarBotao() {
  let botaoOriginal = document.querySelector('#salvarButton');
  let novoBotao = botaoOriginal.cloneNode(true);
  novoBotao.id = 'novoBotao';
  botaoOriginal.style.display = 'none';
  botaoOriginal.insertAdjacentElement('afterend', novoBotao);
  novoBotao.onclick = async () => {
    let iframe = document.querySelector('.order-1 iframe');

    let valores = {
      sdk: document.querySelector('#id_sku').value.trim(),
      nome: document.querySelector('#id_nome').value.trim(),
      preco_custo: document.querySelector('#id_custo').value.trim(),
      preco_venda: document.querySelector('#id_cheio').value.trim(),
      preco_promocional: document.querySelector('#id_promocional').value.trim(),
      data_criacao: converterData(
        document.querySelectorAll(
          '.flex.justify-between.items-end.flex-col .font-semibold'
        )[0].innerText
      ),
      data_modificacao: converterData(
        document.querySelectorAll(
          '.flex.justify-between.items-end.flex-col .font-semibold'
        )[1].innerText
      ),
      descricao: iframe.contentDocument
        .querySelector('body')
        .innerHTML.slice(0, 2000),
    };
    await criarElementoTabelaOuUpdate(valores);
    //   botaoOriginal.click();
  };
}

window.addEventListener('load', function (event) {
  trocarBotao();
  console.log('Aloou');
});

// console.log(converterData('Data de criação: 19/02/2023 02:32'));
