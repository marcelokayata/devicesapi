import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Device {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    state: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
