const router = require('express').Router();
const validate = require('../../middleware/validate')
const ctrl = require('./sale.controller');

router.post('/', validate(ctrl.schemas.saleSchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);
router.patch('/:id', validate(ctrl.schemas.updateSchema), ctrl.update);
router.delete('/', ctrl.removeMany);


module.exports = router;