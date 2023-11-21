import type { NextPage, GetStaticProps, InferGetStaticPropsType, NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

const Admin = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const client = await clientPromise;
		const db = client.db('form');

		const admin = await db.collection('admins').findOne({email: req.query.email});

        if (admin) {
            res.json(true)
        }

        else {
            res.json(false);
        }
	} catch (e) {
		console.error(e);
	}
};

export default Admin;
