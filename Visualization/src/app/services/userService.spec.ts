import {UserService} from "./user.service";

describe('SignUpService', () => {
    let service: UserService;
    const prepareMockWithStatus = (status: number, response: any) => {
        const mockXMLHttpRequest: jest.Mocked<XMLHttpRequest> = {
            open: jest.fn(),
            setRequestHeader: jest.fn(),
            send: jest.fn(),
            onload: jest.fn(),
            status: status,
            response: response,
            responseText: '{"error":"test"}',
        } as any;

        jest.spyOn(global, 'XMLHttpRequest').mockImplementation(() => mockXMLHttpRequest);

        return mockXMLHttpRequest;
    };

    beforeEach(() => {
        service = new UserService();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should create a user account with correct status 201', async () => {

        const mockXMLHttpRequest = prepareMockWithStatus(201, null);

        const resultPromise = service.createUser('firstName', 'lastName', 'email@isep.ipp.pt', 910421512, 269685863, 'P@ssword12', "Utente");

        // Simulate successful response
        const event = new ProgressEvent('load'); // Provide the required argument

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event); // Check if onload is not null before calling it
        }

        const result = await resultPromise; // Wait for the promise to resolve
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('POST', 'http://localhost:4000/api/auth/signup', true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(result).toBe(true);
    });
    it('should create a user account fail with status 404', async () => {

        const mockXMLHttpRequest = prepareMockWithStatus(404, "test");

        const resultPromise = service.createUser('firstName', 'lastName', 'email@isep.ipp.pt', 910421512, 269685863, 'P@ssword12', "Utente");

        // Simulate successful response
        const event = new ProgressEvent('load'); // Provide the required argument

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event); // Check if onload is not null before calling it
        }

        await expect(resultPromise).rejects.toEqual("test");
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('POST', 'http://localhost:4000/api/auth/signup', true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    });
});