window.addEventListener("load", () => {
    const addNewBudget = document.getElementById("add-new-budget")
    const buttonFilter = document.getElementById("filter")
    const searchInput = document.querySelector(".input")
    const divOptions = document.querySelector(".options")
    let listCategorys = []
    let listaOrcamentos = JSON.parse(localStorage.getItem("orcamentos")) || []

    if (listaOrcamentos == "") {
        document.querySelector("#nothing-budget").style.display = "block"
        const main = document.querySelector(".principal")
        main.style.justifyContent = "center"
        main.style.alignItems = "center"
    } else {
        document.querySelector("#nothing-budget").style.display = "none"
        listaOrcamentos.forEach(function (object) {
            const divBudget = document.createElement('div')
            const pBudgetName = document.createElement('p')
            const pCustomerName = document.createElement('p')
            const pCategory = document.createElement('p')
            const removeButton = document.createElement('button')
            const hNumeroOrcamento = document.createElement('h2')

            divBudget.classList.add("div-budget")
            pBudgetName.classList.add("pBudget-name")
            pCustomerName.classList.add("pCustomer-name")
            pCategory.classList.add("pCategory")
            removeButton.classList.add("remove-button")
            hNumeroOrcamento.classList.add("hNumero-orcamento")

            hNumeroOrcamento.textContent = object.numeroOrcamento
            pBudgetName.textContent = object.BudgetName
            pCustomerName.textContent = "Nome Do Cliente: " + object.customerName
            pCategory.textContent = object.category
            removeButton.textContent = "X"
            listCategorys.push(object.category)

            document.querySelector(".principal").appendChild(divBudget)
            divBudget.appendChild(hNumeroOrcamento)
            divBudget.appendChild(pBudgetName)
            divBudget.appendChild(pCustomerName)
            divBudget.appendChild(pCategory)
            divBudget.appendChild(removeButton)

            divBudget.addEventListener("click", () => {
                localStorage.setItem("numberbudget", divBudget.querySelector(".hNumero-orcamento").textContent)
                localStorage.setItem("pcustomername", object.customerName)
                localStorage.setItem("pbudgetname", object.BudgetName)
                localStorage.setItem("pTypeServicePrice", object.typeServicePrice)
                localStorage.setItem("pServicePrice", object.servicePrice)
                localStorage.setItem("pDescricao", object.descricao)
                localStorage.setItem("pDay", object.day)
                localStorage.setItem("pMonth", object.month)
                localStorage.setItem("pYear", object.year)
                window.location.href = "budget.html";
            })
        });
    }

    addNewBudget.addEventListener("click", () => {
        let counterBudget = listaOrcamentos.length + 1
        localStorage.setItem("counterBudgets", counterBudget)
    })

    buttonFilter.addEventListener("click", () => {
        divOptions.classList.toggle("show")
    })

    function addCategory() {
        let newListCategorys = [...new Set(listCategorys)]
        newListCategorys.forEach(function (category) {
            const pCategory = document.createElement("p")
            pCategory.textContent = category
            pCategory.classList.add("option")
            divOptions.appendChild(pCategory)
        })
    }
    addCategory()
    let allOptions = document.querySelectorAll(".option")
    let allBudgetNames = document.querySelectorAll(".pBudget-name")
    let allDivBudgets = document.querySelectorAll(".div-budget")
    let btnRemovedor = document.querySelectorAll(".remove-button")


    btnRemovedor.forEach(function (btn) {
        btn.addEventListener("click", (event) => {
            event.stopPropagation()
            const card = event.target.closest(".div-budget")
            const id = card.querySelector(".hNumero-orcamento").textContent
            card.remove()

            listaOrcamentos = listaOrcamentos.filter((item) => item.numeroOrcamento != id)
            localStorage.setItem("orcamentos", JSON.stringify(listaOrcamentos))

            if (listaOrcamentos == "") {
                document.querySelector("#nothing-budget").style.display = "block"
                const main = document.querySelector(".principal")
                main.style.justifyContent = "center"
                main.style.alignItems = "center"
            }
        })
    })

    searchInput.addEventListener("input", () => {
        let searchInputValue = searchInput.value.toLowerCase()
        allBudgetNames.forEach((budgetName) => {
            let nome = budgetName.textContent.toLowerCase()

            if (searchInputValue === "") {
                budgetName.closest(".div-budget").style.display = "grid"
            }
            else if (budgetName.textContent.includes(searchInputValue)) {
                budgetName.closest(".div-budget").style.display = "grid"
            } else {
                budgetName.closest(".div-budget").style.display = "none"
            }
        })
    })

    allOptions.forEach(function (opcao) {
        opcao.addEventListener("click", () => {
            const selected = opcao.textContent
            divOptions.classList.remove("show")
            filterCategory(selected)
        })
    })

    function filterCategory(cat) {
        allDivBudgets.forEach(function (budget) {
            const budgetCategory = budget.querySelector(".pCategory").textContent
            if (cat == "Todos") {
                budget.style.display = "grid"
            }
            else if (cat == budgetCategory) {
                budget.style.display = "grid"
            } else {
                budget.style.display = "none"
            }
        })
    }
})