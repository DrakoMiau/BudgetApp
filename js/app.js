const income = [
    new Income('Salary', 2100.00),
    new Income('Sale car', 1500),
    new Income('New income', 4000)
];

const outflow = [
    new Outflow('Rent apartment', 900),
    new Outflow('Clothes', 400)
];

let loadApp = () => {
    loadHead();
    loadIncome();
    loadOutflow();
}

let totalIncome = () => {
    let totalIngreso = 0;
    for (let ingreso of income) {
        totalIngreso += ingreso.value;
    }
    return totalIngreso;
}

let totalOutflow = () => {
    let totalEgreso = 0;
    for (let egreso of outflow) {
        totalEgreso += egreso.value;
    }
    return totalEgreso;
}

let loadHead = () => {
    let budget = totalIncome() - totalOutflow();
    let percentageOutflow = totalOutflow() / totalIncome();
    document.getElementById('budget').innerHTML = currencyFormat(budget);
    document.getElementById('percentage').innerHTML = percentageFormat(percentageOutflow);
    document.getElementById('income').innerHTML = currencyFormat(totalIncome());
    document.getElementById('outflow').innerHTML = currencyFormat(totalOutflow());
}

const currencyFormat = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractonDigits: 2 });
}

const percentageFormat = (value) => {
    return value.toLocaleString('en-US', { style: 'percent', minimumFractonDigits: 2 })
}

const loadIncome = () => {
    let incomeHTML = '';
    for (let ingreso of income) {
        incomeHTML += createIncomeHTML(ingreso);
    }
    document.getElementById('income-list').innerHTML = incomeHTML;
}

const createIncomeHTML = (ingreso) => {
    let incomeHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.description}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${currencyFormat(ingreso.value)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick="deleteIncome(${ingreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>`;
    return incomeHTML;
}

const deleteIncome = (id) => {
    let indexDelete = income.findIndex(ingreso => ingreso.id === id);
    income.splice(indexDelete, 1);
    loadHead();
    loadIncome();
}

const loadOutflow = () => {
    let egresosHTML = '';
    for (let egreso of outflow) {
        egresosHTML += createOutflowHTML(egreso);
    }
    document.getElementById('outflow-list').innerHTML = egresosHTML;
}

const createOutflowHTML = (egreso) => {
    let outflowHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.description}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">- ${currencyFormat(egreso.value)}</div>
                        <div class="elemento_porcentaje">${percentageFormat(egreso.value/totalIncome())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick="deleteOutflow(${egreso.id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return outflowHTML;
}

const deleteOutflow = (id) => {
    let indexDelete = outflow.findIndex(egreso => egreso.id === id);
    outflow.splice(indexDelete, 1);
    loadHead();
    loadOutflow();
}

const addData = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if (descripcion.value !== '' && valor.value !== '') {
        if (tipo.value === 'ingreso') {
            income.push(new Income(descripcion.value, Number(valor.value)));
            loadHead();
            loadIncome();
        } else if (tipo.value === 'egreso') {
            outflow.push(new Outflow(descripcion.value, Number(valor.value)));
            loadHead();
            loadOutflow();
        }
    }
}