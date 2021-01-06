/* eslint-disable promise/prefer-await-to-then */
import {
    CommandDispatcher,
    argument,
    literal,
    greedyString
} from '@jsprismarine/brigadier';
import Command from '../Command';
import Player from '../../player/Player';
import Chat from '../../chat/Chat';
import ChatEvent from '../../events/chat/ChatEvent';

export default class MeCommand extends Command {
    constructor() {
        super({
            id: 'minecraft:me',
            description: 'Displays custom message in chat.',
            permission: 'minecraft.command.me'
        });
    }

    public async register(dispatcher: CommandDispatcher<any>) {
        dispatcher.register(
            literal('say').then(
                argument('message', greedyString()).executes(
                    async (context) => {
                        const source = context.getSource() as Player;
                        const message = context.getArgument('message');
                        const messageToSend = `*${source.getUsername()}: ${message}`;

                        const event = new ChatEvent(
                            new Chat(source, messageToSend)
                        );
                        await source
                            .getServer()
                            .getEventManager()
                            .emit('chat', event);
                    }
                )
            )
        );
    }
}
