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

export default class SayCommand extends Command {
    constructor() {
        super({
            id: 'minecraft:say',
            description: 'Say something to all players.',
            permission: 'minecraft.command.say'
        });
    }

    public async register(dispatcher: CommandDispatcher<any>) {
        dispatcher.register(
            literal('say').then(
                argument('message', greedyString()).executes(
                    async (context) => {
                        const source = context.getSource() as Player;
                        const message = context.getArgument('message');

                        const chat = new Chat(
                            source,
                            `§5[${source.getUsername()}] ${message}`
                        );
                        await source.getServer().getChatManager().send(chat);
                    }
                )
            )
        );
    }
}
