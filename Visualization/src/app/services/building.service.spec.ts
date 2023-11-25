import {BuildingService} from './building.service';
import {BuildingInfo} from "../Building/building-info/buildingInfo";

describe('BuildingService', () => {
    let service: BuildingService;
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
        service = new BuildingService();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should create a building with correct status 201', async () => {

        const mockXMLHttpRequest = prepareMockWithStatus(201, null);

        const resultPromise = service.createBuilding('code', 'name', 'description', 10, 20);

        // Simulate successful response
        const event = new ProgressEvent('load'); // Provide the required argument

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event); // Check if onload is not null before calling it
        }

        const result = await resultPromise; // Wait for the promise to resolve
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('POST', 'http://localhost:4000/api/buildings', true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(result).toBe(true);
    });


    it('should fail create a building with correct status 404', async () => {

        const mockXMLHttpRequest = prepareMockWithStatus(404, null);

        const resultPromise = service.createBuilding('B', 'name', 'description', 10, 20);

        // Simulate bad response
        const event = new ProgressEvent('load'); // Provide the required argument

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event); // Check if onload is not null before calling it
        }

        await expect(resultPromise).rejects.toEqual("test");
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('POST', 'http://localhost:4000/api/buildings', true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');

    });


    it('should list a building with correct status 200', async () => {

        const building1: BuildingInfo = {
            code: 'B',
            name: 'Office Building',
            description: 'A modern building',
            maxLength: 15,
            maxWidth: 15,
        };

        const building2: BuildingInfo = {
            code: 'C',
            name: 'Building of engineering',
            description: 'A tall tower',
            maxLength: 12,
            maxWidth: 12,
        };

        const mockBuildingList = [building1, building2];
        const mockXMLHttpRequest = prepareMockWithStatus(200, mockBuildingList);

        const resultPromise = service.listAllBuildings();

        // Simulate successful response
        const event = new ProgressEvent('load');

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event);
        }

        const result = await resultPromise; // Wait for the promise to resolve
        expect(result).toBe(mockBuildingList);
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('GET', 'http://localhost:4000/api/buildings', true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');

    });


    it('should fail list a building with status 400', async () => {

    const mockXMLHttpRequest = prepareMockWithStatus(400, null);

    const resultPromise = service.listAllBuildings();

    // Simulate successful response
    const event = new ProgressEvent('load');

    if (mockXMLHttpRequest.onload) {
      mockXMLHttpRequest.onload(event);
    }

    await expect(resultPromise).rejects.toEqual(false);
    expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('GET', 'http://localhost:4000/api/buildings', true);
    expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');

  });


    it('should listBuildings with correct status 200', async () => {

        const building1: BuildingInfo = {
            code: 'B',
            name: 'Office Building',
            description: 'A modern building',
            maxLength: 15,
            maxWidth: 15,
        };

        const building2: BuildingInfo = {
            code: 'C',
            name: 'Building of engineering',
            description: 'A tall tower',
            maxLength: 12,
            maxWidth: 12,
        };

        const mockBuildingList = [building1, building2];
        const mockXMLHttpRequest = prepareMockWithStatus(200, mockBuildingList);

        const resultPromise = service.listBuildings("B");

        // Simulate successful response
        const event = new ProgressEvent('load');

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event);
        }

        const result = await resultPromise; // Wait for the promise to resolve
        expect(result).toBe(mockBuildingList);
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('GET', 'http://localhost:4000/api/buildings/' + "B", true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');

    });

    it('should listBuildings fail with correct status 400', async () => {

        const building1: BuildingInfo = {
            code: 'B',
            name: 'Office Building',
            description: 'A modern building',
            maxLength: 15,
            maxWidth: 15,
        };

        const building2: BuildingInfo = {
            code: 'C',
            name: 'Building of engineering',
            description: 'A tall tower',
            maxLength: 12,
            maxWidth: 12,
        };

        const mockBuildingList = [building1, building2];
        const mockXMLHttpRequest = prepareMockWithStatus(400, mockBuildingList);

        const resultPromise = service.listBuildings("B");

        // Simulate successful response
        const event = new ProgressEvent('load');

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event);
        }

        await expect(resultPromise).rejects.toEqual(false);
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('GET', 'http://localhost:4000/api/buildings/' + "B", true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');

    });

    it('should editBuildings with correct status 200', async () => {

        const editedData = {
            code:"B",
            name: 'New Name',
            description: 'New Description',
            maxWidth: 25,
        };

        const mockXMLHttpRequest = prepareMockWithStatus(200, null);

        const resultPromise = service.editBuilding(editedData);

        // Simulate successful response
        const event = new ProgressEvent('load');

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event);
        }

        const result = await resultPromise; // Wait for the promise to resolve
        expect(result).toBe(true);
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('PATCH', 'http://localhost:4000/api/buildings/' + "B", true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');

    });

    it('should editBuildings fails with status 404', async () => {

        const editedData = {
            code:"B",
            name: 'New Name',
            description: 'New Description',
            maxWidth: 25,
        };

        const mockXMLHttpRequest = prepareMockWithStatus(404, null);

        const resultPromise = service.editBuilding(editedData);

        // Simulate successful response
        const event = new ProgressEvent('load');

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event);
        }

        await expect(resultPromise).rejects.toEqual("test");
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('PATCH', 'http://localhost:4000/api/buildings/' + "B", true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');

    });
});
