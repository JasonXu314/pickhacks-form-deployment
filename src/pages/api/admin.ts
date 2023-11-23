import type { NextPage, GetStaticProps, InferGetStaticPropsType, NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

const Admin = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		try {
			const client = await clientPromise;
			const db = client.db('form');

			const admin = await db.collection('admins').findOne({ email: req.query.email });

			if (admin) {
				res.json(true);
			} else {
				res.json(false);
			}
		} catch (e) {
			console.error(e);
		}
	} else if (req.method === 'POST') {
		try {
			const client = await clientPromise;
			const db = client.db('form');

			const admin = await db.collection('admins').findOne({ email: req.body.email });

			if (admin) {
				res.status(403).json('Email already exists');
			} else {
				const admin = await db.collection('admins').insertOne({ email: req.body.email });
				res.json(admin);
			}
		} catch (e) {
			console.error(e);
		}
	}
};

export default Admin;
