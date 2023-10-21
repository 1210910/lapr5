import { Service, Inject } from 'typedi';

import IPassagemRepo from "../services/IRepos/IPassagemRepo";
import { Passagem } from "../domain/Passagem";
import { PassagemMap } from "../mappers/PassagemMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPassagemPersistence } from '../dataschema/IPassagemPersistence';

@Service()
export default class PassagemRepo implements IPassagemRepo {

    private models: any;

    constructor(
        @Inject('passagemSchema') private passagemSchema: Model<IPassagemPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(passagem: Passagem): Promise<boolean> {
        const idX = passagem.id.toString();

        const query = { domainId: idX };
        const passagemDocument = await this.passagemSchema.findOne(query as FilterQuery<IPassagemPersistence & Document>);

        return !!passagemDocument === true;
    }

    public async save(passagem: Passagem): Promise<Passagem> {
        const query = { domainId: passagem.id.toString() };

        const passagemDocument = await this.passagemSchema.findOne(query);

        try {
            if (passagemDocument === null) {
                const rawPassagem: any = PassagemMap.toPersistence(passagem);

                const passagemCreated = await this.passagemSchema.create(rawPassagem);

                return PassagemMap.toDomain(passagemCreated);
            } else {
                passagemDocument.piso1 = passagem.piso1;
                passagemDocument.piso2 = passagem.piso2;
                await passagemDocument.save();

                return passagem;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findAll(): Promise<Passagem[]> {
        const passagemRecord = await this.passagemSchema.find();

        return passagemRecord.map((item) => {
            return PassagemMap.toDomain(item);
        });
    }

}