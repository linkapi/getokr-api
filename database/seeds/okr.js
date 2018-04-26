'use strict';

const
	_ = require('lodash'),
	Okr = require('../../src/models/okrModel').Okr

module.exports = () => (

	[
		new Okr({
			title: 'Diminuir o numero de bugs em produção',
			description: 'diminuir o numero de bugs em produção usando determminadas ações',
			sponsor: 'Daniel',
			empresa: 'fcamara',
			valueReal: 0,
			keysResult: [{
				title: 'Diminuir o numero de bugs em produção2',
				type: 'Estimado',
				checked: false,
				target: 120,
				valueInitial: 120,
				valueRealized: 0,
				valueTarget: 120
			}]
		}),
		new Okr({
			title: 'Aumentar numero de vendas',
			description: 'Aumentar numero de vendas',
			sponsor: 'Daniel',
			empresa: 'fcamara',
			valueReal: 0,
			keysResult: [{
				title: 'Aumentar numero de vendas2',
				type: 'Estimado',
				checked: false,
				target: 120,
				valueInitial: 120,
				valueRealized: 0,
				valueTarget: 120
			}]
		}),
		new Okr({
			title: 'terminar projeto',
			description: 'terminar projeto',
			sponsor: 'Daniel',
			empresa: 'vcode',
			valueReal: 0,
			keysResult: [{
				title: 'finaliza layout',
				type: 'Estimado',
				checked: false,
				target: 120,
				valueInitial: 120,
				valueRealized: 0,
				valueTarget: 120
			}]
		})
	]

)