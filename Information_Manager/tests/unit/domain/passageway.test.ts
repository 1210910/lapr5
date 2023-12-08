import assert from "assert";
import { Passageway } from "../../../src/domain/passageway/Passageway";
import { Description } from "../../../src/domain/valueObjects/Description";

describe("Passageway Test", () => {

  it("should create a valid passageway when all parameters are valid", () => {
    const passagewayDTO = {
      floor1: "A1",
      floor2: "B1",
      description: "Passagem entre os andares A1 e B1"
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    assert(passagewayOrError.isSuccess);
  });

  it("should not create a passageway when the floor1 is null", () => {
    const passagewayDTO = {
      floor1: null,
      floor2: "B1",
      description: "Passagem entre os andares A1 e B1"
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    assert(passagewayOrError.isFailure);
  });

  it("should not create a passageway when the floor1 is undefined", () => {
    const passagewayDTO = {
      floor1: undefined,
      floor2: "B1",
      description: "Passagem entre os andares A1 e B1"
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    assert(passagewayOrError.isFailure);
  });

  it("should not create a passageway when the floor2 is null", () => {
    const passagewayDTO = {
      floor1: "A1",
      floor2: null,
      description: "Passagem entre os andares A1 e B1"
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    assert(passagewayOrError.isFailure);
  });

  it("should not create a passageway when the floor2 is undefined", () => {
    const passagewayDTO = {
      floor1: "A1",
      floor2: undefined,
      description: "Passagem entre os andares A1 e B1"
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    assert(passagewayOrError.isFailure);
  });

  it("should not create a passageway when the description is null", () => {
    const passagewayDTO = {
      floor1: "A1",
      floor2: "B1",
      description: null
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    assert(passagewayOrError.isFailure);
  });

  it("should not create a passageway when the description is undefined", () => {
    const passagewayDTO = {
      floor1: "A1",
      floor2: "B1",
      description: undefined
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    assert(passagewayOrError.isFailure);
  });

  it("should not create a passageway when the description has more than 255 characters", () => {
    const passagewayDTO = {
      floor1: "A1",
      floor2: "B1",
      description: "Lorem ipsum dolor sit amet, " +
        "consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste " +
        "natus error sit voluptatem accusantium doloremque laudantium, " +
        "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis " +
        "et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim " +
        "ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, " +
        "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi " +
        "nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit " +
        "amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora" +
        " incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    assert(passagewayOrError.isFailure);
  });

  it("created passagewayCode should equal introduced code when passageway is valid", () => {

    const passagewayDTO = {
      floor1: "A1",
      floor2: "B1",
      description: "Passageway between floors A1 and B1"
    };

    const passagewayOrError = Passageway.create(passagewayDTO);
    assert(passagewayOrError.getValue().passageCode.value === "A1-B1");
  });

  it("created passageway should equal introduced floor when passageway is valid", () => {

    const passagewayDTO = {
      floor1: "A1",
      floor2: "B1",
      description: "Passageway between floors A1 and B1"
    };

    const passagewayOrError = Passageway.create(passagewayDTO);

    assert(passagewayOrError.getValue().floor1.value === passagewayDTO.floor1);
  });

  it("created passageway should equal introduced floor when passageway is valid", () => {

    const passagewayDTO = {
      floor1: "A1",
      floor2: "B1",
      description: "Passageway between floors A1 and B1"
    };

    const passagewayOrError = Passageway.create(passagewayDTO);

    assert(passagewayOrError.getValue().floor2.value === passagewayDTO.floor2);
  });

  it("created passageway should equal introduced description when passageway is valid", () => {

    const passagewayDTO = {
      floor1: "A1",
      floor2: "B1",
      description: "Passageway between floors A1 and B1"
    };

    const passagewayOrError = Passageway.create(passagewayDTO);

    assert(passagewayOrError.getValue().description.value === passagewayDTO.description);
  });

  it("created passageway should equal introduced domainID when passageway is valid", () => {

    const passagewayDTO = {
      floor1: "A1",
      floor2: "B1",
      description: "Passageway between floors A1 and B1"
    };

    const passagewayOrError = Passageway.create(passagewayDTO);

    assert(passagewayOrError.getValue().id !== null);
  });

  it("should edit a passageway when all the parameters are valid", () => {
    const passagewayDTO = {
      floor1: "A1",
      floor2: "B1",
      description: "Passagem entre os andares A1 e B1"
    };

    const passagewayOrError = Passageway.create(passagewayDTO);
    const passageway = passagewayOrError.getValue();

    const passagewayDTO2 = {
      floor1: "A2",
      floor2: "B2",
      description: "Passagem entre os andares A2 e B2"
    };

    const passagewayOrError2 = Passageway.update(passagewayDTO2, passageway);


    assert(passagewayOrError2.isSuccess);

  });

  it("should not edit a passageway when the floor1 is null", () => {
    const passagewayDTO = {
      floor1: "A2",
      floor2: "B2",
      description: "Passagem entre os andares A2 e B2"
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    const passageway = passagewayOrError.getValue();

    const passagewayDTO2 = {
      floor1: null
    };

    const passagewayOrError2 = Passageway.update(passagewayDTO2, passageway);
    assert(passagewayOrError2.isFailure);
    assert(passageway.floor1 !== null);
  });

  it("should not edit a passageway when the floor1 is undefined", () => {
    const passagewayDTO = {
      floor1: "A2",
      floor2: "B2",
      description: "Passagem entre os andares A2 e B2"
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    const passageway = passagewayOrError.getValue();

    const passagewayDTO2 = {
      floor1: undefined
    };

    const passagewayOrError2 = Passageway.update(passagewayDTO2, passageway);
    assert(passagewayOrError2.isFailure);
    assert(passageway.floor1 !== undefined);
  });

  it("should not edit a passageway when the floor2 is null", () => {
    const passagewayDTO = {
      floor1: "A2",
      floor2: "B2",
      description: "Passagem entre os andares A2 e B2"
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    const passageway = passagewayOrError.getValue();

    const passagewayDTO2 = {
      floor2: null
    };

    const passagewayOrError2 = Passageway.update(passagewayDTO2, passageway);
    assert(passagewayOrError2.isFailure);
    assert(passageway.floor2 !== null);
  });

  it("should not edit a passageway when the floor2 is undefined", () => {
    const passagewayDTO = {
      floor1: "A2",
      floor2: "B2",
      description: "Passagem entre os andares A2 e B2"
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    const passageway = passagewayOrError.getValue();

    const passagewayDTO2 = {
      floor2: undefined
    };

    const passagewayOrError2 = Passageway.update(passagewayDTO2, passageway);
    assert(passagewayOrError2.isFailure);
    assert(passageway.floor2 !== undefined);
  });

  it("should not edit a passageway when the description is null", () => {
    const passagewayDTO = {
      floor1: "A2",
      floor2: "B2",
      description: "Passagem entre os andares A2 e B2"
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    const passageway = passagewayOrError.getValue();

    const passagewayDTO2 = {
      description: null
    };

    const passagewayOrError2 = Passageway.update(passagewayDTO2, passageway);
    assert(passagewayOrError2.isFailure);
    assert(passageway.description !== null);
  });

  it("should not edit a passageway when the description is undefined", () => {
    const passagewayDTO = {
      floor1: "A2",
      floor2: "B2",
      description: "Passagem entre os andares A2 e B2"
    };
    const passagewayOrError = Passageway.create(passagewayDTO);
    const passageway = passagewayOrError.getValue();

    const passagewayDTO2 = {
      description: undefined
    };

    const passagewayOrError2 = Passageway.update(passagewayDTO2, passageway);
    assert(passagewayOrError2.isFailure);
    assert(passageway.description !== undefined);
  });

  it("should not edit a passageway when the description has more than 250 characters", () => {
    const passagewayDTO = {
      floor1: "A2",
      floor2: "B2",
      description: "Passagem entre os andares A2 e B2"
    };

    const passagewayOrError = Passageway.create(passagewayDTO);
    const passageway = passagewayOrError.getValue();

    try {
      passageway.description = Description.valueOf("a".repeat(251));
    } catch (e) {
      assert(e.message === "Description must be 250 characters or less");
    }
  });
});


