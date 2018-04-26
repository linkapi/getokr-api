'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
	name: {
		type: String
	},
	company: {
		type: Schema.Types.ObjectId,
		ref: 'Company'
	}
});

module.exports.TagSchema = TagSchema;
module.exports.Tag = mongoose.model('Tag', TagSchema);