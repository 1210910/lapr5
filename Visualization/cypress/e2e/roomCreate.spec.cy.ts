describe('RoomCreateComponent', () => {
    beforeEach(() => {
        // Code to run before each test case
        cy.visit('http://localhost:4200/roomCreate')

    });

    it('should create a room', () => {
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Room Created');
        });
        // Fill in form data
        cy.get('input').eq(0).type('YourCode');
        cy.get('input').eq(1).type('YourName');
        cy.get('textarea').eq(0).type('YourDescription');
        cy.get('input').eq(2).type('10'); 
        cy.get('input').eq(3).type('5'); 
        cy.get('select').type('amphitheater');

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('POST', 'http://localhost:4000/api/room', {
            statusCode: 201,
            body: {
                success: true,
                message: 'Room created successfully',
            },
        }).as('createBuilding');

        // Debugging output

        cy.get('[data-cy="roomCreateButton"]').should('be.visible').click();

    });

    it('should not create a room with only 1 field', () => {
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Please fill in all fields');
        });
        // Fill in form data
        cy.get('input').eq(2).type('10'); 
        cy.get('input').eq(3).type('5');  

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('POST', 'http://localhost:4000/api/room', {
            statusCode: 400,
            body: {
                success: false,
                message: 'Room Creation Fail',
            },
        }).as('createRoom');


        // Debugging output
        cy.log('Before attempting to find the button');
        cy.get('[data-cy="roomCreateButton"]').should('be.visible').click();
        cy.log('After attempting to find and click the button');


    });


    it('should not create a room with only 2 field', () => {
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Please fill in all fields');
        });
        // Fill in form data
        cy.get('input').eq(1).type(' ');
        cy.get('textarea').eq(0).type(' ');
        cy.get('input').eq(2).type(' ');
        cy.get('input').eq(3).type('5');

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('POST', 'http://localhost:4000/api/room', {
            statusCode: 400,
            body: {
                success: false,
                message: 'Room created Failed',
            },
        }).as('createRoom');


        // Debugging output
        cy.log('Before attempting to find the button');
        cy.get('[data-cy="roomCreateButton"]').should('be.visible').click();
        cy.log('After attempting to find and click the button');


    });

    it('should not create a room with only 3 field', () => {
        cy.on('window:alert', (alertMessage) => {
            // Check the alert message
            expect(alertMessage).to.equal('Please fill in all fields');
        });
        // Fill in form data

        cy.get('textarea').eq(0).type('test');
        cy.get('input').eq(2).type('10');
        cy.get('input').eq(3).type('5'); 

        // Intercept the HTTP request and stub it with a success response
        cy.intercept('POST', 'http://localhost:4000/api/room', {
            statusCode: 201,
            body: {
                success: true,
                message: 'Building created successfully',
            },
        }).as('createRoom');


        // Debugging output
        cy.log('Before attempting to find the button');
        cy.get('[data-cy="roomCreateButton"]').should('be.visible').click();
        cy.log('After attempting to find and click the button');

    });
});