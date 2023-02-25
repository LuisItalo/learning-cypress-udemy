/// <reference types="cypress" />

describe('Esperas...', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('[id="novoCampo"]').should('not.exist')
        cy.get('[id="buttonDelay"]').click()
        cy.get('[id="novoCampo"]').should('not.exist')
        cy.get('[id="novoCampo"]').should('exist')
        cy.get('[id="novoCampo"]').type('funcionou')
    })

    it.only('DEve fazer Retrys', () => {
        cy.get('[id="buttonDelay"]').click()
        cy.get('[id="novoCampo"]')
            // .should('not.exist')
            .should('exist') //nao juntar assertivas opostas
    })

    it.only('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        // cy.get('#lista li')
            // .find('span')
            // .should('contain', 'Item 1')
        cy.get('#lista li span')
            .should('contain', 'Item 2')

        cy.reload()
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#lista li')
            // .find('span')
            .should('contain', 'Item 2')
    })

    it.only('Uso do timeout', () => {
        // "defaultCommandTimeout": 1000 no arquivo cypress.json
        // cy.get('[id="buttonDelay"]').click()
        // cy.get('[id="novoCampo"]', {timeout: 1000}).should('exist')

        // cy.get('#buttonListDOM').click()
        // // cy.wait(5000)  // usar em casos extremos 
        // cy.get('#lista li span')
        //     .should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span',)
            .should('have.length', 1 )
        cy.get('#lista li span',)
            .should('have.length', 2 )
    })

    it.only('Nem tudo tem retry', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '111')
    })

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').click()
        // cy.get('#lista li span').then($el => {  //novas buscas utilizar then
        //     expect($el).to.have.length(1)
        // })

        // cy.get('#lista li span').should($el => {
        //     console.log($el)
        //     expect($el).to.have.length(1)
        // })

        cy.get('#buttonListDOM').should($el => {
            expect($el).to.have.length(1)
            // cy.get('#buttonList')
        })
    })
})