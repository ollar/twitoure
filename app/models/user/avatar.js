import DS from 'ember-data';

export default DS.Model.extend({
    '128': DS.belongsTo('image'),
    '256': DS.belongsTo('image'),
    '512': DS.belongsTo('image'),
});
