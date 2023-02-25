/// <reference types="cypress"/>

describe('Work with basic elements', () => {
    
    // HOOKS
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span[class="facilAchar"]').should('contain', 'Cuidado')
        cy.get('span[class="facilAchar"]').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {        
        cy.get('a[href="#"]').click()
        cy.get('div[id="resultado"]').should('have.text', 'Voltou!')

        cy.reload()
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('textFields', ()=> {
        cy.get('input[id="formNome"]').type('Cypress test')
        cy.get('input[id="formNome"]').should('have.value', 'Cypress test')

        cy.get('textarea[id="elementosForm:sugestoes"]')
            .type('textarea')
            .should('have.value', 'textarea')

        cy.get('input[id="formSobrenome"]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')

        cy.get('textarea[id="elementosForm:sugestoes"]')
            .clear()
            .type('Erro{selectall}Acerto', {delay: 100})
            .should('have.value', 'Acerto')
    })

    it.only('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')
        cy.get('#formSexoMasc')
            .should('not.be.checked')
        cy.get('[name=formSexo]').should('have.length', 2)
    })

    it.only('CheckBox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')
        cy.get('[name="formComidaFavorita"]')
            .click({multiple: true})
            .should('be.checked')
    })

    it.only('Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('superior')
            .should('have.value', 'superior')
        
        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp')

        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length', 8)

        cy.get('[data-test=dataEscolaridade] option')
            .then($arr => {
                const values = []
                $arr.each(function() {
                    values.push(this.innerHTML)
                })
                expect(values).to.include.members(["Superior", "Mestrado"])
            })
        
    })

    it.only('Combo multiplo', () => {
        cy.get('select[id="formEsportes"]')
            .select(['natacao', 'Corrida', 'nada'])
        
        // cy.get('select[id="formEsportes"]')
        //     .should('have.value', ['natacao', 'Corrida', 'nada'])

        cy.get('select[id="formEsportes"]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })

        cy.get('select[id="formEsportes"]')
            .invoke('val').should('eql', ['natacao', 'Corrida', 'nada'])
    })
})