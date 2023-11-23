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
import path from "path";
import {floor} from "lodash";




@Service()
export default class FloorMapService implements IFloorMapService {

    constructor(@Inject(config.repos.floorMap.name) private floorMapRepo : IFloorMapRepo,
                @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,


    ) {}

    public async getFloorMaps(){
      try{
        const floorMaps = await this.floorMapRepo.findAll();


        if(floorMaps.isFailure){
          return Result.fail<Array<String>>("no floor founds")
        }

        const  floorMapsMocks :any[] = []



        for (let i=0; i <floorMaps.getValue().length;i++){
          const maze= floorMaps.getValue()[i].maze.map;
          const exits = floorMaps.getValue()[i].maze.exits;
          const elevator = floorMaps.getValue()[i].maze.elevators;
          const mockDto={
            floorCode:floorMaps.getValue()[i].floorCode,
            maze: maze,
            exits:exits,
            elevator:elevator
          }
          floorMapsMocks.push(mockDto)
        }

       return Result.ok<Array<any>>(floorMapsMocks)
      }catch (e){
        throw  (e)
      }
    }
    public async getFloorMap(floorCode :string) : Promise<Result<String>> {
        try {
            const floorMap = await this.floorMapRepo.findByFloorCode(floorCode);

            if (floorMap.isFailure) {
                return Result.fail<String>("FloorMap not found");
            }


            const maze = floorMap.getValue().maze;
            const ground = floorMap.getValue().ground;
            const wall = floorMap.getValue().wall;
            const player = floorMap.getValue().player;

            const combinedJSON = {
                maze: maze,
                ground: ground,
                wall: wall,
                player: player
            };

            const jsonString = JSON.stringify(combinedJSON);



            const dirPath =path.join(__dirname,'..' ,'..', '..', 'Visualization', 'src', 'assets', 'mazes');



            let fileName = floorCode + '.json';



            fs.writeFile( path.join(dirPath, fileName), jsonString, (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON data is saved.");
            }   );

            const relativePath = path.join('.','..','..','assets', 'mazes', fileName);


            const floorMapDTO = FloorMapMap.toDTO(floorMap.getValue()) as IFloorMapDTO;

            return Result.ok<String>(relativePath);
        }
        catch (e) {
            throw e;
        }
    }

    public async createFloorMap(floorCode :string, file:any) : Promise<Result<IFloorMapDTO>> {

        try {


            const floorExists = await this.floorRepo.existsByFloorCode(floorCode);

            if (!floorExists) {
                return Result.fail<IFloorMapDTO>("Floor not found");
            }

            let fileContent: { maze: any; ground: any; wall: any; player: any; };

            await readJSONFile(file.path).then((content) => {
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


            const floorMapOrError = FloorMap.create(floorProps);

            if (floorMapOrError.isFailure) {
                return Result.fail<IFloorMapDTO>("floorMapOrError.errorValue()");
            }

            const floorMapResult = floorMapOrError.getValue();

            await this.floorMapRepo.save(floorMapResult);



            const floorMapDTOResult = FloorMapMap.toDTO(floorMapResult) as IFloorMapDTO;

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
