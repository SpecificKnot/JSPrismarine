import Player from '../../player/Player';
import Command from '../Command';
import CommandParameter, {
    CommandParameterType
} from '../../network/type/CommandParameter';
import ChatEvent from '../../events/chat/ChatEvent';
import Chat from '../../chat/Chat';

export default class DeopCommand extends Command {
    constructor() {
        super({
            id: 'minecraft:deop',
            description: 'Remove player op status',
            permission: 'minecraft.command.op'
        } as any);

        this.parameters = [new Set()];

        this.parameters[0].add(
            new CommandParameter({
                name: 'target',
                type: CommandParameterType.Target,
                optional: true
            })
        );
    }

    execute(sender: Player, args: Array<any>) {
        if (args.length <= 0) {
            const event = new ChatEvent(
                new Chat(
                    sender,
                    '§cYou need to specify a player',
                    `*.player.${sender.getUsername()}`
                )
            );
            sender.getServer().getEventManager().emit('chat', event);
            return;
        } else {
            const target = sender.getServer().getPlayerByName(args[0]);
            sender.getServer().getPermissionManager().setOp(args[0], false);

            if (target) {
                const event = new ChatEvent(
                    new Chat(
                        sender,
                        '§eYou are no longer op!',
                        `*.player.${target.getUsername()}`
                    )
                );
                sender.getServer().getEventManager().emit('chat', event);
            }
        }

        return `Made ${
            args[0] || sender.getUsername()
        } no longer a server operator`;
    }
}
