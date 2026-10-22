import { EmailChannel } from '../channels/EmailChannel.js';
import { SmsChannel } from '../channels/SmsChannel.js';

export class ChannelFactory {
    static createChannel(type) {
        switch (type) {
            case 'EMAIL':
                return new EmailChannel();
            case 'SMS':
                return new SmsChannel();
            default:
                throw new Error(`Unknown channel type: ${type}`);
        }
    }
}