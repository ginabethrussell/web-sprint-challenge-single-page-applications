// write tests here
describe('Quotes App Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:1234/');
    }) ;
     //helpers to select elements

     const textInput = () => cy.get('input[name=text]');
     const submitBtn = () => cy.get('button[id=submitBtn]');
     const authorInput = () => cy.get('input[name=author]');
     const cancelBtn = () => cy.get('button[id=cancelBtn]');
     const madeUpBtn = () => cy.get('button[id=fakeBtn]');

    // it('should do some basic math', () => {
    //     expect(1 + 1).to.equal(2);
    //     expect(1 + 2).not.to.equal(4);
    //     expect({}).not.to.equal({}); //===
    //     expect({}).to.eql({}); //==
    // })

    it('should display the expected elements', () => {
        textInput().should('exist');
        submitBtn().should('exist');
        authorInput().should('exist');
        cancelBtn().should('exist');
        madeUpBtn().should('not.exist');

        cy.contains('Submit Quote').should('exist');
        cy.contains(/submit quote/i).should('exist');
    });

    describe('filling out inputs and canceling', () => {
        it('can get to the correct url',()=>{
            cy.url().should('include','localhost');
        })
        it('submit button should be disabled on initial load',()=>{
            submitBtn().should('be.disabled');
        })
        it('should type stuff in the inputs',()=>{
            textInput()
                .should('have.value', '')
                .type('Hi how are you')
                .should('have.value', "Hi how are you");
            authorInput()
                .should('have.value', '')
                .type('this is for the author')
                .should('have.value', "this is for the author");

        });
        it('should enable submit with both inputs filled',()=>{
            textInput()
                .type('Hi how are you');
            authorInput()
                .type('this is for the author');
            submitBtn().should('not.be.disabled');   
        });
        it('should cancel the values in the input when clicking cancel',()=>{
            textInput()
                .type('This is a test');
            // authorInput()
            //     .type('Gina Russell');
            // cancelBtn().click();
            // textInput()
            // .should('have.value', '')
            // authorInput()
            // .should('have.value', '')
            // submitBtn().should('be.disabled');
        });
    });

    describe('Adding quotes', () => {
        it('can submit and delete a quote', () => {
            textInput()
                .type('This is a test');
            authorInput()
                .type('Gina Russell');
            submitBtn().click();

            cy.contains('Gina Russell').next().next().click();
            cy.contains('Gina Russell').should('not.exist');
        });
    });
    describe('Editing quotes', () => {
        it('can edit a quote', () => {
            textInput()
                .type('This is a test');
            authorInput()
                .type('Gina Russell');
            submitBtn().click();

            cy.contains('Gina Russell').siblings('button:nth-of-type(1)').click();
            textInput().should('have.value', 'This is a test');
            authorInput().should('have.value', 'Gina Russell');

            textInput().clear().type('I am cool');
            authorInput().clear().type('Very much so');
            submitBtn().click();
            cy.contains('I am cool').next().next().click();
            cy.should('not.exist');
    
        });
    });
});