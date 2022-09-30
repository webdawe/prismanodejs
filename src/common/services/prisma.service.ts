import { PrismaClient } from '@prisma/client';
import { db } from "../db.client";
import { CRUD } from '../interfaces/crud.interface';
import { create } from 'domain';

export class PrismaService implements CRUD {
    db: PrismaClient = db;
    model: any;
    extraOptions: any
    constructor() {
        this.extraOptions = {}
    }
    async list(options: any) {
        const extraOptions = this.extraOptions
        options = {
            ... extraOptions,
            ... options
        }
        console.log(options)
        return this.model.findMany(options)
    }

    async create(resource: any) {
        return this.model.create({
            data:resource
        });
    }

    async update(id: number, resource: any) {
        return this.model.update({
            data: resource,
            where: {
                id: id
            }
        })
    }

    async show(id: number) {
        return this.model.findFirst({
            where: {
                id: id
            }
        })
    }

    async destroy(id: number) {
        this.model.delete({
            where: {
                id:id
            }
        })
    }
  }

  