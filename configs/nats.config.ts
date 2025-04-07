import { connect, JetStreamManager, StringCodec } from 'npm:nats@2.29.2';
import { RetentionPolicy } from 'npm:nats@2.29.2';
import { StorageType } from 'npm:nats@2.29.2';

async function _setupJetStream() {
  const nats = await connect({ servers: 'nats://localhost:4222' });
  const jsm: JetStreamManager = await nats.jetstreamManager();
  const _sc = StringCodec();

  console.log('🚀 Setting up JetStream Streams...');

  const streams = [
    { name: 'COMMIT_EVENTS', subject: 'eac.commit.*' },
    { name: 'DELETE_EVENTS', subject: 'eac.delete.*' },
    { name: 'ACTUATOR_EVENTS', subject: 'eac.actuator.*' },
    { name: 'ACTUATOR_STATUS_EVENTS', subject: 'eac.actuators.status.*' },
    { name: 'COMMIT_STATUS_EVENTS', subject: 'eac.status.*' },
    { name: 'COMMIT_COMPLETE_EVENTS', subject: 'eac.commit.complete.*' },
  ];

  for (const stream of streams) {
    try {
      await jsm.streams.add({
        name: stream.name,
        subjects: [stream.subject],
        retention: RetentionPolicy.Workqueue,
        storage: StorageType.File,
        max_msgs: -1,
        // no_ack: false,
      });
      console.log(`✅ Created stream: ${stream.name} (${stream.subject})`);
    } catch (_err) {
      console.warn(
        `⚠️ Stream ${stream.name} already exists or failed to create.`,
      );
    }
  }

  console.log('✅ JetStream setup complete!');
  await nats.close();
}

// setupJetStream().catch((err) => {
//   console.error('❌ JetStream setup failed:', err);
// });
