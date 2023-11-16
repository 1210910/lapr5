import {Service, Inject} from "typedi";
import config from "../../config";
import {FloorMap} from "../domain/floorMap";
import IFloorMapDTO from "../dto/IFloorMapDTO";
import IFloorMapRepo from "../services/IRepos/IFloorMapRepo";
import IFloorRepo from "../services/IRepos/IFloorRepo";
import IRoomRepo from "./IRepos/IRoomRepo";
import ILiftRepo from "./IRepos/ILiftRepo";
import IFloorMapService from "./IServices/IFloorMapService";
import {Result} from "../core/logic/Result";
import { FloorMapMap } from "../mappers/floorMapMap";
import fs from "fs";




@Service()
export default class FloorMapService implements IFloorMapService {

    constructor(@Inject(config.repos.floorMap.name) private floorMapRepo : IFloorMapRepo,
                @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,


    ) {}

    public async createFloorMap(floorCode :string, file:any) : Promise<Result<IFloorMapDTO>> {

        try {


            const floorExists = await this.floorRepo.existsByFloorCode(floorCode);

            if (!floorExists) {
                return Result.fail<IFloorMapDTO>("Floor not found");
            }

            let fileContent: { maze: any; ground: any; wall: any; player: any; };

            await readJSONFile(file.path).then((content) => {
                console.log(content)
                fileContent = content;
            }).catch((error) => {
                return Result.fail<IFloorMapDTO>(error);
            }
            );






            const floorProps = {
                floorCode: floorCode,
                maze: fileContent.maze,
                ground: fileContent.ground,
                wall: fileContent.wall,
                player: fileContent.player
            }

            console.log(floorProps)

            const floorMapOrError = FloorMap.create(floorProps);

            console.log(floorMapOrError)

            if (floorMapOrError.isFailure) {
                return Result.fail<IFloorMapDTO>("floorMapOrError.errorValue()");
            }

            const floorMapResult = floorMapOrError.getValue();

            await this.floorMapRepo.save(floorMapResult);


          console.log(floorMapResult)
            const floorMapDTOResult = FloorMapMap.toDTO(floorMapResult) as IFloorMapDTO;
          console.log(floorMapDTOResult)
            return Result.ok<IFloorMapDTO>(floorMapDTOResult);
        }catch (e) {
            throw e;
        }

    }





}
function readJSONFile(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {

        fs.readFile(filePath, 'ascii', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {

                    const jsonData = JSON.parse(data);

                    resolve(jsonData);
                } catch (error) {

                    reject(error);
                }
            }
        });
    });
}
