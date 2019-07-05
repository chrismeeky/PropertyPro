/* eslint-disable no-tabs */
import multer from 'multer';


export default multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		if (!file.mimetype.match(/jpg|jpeg|png|gif/)) {
			cb(new Error('file is not supported'), false);
			return;
		}

		cb(null, true);
	},
});
