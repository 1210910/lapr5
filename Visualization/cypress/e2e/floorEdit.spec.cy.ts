describe('Floor Edit', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/floorEdit')
    });

    it('should edit a floor with all attributes', () => {
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Floor edited');
        });

        cy.get('input').eq(0).type('F1'); //code
        cy.get('input').eq(1).type('1');  //floorNumber
        cy.get('input').eq(2).type('15'); //length
        cy.get('input').eq(3).type('15'); //width
        cy.get('textarea').eq(0).type('Description');//description

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('PATCH', 'http://localhost:4000/api/floor/F1', {
            statusCode: 200,
            body: {
                success: true,
                message: 'Floor Edit',
            },
        }).as('editFloor');

        cy.get('[data-cy="editFloorButton"]').should('be.visible').click();
    });

    it('should not edit a floor if code not inserted', () => {
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Floor edition failed');
        });
        // Fill in form data

        cy.get('input').eq(1).type('1');
        cy.get('input').eq(2).type('15');
        cy.get('input').eq(3).type('15');
        cy.get('textarea').eq(0).type('Description');

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('PATCH', 'http://localhost:4000/api/floor/', {
            statusCode: 400,
            body: {
                success: true,
                message: 'Floor edited',
            },
        }).as('editFloor');

        // Debugging output
        cy.get('[data-cy="editFloorButton"]').should('be.visible').click();
    });

    it('should edit a floor if code and floorNumber inserted', () => {
        
        // Fill in form data
        cy.get('input').eq(0).type('F1'); //code
        cy.get('input').eq(1).type('1');  //floorNumber

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('PATCH', 'http://localhost:4000/api/floor/F1', {
            statusCode: 200,
            body: {
                success: true,
                message: 'Floor edited',
            },
        }).as('editFloor');

        // Debugging output
        cy.get('[data-cy="editFloorButton"]').should('be.visible').click();
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Floor edited');
        });
       
    });

    it('should edit a floor if code, floorNumber, lenght inserted', () => {
        
        // Fill in form data
        cy.get('input').eq(0).type('F1'); //code
        cy.get('input').eq(1).type('1');  //floorNumber
        cy.get('input').eq(2).type('15'); //length

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('PATCH', 'http://localhost:4000/api/floor/F1', {
            statusCode: 200,
            body: {
                success: true,
                message: 'Floor edited',
            },
        }).as('editFloor');

        // Debugging output
        cy.get('[data-cy="editFloorButton"]').should('be.visible').click();
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Floor edited');
        });
       
    });
   
    it('should edit a floor if only code, description inserted', () => {
        
        // Fill in form data
        cy.get('input').eq(0).type('F1'); //code
        cy.get('textarea').eq(0).type('Description');//description

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('PATCH', 'http://localhost:4000/api/floor/F1', {
            statusCode: 200,
            body: {
                success: true,
                message: 'Floor edited',
            },
        }).as('editFloor');

        // Debugging output
        cy.get('[data-cy="editFloorButton"]').should('be.visible').click();
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Floor edited');
        });
       
    });
   
    it('should edit a floor if code, length, width, description inserted', () => {
        
        // Fill in form data
        cy.get('input').eq(0).type('F1'); //code
        cy.get('input').eq(2).type('15'); //length
        cy.get('input').eq(3).type('15'); //width
        cy.get('textarea').eq(0).type('Description');//description

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('PATCH', 'http://localhost:4000/api/floor/F1', {
            statusCode: 200,
            body: {
                success: true,
                message: 'Floor edited',
            },
        }).as('editFloor');

        // Debugging output
        cy.get('[data-cy="editFloorButton"]').should('be.visible').click();
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Floor edited');
        });
       
    });
   


});