/// <reference types="cypress"/>

describe('Dinamic testes', () => {
    
    // HOOKS
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food =>{
        it(`Cadastro com comida ${food}`, function() {
            cy.fixture('userData').as('usuario').then(() => {
                cy.get('#formNome').type(this.usuario.nome)
                cy.get('#formSobrenome').type(this.usuario.sobrenome)
                cy.get(`[name=formSexo][value=F`).click()
                cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
                cy.get('#formEscolaridade').select(this.usuario.escolaridade)
                cy.get('#formEsportes').select(this.usuario.esportes)
           
                cy.get('#formCadastrar').click()            
    
                cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
            })
        })
    })
    it.only('Deve selecionar todos usando o each', () =>{
            
        cy.get('#formNome').type('Usuario')
        cy.get('#formSobrenome').type('Qualquer')
        cy.get(`[name=formSexo][value=F`).click()
        
        cy.get('[name=formComidaFavorita]').each($el => {
            // $el.click()
            if($el.val()!= 'vegetariano')
                cy.wrap($el).click()
        })
        
        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
    
        cy.get('#formCadastrar').click()   
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        
        // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })
    
})