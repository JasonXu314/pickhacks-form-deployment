import type { NextPage, GetStaticProps, InferGetStaticPropsType, NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

const Data = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
        try {
			const client = await clientPromise;
			const db = client.db('form');

			const get = await db.collection('data').find({}).toArray();

			res.json(get);
		} catch (e) {
			console.error(e);
		}
	}
    else if (req.method === 'POST') {
		try {
			const client = await clientPromise;
			const db = client.db('form');

			const post = await db.collection('data').insertOne({
				name: req.body.name,
				email: req.body.email,
				year: req.body.year,
				firstChoice: req.body.firstChoice,
				secondChoice: req.body.secondChoice,
				schedule: req.body.schedule,
			});

			res.json(post);
		} catch (e) {
			console.error(e);
		}
	}
};

export default Data;
