const Router = require('express').Router;
const mainRouter = Router();
const catRouter = Router();
const Cat = require('./models/cat');
const createMicrochipId = require('./helpers/create-microchip-id');
const _ = require('lodash');
const dogRouter = Router();

mainRouter.use('/cat', catRouter);

mainRouter.use('/', (req, res) => {
  res.status(200).send({ message: 'Feeling Lost?' })
});

catRouter.get('/', (req, res) => {
  res.status(200).send(req.app.locals.cats);
})

catRouter.post('/', (req, res) => {
  const name = req.body ? req.body.name : '';

  if (name) {
    const newCat = new Cat(name);
    const catExists = _.findIndex(req.app.locals.cats, (cat) => {
      return cat.name === name;
    }) >= 0;

    if (!catExists) {
      req.app.locals.cats.push(newCat)
      res.status(200).send(newCat.details);
    } else {
      res.status(404).send({ 'message': `cat with name ${name} already exists` })
    }
  } else {
    res.status(400).send({ 'message': `Cat has no name. Please name your cat.` })
  }
})

catRouter.put('/', (req, res) => {
  const name = req.body ? req.body.name : '';
  const newName = req.body ? req.body.name : '';

  if (name && newName) {
    const catToRename = _.findIndex(req.app.locals.cats, (cat) => {
      return cat.name === name;
    }) >= 0;

    if (catToRename) {
      req.app.locals.cats[catToRename].name = newName;
      res.status(200).send(catToRename.details);
    } else {
      res.status(404).send({ 'message': `Cat with name ${name} does not exist` })
    }
  } else {
    res.status(400).send({ 'message': `Cat has no name or new name. Please give the name or new name of your cat.` })
  }
})

catRouter.delete('/', (req, res) => {
  const name = req.body ? req.body.name : '';

  if (name) {
    const catToEuthanise = _.findIndex(req.app.locals.cats, (cat) => {
      return cat.name === name;
    }) >= 0;

    if (catToEuthanise) {
      req.app.locals.cats = req.app.locals.cats.splice(catToEuthanise, 1);
      res.status(200).send(catToEuthanise.details);
    } else {
      res.status(404).send({ 'message': `Cat with name ${name} does not exist` })
    }
  } else {
    res.status(400).send({ 'message': `Cat has no name. Please give the name of your cat.` })
  }
})

catRouter.post('/microchip', (req, res) => {
  const name = req.body ? req.body.name : '';
  if (name) {
    const catToMicrochipIndex = _.findIndex(req.app.locals.cats, (cat) => {
      return cat.name === name;
    })

    if (catToMicrochipIndex !== -1) {
      const { name, microchipId } = req.app.locals.cats[catToMicrochipIndex]

      if(microchipId) {
        res.status(400).send({ 'message': 'Cat already microchipped'});
      } else {
        req.app.locals.cats[catToMicrochipIndex].microchipId = createMicrochipId(name, 'cat')
        res.status(200).send(req.app.locals.cats[catToMicrochipIndex].details);
      }
    } else {
      res.status(404).send({ 'message': `Cat with name ${name} not found` })
    }
  } else {
    res.status(400).send({ 'message': 'name not found in request body' })
  }
})

module.exports = mainRouter;