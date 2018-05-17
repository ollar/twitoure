import DS from 'ember-data';

export default DS.Model.extend({
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  timestampCreated: DS.attr('number'),

  user: DS.belongsTo(),
});
