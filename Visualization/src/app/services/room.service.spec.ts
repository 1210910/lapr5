import {RoomService} from "./room.service";

describe('RoomService', () => {
    let service: RoomService;
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
        service = new RoomService();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should create a room with correct status 201', async () => {

        const mockXMLHttpRequest = prepareMockWithStatus(201, null);

        const resultPromise = service.createRoom('R', 'F1', 'description', 10, 20, "Amphitheatre");

        // Simulate successful response
        const event = new ProgressEvent('load'); // Provide the required argument

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event); // Check if onload is not null before calling it
        }

        const result = await resultPromise; // Wait for the promise to resolve
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('POST', 'http://localhost:4000/api/room/F1', true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(result).toBe(true);
    });
    it('should create a room fail with status 404', async () => {

        const mockXMLHttpRequest = prepareMockWithStatus(404, "test");

        const resultPromise = service.createRoom('R1', 'F2', 'description', 10, 20, "Amphitheatre");

        // Simulate successful response
        const event = new ProgressEvent('load'); // Provide the required argument

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event); // Check if onload is not null before calling it
        }

        await expect(resultPromise).rejects.toEqual("test");
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('POST', 'http://localhost:4000/api/room/F2', true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    });
});