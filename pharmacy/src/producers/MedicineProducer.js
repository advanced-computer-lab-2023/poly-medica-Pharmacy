import KafkaNode from 'kafka-node';
import {
	ERROR_STATUS_CODE,
	MEDICINE_NOTIFICATION_TYPE_ENUM,
	OK_STATUS_CODE,
} from '../utils/Constants.js';

export const medicineProducer = (app) => {
	const client = new KafkaNode.KafkaClient({ kafkaHost: 'localhost:9092' });
	const producer = new KafkaNode.Producer(client);
	const kafka_topic = 'out_of_stock';

	producer.on('ready', async function () {
		console.log('Producer is ready');
	});

	producer.on('error', function (err) {
		console.log('Producer is in error state');
		console.log(err);
	});

	const sendOutOfStockNotification = async (medicineName) => {
		const notification = {
			notificationHead: 'medicine out of stock',
			notificationBody: `the medicine ${medicineName} is out of stock`,
			senderName: 'system',
		};
		const payload = [
			{
				topic: kafka_topic,
				messages: JSON.stringify({
					notification: notification,
					type: MEDICINE_NOTIFICATION_TYPE_ENUM,
				}),
			},
		];

		producer.send(payload, (err, data) => {
			console.log('payload = ', payload);
			console.log('data = ', data);
			if (err) {
				console.log(
					'[kafka-producer -> ' + kafka_topic + ']: broker update failed',
				);
			} else {
				console.log(
					'[kafka-producer -> ' + kafka_topic + ']: broker update success',
				);
			}
		});
	};

	app.post('/medicines/:medicineName/out-of-stock', async (req, res) => {
		try {
			const { medicineName } = req.params;
			await sendOutOfStockNotification(medicineName);
			res.status(OK_STATUS_CODE).send();
		} catch (error) {
			res.status(ERROR_STATUS_CODE).send({ errMessage: error.message });
		}
	});
};
