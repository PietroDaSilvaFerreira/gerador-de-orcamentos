const typeService = document.getElementsByName("type-service-price")
const servicePrice = document.getElementsByName("service-price")
const total = document.querySelector(".total")
const clientName = document.getElementsByName("client-name")
const budgetName = document.getElementsByName("Budget-name")
const obs = document.getElementsByName("descricao")

document.querySelector(".numero-orcamentos").textContent = localStorage.getItem("numberbudget")
clientName[0].placeholder = localStorage.getItem("pcustomername")
budgetName[0].value = localStorage.getItem("pbudgetname")
typeService[0].value = localStorage.getItem("pTypeServicePrice")
servicePrice[0].placeholder = localStorage.getItem("pServicePrice")
obs[0].value = localStorage.getItem("pDescricao")
document.querySelector(".dia").textContent = localStorage.getItem("pDay")
document.querySelector(".mes").textContent = localStorage.getItem("pMonth")
document.querySelector(".ano").textContent = localStorage.getItem("pYear")

typeService[0].addEventListener("input", () => {
    somadorPrecos()
})

servicePrice[0].addEventListener("input", () => {
    somadorPrecos()
})

function somadorPrecos() {
    let soma = Number(typeService[0].value) + Number(servicePrice[0].value)
    total.textContent = soma.toFixed(2)
}
somadorPrecos()

document.querySelector(".form").addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
        return
    }
    e.preventDefault()

    const mensagem = `
    Olá, *${clientName[0].value}!*

Segue o orçamento solicitado:

📄 *Orçamento:* ${budgetName[0].value}
🔹 Tipo de serviço: R$ ${typeService[0].value}
🔸 Valor do serviço: R$ ${servicePrice[0].value}

📝 *Observações:*
${obs[0].value}

💰 *Total:* R$ ${total.textContent}

Se tiver alguma dúvida ou quiser ajustar algum detalhe, estou à disposição!
    `
    const mensagemFinal = encodeURIComponent(mensagem);
    let custumerNumber = document.getElementsByName("client-number")[0].value
    const link = `https://api.whatsapp.com/send?phone=${custumerNumber}&text=${mensagemFinal}`;
    window.open(link, "_blank");
})