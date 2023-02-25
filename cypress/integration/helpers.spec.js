/// <reference types="cypress" />


describe('Helpers...', () => {
    it('Wrap', () => {
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property','nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        // // cy.get('#formNome').type('funciona?')
        // cy.get('#formNome').then($el => {
        //     cy.wrap($el).type('funciona via cypress')
        // })
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })
        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botao'))
        // promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botao'))
    
        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)    
    })

    // TRABALHA COM PROPRIEDADES
    it.only('Its...', () => {
        const obj =  {nome: 'User', idade: 20}
        cy.wrap(obj).should('have.property', 'nome', 'User')

        cy.wrap(obj).its('nome').should('be.equal', 'User')

        const obj2 =  {nome: 'User', idade: 20, endereco: {rua: 'dos bobos'}}
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('to.be.eql', 'dos bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')
        
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.eql', 20)
    })

    // TRABALHA COM FUNÇOES
    it.only('Invoke...', () => {
        const getValue = () => 1;
        const soma = (a, b) => a + b;        

        cy.wrap({fun: getValue}).invoke('fun').should('be.eql', 1)
        cy.wrap({fun: soma}).invoke('fun', 2, 5).should('be.eql', 7)
    
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via ivoke')
        cy.window().invoke('alert', 'Da pra ver?')
        cy.get('#resultado')
            .invoke('html', '<input type="button" value="hacked!"/>')
    })

})