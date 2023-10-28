import  assert  from "assert";
import { Room } from "../../../src/domain/Room";


describe("Room test", () => {

    it("should create a valid room when all parameters are valid", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "This is a test room",
            width: 10,
            length: 10,
            roomType: "classroom"
        };

        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isSuccess);
    });

    it("shouldn't create a valid room when room code is null", () => {


        const roomDto = {
            roomCode: null,
            floor: "1",
            description: "This is a test room",
            width: 10,
            length: 10,
            roomType: "classroom"
        };

        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);
    }
    );


    it("shouldn't create a valid room when room code is longer than 50 characters", () => {


        const roomDto = {
            roomCode: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            floor: "1",
            description: "This is a test room",
            width: 10,
            length: 10,
            roomType: "classroom"
        };


        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);
    }
    );


    it("shouldn't create a valid room when floor is null", () => {

        const roomDto = {
            roomCode: "A101",
            floor: null,
            description: "This is a test room",
            width: 10,
            length: 10,
            roomType: "classroom"
        };

        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);

    }
    );


    it("shouldn't create a valid room when description is null", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: null,
            width: 10,
            length: 10,
            roomType: "classroom"
        };

        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);

    }
    );


    it("shouldn't create a valid room when description is longer than 250 characters", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "Lorem ipsum dolor sit amet, " +
                "consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste " +
                "natus error sit voluptatem accusantium doloremque laudantium, " +
                "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis " +
                "et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim " +
                "ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, " +
                "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi " +
                "nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit " +
                "amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora" +
                " incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
            width: 10,
            length: 10,
            roomType: "classroom"
        };


        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);

    }
    );

    it("shouldn't create a valid room when width is null", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "This is a test room",
            width: null,
            length: 10,
            roomType: "classroom"
        };

        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);

    }
    );

    it("shouldn't create a valid room when width is less than 0", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "This is a test room",
            width: -1,
            length: 10,
            roomType: "classroom"
        };

        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);

    }
    );


    it("shouldn't create a valid room when length is null", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "This is a test room",
            width: 10,
            length: null,
            roomType: "classroom"
        };

        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);

    }
    );

    it("shouldn't create a valid room when length is less than 0", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "This is a test room",
            width: 10,
            length: -1,
            roomType: "classroom"
        };

        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);

    }
    );


    it("shouldn't create a valid room when room type is null", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "This is a test room",
            width: 10,
            length: 10,
            roomType: null
        };

        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);

    }
    );


    it("shouldn't create a valid room when room type is not classroom, laboratory, anphitheater, office or other", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "This is a test room",
            width: 10,
            length: 10,
            roomType: "invalid"
        };

        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);

    }
    );

    it ("shouldn't create a valid room when room type is null", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "This is a test room",
            width: 10,
            length: 10,
            roomType: null
        };

        const roomOrError = Room.create(roomDto);

        assert(roomOrError.isFailure);
    }
    );

    //check if room is created with the correct values

    it("valid created room should return same roomCode", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "This is a test room",
            width: 10,
            length: 10,
            roomType: "classroom"
        };

        const roomOrError = Room.create(roomDto);

        const room = roomOrError.getValue();

        assert(room.roomCode == roomDto.roomCode);
    }
    );

    // check if id is valid

it("valid created room should have valid id", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "This is a test room",
            width: 10,
            length: 10,
            roomType: "classroom"
        };

        const roomOrError = Room.create(roomDto);

        const room = roomOrError.getValue();

        assert(room.id != null);
    }
    );


it ("valid created room should have valid floor", () => {

    const roomDto = {
        roomCode: "A101",
        floor: "1",
        description: "This is a test room",
        width: 10,
        length: 10,
        roomType: "classroom"
    };

    const roomOrError = Room.create(roomDto);

    const room = roomOrError.getValue();

    assert(room.floor == roomDto.floor);

}
);


it ("valid created room should have valid description", () => {

    const roomDto = {
        roomCode: "A101",
        floor: "1",
        description: "This is a test room",
        width: 10,
        length: 10,
        roomType: "classroom"
    };

    const roomOrError = Room.create(roomDto);

    const room = roomOrError.getValue();

    assert(room.description == roomDto.description);

}
);

it ("valid created room should have valid width", () => {

        const roomDto = {
            roomCode: "A101",
            floor: "1",
            description: "This is a test room",
            width: 10,
            length: 10,
            roomType: "classroom"
        };

        const roomOrError = Room.create(roomDto);

        const room = roomOrError.getValue();

        assert(room.width == roomDto.width);

}
);


it ("valid created room should have valid length", () => {

    const roomDto = {
        roomCode: "A101",
        floor: "1",
        description: "This is a test room",
        width: 10,
        length: 10,
        roomType: "classroom"
    };

    const roomOrError = Room.create(roomDto);

    const room = roomOrError.getValue();

    assert(room.length == roomDto.length);

}
);

it ("valid created room should have valid roomType", () => {

    const roomDto = {
        roomCode: "A101",
        floor: "1",
        description: "This is a test room",
        width: 10,
        length: 10,
        roomType: "classroom"
    };

    const roomOrError = Room.create(roomDto);

    const room = roomOrError.getValue();

    assert(room.roomType == roomDto.roomType);

}
);





});
