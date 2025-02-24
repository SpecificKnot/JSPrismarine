import { MessageIdentifiers } from '../MessageIdentifiers.js';
import OfflinePacket from '../OfflinePacket.js';

export default class IncompatibleProtocolVersion extends OfflinePacket {
    public constructor() {
        super(MessageIdentifiers.INCOMPATIBLE_PROTOCOL_VERSION);
    }

    public protocol!: number;
    public serverGUID!: bigint;

    public encodePayload(): void {
        this.writeByte(this.protocol);
        this.writeMagic();
        this.writeLong(this.serverGUID);
    }
}
