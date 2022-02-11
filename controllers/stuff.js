const express = require('express');
const Thing = require('../models/Things');

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;

    const thing = new Thing({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ? {...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body }
    Thing.updateOne({ _id: req.params.id }, {...thingObject, _id: req.params.id })
        .then(() => res.status(200).json('Objet modifié!'))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(
            (thing) => {
                if (!thing) {
                    return res.status(404).json({
                        error: new Error('Aucun thing trouvé !')
                    });
                };
                //compare si l'UserId de l'objet est le meme que celui de l'utilisateur 
                if (thing.userId !== req.auth.userId) {
                    res.status(401).json({
                        error: new Error('Requete non authorisé !')
                    });
                };
                Thing.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json('Objet Supprimé!'))
                    .catch(error => res.status(400).json({ error }));
            }
        ).catch(error => res.status(400).json({ error: error }));
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllThing = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};