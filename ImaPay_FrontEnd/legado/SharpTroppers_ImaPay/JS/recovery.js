const form = document.getElementById("recovery-email");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const data = {
    email: form.email.value
  };
  const sendjson = new XMLHttpRequest();
  sendjson.open("POST", "/submit-email");
  sendjson.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  sendjson.send(JSON.stringify(data)); 
/*

Ouvindo o evento onreadystatechange para receber a resposta do servidor 

0 (Unsent) - A solicitação não foi enviada.
1 (Opened) - A solicitação foi aberta com open(), mas ainda não foi enviada com send().
2 (Headers Received) - A solicitação foi enviada e os cabeçalhos da resposta foram recebidos.
3 (Loading) - A resposta está sendo baixada.
4 (Done) - A resposta foi completamente recebida.

Estado da solicitação é 4 (Done) e o status HTTP é 200 (OK).

*/
sendjson.onreadystatechange = function() {
    if (sendjson.readyState === 4 && sendjson.status === 200) {
      console.log(sendjson.responseText);
    }
  };
});