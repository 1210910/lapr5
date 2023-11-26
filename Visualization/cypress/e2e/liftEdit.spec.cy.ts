describe('Lift Edit', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/liftEdit')
    });

    it('should edit a lift with all attributes', () => {
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Lift edited successfully');
        });

        cy.get('input').eq(0).type('LC1'); //code
        cy.get('input').eq(2).type('C1,C2,C3'); //floors[]
        cy.get('input').eq(3).type('brannd'); //brand
        cy.get('input').eq(4).type('model');//model
        cy.get('input').eq(4).type('C');//buildingCode
        cy.get('textarea').eq(0).type('Description');//description

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('PATCH', 'http://localhost:4000/api/lift/L1', {
            statusCode: 200,
            body: {
                success: true,
                message: 'Lift edited successfully',
            },
        }).as('editFloor');

        cy.get('[data-cy="editLiftButton"]').should('be.visible').click();
    });

    it('should edit a lift without description', () => {
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Lift edited successfully');
        });

        cy.get('input').eq(0).type('LC1'); //code
        cy.get('input').eq(2).type('C1,C2,C3'); //floors[]
        cy.get('input').eq(3).type('brannd'); //brand
        cy.get('input').eq(4).type('model');//model
        cy.get('input').eq(4).type('C');//buildingCode

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('PATCH', 'http://localhost:4000/api/lift/L1', {
            statusCode: 200,
            body: {
                success: true,
                message: 'Lift edited successfully',
            },
        }).as('editFloor');

        cy.get('[data-cy="editLiftButton"]').should('be.visible').click();
    });

    it('should edit a lift without brand and model', () => {
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Lift edited successfully');
        });

        cy.get('input').eq(0).type('LC1'); //code
        cy.get('input').eq(2).type('C1,C2,C3'); //floors[]
        cy.get('input').eq(4).type('C');//buildingCode

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('PATCH', 'http://localhost:4000/api/lift/L1', {
            statusCode: 200,
            body: {
                success: true,
                message: 'Lift edited successfully',
            },
        }).as('editFloor');

        cy.get('[data-cy="editLiftButton"]').should('be.visible').click();
    });

});