/// <reference types="cypress"/>

it.only('a external test...', () => {

})

describe('Should group tests', () => {
    describe('Should group more specific tests...', () => {
        it('A specific test... 1', () => {

        })
    })

    describe('Should group more specific tests...', () => {
        it('A specific test...2', () => {

        })
    })

    it('A internal test...', () =>{

    })
})