import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Device {
    @Prop({ required: true })
    name: string;

    @Prop()
    brand: string;

    @Prop({ required: true })
    state: string;

    @Prop({ default: () => new Date(), immutable: true })
    creation_time: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
