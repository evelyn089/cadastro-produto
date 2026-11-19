// 1) Endereço do banco
const URL_BANCO = "https://technoworks.com.br/rest/3026107149";

// 2) Salvar um produto no banco
async function salvarProduto(produto) {
  const resposta = await fetch(URL_BANCO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto)
  });
  return await resposta.json();
}

// 3) Buscar os produtos do banco
async function buscarProdutos() {
  const resposta = await fetch(URL_BANCO);
  const resultado = await resposta.json();
  return resultado.dados || resultado;
}

// 4) Mostrar os produtos na tela
async function mostrarLista() {
  const lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";

  const produtos = await buscarProdutos();

  produtos.forEach(function (p) {
    const item = document.createElement("li");
    item.textContent = p.nome + " - R$ " + p.preco + " (" + p.quantidade + ")";
    lista.appendChild(item);
  });
}

// 5) Quando clicar em Cadastrar
const form = document.getElementById("formProduto");

form.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const produto = {
    nome: document.getElementById("nome").value,
    preco: Number(document.getElementById("preco").value),
    quantidade: Number(document.getElementById("quantidade").value)
  };

  await salvarProduto(produto);
  form.reset();
  mostrarLista();
});

// 6) Ao abrir a página, mostrar o que já está salvo
mostrarLista();