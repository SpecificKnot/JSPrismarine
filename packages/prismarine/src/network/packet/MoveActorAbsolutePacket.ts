import DataPacket from './DataPacket.js';
import Identifiers from '../Identifiers.js';
import type Vector3 from '../../math/Vector3.js';

export default class MoveActorAbsolutePacket extends DataPacket {
    public static NetID = Identifiers.MoveActorAbsolutePacket;

    public runtimeEntityId!: bigint;
    public flags!: number;

    public position!: Vector3;

    public rotationX!: number;
    public rotationY!: number;
    public rotationZ!: number;

    public encodePayload() {
        this.writeUnsignedVarLong(this.runtimeEntityId);
        this.writeByte(this.flags ?? 0);
        this.position.networkSerialize(this);
        this.writeByte(this.rotationX / (360 / 256));
        this.writeByte(this.rotationY / (360 / 256));
        this.writeByte(this.rotationZ / (360 / 256));
    }
}
