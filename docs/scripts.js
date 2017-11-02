(() => {

  // VARIÁVEIS DOS CAMPOS DE INTERAÇÃO DO USUÁRIO
  const ui = {
    inputs: {
      cep: document.querySelector("#cep"),
      logradouro: document.querySelector("#logradouro"),
      bairro: document.querySelector("#bairro"),
      localidade: document.querySelector("#localidade"),
      uf: document.querySelector("#uf")
    },
    fields: document.querySelectorAll("input")
  };

  //VALIDAR O TIPO DE CARACTERE QUE O INPUT ACEITARÁ
  const validateEntry = function(e) {
    this.value = this.value.replace(/\D/g, "");
    this.value = this.value.replace(/^(\d{5})(\d)/, "$1-$2");
  };

  //VALIDA O NÚMERO DE CARACTERES A SER DIGITADO, E LIMPA OS CAMPOS CASO O INPUT ESTEJA VAZIO
  const validadeLength = () => {
    const cep = ui.inputs.cep;

    cep.value.length < 9
      ? (cep.classList.add("error"), cep.focus())
      : cep.classList.remove("error", getAddress(cep));

    cep.value.length === 0
      ? ui.fields.forEach(field => {
          field.value = "";
        })
      : "";
  };

  // REQUISIÇÃO PARA A API, E RETORNA O JSON COM AS INFORMAÇÕES DE CEP
  const getAddress = () => {
    let cepValue = cep.value;

    const headers = new Headers();
    headers.append("Content-type", "application/json");

    const conf = {
      method: "GET",
      headers
    };

    fetch(`https://viacep.com.br/ws/${cepValue}/json/`, conf)
      .then(res => {
        return res.json();
      })
      .then(getAddressSuccess)
      .catch(getAddressError);
  };

  // SE A REQUISIÇÃO RETORNAR, ITERA POR TODOS OS ELEMENTOS, E ATRIBUI O KEY DE CADA ELEMENTO AO VALUE DOS INPUTS
  const getAddressSuccess = address => {
    Object.keys(address).map(key => {
      const addressValue = address[key];
      const inputsList = document.querySelectorAll(`#${key}`);

      // console.log(key, addressValue);

      inputsList.forEach(() => {
        inputsList[0].value = addressValue;
      });
    });
  };

  //SE A REQUISIÇÃO NÃO RETORNAR, OU HOUVER ALGUM ERRO
  const getAddressError = () => {
    console.error("O servidor respondeu com um erro!");
  };

  // FUNÇÃO DE INICIALIZAÇÃO
  const init = (function() {
    cep.addEventListener("input", validateEntry);
    cep.addEventListener("focusout", validadeLength);
  })();

})();
