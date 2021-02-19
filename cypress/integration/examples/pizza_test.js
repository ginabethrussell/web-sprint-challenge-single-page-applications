// write tests here
describe('Pizza Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza');
    }) ;
  

    const textInput = () => cy.get('input[name=text]');
    
    it('can get to the correct url',()=>{
            cy.url().should('include','/pizza');
        });
       
    it('should type name into name, check checkboxes, submit pizza',()=>{
            cy.get('[data-cy=name]')
                .should('have.value', '')
                .type('sample name')
                .should('have.value', "sample name");

            cy.get('[data-cy=pepperoni]')
            .check()
            .should('be.checked')

            cy.get('[data-cy=sausage]')
            .check()
            .should('be.checked')

            cy.get('[data-cy=mushrooms]')
            .check()
            .should('be.checked')

            cy.get('[data-cy=onions]')
            .check()
            .should('be.checked')

            cy.get('[data-cy=submitBtn')
            .click()

});  
})  