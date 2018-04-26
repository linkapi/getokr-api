'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

const OkrSchema = new Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	sponsor: {
		type: String
	},
	empresa: {
		type: String
	},
	valueReal: {
		type: String
	},
	nodes: [{
		title: {
			type: String
		},
		type: {
			type: String
		},
		checked: {
			type: Boolean,
		},
		valueInitial: {
			type: Number
		},
		valueRealized: {
			type: Number
		},
		valueTarget: {
			type: Number
		}		
	}]
});

module.exports.OkrSchema = OkrSchema;
module.exports.Okr = mongoose.model('Okr', OkrSchema);