import { PUBLIC_ABLY } from '$env/static/public';
import * as Ably from 'ably';

const options: Ably.Types.ClientOptions = { key: PUBLIC_ABLY }
const realtimeClient = new Ably.Realtime.Promise(options);
export default realtimeClient