describe('LiftCreateComponent', () => {
  beforeEach(() => {
    // Code to run before each test case
    cy.visit('http://localhost:4200/liftCreate')

  });

  it('should create a lift', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Lift Created');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('B1,B2');
    cy.get('input').eq(2).type('YourBrand'); // Example length
    cy.get('input').eq(3).type('YourModel');  // Example width
    cy.get('input').eq(4).type('B');  // Example width
    cy.get('input').eq(5).type('123');  // Example width
    cy.get('textarea').eq(0).type('YourDescription');

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/lift', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Lift Created',
      },
    }).as('createLift');

    // Debugging output
    cy.get('[data-cy="createLiftButton"]').should('be.visible').click();
  });

  it('should create a lift without description', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Lift Created');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('B1,B2');
    cy.get('input').eq(2).type('YourBrand'); // Example length
    cy.get('input').eq(3).type('YourModel');  // Example width
    cy.get('input').eq(4).type('B');  // Example width
    cy.get('input').eq(5).type('123');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/lift', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Lift Created',
      },
    }).as('createLift');

    // Debugging output
    cy.get('[data-cy="createLiftButton"]').should('be.visible').click();
  });

  it('should not create a lift without a code', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill the required options');
    });
    // Fill in form data
    cy.get('input').eq(1).type('B1,B2');
    cy.get('input').eq(2).type('YourBrand'); // Example length
    cy.get('input').eq(3).type('YourModel');  // Example width
    cy.get('input').eq(4).type('B');  // Example width
    cy.get('input').eq(5).type('123');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/lift', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Lift Created',
      },
    }).as('createLift');

    // Debugging output
    cy.get('[data-cy="createLiftButton"]').should('be.visible').click();
  });

  it('should not create a lift without floors', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill the required options');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(2).type('YourBrand'); // Example length
    cy.get('input').eq(3).type('YourModel');  // Example width
    cy.get('input').eq(4).type('B');  // Example width
    cy.get('input').eq(5).type('123');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/lift', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Lift Created',
      },
    }).as('createLift');

    // Debugging output
    cy.get('[data-cy="createLiftButton"]').should('be.visible').click();
  });

  it('should not create a lift without building code', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill the required options');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('B1,B2');
    cy.get('input').eq(2).type('YourBrand'); // Example length
    cy.get('input').eq(3).type('YourModel');  // Example width
    cy.get('input').eq(5).type('123');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/lift', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Lift Created',
      },
    }).as('createLift');

    // Debugging output
    cy.get('[data-cy="createLiftButton"]').should('be.visible').click();
  });

  it('should not create a lift due to an error', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Fail: Error');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('B1,B2');
    cy.get('input').eq(2).type('YourBrand'); // Example length
    cy.get('input').eq(3).type('YourModel');  // Example width
    cy.get('input').eq(4).type('B');  // Example width
    cy.get('input').eq(5).type('123');  // Example width
    cy.get('textarea').eq(0).type('YourDescription');

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/lift', {
      statusCode: 500,
      body: {
        success: false,
        message: 'Error',
      },
    }).as('createLift');

    // Debugging output
    cy.get('[data-cy="createLiftButton"]').should('be.visible').click();
  });

});