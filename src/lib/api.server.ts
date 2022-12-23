import { PRIVATE_ABLY } from '$env/static/private';
import * as Ably from 'ably';

const options: Ably.Types.ClientOptions = { key: PRIVATE_ABLY }
const restServer = new Ably.Rest.Promise(options);
export default restServer