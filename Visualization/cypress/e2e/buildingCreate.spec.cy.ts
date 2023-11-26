describe('BuildingCreateComponent', () => {
  beforeEach(() => {
    // Code to run before each test case
    cy.visit('http://localhost:4200/buildingCreate')

  });

  it('should create a building', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Building Created');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('YourName');
    cy.get('textarea').eq(0).type('YourDescription');
    cy.get('input').eq(2).type('10'); 
    cy.get('input').eq(3).type('5');

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/buildings', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Building created successfully',
      },
    }).as('createBuilding');

    // Debugging output
    
    cy.get('[data-cy="createBuildingButton"]').should('be.visible').click();

    cy.wait('@createBuilding');


  });

  it('should not create a building with only 1 field', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill in all fields');
    });
    // Fill in form data
    cy.get('input').eq(3).type('5');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/buildings', {
      statusCode: 400,
      body: {
        success: false,
        message: 'Building created fail',
      },
    }).as('createBuilding');


    // Debugging output
    cy.log('Before attempting to find the button');
    cy.get('[data-cy="createBuildingButton"]').should('be.visible').click();
    cy.log('After attempting to find and click the button');


  });


  it('should not create a building with only 2 field', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill in all fields');
    });
    // Fill in form data
   
    cy.get('input').eq(2).type('10'); // Example length
    cy.get('input').eq(3).type('5');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/buildings', {
      statusCode: 400,
      body: {
        success: false,
        message: 'Building created successfully',
      },
    }).as('createBuilding');


    // Debugging output
    cy.log('Before attempting to find the button');
    cy.get('[data-cy="createBuildingButton"]').should('be.visible').click();
    cy.log('After attempting to find and click the button');


  });

  it('should not create a building with only 3 field', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill in all fields');
    });
    // Fill in form data

    cy.get('textarea').eq(0).type('test'); // Example decription
    cy.get('input').eq(2).type('10'); // Example length
    cy.get('input').eq(3).type('5');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/buildings', {
      statusCode: 400,
      body: {
        success: false,
        message: 'Building created successfully',
      },
    }).as('createBuilding');


    // Debugging output
    cy.log('Before attempting to find the button');
    cy.get('[data-cy="createBuildingButton"]').should('be.visible').click();
    cy.log('After attempting to find and click the button');

  });
});