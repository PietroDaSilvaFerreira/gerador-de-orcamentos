const numberBudgets = document.querySelector(".numero-orcamentos")
const buttonBudget = document.querySelector(".button-budget")
const dia = document.querySelector(".dia")
const mes = document.querySelector(".mes")
const ano = document.querySelector(".ano")
const data = new Date()
const diaFormatado = String(data.getDate()).padStart(2, '0')
const mesFormatado = String(data.getMonth() + 1).padStart(2, '0')

dia.textContent = diaFormatado;
mes.textContent = mesFormatado;
ano.textContent = data.getFullYear();

numberBudgets.textContent = localStorage.getItem("counterBudgets") || 0;

buttonBudget.addEventListener("click", () => {
    const orcamento = {
        customerName: document.querySelector('[name="client-name"]').value,
        category: document.querySelector('[name="category"]').value,
        BudgetName: document.querySelector('[name="Budget-name"]').value,
        typeServicePrice: document.querySelector('[name="type-service-price"]').value,
        servicePrice: document.querySelector('[name="service-price"]').value,
        descricao: document.querySelector('[name="descricao"]').value,
        numeroOrcamento: numberBudgets.textContent,
        day: dia.textContent,
        month: mes.textContent,
        year: ano.textContent
    }

    const listaOrcamentos = JSON.parse(localStorage.getItem("orcamentos")) || []

    listaOrcamentos.push(orcamento)

    localStorage.setItem("orcamentos", JSON.stringify(listaOrcamentos))

    localStorage.setItem("counterBudgets", listaOrcamentos.length)
    numberBudgets.textContent = listaOrcamentos.length
})