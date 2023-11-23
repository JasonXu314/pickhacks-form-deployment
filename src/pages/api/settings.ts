import { ObjectId } from 'mongodb';
import type { NextPage, GetStaticProps, InferGetStaticPropsType, NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

const Settings = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		try {
			const client = await clientPromise;
			const db = client.db('form');

			const get = await db.collection('settings').findOne();

			res.json(get);
		} catch (e) {
			console.error(e);
		}
	} else if (req.method === 'POST') {
		try {
			const client = await clientPromise;
			const db = client.db('form');
            let post;
            if (req.body.accepting != undefined) {
                post = await db.collection('settings').findOneAndUpdate({}, { $set: { accepting: req.body.accepting } });
            }
			if (req.body.message != undefined) {
                post = await db.collection('settings').findOneAndUpdate({}, { $set: { message: req.body.message } });
            }
			if (req.body.startDate != undefined) {
                const start = new Date(req.body.startDate);
                post = await db.collection('settings').findOneAndUpdate({}, { $set: { startDate: start } });
            }
			if (req.body.endDate != undefined) {
                const end = new Date(req.body.endDate);
                post = await db.collection('settings').findOneAndUpdate({}, { $set: { endDate: end } });
            }

			res.json(post);
		} catch (e) {
			console.error(e);
		}
	}
};

export default Settings;
