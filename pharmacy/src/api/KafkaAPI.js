import kafkaNode from 'kafka-node';

export const kafka = (app) => {
	const client = new kafkaNode.KafkaClient({ kafkaHost: 'kafka:9092' });
	const producer = new kafkaNode.Producer(client);

	producer.on('ready', () => {
		app.post('/admins', async (req, res) => {
			producer.send(
				[{ topic: 'admin_register_req', messages: JSON.stringify(req.body) }],
				async (err, data) => {
					console.log('req body', req.body);
					console.log('data: ', data);
					if (err) {
						res.send(err);
					} else {
						res.send(req.body);
					}
				},
			);
		});
	});
};

export default kafka;
