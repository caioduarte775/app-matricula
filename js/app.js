class Aluno{
	constructor(nome, sobrenome, data_nascimento, endereco, pais, cidade, estado, matricula_aluno){
        this.nome = nome
        this.sobrenome = sobrenome
        this.data_nascimento = data_nascimento
        this.endereco = endereco
        this.pais = pais
        this.cidade = cidade
        this.estado = estado
        this.matricula_aluno = matricula_aluno
    }
	validarDados(){
		for(let i in this){
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd{
    constructor(){
		let id = localStorage.getItem('id')
		if(id === null){
			localStorage.setItem('id', 0)
		}
	}
    getProximoId(){
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}
	matricular(d){
		let id = this.getProximoId()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id', id)
	}
}

let bd = new Bd()

function matricularAluno(){

    let nome = document.getElementById('nome')
    let sobrenome = document.getElementById('sobrenome')
    let data_nascimento = document.getElementById('data_nascimento')
    let endereco = document.getElementById('endereco')
    let pais = document.getElementById('pais')
    let cidade = document.getElementById('cidade')
    let estado = document.getElementById('estado')
    let matricula_aluno = Math.floor(Math.random() * 1000000000 + 1000000000)
    
	let aluno = new Aluno(
        nome.value,
        sobrenome.value,
        data_nascimento.value,
        endereco.value,
        pais.value,
        cidade.value,
        estado.value,
        matricula_aluno
	)
    if(aluno.validarDados()){
		bd.matricular(aluno)
		document.getElementById('modal_titulo').innerHTML = 'Estudante matriculado!'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'O aluno foi matriculado com sucesso na rede de ensino. Número de cadastro: ' + matricula_aluno
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'
		$('#modalMatricularAluno').modal('show') 

		nome.value = ''
        sobrenome.value = ''
        data_nascimento.value = ''
        endereco.value = ''
        pais.value = ''
        cidade.value = ''
        estado.value = ''
		
    }
    else{
		document.getElementById('modal_titulo').innerHTML = 'Falha na operação'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Ocorreu um erro durante o processo. Verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-danger'
		$('#modalMatricularAluno').modal('show') 
	}
}

function consultarMatricula(){
    let matriculas = Array()
    let encontrado = 0
    let id = localStorage.getItem('id')
    let matriculaD = document.getElementById('matriculaDigitada').value
    for(let i = 1; i <= id; i++){
        let matricula = JSON.parse(localStorage.getItem(i))
        if(matriculas === null){
            continue
        }
        matricula.id = i
        matriculas.push(matricula)
        const sliced = Object.fromEntries(
            Object.entries(matricula).slice(7, 8)
        )
        if(Object.values(sliced) == matriculaD){
            encontrado = 1
            console.log(matricula)
            mostrarInfo(matricula)
        }
    }
    if(encontrado != 1){
        window.location.href = 'matricula-indisponivel.html'
    }
}

function mostrarInfo(matricula){
    let listaInfo = document.getElementById('alunoInfo')
    let linha = listaInfo.insertRow();
    linha.insertCell(0).innerHTML = matricula.nome
    linha.insertCell(1).innerHTML = matricula.sobrenome
    linha.insertCell(2).innerHTML = matricula.data_nascimento
    linha.insertCell(3).innerHTML = matricula.pais
    linha.insertCell(4).innerHTML = matricula.endereco
    linha.insertCell(5).innerHTML = matricula.cidade

    switch(matricula.estado){
        case '1': linha.insertCell(6).innerHTML = 'São Paulo'
            break
        case '2': linha.insertCell(6).innerHTML = 'Rio de Janeiro'
            break
    }
}
